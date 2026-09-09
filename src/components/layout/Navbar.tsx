import { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import type { CSSProperties, ReactElement } from 'react';

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

const LEFT_LINKS: readonly NavLink[] = [
  { name: 'Profile', id: 'about' },
  { name: 'Experience', id: 'experience' },
] as const;

const RIGHT_LINKS: readonly NavLink[] = [
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
] as const;

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS] as const;

const ProfileIcon = (): ReactElement => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ExperienceIcon = (): ReactElement => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ProjectsIcon = (): ReactElement => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const ContactIcon = (): ReactElement => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Dipetakan berdasarkan section id (type-safe), bukan string name yang rawan typo.
const ICON_MAP: Record<string, () => ReactElement> = {
  about: ProfileIcon,
  experience: ExperienceIcon,
  projects: ProjectsIcon,
  contact: ContactIcon,
};

const getMenuIcon = (id: string) => {
  const Icon = ICON_MAP[id];
  return Icon ? <Icon /> : null;
};

const MobileNavItem = memo(({ link, isActive, onNavigate, isInitial, suppressSlide }: { link: NavLink; isActive: boolean; onNavigate: (id: string) => void; isInitial?: boolean; suppressSlide?: boolean }) => (
  <button
    onClick={() => onNavigate(link.id)}
    className={`relative flex items-center justify-center w-11 h-11 transition-colors z-10 rounded-full ${
      isActive ? 'text-white' : 'text-[#2E4C38]/50'
    }`}
  >
    {isActive && (
      <motion.div
        layoutId="mobileActiveBackground"
        initial={isInitial ? { opacity: 0, scale: 0 } : false}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 bg-[#1A2F24] -z-10"
        style={{ borderRadius: 9999 }}
        transition={{
          layout: suppressSlide ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
          default: { type: "spring", stiffness: 300, damping: 30 },
        }}
      />
    )}
    <span className="relative z-10 flex items-center justify-center">
      {getMenuIcon(link.id)}
    </span>
  </button>
));
MobileNavItem.displayName = 'MobileNavItem';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 30
  );
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isInitial, setIsInitial] = useState(true);
  useEffect(() => setIsInitial(false), []);

  const [suppressSlide, setSuppressSlide] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setSuppressSlide(false), 600);
    return () => clearTimeout(t);
  }, []);

  const isNavigating = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const prevPathRef = useRef<string>(location.pathname);
  const isFirstLoad = useRef<boolean>(true);

  // Cache elemen section supaya tidak query DOM di setiap scroll tick.
  const sectionElsRef = useRef<Map<string, HTMLElement>>(new Map());

  const logoMaskStyle = useMemo<CSSProperties>(() => {
    // Query param unik dibutuhkan agar browser fetch ulang resource sebagai instance baru,
    // sehingga animasi draw-on (stroke-dashoffset) di dalam SVG restart tiap mount —
    // tanpa ini browser bisa reuse SVG yang sudah di-cache dalam state "selesai animasi".
    // useMemo dengan deps kosong -> hanya dihitung sekali per mount (reload/first load), bukan per render.
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

  // Populate cache elemen section saat berada di halaman utama.
  // Dijalankan lagi via rAF sekali untuk menangani section yang mount belakangan.
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

    // Retry sampai semua section ketemu (maks ~0.5s), bukan cuma 1x rAF.
    // Perlu karena saat balik dari /projects/:slug ke '/', elemen section
    // bisa belum ter-mount tepat di frame pertama route berubah — kalau cache
    // telanjur kosong dan tidak di-retry, computeActiveSection akan selalu
    // fallback ke 'home' walau posisi scroll sudah di section lain.
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

    // Fallback: kalau cache kosong (elemen belum sempat ke-cache saat effect populate jalan),
    // ambil langsung dari DOM sekali saat itu juga — mencegah macet permanen di 'home'.
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

  // Satu scroll listener untuk isScrolled + active section tracking, satu rAF throttle.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 30);
        if (location.pathname === '/') computeActiveSection();
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
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    waitForScrollEnd(() => {
      isNavigating.current = false;
    });
  }, [waitForScrollEnd]);

  // Effect ini WAJIB dideklarasikan sebelum effect first-load di bawah.
  // isFirstLoad.current baru boleh dibaca di sini sebelum effect first-load
  // sempat mem-flip-nya jadi false pada commit yang sama — kalau urutannya kebalik,
  // reload langsung di /projects/:slug akan salah kira "bukan first load" dan
  // sempat men-set activeSection('projects') sesaat sebelum di-redirect balik ke
  // 'home', bikin fill indicator loncat dua kali (home -> projects -> home).
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

    // Polling rAF ringan untuk menunggu elemen target muncul,
    // menggantikan MutationObserver yang sebelumnya mengamati seluruh document.body.
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
    if (location.pathname !== '/') {
      isNavigating.current = true;
      setActiveSection(id);
      navigate('/', { state: { targetSection: id } });
      return;
    }
    performScroll(id);
  }, [location.pathname, navigate, performScroll]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 p-1.5 rounded-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-sm shadow-lg border border-[#1A2F24]/10'
              : 'bg-white/50 border border-transparent'
          }`}
        >
          <LayoutGroup>
            <button
              onClick={() => handleNavigate('home')}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 mr-1 z-10 ${
                activeSection === 'home' ? '' : 'bg-[#1A2F24]/10 hover:bg-[#1A2F24]/20'
              }`}
              aria-label="Home"
            >
              {activeSection === 'home' && (
                <motion.div
                  layoutId="desktopActiveFill"
                  initial={false}
                  className="absolute inset-0 bg-[#1A2F24] -z-10"
                  style={{ borderRadius: 9999 }}
                  transition={{
                    layout: suppressSlide ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                    default: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                />
              )}
              <div
                style={logoMaskStyle}
                className={`relative z-10 w-5 h-5 transition-colors duration-300 ${
                  activeSection === 'home' ? 'bg-white' : 'bg-[#1A2F24]'
                }`}
              />
            </button>

            {ALL_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className={`relative px-4 py-2 text-[11px] font-redhat tracking-[0.15em] uppercase transition-colors duration-300 z-10 rounded-full ${
                    isActive ? 'text-white font-bold' : 'text-[#1A2F24]/60 font-medium hover:text-[#1A2F24] hover:bg-[#1A2F24]/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveFill"
                      initial={false}
                      className="absolute inset-0 bg-[#1A2F24] -z-10"
                      style={{ borderRadius: 9999 }}
                      transition={{
                        layout: suppressSlide ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                        default: { type: "spring", stiffness: 300, damping: 30 },
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {link.name}
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </motion.nav>

      <motion.nav
        initial={{ opacity: 0, y: 20, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-max z-50"
      >
        <div
          className={`px-2 py-2 border rounded-full flex items-center gap-2 transition-[background-color,border-color,box-shadow] duration-500 ${
            isScrolled 
              ? 'bg-[#F9F8F4] shadow-md border-[#1A2F24]/10' 
              : 'bg-[#F9F8F4] border-transparent'
          }`}
        >
          <LayoutGroup>
            <MobileNavItem link={LEFT_LINKS[0]} isActive={activeSection === 'about'} onNavigate={handleNavigate} isInitial={isInitial} suppressSlide={suppressSlide} />
            <MobileNavItem link={LEFT_LINKS[1]} isActive={activeSection === 'experience'} onNavigate={handleNavigate} isInitial={isInitial} suppressSlide={suppressSlide} />

            <button
              onClick={() => handleNavigate('home')}
              className="relative flex items-center justify-center w-11 h-11 rounded-full z-10"
            >
              {activeSection === 'home' && (
                <motion.div
                  layoutId="mobileActiveBackground"
                  initial={isInitial ? { opacity: 0, scale: 0 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-[#1A2F24] -z-10"
                  style={{ borderRadius: 9999 }}
                  transition={{
                    layout: suppressSlide ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                    default: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                />
              )}
              <div
                style={logoMaskStyle}
                className={`relative z-10 w-6 h-6 transition-colors duration-200 ${
                  activeSection === 'home' ? 'bg-white' : 'bg-[#1A2F24]/50'
                }`}
              />
            </button>

            <MobileNavItem link={RIGHT_LINKS[0]} isActive={activeSection === 'projects'} onNavigate={handleNavigate} isInitial={isInitial} suppressSlide={suppressSlide} />
            <MobileNavItem link={RIGHT_LINKS[1]} isActive={activeSection === 'contact'} onNavigate={handleNavigate} isInitial={isInitial} suppressSlide={suppressSlide} />
          </LayoutGroup>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;