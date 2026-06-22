import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';

import iconIdle from '../assets/iconIdle.svg';
import iconHover from '../assets/iconHover.svg';

/* TYPES & CONSTANTS */
// Link interface
interface NavLink {
  name: string;
  path: string;
}

// Left side links
const LEFT_LINKS: readonly NavLink[] = [
  { name: 'Profile', path: '/about' },
  { name: 'Experience', path: '/experience' },
] as const;

// Right side links
const RIGHT_LINKS: readonly NavLink[] = [
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
] as const;

// Animation config
const navTransition: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

/* COMPONENTS */
// NavGroup wrapper
const NavGroup = memo(({ links, pathname, spacing }: { links: readonly NavLink[]; pathname: string; spacing: string }) => (
  <div className={`flex items-center gap-5 lg:gap-8 font-garbata font-bold text-sm tracking-[0.3em] uppercase ${spacing}`}>
    {links.map((link) => {
      const isActive = pathname === link.path;
      return (
        <Link
          key={link.path}
          to={link.path}
          className={`relative flex items-center shrink-0 transition-all duration-500 ease-in-out hover:text-[#5E7657] hover:opacity-100 ${
            isActive ? 'text-[#5E7657] opacity-100' : 'text-[#2A2320] opacity-40'
          }`}
        >
          <span className="relative z-10">{link.name}</span>
        </Link>
      );
    })}
  </div>
));
NavGroup.displayName = 'NavGroup';

/* MAIN NAVBAR */
const Navbar = () => {
  // State management
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  // Refs
  const rafRef = useRef<number | null>(null);
  const lastPathRef = useRef<string>(location.pathname);
  
  if (!isHome) {
    lastPathRef.current = location.pathname;
  }

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
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

  // Route change listener
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <nav
      className={`w-full h-16 md:h-20 fixed top-0 left-0 z-50 transition-all duration-300 px-4 md:px-8 ${
        isScrolled 
          ? 'bg-[#F9F8F4]/80 backdrop-blur-md shadow-sm border-b border-[#2E4C38]/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-between">

        {/* LEFT AREA */}
        <div className="flex-1 flex justify-end items-center h-full overflow-hidden">
          <div className="flex-grow h-full flex items-center pr-8 lg:pr-12">
            <div className="w-full h-[2px] bg-black/20 rounded-full min-w-[20px]" />
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: !isHome ? 'auto' : 0 }}
            transition={navTransition}
            className="hidden md:flex justify-end overflow-hidden whitespace-nowrap"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: !isHome ? 1 : 0, x: !isHome ? 0 : 50 }}
              transition={navTransition}
              className="shrink-0 flex items-center"
            >
              <NavGroup links={LEFT_LINKS} pathname={lastPathRef.current} spacing="pr-2" />
            </motion.div>
          </motion.div>
          <div className="w-[clamp(16px,2vw,36px)] shrink-0" />
        </div>

        {/* CENTER ICON */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none px-4">
          <Link
            to="/"
            className="group hidden md:flex items-center justify-center h-12 md:h-16 shrink-0 relative transition-transform duration-300 active:scale-95 pointer-events-auto"
          >
            <img src={iconIdle} alt="Logo" draggable={false} className="h-full w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
            <img src={iconHover} alt="Logo Hover" draggable={false} className="absolute inset-0 m-auto h-full w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
          </Link>

          {isHome ? (
            <Link
              to="/"
              className="md:hidden group flex items-center justify-center h-12 shrink-0 relative transition-transform duration-300 active:scale-95 pointer-events-auto"
            >
              <img src={iconIdle} alt="Logo" draggable={false} className="h-full w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Hover" draggable={false} className="absolute inset-0 m-auto h-full w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className="md:hidden group flex items-center justify-center h-12 shrink-0 relative transition-transform duration-300 active:scale-95 pointer-events-auto focus:outline-none"
              aria-label="Toggle menu"
            >
              <img src={isOpen ? iconHover : iconIdle} alt="Logo Toggle" draggable={false} className="h-full w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Toggle Hover" draggable={false} className="absolute inset-0 m-auto h-full w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
            </button>
          )}
        </div>

        {/* RIGHT AREA */}
        <div className="flex-1 flex justify-start items-center h-full overflow-hidden">
          <div className="w-[clamp(16px,2vw,36px)] shrink-0" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: !isHome ? 'auto' : 0 }}
            transition={navTransition}
            className="hidden md:flex justify-start overflow-hidden whitespace-nowrap"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: !isHome ? 1 : 0, x: !isHome ? 0 : -50 }}
              transition={navTransition}
              className="shrink-0 flex items-center"
            >
              <NavGroup links={RIGHT_LINKS} pathname={lastPathRef.current} spacing="pl-2" />
            </motion.div>
          </motion.div>
          <div className="flex-grow h-full flex items-center pl-8 lg:pl-12">
            <div className="w-full h-[2px] bg-black/20 rounded-full min-w-[20px]" />
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {!isHome && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
            className="absolute top-full left-0 w-full bg-[#F9F8F4]/95 backdrop-blur-md overflow-hidden md:hidden shadow-sm -z-10 origin-top border-b border-[#2E4C38]/10"
          >
            <div className="flex flex-col items-center pt-8 pb-10 gap-6 px-4">
              {[{ name: 'Home', path: '/' }, ...LEFT_LINKS, ...RIGHT_LINKS].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-garbata font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-500 ease-in-out active:scale-95 border-b-2 pb-1 ${
                      isActive
                        ? 'border-[#5E7657] opacity-100 text-[#5E7657]'
                        : 'border-transparent opacity-40 text-[#2A2320]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;