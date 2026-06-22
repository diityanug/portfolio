import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SocialButton } from '../components/contactPage/SocialButton';
import { SOCIAL_LINKS, EMAIL_LINK, RESUME_LINK, RESUME_ICON } from '../constants/contactData';

// === BACKGROUND LAYERS IMPORT (Plek Ketiplek Home Page) ===
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

const ContactPage = (): ReactElement => {
  // Animasi Page
  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Animasi Container List - Dibuat delay 1.8s agar menunggu judul selesai muncul
  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.8, staggerChildren: 0.15 } 
    }
  };

  // Animasi Masuk Judul (Entry Spring)
  const typingChar: Variants = {
    hidden: { opacity: 0, y: 25, rotate: -8 },
    show: { 
      opacity: 1, y: 0, rotate: 0,
      transition: { type: "spring", damping: 14, stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      // BG color disamakan dengan Home Page
      className="relative z-0 flex flex-col pt-32 lg:pt-40 px-6 md:px-12 lg:px-16 pb-24 min-h-screen bg-[#F9F8F4] overflow-x-hidden"
    >
      {/* === BACKGROUND LAYERS (z-0) === */}
      {/* Dot Grid Interaktif */}
      <DotGrid />
      {/* Soft Blurry Cursor Blob */}

      {/* === MAIN CONTENT (relative z-10 agar di atas background) === */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full relative z-10 flex-1">

        {/* MAIN HERO */}
        <div className="flex-1 flex flex-col justify-center mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-12 lg:gap-8">

            {/* LEFT SECTION */}
            <div className="flex flex-col items-start w-full lg:w-2/3">
              
              {/* JUDUL UTAMA - MUNCUL DULUAN */}
              <motion.div 
                initial="hidden"
                animate="show"
                // Kecepatan diatur agar selesai sekitar 1.6 detik
                transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
                className="flex flex-col gap-2 md:gap-4 mb-8"
              >
                {/* Baris 1: LET'S BUILD */}
                <h1 className="font-hatton font-normal text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight flex">
                  <div className="text-[#1A2F24] flex">
                    {"LET'S BUILD".split("").map((char, i) => (
                      <motion.span key={`lets-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </h1>
                
                {/* Baris 2: SOMETHING GREAT */}
                <h1 className="font-hatton font-normal text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight flex flex-wrap gap-x-4 md:gap-x-6">
                  <div className="text-[#1A2F24] flex">
                    {"SOMETHING".split("").map((char, i) => (
                      <motion.span key={`smth-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="text-[#4A6750] flex">
                    {"GREAT.".split("").map((char, i) => (
                      <motion.span key={`great-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                        {/* HANYA KATA INI YANG KENA EFEK ANGIN (IDLE) - Disamakan plek */}
                        <motion.span
                          animate={{ y: -4, rotate: 1.5 }} 
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "mirror", 
                            duration: 1.6, 
                            delay: 2 + (i * 0.12), // Reset delay ke i agar gelombang menyapu dari kiri ke kanan di kata ini
                            ease: "easeInOut" 
                          }}
                          className="inline-block origin-bottom"
                        >
                          {char}
                        </motion.span>
                      </motion.span>
                    ))}
                  </div>
                </h1>
              </motion.div>

              {/* KONTEN SISANYA - MENUNGGU JUDUL SELESAI */}
              <motion.div 
                variants={listContainerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col"
              >
                {/* Decorative Line */}
                <motion.div variants={popUpVariants} className="w-16 md:w-24 h-[1.5px] bg-[#2E4C38]/20 mb-8" />

                <motion.p variants={popUpVariants} className="font-['The_Seasons_Regular'] text-lg md:text-xl text-[#1A2F24]/80 leading-relaxed max-w-lg">
                  I’m always excited to collaborate on meaningful projects, discuss tech, or just say hello. Reach out anytime.
                </motion.p>
              </motion.div>
            </div>

            {/* RIGHT SECTION: CTA Buttons - MENUNGGU JUDUL SELESAI */}
            <motion.div 
              variants={listContainerVariants}
              initial="hidden"
              animate="show"
              className="w-full lg:w-1/3 flex justify-start lg:justify-end mt-4 lg:mt-0"
            >
              <motion.a 
                variants={popUpVariants}
                href={EMAIL_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                // z-10 dan backdrop-blur agar terlihat editorial di atas blob
                className="group flex items-center justify-between gap-4 bg-[#1A2F24] text-[#F9F8F4] px-6 py-3.5 md:px-8 md:py-4 rounded-full hover:bg-[#4A6750] transition-colors duration-500 ease-out shadow-sm relative z-10 backdrop-blur-sm"
              >
                <span className="font-['Red_Hat_Display'] text-[11px] md:text-xs tracking-[0.2em] uppercase font-bold">
                  Send an Email
                </span>
                <span className="bg-[#F9F8F4]/10 p-2 rounded-full group-hover:rotate-45 group-hover:bg-[#F9F8F4]/20 transition-all duration-300">
                  <ArrowUpRight />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* MAIN FOOTER - MENUNGGU JUDUL SELESAI */}
        <motion.div 
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="w-full shrink-0 mt-auto pt-8 relative z-10"
        >
          {/* Top Border */}
          <motion.div variants={popUpVariants} className="w-full border-t border-[#2E4C38]/20 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 w-full">
            
            {/* Social Links */}
            <motion.div variants={popUpVariants} className="flex flex-wrap gap-3">
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

            {/* Status Indicator (Minimalist Editorial Style) */}
            {/* backdrop-blur ditambahkan agar konsisten */}
            <motion.div variants={popUpVariants} className="flex flex-col items-start md:items-end gap-2 px-5 py-4 rounded-xl border border-[#2E4C38]/10 bg-transparent backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A6750] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A6750]"></span>
                </span>
                <p className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#1A2F24]/60 font-bold">
                  Available for work
                </p>
              </div>
              <p className="font-migra text-lg md:text-xl text-[#4A6750] font-medium">
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