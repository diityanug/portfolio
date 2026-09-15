import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TRANSITION } from '../../utils/animations';

// --- Edge-to-Edge Fluid Nav ---
const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (!isHome) {
      // Bukan di home → navigate ke home dulu, lalu scroll setelah mount
      navigate('/');
      // Tunggu sebentar biar Home selesai render, baru scroll
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const wasOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);

    // Delay scroll di mobile agar menu sempat tutup dulu
    setTimeout(
      () => {
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      },
      wasOpen ? 350 : 0,
    );
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={TRANSITION}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-black/5"
        ref={dropdownRef}
      >
        <div className="max-w-350 mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between relative z-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" onClick={handleLogoClick}>
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center text-white text-xs font-serif italic shadow-inner group-hover:scale-105 transition-transform duration-500">D</div>
            <span className="font-bold tracking-[-0.02em] text-base text-ink uppercase">Aditya Nugraha</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] lg:text-xs font-bold uppercase tracking-widest text-steel">
            <a href="#profile" onClick={(e) => handleScroll(e, '#profile')} className="hover:text-ink transition-colors duration-300">Profile</a>
            <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="hover:text-ink transition-colors duration-300">Skills</a>
            <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="hover:text-ink transition-colors duration-300">Experience</a>
            <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:text-ink transition-colors duration-300">Projects</a>
            <a href="#education" onClick={(e) => handleScroll(e, '#education')} className="hover:text-ink transition-colors duration-300">Education</a>
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="hidden sm:flex items-center gap-2 bg-ink text-white text-[11px] md:text-xs font-bold uppercase tracking-widest px-6 md:px-7 py-3 md:py-3.5 rounded-full hover:bg-primary transition-colors duration-500 active:scale-95 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)]"
              onClick={() => {
                if (!isHome) {
                  navigate('/');
                  setTimeout(() => {
                    document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Let's Talk</span>
            </button>

            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center bg-black/5 rounded-full text-ink hover:bg-black/10 transition-colors relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Full Width) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden origin-top absolute top-full left-0 w-full z-40 bg-white/80 backdrop-blur-2xl border-b border-black/5 shadow-2xl"
            >
              <div className="flex flex-col px-6 py-6 gap-2 text-sm font-bold text-ink uppercase tracking-widest">
                <a href="#profile" onClick={(e) => handleScroll(e, '#profile')} className="py-4 border-b border-black/5 hover:text-primary active:text-primary transition-colors">Profile</a>
                <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="py-4 border-b border-black/5 hover:text-primary active:text-primary transition-colors">Skills</a>
                <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="py-4 border-b border-black/5 hover:text-primary active:text-primary transition-colors">Experience</a>
                <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="py-4 border-b border-black/5 hover:text-primary active:text-primary transition-colors">Projects</a>
                <a href="#education" onClick={(e) => handleScroll(e, '#education')} className="py-4 border-b border-black/5 hover:text-primary active:text-primary transition-colors">Education</a>
                
                <div className="pt-6 sm:hidden">
                  <button 
                    className="w-full flex items-center justify-center gap-2 bg-ink text-white text-[13px] font-bold uppercase tracking-widest px-4 py-4 rounded-full hover:bg-primary transition-colors"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (!isHome) {
                        navigate('/');
                        setTimeout(() => {
                          document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        setTimeout(() => {
                          document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
                        }, 350);
                      }
                    }}
                  >
                    Let's Talk
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Nav;
