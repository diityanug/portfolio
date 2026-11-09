import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';

const SOCIALS = [
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/diityanug' },
  { label: 'GITHUB', href: 'https://github.com/diityanug' },
  { label: 'RESUME', href: 'https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing' },
] as const;

const FOOTER_LINKS = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'education', label: 'EDUCATION' },
] as const;

const EASE = [0.32, 0.72, 0, 1] as const;
const EMAIL = 'DIITYANUG13@GMAIL.COM';

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const Footer = () => {
  const reduce = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + window.location.search,
      );
    }
  };

  return (
    <footer
      id="contact"
      tabIndex={-1}
      className="bg-[#0B0B0C] text-white pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 relative z-20 w-full outline-none border-t border-white/10 overflow-hidden"
    >
      {/* Background Architectural & Atmospheric Shapes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      >
        {/* Ambient Gradient Glows (Crimson + Brand Violet) */}
        <div className="absolute -top-28 -left-28 w-80 h-80 sm:w-120 sm:h-120 rounded-full bg-[#E63946]/7 blur-[90px] sm:blur-[130px]" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 sm:w-110 sm:h-110 rounded-full bg-[#5E6AD2]/6 blur-[80px] sm:blur-[120px]" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 sm:w-115 sm:h-115 rounded-full bg-[#E63946]/5 blur-[110px]" />

        {/* Subtle Architectural Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Concentric Celestial Rings behind Top-Right */}
        <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-60 h-60 sm:w-95 sm:h-95 md:w-120 md:h-120 rounded-full border border-white/5 flex items-center justify-center">
          <div className="w-44 h-44 sm:w-67.5 sm:h-67.5 md:w-87.5 md:h-87.5 rounded-full border border-[#E63946]/9 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-55 md:h-55 rounded-full border border-white/4 border-dashed" />
          </div>
        </div>

        {/* Geometric Bauhaus / Pill Shapes (Portfolio Motif) */}
        <div className="absolute top-1/2 -left-16 sm:-left-12 -translate-y-1/2 w-64 sm:w-96 h-24 sm:h-32 rounded-full bg-linear-to-r from-white/3 to-transparent border border-white/4 -rotate-12" />
        <div className="absolute bottom-28 right-8 sm:right-24 w-44 sm:w-72 h-16 sm:h-24 rounded-full bg-linear-to-l from-[#E63946]/4 to-transparent border border-[#E63946]/6 rotate-[8deg]" />

        {/* Corner Crosshair Ticks (+) */}
        <span className="absolute top-5 left-5 text-white/15 font-mono text-xs select-none">+</span>
        <span className="absolute top-5 right-5 text-white/15 font-mono text-xs select-none">+</span>
        <span className="absolute bottom-5 left-5 text-white/15 font-mono text-xs select-none">+</span>
        <span className="absolute bottom-5 right-5 text-white/15 font-mono text-xs select-none">+</span>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 md:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-10 sm:gap-14 md:gap-16"
        >
          {/* Top Row: 3 Stacked Normal Rows (LET'S / CONNECT / TOGETHER) + Vertical Red Japanese "またね" */}
          <div className="flex items-start justify-between gap-4 sm:gap-8 md:gap-10 pb-2 sm:pb-4">
            <h2
              aria-label="Let's connect together"
              className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 select-none text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-wide text-white"
            >
              <span>LET&apos;S</span>
              <span>CONNECT</span>
              <span>TOGETHER</span>
            </h2>

            {/* Vertical Red Japanese: またね (See ya) */}
            <div
              aria-label="またね - See ya"
              className="flex flex-col items-center select-none text-[#E63946] font-serif font-bold text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[0.18em] shrink-0 pt-0.5"
            >
              <span>ま</span>
              <span>た</span>
              <span>ね</span>
            </div>
          </div>

          {/* Middle Row: Section Navbar on Left, Socials + Contact on Right (Clean without labels) */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-10 items-start">
              {/* Left Column: Section Navbar (No headers) */}
              <nav
                aria-label="Section Navigation"
                className="col-span-1 md:col-span-6 flex flex-col gap-2.5 sm:gap-3"
              >
                {FOOTER_LINKS.map(({ id, label }) => (
                  <Link
                    key={id}
                    to={{ pathname: '/', hash: `#${id}` }}
                    className={`text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-200 w-fit ${focusRing}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Right Column: Social Links with ++ (No headers) */}
              <div className="col-span-1 md:col-span-6 flex flex-col gap-2.5 sm:gap-3">
                {SOCIALS.map(({ label, href }, index) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-mono font-semibold uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-200 w-fit ${focusRing}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`font-mono font-bold text-xs select-none ${
                        index === 0 ? 'text-[#E63946]' : 'invisible'
                      }`}
                    >
                      ++
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight
                      size={12}
                      weight="bold"
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-[#E63946]"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Email + Scroll to Top Button */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 w-full">
              <a
                href={`mailto:${EMAIL.toLowerCase()}`}
                className={`text-xs sm:text-sm md:text-base font-mono font-semibold uppercase tracking-[0.14em] text-white/80 hover:text-[#E63946] transition-colors duration-200 truncate ${focusRing}`}
              >
                {EMAIL}
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#E63946] hover:border-[#E63946] text-white flex items-center justify-center transition-colors duration-300 shrink-0 cursor-pointer ${focusRing}`}
              >
                <ArrowUp size={16} weight="bold" aria-hidden />
              </button>
            </div>
          </div>

          {/* Bottom: The Giant Brutalist Name ADITYA NUGRAHA (Absolute Bottom) */}
          <div
            aria-label="Aditya Nugraha"
            className="w-full select-none pt-2 sm:pt-4"
          >
            <div className="text-white font-black tracking-[-0.04em] uppercase leading-[0.84] text-[17vw] sm:text-[clamp(2.4rem,10.5vw,135px)] flex flex-col sm:flex-row sm:items-baseline sm:justify-start gap-y-1 sm:gap-x-6 md:gap-x-8 w-full">
              {/* ADITYA with Red Circle over I */}
              <span className="inline-flex items-baseline">
                <span>AD</span><span className="relative inline-flex flex-col items-center tracking-normal mr-[-0.04em]"><span aria-hidden="true" className="absolute top-[-0.22em] left-1/2 -translate-x-1/2 w-[0.22em] h-[0.22em] rounded-full bg-[#E63946]" /><span>I</span></span><span>TYA</span>
              </span>

              {/* NUGRAHA */}
              <span className="text-white">NUGRAHA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
