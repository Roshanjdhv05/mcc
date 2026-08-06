import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface FullProgrammeData {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  category: string;
  status: string;
  is_featured: boolean;
  display_order: number;
  festivals_tab_name?: string;
  publication_tab_name?: string;
  overview: {
    department?: string; degree?: string; description?: string;
    long_description?: string; banner_image?: string;
    activities_intros?: { title: string; intro: string }[];
  } | null;
  snapshot: {
    duration?: string; semesters?: number; timing?: string;
    intake?: number; mode?: string;
  } | null;
  semesters: {
    semester_number: number; syllabus_pdf?: string;
    subjects: { subject_name: string; subject_code?: string; credits?: number; is_elective: boolean; subject_type?: string; display_order: number }[];
  }[];
  faculty: {
    id: string; sr_no?: number; name: string; designation?: string; additional_role?: string;
    department?: string; education?: string; teaching_exp?: string; email?: string; image?: string; display_order: number;
  }[];
  alumni: {
    id: string; name: string; programme_name?: string; year?: string;
    designation?: string; organisation?: string; about?: string;
    linkedin?: string; image?: string; initials?: string; display_order: number;
  }[];
  industrial_visits: {
    id: string; company_name: string; visit_date?: string;
    description?: string; image?: string; display_order: number;
  }[];
}

export function useProgramme(slug: string) {
  const [data, setData] = useState<FullProgrammeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        // 1. Load core programme row
        const { data: prog, error: progErr } = await supabase
          .from('mcc_programmes')
          .select('*')
          .eq('slug', slug)
          .single();

        if (progErr || !prog) {
          if (!cancelled) { setData(null); setLoading(false); }
          return;
        }

        const pid = prog.id;

        // 2. Fetch all related data in parallel
        const [
          { data: ov }, { data: sn }, { data: sm },
          { data: fc }, { data: al }, { data: iv }
        ] = await Promise.all([
          supabase.from('program_overview').select('*').eq('programme_id', pid).single(),
          supabase.from('program_snapshot').select('*').eq('programme_id', pid).single(),
          supabase.from('program_semesters').select('*, program_subjects(*)').eq('programme_id', pid).order('semester_number'),
          supabase.from('program_faculty').select('*').eq('programme_id', pid).order('display_order'),
          supabase.from('program_alumni').select('*').eq('programme_id', pid).order('display_order'),
          supabase.from('program_industrial_visits').select('*').eq('programme_id', pid).order('display_order'),
        ]);

        if (!cancelled) {
          setData({
            ...prog,
            overview: ov || null,
            snapshot: sn || null,
            semesters: (sm || []).map((s: any) => ({
              ...s,
              subjects: (s.program_subjects || []).sort((a: any, b: any) => a.display_order - b.display_order),
            })),
            faculty: fc || [],
            alumni: al || [],
            industrial_visits: iv || [],
          });
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { data, loading, error };
}

// Convenience hook to load all active programmes (for listing pages)
export function useAllProgrammes() {
  const [data, setData] = useState<{ id: string; slug: string; name: string; code: string | null; category: string; status: string; is_featured: boolean; display_order: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('mcc_programmes')
      .select('id, slug, name, code, category, status, is_featured, display_order')
      .eq('status', 'Active')
      .order('display_order')
      .then(({ data }) => {
        setData(data || []);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
