import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Profile', href: '#profile' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

// clip-path dipakai (bukan height: auto) agar tidak terjadi jank layout
const dropdownVariants: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_OUT,
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
  exit: {
    clipPath: 'inset(0% 0% 100% 0%)',
    opacity: 0,
    transition: { duration: 0.25, ease: EASE_IN },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

const reducedDropdownVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

const BAR_TRANSITION = { duration: 0.3, ease: EASE_OUT };

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <span className="relative block w-5 h-4" aria-hidden="true">
    <motion.span
      className="absolute left-0 top-1/2 -mt-px block h-0.5 w-full rounded-full bg-current"
      initial={false}
      animate={isOpen ? { y: 0, rotate: 45 } : { y: -6, rotate: 0 }}
      transition={BAR_TRANSITION}
    />
    <motion.span
      className="absolute left-0 top-1/2 -mt-px block h-0.5 w-full rounded-full bg-current"
      initial={false}
      animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    />
    <motion.span
      className="absolute left-0 top-1/2 -mt-px block h-0.5 w-full rounded-full bg-current"
      initial={false}
      animate={isOpen ? { y: 0, rotate: -45 } : { y: 6, rotate: 0 }}
      transition={BAR_TRANSITION}
    />
  </span>
);

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const reduceMotion = useReducedMotion();

  const dropdown = reduceMotion ? reducedDropdownVariants : dropdownVariants;
  const item = reduceMotion ? reducedItemVariants : itemVariants;

  // Saat menu terbuka, dropdown berwarna putih, jadi navbar dipaksa terang
  const isDark = theme === 'dark' && !isOpen;

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Deteksi tema section yang berada di bawah navbar
  useEffect(() => {
    const detect = () => {
      const probeY = 32; // tengah navbar (h-16 / 2)
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let next: 'light' | 'dark' = 'light';
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          next = el.dataset.navTheme === 'dark' ? 'dark' : 'light';
        }
      });
      setTheme(next);
    };

    detect();
    window.addEventListener('scroll', detect, { passive: true });
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('scroll', detect);
      window.removeEventListener('resize', detect);
    };
  }, [location.pathname]);

  const scrollToSelector = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (!isHome) {
      navigate('/');
      setTimeout(() => scrollToSelector(targetId), 100);
      return;
    }
    scrollToSelector(targetId);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);

    if (!isHome) {
      navigate('/');
      setTimeout(() => scrollToSelector('#contact'), 100);
    } else {
      scrollToSelector('#contact');
    }
  };

  return (
    <div className="block md:hidden">
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 border-b shadow-xs transition-colors duration-300 ${
          isDark
            ? 'bg-ink text-white border-white/10'
            : 'bg-white text-ink border-black/5'
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 group active:scale-95 transition-transform"
          >
            <img
              src="/logo-animated.svg"
              alt="Aditya Nugraha Logo"
              className="w-8 h-8 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-bold tracking-[-0.02em] text-base uppercase">
              Aditya Nugraha
            </span>
          </a>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className={`w-10 h-10 flex items-center justify-center rounded-xl active:scale-90 transition-all ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
            }`}
          >
            <HamburgerIcon isOpen={isOpen} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-xs"
            />

            {/* Dropdown */}
            <motion.div
              key="dropdown"
              variants={dropdown}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-black/10 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 gap-2">
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    variants={item}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-xs font-bold uppercase tracking-widest text-steel hover:text-ink transition-colors py-3 border-b border-black/4"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div variants={item} className="pt-4">
                  <button
                    onClick={handleContactClick}
                    className="w-full bg-ink text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-full hover:bg-primary transition-colors duration-300 active:scale-95 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Contact</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;