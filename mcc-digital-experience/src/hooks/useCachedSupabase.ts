'use client';

/**
 * useCachedSupabase — central hook library for all cached Supabase reads.
 *
 * Each exported hook:
 *  1. Checks if React Query has a cached copy.
 *  2. Performs a lightweight updated_at probe.
 *  3. If unchanged → serves the cache (HIT / UNCHANGED).
 *  4. If changed (or first visit) → fetches full data (MISS / STALE).
 *
 * Static tables use 90-day staleTime.
 * Notices → 10 min, Events → 30 min.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import {
  cacheLog, fetchLatestUpdatedAt,
  STATIC_STALE, STATIC_GC,
  NOTICES_STALE, NOTICES_GC,
  EVENTS_STALE, EVENTS_GC,
  qk,
} from '@/lib/cache';

// ─── Helper: smart-fetch with updated_at guard ──────────────────────────────
async function smartFetch<T>(
  table: string,
  queryKey: readonly unknown[],
  fullFetch: () => Promise<T>,
  queryClient: ReturnType<typeof useQueryClient>
): Promise<T> {
  const cacheKey = `cache_ts_${table}`;
  const cachedTs  = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
  const existing  = queryClient.getQueryData<T>(queryKey);

  // Do a lightweight probe
  const latestTs = await fetchLatestUpdatedAt(table);

  if (existing && cachedTs && latestTs && cachedTs === latestTs) {
    cacheLog('UNCHANGED', table, `updated_at: ${latestTs}`);
    return existing;
  }

  if (!existing) {
    cacheLog('MISS', table, 'First load — fetching from Supabase');
  } else {
    cacheLog('STALE', table, `updated_at changed: ${cachedTs} → ${latestTs}`);
  }

  const freshData = await fullFetch();
  if (latestTs && typeof window !== 'undefined') {
    localStorage.setItem(cacheKey, latestTs);
  }
  return freshData;
}

// ─── 1. All Programmes (list) ────────────────────────────────────────────────
export function useCachedAllProgrammes() {
  const qc = useQueryClient();
  const queryKey = qk.allProgrammes();

  return useQuery({
    queryKey,
    staleTime: STATIC_STALE,
    gcTime: STATIC_GC,
    queryFn: () =>
      smartFetch(
        'mcc_programmes',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('mcc_programmes')
            .select('id, slug, name, code, category, status, is_featured, display_order, festivals_tab_name, publication_tab_name')
            .eq('status', 'Active')
            .order('display_order');
          if (error) throw error;
          cacheLog('MISS', 'mcc_programmes', 'Full fetch complete');
          return data;
        },
        qc
      ),
  });
}

// ─── 2. Single Programme (with all sub-tables) ───────────────────────────────
export function useCachedProgramme(slug: string) {
  const qc = useQueryClient();
  const queryKey = qk.programme(slug);

  return useQuery({
    queryKey,
    enabled: !!slug,
    staleTime: STATIC_STALE,
    gcTime: STATIC_GC,
    queryFn: async () => {
      // For programme we check the parent table updated_at as a proxy
      const existing = qc.getQueryData(queryKey);
      const cacheKey = `cache_ts_mcc_programmes_${slug}`;
      const cachedTs = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
      const latestTs = await fetchLatestUpdatedAt('mcc_programmes');

      if (existing && cachedTs && latestTs && cachedTs === latestTs) {
        cacheLog('UNCHANGED', `mcc_programmes[${slug}]`, `updated_at: ${latestTs}`);
        return existing;
      }

      cacheLog('MISS', `mcc_programmes[${slug}]`, 'Fetching full programme data');

      // Core programme row
      const { data: prog, error: progErr } = await supabase
        .from('mcc_programmes')
        .select('*')
        .eq('slug', slug)
        .single();
      if (progErr || !prog) throw progErr ?? new Error('Programme not found');

      const pid = prog.id;

      const [
        { data: ov }, { data: sn }, { data: sm },
        { data: al }, { data: iv }, { data: depts }
      ] = await Promise.all([
        supabase.from('program_overview').select('*').eq('programme_id', pid).single(),
        supabase.from('program_snapshot').select('*').eq('programme_id', pid).single(),
        supabase.from('program_semesters').select('*, program_subjects(*)').eq('programme_id', pid).order('semester_number'),
        supabase.from('program_alumni').select('*').eq('programme_id', pid).order('display_order'),
        supabase.from('program_industrial_visits').select('*').eq('programme_id', pid).order('display_order'),
        supabase.from('program_departments').select('*').eq('programme_id', pid).order('display_order'),
      ]);

      const { data: fc } = await supabase
        .from('program_faculty')
        .select('id, programme_id, sr_no, name, designation, additional_role, department, education, teaching_exp, email, image, display_order, linkedin_url, research_interests, corporate_exp')
        .eq('programme_id', pid)
        .order('display_order');

      if (latestTs && typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, latestTs);
      }

      return {
        ...prog,
        overview: ov ?? null,
        snapshot: sn ?? null,
        semesters: (sm ?? []).map((s: any) => ({
          ...s,
          subjects: (s.program_subjects ?? []).sort((a: any, b: any) => a.display_order - b.display_order),
        })),
        faculty: fc ?? [],
        alumni: al ?? [],
        industrial_visits: iv ?? [],
        departments: depts ?? [],
      };
    },
  });
}

// ─── 3. Events (gallery / home page) ────────────────────────────────────────
export function useCachedGalleryEvents() {
  const qc = useQueryClient();
  const queryKey = qk.gallery();

  return useQuery({
    queryKey,
    staleTime: EVENTS_STALE,
    gcTime: EVENTS_GC,
    queryFn: () =>
      smartFetch(
        'events',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('events')
            .select('id, title, description, category, department, images, published_at, publish_home, publish_gallery, status')
            .or('publish_gallery.eq.true,publish_home.eq.true')
            .eq('status', 'published')
            .is('programme', null)
            .order('published_at', { ascending: false });
          if (error) throw error;
          cacheLog('MISS', 'events[gallery]', 'Full fetch complete');
          return data;
        },
        qc
      ),
  });
}

// ─── 4. Programme Events (by programme code + section) ───────────────────────
export function useCachedProgrammeEvents(adminCode: string, sectionName: string) {
  const qc = useQueryClient();
  const queryKey = qk.events({ adminCode, sectionName });

  return useQuery({
    queryKey,
    enabled: !!adminCode,
    staleTime: EVENTS_STALE,
    gcTime: EVENTS_GC,
    queryFn: () =>
      smartFetch(
        'events',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('events')
            .select('id, title, description, images, published_at, programme_section, programme, category, department')
            .eq('publish_programme', true)
            .eq('status', 'published')
            .order('published_at', { ascending: false });
          if (error) throw error;

          const filtered = (data ?? [])
            .filter((ev: any) => ev.programme && ev.programme.includes(adminCode))
            .map((ev: any) => {
              let section = ev.programme_section;
              try {
                const parsed = JSON.parse(ev.programme_section);
                if (parsed && parsed[adminCode]) section = parsed[adminCode];
              } catch {}
              return { ...ev, programme_section: section };
            })
            .filter((ev: any) => ev.programme_section === sectionName);

          cacheLog('MISS', `events[${adminCode}/${sectionName}]`, 'Full fetch complete');
          return filtered;
        },
        qc
      ),
  });
}

// ─── 5. Notices ─────────────────────────────────────────────────────────────
export function useCachedNotices() {
  const qc = useQueryClient();
  const queryKey = qk.notices();

  return useQuery({
    queryKey,
    staleTime: NOTICES_STALE,
    gcTime: NOTICES_GC,
    queryFn: () =>
      smartFetch(
        'notices',
        queryKey,
        async () => {
          const now = new Date().toISOString();
          const { data, error } = await supabase
            .from('notices')
            .select('*')
            .lte('schedule_time', now)
            .or(`expiry_time.is.null,expiry_time.gt.${now}`)
            .order('schedule_time', { ascending: false });
          if (error) throw error;
          cacheLog('MISS', 'notices', 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}

// ─── 6. Jr College Notices ───────────────────────────────────────────────────
export function useCachedJrNotices() {
  const qc = useQueryClient();
  const queryKey = qk.jrNotices();

  return useQuery({
    queryKey,
    staleTime: NOTICES_STALE,
    gcTime: NOTICES_GC,
    queryFn: () =>
      smartFetch(
        'jr_college_notices',
        queryKey,
        async () => {
          const now = new Date().toISOString();
          const { data, error } = await supabase
            .from('jr_college_notices')
            .select('*')
            .lte('schedule_time', now)
            .or(`expiry_time.is.null,expiry_time.gt.${now}`)
            .order('schedule_time', { ascending: false });
          if (error) throw error;
          cacheLog('MISS', 'jr_college_notices', 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}

// ─── 7. Examination Documents ────────────────────────────────────────────────
export function useCachedExamDocs() {
  const queryKey = qk.examDocs();

  return useQuery({
    queryKey,
    // Short stale time so it refetches frequently
    staleTime: 0,
    gcTime: NOTICES_GC,
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('examination_documents')
        .select('*')
        .lte('schedule_time', now)
        .or(`notice_expiry_time.is.null,notice_expiry_time.gt.${now}`)
        .order('schedule_time', { ascending: false });
      if (error) throw error;
      // Always clear the localStorage timestamp so next load never serves stale cache
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cache_ts_examination_documents');
      }
      cacheLog('MISS', 'examination_documents', 'Direct fetch (always fresh)');
      return data ?? [];
    },
  });
}


// ─── 8. Wall of Fame ─────────────────────────────────────────────────────────
export function useCachedWallOfFame() {
  const qc = useQueryClient();
  const queryKey = qk.wallOfFame();

  return useQuery({
    queryKey,
    staleTime: STATIC_STALE,
    gcTime: STATIC_GC,
    queryFn: () =>
      smartFetch(
        'mcc_wall_of_fame',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('mcc_wall_of_fame')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          cacheLog('MISS', 'mcc_wall_of_fame', 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}

// ─── 9. Students Corner ─────────────────────────────────────────────────────
export function useCachedStudentsCorner(category?: string) {
  const qc = useQueryClient();
  const queryKey = qk.studentsCorner(category);

  return useQuery({
    queryKey,
    staleTime: STATIC_STALE,
    gcTime: STATIC_GC,
    queryFn: () =>
      smartFetch(
        'mcc_students_corner',
        queryKey,
        async () => {
          let q = supabase.from('mcc_students_corner').select('*');
          if (category) q = q.eq('category', category) as any;
          const { data, error } = await q.order('display_order');
          if (error) throw error;
          cacheLog('MISS', `mcc_students_corner[${category ?? 'all'}]`, 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}

// ─── 10. Home Banners ────────────────────────────────────────────────────────
export function useCachedHomeBanners() {
  const qc = useQueryClient();
  const queryKey = qk.homeBanners();

  return useQuery({
    queryKey,
    staleTime: STATIC_STALE,
    gcTime: STATIC_GC,
    queryFn: () =>
      smartFetch(
        'home_banners',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('home_banners')
            .select('*')
            .eq('is_active', true)
            .order('display_order');
          if (error) throw error;
          cacheLog('MISS', 'home_banners', 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}

// ─── 11. Statutory Bodies ────────────────────────────────────────────────────
export function useCachedStatutoryBodies() {
  const qc = useQueryClient();
  const queryKey = qk.statutoryBodies();

  return useQuery({
    queryKey,
    staleTime: STATIC_STALE,
    gcTime: STATIC_GC,
    queryFn: () =>
      smartFetch(
        'mcc_statutory_bodies',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('mcc_statutory_bodies')
            .select('*')
            .order('display_order');
          if (error) throw error;
          cacheLog('MISS', 'mcc_statutory_bodies', 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}



// ─── 13. Jr College Gallery Events ───────────────────────────────────────────
export function useCachedJrGallery() {
  const qc = useQueryClient();
  const queryKey = qk.jrGallery();

  return useQuery({
    queryKey,
    staleTime: EVENTS_STALE,
    gcTime: EVENTS_GC,
    queryFn: () =>
      smartFetch(
        'jr_college_events',
        queryKey,
        async () => {
          const { data, error } = await supabase
            .from('jr_college_events')
            .select('*')
            .eq('show_in_students_corner', true)
            .order('event_date', { ascending: false });
          if (error) throw error;
          cacheLog('MISS', 'jr_college_events', 'Full fetch complete');
          return data ?? [];
        },
        qc
      ),
  });
}
