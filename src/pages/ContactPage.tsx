import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SocialButton } from '../components/contactPage/SocialButton';
import { SOCIAL_LINKS, EMAIL_LINK, RESUME_LINK, RESUME_ICON } from '../constants/contactData';

// === BACKGROUND LAYERS IMPORT ===
import DotGrid from '../components/homePage/DotGrid';

import { 
  popUpVariants 
} from '@utils/animation';

/* ARROW ICON HELPER */
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

/* =========================================
   KOREOGRAFI ANIMASI (CINEMATIC TIMING)
   ========================================= */
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ContactPage = (): ReactElement => {
  // Animasi Page
  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.5, ease: customEase } }
  };

  // Animasi Judul Utama (Cinematic Blur)
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase } }
  };

  // Animasi Container List
  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.0, staggerChildren: 0.15 } 
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      // lg:h-screen memastikan desktop fix 1 layar (tidak bisa scroll)
      className="relative z-0 flex flex-col pt-28 md:pt-32 lg:pt-32 px-5 md:px-12 lg:px-16 pb-8 md:pb-12 min-h-[100dvh] lg:h-screen bg-[#F9F8F4] overflow-x-hidden lg:overflow-hidden"
    >
      {/* === BACKGROUND LAYERS === */}
      <DotGrid />

      {/* === MAIN CONTENT === */}
      <div className="w-full max-w-[1000px] mx-auto flex flex-col h-full relative z-10 flex-1">

        {/* MAIN HERO - my-auto akan mengatur posisi tepat di tengah sisa ruang (vertical centering) */}
        <div className="flex-1 flex flex-col justify-center w-full my-auto py-8 lg:py-0">
          
          {/* JUDUL UTAMA */}
          <motion.div 
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
            className="flex flex-col gap-1 md:gap-4 mb-8 md:mb-10"
          >
            {/* Baris 1: LET'S BUILD */}
            <h1 className="font-['The_Seasons_Regular'] text-[13vw] sm:text-[80px] md:text-[100px] lg:text-[120px] leading-[0.9] tracking-tight flex">
              <motion.div variants={titleVariants} className="text-[#1A2F24] flex">
                LET'S BUILD
              </motion.div>
            </h1>
            
            {/* Baris 2: SOMETHING GREAT */}
            <h1 className="font-['The_Seasons_Regular'] text-[13vw] sm:text-[80px] md:text-[100px] lg:text-[120px] leading-[0.9] tracking-tight flex flex-wrap gap-x-2 sm:gap-x-4 md:gap-x-6">
              <motion.div variants={titleVariants} className="text-[#1A2F24] flex">
                SOMETHING
              </motion.div>
              <motion.div variants={titleVariants} className="text-[#4A6750] flex">
                {"GREAT.".split("").map((char, i) => (
                  <motion.span
                    key={`great-${i}`}
                    animate={{ y: -4, rotate: 1.5 }} 
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "mirror", 
                      duration: 1.6, 
                      delay: 2 + (i * 0.12), 
                      ease: "easeInOut" 
                    }}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </h1>
          </motion.div>

          {/* KONTEN SISANYA & CTA BUTTON */}
          <motion.div 
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 border-t border-[#2E4C38]/10 pt-8 md:pt-10"
          >
            <motion.div variants={popUpVariants} className="flex flex-col gap-6 w-full md:w-[60%]">
              <p className="font-['Aileron'] text-base md:text-xl text-[#2E4C38]/80 leading-relaxed font-medium">
                I’m always excited to collaborate on meaningful projects, discuss tech, or just say hello. Reach out anytime.
              </p>
            </motion.div>

            <motion.div variants={popUpVariants} className="shrink-0 mt-2 md:mt-0">
              <a 
                href={EMAIL_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-4 bg-[#1A2F24] text-[#F9F8F4] px-6 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-[#4A6750] transition-colors duration-500 ease-out shadow-sm relative z-10 backdrop-blur-sm w-fit"
              >
                <span className="font-['Red_Hat_Display'] text-[11px] md:text-xs tracking-[0.2em] uppercase font-bold">
                  Send an Email
                </span>
                <span className="bg-[#F9F8F4]/10 p-2 rounded-full group-hover:rotate-45 group-hover:bg-[#F9F8F4]/20 transition-all duration-300">
                  <ArrowUpRight />
                </span>
              </a>
            </motion.div>
          </motion.div>

        </div>

        {/* MAIN FOOTER */}
        <motion.div 
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="w-full shrink-0 mt-auto pt-6 md:pt-8 relative z-10"
        >
          {/* Top Border Footer */}
          <motion.div variants={popUpVariants} className="w-full h-[1px] bg-[#2E4C38]/10 mb-6 md:mb-8" />

          <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 w-full">
            
            {/* Social Links */}
            <motion.div variants={popUpVariants} className="flex flex-wrap gap-2.5 md:gap-3 w-full md:w-auto">
              {SOCIAL_LINKS.map((social) => (
                <SocialButton 
                  key={social.name} 
                  url={social.url} 
                  icon={social.icon} 
                  label={social.name} 
                />
              ))}
              <SocialButton 
                url={RESUME_LINK} 
                icon={RESUME_ICON} 
                label="Resume" 
              />
            </motion.div>

            {/* Status Indicator */}
            <motion.div variants={popUpVariants} className="flex flex-col items-start md:items-end gap-1.5 w-full md:w-auto border-b border-[#2E4C38]/10 md:border-none pb-4 md:pb-0">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A6750] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A6750]"></span>
                </span>
                <p className="font-['Red_Hat_Display'] text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#1A2F24]/50 font-bold mt-0.5">
                  Available for work
                </p>
              </div>
              <p className="font-['Aileron'] text-sm md:text-lg text-[#1A2F24] font-bold">
                Bekasi Regency, West Java.
              </p>
            </motion.div>
            
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ContactPage;