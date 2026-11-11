import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

const NAV_LINKS = [
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

const LEFT_LINKS = NAV_LINKS.slice(0, 3);
const RIGHT_LINKS = NAV_LINKS.slice(3);

const SCROLL_OFFSET = 88;
const SCROLLED_THRESHOLD = 20;

let committedPathname =
  typeof window !== 'undefined' ? window.location.pathname : '/';

const subscribeScroll = (onStoreChange: () => void) => {
  window.addEventListener('scroll', onStoreChange, { passive: true });
  return () => window.removeEventListener('scroll', onStoreChange);
};

const getScrolledSnapshot = () => {
  if (window.location.pathname !== committedPathname) {
    return window.location.pathname === '/' && window.location.hash.length > 1;
  }
  return window.scrollY > SCROLLED_THRESHOLD;
};

const getServerScrolledSnapshot = () => false;

const scrollToSection = (id: string, smooth: boolean) => {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: smooth ? 'smooth' : 'auto' });
  el.focus({ preventScroll: true });
  return true;
};

const setUrlHash = (hash: string) => {
  const url = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(window.history.state, '', url);
};

const isModifiedClick = (e: React.MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]';

const listClass = 'flex items-center text-[11px] lg:text-xs uppercase tracking-widest';

interface DesktopNavProps {
  logoSrc?: string;
}

const DesktopNav = ({ logoSrc = '/logo-static.svg' }: DesktopNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const { pathname } = location;
  const isHome = pathname === '/';

  // Detect slug pages
  const isCareer = pathname.startsWith('/career/');
  const isProject = pathname.startsWith('/project/');
  const isSlug = isCareer || isProject;
  const backHash = isCareer ? '#experience' : '#projects';
  const backName = isCareer ? 'Experience' : 'Projects';

  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolledSnapshot,
    getServerScrolledSnapshot,
  );

  useEffect(() => {
    committedPathname = pathname;
  }, [pathname]);

  const smoothRef = useRef(!reduce);
  useEffect(() => {
    smoothRef.current = !reduce;
  }, [reduce]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const goTo = (e: React.MouseEvent, id: string) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    if (isHome) {
      if (scrollToSection(id, smoothRef.current)) setUrlHash(`#${id}`);
    } else {
      navigate({ pathname: '/', hash: `#${id}` });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: smoothRef.current ? 'smooth' : 'auto' });
      if (window.location.hash) setUrlHash('');
    } else {
      navigate('/');
    }
  };

  const renderLink = ({ id, label }: { id: string; label: string }) => (
    <li key={id}>
      <a
        href={hrefFor(id)}
        onClick={(e) => goTo(e, id)}
        tabIndex={isSlug ? -1 : undefined}
        className={`flex flex-col items-center px-2.5 lg:px-3.5 py-2 rounded-full transition-colors duration-200
          ${focusRing} font-medium text-[#6b7280] hover:text-[#111111]`}
      >
        {label}
      </a>
    </li>
  );

  return (
    <nav
      aria-label="Main"
      className={`hidden md:block fixed top-0 inset-x-0 z-50 pointer-events-none will-change-transform
        transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
        ${isScrolled ? 'translate-y-3.5' : 'translate-y-0'}`}
    >
      {/* Visual background layer (Cal.com top-nav) */}
      <div
        aria-hidden="true"
        className={`pointer-events-auto mx-auto h-16 w-full border backdrop-blur-xl
          transition-[max-width,border-radius,border-color,box-shadow,background-color] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none
          ${
            isScrolled
              ? 'md:max-w-[92vw] lg:max-w-3xl rounded-4xl border-[#e5e7eb] bg-[#ffffff]/90 shadow-[0_10px_30px_-10px_rgba(17,17,17,0.08)]'
              : 'max-w-[100vw] rounded-none border-transparent border-b-[#e5e7eb] bg-[#ffffff]/85 shadow-none'
          }`}
      />

      {/* Content layer */}
      <div className="relative z-10 pointer-events-auto -mt-16 mx-auto max-w-3xl h-16 grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-center px-6">
        {/* Left Column */}
        <div className="relative flex items-center h-full min-w-0">
          <div
            aria-hidden={!isSlug || undefined}
            className={`absolute left-0 flex items-center will-change-[opacity,transform] transition-[opacity,transform] motion-reduce:transition-none ${
              isSlug
                ? 'opacity-100 translate-x-0 duration-300 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto'
                : 'opacity-0 -translate-x-3 duration-150 delay-0 ease-out pointer-events-none'
            }`}
          >
            <Link
              to={{ pathname: '/', hash: backHash }}
              tabIndex={isSlug ? undefined : -1}
              className={`group inline-flex items-center gap-2 h-10 px-3 -ml-2 rounded-full text-xs lg:text-sm font-medium text-[#6b7280] hover:text-[#111111] hover:bg-[#f3f4f6] transition-colors duration-200 motion-reduce:transition-none whitespace-nowrap ${focusRing}`}
            >
              <ArrowLeft
                size={17}
                weight="bold"
                aria-hidden
                className="transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-x-1"
              />
              <span>
                Back<span className="hidden sm:inline"> to {backName}</span>
              </span>
            </Link>
          </div>

          <ul
            aria-hidden={isSlug || undefined}
            className={`${listClass} absolute right-2 lg:right-4 will-change-[opacity,transform] transition-[opacity,transform] motion-reduce:transition-none ${
              isSlug
                ? 'opacity-0 -translate-y-1.5 scale-[0.98] duration-150 delay-0 ease-out pointer-events-none'
                : 'opacity-100 translate-y-0 scale-100 duration-300 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto'
            }`}
          >
            {LEFT_LINKS.map(renderLink)}
          </ul>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <Link
            to="/"
            aria-label="Home, back to top"
            onClick={handleLogoClick}
            className={`group block rounded-full ${focusRing}`}
          >
            <img
              src={logoSrc}
              alt=""
              className="w-9 h-9 brightness-0 opacity-90 group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          </Link>
        </div>

        {/* Right Column */}
        <div className="relative flex items-center h-full min-w-0">
          <ul
            aria-hidden={isSlug || undefined}
            className={`${listClass} absolute left-2 lg:left-4 will-change-[opacity,transform] transition-[opacity,transform] motion-reduce:transition-none ${
              isSlug
                ? 'opacity-0 -translate-y-1.5 scale-[0.98] duration-150 delay-0 ease-out pointer-events-none'
                : 'opacity-100 translate-y-0 scale-100 duration-300 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto'
            }`}
          >
            {RIGHT_LINKS.map(renderLink)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
