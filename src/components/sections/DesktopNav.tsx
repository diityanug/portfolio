import { useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { id: '#profile', label: 'Profile' },
  { id: '#skills', label: 'Skills' },
  { id: '#experience', label: 'Experience' },
  { id: '#projects', label: 'Projects' },
  { id: '#education', label: 'Education' },
  { id: '#contact', label: 'Contact' },
] as const;

const LEFT_LINKS = NAV_LINKS.slice(0, 3);
const RIGHT_LINKS = NAV_LINKS.slice(3);

const TRACKED_IDS: string[] = NAV_LINKS.map((l) => l.id);

// Bawah nav: 80px (bar penuh h-20) = 16px (top-4) + 64px (pill h-16), ditambah jarak 8px.
const SCROLL_OFFSET = 88;

const scrollToSection = (selector: string, smooth: boolean) => {
  let el: Element | null = null;
  try {
    el = document.querySelector(selector);
  } catch {
    return false;
  }
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: smooth ? 'smooth' : 'auto' });
  return true;
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
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeNavId = NAV_LINKS.some((l) => l.id === activeId) ? activeId : null;
  const hrefFor = (id: string) => (isHome ? id : `/${id}`);

  // --- Navigasi ---
  const goTo = (e: React.MouseEvent, selector: string) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    if (isHome) scrollToSection(selector, !reduce);
    else navigate('/', { state: { scrollTo: selector } });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    if (isHome) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else navigate('/');
  };

  // Scroll ke target setelah Home ter-mount (dari halaman lain atau URL ber-hash).
  useEffect(() => {
    if (!isHome) return;
    const fromState = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const target = fromState ?? (location.hash || null);
    if (!target) return;

    let cancelled = false;
    let raf = 0;
    const start = performance.now();

    const tick = () => {
      if (cancelled) return;
      if (scrollToSection(target, !reduce)) {
        if (fromState) navigate(location.pathname, { replace: true, state: null });
        return;
      }
      if (performance.now() - start < 1500) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [isHome, location.pathname, location.hash, location.state, navigate, reduce]);

  // --- Scroll state + scroll-spy ---
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      setIsScrolled(window.scrollY > 20);

      if (!isHome) {
        setActiveId(null);
        return;
      }

      const threshold = SCROLL_OFFSET + window.innerHeight * 0.3;
      let current: string | null = null;
      let best = -Infinity;
      for (const id of TRACKED_IDS) {
        const el = document.querySelector(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= threshold && top > best) {
          best = top;
          current = id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome]);

  const renderLink = ({ id, label }: { id: string; label: string }) => {
    const isActive = activeNavId === id;
    return (
      <li key={id}>
        <a
          href={hrefFor(id)}
          onClick={(e) => goTo(e, id)}
          data-label={label}
          aria-current={isActive ? 'location' : undefined}
          className={`flex flex-col items-center px-2.5 lg:px-3.5 py-2.5 rounded-full transition-colors duration-300
            after:content-[attr(data-label)] after:font-bold after:h-0 after:overflow-hidden after:invisible after:pointer-events-none
            ${focusRing} ${isActive ? 'font-bold text-ink' : 'font-medium text-steel hover:text-ink'}`}
        >
          {label}
        </a>
      </li>
    );
  };

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
        {/* Kiri */}
        <ul className={`${listClass} justify-self-end`}>{LEFT_LINKS.map(renderLink)}</ul>

        {/* Logo */}
        <a
          href="/"
          aria-label="Aditya Nugraha, kembali ke atas"
          onClick={handleLogoClick}
          className={`group justify-self-center block rounded-full ${focusRing}`}
        >
          <img
            src="/logo-animated.svg"
            alt=""
            className="w-9 h-9 group-hover:scale-105 transition-transform duration-500"
          />
        </a>

        {/* Kanan */}
        <ul className={`${listClass} justify-self-start`}>{RIGHT_LINKS.map(renderLink)}</ul>
      </div>
    </nav>
  );
};

export default DesktopNav;