import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DesktopNav = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    const scrollToTarget = () => {
      const element = document.querySelector(targetId);
      if (element) {
        const navHeight = 76;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
      }
    };

    if (!isHome) {
      navigate('/');
      setTimeout(scrollToTarget, 100);
      return;
    }

    scrollToTarget();
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
    <motion.nav 
      className={`hidden md:block fixed z-50 left-0 right-0 mx-auto
        ${isScrolled 
          ? 'top-4 w-[90%] max-w-5xl rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5 transition-all duration-700' 
          : 'top-0 w-full max-w-[100vw] rounded-none bg-white/80 backdrop-blur-xl shadow-none border-b border-black/5 transition-all duration-700'
        }`}
      ref={dropdownRef}
    >
      <div className="max-w-350 mx-auto px-6 h-20 flex items-center justify-between relative z-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" onClick={handleLogoClick}>
          <img src="/logo-animated.svg" alt="Aditya Nugraha Logo" className="w-8 h-8 group-hover:scale-105 transition-transform duration-500" />
          <span className="font-bold tracking-[-0.02em] text-base text-ink uppercase block">Aditya Nugraha</span>
        </a>

        {/* Desktop Links */}
        <div className="flex items-center gap-8 lg:gap-10 text-[11px] lg:text-xs font-bold uppercase tracking-widest text-steel">
          <a href="#profile" onClick={(e) => handleScroll(e, '#profile')} className="hover:text-ink transition-colors duration-300">Profile</a>
          <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="hover:text-ink transition-colors duration-300">Skills</a>
          <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="hover:text-ink transition-colors duration-300">Experience</a>
          <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:text-ink transition-colors duration-300">Projects</a>
          <a href="#education" onClick={(e) => handleScroll(e, '#education')} className="hover:text-ink transition-colors duration-300">Education</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 bg-ink text-white text-[11px] md:text-xs font-bold uppercase tracking-widest px-6 md:px-7 py-3 md:py-3.5 rounded-full hover:bg-primary transition-colors duration-500 active:scale-95 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)]"
            onClick={() => {
              const scrollToContact = () => {
                const element = document.querySelector('#contact');
                if (element) {
                  const navHeight = 76;
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementPosition - navHeight,
                    behavior: 'smooth'
                  });
                }
              };

              if (!isHome) {
                navigate('/');
                setTimeout(scrollToContact, 100);
              } else {
                scrollToContact();
              }
            }}
          >
            <span>Contact</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default DesktopNav;
