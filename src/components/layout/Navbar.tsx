import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties, ReactElement } from 'react';
import { useHomeLock } from '../../context/HomeLockContext';

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

// Component for Desktop Navigation Group
const NavGroup = memo(({ links, activeSection, onNavigate }: { links: readonly NavLink[]; activeSection: string; onNavigate: (id: string) => void }) => (
  <div className="flex items-center gap-3 md:gap-6 font-redhat text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
    {links.map((link) => {
      const isActive = activeSection === link.id;
      return (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
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

// Component for Mobile Navigation Item
const MobileNavItem = memo(({ link, isActive, onNavigate }: { link: NavLink; isActive: boolean; onNavigate: (id: string) => void }) => (
  <button
    onClick={() => onNavigate(link.id)}
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
  // Hooks & Context
  const location = useLocation();
  const navigate = useNavigate();
  const { homeLocked, leaveHome, goHome } = useHomeLock();
  
  // States
  const isCoverMode = homeLocked && location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 30
  );
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isLogoReversing, setIsLogoReversing] = useState<boolean>(false);

  // Refs
  const rafRef = useRef<number | null>(null);

  /* EFFECTS */

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 30);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' || isCoverMode) return; 

    let observer: IntersectionObserver;
    
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.1, rootMargin: "-30% 0px -50% 0px" } 
      );

      const sectionIds = ['about', 'experience', 'projects', 'contact'];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 800);

    const handleScrollTop = () => {
      if (window.scrollY < 100) setActiveSection('about');
    };
    
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [location.pathname, isCoverMode]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const targetId = location.state?.targetSection;
    if (!targetId) return;

    if (targetId === 'home') {
      goHome();
      navigate('/', { replace: true, state: {} });
      return;
    }

    let settled = false;
    let observer: MutationObserver | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    const finishScroll = () => {
      if (settled) return;
      const element = document.getElementById(targetId);
      if (!element) return;
      
      settled = true;
      observer?.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);

      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
        
        setTimeout(() => {
          navigate('/', { replace: true, state: {} }); 
        }, 1000);
      }, 100);
    };

    const start = () => {
      if (document.getElementById(targetId)) {
        finishScroll();
        return;
      }
      observer = new MutationObserver(finishScroll);
      observer.observe(document.body, { childList: true, subtree: true });
      safetyTimer = setTimeout(() => observer?.disconnect(), 5000);
    };

    if (homeLocked) {
      leaveHome();
      const delay = setTimeout(start, 1250);
      return () => clearTimeout(delay);
    }

    start();
    return () => {
      observer?.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [location.pathname, location.state, homeLocked, goHome, leaveHome, navigate]);


  /* HANDLERS */

  const handleNavigate = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { targetSection: id } });
      return;
    }
    
    if (id === 'home') {
      setIsLogoReversing(true);
      setActiveSection('about');
      goHome();
      setIsLogoReversing(false);
      return;
    }

    if (homeLocked) {
      leaveHome();
      setActiveSection(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1250);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate, homeLocked, goHome, leaveHome]);


  return (
    <AnimatePresence>
      {!isCoverMode && (
        <>
          {/* DESKTOP NAVBAR */}
          <motion.nav
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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

                {/* Home Button Desktop */}
                <button
                  onClick={() => handleNavigate('home')}
                  className="relative group flex items-center justify-center mx-8 active:scale-90 transition-transform duration-300 shrink-0"
                  aria-label="Home"
                >
                  <div
                    style={logoMaskStyle}
                    className={`w-9 h-9 bg-[#1A2F24] group-hover:bg-[#4A6750] transition-colors duration-300 ${isLogoReversing ? 'animate-logo-reverse' : 'animate-logo-forward'}`}
                  />
                </button>

                <NavGroup links={RIGHT_LINKS} activeSection={activeSection} onNavigate={handleNavigate} />
              </div>

              <div className={`flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isScrolled ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`} />
            
            </div>
          </motion.nav>


          {/* MOBILE DOCK */}
          <motion.nav 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%", transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed bottom-6 left-1/2 w-max p-1.5 bg-white/90 backdrop-blur-xl border border-[#1A2F24]/5 shadow-[0_8px_32px_rgba(26,47,36,0.12)] rounded-full z-50 flex items-center gap-1 pointer-events-auto"
          >
            <MobileNavItem link={LEFT_LINKS[0]} isActive={activeSection === 'about'} onNavigate={handleNavigate} />
            <MobileNavItem link={LEFT_LINKS[1]} isActive={activeSection === 'experience'} onNavigate={handleNavigate} />
            
            {/* Home Button Mobile */}
            <button
              onClick={() => handleNavigate('home')}
              className="relative flex items-center justify-center w-14 h-10 active:scale-90 transition-transform duration-300"
              aria-label="Home"
            >
              <div
                style={logoMaskStyle}
                className={`w-8 h-8 bg-[#1A2F24] ${isLogoReversing ? 'animate-logo-reverse' : 'animate-logo-forward'}`}
              />
            </button>

            <MobileNavItem link={RIGHT_LINKS[0]} isActive={activeSection === 'projects'} onNavigate={handleNavigate} />
            <MobileNavItem link={RIGHT_LINKS[1]} isActive={activeSection === 'contact'} onNavigate={handleNavigate} />
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;