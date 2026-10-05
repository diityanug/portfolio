import { motion } from 'framer-motion';
import { ArrowUpRight, GithubLogo, LinkedinLogo, DownloadSimple, ArrowUp } from '@phosphor-icons/react';

const socials = [
  { icon: GithubLogo,   label: 'GitHub',   href: 'https://github.com/diityanug' },
  { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/diityanug' },
];

const navLinks = ['Profile', 'Skills', 'Experience', 'Projects', 'Education'];
const EASE = [0.32, 0.72, 0, 1] as const;

const Footer = () => {
  return (
    <footer id="contact" className="bg-ink text-white pt-10 pb-8 px-0 md:px-12 relative z-20 rounded-t-[60px] md:rounded-t-[80px] md:-mt-10 overflow-hidden w-full"> 

      {/* Background Teks Desktop */}
      <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center pointer-events-none select-none">
        <div className="flex flex-col items-center justify-center w-full h-full scale-110 lg:scale-125 xl:scale-150">
          <span className="text-[9.2vw] font-black uppercase tracking-tighter text-primary/70 leading-[0.47] whitespace-nowrap">
            LET&apos;S CONNECT
          </span>
          <span className="text-[11.1vw] font-black uppercase tracking-tighter text-primary/70 leading-[1.1] whitespace-nowrap">
            TOGETHER
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16 relative z-10">
        
        <div className="pt-4 md:pt-30 pb-6 md:pb-12 flex flex-col items-center justify-center w-full min-h-auto md:min-h-[40vh]">
          
          {/* Layout Teks Mobile */}
          <div className="flex md:hidden flex-col items-start text-left w-full px-6 mb-8 select-none">
            <span className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
              LET&apos;S
            </span>
            <span className="text-5xl font-black uppercase tracking-tighter text-primary/90 leading-none">
              CONNECT TOGETHER
            </span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 w-full px-6 md:px-0 md:w-auto justify-center items-center"
          >
            {/* Tombol Email Mobile */}
            <a href="mailto:diityanug13@gmail.com" className="flex md:hidden group items-center justify-between gap-6 bg-ink/40 hover:bg-ink/60 border border-white/10 hover:border-primary/50 rounded-full pl-8 pr-2 py-2 transition-all duration-500 w-full backdrop-blur-md shadow-2xl shadow-primary/5 hover:shadow-primary/20">
              <span className="text-[10px] min-[375px]:text-xs font-bold tracking-widest uppercase text-white/90 truncate">diityanug13@gmail.com</span>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-inner overflow-hidden relative">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <ArrowUpRight size={20} weight="bold" className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>

            {/* Tombol Resume Mobile */}
            <a href="https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing" target="_blank" rel="noreferrer" className="flex md:hidden group items-center justify-between gap-6 bg-ink/40 hover:bg-ink/60 border border-white/10 hover:border-white/30 rounded-full pl-8 pr-2 py-2 transition-all duration-500 w-full backdrop-blur-md shadow-2xl">
              <span className="text-[10px] min-[375px]:text-xs font-bold tracking-widest uppercase text-white/90 truncate">Resume</span>
              <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <DownloadSimple size={20} weight="bold" className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>

            {/* Tombol Email Desktop */}
            <a href="mailto:diityanug13@gmail.com" className="hidden md:flex group items-center justify-between gap-6 bg-ink/40 hover:bg-ink/60 border border-white/10 hover:border-primary/50 rounded-full pl-8 pr-2 py-2 transition-all duration-500 w-auto backdrop-blur-md shadow-2xl shadow-primary/5 hover:shadow-primary/20">
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">diityanug13@gmail.com</span>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-inner overflow-hidden relative">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <ArrowUpRight size={20} weight="bold" className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>

            {/* Tombol Resume Desktop */}
            <a href="https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing" target="_blank" rel="noreferrer" className="hidden md:flex group items-center justify-between gap-6 bg-ink/40 hover:bg-ink/60 border border-white/10 hover:border-white/30 rounded-full pl-8 pr-2 py-2 transition-all duration-500 w-auto backdrop-blur-md shadow-2xl">
              <span className="text-xs font-bold tracking-widest uppercase text-white/90">Resume</span>
              <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <DownloadSimple size={20} weight="bold" className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </motion.div>
        </div>

        <div className="w-full h-0.5 bg-white/20 rounded-full hidden md:block"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-0 pb-8 md:pb-0">
          <p className="text-white text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase order-3 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} Aditya Nugraha
          </p>
          
          <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center order-2 md:order-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors duration-300"
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
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-ink hover:border-white transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 ml-2"
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