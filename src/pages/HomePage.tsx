import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import catsAnimated from '../assets/cats2.svg';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

// ─── KOMPONEN EFEK TEKS MELAYANG & BERGELOMBANG (VERSI SELO & SANTAI) ─────────
const WavyText = ({ 
  text, 
  delayOffset = 0, 
  isWavy = false, 
  className = "" 
}: { 
  text: string, 
  delayOffset?: number, 
  isWavy?: boolean, 
  className?: string 
}) => {
  const letters = Array.from(text);
  
  return (
    <div className={`flex ${className}`}>
      {letters.map((letter, index) => {
        // Efek ngetik: huruf muncul bergantian di awal
        const typeDelay = delayOffset + index * 0.08;
        
        // Offset fase gelombang untuk tiap huruf biar efek ombaknya nyambung halus
        const wavePhase = (index * 0.1) + delayOffset; 

        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={
              !isWavy
                ? { 
                    opacity: 1, 
                    y: 0, 
                    x: 0, 
                    rotate: 0, 
                    skewX: 0, 
                    scale: 1 
                  } // Mode normal: Diam rapi
                : {
                    opacity: 1,
                    y: [0, -3, 0, 2, 0],         // Ayunan vertikal sangat tipis
                    x: [0, 2, -1, 1, 0],         // Ayunan horizontal nyaris tak terlihat
                    rotate: [0, 1, -0.5, 0.5, 0], // Cuma miring dikiiiit banget
                    skewX: [0, -2, 1, -1, 0],    // Efek lentur sangat halus
                    scale: [1, 1.01, 0.99, 1.01, 1] // Nafas pelan
                  }
            }
            transition={
              !isWavy
                ? { 
                    // Saat hover tombol: Kembali ke posisi asli (damping dibesarin biar kalem berhentinya)
                    opacity: { duration: 0.2, delay: typeDelay },
                    default: { type: "spring", stiffness: 300, damping: 20, mass: 1 }
                  }
                : {
                    // Mode santai: Durasinya dipanjangin (8-11 detik) biar bergeraknya slow-motion
                    opacity: { duration: 0.2, delay: typeDelay },
                    y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: wavePhase },
                    x: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: wavePhase },
                    rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: wavePhase },
                    skewX: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: wavePhase },
                    scale: { duration: 11, repeat: Infinity, ease: 'easeInOut', delay: wavePhase },
                  }
            }
            className="inline-block whitespace-pre origin-bottom"
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────


const HomePage = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  
  // State HANYA untuk mendeteksi hover pada tombol "Get in touch"
  const [btnHovered, setBtnHovered] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  /* clock */
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

  /* weather */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current=temperature_2m,weathercode&timezone=Asia%2FJakarta'
        );
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weathercode as number;

        const description =
          code === 0  ? 'Clear' :
          code <= 3   ? 'Cloudy' :
          code <= 48  ? 'Foggy' :
          code <= 67  ? 'Rain' :
          code <= 77  ? 'Snow' :
          code <= 82  ? 'Heavy Rain' :
          'Storm';

        const icon =
          code === 0  ? '☀️' :
          code <= 3   ? '⛅' :
          code <= 48  ? '🌫️' :
          code <= 67  ? '🌧️' :
          code <= 77  ? '❄️' :
          code <= 82  ? '🌦️' :
          '⛈️';

        setWeather({ temp, description, icon });
      } catch {
        setWeather(null);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60_000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const lineGrowHorizontal: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
  };

  const ctaDelay = 0.82;

  // Teks melayang santai, diam saat tombol di-hover
  const isTextWavy = !btnHovered;

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
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
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

      {/* TOP EDGE LINE */}
      <motion.div
        variants={lineGrowHorizontal}
        className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.07] pointer-events-none"
      />

      {/* BOTTOM LEFT: LOCAL TIME + WEATHER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-8 md:left-16 flex flex-col gap-1 z-20 pointer-events-none"
      >
        <span className="font-poppins text-[9px] tracking-[0.25em] uppercase text-gray-400 font-medium">
          Local Time — Cibitung, ID
        </span>

        <div className="flex items-center gap-3">
          <span className="font-poppins text-[#2A2320] text-sm md:text-base font-medium tracking-wide">
            {formattedTime}
          </span>

          <span className="w-[1px] h-4 bg-black/10 flex-shrink-0" />

          {weather ? (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5"
            >
              <span className="text-sm leading-none">{weather.icon}</span>
              <span className="font-poppins text-[#2A2320] text-sm md:text-base font-medium tracking-wide">
                {weather.temp}°C
              </span>
              <span className="font-poppins text-xs text-gray-400 font-light tracking-wide">
                · {weather.description}
              </span>
            </motion.div>
          ) : (
            <span className="font-poppins text-xs text-gray-300 tracking-wide animate-pulse">
              — °C
            </span>
          )}
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10">

        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start justify-center w-full lg:w-[45%] relative pt-4 lg:pt-0 pointer-events-none">
          <div className="pointer-events-auto w-full">
            <motion.div variants={fadeUp} className="mb-3 md:mb-4">
              <span className="font-poppins text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
                Hello, I'm
              </span>
            </motion.div>

            {/* ANIMATED NAME WRAPPER */}
            <motion.div variants={fadeUp} className="mb-5 md:mb-6 w-fit">
              <h1 className="select-none cursor-default font-lejour font-normal text-5xl md:text-[80px] lg:text-[96px] leading-[0.9] tracking-tight text-[#2A2320] flex flex-col">
                <div className="pb-1 md:pb-2">
                  <WavyText text="Aditya" isWavy={isTextWavy} delayOffset={0} />
                </div>
                <div className="text-[#5E7657]">
                  <WavyText text="Nugraha" isWavy={isTextWavy} delayOffset={0.4} />
                </div>
              </h1>
            </motion.div>

            <motion.div
              variants={lineGrowHorizontal}
              className="w-16 md:w-32 h-[1px] bg-[#5E7657] mb-6 md:mb-8"
            />

            <motion.p
              variants={fadeUp}
              className="font-poppins text-sm md:text-base lg:text-lg leading-relaxed text-gray-400 font-light max-w-[600px]"
            >
              Software Engineer focused on frontend development, with an interest in machine learning and automation.
            </motion.p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-[40%] relative mt-2 lg:mt-0 gap-16 pointer-events-none lg:mr-12">

          {/* CURRENT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px] rounded-[32px] bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] pointer-events-auto overflow-hidden"
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

          {/* CTA */}
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
              className="w-fit lg:w-auto relative z-10"
            >
              <motion.button
                onClick={() => navigate('/about')}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setBtnHovered(true)} // Menghentikan teks melayang
                onMouseLeave={() => setBtnHovered(false)} // Mengaktifkan kembali teks melayang
                className="flex items-center justify-center gap-3 lg:gap-4 bg-[#2A2320] text-white w-fit lg:w-auto px-6 py-3 lg:px-8 lg:py-4 rounded-full hover:bg-[#5E7657] transition-colors duration-300 shadow-xl backdrop-blur-sm"
              >
                <span className="font-poppins text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Get in touch
                </span>
                <span className="bg-white/10 p-2 md:p-2.5 rounded-full transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="w-3.5 h-3.5 lg:w-4 lg:h-4"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
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