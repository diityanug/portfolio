import { useEffect, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';

// External in-memory store for session-level logo animation state:
// - Persists in memory across client-side SPA route transitions.
// - Automatically resets to false on full page reload/refresh (F5, browser refresh button).
let hasPlayedSessionAnimation = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => hasPlayedSessionAnimation;

const markAnimationPlayed = () => {
  if (!hasPlayedSessionAnimation) {
    hasPlayedSessionAnimation = true;
    listeners.forEach((listener) => listener());
  }
};

export const useLogoAnimation = () => {
  const { pathname } = useLocation();
  const isSlug = pathname.startsWith('/career/') || pathname.startsWith('/project/');
  const hasPlayed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    if (isSlug || hasPlayed) {
      markAnimationPlayed();
      return;
    }

    // SVG animation runs for 2.5s with up to 0.6s delay (~3.1s total).
    const timer = setTimeout(() => {
      markAnimationPlayed();
    }, 3100);

    return () => clearTimeout(timer);
  }, [isSlug, hasPlayed]);

  const shouldAnimate = !hasPlayed && !isSlug;
  const logoSrc = shouldAnimate ? '/logo-animated.svg' : '/logo-static.svg';

  return { logoSrc, shouldAnimate };
};
