import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import AnimatedCharacter from '../ui/AnimatedCharacter';
import JapaneseHoverText from '../ui/JapaneseHoverText';
import { TerminalWindow as Terminal, GithubLogo as Github } from "@phosphor-icons/react";

// Hero Section
const Hero = () => {
  const containerRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <section ref={containerRef} id="home" className="bg-[#FAFAFA] pt-32 md:pt-40 pb-28 md:pb-40 px-4 relative overflow-hidden min-h-[90svh] flex items-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

      {/* Mobile-only background character */}
      <div aria-hidden="true" className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[110vw] max-w-130 scale-125">
          <AnimatedCharacter />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Typography */}
          <motion.div 
            style={(reduce || !isDesktop) ? {} : { y: yText, opacity: opacityText }} 
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.h1 
              variants={fadeUp} 
              tabIndex={0}
              onTouchStart={() => {}}
              className="text-[min(14vw,68px)] sm:text-[70px] md:text-[84px] lg:text-[104px] font-bold text-ink leading-[0.95] tracking-[-0.03em] mb-8 uppercase cursor-pointer select-none focus:outline-none"
            >
              <JapaneseHoverText
                japanese="こんにちは、"
                english="HELLO,"
                interval={3500}
                className="w-full"
                jpClassName="text-ink tracking-tight font-extrabold"
                enClassName="text-ink font-extrabold tracking-[-0.04em]"
              />
              <br />
              <JapaneseHoverText
                japanese="ようこそ。"
                english="WELCOME."
                interval={3500}
                offset={700}
                className="w-full"
                jpClassName="text-transparent [-webkit-text-stroke:2px_#1a1a1a] tracking-tight font-extrabold"
                enClassName="text-transparent [-webkit-text-stroke:2px_#1a1a1a] font-extrabold tracking-[-0.04em]"
              />
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-steel max-w-lg mb-10 font-medium leading-[1.7]">
              Hello, I’m Aditya, a Frontend Developer passionate about building engaging web and mobile interfaces while exploring new technologies. 
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center justify-between sm:justify-center gap-4 bg-ink text-white font-bold uppercase tracking-widest px-8 py-5 rounded-none border border-ink hover:bg-white hover:text-ink transition-all duration-300 text-xs sm:text-sm w-full sm:w-auto"
              >
                <span>View Projects</span>
                <Terminal size={18} className="transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="https://github.com/diityanug"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between sm:justify-center gap-4 bg-transparent text-ink border border-black/10 font-bold uppercase tracking-widest px-8 py-5 rounded-none hover:bg-ink hover:text-white hover:border-ink transition-all duration-300 text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
              >
                <span>GitHub</span>
                <Github size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Character (desktop only) */}
          <motion.div 
            variants={fadeUp}
            className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
          >
            <AnimatedCharacter />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;