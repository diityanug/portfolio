import { useCallback, type ReactElement } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Logo from "../assets/logo-iddle.svg";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }
};

const HomePage = (): ReactElement => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const dynamicFadeUp = {
    ...itemFadeUp,
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
  };

  const handleTalkClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/', { state: { targetSection: 'contact' } });
    e.currentTarget.blur();
  }, [navigate]);

  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative w-full min-h-[100svh] text-[#1c1c1c] overflow-x-clip flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-28 pb-16"
    >
      {/* Ambient Warm Glow */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent_70%)]"
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-12 lg:gap-16">
        
        {/* 2D Sketchy Illustration */}
        <motion.div 
          variants={dynamicFadeUp}
          className="relative flex items-center justify-center w-full max-w-[320px] h-[240px] text-[#1c1c1c]/80"
        >
          <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Wobbly Laptop Screen */}
            <motion.path d="M 40 50 C 120 48 200 52 280 49 C 283 100 278 150 281 190 C 200 192 120 188 39 191 C 37 150 42 100 40 50 Z" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} />
            {/* Overlay scratch line for screen */}
            <motion.path d="M 38 52 C 115 50 205 48 282 50 C 279 105 282 145 279 192 C 195 189 115 192 41 189 C 40 145 37 105 38 52 Z" 
              strokeWidth="1" strokeOpacity="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} />
              
            {/* Wobbly Keyboard Base */}
            <motion.path d="M 10 190 C 110 193 210 190 310 192 C 315 205 312 215 300 220 C 210 222 110 218 20 220 C 8 215 5 205 10 190 Z"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} />
            <motion.path d="M 8 192 C 105 190 215 192 312 190 C 310 202 315 212 298 218 C 205 220 115 222 22 218 C 10 212 7 202 8 192 Z"
              strokeWidth="1" strokeOpacity="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }} />

            {/* Cute Face on Screen */}
            <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.5 }}>
              {/* Left Eye Blinking */}
              <motion.ellipse cx="120" cy="110" rx="6" ry="6" fill="currentColor" stroke="none"
                animate={{ ry: [6, 0.5, 6] }} transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5 }} />
              {/* Right Eye Blinking */}
              <motion.ellipse cx="200" cy="110" rx="6" ry="6" fill="currentColor" stroke="none"
                animate={{ ry: [6, 0.5, 6] }} transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5 }} />
              
              {/* Wobbly Smile */}
              <motion.path d="M 140 135 C 150 150 170 150 180 135" />
              {/* Cheek blushes */}
              <ellipse cx="100" cy="125" rx="8" ry="4" fill="currentColor" fillOpacity="0.1" stroke="none" />
              <ellipse cx="220" cy="125" rx="8" ry="4" fill="currentColor" fillOpacity="0.1" stroke="none" />
            </motion.g>

            {/* Sketchy floating code brackets */}
            <motion.path d="M 80 80 L 60 100 L 80 120" strokeWidth="2" strokeOpacity="0.6"
              initial={{ pathLength: 0, x: 0 }} animate={{ pathLength: 1, x: [-2, 2, -2] }} transition={{ pathLength: { duration: 1, delay: 2 }, x: { duration: 4, repeat: Infinity, ease: "linear" } }} />
            <motion.path d="M 240 80 L 260 100 L 240 120" strokeWidth="2" strokeOpacity="0.6"
              initial={{ pathLength: 0, x: 0 }} animate={{ pathLength: 1, x: [2, -2, 2] }} transition={{ pathLength: { duration: 1, delay: 2.2 }, x: { duration: 4, repeat: Infinity, ease: "linear" } }} />
            <motion.path d="M 170 160 L 150 160" strokeWidth="2" strokeOpacity="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 2.5 }} />
              
            {/* Floating Sparkles */}
            <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5 }}>
              <motion.path d="M 270 20 Q 275 35 290 40 Q 275 45 270 60 Q 265 45 250 40 Q 265 35 270 20 Z" fill="currentColor" stroke="none" 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.path d="M 50 10 Q 52 20 62 22 Q 52 24 50 34 Q 48 24 38 22 Q 48 20 50 10 Z" fill="currentColor" stroke="none" 
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
            </motion.g>
          </svg>
        </motion.div>

        {/* Text & CTA */}
        <div className="flex flex-col items-center text-center gap-6">
          <motion.h1 
            variants={dynamicFadeUp}
            className="font-sans text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-[#1c1c1c] leading-[1.05]"
          >
            Hello There ~
            <br />
            <span className="text-[#1c1c1c]/40 font-medium">i'm</span>
            <br />
            <span className="text-[#1c1c1c]/40 font-medium">Aditya Nugraha</span>
          </motion.h1>

          <motion.p
            variants={dynamicFadeUp}
            className="font-sans text-lg sm:text-xl text-[#5f5f5d] max-w-lg leading-relaxed"
          >
            a Software Engineer focused on frontend development, helping turn products into fast, polished experiences built with React and TypeScript.
          </motion.p>

          <motion.div variants={dynamicFadeUp} className="mt-2">
            <button
              onClick={handleTalkClick}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-[6px] bg-[#1c1c1c] text-[#fcfbf8] hover:opacity-80 active:opacity-80 focus:ring-4 focus:ring-black/10 transition-all font-sans text-[16px] font-normal outline-none cursor-pointer shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]"
            >
              <span>Get started with me</span>
              <img
                src={Logo}
                alt=""
                className="h-4 w-auto brightness-0 invert opacity-90 transition-transform duration-300 group-hover:rotate-12"
              />
            </button>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};

export default HomePage;