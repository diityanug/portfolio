import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface HomeLockContextValue {
  homeLocked: boolean;
  leaveHome: () => void;
  goHome: () => void;
}

const HomeLockContext = createContext<HomeLockContextValue | null>(null);

export const useHomeLock = (): HomeLockContextValue => {
  const ctx = useContext(HomeLockContext);
  if (!ctx) throw new Error('useHomeLock must be used within HomeLockProvider');
  return ctx;
};

export const HomeLockProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isMain = pathname === '/';

  const [homeLocked, setHomeLocked] = useState(true);

  // Lock Scroll
  useEffect(() => {
  if (!isMain) {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    return;
  }

  if (homeLocked) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  } else {
    const timer = setTimeout(() => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, 120); 
    
    return () => clearTimeout(timer);
  }
}, [isMain, homeLocked]);

  const leaveHome = useCallback(() => {
    window.scrollTo(0, 0);
    setHomeLocked(false);
  }, []);

  const goHome = useCallback(() => {
    setHomeLocked(true);
    
    // Reset Scroll
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1400);
  }, []);

  return (
    <HomeLockContext.Provider value={{ homeLocked, leaveHome, goHome }}>
      {children}
    </HomeLockContext.Provider>
  );
};