import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import iconIdle from '../assets/iconIdle.svg';
import iconHover from '../assets/iconHover.svg';

const LEFT_LINKS = [
  { name: 'Profile', path: '/about' },
  { name: 'Experience', path: '/experience' },
] as const;

const RIGHT_LINKS = [
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
] as const;

const NavGroup = memo(({ links, pathname, spacing }: { links: any, pathname: string, spacing: string }) => (
  <div className={`flex items-center gap-5 lg:gap-8 font-google font-bold text-sm tracking-[0.3em] uppercase ${spacing}`}>
    {links.map((link: any) => {
      const isActive = pathname === link.path;
      return (
        <Link
          key={link.path}
          to={link.path}
          className={`relative flex items-center shrink-0 transition-all duration-500 ease-in-out hover:text-[#5E7657] hover:opacity-100 ${
            isActive ? 'text-[#5E7657] opacity-100' : 'text-[#2A2320] opacity-40'
          }`}
        >
          <span className="relative z-10">{link.name}</span>
        </Link>
      );
    })}
  </div>
));
NavGroup.displayName = 'NavGroup';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  const lastPathRef = useRef(location.pathname);
  if (!isHome) {
    lastPathRef.current = location.pathname;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
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
      className={`w-full h-16 md:h-20 fixed top-0 left-0 z-50 transition-colors duration-300 px-4 md:px-8 ${
        isScrolled ? 'bg-white/[0.97] shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-between">

        {/* LEFT AREA */}
        <div className="flex-1 flex justify-end items-center h-full overflow-hidden origin-right">
          
          <div className="flex-grow h-full flex items-center pr-8 lg:pr-12">
            <div className="w-full h-[2px] bg-black/20 rounded-full min-w-[20px]" />
          </div>

          <div
            className={`hidden md:block overflow-hidden whitespace-nowrap ${
              !isHome ? 'max-w-[700px] opacity-100' : 'max-w-0 opacity-0'
            }`}
            style={{
              transition: 'max-width 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <NavGroup links={LEFT_LINKS} pathname={lastPathRef.current} spacing="pr-2" />
          </div>
          
          <div className="w-[clamp(16px,2vw,36px)] shrink-0" />
        </div>

        {/* CATS ICON */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none px-4">
          
          {/* Desktop Logo */}
          <Link
            to="/"
            className="group hidden md:flex items-center justify-center h-12 md:h-16 shrink-0 relative transition-transform duration-300 active:scale-95 pointer-events-auto"
          >
            <img src={iconIdle} alt="Logo" draggable={false} className="h-full w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
            <img src={iconHover} alt="Logo Hover" draggable={false} className="absolute inset-0 m-auto h-full w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
          </Link>

          {/* Mobile Logo */}
          {isHome ? (
            <Link
              to="/"
              className="md:hidden group flex items-center justify-center h-12 shrink-0 relative transition-transform duration-300 active:scale-95 pointer-events-auto"
            >
              <img src={iconIdle} alt="Logo" draggable={false} className="h-full w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Hover" draggable={false} className="absolute inset-0 m-auto h-full w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className="md:hidden group flex items-center justify-center h-12 shrink-0 relative transition-transform duration-300 active:scale-95 pointer-events-auto focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <img src={isOpen ? iconHover : iconIdle} alt="Logo Toggle" draggable={false} className="h-full w-auto object-contain select-none transition-opacity duration-300 group-hover:opacity-0" />
              <img src={iconHover} alt="Logo Toggle Hover" draggable={false} className="absolute inset-0 m-auto h-full w-auto object-contain select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 drop-shadow-md" />
            </button>
          )}

        </div>

        {/* RIGHT AREA */}
        <div className="flex-1 flex justify-start items-center h-full overflow-hidden origin-left">
          
          <div className="w-[clamp(16px,2vw,36px)] shrink-0" />

          <div
            className={`hidden md:block overflow-hidden whitespace-nowrap ${
              !isHome ? 'max-w-[700px] opacity-100' : 'max-w-0 opacity-0'
            }`}
            style={{
              transition: 'max-width 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <NavGroup links={RIGHT_LINKS} pathname={lastPathRef.current} spacing="pl-2" />
          </div>

          <div className="flex-grow h-full flex items-center pl-8 lg:pl-12">
            <div className="w-full h-[2px] bg-black/20 rounded-full min-w-[20px]" />
          </div>

        </div>
      </div>

      {/* DROPDOWN MOBILE */}
      <div
        className={`absolute top-full left-0 w-full bg-white/[0.97] overflow-hidden md:hidden shadow-sm -z-10 origin-top ${
          !isHome && isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          transition: 'max-height 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex flex-col items-center pt-8 pb-10 gap-6 px-4">
          {[{ name: 'Home', path: '/' }, ...LEFT_LINKS, ...RIGHT_LINKS].map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-google font-bold text-[11px] tracking-[0.25em] uppercase transition-all duration-500 ease-in-out active:scale-95 border-b-2 pb-1 ${
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
      </div>
    </nav>
  );
};

export default Navbar;