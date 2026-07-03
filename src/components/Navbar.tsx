import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

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

// 🌊 FLUID TRANSITION
const fluidTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 25,
  mass: 0.8
};

// 🌪️ VARIANTS UNTUK DROPDOWN MOBILE
const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.06, delayChildren: 0.05 } 
  },
  exit: { 
    opacity: 0, 
    transition: { staggerChildren: 0.05, staggerDirection: -1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
};


/* COMPONENTS */
const NavGroup = memo(({ links, pathname }: { links: readonly NavLink[]; pathname: string; }) => (
  <div className="flex items-center gap-2 md:gap-4 font-['Red_Hat_Display'] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
    {links.map((link) => {
      const isActive = pathname === link.path;
      return (
        <Link
          key={link.path}
          to={link.path}
          className={`relative py-1 md:py-1.5 transition-colors duration-300 ease-out flex flex-col items-center justify-center group ${
            isActive 
              ? 'text-[#1A2F24]' 
              : 'text-[#2E4C38]/70 hover:text-[#1A2F24]'
          }`}
        >
          <span className="relative z-10 px-1 md:px-2">{link.name}</span>
          
          {isActive && (
            <motion.div
              layoutId="activeNavLine"
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#4A6750] rounded-full z-0"
              transition={fluidTransition}
            />
          )}
          
          {!isActive && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#4A6750]/40 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0" />
          )}
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

  // FIX: lazy init langsung baca posisi scroll SEBELUM render pertama.
  // Ini menghilangkan kebutuhan setTimeout + state update setelah mount,
  // yang tadinya jadi penyebab navbar "loncat" mode saat refresh di posisi scroll.
  const [isScrolled, setIsScrolled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.scrollY > 30
  );

  // FIX: flag ini dipakai untuk mematikan class transisi CSS pada render
  // pertama, supaya walau ada 1 frame reflow, tidak ada animasi yang kepicu
  // sebelum browser benar-benar "settle" di state yang tepat.
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

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none ${
        hasMounted ? 'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
      } ${
        isScrolled ? 'pt-4 px-4 md:px-0' : 'pt-0 px-0'
      }`}
    >
      <div 
        className={`relative flex items-center justify-between ${
          hasMounted ? 'transition-all duration-500 ease-out' : ''
        } ${
          isScrolled 
            ? 'w-full md:w-[90%] max-w-[620px] h-12 md:h-14 bg-transparent md:bg-white/60 md:backdrop-blur-xl border-transparent md:border md:border-white/60 shadow-none md:shadow-[0_10px_30px_-10px_rgba(46,76,56,0.15)] rounded-full px-4 md:px-6 md:pointer-events-auto' 
            : 'w-full h-20 md:h-24 bg-transparent border-transparent shadow-none rounded-none px-4 md:px-12'
        }`}
      >
        {/* LEFT AREA */}
        <div className="flex-1 flex justify-end items-center h-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ 
              width: isScrolled ? "0%" : "100%", 
              marginRight: isScrolled ? 0 : 16
            }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="h-full flex items-center overflow-hidden"
          >
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 min-w-[15px]" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ width: !isHome ? 'auto' : 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="hidden md:flex justify-end overflow-hidden whitespace-nowrap shrink-0 pointer-events-auto"
          >
            <div className="shrink-0 flex items-center">
              <NavGroup links={LEFT_LINKS} pathname={lastPathRef.current} />
            </div>
          </motion.div>
        </div>

        {/* CENTER ICON - KUCING */}
        <div className="relative z-20 flex items-center justify-center px-2 md:px-4 shrink-0 pointer-events-auto">
          <Link
            to="/"
            className={`group hidden md:flex items-center justify-center shrink-0 relative transition-all duration-500 active:scale-90 aspect-square ${
              isScrolled ? 'h-10' : 'h-14 md:h-16'
            }`}
          >
            <div className="absolute inset-0 bg-[#4A6750]/20 rounded-full blur-xl scale-50 group-hover:scale-150 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100" />
            
            <motion.img 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={iconIdle} 
              alt="Logo" 
              draggable={false} 
              className="h-full w-full object-contain select-none transition-opacity duration-500 group-hover:opacity-0 relative z-10" 
            />
            <motion.img 
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src={iconHover} 
              alt="Logo Hover" 
              draggable={false} 
              className="absolute inset-0 m-auto h-full w-full object-contain select-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(74,103,80,0.5)] z-10" 
            />
          </Link>

          {/* MOBILE TOGGLE / ICON */}
          {isHome ? (
            <Link
              to="/"
              className={`md:hidden group flex items-center justify-center shrink-0 relative transition-all duration-500 active:scale-90 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm ${
                isScrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
            >
              <img src={iconIdle} alt="Logo" draggable={false} className="h-2/3 w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Hover" draggable={false} className="absolute inset-0 m-auto h-2/3 w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className={`md:hidden group flex items-center justify-center shrink-0 relative transition-all duration-500 active:scale-90 focus:outline-none bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm ${
                isScrolled ? 'h-10 w-10' : 'h-12 w-12'
              }`}
              aria-label="Toggle menu"
            >
              <img src={isOpen ? iconHover : iconIdle} alt="Logo Toggle" draggable={false} className="h-2/3 w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Toggle Hover" draggable={false} className="absolute inset-0 m-auto h-2/3 w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </button>
          )}
        </div>

        {/* RIGHT AREA */}
        <div className="flex-1 flex justify-start items-center h-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: !isHome ? 'auto' : 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="hidden md:flex justify-start overflow-hidden whitespace-nowrap shrink-0 pointer-events-auto"
          >
            <div className="shrink-0 flex items-center">
              <NavGroup links={RIGHT_LINKS} pathname={lastPathRef.current} />
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ 
              width: isScrolled ? "0%" : "100%", 
              marginLeft: isScrolled ? 0 : 16
            }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="h-full flex items-center overflow-hidden"
          >
            <div className="w-full h-[1px] bg-gradient-to-l from-transparent via-[#2E4C38]/20 to-[#2E4C38]/40 min-w-[15px]" />
          </motion.div>
        </div>
      </div>

      {/* MOBILE DROPDOWN - MODEL FLOATING PILLS */}
      <AnimatePresence>
        {!isHome && isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute left-0 right-0 z-40 pointer-events-none flex flex-col items-center gap-3 px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolled ? 'top-[80px]' : 'top-[95px]'
            }`}
          >
            {[{ name: 'Home', path: '/' }, ...LEFT_LINKS, ...RIGHT_LINKS].map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div 
                  key={link.path}
                  variants={itemVariants}
                  className="w-full max-w-[260px]"
                  whileTap={{ scale: 0.95 }} 
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`pointer-events-auto flex items-center justify-center w-full py-3.5 rounded-full font-['Red_Hat_Display'] font-bold text-[11px] tracking-[0.25em] uppercase border transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#4A6750]/95 text-[#F9F8F4] border-[#4A6750]/50 shadow-[0_8px_20px_rgba(74,103,80,0.2)]'
                        : 'bg-white/95 text-[#1A2F24] border-white/50 hover:bg-white shadow-[0_8px_20px_rgba(46,76,56,0.05)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;