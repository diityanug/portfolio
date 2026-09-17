import { motion } from 'framer-motion';
import { ArrowUpRight, GithubLogo, LinkedinLogo, DownloadSimple, ArrowUp } from '@phosphor-icons/react';

const socials = [
  { icon: GithubLogo,    label: 'GitHub',    href: 'https://github.com/diityanug' },
  { icon: LinkedinLogo,  label: 'LinkedIn',  href: 'https://linkedin.com/in/diityanug' },
];

const navLinks = ['Profile', 'Skills', 'Experience', 'Projects', 'Education'];
const EASE = [0.32, 0.72, 0, 1] as const;

const Footer = () => {
  return (
    <footer id="contact" className="bg-ink text-white pt-24 md:pt-32 pb-8 px-6 md:px-12 relative z-20 rounded-t-[40px] md:rounded-t-[64px] mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        
        {/* Top: Massive CTA & Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-16">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white"
            >
              Let's Connect <br />
              <span className="text-primary italic font-serif font-normal tracking-normal pr-4">Together</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0"
          >
            <a href="mailto:diityanug13@gmail.com" className="group flex items-center justify-between gap-8 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full pl-8 pr-2 py-2 transition-all duration-300 w-full sm:w-auto">
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase">diityanug13@gmail.com</span>
              <div className="w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center shrink-0">
                <ArrowUpRight size={18} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
            <a href="https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-8 bg-transparent hover:bg-white/5 border border-white/10 rounded-full pl-8 pr-2 py-2 transition-all duration-300 w-full sm:w-auto">
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase">Download Resume</span>
              <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                <DownloadSimple size={18} weight="bold" className="group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Bottom: Links, Socials & Copyright */}
        <div className="w-full h-[2px] bg-white/10 rounded-full"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase order-3 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} Aditya Nugraha
          </p>
          
          <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center order-2 md:order-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 order-1 md:order-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:bg-white hover:text-ink hover:border-white transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 ml-2"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
