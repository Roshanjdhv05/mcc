/**
 * MCC Digital Experience — Persistent Cache Layer
 * Uses TanStack React Query + IndexedDB (idb-keyval)
 *
 * Strategy:
 *  - Static public data (programmes, faculty, etc.): 90-day persistent cache
 *    with lightweight updated_at check on every page visit.
 *  - Notices: 10-minute stale window
 *  - Events (gallery): 30-minute stale window
 *
 * Debug: set localStorage.debug_cache = 'true' to enable verbose logging.
 */

import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Debug logger
// ---------------------------------------------------------------------------
export function cacheLog(
  status: 'HIT' | 'MISS' | 'UNCHANGED' | 'STALE' | 'INVALIDATED',
  table: string,
  detail?: string
) {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('debug_cache') !== 'true') return;
  const emoji =
    status === 'HIT'         ? '✅' :
    status === 'MISS'        ? '❌' :
    status === 'UNCHANGED'   ? '🟡' :
    status === 'STALE'       ? '🔄' :
                               '🗑️';
  const msg = `[Cache ${status}] ${table}${detail ? ' — ' + detail : ''}`;
  console.log(`%c${msg}`, status === 'HIT' || status === 'UNCHANGED' ? 'color:green;font-weight:bold' : 'color:#b45309;font-weight:bold');
}

// ---------------------------------------------------------------------------
// Fetch latest updated_at from a table (lightweight check — 1 row, 1 column)
// ---------------------------------------------------------------------------
export async function fetchLatestUpdatedAt(table: string): Promise<string | null> {
  const { data, error } = await (supabase as any)
    .from(table)
    .select('updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data.updated_at ?? null;
}

// ---------------------------------------------------------------------------
// Stale-time / GC-time constants
// ---------------------------------------------------------------------------
/** 90-day persistent cache for rarely-changing data */
export const STATIC_STALE   = 1000 * 60 * 60 * 24 * 90;  // 90 days
export const STATIC_GC      = 1000 * 60 * 60 * 24 * 90;  // 90 days

/** 10-minute stale window for notices */
export const NOTICES_STALE  = 1000 * 60 * 10;
export const NOTICES_GC     = 1000 * 60 * 30;

/** 30-minute stale window for events */
export const EVENTS_STALE   = 1000 * 60 * 30;
export const EVENTS_GC      = 1000 * 60 * 60;

// ---------------------------------------------------------------------------
// Query key factory
// ---------------------------------------------------------------------------
export const qk = {
  programme:       (slug: string)                    => ['programme', slug]         as const,
  programmes:      ()                                => ['mcc_programmes']          as const,
  allProgrammes:   ()                                => ['programmes', 'all']       as const,
  events:          (filters?: Record<string, any>)   => ['events', filters ?? {}]  as const,
  notices:         (filters?: Record<string, any>)   => ['notices', filters ?? {}] as const,
  jrNotices:       ()                                => ['jr_college_notices']      as const,
  jrGallery:       ()                                => ['jr_college_events']       as const,
  examDocs:        ()                                => ['examination_documents']   as const,
  wallOfFame:      ()                                => ['mcc_wall_of_fame']        as const,
  studentsCorner:  (type?: string)                   => ['mcc_students_corner', type ?? 'all'] as const,
  homeBanners:     ()                                => ['home_banners']            as const,
  statutoryBodies: ()                                => ['mcc_statutory_bodies']   as const,
  gallery:         ()                                => ['events', 'gallery']       as const,
};
