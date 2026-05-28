import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import catsAnimated from '../assets/cats2.svg';

// MAIN HOMEPAGE COMPONENT
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

  const lineGrowVertical: Variants = {
    hidden: { scaleY: 0, originY: 0 },
    show: {
      scaleY: 1,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  };

  const ctaDelay = 0.82;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full px-8 md:px-16 bg-white min-h-[calc(100vh-116px)] lg:h-[calc(100vh-116px)] overflow-x-hidden overflow-y-auto lg:overflow-hidden flex items-start lg:items-center relative z-0 pt-10 pb-36 lg:py-0 lg:pb-0"
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

      <motion.div
        variants={lineGrowVertical}
        className="hidden lg:block absolute top-0 left-16 w-[1px] h-full bg-black/[0.07] pointer-events-none"
      />

      <motion.div
        variants={lineGrowVertical}
        className="hidden lg:block absolute top-0 right-16 w-[1px] h-full bg-black/[0.07] pointer-events-none"
      />

      {/* MAIN CONTENT */}
      <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-8 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col items-start justify-center w-full lg:w-1/2 relative pt-4 lg:pt-0 pointer-events-none">
          <div className="pointer-events-auto">
            <motion.div variants={fadeUp} className="mb-3 md:mb-4">
              <span className="font-poppins text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
                Hello, I'm
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="select-none font-lejour font-normal text-5xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight text-[#2A2320] mb-5 md:mb-8"
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
              className="w-16 md:w-24 h-[1px] bg-[#5E7657] mb-4 md:mb-8"
            />

            <div className="font-poppins text-sm md:text-base lg:text-lg leading-relaxed text-gray-500 font-light flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-3">
              <motion.div variants={fadeUp} className="whitespace-nowrap">
                Software Engineer
              </motion.div>

              <motion.span
                variants={fadeUp}
                className="hidden md:inline text-gray-300"
              >
                •
              </motion.span>

              <motion.div variants={fadeUp} className="whitespace-nowrap">
                Frontend Developer
              </motion.div>

              <motion.span
                variants={fadeUp}
                className="hidden md:inline text-gray-300"
              >
                •
              </motion.span>

              <motion.div variants={fadeUp} className="whitespace-nowrap">
                Machine Learning
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-1/2 relative mt-2 lg:mt-0">
          {/* CTA mobile */}
          <div className="lg:hidden mt-2 mb-2">
            <div className="flex flex-col items-center pointer-events-auto">
              <motion.img
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: ctaDelay,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                src={catsAnimated}
                alt="Cat"
                draggable={false}
                className="w-16 relative z-0 -mb-[12px] object-contain select-none pointer-events-none drop-shadow-sm mr-6"
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
                transition={{
                  delay: ctaDelay,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
              >
                <motion.button
                  onClick={() => navigate('/about')}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  className="flex items-center gap-3 bg-[#2A2320] text-white px-6 py-3 rounded-full hover:bg-[#5E7657] transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="font-poppins text-xs tracking-[0.2em] uppercase font-medium">
                    Get in touch
                  </span>

                  <span className="bg-white/10 p-2 rounded-full transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
      </div>

      {/* CTA DESKTOP */}
      <div className="hidden lg:flex absolute bottom-28 right-28 flex-col items-end z-20 pointer-events-auto">
        <motion.img
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: ctaDelay,
            duration: 0.5,
            ease: 'easeOut',
          }}
          src={catsAnimated}
          alt="Cat"
          draggable={false}
          className="w-20 md:w-24 relative z-0 -mb-[15px] md:-mb-[23px] object-contain select-none pointer-events-none drop-shadow-sm mr-6 md:mr-8"
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
          transition={{
            delay: ctaDelay,
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          <motion.button
            onClick={() => navigate('/about')}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            className="flex items-center gap-4 bg-[#2A2320] text-white px-8 py-4 rounded-full hover:bg-[#5E7657] transition-colors duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
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
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* BOTTOM METRICS AREA */}
      <motion.div
        variants={lineGrowHorizontal}
        className="absolute bottom-[80px] lg:bottom-[75px] left-0 w-full h-[1px] bg-black/[0.07] pointer-events-none"
      />

      <div className="absolute bottom-6 lg:bottom-5 left-0 w-full px-8 md:px-24 lg:px-28 flex flex-row justify-between items-center z-20 pointer-events-none">
        <motion.div variants={fadeUp} className="flex items-center gap-2 md:gap-3">
          <span className="text-sm">👨‍💻</span>

          <div className="flex flex-col">
            <span className="font-poppins text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium">
              Current Focus
            </span>

            <span className="font-poppins text-[9px] md:text-xs text-[#2A2320] font-light">
              Enterprise HRIS & LMS
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5E7657] opacity-75"></span>

              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5E7657]"></span>
            </span>

            <span className="font-poppins text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-[#2A2320] font-medium mt-[1px]">
              Available
            </span>
          </div>

          <div className="w-[1px] h-3 md:h-4 bg-black/10" />

          <div className="flex items-center gap-1.5 md:gap-2 font-poppins text-[9px] md:text-xs text-gray-400">
            <span className="tracking-wider uppercase text-[8px] md:text-[10px]">
              Cibitung, ID
            </span>

            <span className="font-telegraf text-[#2A2320] font-light">
              {formattedTime}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;