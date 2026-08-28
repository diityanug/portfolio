import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CSSProperties, ReactElement } from 'react';

import LogoAnimated from '../../assets/logo-animated.svg';

/* TYPES & CONSTANTS */

interface NavLink {
  name: string;
  id: string;
}

const LEFT_LINKS: readonly NavLink[] = [
  { name: 'Profile', id: 'about' },
  { name: 'Experience', id: 'experience' },
] as const;

const RIGHT_LINKS: readonly NavLink[] = [
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
] as const;

const logoMaskStyle: CSSProperties = {
  maskImage: `url(${LogoAnimated})`,
  WebkitMaskImage: `url(${LogoAnimated})`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
};


/* CUSTOM ICONS */

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

const getMenuIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'profile': return <ProfileIcon />;
    case 'experience': return <ExperienceIcon />;
    case 'projects': return <ProjectsIcon />;
    case 'contact': return <ContactIcon />;
    default: return null;
  }
};


/* SUB-COMPONENTS */

const NavGroup = memo(({ links, activeSection, onNavigate }: { links: readonly NavLink[]; activeSection: string; onNavigate: (id: string) => void }) => (
  <div className="flex items-center gap-3 md:gap-6 font-redhat text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
    {links.map((link) => {
      const isActive = activeSection === link.id;
      return (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          aria-current={isActive ? 'page' : undefined}
          className={`relative py-1 md:py-1.5 px-2 transition-colors duration-500 ease-out flex flex-col items-center justify-center ${
            isActive ? 'text-[#1A2F24]' : 'text-[#2E4C38]/80 hover:text-[#1A2F24]'
          }`}
        >
          <span
            data-text={link.name.toUpperCase()}
            className={`relative flex flex-col items-center justify-center before:content-[attr(data-text)] before:font-extrabold before:invisible before:h-0 ${
              isActive ? 'font-extrabold' : 'font-medium'
            }`}
          >
            {link.name.toUpperCase()}
          </span>
        </button>
      );
    })}
  </div>
));
NavGroup.displayName = 'NavGroup';

const MobileNavItem = memo(({ link, isActive, onNavigate }: { link: NavLink; isActive: boolean; onNavigate: (id: string) => void }) => (
  <button
    onClick={() => onNavigate(link.id)}
    aria-current={isActive ? 'page' : undefined}
    className={`relative flex items-center justify-center w-14 h-10 rounded-full transition-colors duration-300 z-10 ${
      isActive ? 'text-white' : 'text-[#2E4C38]/50 hover:text-[#1A2F24]'
    }`}
    aria-label={link.name}
  >
    {isActive && (
      <motion.div
        layoutId="mobileActiveBackground"
        className="absolute inset-0 bg-[#1A2F24] rounded-full -z-10"
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />
    )}
    <span className="relative z-10 flex items-center justify-center">
      {getMenuIcon(link.name)}
    </span>
  </button>
));
MobileNavItem.displayName = 'MobileNavItem';


