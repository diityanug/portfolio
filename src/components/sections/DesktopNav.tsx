import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
const SECTION_WAIT_MS = 1500;

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
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/60';

const listClass = 'flex items-center text-[11px] lg:text-xs uppercase tracking-widest';

const DesktopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const isHome = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    if (!isHome || !location.hash) return;
    const id = location.hash.slice(1);

    let raf = 0;
    const start = performance.now();

    const tick = () => {
      if (scrollToSection(id, smoothRef.current)) return;
      if (performance.now() - start < SECTION_WAIT_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [isHome, location.hash]);

  // Track scroll state for compact navbar style
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      setIsScrolled(window.scrollY > SCROLLED_THRESHOLD);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const renderLink = ({ id, label }: { id: string; label: string }) => (
    <li key={id}>
      <a
        href={hrefFor(id)}
        onClick={(e) => goTo(e, id)}
        className={`flex flex-col items-center px-2.5 lg:px-3.5 py-2.5 rounded-full transition-colors duration-300
          ${focusRing} font-medium text-steel hover:text-ink`}
      >
        {label}
      </a>
    </li>
  );

  return (
    <nav
      aria-label="Main"
      className={`hidden md:block fixed inset-x-0 mx-auto z-50 border bg-white/80 backdrop-blur-xl
        transition-[top,width,max-width,border-radius,box-shadow,border-color] duration-500 ease-out motion-reduce:transition-none
        ${
          isScrolled
            ? 'top-4 w-[92%] max-w-3xl rounded-4xl border-black/5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]'
            : 'top-0 w-full max-w-[100vw] rounded-none border-transparent border-b-black/5 shadow-none'
        }`}
    >
      <div
        className={`mx-auto max-w-350 grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 lg:gap-x-8 px-6
          transition-[height] duration-500 ease-out motion-reduce:transition-none
          ${isScrolled ? 'h-16' : 'h-20'}`}
      >
        <ul className={`${listClass} justify-self-end`}>{LEFT_LINKS.map(renderLink)}</ul>

        <a
          href="/"
          aria-label="Home, back to top"
          onClick={handleLogoClick}
          className={`group justify-self-center block rounded-full ${focusRing}`}
        >
          <img
            src="/logo-animated.svg"
            alt=""
            className="w-9 h-9 group-hover:scale-105 transition-transform duration-500"
          />
        </a>

        <ul className={`${listClass} justify-self-start`}>{RIGHT_LINKS.map(renderLink)}</ul>
      </div>
    </nav>
  );
};

export default DesktopNav;