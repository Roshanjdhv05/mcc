'use client';

/**
 * useProgramme / useAllProgrammes — backward-compatible wrappers
 *
 * Maps React Query's { data, isLoading, isError } to the old { data, loading, error }
 * shape so all existing pages/components continue to work without any changes.
 */

import { useCachedProgramme, useCachedAllProgrammes } from '@/hooks/useCachedSupabase';

// Re-export the full type so importers can still `import type { FullProgrammeData } from '@/hooks/useProgramme'`
export type FullProgrammeData = {
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
    eligibility?: string;
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
    linkedin_url?: string; research_interests?: string; corporate_exp?: string;
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
  departments: {
    id: string; department_name: string; intro_content: string; display_order: number;
  }[];
};

/** Backward-compat wrapper: { data, loading, error } */
export function useProgramme(slug: string) {
  const { data, isLoading, error } = useCachedProgramme(slug);
  return {
    data: (data as FullProgrammeData | undefined) ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
  };
}

/** Backward-compat wrapper: { data, loading } */
export function useAllProgrammes() {
  const { data, isLoading } = useCachedAllProgrammes();
  return {
    data: (data as any[]) ?? [],
    loading: isLoading,
  };
}
