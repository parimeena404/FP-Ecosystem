/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — useMediaQuery Hook
   Responsive breakpoint detection via matchMedia
   ────────────────────────────────────────────────────────────── */
'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/lib/utils/constants';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return !useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`) &&
    !useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}
