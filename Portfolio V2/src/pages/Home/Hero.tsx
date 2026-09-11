import { motion } from 'framer-motion';
import { TerminalWindow as Terminal, GithubLogo as Github } from '@phosphor-icons/react';

export const Hero = () => (
  <section className="relative w-full border-b-2 border-ink bg-surface overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#383838_1px,transparent_1px),linear-gradient(90deg,#383838_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
      <div className="lg:col-span-7 p-6 md:p-16 lg:p-24 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-ink bg-surface z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[42px] md:text-7xl lg:text-[90px] font-bold leading-[1] md:leading-[0.9] tracking-tighter uppercase mb-8 text-ink">
            Hello
            <br />
            <span className="text-sky [-webkit-text-stroke:2px_#383838]">There</span>
          </h1>
          
          <p className="font-sans text-ink-muted text-base md:text-xl max-w-[45ch] mb-12 leading-relaxed border-l-4 border-sun pl-4 md:pl-6">
            I'm a Frontend Engineer specialized in highly interactive, performance-driven interfaces. No fluff, just robust architecture and pixel-perfect execution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#work" className="inline-flex items-center justify-center gap-3 font-mono text-sm uppercase font-bold bg-ink text-surface px-8 py-4 border-2 border-ink hover:bg-ink/90 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#ffde00] transition-all">
              <span>View Projects</span>
              <Terminal size={18} />
            </a>
            <a href="https://github.com/diityanug" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 font-mono text-sm uppercase font-bold bg-surface text-ink px-8 py-4 border-2 border-ink hover:bg-chrome hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] transition-all">
              <span>GitHub</span>
              <Github size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-5 relative p-6 md:p-16 flex items-center justify-center bg-sun overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ink via-transparent to-transparent"></div>
        
        <motion.div
          initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
          whileInView={{ 
            opacity: 1, 
            rotate: 0, 
            scale: 1, 
            transition: { duration: 1.2, type: "spring", bounce: 0.4, delay: 0.2 } 
          }}
          viewport={{ once: true }}
          whileHover={{ 
            x: 8, 
            y: -8, 
            transition: { duration: 0.3, type: "spring", bounce: 0 } 
          }}
          className="group relative mx-auto flex w-full max-w-sm flex-col border-4 border-ink bg-chrome shadow-[-12px_12px_0_#383838] transition-shadow duration-300 hover:shadow-[-16px_16px_0_#383838] md:shadow-[-16px_16px_0_#383838] md:hover:shadow-[-24px_24px_0_#383838]"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden border-b-4 border-ink bg-surface grayscale transition-all duration-500 group-hover:grayscale-0">
            <img
              src="/pic_aboutMe.webp"
              alt="Profile"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="bg-surface p-4 md:p-6">
            <div className="mb-2 flex items-start justify-between">
              <h2 className="text-xl font-bold uppercase tracking-tight md:text-2xl">
                Aditya Nugraha
              </h2>
            </div>
            <p className="font-mono text-xs text-ink-muted md:text-sm">
              Software Engineer
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
