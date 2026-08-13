import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { useHomeLock } from '../../context/HomeLockContext';

import iconIdle from '../../assets/iconIdle.svg';
import iconHover from '../../assets/iconHover.svg';

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

const syncTransition: Transition = {
  type: "tween",
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

const smoothCssTransition = 'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]';

const getMenuIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'home': return <Home size={18} strokeWidth={2.5} />;
    case 'profile': return <User size={18} strokeWidth={2.5} />;
    case 'experience': return <Briefcase size={18} strokeWidth={2.5} />;
    case 'projects': return <Code size={18} strokeWidth={2.5} />;
    case 'contact': return <Mail size={18} strokeWidth={2.5} />;
    default: return null;
  }
};

/* COMPONENT: DESKTOP NAV GROUP (Teks) */
const NavGroup = memo(({ links, activeSection, onNavigate }: { links: readonly NavLink[]; activeSection: string; onNavigate: (id: string) => void }) => (
  <div className="flex items-center gap-2 md:gap-4 font-redhat text-[10px] md:text-xs tracking-[0.2em] uppercase">
    {links.map((link) => {
      const isActive = activeSection === link.id;
      return (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          className={`relative py-1 md:py-1.5 px-2 transition-colors duration-500 ease-out flex flex-col items-center justify-center group ${
            isActive 
              ? 'text-[#1A2F24]' 
              : 'text-[#2E4C38]/80 hover:text-[#1A2F24]'
          }`}
        >
          <span 
            data-text={link.name}
            className={`relative flex flex-col items-center justify-center before:content-[attr(data-text)] before:font-extrabold before:invisible before:h-0 ${
              isActive ? 'font-extrabold' : 'font-medium'
            }`}
          >
            {link.name}
          </span>
          
          {/* Dot Desktop */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            {isActive ? (
              <motion.div
                layoutId="desktopDot"
                layout="position"
                className="w-1 h-1 bg-[#1A2F24] rounded-full"
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            ) : (
              <div className="w-1 h-1 bg-[#4A6750]/40 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 absolute top-0 left-0" />
            )}
          </div>
        </button>
      );
    })}
  </div>
));
NavGroup.displayName = 'NavGroup';

/* COMPONENT: MOBILE NAV ITEM (Icon) */
const MobileNavItem = memo(({ link, isActive, onNavigate }: { link: NavLink; isActive: boolean; onNavigate: (id: string) => void }) => (
  <button
    onClick={() => onNavigate(link.id)}
    className={`relative flex-1 flex flex-col items-center justify-center h-full gap-1 transition-colors duration-300 ${
      isActive ? 'text-[#1A2F24]' : 'text-[#2E4C38]/40 hover:text-[#1A2F24]'
    }`}
    aria-label={link.name}
  >
    <span className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'scale-100'}`}>
      {getMenuIcon(link.name)}
    </span>
    {/* Dot Mobile */}
    {isActive && (
      <motion.div
        layoutId="mobileDot"
        className="absolute bottom-2.5 w-1 h-1 bg-[#1A2F24] rounded-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
));
MobileNavItem.displayName = 'MobileNavItem';

/* MAIN NAVBAR */
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { homeLocked, leaveHome, goHome } = useHomeLock();
  
  // Status untuk mendeteksi apakah kita sedang di layar Cover
  const isCoverMode = homeLocked && location.pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 30
  );
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setHasMounted(true);
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

  // PERBAIKAN BUG OBSERVER: Deteksi lebih akurat + Fallback scroll ke atas
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
        // Root margin diubah agar bertindak seperti "laser" di pertengahan atas layar
        { threshold: 0.1, rootMargin: "-30% 0px -50% 0px" } 
      );

      const sectionIds = ['about', 'experience', 'projects', 'contact'];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 800);

    // FALLBACK ANTI-BUG: Jika user men-scroll mentok sampai paling atas, paksa nyalakan icon Profile
    const handleScrollTop = () => {
      if (window.scrollY < 100) {
        setActiveSection('about');
      }
    };
    
    // Tambahkan event listener scroll khusus untuk mengecek batas atas
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [location.pathname, isCoverMode]);

  // BARU: konsumsi hash target (misal "#contact") pas navigasi masuk ke "/" dari route lain (mis. ProjectDetail)
  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const targetId = location.hash.slice(1);

    // Klik "home" dari luar "/" -> munculin cover lagi, bukan scroll ke section
    if (targetId === 'home') {
      goHome();
      navigate('/', { replace: true });
      return;
    }

    let attempts = 0;
    let rafId: number;

    const tryScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
        navigate(location.pathname, { replace: true }); // bersihin hash biar gak nyangkut/re-trigger
        return;
      }
      if (attempts < 30) {
        attempts += 1;
        rafId = requestAnimationFrame(tryScroll);
      }
    };

    if (homeLocked) {
      leaveHome();
      const timer = setTimeout(tryScroll, 1250);
      return () => clearTimeout(timer);
    }

    tryScroll();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname, location.hash, homeLocked, goHome, leaveHome, navigate]);

  const handleNavigate = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    
    if (id === 'home') {
      goHome();
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
          {/* =======================
              DESKTOP NAVBAR (TOP)
              ======================= */}
          <motion.nav
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={`hidden md:flex fixed top-0 left-0 w-full z-50 justify-center pointer-events-none ${
              hasMounted ? smoothCssTransition : ''
            } ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}
          >
            <div 
              className={`relative flex items-center justify-between border ${
                hasMounted ? smoothCssTransition : ''
              } ${
                isScrolled 
                  ? 'w-full md:w-[90%] max-w-[620px] h-12 md:h-14 border-transparent md:border-white/60 shadow-none md:shadow-[0_10px_30px_-10px_rgba(46,76,56,0.15)] rounded-full px-4 md:px-6 pointer-events-auto' 
                  : 'w-full h-20 md:h-24 border-transparent shadow-none rounded-none px-4 md:px-12 pointer-events-auto'
              }`}
            >
              {/* GLASS OVERLAY */}
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: isScrolled ? 1 : 0,
                  backdropFilter: isScrolled ? 'blur(24px)' : 'blur(0px)',
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 -z-10 rounded-[inherit] bg-white/60"
              />
              
              {/* KIRI */}
              <div className="flex-1 flex justify-end items-center h-full overflow-hidden">
                <div className={`flex items-center h-full mr-4 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
                  <div className={`w-full h-[2px] origin-right bg-gradient-to-r from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'scale-x-150 scale-y-50' : 'scale-x-100 scale-y-50'}`} />
                </div>
                <motion.div initial={false} animate={{ width: 'auto' }} transition={syncTransition} className="flex justify-start overflow-hidden whitespace-nowrap shrink-0 pointer-events-auto">
                  <div className="shrink-0 flex items-center">
                    <NavGroup links={LEFT_LINKS} activeSection={activeSection} onNavigate={handleNavigate} />
                  </div>
                </motion.div>
              </div>

              {/* TENGAH (Kucing) Desktop */}
              <div className="relative z-20 flex items-center justify-center px-2 md:px-4 shrink-0 pointer-events-auto">
                <button
                  onClick={() => handleNavigate('home')}
                  className={`group flex items-center justify-center shrink-0 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 aspect-square ${
                    isScrolled ? 'h-10' : 'h-14 md:h-16'
                  }`}
                >
                  <div className="absolute inset-0 bg-[#4A6750]/20 rounded-full blur-xl scale-50 group-hover:scale-150 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100" />
                  <motion.img 
                    animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    src={iconIdle} alt="Logo" draggable={false} 
                    className="h-full w-full object-contain select-none transition-opacity duration-700 group-hover:opacity-0 relative z-10" 
                  />
                  <motion.img 
                    animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    src={iconHover} alt="Logo Hover" draggable={false} 
                    className="absolute inset-0 m-auto h-full w-full object-contain select-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(74,103,80,0.5)] z-10" 
                  />
                </button>
              </div>

              {/* KANAN */}
              <div className="flex-1 flex justify-start items-center h-full overflow-hidden">
                <motion.div initial={false} animate={{ width: 'auto' }} transition={syncTransition} className="flex justify-end overflow-hidden whitespace-nowrap shrink-0 pointer-events-auto">
                  <div className="shrink-0 flex items-center">
                    <NavGroup links={RIGHT_LINKS} activeSection={activeSection} onNavigate={handleNavigate} />
                  </div>
                </motion.div>
                <div className={`flex items-center h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'max-w-0 opacity-0 ml-0' : 'max-w-[1000px] flex-1 opacity-100 ml-4'}`}>
                  <div className={`w-full h-[2px] origin-left bg-gradient-to-l from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'scale-x-150 scale-y-50' : 'scale-x-100 scale-y-50'}`} />
                </div>
              </div>
            </div>
          </motion.nav>

          {/* =======================
              MOBILE DOCK (BOTTOM)
              ======================= */}
          <motion.nav 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%", transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="md:hidden fixed bottom-5 left-1/2 w-[92%] max-w-[380px] h-[52px] bg-white/90 backdrop-blur-xl border border-white/60 shadow-[0_10px_35px_-10px_rgba(46,76,56,0.25)] rounded-full z-50 flex items-center justify-between px-2 pointer-events-auto"
          >
            <div className="flex-1 flex justify-evenly h-full items-center">
              <MobileNavItem link={LEFT_LINKS[0]} isActive={activeSection === 'about'} onNavigate={handleNavigate} />
              <MobileNavItem link={LEFT_LINKS[1]} isActive={activeSection === 'experience'} onNavigate={handleNavigate} />
            </div>

            {/* Home / Kucing */}
            <button
              onClick={() => handleNavigate('home')}
              className="relative group w-[56px] h-[56px] flex items-center justify-center shrink-0 -mt-6 bg-[#F9F8F4] rounded-full border-[4px] border-white shadow-[0_8px_16px_-6px_rgba(46,76,56,0.25)] active:scale-95 transition-all duration-300 z-10"
            >
              <motion.img 
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                src={iconIdle} 
                alt="Home" 
                className="w-[28px] h-[28px] object-contain drop-shadow-sm" 
              />
            </button>

            <div className="flex-1 flex justify-evenly h-full items-center">
              <MobileNavItem link={RIGHT_LINKS[0]} isActive={activeSection === 'projects'} onNavigate={handleNavigate} />
              <MobileNavItem link={RIGHT_LINKS[1]} isActive={activeSection === 'contact'} onNavigate={handleNavigate} />
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;