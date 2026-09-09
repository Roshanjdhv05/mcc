'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Pages to exclude from tracking
const EXCLUDED_PATHS = ['/superadmin', '/api'];

export function usePageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    // Skip superadmin and API routes
    if (!pathname || EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (typeof window === 'undefined') return;

    // Use sessionStorage to prevent double-counting from React StrictMode
    // and to avoid counting multiple times if the user refreshes the page
    const sessionKey = `visited_${pathname}`;
    if (sessionStorage.getItem(sessionKey)) return;

    // Debounce: fire database update after 800ms to avoid counting mid-navigation
    const timer = setTimeout(async () => {
      // Mark as visited right before recording to allow StrictMode to cancel cleanly
      sessionStorage.setItem(sessionKey, 'true');

      try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Try RPC first (most efficient — atomic increment in Postgres)
        const { error } = await supabase.rpc('increment_page_view', {
          p_path: pathname,
          p_date: today,
        });

        if (error) {
          // Fallback: manual upsert if RPC not available
          const { data: existing } = await supabase
            .from('page_analytics')
            .select('id, count')
            .eq('path', pathname)
            .eq('visit_date', today)
            .single();

          if (existing) {
            await supabase
              .from('page_analytics')
              .update({ count: existing.count + 1 })
              .eq('id', existing.id);
          } else {
            await supabase
              .from('page_analytics')
              .insert({ path: pathname, visit_date: today, count: 1 });
          }
        }
      } catch {
        // Silently fail — analytics should never break the page
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);
}

