import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useHomeLock } from '../context/HomeLockContext';

import DotGrid from '../components/ui/DotGrid';

const smoothEase = [0.22, 1, 0.36, 1] as const;

// 1. REVISI: Hapus opacity: 0 pada 'hidden' agar background/halaman tidak berkedip
const containerVariants: Variants = {
  hidden: { opacity: 1 }, 
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.1,   
    }
  }
};

// 2. Variant untuk item yang muncul dari bawah (Fade Up)
const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: smoothEase }
  }
};

// 3. Variant khusus untuk Teks Nama (Naik dari dalam kotak / Reveal)
const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: smoothEase }
  }
};

// 4. Variant KHUSUS untuk Marquee (Hanya transisi opacity agar tidak merusak posisi Absolute)
const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.5, ease: smoothEase }
  }
};

const ArrowDown = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    className="transition-transform duration-300 group-hover:translate-y-1"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

// Ticker stack teknologi — Desain dipertahankan 100%
const STACK_ITEMS = [
  'REACT', 'TYPESCRIPT', 'JAVASCRIPT', 'TAILWIND CSS', 'BOOTSTRAP',
  'PYTHON', 'SELENIUM', 'BEAUTIFULSOUP', 'PYAUTOGUI',
  'BUN', 'N8N'
];

const TechMarquee = (): ReactElement => {
  const prefersReducedMotion = useReducedMotion();
  const items = [...STACK_ITEMS, ...STACK_ITEMS];

  return (
    <motion.div 
      variants={fadeOnly}
      className="absolute bottom-0 inset-x-0 z-10 border-t border-[#1A2F24]/10 bg-[#F9F8F4]/80 backdrop-blur-sm overflow-hidden"
    >
      <motion.div
        className="flex items-center gap-8 py-3 md:py-4 whitespace-nowrap w-max px-4"
        animate={prefersReducedMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-redhat text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#4A6750]/70 font-bold"
          >
            {item}
            <span className="text-[#E0BA5C]">•</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};

const HomePage = (): ReactElement => {
  const { leaveHome } = useHomeLock();

  const handleNavigate = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo(0, 0);
    leaveHome();
    e.currentTarget.blur();
  }, [leaveHome]);

  return (
    <motion.div
      key="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      // REVISI: Ubah overflow-hidden menjadi overflow-x-clip untuk melepaskan lock zoom di mobile
      className="w-full min-h-[100svh] bg-[#F9F8F4] overflow-x-clip relative z-0 flex flex-col px-6 pt-8 pb-[80px] md:px-12 md:pt-12"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <DotGrid />
      </div>

      {/* 1. TOP BAR */}
      <motion.div 
        variants={itemFadeUp}
        className="relative z-10 flex justify-between items-center w-full max-w-5xl mx-auto"
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-redhat text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A2F24]">
            Based in
          </span>
          <span className="font-aileron text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase text-[#4A6750]">
            Jakarta, ID
          </span>
        </div>
        
        <div className="text-right flex flex-col gap-0.5">
          <span className="font-redhat text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A2F24]">
            Portfolio
          </span>
          <span className="font-aileron text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase text-[#4A6750]">
            © 2026
          </span>
        </div>
      </motion.div>

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-5xl mx-auto py-6">
        
        {/* Hello I'm */}
        <motion.div variants={itemFadeUp} className="mb-3">
          <span className="font-redhat text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#4A6750] font-bold">
            Hello, I'm
          </span>
        </motion.div>

        {/* Tipografi Utama */}
        <div className="flex flex-col mb-6 select-none cursor-default">
          <div className="overflow-hidden pb-1">
            <motion.h1
              variants={textReveal}
              className="font-seasons text-[60px] min-[375px]:text-[68px] sm:text-[90px] md:text-[120px] leading-[0.85] tracking-tight text-[#1A2F24]"
            >
              ADITYA
            </motion.h1>
          </div>
          <div className="overflow-hidden pt-1 mt-[-1vw] sm:mt-[-5px]">
            <motion.h1
              variants={textReveal}
              className="font-seasons text-[60px] min-[375px]:text-[68px] sm:text-[90px] md:text-[120px] leading-[0.85] tracking-tight text-[#4A6750] italic"
            >
              NUGRAHA
            </motion.h1>
          </div>
        </div>

        {/* Garis aksen minimalis */}
        <motion.div variants={itemFadeUp} className="w-16 h-[2px] bg-[#1A2F24]/20 mb-5" />

        {/* Deskripsi */}
        <motion.p 
          variants={itemFadeUp} 
          className="font-aileron text-[14px] sm:text-[15px] md:text-[17px] leading-[1.7] text-[#2E4C38]/80 font-medium max-w-[280px] sm:max-w-md"
        >
          <strong className="text-[#1A2F24]">Software Engineer</strong> focusing on Frontend Development. Building digital experiences with React and TypeScript.
        </motion.p>
      </div>

      {/* 3. CTA BUTTON */}
      <motion.div 
        variants={itemFadeUp} 
        className="relative z-20 w-full max-w-5xl mx-auto mt-auto mb-4 flex justify-start"
      >
        <motion.button
          onClick={handleNavigate}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center gap-3 bg-[#1A2F24] text-[#F9F8F4] py-1.5 px-4 md:py-2 md:px-5 rounded-full shadow-[0_8px_20px_rgba(26,47,36,0.15)] hover:bg-[#4A6750] transition-colors duration-300 outline-none"
        >
          <span className="font-redhat text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase mt-[1px]">
            Explore More
          </span>
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#4A6750] transition-colors duration-300">
            <ArrowDown />
          </div>
        </motion.button>
      </motion.div>

      {/* 4. TECH MARQUEE */}
      <TechMarquee />

    </motion.div>
  );
};

export default HomePage;