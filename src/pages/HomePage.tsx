import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import catsAnimated from '../assets/cats2.svg';

// ==========================================
// MAIN HOMEPAGE COMPONENT
// ==========================================
const HomePage = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // ==========================================
  // ANIMATION VARIANTS
  // ==========================================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lineGrowHorizontal: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const ctaDelay = 0.82;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full px-8 md:px-16 bg-white min-h-[calc(100vh-116px)] lg:h-[calc(100vh-116px)] overflow-x-hidden overflow-y-auto lg:overflow-hidden flex items-start lg:items-center relative z-0 pt-12 pb-24 lg:py-0"
    >
      {/* BACKGROUND TEXTURES */}
      <div
        className="absolute inset-0 pointer-events-none -z-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage:
            'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 30%, transparent 80%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-gray-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* STRUCTURAL GEOMETRIC LINES */}
      <motion.div
        variants={lineGrowHorizontal}
        className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.07] pointer-events-none"
      />

      {/* ========================================== */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ========================================== */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start justify-center w-full lg:w-[45%] relative pt-4 lg:pt-0 pointer-events-none">
          <div className="pointer-events-auto w-full">
            <motion.div variants={fadeUp} className="mb-3 md:mb-4">
              <span className="font-poppins text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
                Hello, I'm
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="select-none font-lejour font-normal text-5xl md:text-[80px] lg:text-[96px] leading-[0.9] tracking-tight text-[#2A2320] mb-5 md:mb-6"
            >
              <div className="pb-1 md:pb-2">
                <Typewriter text="Aditya" />
              </div>

              <div className="text-[#5E7657]">
                <Typewriter text="Nugraha" delay={0.5} />
              </div>
            </motion.h1>

            <motion.div
              variants={lineGrowHorizontal}
              className="w-16 md:w-32 h-[1px] bg-[#5E7657] mb-6 md:mb-8"
            />

            {/* DESCRIPTION PARAGRAPH */}
            <motion.p
              variants={fadeUp}
              className="font-poppins text-sm md:text-base lg:text-lg leading-relaxed text-gray-400 font-light max-w-[600px] mb-8"
            >
              Frontend Developer with a strong interest in machine learning and intelligent systems.
            </motion.p>

            {/* ROLE TAGS (PILLS) */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 md:gap-4 mb-10">
              {['Software Engineer', 'Frontend Developer', 'Machine Learning'].map((role) => (
                <div
                  key={role}
                  className="px-5 py-2.5 rounded-full border border-black/[0.06] bg-black/[0.01]"
                >
                  <span className="font-poppins text-xs md:text-sm text-gray-500 font-light">
                    {role}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* AVAILABILITY INDICATOR */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5E7657] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5E7657]"></span>
                </span>
                <span className="font-poppins text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mt-[1px]">
                  Available
                </span>
              </div>

              <div className="w-[1px] h-4 bg-black/[0.15]" />

              <div className="flex items-center gap-2 font-poppins text-[10px] md:text-xs text-gray-400">
                <span className="tracking-widest uppercase">Cibitung, ID</span>
                <span className="font-telegraf text-[#2A2320] font-medium tracking-wide">
                  {formattedTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN (MISSION CARD & CTA AREA) */}
        <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-[40%] relative mt-2 lg:mt-0 gap-16 pointer-events-none lg:mr-12">
          
          {/* CURRENT MISSION CARD (PREMIUM GLASSMORPHIC) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px] rounded-[32px] bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] pointer-events-auto overflow-hidden"
          >
            {/* MAIN CONTENT AREA */}
            <div className="p-7 md:p-8">
              {/* STATUS HEADER */}
              <div className="mb-6">
                <span className="font-poppins text-[10px] tracking-[0.25em] uppercase text-gray-400 font-semibold">
                  Internal Project – In Progress
                </span>
              </div>

              {/* TITLE & DESCRIPTION */}
            <h3 
              className="text-xl md:text-[22px] text-black leading-snug mb-3 tracking-wide"
              style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}
            >
              Enterprise HRIS & LMS
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                Developing an HRIS system with role-based navigation and maintaining an LMS system focused on bug fixes and stability improvements.
              </p>

              {/* TECH STACK PILLS */}
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'AWS S3'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-black/[0.04] bg-white/80 text-[10px] md:text-[11px] font-poppins text-[#2A2320] font-medium shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* WIDGET FOOTER (METADATA) */}
            <div className="bg-black/[0.02] border-t border-black/[0.04] px-7 py-5 md:px-8 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-poppins tracking-[0.2em] uppercase text-gray-400 mb-1">
                  Company
                </span>
                <span 
                  className="text-xs font-medium text-black tracking-wide"
                  style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}
                >
                  LG Sinarmas
                  </span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[9px] font-poppins tracking-[0.2em] uppercase text-gray-400 mb-1">
                  Role
                </span>
                <span 
                  className="text-xs font-medium text-black tracking-wide"
                  style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}
                >
                  Software Engineer
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA GROUP RESPONSIVE */}
          <div className="flex flex-col items-center lg:items-end z-20 pointer-events-auto w-full max-w-[460px] relative">
            <motion.img
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ctaDelay, duration: 0.5, ease: 'easeOut' }}
              src={catsAnimated}
              alt="Cat"
              draggable={false}
              className="w-16 md:w-20 lg:w-20 relative z-0 -mb-[20px] lg:-mb-[22px] mr-6 lg:mr-8 object-contain select-none pointer-events-none drop-shadow-sm"
              style={{
                filter: btnHovered
                  ? 'invert(40%) sepia(30%) saturate(400%) hue-rotate(70deg) brightness(85%)'
                  : 'none',
                transition: 'filter 0.3s ease',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ctaDelay, duration: 0.5, ease: 'easeOut' }}
              className="w-full lg:w-auto relative z-10" 
            >
              <motion.button
                onClick={() => navigate('/about')}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                className="flex items-center justify-center gap-3 lg:gap-4 bg-[#2A2320] text-white w-full lg:w-auto px-6 py-3 lg:px-8 lg:py-4 rounded-full hover:bg-[#5E7657] transition-colors duration-300 shadow-xl backdrop-blur-sm"
              >
                <span className="font-poppins text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Get in touch
                </span>

                <span className="bg-white/10 p-2 md:p-2.5 rounded-full transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;