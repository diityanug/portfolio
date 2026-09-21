import { motion } from 'framer-motion';
import { User, Code, Briefcase, Terminal, GraduationCap } from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Edge-to-Edge Fluid Nav
const Nav = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const element = document.querySelector(targetId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for floating effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        className={`fixed z-50 bg-white/80 backdrop-blur-xl transition-all duration-1000 ease-in-out left-0 right-0 mx-auto border
          ${isScrolled 
            ? 'top-4 w-[calc(100%-2rem)] md:w-[90%] max-w-5xl rounded-3xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] border-black/5' 
            : 'top-0 w-full max-w-[100vw] rounded-none shadow-none border-transparent border-b-black/5'
          }`}
        ref={dropdownRef}
      >
        <div className="max-w-350 mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between relative z-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" onClick={handleLogoClick}>
            <img src="/logo-animated.svg" alt="Aditya Nugraha Logo" className="w-8 h-8 group-hover:scale-105 transition-transform duration-500" />
            <span className="font-bold tracking-[-0.02em] text-base text-ink uppercase hidden md:block">Aditya Nugraha</span>
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
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Contact</span>
            </button>

            {/* Mobile Nav Icons */}
            <div className="flex md:hidden items-center gap-5 sm:gap-7 text-ink">
              <a href="#profile" onClick={(e) => handleScroll(e, '#profile')} className="hover:text-primary active:scale-95 transition-all p-1"><User size={20} /></a>
              <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="hover:text-primary active:scale-95 transition-all p-1"><Code size={20} /></a>
              <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="hover:text-primary active:scale-95 transition-all p-1"><Briefcase size={20} /></a>
              <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:text-primary active:scale-95 transition-all p-1"><Terminal size={20} /></a>
              <a href="#education" onClick={(e) => handleScroll(e, '#education')} className="hover:text-primary active:scale-95 transition-all p-1"><GraduationCap size={20} /></a>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Nav;
