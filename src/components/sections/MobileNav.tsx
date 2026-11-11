import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { useHashScroll } from '../../hooks/useHashScroll';

const NAV_LINKS = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
] as const;

const MENU_ID = 'mobile-menu';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Dropdown: soft clip-path reveal on open, gentle fade + slide on close
// (no bottom-up clipping, so the last item never gets cut off abruptly)
const dropdownVariants: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, y: 0 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.28, ease: EASE_IN_OUT },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
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
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]';

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

interface MobileNavProps {
  logoSrc?: string;
}

const MobileNav = ({ logoSrc = '/logo-static.svg' }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const reduceMotion = useReducedMotion();

  // Detect slug pages
  const isCareer = pathname.startsWith('/career/');
  const isProject = pathname.startsWith('/project/');
  const isSlug = isCareer || isProject;
  const backHash = isCareer ? '#experience' : '#projects';

  // Scroll to section on hash link click
  useHashScroll();

  const dropdown = reduceMotion ? reducedDropdownVariants : dropdownVariants;
  const item = reduceMotion ? reducedItemVariants : itemVariants;

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

  const handleLogoClick = (e: React.MouseEvent) => {
    close();
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(window.history.state, '', window.location.pathname);
      }
    }
  };

  return (
    <div className="block md:hidden">
      <nav
        aria-label="Main"
        className="fixed top-0 left-0 right-0 w-full z-50 border-b border-[#e5e7eb] bg-[#ffffff]/90 backdrop-blur-xl text-[#111111] transition-colors duration-300 motion-reduce:transition-none"
      >
        <div className="h-16 px-4 sm:px-6 relative flex items-center justify-between">
          {/* Back button on slug page with fade animation */}
          <div className="w-16 flex items-center z-20">
            <AnimatePresence mode="wait">
              {isSlug && (
                <motion.div
                  key="mobile-back"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <Link
                    to={{ pathname: '/', hash: backHash }}
                    aria-label="Back to home section"
                    className={`inline-flex items-center gap-1.5 h-10 px-2.5 -ml-2 rounded-full text-xs font-medium uppercase tracking-wider text-[#6b7280] hover:text-[#111111] active:scale-95 transition-all ${focusRing}`}
                  >
                    <ArrowLeft size={18} weight="bold" />
                    <span>Back</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logo with smooth left-to-center gliding animation */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-10"
            initial={false}
            animate={{
              left: isSlug ? '50%' : '16px',
              x: isSlug ? '-50%' : '0%',
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.45, ease: EASE_OUT }
            }
          >
            <Link
              to="/"
              onClick={handleLogoClick}
              aria-label="Home"
              className={`group flex items-center rounded-lg p-1 transition-[scale] motion-reduce:transition-none active:scale-95 ${focusRing}`}
            >
              <img
                src={logoSrc}
                alt=""
                width={32}
                height={32}
                decoding="async"
                className="w-8 h-8 brightness-0 opacity-90 transition-transform duration-300 motion-reduce:transition-none group-hover:scale-105"
              />
            </Link>
          </motion.div>

          {/* Hamburger button on home page */}
          <div className="w-16 flex items-center justify-end z-20">
            <AnimatePresence mode="wait">
              {!isSlug && (
                <motion.div
                  key="mobile-hamburger"
                  initial={{ opacity: 0, scale: 0.85, x: 8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: 8 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls={MENU_ID}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#f3f4f6] transition-[background-color,scale] motion-reduce:transition-none active:scale-90 ${focusRing}`}
                  >
                    <HamburgerIcon isOpen={isOpen} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              className="fixed inset-0 top-16 z-40 bg-black/30"
            />

            {/* Dropdown */}
            <motion.div
              key="dropdown"
              id={MENU_ID}
              variants={dropdown}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-16 left-0 right-0 z-50 max-h-[calc(100svh-4rem)] overflow-y-auto bg-[#ffffff] border-b border-[#e5e7eb] shadow-xl"
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
                      className={`block text-xs font-medium uppercase tracking-widest text-[#6b7280] hover:text-[#111111] transition-colors motion-reduce:transition-none py-3 border-b border-[#f3f4f6] ${focusRing}`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}

                <motion.li variants={item} className="pt-4">
                  <Link
                    to={{ pathname: '/', hash: '#contact' }}
                    onClick={close}
                    className={`flex w-full items-center justify-center bg-[#111111] text-[#ffffff] text-xs font-medium uppercase tracking-widest py-3.5 rounded-lg transition-[background-color,scale] duration-200 motion-reduce:transition-none hover:bg-[#242424] active:scale-95 ${focusRing}`}
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
