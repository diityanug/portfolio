import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties } from 'react';

import LogoAnimated from '../../assets/logo-animated.svg';

interface NavLink {
  name: string;
  id: string;
}

interface NavigationState {
  targetSection?: string;
}

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'contact'] as const;

const BUILD_ID = '2026-09-08';

const NAV_LINKS: readonly NavLink[] = [
  { name: 'PROFILE', id: 'about' },
  { name: 'EXPERIENCE', id: 'experience' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'CONTACT', id: 'contact' },
] as const;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 20
  );
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavigating = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const prevPathRef = useRef<string>(location.pathname);
  const isFirstLoad = useRef<boolean>(true);
  const sectionElsRef = useRef<Map<string, HTMLElement>>(new Map());

  const logoMaskStyle = useMemo<CSSProperties>(() => {
    const url = `url(${LogoAnimated}?v=${BUILD_ID})`;
    return {
      maskImage: url,
      WebkitMaskImage: url,
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const populate = () => {
      const map = sectionElsRef.current;
      map.clear();
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) map.set(id, el);
      }
    };

    let attempts = 0;
    let raf: number | null = null;
    const MAX_ATTEMPTS = 30;

    const tryPopulate = () => {
      populate();
      attempts += 1;
      if (sectionElsRef.current.size < SECTION_IDS.length && attempts < MAX_ATTEMPTS) {
        raf = requestAnimationFrame(tryPopulate);
      }
    };

    tryPopulate();
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [location.pathname]);

  const computeActiveSection = useCallback(() => {
    if (isNavigating.current) return;

    if (sectionElsRef.current.size === 0) {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) sectionElsRef.current.set(id, el);
      }
    }

    const scrollPosition = window.scrollY + window.innerHeight / 3;
    let current = 'home';

    for (const id of SECTION_IDS) {
      const el = sectionElsRef.current.get(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (scrollPosition >= top) {
        current = id;
      }
    }

    setActiveSection((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 15);
        if (location.pathname === '/') {
          computeActiveSection();
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname, computeActiveSection]);

  const waitForScrollEnd = useCallback((onSettled: () => void) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    let lastY = window.scrollY;
    let stableFrames = 0;
    const start = performance.now();
    const STABLE_FRAMES_REQUIRED = 6;
    const MAX_WAIT_MS = 3000;

    const tick = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 0.5) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastY = currentY;
      }

      const timedOut = performance.now() - start > MAX_WAIT_MS;
      if (stableFrames >= STABLE_FRAMES_REQUIRED || timedOut) {
        rafRef.current = null;
        onSettled();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const performScroll = useCallback((id: string) => {
    isNavigating.current = true;
    setActiveSection(id);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -54; // Offset for 54px header
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    waitForScrollEnd(() => {
      isNavigating.current = false;
    });
  }, [waitForScrollEnd]);

  useEffect(() => {
    if (!isFirstLoad.current && location.pathname.startsWith('/projects/')) {
      setActiveSection('projects');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      const timer = setTimeout(() => {
        setActiveSection('home');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 500);

      if (location.pathname !== '/' || location.state) {
        prevPathRef.current = '/';
        navigate('/', { replace: true, state: {} });
      }

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (isFirstLoad.current) return;

    if (location.pathname !== '/') {
      prevPathRef.current = location.pathname;
      return;
    }

    const cameFromSlug = prevPathRef.current.startsWith('/projects/');
    const targetId = (location.state as NavigationState | null)?.targetSection;
    prevPathRef.current = location.pathname;

    if (!targetId && !cameFromSlug) return;

    const finalTargetId = targetId || 'home';
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        performScroll(finalTargetId);
        if (targetId) navigate('/', { replace: true, state: {} });
      });
    };

    const waitForElement = (id: string, onFound: () => void) => {
      const start = performance.now();
      const MAX_WAIT_MS = 5000;

      const check = () => {
        if (cancelled) return;
        if (document.getElementById(id)) {
          onFound();
          return;
        }
        if (performance.now() - start > MAX_WAIT_MS) return;
        requestAnimationFrame(check);
      };

      check();
    };

    if (finalTargetId === 'home' || document.getElementById(finalTargetId)) {
      run();
    } else {
      waitForElement(finalTargetId, run);
    }

    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.state, navigate, performScroll]);

  const handleNavigate = useCallback((id: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Wait for drawer to animate out before measuring scroll targets
      setTimeout(() => {
        if (location.pathname !== '/') {
          isNavigating.current = true;
          setActiveSection(id);
          navigate('/', { state: { targetSection: id } });
        } else {
          performScroll(id);
        }
      }, 350); 
    } else {
      if (location.pathname !== '/') {
        isNavigating.current = true;
        setActiveSection(id);
        navigate('/', { state: { targetSection: id } });
      } else {
        performScroll(id);
      }
    }
  }, [location.pathname, navigate, performScroll, mobileMenuOpen]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
      {/* Dynamic Minimal Navbar (54px) */}
      <nav 
        aria-label="Main Navigation"
        className={`w-full h-[54px] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#f7f4ed]/85 backdrop-blur-xl border-b border-[#eceae4] shadow-[0_1px_8px_rgba(0,0,0,0.05)]' 
            : 'bg-[#f7f4ed]/50 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto h-full px-4 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 group outline-none cursor-pointer"
              aria-label="Aditya Nugraha Home"
            >
              <div
                style={logoMaskStyle}
                className="w-4 h-4 transition-colors duration-300 bg-[#1c1c1c]"
              />
              <span className="font-sans font-semibold text-[15px] sm:text-[16px] tracking-tight text-[#1c1c1c]">
                Aditya Nugraha
              </span>
            </button>
            <span className="hidden sm:inline-block font-sans text-xs tracking-wide text-[#5f5f5d]">
              Software Engineer
            </span>
          </div>

          {/* Center / Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className={`px-3 py-1.5 rounded-md font-sans text-xs tracking-wide transition-all outline-none cursor-pointer border ${
                    isActive
                      ? 'bg-white border-[#eceae4] text-[#1c1c1c] shadow-sm'
                      : 'bg-transparent border-transparent text-[#5f5f5d] hover:text-[#1c1c1c] hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Utility: Mobile Hamburger */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1 outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-[#1c1c1c] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
              />
              <span
                className={`w-4 h-[1.5px] bg-[#1c1c1c] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden w-full backdrop-blur-2xl border-b px-6 py-6 flex flex-col gap-6 overflow-hidden transition-colors duration-300 bg-[#f7f4ed]/98 border-[#eceae4] text-[#1c1c1c] relative"
          >
            {/* Background Grid for Drawer */}
            <div className="absolute inset-0 z-[-1] bg-[url('https://cdn.tailwindcss.com/bg-grid-black.svg')] bg-center opacity-[0.02]" style={{ backgroundSize: '24px 24px' }}></div>

            <div className="flex flex-col gap-2 pb-6">
              <span className="font-sans text-xs uppercase tracking-widest text-[#5f5f5d] mb-2">
                Navigation
              </span>
              <button
                onClick={() => handleNavigate('home')}
                className={`text-left font-sans text-2xl font-medium py-2 transition-colors cursor-pointer flex items-center gap-3 ${
                  activeSection === 'home'
                    ? 'text-[#1c1c1c]'
                    : 'text-[#5f5f5d] hover:text-[#1c1c1c]/80'
                }`}
              >
                {activeSection === 'home' && <span className="w-1.5 h-1.5 bg-[#1c1c1c] rounded-full"></span>}
                Home
              </button>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className={`text-left font-sans text-2xl font-medium py-2 transition-colors cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'text-[#1c1c1c]'
                        : 'text-[#5f5f5d] hover:text-[#1c1c1c]/80'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 bg-[#1c1c1c] rounded-full"></span>}
                    {link.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;