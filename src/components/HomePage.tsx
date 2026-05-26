import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from './Typewriter';

// Pastikan file cats2.svg sudah kamu taruh di dalam folder src/assets/
import cats2 from '../assets/cats2.svg';

const HomePage = () => {
  const navigate = useNavigate();

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const lineGrow: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      // KUNCI NO-SCROLL: h-[calc(100vh-116px)] dan overflow-hidden, dipadu flex items-center
      className="w-full px-8 md:px-16 bg-white h-[calc(100vh-116px)] overflow-hidden flex items-center relative z-0"
    >
      
      {/* Background Aksen Casual (Soft Blur) agar putihnya tidak terlalu mati */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-gray-50/80 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* ================= LEFT: CLEAN TYPOGRAPHY ================= */}
        <div className="flex flex-col items-start justify-center w-full lg:w-1/2">
          
          {/* Sapaan Halus (Pengganti teks dobel) */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="font-poppins text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 font-medium">
              Hello, I'm
            </span>
          </motion.div>

          {/* Headline Nama (Ukuran Proporsional, tidak aneh) */}
          <motion.h1 
            variants={fadeUp} 
            className="font-lejour font-normal text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight text-[#2A2320] mb-6 md:mb-8"
          >
            <div className="pb-1 md:pb-2"><Typewriter text="Aditya" /></div>
            <div className="text-[#5E7657]"><Typewriter text="Nugraha" delay={0.5} /></div>
          </motion.h1>
          
          {/* Garis Aksen Kecil Pembatas */}
          <motion.div variants={lineGrow} className="w-20 md:w-24 h-[2px] bg-black/10 mb-6 md:mb-8" />
          
          {/* Deskripsi */}
          <motion.p 
            variants={fadeUp} 
            className="font-poppins text-base md:text-lg leading-relaxed text-gray-500 font-light max-w-md"
          >
            <Typewriter text="Software Engineer • Frontend Developer • Machine Learning" delay={1.2} />
          </motion.p>
          
        </div>

        {/* ================= RIGHT: THE CAT & CTA ================= */}
        <div className="flex flex-col items-center lg:items-end justify-center w-full lg:w-1/2 relative mt-8 lg:mt-0">
          
          <div className="flex flex-col items-center lg:items-end relative">
            
            {/* Animasi Kucing: Duduk nyantai di atas garis */}
            <motion.img 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
              src={cats2} 
              alt="Cat" 
              draggable={false}
              className="w-24 md:w-32 relative z-10 -mb-[1px] object-contain select-none pointer-events-none drop-shadow-sm lg:mr-4" 
            />

            {/* Garis Meja/Pijakan Kucing */}
            <motion.div 
              variants={lineGrow} 
              className="w-64 md:w-80 lg:w-96 h-[2px] bg-gradient-to-r from-transparent via-black/10 to-black/20 relative z-0" 
            />

            {/* Tombol CTA */}
            <motion.div variants={fadeUp} className="mt-8 md:mt-10 lg:mr-2">
              <motion.button 
                onClick={() => navigate('/about')}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 bg-[#2A2320] text-white px-8 py-4 rounded-full hover:bg-[#5E7657] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <span className="font-poppins text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Get in touch
                </span>
                <span className="bg-white/10 p-2 md:p-2.5 rounded-full group-hover:bg-white/20 group-hover:translate-x-1 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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