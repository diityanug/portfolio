import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, List, X } from '@phosphor-icons/react';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (!isHome) {
      navigate(`/${targetId}`);
      return;
    }
    
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-mono font-bold text-xl uppercase tracking-wider flex items-center gap-2 group">
          <img src="/logo-animated.svg" alt="Logo" className="w-8 h-8" />
          <span className="group-hover:text-sky transition-colors">DIITYANUG.</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase font-semibold">
          <Link to="/" className="hover:text-sky transition-colors text-ink">Home</Link>
          <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="hover:text-sky transition-colors cursor-pointer">Work</a>
          <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="hover:text-sky transition-colors cursor-pointer">Experience</a>
          <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="hover:text-sky transition-colors cursor-pointer">Skills</a>
        </div>
        
        <div className="hidden md:block">
          <a 
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="inline-flex items-center gap-2 font-mono text-sm uppercase font-bold bg-sun px-6 py-2 border-2 border-ink hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#383838] transition-all cursor-pointer"
          >
            <span>Initialize</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 bg-chrome border-2 border-ink"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-ink bg-surface flex flex-col p-6 gap-4 font-mono uppercase font-bold text-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-2 border-b-2 border-ink/10 hover:text-sky">Home</Link>
          <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="py-2 border-b-2 border-ink/10 hover:text-sky">Work</a>
          <a href="#experience" onClick={(e) => handleScroll(e, '#experience')} className="py-2 border-b-2 border-ink/10 hover:text-sky">Experience</a>
          <a href="#skills" onClick={(e) => handleScroll(e, '#skills')} className="py-2 border-b-2 border-ink/10 hover:text-sky">Skills</a>
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="py-2 text-watermelon">Contact</a>
        </div>
      )}
    </nav>
  );
};
