import { useState } from 'react';
import type { ReactElement, SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';

import { popUpVariants } from '@utils/animation';

// IMPORT STAR GRID DI SINI (Sesuaikan letak foldernya)
import StarGrid from '../components/profilePage/StarGrid';

/* ARROW ICON HELPER */
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="17" x2="19" y2="5"></line>
    <polyline points="5 5 19 5 19 19"></polyline>
  </svg>
);

/* MAIN PAGE COMPONENT */
const ProfilePage = (): ReactElement => {
  const [showAllCerts, setShowAllCerts] = useState(false);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
  };

  /* =========================================
     KOREOGRAFI ANIMASI (TIMELINE)
     ========================================= */

  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // 1. Teks "HI THERE!" Muncul Pertama
  const typingContainer: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };
  
  const typingChar: Variants = {
    hidden: { opacity: 0, y: 30, rotate: -10 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { type: "spring", damping: 14, stiffness: 120 }
    }
  };

  // 2. Foto Profil "Colorful Blocks" Muncul Kedua Bertahap
  const photoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.0, staggerChildren: 0.2 }
    }
  };

  const frontFrameVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const colorBlock1Variants: Variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    show: {
      opacity: 1,
      x: -20, // Geser Kiri
      y: 20,  // Geser Bawah
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const colorBlock2Variants: Variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    show: {
      opacity: 1,
      x: 20,  // Geser Kanan
      y: -20, // Geser Atas
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // 3. Bio & Konten Lainnya Muncul Terakhir
  const delayedContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.6, staggerChildren: 0.15 } 
    }
  };

  const displayedCertificates = showAllCerts ? CERTIFICATES_DATA : CERTIFICATES_DATA.slice(0, 2);

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-[120px] lg:pt-32 px-8 md:px-16 pb-24 min-h-screen bg-[#F9F8F4] overflow-x-hidden"
    >
      {/* ===== PASANG STAR GRID DI SINI ===== */}
      <StarGrid />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">

        {/* MAIN ABOUT */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center lg:items-start mb-24 mt-4 md:mt-8">
          
          {/* FOTO PROFIL (COLORFUL BLOCKS REVEAL) */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start mt-8 lg:mt-0">
            <motion.div
              variants={photoContainerVariants}
              initial="hidden"
              animate="show"
              className="relative w-full max-w-[260px] md:max-w-[300px]"
            >
              {/* FRAME WARNA 1: Kuning Mustard (Geser Kiri Bawah) */}
              <motion.div 
                variants={colorBlock1Variants}
                className="absolute inset-0 w-full h-full bg-[#E0BA5C] z-0 rounded-xl" 
              />
              
              {/* FRAME WARNA 2: Hijau Gelap (Geser Kanan Atas) */}
              <motion.div 
                variants={colorBlock2Variants}
                className="absolute inset-0 w-full h-full bg-[#4A6750] z-0 rounded-xl" 
              />
              
              {/* FRAME DEPAN: Foto Utama */}
              <motion.div 
                variants={frontFrameVariants}
                className="relative z-10 p-2 md:p-3 bg-white border border-[#2E4C38]/10 shadow-xl rounded-xl"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#F9F8F4] rounded-lg">
                  <img
                    src="/images/aw aw"
                    alt="Aditya Nugraha Irwan"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* TEXT CONTENT */}
          <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Teks Muncul Duluan dengan Animasi Angin */}
            <motion.h1 
              variants={typingContainer}
              initial="hidden"
              animate="show"
              className="pointer-events-none select-none font-hatton font-normal text-7xl md:text-[100px] lg:text-[120px] leading-[0.85] tracking-tight mb-8 flex flex-col items-center lg:items-start"
            >
              <div className="text-[#1A2F24] flex pb-2 md:pb-3">
                {"HI".split("").map((char, i) => (
                  <motion.span key={`hi-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                    <motion.span
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
                  </motion.span>
                ))}
              </div>
              <div className="text-[#4A6750] flex lg:ml-12">
                {"THERE!".split("").map((char, i) => (
                  <motion.span key={`there-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                    <motion.span
                      animate={{ y: -4, rotate: 1.5 }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "mirror", 
                        duration: 1.6, 
                        delay: 2 + ((i + 2) * 0.12), 
                        ease: "easeInOut" 
                      }}
                      className="inline-block origin-bottom"
                    >
                      {char}
                    </motion.span>
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            {/* Bio Muncul Terakhir */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={delayedContainerVariants}
              className="flex flex-col items-center lg:items-start"
            >
              <motion.div
                variants={popUpVariants}
                className="flex flex-col gap-8 w-full max-w-[600px]"
              >
                <p className="font-migra text-justify text-lg md:text-xl leading-relaxed text-[#2E4C38]/90 font-medium">
                  I'm <span className="text-[#4A6750] font-bold">Aditya</span>! 👋 I'm a Software Engineer who absolutely loves turning wild ideas into interactive and super smooth web apps. My daily playground mostly involves <span className="bg-[#4A6750]/10 text-[#2E4C38] px-2 py-0.5 rounded-md font-garbata font-bold text-sm md:text-base">React</span> and <span className="bg-[#4A6750]/10 text-[#2E4C38] px-2 py-0.5 rounded-md font-garbata font-bold text-sm md:text-base">TypeScript</span>.
                </p>
                <p className="font-migra text-justify text-lg md:text-xl leading-relaxed text-[#2E4C38]/90 font-medium">
                  Beyond the frontend world, I'm also exploring AWS S3, building handy automation tools, and playing around with Python for machine learning. I'm always down to learn new tech, solve real-world puzzles, and just build cool stuff!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* EDUCATION & CERTIFICATES */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={delayedContainerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-12"
        >
          {/* EDUCATION SECTION */}
          <div className="flex flex-col items-start w-full">
            <motion.div variants={popUpVariants} className="flex items-center gap-4 mb-6">
              <span className="text-3xl">🎓</span>
              <h2 className="font-hatton text-4xl md:text-[40px] text-[#1A2F24]">EDUCATION</h2>
            </motion.div>

            <motion.div variants={popUpVariants} className="w-full h-[1.5px] bg-[#2E4C38]/20 mb-4" />

            <div className="flex flex-col w-full">
              {EDUCATION_DATA.map((edu: any, index: number) => (
                <motion.div 
                  key={index} 
                  variants={popUpVariants}
                  className="py-6 border-b border-[#2E4C38]/10 group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#4A6750] text-sm md:text-base font-medium font-migra">
                      {edu.period || edu.year || edu.date}
                    </span>
                    {(edu.gpa || edu.ipk) && (
                      <>
                        <span className="w-1.5 h-1.5 bg-[#4A6750]/30 rounded-full" />
                        <span className="text-[#2E4C38] text-xs md:text-sm font-bold font-migra tracking-wider mt-0.5">
                          GPA: {edu.gpa || edu.ipk}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-hatton font-bold text-xl md:text-2xl text-[#1A2F24] mb-1 group-hover:text-[#4A6750] transition-colors">
                    {edu.degree || edu.title}
                  </h3>
                  
                  <h4 className="font-migra text-[#4A6750]/90 text-lg md:text-xl mb-2">
                    {edu.institution || edu.school}
                  </h4>

                  {edu.focus && (
                    <div className="font-['Poppins_Light'] font-bold text-[#2E4C38] text-sm mt-1 mb-2">
                      Focus: <span className="font-medium text-[#2E4C38]/80">{edu.focus}</span>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-[#2E4C38]/70 text-base md:text-lg leading-relaxed font-['The_Seasons_Regular'] mt-2 text-justify">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* CERTIFICATES SECTION */}
          <div className="flex flex-col items-start w-full">
            <motion.div variants={popUpVariants} className="flex items-center gap-4 mb-6">
              <span className="text-3xl">✨</span>
              <h2 className="font-hatton text-4xl md:text-[40px] text-[#1A2F24]">CERTIFICATES</h2>
            </motion.div>

            <motion.div variants={popUpVariants} className="w-full h-[1.5px] bg-[#2E4C38]/20 mb-4" />

            <div className="flex flex-col w-full">
              <AnimatePresence initial={false}>
                {/* @ts-ignore */}
                {displayedCertificates.map((cert: any, index: number) => (
                  <motion.div 
                    key={cert.title || index}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <a 
                      href={cert.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-5 md:py-6 flex items-center justify-between border-b border-[#2E4C38]/10 group cursor-pointer"
                    >
                      <div className="flex flex-col pr-6">
                        <h3 className="font-hatton font-bold text-[#1A2F24] text-lg md:text-xl group-hover:text-[#4A6750] transition-colors line-clamp-2">
                          {cert.title || cert.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-base md:text-lg font-medium text-[#4A6750]/90 font-migra">
                            {cert.issuer || cert.organization}
                          </span>
                          {cert.year && (
                            <>
                              <span className="w-1.5 h-1.5 bg-[#4A6750]/30 rounded-full" />
                              <span className="text-base md:text-lg text-[#4A6750]/70 font-migra">
                                {cert.year}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-[#1A2F24]/30 group-hover:text-[#4A6750] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                        <ArrowUpRight />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* EXTEND / SHOW MORE BUTTON */}
            {CERTIFICATES_DATA.length > 2 && (
              <motion.button
                layout 
                variants={popUpVariants}
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="mt-6 flex items-center gap-2 text-xs md:text-sm font-['Red_Hat_Display'] font-bold tracking-[0.15em] uppercase text-[#4A6750] hover:text-[#1A2F24] transition-colors"
              >
                {showAllCerts ? "Show Less" : `View All (${CERTIFICATES_DATA.length})`}
                <motion.svg 
                  animate={{ rotate: showAllCerts ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </motion.button>
            )}

          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProfilePage;