import { useState, useEffect } from 'react';
export const useSkipHeavyEffects = (): boolean => {
  const query = '(pointer: coarse), (max-width: 767px)';

  const [skip, setSkip] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setSkip(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return skip;
};