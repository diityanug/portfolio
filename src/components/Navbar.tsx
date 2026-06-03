import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import iconIdle from '../assets/iconIdle.svg';
import iconHover from '../assets/iconHover.png';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const lightweightTransition = {
    type: 'tween' as const,
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <nav 
      className={`w-full py-4 md:py-5 px-4 md:px-16 fixed top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center w-full h-12 md:h-16 relative min-w-0">

        {/* DYNAMIC LINE */}
        <div className="flex-grow shrink min-w-[40px] md:min-w-[80px] h-8 flex items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="w-full h-[2px] bg-black/20 rounded-full" />
        </div>

        {/* SPACER */}
        <div className="w-[clamp(12px,2vw,36px)] shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

        {/* RIGHT SIDE AREA */}
        <div className="flex items-center justify-end shrink-0 relative min-h-[48px] md:min-h-16">
          
          {/* DESKTOP NAV LINKS */}
          <AnimatePresence>
            {!isHome && (
              <motion.div
                key="desktop-nav"
                initial={{ opacity: 0, x: 30, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ 
                  opacity: 0, 
                  x: 25, 
                  width: 0,
                  transition: {
                    width: { duration: 0.2, ease: "easeIn" },
                    opacity: { duration: 0.15 },
                    x: { duration: 0.2, ease: "easeIn" }
                  }
                }}
                transition={lightweightTransition}
                className="hidden md:flex items-center gap-5 lg:gap-8 overflow-hidden whitespace-nowrap pr-5 lg:pr-8 font-google font-bold text-sm tracking-[0.3em] uppercase will-change-[width,opacity]"
              >
                {navLinks
                  .filter(link => link.path !== '/')
                  .map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`relative pb-1.5 flex items-center shrink-0 transition-colors duration-300 hover:text-[#5E7657] ${
                          isActive ? 'text-[#5E7657] opacity-100' : 'text-[#2A2320] opacity-40'
                        }`}
                      >
                        <span className="relative z-10">{link.name}</span>
                        
                        {/* Efek Garis Meluncur Mulus */}
                        {isActive && (
                          <motion.div
                            layoutId="desktopActiveUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#5E7657] rounded-full"
                            transition={lightweightTransition}
                          />
                        )}
                      </Link>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGO AREA */}
          <div className="flex items-center z-10 shrink-0">
            {/* Desktop Version */}
            <Link 
              to="/" 
              className="hidden md:flex items-center h-12 md:h-16 shrink-0 -translate-y-[2px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? `${iconHover}?t=${Date.now()}` : iconIdle}
                alt="Logo"
                draggable={false}
                className="h-12 md:h-16 w-auto object-contain select-none transition-transform duration-200 active:scale-95"
              />
            </Link>

            {/* Mobile Version */}
            {!isHome && (
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex md:hidden items-center h-12 shrink-0 -translate-y-[2px] focus:outline-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={isOpen || isHovered ? `${iconHover}?t=${Date.now()}` : iconIdle}
                  alt="Menu Toggle"
                  draggable={false}
                  className="h-12 w-auto object-contain select-none transition-transform duration-200 active:scale-95"
                />
              </button>
            )}

            {/* Mobile Version (Home Section) */}
            {isHome && (
              <Link to="/" className="flex md:hidden items-center h-12 shrink-0 -translate-y-[2px]">
                <img src={iconIdle} alt="Logo" className="h-12 w-auto object-contain" />
              </Link>
            )}
          </div>
          
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {!isHome && isOpen && (
          <motion.div
            key="centered-mobile-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={lightweightTransition}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md overflow-hidden md:hidden shadow-sm -z-10"
          >
            <div className="flex flex-col items-center pt-8 pb-10 gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-google font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-300 active:scale-95 border-b-2 pb-1 ${
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