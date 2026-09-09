import { useCallback, useRef } from 'react';
import type { ReactElement } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Logo from "../assets/logo-iddle.svg";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const CodeIcon = (): ReactElement => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const GitBranchIcon = (): ReactElement => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const TerminalIcon = (): ReactElement => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const LayersIcon = (): ReactElement => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const HeroIllustration = (): ReactElement => {
  const prefersReducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef);
  const shouldAnimate = !prefersReducedMotion && isInView;

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: smoothEase } }
  };

  const floatAnim = (delay: number) =>
    !shouldAnimate
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay } as const
        };

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="w-full h-full"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.12, delayChildren: 0.5 }}
    >
      <motion.ellipse
        cx="200" cy="200" rx="165" ry="105" fill="none" stroke="#4A6750" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4"
        style={{ transformOrigin: '200px 200px' }}
        animate={shouldAnimate ? { rotate: [0, 360] } : undefined}
        transition={shouldAnimate ? { duration: 45, repeat: Infinity, repeatType: 'loop', ease: 'linear' } as const : undefined}
      />
      <motion.ellipse
        cx="200" cy="200" rx="140" ry="90" fill="none" stroke="#1A2F24" strokeWidth="1.5" opacity="0.15"
        style={{ transformOrigin: '200px 200px' }}
        animate={shouldAnimate ? { rotate: [0, -360] } : undefined}
        transition={shouldAnimate ? { duration: 55, repeat: Infinity, repeatType: 'loop', ease: 'linear' } as const : undefined}
      />

      <g transform="rotate(-6 200 200)">
        <rect x="110" y="145" width="180" height="120" rx="10" fill="#1A2F24" />
        <circle cx="128" cy="163" r="3" fill="#F9F8F4" opacity="0.5" />
        <circle cx="140" cy="163" r="3" fill="#F9F8F4" opacity="0.5" />
        <circle cx="152" cy="163" r="3" fill="#F9F8F4" opacity="0.5" />
        <g transform="translate(178, 190)" stroke="#F9F8F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="15 5 24 22 15 39" />
          <polyline points="9 5 0 22 9 39" />
        </g>
      </g>

      <motion.g variants={badgeVariants}>
        <motion.g {...floatAnim(0)}>
          <circle cx="325" cy="105" r="26" fill="#E0BA5C" />
          <g transform="translate(313, 93)" color="#412402">
            <CodeIcon />
          </g>
        </motion.g>
      </motion.g>

      <motion.g variants={badgeVariants}>
        <motion.g {...floatAnim(0.4)}>
          <circle cx="345" cy="195" r="23" fill="#1A2F24" />
          <g transform="translate(333, 183)" color="#F9F8F4">
            <TerminalIcon />
          </g>
        </motion.g>
      </motion.g>

      <motion.g variants={badgeVariants}>
        <motion.g {...floatAnim(0.8)}>
          <circle cx="315" cy="285" r="25" fill="#4A6750" />
          <g transform="translate(303, 273)" color="#F9F8F4">
            <GitBranchIcon />
          </g>
        </motion.g>
      </motion.g>

      <motion.g variants={badgeVariants}>
        <motion.g {...floatAnim(1.2)}>
          <circle cx="80" cy="245" r="21" fill="#F9F8F4" stroke="#1A2F24" strokeWidth="1.5" opacity="0.9" />
          <g transform="translate(68, 233)" color="#1A2F24">
            <LayersIcon />
          </g>
        </motion.g>
      </motion.g>

      <motion.g variants={badgeVariants}>
        <motion.circle
          cx="72" cy="120" r="7" fill="#E0BA5C"
          style={{ transformOrigin: '72px 120px' }}
          animate={shouldAnimate ? { scale: [1, 1.3, 1], opacity: [1, 0.55, 1] } : undefined}
          transition={shouldAnimate ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 } : undefined}
        />
      </motion.g>

      <motion.path
        d="M92 300 L98 312 L110 315 L98 318 L92 330 L86 318 L74 315 L86 312 Z"
        fill="#1A2F24"
        style={{ transformOrigin: '92px 315px' }}
        animate={shouldAnimate ? { scale: [1, 1.25, 1], rotate: [0, 15, 0] } : undefined}
        transition={shouldAnimate ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 } : undefined}
      />
    </motion.svg>
  );
};

const HomePage = (): ReactElement => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: smoothEase } }
  };

  const textReveal: Variants = {
    hidden: { y: prefersReducedMotion ? "0%" : "100%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 1, ease: smoothEase } }
  };

  const handleTalkClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/', { state: { targetSection: 'contact' } });
    e.currentTarget.blur();
  }, [navigate]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full min-h-[100svh] bg-[#F9F8F4] overflow-x-clip flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-6 pb-12 md:py-20 lg:py-24"
    >
      <div className="flex-1 flex flex-col-reverse lg:flex-row items-center justify-center gap-6 lg:gap-12 max-w-7xl w-full mx-auto my-auto">
        
        <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:max-w-xl">
          <h1 className="mb-8 select-none flex flex-col items-center lg:items-start">
            <div className="overflow-hidden pb-1">
              <motion.span variants={textReveal} className="block font-autour text-[32px] sm:text-[54px] lg:text-[64px] leading-[1.1] tracking-tight text-[#1A2F24]">
                Hello There ~
              </motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span variants={textReveal} className="block font-autour text-[22px] sm:text-[54px] lg:text-[64px] leading-normal tracking-tight text-[#4A6750]">
                i'm Aditya Nugraha
              </motion.span>
            </div>
          </h1>

          <motion.p
            variants={itemFadeUp}
            className="font-karla text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-[#2E4C38]/80 font-normal mb-10 max-w-md lg:max-w-lg"
          >
            a Software Engineer focused on frontend development, helping turn products into fast, polished experiences built with React and TypeScript.
          </motion.p>

          <motion.div variants={itemFadeUp}>
            <motion.button
              onClick={handleTalkClick}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              aria-label="Scroll to Contact section"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#1A2F24] shadow-[0_8px_20px_rgba(26,47,36,0.15)] hover:bg-[#4A6750] transition-colors duration-300 outline-none"
            >
              <img
                src={Logo}
                alt=""
                className="h-6 md:h-7 w-auto invert brightness-0 transition-transform duration-300 group-hover:-rotate-12"
              />
              <span className="font-karla text-[13px] font-bold tracking-[0.2em] uppercase text-[#F9F8F4] mt-[1px]">
                Let's talk
              </span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          variants={itemFadeUp}
          className="flex-1 flex justify-center w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[600px]"
        >
          <HeroIllustration />
        </motion.div>
      </div>

      <motion.div
        variants={itemFadeUp}
        className="w-full max-w-[200px] md:max-w-[300px] mx-auto mt-12 lg:mt-20 pt-6 border-t border-[#1A2F24]/10 flex justify-center items-center"
      >
      </motion.div>
    </motion.div>
  );
};

export default HomePage;