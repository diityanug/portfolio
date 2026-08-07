import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useHomeLock } from '../context/HomeLockContext';

import { ClockWidget } from '../components/widgets/ClockWeather';
import DotGrid from '../components/ui/DotGrid';

const ANIM_DURATION = 1.2; 
const relaxedEase = [0.4, 0, 0.2, 1] as const; 

// Animasi untuk teks dan elemen di dalam HomePage
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: ANIM_DURATION, ease: relaxedEase, delay } 
  })
};

const textRise: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (delay: number) => ({ 
    y: "0%", 
    opacity: 1,
    transition: { duration: ANIM_DURATION, ease: relaxedEase, delay }
  })
};

const ArrowDown = (): ReactElement => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" height="16" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="1.5" 
    strokeLinecap="round" strokeLinejoin="round"
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

const HomePage = (): ReactElement => {
  const { leaveHome } = useHomeLock();

  const handleNavigate = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // PERBAIKAN: Reset posisi scroll ke atas sebelum pindah halaman
    window.scrollTo(0, 0);
    leaveHome(); 
    e.currentTarget.blur();
  }, [leaveHome]);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      // Kita menghapus pageVariants di sini karena transisi halaman (slide y) sudah di-handle oleh App.tsx
      className="w-full min-h-[100svh] bg-[#F9F8F4] overflow-hidden relative z-0 flex flex-col justify-center items-center px-4 md:px-12 pt-20 pb-24 md:pt-20 md:pb-12"
    >
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <DotGrid />
      </div>

      <div className="w-full max-w-[1200px] relative z-10 flex flex-col items-center justify-center text-center mt-[-4vh] md:mt-0">
        <div className="flex flex-col items-center w-full">
          
          <motion.div custom={0.5} variants={fadeUp} className="mb-3 md:mb-6">
            <span className="font-redhat text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#4A6750] font-bold bg-[#4A6750]/5 px-3 py-1.5 rounded-full md:bg-transparent md:px-0">
              Hello, I'm
            </span>
          </motion.div>

          <div className="flex flex-col items-center mb-5 md:mb-10 cursor-default select-none">
            <div className="overflow-hidden pb-1 md:pb-4">
              <motion.h1 
                custom={0.1}
                variants={textRise}
                className="font-seasons text-[16vw] sm:text-[90px] md:text-[120px] lg:text-[140px] leading-[0.85] text-[#1A2F24]"
              >
                ADITYA
              </motion.h1>
            </div>
            <div className="overflow-hidden pt-0.5 md:pt-2">
              <motion.h1 
                custom={0.2}
                variants={textRise}
                className="font-seasons text-[16vw] sm:text-[90px] md:text-[120px] lg:text-[140px] leading-[0.85] text-[#4A6750]"
              >
                NUGRAHA
              </motion.h1>
            </div>
          </div>

          <motion.div custom={0.6} variants={fadeUp} className="w-full max-w-[550px] font-aileron text-xs sm:text-sm md:text-lg leading-relaxed text-[#2E4C38]/80 font-medium mb-8 md:mb-12 px-2">
            <p>Software Engineer focusing on Frontend Development. Building digital experiences with React and TypeScript.</p>
          </motion.div>

          <motion.button
            custom={0.7}
            variants={fadeUp}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigate}
            className="group relative flex items-center justify-center gap-3 md:gap-4 w-auto px-8 py-3.5 md:px-10 md:py-4 rounded-full border-2 border-[#1A2F24] bg-transparent text-[#1A2F24] overflow-hidden mx-auto transition-shadow hover:shadow-[0_10px_30px_rgba(26,47,36,0.15)]"
          >
            <div className="absolute inset-0 bg-[#1A2F24] translate-y-[101%] rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 font-redhat text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold mt-0.5 group-hover:text-[#F9F8F4] transition-colors duration-300">
              Get to know
            </span>
            <span className="relative z-10 text-[#1A2F24] group-hover:text-[#E0BA5C] transition-colors duration-300">
              <ArrowDown />
            </span>
          </motion.button>
        </div>
      </div>

      <motion.div 
        custom={0.8}
        variants={fadeUp}
        className="absolute bottom-5 md:bottom-10 inset-x-4 md:inset-x-12 flex justify-between items-center md:items-end z-10 pointer-events-none bg-white/70 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-white/50 md:border-transparent shadow-sm md:shadow-none p-3 md:p-0 rounded-2xl md:rounded-none"
      >
        <div className="flex flex-col gap-0.5 md:gap-1 text-left">
          <span className="font-redhat text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#4A6750] font-bold">
            Location
          </span>
          <span className="font-aileron text-[11px] md:text-sm text-[#1A2F24] font-medium tracking-wide">
            Bekasi, West Java
          </span>
        </div>
        
        <div className="flex flex-col gap-0.5 md:gap-1 text-right">
          <span className="font-redhat text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#4A6750] font-bold">
            Local Time
          </span>
          <div className="pointer-events-auto scale-90 md:scale-100 origin-right">
            <ClockWidget />
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default HomePage;