import { motion } from "framer-motion";
import {
  TerminalWindow as Terminal,
  GithubLogo as Github,
  ArrowDown
} from "@phosphor-icons/react";

export const Hero = () => (
  <section className="relative w-full border-b-2 border-ink bg-surface overflow-hidden min-h-[100dvh] flex flex-col md:flex-row">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#383838_1px,transparent_1px),linear-gradient(90deg,#383838_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    {/* Left Typography Section */}
    <div className="flex-1 p-6 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-ink bg-surface z-10 relative">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-[54px] sm:text-[64px] md:text-7xl lg:text-[90px] font-bold leading-[1] md:leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8 text-ink">
          {"Hello "}
          <br className="hidden md:block" />
          <span className="text-transparent [-webkit-text-stroke:2px_#383838] hover:text-sky hover:[-webkit-text-stroke:0px] transition-colors duration-300">
            There
          </span>
        </h1>

        <p className="font-sans text-ink-muted text-base sm:text-lg lg:text-xl max-w-[50ch] mb-10 leading-relaxed border-l-4 border-watermelon pl-4 sm:pl-6 bg-surface">
          Building clean, performant web applications with React and TypeScript. 
          Bridging the gap between robust backend architecture and flawless user interfaces.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center justify-between sm:justify-center gap-4 font-mono text-sm md:text-base uppercase font-bold bg-ink text-surface px-6 py-4 border-2 border-ink hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#ffde00] transition-all active:translate-y-0 active:translate-x-0 active:shadow-none"
          >
            <span>View Projects</span>
            <Terminal size={20} className="group-hover:text-sun transition-colors" />
          </a>
          <a
            href="https://github.com/diityanug"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between sm:justify-center gap-4 font-mono text-sm md:text-base uppercase font-bold bg-surface text-ink px-6 py-4 border-2 border-ink hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] hover:bg-chrome transition-all active:translate-y-0 active:translate-x-0 active:shadow-none"
          >
            <span>GitHub</span>
            <Github size={20} />
          </a>
        </div>
      </motion.div>
    </div>

    {/* Right Visual Section */}
    <div className="flex-1 relative flex items-center justify-center p-6 sm:p-12 md:p-16 bg-sky overflow-hidden z-10">
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,_rgba(0,0,0,0.1)_100%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
        className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] relative"
      >
        <div className="group bg-chrome border-4 border-ink p-2 sm:p-3 shadow-[-12px_12px_0_#383838] hover:shadow-[-20px_20px_0_#383838] hover:-translate-y-2 hover:translate-x-2 transition-all duration-300">
          <div className="aspect-[3/4] w-full border-2 border-ink bg-surface overflow-hidden relative">
            <img
              src="/pic_aboutMe.webp"
              alt="Aditya Nugraha"
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
            />
          </div>
          <div className="pt-4 pb-2 px-2 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl uppercase tracking-tight md:text-2xl">Aditya Nugraha</h2>
              <p className="font-mono text-xs text-ink-muted uppercase md:text-sm">Software Engineer</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - Only visible on desktop */}
      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 font-mono text-xs font-bold uppercase text-ink rotate-90 origin-right">
        <span>Scroll</span>
        <ArrowDown size={16} className="-rotate-90 animate-bounce" />
      </div>
    </div>
  </section>
);
