import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { ClockWidget } from '../components/homePage/ClockWeather';
import DotGrid from '../components/homePage/DotGrid';

/* =========================================
   ANIMATION VARIANTS
   ========================================= */
const ANIM_DURATION = 0.5; 
// FIX TS ERROR: Tambahkan "as const" agar dibaca sebagai tuple [number, number, number, number]
const snappyEase = [0.22, 1, 0.36, 1] as const; 

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { 
    opacity: 0, 
    filter: "blur(10px)",
    transition: { duration: 0.4 } 
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: ANIM_DURATION, ease: snappyEase, delay } 
  })
};

const textRise: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (delay: number) => ({ 
    y: "0%", 
    opacity: 1,
    transition: { duration: ANIM_DURATION, ease: snappyEase, delay }
  })
};

/* =========================================
   COMPONENTS
   ========================================= */
const ArrowUpRight = (): ReactElement => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" height="16" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="1.5" 
    strokeLinecap="round" strokeLinejoin="round"
    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
  >
    <line x1="5" y1="17" x2="19" y2="5"></line>
    <polyline points="5 5 19 5 19 19"></polyline>
  </svg>
);

/* =========================================
   MAIN PAGE
   ========================================= */
const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => navigate('/about'), [navigate]);

  return (
    <motion.div 
      variants={pageVariants} 
      initial="hidden"
      animate="show"
      exit="exit" 
      className="w-full min-h-screen bg-[#F9F8F4] overflow-hidden relative z-0 flex flex-col justify-center items-center px-6 md:px-12 pt-20 pb-12"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <DotGrid />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full max-w-[1200px] relative z-10 flex flex-col items-center justify-center text-center">
        
        <div className="flex flex-col items-center">
          
          {/* URUTAN 3 (Delay 0.5) */}
          <motion.div custom={0.5} variants={fadeUp} className="mb-6 md:mb-8">
            <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#4A6750] font-bold">
              Hello, I'm
            </span>
          </motion.div>

          {/* URUTAN 1 & 2 (Delay 0.1 & 0.2) */}
          <div className="flex flex-col items-center mb-10 md:mb-12 cursor-default select-none">
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.h1 
                custom={0.1}
                variants={textRise}
                className="font-['The_Seasons_Regular'] text-[60px] sm:text-[90px] md:text-[120px] lg:text-[140px] leading-[0.85] text-[#1A2F24]"
              >
                ADITYA
              </motion.h1>
            </div>
            <div className="overflow-hidden pt-1 md:pt-2">
              <motion.h1 
                custom={0.2}
                variants={textRise}
                className="font-['The_Seasons_Regular'] text-[60px] sm:text-[90px] md:text-[120px] lg:text-[140px] leading-[0.85] text-[#4A6750]"
              >
                NUGRAHA
              </motion.h1>
            </div>
          </div>

          {/* URUTAN 4 (Delay 0.6) */}
          <motion.div custom={0.6} variants={fadeUp} className="w-full max-w-[550px] font-['Aileron'] text-base md:text-lg leading-relaxed text-[#2E4C38]/80 font-medium mb-12 px-4">
            <p>Software Engineer focusing on Frontend Development. Building digital experiences with React and TypeScript.</p>
          </motion.div>

          {/* URUTAN 5 (Delay 0.7) */}
          <motion.button
            custom={0.7}
            variants={fadeUp}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigate}
            className="group relative flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-[#1A2F24] text-[#F9F8F4] overflow-hidden shadow-[0_10px_30px_rgba(26,47,36,0.15)] hover:shadow-[0_10px_40px_rgba(74,103,80,0.3)]"
          >
            <div className="absolute inset-0 bg-[#4A6750] translate-y-full rounded-full transition-transform duration-200 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 font-['Red_Hat_Display'] text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold mt-0.5">
              Let's Talk
            </span>
            <span className="relative z-10 text-[#E0BA5C]">
              <ArrowUpRight />
            </span>
          </motion.button>
          
        </div>
      </div>

      {/* ================= BOTTOM METADATA ================= */}
      {/* URUTAN 6 (Delay 0.8) */}
      <motion.div 
        custom={0.8}
        variants={fadeUp}
        className="absolute bottom-6 md:bottom-10 left-6 right-6 md:left-12 md:right-12 flex justify-between items-end z-10 pointer-events-none"
      >
        <div className="flex flex-col gap-1">
          <span className="font-['Red_Hat_Display'] text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#4A6750] font-bold">
            Location
          </span>
          <span className="font-['Aileron'] text-xs md:text-sm text-[#1A2F24] font-medium tracking-wide">
            Bekasi Regency, West Java
          </span>
        </div>
        
        <div className="flex flex-col gap-1 text-right">
          <span className="font-['Red_Hat_Display'] text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#4A6750] font-bold">
            Local Time
          </span>
          <div className="pointer-events-auto">
            <ClockWidget />
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default HomePage;