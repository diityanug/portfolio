import { useCallback, memo } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { ClockWidget } from '../components/homePage/ClockWeather';
import { popUpVariants } from '@utils/animation';

import DotGrid from '../components/homePage/DotGrid';
import MagneticLetter from '../components/homePage/MagneticLetter';
import BioReveal from '../components/homePage/BioReveal';

/* =========================================
   ANIMATION VARIANTS (Dipindah ke luar agar tidak re-render)
   ========================================= */

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
  // Exit di-tweak agar halaman meluncur halus ke atas saat pindah page
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.4, ease: "easeInOut" } 
  }
};

const bioCtaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1.8, 
      staggerChildren: 0.2
    }
  }
};

const typingChar: Variants = {
  hidden: { opacity: 0, y: 25, rotate: -8 },
  show: { 
    opacity: 1, y: 0, rotate: 0,
    transition: { type: "spring", damping: 14, stiffness: 100 }
  }
};

/* =========================================
   COMPONENTS
   ========================================= */

// Bottom Info Component
const BottomInfo = memo(() => {
  return (
    <motion.div
      variants={popUpVariants}
      initial="hidden"
      animate="show"
      className="absolute bottom-8 md:bottom-12 left-8 md:left-16 flex items-center gap-3 md:gap-4 z-20 pointer-events-none"
    >
      <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#2E4C38] font-bold">
        Bekasi Regency
      </span>
      <span className="w-[1.5px] h-4 bg-[#2E4C38]/30 flex-shrink-0" />
      <ClockWidget />
    </motion.div>
  );
});
BottomInfo.displayName = 'BottomInfo';

// Editorial Arrow Icon
const ArrowUpRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" height="16" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round"
    className="w-4 h-4 md:w-4 md:h-4"
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
  
  // Menggunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const handleNavigate = useCallback(() => navigate('/about'), [navigate]);

  return (
    <motion.div 
      variants={pageVariants} 
      initial="hidden"
      animate="show"
      exit="exit" 
      className="w-full px-8 md:px-16 bg-[#F9F8F4] min-h-screen overflow-x-hidden flex items-start lg:items-center relative z-0 pt-[160px] lg:pt-0 pb-24"
    >
      {/* Ambient interactive background layers — behind all content */}
      <DotGrid />
      
      <BottomInfo />

      <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center text-center relative z-10 mt-20 lg:mt-12">
        <div className="pointer-events-auto flex flex-col items-center w-full">
          
          {/* Greeting */}
          <motion.div 
            variants={popUpVariants} 
            initial="hidden"
            animate="show"
            className="mb-6 md:mb-8"
          >
            <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#2E4C38] font-bold">
              Hello, I'm
            </span>
          </motion.div>

          {/* Name Container — letters are now magnetic */}
          <motion.h1 
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.4 }}
            className="mb-6 md:mb-8 w-fit select-none cursor-default font-hatton font-normal text-5xl md:text-[80px] lg:text-[96px] leading-[0.9] tracking-tight flex flex-col md:flex-row gap-2 md:gap-6 items-center"
          >
            <div className="text-[#1A2F24] flex">
              {"Aditya".split("").map((char, i) => (
                <MagneticLetter
                  key={`aditya-${i}`}
                  char={char}
                  variants={typingChar}
                  idleDelay={2 + i * 0.12}
                />
              ))}
            </div>
            <div className="text-[#4A6750] flex">
              {"Nugraha".split("").map((char, i) => (
                <MagneticLetter
                  key={`nugraha-${i}`}
                  char={char}
                  variants={typingChar}
                  idleDelay={2 + (i + 6) * 0.12}
                />
              ))}
            </div>
          </motion.h1>

          {/* Wrapper Bio & CTA */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={bioCtaContainerVariants}
            className="flex flex-col items-center mt-2"
          >
            {/* Decorative Line */}
            <div className="w-16 md:w-24 flex justify-center mb-6">
              <motion.div
                variants={{
                  hidden: { width: 0 },
                  show: { 
                    width: "100%", 
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
                  }
                }}
                className="h-[1.5px] bg-[#2E4C38]/20 rounded-full"
              />
            </div>

            {/* Short Bio — keywords are now hoverable */}
            <motion.p
              variants={popUpVariants}
              className="font-['The_Seasons_Regular'] text-base md:text-lg lg:text-xl leading-relaxed text-[#1A2F24]/80 max-w-[600px] mb-20 md:mb-24 px-4 relative"
            >
              <BioReveal />
            </motion.p>

            {/* CTA Area (Editorial Button Style) */}
            <motion.div 
              variants={popUpVariants}
              className="relative md:fixed md:bottom-12 md:right-16 flex justify-center z-20 pointer-events-auto mt-4 md:mt-0"
            >
              <motion.button
                onClick={handleNavigate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-between gap-4 px-6 py-3 md:px-8 md:py-4 rounded-full border border-[#2E4C38]/20 bg-[#F9F8F4] hover:bg-[#1A2F24] hover:border-[#1A2F24] text-[#1A2F24] hover:text-[#F9F8F4] transition-colors duration-500 ease-out shadow-sm"
              >
                <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                  Get in touch
                </span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <ArrowUpRight />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;