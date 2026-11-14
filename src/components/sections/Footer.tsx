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
  { id: 'contact', label: 'CONTACT' },
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
      className="bg-surface-dark text-[#ffffff] pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 md:pb-10 px-5 sm:px-8 md:px-12 relative z-20 w-full outline-none border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-10 sm:gap-12 md:gap-12"
        >
          {/* Top Block: Navigation & Socials Row + Direct Email & Scroll-to-Top Row */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-7">
            {/* Row 1: Section Navbar on Left, Socials on Right */}
            <div className="grid grid-cols-2 md:flex md:items-center md:justify-between md:flex-wrap lg:flex-nowrap gap-6 sm:gap-10 md:gap-y-4 md:gap-x-8 items-start">
              {/* Section Navbar */}
              <nav
                aria-label="Section Navigation"
                className="col-span-1 flex flex-col md:flex-row md:items-center gap-2.5 sm:gap-3 md:gap-6 lg:gap-8"
              >
                {FOOTER_LINKS.map(({ id, label }) => (
                  <Link
                    key={id}
                    to={{ pathname: '/', hash: `#${id}` }}
                    className={`text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-on-dark-soft hover:text-[#ffffff] transition-colors duration-200 w-fit ${focusRing}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Social Links */}
              <div className="col-span-1 flex flex-col md:flex-row md:items-center gap-2.5 sm:gap-3 md:gap-5 lg:gap-7">
                {SOCIALS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-on-dark-soft hover:text-[#ffffff] transition-colors duration-200 w-fit ${focusRing}`}
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

            {/* Row 2: Direct Email on Left, Scroll to Top Button on Right */}
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 sm:pt-6 md:pt-7 w-full">
              <a
                href={`mailto:${EMAIL.toLowerCase()}`}
                className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-on-dark-soft hover:text-[#ffffff] transition-colors duration-200 truncate ${focusRing}`}
              >
                <span>{EMAIL}</span>
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-[#ffffff] shrink-0"
                />
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-white/15 bg-surface-dark-elevated hover:bg-[#ffffff] hover:text-[#111111] text-[#ffffff] flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer ${focusRing}`}
              >
                <ArrowUp size={16} weight="bold" aria-hidden />
              </button>
            </div>
          </div>

          {/* Bottom: ADITYA NUGRAHA */}
          <div
            aria-label="Aditya Nugraha"
            className="w-full select-none pt-1 sm:pt-2 md:pt-2"
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
