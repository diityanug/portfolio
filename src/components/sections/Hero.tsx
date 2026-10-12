import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import AnimatedCharacter from '../ui/AnimatedCharacter';
import JapaneseHoverText from '../ui/JapaneseHoverText';
import { TerminalWindow as Terminal, EnvelopeSimple } from '@phosphor-icons/react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

const GRID_STYLE = {
  backgroundImage:
    'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
  backgroundSize: '4rem 4rem',
} as const;

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/60';

const btnBase =
  'group flex w-full sm:w-auto items-center justify-between sm:justify-center gap-4 border px-8 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 motion-reduce:transition-none';

// Hero Section
const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const parallax = !reduce && isMd;

  return (
    <section
      ref={containerRef}
      id="home"
      aria-labelledby="hero-heading"
      className="bg-[#FAFAFA] pt-32 md:pt-40 pb-28 md:pb-40 px-4 relative overflow-hidden min-h-[90svh] flex items-center"
    >
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={GRID_STYLE}
      />

      {/* Mobile/tablet background character */}
      {!isLg && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10"
        >
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[110vw] max-w-130 scale-125">
            <AnimatedCharacter />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Typography */}
          <motion.div
            style={parallax ? { y: yText, opacity: opacityText } : undefined}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Heading */}
            <motion.h1
              id="hero-heading"
              aria-label="Hello, welcome."
              variants={fadeUp}
              tabIndex={0}
              onTouchStart={() => {}}
              className={`text-[min(14vw,68px)] sm:text-[70px] md:text-[84px] lg:text-[104px] font-bold text-ink leading-[0.95] tracking-[-0.03em] mb-8 uppercase select-none rounded-lg ${focusRing}`}
            >
              <JapaneseHoverText
                japanese="こんにちは、"
                english="HELLO,"
                interval={3500}
                className="w-full"
                jpClassName="text-ink tracking-tight font-extrabold"
                enClassName="text-ink font-extrabold tracking-[-0.04em]"
              />
              <br />
              <JapaneseHoverText
                japanese="ようこそ。"
                english="WELCOME."
                interval={3500}
                offset={700}
                className="w-full"
                jpClassName="text-transparent [-webkit-text-stroke:2px_#1a1a1a] tracking-tight font-extrabold"
                enClassName="text-transparent [-webkit-text-stroke:2px_#1a1a1a] font-extrabold tracking-[-0.04em]"
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl text-steel max-w-lg mb-10 font-medium leading-[1.7]"
            >
              I’m Aditya, a Frontend Developer passionate about building engaging web and mobile
              interfaces while exploring new technologies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className={`${btnBase} bg-ink text-white border-ink hover:bg-white hover:text-ink ${focusRing}`}
              >
                <span>View Projects</span>
                <Terminal
                  size={18}
                  aria-hidden
                  className="transition-transform motion-reduce:transition-none group-hover:rotate-12"
                />
              </a>
              <a
                href="#contact"
                className={`${btnBase} bg-transparent text-ink border-black/10 hover:bg-ink hover:text-white hover:border-ink ${focusRing}`}
              >
                <span>Contact Me</span>
                <EnvelopeSimple size={18} aria-hidden />
              </a>
            </motion.div>
          </motion.div>

          {isLg && (
            <motion.div
              aria-hidden="true"
              variants={fadeUp}
              className="lg:col-span-5 flex justify-center items-center relative"
            >
              <AnimatedCharacter />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;