import { useState, useCallback, memo } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ClockWidget } from '../components/homePage/ClockWeather';
import { WavyText } from '../components/homePage/WavyText';
import catsAnimated from '../assets/cats2.svg';

import { fadeUpVariants, lineGrowVariants } from '@utils/animation';

const TECH_TAGS = ['React', 'TypeScript', 'AWS S3'] as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
      delayChildren: 0.6, 
    },
  },
};

const BottomInfo = memo(() => {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="absolute bottom-8 md:bottom-12 left-8 md:left-16 flex items-center gap-3 md:gap-4 z-20 pointer-events-none"
    >
      <span className="font-poppins text-[10px] md:text-xs tracking-[0.25em] uppercase text-gray-500 font-medium">
        Bekasi Regency
      </span>
      <span className="w-[1.5px] h-4 bg-black/20 flex-shrink-0" />
      <ClockWidget />
    </motion.div>
  );
});
BottomInfo.displayName = 'BottomInfo';

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="w-3.5 h-3.5 lg:w-4 lg:h-4"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const HomePage = (): ReactElement => {
  const navigate = useNavigate();
  const [btnHovered, setBtnHovered] = useState<boolean>(false);

  const handleNavigate = useCallback(() => navigate('/about'), [navigate]);

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      className="w-full px-8 md:px-16 bg-transparent min-h-[calc(100vh-116px)] lg:h-[calc(100vh-116px)] overflow-x-hidden overflow-y-auto lg:overflow-hidden flex items-start lg:items-center relative z-0 pt-12 pb-24 lg:py-0"
    >
      <BottomInfo />

      {/* MAIN CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10">

        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start justify-center w-full lg:w-[45%] relative pt-4 lg:pt-0 pointer-events-none">
          <div className="pointer-events-auto w-full">

            <motion.div variants={fadeUpVariants} className="mb-3 md:mb-4">
              <span className="font-poppins text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
                Hello, I'm
              </span>
            </motion.div>

            <div className="mb-5 md:mb-6 w-fit select-none cursor-default font-lejour font-normal text-5xl md:text-[80px] lg:text-[96px] leading-[0.9] tracking-tight text-[#2A2320] flex flex-col">
              <motion.div variants={fadeUpVariants} className="pb-1 md:pb-2">
                <WavyText text="Aditya" isWavy={true} delayOffset={0} />
              </motion.div>
              <motion.div variants={fadeUpVariants} className="text-[#5E7657]">
                <WavyText text="Nugraha" isWavy={true} delayOffset={0.4} />
              </motion.div>
            </div>

            <motion.div
              variants={lineGrowVariants}
              className="w-16 md:w-32 h-[1px] bg-[#5E7657] mb-6 md:mb-8"
            />

            <motion.p
              variants={fadeUpVariants}
              className="font-poppins text-sm md:text-base lg:text-lg leading-relaxed text-gray-500 font-light max-w-[600px]"
            >
              Software Engineer focused on frontend development, with an interest in machine learning and automation.
            </motion.p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-[40%] relative mt-2 lg:mt-0 gap-16 pointer-events-none lg:mr-12">

          {/* CURRENT CARD */}
          <motion.div
            variants={fadeUpVariants}
            className="w-full max-w-[420px] rounded-[32px] bg-white/95 border border-black/[0.06] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.10)] pointer-events-auto overflow-hidden"
          >
            <div className="p-7 md:p-8">
              <div className="mb-6">
                <span className="font-poppins text-[10px] tracking-[0.25em] uppercase text-gray-400 font-semibold">
                  Internal Project – Ongoing
                </span>
              </div>
              <h3
                className="text-xl md:text-[22px] text-black leading-snug mb-3 tracking-wide"
                style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}
              >
                Enterprise HRIS & LMS
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                Developing an HRIS system with role-based navigation and maintaining an LMS system focused on bug fixes and stability improvements.
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_TAGS.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-black/[0.06] bg-white text-[10px] md:text-[11px] font-poppins text-[#2A2320] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-black/[0.02] border-t border-black/[0.04] px-7 py-5 md:px-8 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-poppins tracking-[0.2em] uppercase text-gray-400 mb-1">Company</span>
                <span className="text-xs font-medium text-black tracking-wide" style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}>
                  LG Sinarmas
                </span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[9px] font-poppins tracking-[0.2em] uppercase text-gray-400 mb-1">Role</span>
                <span className="text-xs font-medium text-black tracking-wide" style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}>
                  Software Engineer
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA AREA */}
          <motion.div variants={fadeUpVariants} className="flex flex-col items-center lg:items-end z-20 pointer-events-auto w-full max-w-[460px] relative">
            <img
              src={catsAnimated}
              alt="Cat"
              draggable={false}
              className={`w-16 md:w-20 lg:w-20 relative z-0 -mb-[20px] lg:-mb-[22px] mr-6 lg:mr-8 object-contain select-none pointer-events-none transition-opacity duration-300 ${
                btnHovered ? 'opacity-60' : 'opacity-100'
              }`}
            />

            <div className="w-fit lg:w-auto relative z-10">
              <motion.button
                onClick={handleNavigate}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                className="flex items-center justify-center gap-3 lg:gap-4 bg-[#2A2320] text-white w-fit lg:w-auto px-6 py-3 lg:px-8 lg:py-4 rounded-full hover:bg-[#5E7657] transition-colors duration-300 shadow-lg"
              >
                <span className="font-poppins text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Get in touch
                </span>
                <span className="bg-white/10 p-2 md:p-2.5 rounded-full transition-all duration-300">
                  <ArrowIcon />
                </span>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;