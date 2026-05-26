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

  // State sederhana untuk mendeteksi hover
  const [isHovered, setIsHovered] = useState(false);

  // Efek untuk mendeteksi scroll layar
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
    /* PERBAIKAN: Menipiskan padding vertikal navbar menggunakan py-4 md:py-5 */
    <nav 
      className={`w-full py-4 md:py-5 px-4 md:px-16 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* PERBAIKAN: Menyesuaikan tinggi kontainer utama menjadi h-12 md:h-16 agar pas dengan ukuran kucing yang diperbesar */}
      <div className="flex items-center w-full h-12 md:h-16 relative min-w-0">

        {/* DYNAMIC LINE */}
        <motion.div
          layout
          layoutDependency={isHome}
          transition={springTransition}
          className="
            flex-grow
            shrink
            min-w-[40px]
            md:min-w-[80px]
            h-8
            flex
            items-center
          "
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
          className="
            flex
            items-center
            justify-end
            shrink-0
            relative
            min-h-[48px]
            md:min-h-16
            gap-5
            lg:gap-8
          "
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
              /* PERBAIKAN: Menyesuaikan tinggi elemen pembungkus Link (h-12 md:h-16) */
              className="relative flex items-center h-12 md:h-16 shrink-0 -translate-y-[2px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? `${iconHover}?t=${Date.now()}` : iconIdle}
                alt="Logo"
                draggable={false}
                /* PERBAIKAN: Memperbesar tinggi Gambar kucing menjadi h-12 md:h-16 */
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
                <div
                  className="
                    hidden
                    md:flex
                    items-center
                    gap-5
                    lg:gap-8
                    font-google
                    font-bold
                    text-[10px]
                    md:text-sm
                    tracking-[0.2em]
                    md:tracking-[0.3em]
                    uppercase
                    whitespace-nowrap
                  "
                >
                  {navLinks
                    .filter(link => link.path !== '/')
                    .map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`${
                          location.pathname === link.path
                            ? 'opacity-100'
                            : 'opacity-40'
                        } hover:opacity-100 transition-all duration-300 flex items-center shrink-0`}
                      >
                        {link.name}
                      </Link>
                    ))}
                </div>

                {/* MOBILE MENU */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="
                    md:hidden
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-[5px]
                    w-8
                    h-8
                    z-50
                    focus:outline-none
                  "
                >
                  <span
                    className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                      isOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                      isOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                      isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`}
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {!isHome && isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              ...springTransition,
              delay: 0.05,
            }}
            className="
              absolute
              top-full
              left-0
              w-full
              bg-white/90
              backdrop-blur-md
              flex
              flex-col
              items-center
              pt-0
              pb-9
              gap-6
              border-b
              border-black/10
              md:hidden
              shadow-sm
            "
          >
            {navLinks
              .filter(link => link.path !== '/')
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    font-google
                    font-bold
                    text-[11px]
                    tracking-[0.2em]
                    uppercase
                    ${
                      location.pathname === link.path
                        ? 'opacity-100'
                        : 'opacity-40'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;