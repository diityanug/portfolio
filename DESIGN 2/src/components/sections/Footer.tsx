import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, GithubLogo, LinkedinLogo, DownloadSimple } from '@phosphor-icons/react';
import { fadeUp, TRANSITION } from '../../utils/animations';

const socials = [
  { icon: GithubLogo,    label: 'GitHub',    href: 'https://github.com/diityanug' },
  { icon: LinkedinLogo,  label: 'LinkedIn',  href: 'https://linkedin.com/in/diityanug' },
];

const navLinks = ['Profile', 'Skills', 'Projects', 'Experience', 'Education'];

// --- Redesigned Footer — Clean, Light & High Contrast ---
const Footer = () => {
  const reduce = useReducedMotion();

  return (
    <footer
      id="contact"
      className="relative bg-surface overflow-hidden -mt-8 rounded-t-[2.5rem] md:rounded-t-[3rem] z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
    >
      <div className="relative z-10 max-w-350 mx-auto px-6 md:px-12">

        {/* ── TOP ZONE: massive headline ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="pt-24 md:pt-40 pb-16 md:pb-24 border-b border-ink/10"
        >
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-ink/5 text-ink/70 border border-ink/10 mb-8 md:mb-12">
              Software Engineer | Frontend Developer
            </span>

            {/* Display headline */}
            <h2 className="text-[12vw] md:text-[9vw] font-bold text-ink leading-none tracking-tight mb-12 md:mb-16 uppercase">
              Let's Connect <br className="hidden md:block" />
              <span className="text-primary italic">Together.</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="mailto:diityanug13@gmail.com"
                className="group inline-flex items-center gap-4 bg-ink hover:bg-primary rounded-full px-6 py-4 md:px-10 md:py-5 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-primary/20"
              >
                <span className="text-white font-medium text-sm md:text-base tracking-wide">
                  diityanug13@gmail.com
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={16} weight="bold" className="text-white" />
                </div>
              </a>
              <a
                href="https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 bg-white border border-ink/10 hover:bg-black/5 rounded-full px-6 py-4 md:px-10 md:py-5 transition-all duration-500 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <span className="text-ink font-bold text-sm md:text-base uppercase tracking-widest">
                  Resume
                </span>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 group-hover:-translate-y-1 transition-transform duration-500">
                  <DownloadSimple size={16} weight="bold" className="text-ink" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ...TRANSITION, delay: 0.1 }}
          viewport={{ once: true }}
          className="py-10 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          {/* Left: logo + nav */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full md:w-auto">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-sm font-serif italic ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                D
              </div>
              <span className="font-bold text-base text-ink tracking-tight uppercase">
                Aditya Nugraha
              </span>
            </button>

            <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs font-semibold uppercase tracking-widest text-steel hover:text-primary transition-colors duration-400"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: socials + copyright + scroll-to-top */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full md:w-auto justify-center md:justify-end">
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-steel hover:text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon size={20} weight="bold" />
                </a>
              ))}
            </div>

            <div className="hidden sm:block w-px h-6 bg-ink/10"></div>

            <div className="flex items-center gap-6">
              <p className="text-steel text-[11px] font-semibold tracking-widest uppercase">
                © {new Date().getFullYear()}
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                className="group w-12 h-12 rounded-full bg-ink/5 hover:bg-primary text-ink hover:text-white flex items-center justify-center transition-all duration-500 hover:scale-105"
              >
                <ArrowRight size={18} weight="bold" className="-rotate-90 group-hover:-translate-y-1 transition-transform duration-400" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
