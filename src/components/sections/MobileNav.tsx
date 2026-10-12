import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHashScroll } from '../../hooks/useHashScroll';

const NAV_LINKS = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
] as const;

const NAV_HEIGHT = 64; // h-16
const MENU_ID = 'mobile-menu';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

// Dropdown animation variants using clip-path
const dropdownVariants: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.35, ease: EASE_OUT, staggerChildren: 0.05, delayChildren: 0.08 },
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

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';

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

type NavTheme = 'light' | 'dark';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<NavTheme>('light');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const reduceMotion = useReducedMotion();

  // Scroll to section on hash link click
  useHashScroll();

  const dropdown = reduceMotion ? reducedDropdownVariants : dropdownVariants;
  const item = reduceMotion ? reducedItemVariants : itemVariants;

  // Force light theme when dropdown menu is active
  const isDark = theme === 'dark' && !isOpen;

  const close = () => setIsOpen(false);

  // Close on Escape & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      root.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Dynamic navbar theme based on current section
  useEffect(() => {
    let raf = 0;

    const detect = () => {
      raf = 0;
      const probeY = NAV_HEIGHT / 2;
      let next: NavTheme = 'light';
      document.querySelectorAll<HTMLElement>('[data-nav-theme]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          next = el.dataset.navTheme === 'dark' ? 'dark' : 'light';
        }
      });
      setTheme(next);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(detect);
    };

    detect();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    close();
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      if (window.location.hash) {
        window.history.replaceState(window.history.state, '', window.location.pathname);
      }
    }
  };

  return (
    <div className="block md:hidden">
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 right-0 w-full z-50 border-b shadow-xs transition-colors duration-300 motion-reduce:transition-none ${
          isDark ? 'bg-ink text-white border-white/10' : 'bg-white text-ink border-black/5'
        }`}
      >
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleLogoClick}
            className={`group flex items-center gap-3 rounded-lg transition-[scale] motion-reduce:transition-none active:scale-95 ${focusRing}`}
          >
            <img
              src="/logo-animated.svg"
              alt=""
              width={32}
              height={32}
              decoding="async"
              className="w-8 h-8 transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105"
            />
            <span className="font-bold tracking-[-0.02em] text-base uppercase">
              Aditya Nugraha
            </span>
          </Link>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-[background-color,scale] motion-reduce:transition-none active:scale-90 ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
            } ${focusRing}`}
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
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 top-16 z-40 bg-black/40"
            />

            {/* Dropdown */}
            <motion.div
              key="dropdown"
              id={MENU_ID}
              variants={dropdown}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-16 left-0 right-0 z-50 max-h-[calc(100svh-4rem)] overflow-y-auto bg-white border-b border-black/10 shadow-xl"
            >
              <ul className="flex flex-col px-6 py-6 gap-2">
                {NAV_LINKS.map(({ id, label }) => (
                  <motion.li
                    key={id}
                    variants={item}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={{ pathname: '/', hash: `#${id}` }}
                      onClick={close}
                      className={`block text-xs font-bold uppercase tracking-widest text-steel hover:text-ink transition-colors motion-reduce:transition-none py-3 border-b border-black/4 ${focusRing}`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}

                <motion.li variants={item} className="pt-4">
                  <Link
                    to={{ pathname: '/', hash: '#contact' }}
                    onClick={close}
                    className={`flex w-full items-center justify-center bg-ink text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-full shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)] transition-[background-color,scale] duration-300 motion-reduce:transition-none hover:bg-primary active:scale-95 ${focusRing}`}
                  >
                    Contact
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;