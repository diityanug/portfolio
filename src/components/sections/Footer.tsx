import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';

const SOCIALS = [
  { label: 'LINKEDIN', href: '/in' },
  { label: 'GITHUB', href: '/gh' },
  { label: 'WHATSAPP', href: '/wa' },
  { label: 'RESUME', href: '/cv' },
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
      id="footer"
      tabIndex={-1}
      className="bg-surface-dark text-[#ffffff] pt-12 sm:pt-16 md:pt-12 pb-6 sm:pb-8 md:pb-6 px-5 sm:px-8 md:px-12 relative z-20 w-full outline-none border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 md:gap-8 lg:gap-9 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-10 sm:gap-14 md:gap-8 lg:gap-9"
        >
          {/* Top Row: LET'S CONNECT TOGETHER + Vertical Japanese "またね" */}
          <div className="flex items-start justify-between gap-4 sm:gap-8 md:gap-10 pb-2 sm:pb-4 md:pb-1">
            <h2
              aria-label="Let's connect together"
              className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 select-none text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold uppercase leading-[1.06] tracking-[-0.03em] text-[#ffffff]"
            >
              <span>LET&apos;S</span>
              <span>CONNECT</span>
              <span>TOGETHER</span>
            </h2>

            {/* Vertical Japanese: またね (See ya) in subtle warm silver */}
            <div
              aria-label="またね - See ya"
              className="flex flex-col items-center select-none text-on-dark-soft font-serif font-medium text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[0.18em] shrink-0 pt-0.5"
            >
              <span>ま</span>
              <span>た</span>
              <span>ね</span>
            </div>
          </div>

          {/* Middle Row: Section Navbar on Left, Socials on Right */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-4">
            <div className="grid grid-cols-2 md:flex md:items-center md:justify-between md:flex-wrap lg:flex-nowrap gap-6 sm:gap-10 md:gap-y-3 md:gap-x-6 items-start">
              {/* Section Navbar */}
              <nav
                aria-label="Section Navigation"
                className="col-span-1 flex flex-col md:flex-row md:items-center gap-2.5 sm:gap-3 md:gap-6 lg:gap-8"
              >
                {FOOTER_LINKS.map(({ id, label }) => (
                  <Link
                    key={id}
                    to={{ pathname: '/', hash: `#${id}` }}
                    className={`text-xs sm:text-sm md:text-sm font-medium uppercase tracking-[0.14em] text-on-dark-soft hover:text-[#ffffff] transition-colors duration-200 w-fit ${focusRing}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Social Links */}
              <div className="col-span-1 flex flex-col md:flex-row md:items-center gap-2.5 sm:gap-3 md:gap-5 lg:gap-6">
                {SOCIALS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2 text-xs sm:text-sm md:text-sm font-medium uppercase tracking-[0.14em] text-on-dark-soft hover:text-[#ffffff] transition-colors duration-200 w-fit ${focusRing}`}
                  >
                    <span>{label}</span>
                    <ArrowUpRight
                      size={13}
                      weight="bold"
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-[#ffffff]"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Email + Scroll to Top Button */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 md:pt-4 w-full">
              <a
                href={`mailto:${EMAIL.toLowerCase()}`}
                className={`text-xs sm:text-sm md:text-sm font-medium uppercase tracking-[0.12em] text-on-dark-soft hover:text-[#ffffff] transition-colors duration-200 truncate ${focusRing}`}
              >
                {EMAIL}
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-surface-dark-elevated hover:bg-[#ffffff] hover:text-[#111111] text-[#ffffff] flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer ${focusRing}`}
              >
                <ArrowUp size={16} weight="bold" aria-hidden />
              </button>
            </div>
          </div>

          {/* Bottom: ADITYA NUGRAHA */}
          <div
            aria-label="Aditya Nugraha"
            className="w-full select-none pt-2 sm:pt-4 md:pt-1"
          >
            <div className="text-[#ffffff] font-semibold tracking-[-0.04em] uppercase leading-[0.86] text-[17vw] sm:text-[clamp(2.4rem,10.5vw,135px)] flex flex-col sm:flex-row sm:items-baseline sm:justify-start gap-y-1 sm:gap-x-6 md:gap-x-8 w-full">
              {/* ADITYA with Circle over I */}
              <span className="inline-flex items-baseline">
                <span>AD</span><span className="relative inline-flex flex-col items-center tracking-normal mr-[-0.04em]"><span aria-hidden="true" className="absolute top-[-0.22em] left-1/2 -translate-x-1/2 w-[0.22em] h-[0.22em] rounded-full bg-on-dark-soft" /><span>I</span></span><span>TYA</span>
              </span>

              {/* NUGRAHA */}
              <span className="text-[#ffffff]">NUGRAHA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
