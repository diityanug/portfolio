import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Impor aset baru sesuai request
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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const springTransition = {
    type: 'spring' as const,
    stiffness: 60,
    damping: 28,
    mass: 0.8,
  };

  return (
    <nav 
      className={`w-full py-4 md:py-5 px-4 md:px-16 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center w-full h-12 md:h-16 relative min-w-0">

        {/* DYNAMIC LINE */}
        <motion.div
          layout
          layoutDependency={isHome}
          transition={springTransition}
          className="flex-grow shrink min-w-[40px] md:min-w-[80px] h-8 flex items-center"
        >
          <div className="w-full h-[2px] bg-black/20 rounded-full" />
        </motion.div>

        {/* SPACER */}
        <motion.div
          layout
          layoutDependency={isHome}
          transition={springTransition}
          className="w-[clamp(12px,2vw,36px)] shrink-0"
        />

        {/* RIGHT SIDE */}
        <motion.div
          layout
          layoutDependency={isHome}
          transition={springTransition}
          className="flex items-center justify-end shrink-0 relative min-h-[48px] md:min-h-16 gap-5 lg:gap-8"
        >
          {/* LOGO AREA */}
          <motion.div 
            layout 
            layoutDependency={isHome}
            transition={springTransition} 
            className="flex items-center z-10"
          >
            <Link 
              to="/" 
              className="relative flex items-center h-12 md:h-16 shrink-0 -translate-y-[2px]"
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
          </motion.div>

          {/* NAV LINKS */}
          <AnimatePresence mode="popLayout">
            {!isHome && (
              <motion.div
                layout
                layoutDependency={isHome}
                key="nav-links"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={springTransition}
                className="flex items-center gap-5 lg:gap-8"
              >
                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-5 lg:gap-8 font-google font-bold text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">
                  {navLinks
                    .filter(link => link.path !== '/')
                    .map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`${
                          location.pathname === link.path
                            ? 'opacity-100 text-[#5E7657]'
                            : 'opacity-40 text-[#2A2320]'
                        } hover:opacity-100 hover:text-[#5E7657] transition-all duration-300 flex items-center shrink-0`}
                      >
                        {link.name}
                      </Link>
                    ))}
                </div>

                {/* MOBILE MENU (SUPER SMOOTH GPU ACCELERATED SVG) */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden flex items-center justify-center w-10 h-10 z-50 focus:outline-none"
                >
                  <motion.svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={isOpen ? "open" : "closed"}
                    className="overflow-visible"
                  >
                    <motion.path
                      d="M 4 7 L 20 7"
                      stroke={isOpen ? "#5E7657" : "#2A2320"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      variants={{
                        closed: { y: 0, rotate: 0 },
                        open: { y: 5, rotate: 45 }
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      style={{ originX: "50%", originY: "50%" }}
                    />
                    <motion.path
                      d="M 4 12 L 20 12"
                      stroke={isOpen ? "#5E7657" : "#2A2320"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      variants={{
                        closed: { opacity: 1, x: 0 },
                        open: { opacity: 0, x: 20 } 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.path
                      d="M 4 17 L 20 17"
                      stroke={isOpen ? "#5E7657" : "#2A2320"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      variants={{
                        closed: { y: 0, rotate: 0 },
                        open: { y: -5, rotate: -45 } 
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      style={{ originX: "50%", originY: "50%" }}
                    />
                  </motion.svg>
                </button>
                
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MOBILE DROPDOWN: COMIC REVEAL STYLE */}
      <AnimatePresence>
        {!isHome && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md overflow-hidden md:hidden shadow-sm -z-10"
          >
            {/* Garis Komik Penanda yang ditipiskan (h-[1px]) */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-[1px] bg-[#2A2320]/40 origin-right"
            />

            {/* List Navigasi yang muncul satu per satu */}
            <motion.div 
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                }
              }}
              className="flex flex-col items-center pt-8 pb-10 gap-6"
            >
              {navLinks
                .filter(link => link.path !== '/')
                .map((link) => (
                  <motion.div 
                    key={link.path}
                    variants={{
                      hidden: { y: -15, opacity: 0 },
                      show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`font-google font-bold text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                        location.pathname === link.path
                          ? 'opacity-100 text-[#5E7657]'
                          : 'opacity-40 text-[#2A2320]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;