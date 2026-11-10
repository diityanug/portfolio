import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import AnimatedCharacter from '../ui/AnimatedCharacter';
import JapaneseHoverText from '../ui/JapaneseHoverText';
import { TerminalWindow as Terminal, EnvelopeSimple } from '@phosphor-icons/react';

const GRID_STYLE = {
  backgroundImage:
    'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
  backgroundSize: '4rem 4rem',
} as const;

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]';

const btnBase =
  'group flex w-full sm:w-auto items-center justify-between sm:justify-center gap-3.5 rounded-lg border px-6 py-3.5 sm:py-4 text-sm font-medium tracking-normal transition-colors duration-200 motion-reduce:transition-none';

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
      className="bg-[#ffffff] pt-32 md:pt-40 pb-28 md:pb-40 px-4 md:px-8 relative overflow-hidden min-h-[90svh] flex items-center"
    >
      {/* Subtle Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={GRID_STYLE}
      />

      {/* Mobile/tablet background character */}
      {!isLg && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-15"
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
            {/* Heading (weight 600 per Cal.com DESIGN.md) */}
            <motion.h1
              id="hero-heading"
              aria-label="Hello, welcome."
              variants={fadeUp}
              tabIndex={0}
              onTouchStart={() => {}}
              className={`text-[min(14vw,64px)] sm:text-[68px] md:text-[80px] lg:text-[96px] font-semibold text-[#111111] leading-[1.02] tracking-[-0.038em] mb-8 uppercase select-none rounded-lg ${focusRing}`}
            >
              <JapaneseHoverText
                japanese="こんにちは、"
                english="HELLO,"
                interval={3500}
                className="w-full"
                jpClassName="text-[#111111] tracking-tight font-semibold"
                enClassName="text-[#111111] font-semibold tracking-[-0.04em]"
              />
              <br />
              <JapaneseHoverText
                japanese="ようこそ。"
                english="WELCOME."
                interval={3500}
                offset={700}
                className="w-full"
                jpClassName="text-transparent [-webkit-text-stroke:1.5px_#111111] tracking-tight font-semibold"
                enClassName="text-transparent [-webkit-text-stroke:1.5px_#111111] font-semibold tracking-[-0.04em]"
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg md:text-[18px] text-[#374151] max-w-lg mb-10 font-normal leading-[1.6]"
            >
              I’m Aditya, a Frontend Developer passionate about building engaging web and mobile
              interfaces while exploring new technologies.
            </motion.p>

            {/* Monochrome Action Layer per Cal.com DESIGN.md */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-3.5 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className={`${btnBase} bg-[#111111] text-[#ffffff] border-[#111111] hover:bg-[#242424] hover:border-[#242424] ${focusRing}`}
              >
                <span>View Projects</span>
                <Terminal
                  size={17}
                  aria-hidden
                  className="transition-transform motion-reduce:transition-none group-hover:rotate-12"
                />
              </a>
              <a
                href="#contact"
                className={`${btnBase} bg-[#ffffff] text-[#111111] border-[#e5e7eb] hover:bg-[#f5f5f5] hover:border-[#d1d5db] ${focusRing}`}
              >
                <span>Contact Me</span>
                <EnvelopeSimple size={17} aria-hidden />
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