/* MAIN COMPONENT: NAVBAR */

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 30
  );
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLogoReversing, setIsLogoReversing] = useState<boolean>(false);

  const rafRef = useRef<number | null>(null);
  const isNavigating = useRef<boolean>(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* EFFECTS */

  // Deteksi section aktif saat scroll manual menggunakan kalkulasi posisi elemen
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScrollTracking = () => {
      if (isNavigating.current) return;

      const sectionIds = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();

    return () => {
      window.removeEventListener('scroll', handleScrollTracking);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/projects/')) {
      setActiveSection('projects');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const targetId = location.state?.targetSection;
    if (!targetId) return;

    let settled = false;
    let observer: MutationObserver | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    const finishScroll = () => {
      if (settled) return;

      if (targetId === 'home') {
        settled = true;
        isNavigating.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
        setTimeout(() => navigate('/', { replace: true, state: {} }), 100);
        return;
      }

      const element = document.getElementById(targetId);
      if (!element) return;

      settled = true;
      isNavigating.current = true;
      observer?.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);

      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
        setTimeout(() => navigate('/', { replace: true, state: {} }), 100);
      }, 100);
    };

    if (targetId === 'home' || document.getElementById(targetId)) {
      finishScroll();
    } else {
      observer = new MutationObserver(finishScroll);
      observer.observe(document.body, { childList: true, subtree: true });
      safetyTimer = setTimeout(() => observer?.disconnect(), 5000);
    }

    return () => {
      observer?.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [location.pathname, location.state, navigate]);


  /* HANDLERS */

  const handleNavigate = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { targetSection: id } });
      return;
    }

    isNavigating.current = true;
    setActiveSection(id);

    if (id === 'home') {
      setIsLogoReversing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = setTimeout(() => {
      isNavigating.current = false;
    }, 1000);

  }, [location.pathname, navigate]);


  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="hidden md:flex fixed top-6 left-0 w-full z-50 justify-center pointer-events-none"
      >
        <div className="relative flex items-center justify-center w-full max-w-[1200px] px-8 pointer-events-none">

          <div className={`flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-right ${isScrolled ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`} />
          <div
            className={`flex items-center shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto h-14 ${
              isScrolled
                ? 'px-8 bg-white/90 backdrop-blur-md border border-[#1A2F24]/10 shadow-[0_8px_32px_rgba(26,47,36,0.08)] rounded-full mx-0'
                : 'px-4 bg-transparent border-transparent mx-4'
            }`}
          >
            <NavGroup links={LEFT_LINKS} activeSection={activeSection} onNavigate={handleNavigate} />

            <button
              onClick={() => handleNavigate('home')}
              className="relative group flex items-center justify-center mx-8 active:scale-90 transition-transform duration-300 shrink-0"
              aria-label="Home"
            >
              <div
                style={logoMaskStyle}
                className={`w-9 h-9 transition-colors duration-300 ${activeSection === 'home' ? 'bg-[#1A2F24] scale-110' : 'bg-[#1A2F24]/50 group-hover:bg-[#1A2F24]'} ${isLogoReversing ? 'animate-logo-reverse' : 'animate-logo-forward'}`}
                onAnimationEnd={() => setIsLogoReversing(false)}
              />
            </button>

            <NavGroup links={RIGHT_LINKS} activeSection={activeSection} onNavigate={handleNavigate} />
          </div>

          <div className={`flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isScrolled ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`} />

        </div>
      </motion.nav>


      {/* MOBILE DOCK */}
      <motion.nav
        initial={{ opacity: 0, y: 25, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="md:hidden fixed bottom-6 left-1/2 w-max p-1.5 bg-white/90 backdrop-blur-xl border border-[#1A2F24]/5 shadow-[0_8px_32px_rgba(26,47,36,0.12)] rounded-full z-50 flex items-center gap-1 pointer-events-auto"
      >
        <MobileNavItem link={LEFT_LINKS[0]} isActive={activeSection === 'about'} onNavigate={handleNavigate} />
        <MobileNavItem link={LEFT_LINKS[1]} isActive={activeSection === 'experience'} onNavigate={handleNavigate} />

        <button
          onClick={() => handleNavigate('home')}
          className="relative flex items-center justify-center w-14 h-10 rounded-full active:scale-90 transition-transform duration-300 z-10"
          aria-label="Home"
        >
          {activeSection === 'home' && (
            <motion.div
              layoutId="mobileActiveBackground"
              className="absolute inset-0 bg-[#1A2F24] rounded-full -z-10"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <div
            style={logoMaskStyle}
            className={`w-8 h-8 transition-colors duration-300 ${activeSection === 'home' ? 'bg-white' : 'bg-[#1A2F24]'} ${isLogoReversing ? 'animate-logo-reverse' : 'animate-logo-forward'}`}
            onAnimationEnd={() => setIsLogoReversing(false)}
          />
        </button>

        <MobileNavItem link={RIGHT_LINKS[0]} isActive={activeSection === 'projects'} onNavigate={handleNavigate} />
        <MobileNavItem link={RIGHT_LINKS[1]} isActive={activeSection === 'contact'} onNavigate={handleNavigate} />
      </motion.nav>
    </>
  );
};

export default Navbar;