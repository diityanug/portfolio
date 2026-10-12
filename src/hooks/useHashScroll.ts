import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WAIT_MS = 1500;

export const useHashScroll = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (pathname !== '/' || !hash) return;
    const id = decodeURIComponent(hash.slice(1));

    let raf = 0;
    const start = performance.now();

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: 'start' });
        el.focus({ preventScroll: true });
        return;
      }
      if (performance.now() - start < WAIT_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);
};