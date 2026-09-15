import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import Eyebrow from '../ui/Eyebrow';
import { TerminalWindow as Terminal, GithubLogo as Github } from "@phosphor-icons/react";

// --- Hero Section (Asymmetric Elite) ---
const Hero = () => {
  const containerRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="bg-[#FAFAFA] pt-32 md:pt-48 pb-20 md:pb-32 px-4 relative overflow-hidden min-h-[90svh] flex items-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Typography */}
          <motion.div 
            style={reduce ? {} : { y: yText, opacity: opacityText }} 
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <Eyebrow text="Aditya Nugraha" />
            <motion.h1 variants={fadeUp} className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-bold text-ink leading-[0.9] tracking-[-0.04em] mb-8 uppercase">
              Frontend <br />
              <span className="text-transparent [-webkit-text-stroke:2px_#1a1a1a] hover:text-primary hover:[-webkit-text-stroke:0px] transition-colors duration-500">
                Engineer.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-steel max-w-lg mb-10 font-medium leading-[1.7]">
              Building clean, performant web applications with React and TypeScript. 
              Bridging the gap between robust architecture and flawless interfaces.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center justify-between sm:justify-center gap-4 bg-ink text-white font-bold uppercase tracking-widest px-8 py-5 rounded-none border border-ink hover:bg-white hover:text-ink transition-all duration-300 text-xs sm:text-sm"
              >
                <span>View Projects</span>
                <Terminal size={18} className="transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="https://github.com/diityanug"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between sm:justify-center gap-4 bg-transparent text-ink border border-black/10 font-bold uppercase tracking-widest px-8 py-5 rounded-none hover:border-black/30 transition-all duration-300 text-xs sm:text-sm"
              >
                <span>GitHub</span>
                <Github size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Abstract Minimalist Graphic */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-5 hidden lg:flex justify-end"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] bg-black/5 relative overflow-hidden flex items-end p-8 border border-black/5">
              <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-black/10"></div>
              <div className="w-full">
                <div className="font-mono text-[10px] text-steel tracking-widest uppercase mb-2">System Status</div>
                <div className="w-full h-1 bg-black/10 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute inset-y-0 left-0 w-1/3 bg-ink"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
