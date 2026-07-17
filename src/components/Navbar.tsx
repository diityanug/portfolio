import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';

import iconIdle from '../assets/iconIdle.svg';
import iconHover from '../assets/iconHover.svg';

/* TYPES & CONSTANTS */
interface NavLink {
  name: string;
  path: string;
}

const LEFT_LINKS: readonly NavLink[] = [
  { name: 'Profile', path: '/about' },
  { name: 'Experience', path: '/experience' },
] as const;

const RIGHT_LINKS: readonly NavLink[] = [
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
] as const;


const syncTransition: Transition = {
  type: "tween",
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

const smoothCssTransition = 'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]';

const getMenuIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'home': return <Home size={16} strokeWidth={2.5} />;
    case 'profile': return <User size={16} strokeWidth={2.5} />;
    case 'experience': return <Briefcase size={16} strokeWidth={2.5} />;
    case 'projects': return <Code size={16} strokeWidth={2.5} />;
    case 'contact': return <Mail size={16} strokeWidth={2.5} />;
    default: return null;
  }
};

/* COMPONENTS */
const NavGroup = memo(({ links, pathname }: { links: readonly NavLink[]; pathname: string; }) => (
  <div className="flex items-center gap-2 md:gap-4 font-redhat text-[10px] md:text-xs tracking-[0.2em] uppercase">
    {links.map((link) => {
      const isActive = pathname === link.path;
      return (
        <Link
          key={link.path}
          to={link.path}
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
          
          {/* Dot */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
            {isActive ? (
              <motion.div
                layoutId="tinyDot"
                layout="position"
                className="w-1 h-1 bg-[#1A2F24] rounded-full"
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            ) : (
              <div className="w-1 h-1 bg-[#4A6750]/40 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 absolute top-0 left-0" />
            )}
          </div>
        </Link>
      );
    })}
  </div>
));
NavGroup.displayName = 'NavGroup';

/* MAIN NAVBAR */
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 30
  );

  const [hasMounted, setHasMounted] = useState<boolean>(false);
  
  const rafRef = useRef<number | null>(null);
  const lastPathRef = useRef<string>(location.pathname);
  
  if (!isHome) {
    lastPathRef.current = location.pathname;
  }

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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen && !isHome ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isHome]);

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none ${
        hasMounted ? smoothCssTransition : ''
      } ${
        isScrolled ? 'pt-4 px-4 md:px-0' : 'pt-0 px-0'
      }`}
    >
      <div 
        className={`relative flex items-center justify-between border ${
          hasMounted ? smoothCssTransition : ''
        } ${
          isScrolled 
            ? 'w-full md:w-[90%] max-w-[620px] h-12 md:h-14 border-transparent md:border-white/60 shadow-none md:shadow-[0_10px_30px_-10px_rgba(46,76,56,0.15)] rounded-full px-4 md:px-6 md:pointer-events-auto' 
            : 'w-full h-20 md:h-24 border-transparent shadow-none rounded-none px-4 md:px-12'
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
          className="hidden md:block absolute inset-0 -z-10 rounded-[inherit] bg-white/60"
        />
        
        {/* LEFT AREA */}
        <div className="flex-1 flex justify-end items-center h-full overflow-hidden">
          <div
            className={`flex items-center h-full mr-4 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1 ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div 
              className={`w-full h-[2px] origin-right bg-gradient-to-r from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'scale-x-150 scale-y-50' : 'scale-x-100 scale-y-50'
              }`} 
            />
          </div>

          <motion.div
            initial={false}
            animate={{ width: !isHome ? 'auto' : 0 }}
            transition={syncTransition}
            className="hidden md:flex justify-end overflow-hidden whitespace-nowrap shrink-0 pointer-events-auto"
          >
            <div className="shrink-0 flex items-center">
              <NavGroup links={LEFT_LINKS} pathname={lastPathRef.current} />
            </div>
          </motion.div>
        </div>

        {/* CENTER ICON */}
        <div className="relative z-20 flex items-center justify-center px-2 md:px-4 shrink-0 pointer-events-auto">
          <Link
            to="/"
            className={`group hidden md:flex items-center justify-center shrink-0 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 aspect-square ${
              isScrolled ? 'h-10' : 'h-14 md:h-16'
            }`}
          >
            <div className="absolute inset-0 bg-[#4A6750]/20 rounded-full blur-xl scale-50 group-hover:scale-150 transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100" />
            
            <motion.img 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              src={iconIdle} 
              alt="Logo" 
              draggable={false} 
              className="h-full w-full object-contain select-none transition-opacity duration-700 group-hover:opacity-0 relative z-10" 
            />
            <motion.img 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              src={iconHover} 
              alt="Logo Hover" 
              draggable={false} 
              className="absolute inset-0 m-auto h-full w-full object-contain select-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(74,103,80,0.5)] z-10" 
            />
          </Link>

          {/* MOBILE TOGGLE / ICON */}
          {isHome ? (
            <Link
              to="/"
              className={`md:hidden group flex items-center justify-center shrink-0 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm ${
                isScrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
            >
              <img src={iconIdle} alt="Logo" draggable={false} className="h-2/3 w-auto object-contain select-none transition-opacity duration-500 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Hover" draggable={false} className="absolute inset-0 m-auto h-2/3 w-auto object-contain select-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 drop-shadow-md" />
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className={`md:hidden group flex items-center justify-center shrink-0 relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 focus:outline-none bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm ${
                isScrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
              aria-label="Toggle menu"
            >
              <img src={isOpen ? iconHover : iconIdle} alt="Logo Toggle" draggable={false} className="h-2/3 w-auto object-contain select-none transition-opacity duration-500 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Toggle Hover" draggable={false} className="absolute inset-0 m-auto h-2/3 w-auto object-contain select-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            </button>
          )}
        </div>

        {/* RIGHT AREA */}
        <div className="flex-1 flex justify-start items-center h-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: !isHome ? 'auto' : 0 }}
            transition={syncTransition}
            className="hidden md:flex justify-start overflow-hidden whitespace-nowrap shrink-0 pointer-events-auto"
          >
            <div className="shrink-0 flex items-center">
              <NavGroup links={RIGHT_LINKS} pathname={lastPathRef.current} />
            </div>
          </motion.div>

          <div
            className={`flex items-center h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? 'max-w-0 opacity-0 ml-0' : 'max-w-[1000px] flex-1 opacity-100 ml-4'
            }`}
          >
            <div 
              className={`w-full h-[2px] origin-left bg-gradient-to-l from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'scale-x-150 scale-y-50' : 'scale-x-100 scale-y-50'
              }`} 
            />
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN - MODERN APP MENU (BEST FOR ICONS) */}
      <AnimatePresence>
          {!isHome && isOpen && (
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 z-10 bg-[#1A2F24]/20 backdrop-blur-sm pointer-events-auto"
              aria-hidden="true"
            />
          )}
          {!isHome && isOpen && (
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0, duration: 0.4 } }}
              exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.2 } }}
              // inset-x-4 agar jarak rata di kiri-kanan layar
              className="md:hidden absolute top-full inset-x-4 mt-3 z-30 p-3 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-15px_rgba(46,76,56,0.2)] flex flex-col gap-1 pointer-events-auto origin-top"
            >
              {[{ name: 'Home', path: '/' }, ...LEFT_LINKS, ...RIGHT_LINKS].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex items-center w-full p-2.5 rounded-2xl transition-all duration-300 group ${
                      isActive 
                        ? 'bg-[#1A2F24]/5' 
                        : 'hover:bg-[#1A2F24]/5'
                    }`}
                  >
                    {/* Kotak Ikon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#1A2F24] text-white shadow-md' 
                        : 'bg-white text-[#2E4C38]/50 border border-[#1A2F24]/10 group-hover:text-[#1A2F24] group-hover:border-[#1A2F24]/30'
                    }`}>
                      <span className={`${isActive ? 'scale-100' : 'scale-95 group-hover:scale-110 group-hover:rotate-3'} transition-transform duration-300`}>
                        {getMenuIcon(link.name)}
                      </span>
                    </div>
                    
                    {/* Teks */}
                    <span className={`flex-1 ml-4 font-redhat text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive ? 'text-[#1A2F24] font-extrabold' : 'text-[#2E4C38]/70 font-medium group-hover:text-[#1A2F24]'
                    }`}>
                      {link.name}
                    </span>

                    {/* Indikator Titik Aktif di Kanan */}
                    <div className={`w-1.5 h-1.5 mr-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-[#1A2F24] scale-100' : 'bg-transparent scale-0'
                    }`} />
                  </Link>
                );
              })}
            </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;