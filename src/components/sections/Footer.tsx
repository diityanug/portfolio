import { motion } from 'framer-motion';
import { ArrowUpRight, GithubLogo, LinkedinLogo, DownloadSimple, ArrowUp } from '@phosphor-icons/react';
import JapaneseHoverText from '../ui/JapaneseHoverText';

const socials = [
  { icon: GithubLogo,   label: 'GitHub',   href: 'https://github.com/diityanug' },
  { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/diityanug' },
];

const navLinks = ['Profile', 'Skills', 'Experience', 'Projects', 'Education'];
const EASE = [0.32, 0.72, 0, 1] as const;

const EMAIL = 'diityanug13@gmail.com';
const RESUME = 'https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing';

const tileClass =
  'flex flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-white/5 p-4 lg:p-5 active:bg-white/10 hover:bg-white/10 hover:border-white/25 transition-colors duration-300';

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-ink text-white pt-14 pb-8 px-5 md:px-12 relative z-20 rounded-t-[40px] md:rounded-t-[80px] md:-mt-10 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end"
        >
          {/* Judul: Jepang/Inggris berganti otomatis seperti di Hero */}
          <h2 className="lg:col-span-7 text-[min(10.5vw,56px)] sm:text-[64px] md:text-[84px] lg:text-[80px] xl:text-[92px] font-black uppercase leading-[0.95] tracking-[-0.03em] select-none">
            <JapaneseHoverText
              japanese="つながろう、"
              english="LET'S CONNECT"
              interval={3500}
              className="w-full pr-[0.12em] outline-none"
              jpClassName="font-normal [font-synthesis:none] text-white tracking-tight"
              enClassName="text-white tracking-[-0.04em]"
            />
            <br />
            <JapaneseHoverText
              japanese="一緒に。"
              english="TOGETHER"
              interval={3500}
              offset={700}
              className="w-full pr-[0.12em] outline-none"
              jpClassName="font-normal [font-synthesis:none] text-transparent [-webkit-text-stroke:2px_#ffffff] tracking-tight"
              enClassName="text-transparent [-webkit-text-stroke:2px_#ffffff] tracking-[-0.04em]"
            />
          </h2>

          {/* Aksi */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center justify-between gap-4 rounded-3xl bg-primary p-5 lg:p-6 active:scale-[0.99] hover:brightness-110 transition-all duration-300"
            >
              <span className="min-w-0">
                <span className="block text-xs font-medium text-white/70 mb-1">Email</span>
                <span className="block text-[15px] min-[375px]:text-base lg:text-lg font-semibold tracking-tight truncate">
                  {EMAIL}
                </span>
              </span>
              <span className="w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shrink-0">
                <ArrowUpRight
                  size={20}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>

            <div className="grid grid-cols-3 gap-3">
              <a href={RESUME} target="_blank" rel="noreferrer" className={tileClass}>
                <DownloadSimple size={22} weight="bold" />
                <span className="text-sm font-semibold">Resume</span>
              </a>
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className={tileClass}>
                  <Icon size={22} weight="bold" />
                  <span className="text-sm font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:block h-px bg-white/15 mt-16 mb-8" />

        {/* Navigasi + copyright */}
        <div className="mt-10 lg:mt-0 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 lg:flex lg:items-center lg:gap-8 lg:order-2"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="flex items-center justify-between border-t border-white/10 py-3.5 text-sm font-semibold text-white active:text-primary hover:text-primary transition-colors duration-300 lg:border-0 lg:py-0 lg:text-[11px] lg:font-bold lg:uppercase lg:tracking-[0.2em]"
              >
                {link}
                <ArrowUpRight size={14} className="text-white/40 lg:hidden" />
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 lg:border-0 lg:pt-0 lg:contents">
            <p className="text-[11px] font-semibold tracking-[0.15em] lg:font-bold lg:tracking-[0.2em] uppercase text-white/70 lg:text-white lg:order-1">
              © {new Date().getFullYear()} Aditya Nugraha
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white active:bg-primary active:border-primary hover:bg-primary hover:border-primary transition-colors duration-300 shrink-0 lg:order-3"
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