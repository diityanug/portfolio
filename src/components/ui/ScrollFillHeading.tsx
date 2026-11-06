import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ScrollFillHeadingProps {
  id?: string;
  line1: string;
  line2: string;
  className?: string;
}

export const ScrollFillHeading = ({
  id,
  line1,
  line2,
  className = 'text-[36px] sm:text-[48px] md:text-[64px] font-bold tracking-[-0.03em] leading-none uppercase',
}: ScrollFillHeadingProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const shouldReduce = useReducedMotion();

  // Tracks scroll progress as heading enters from bottom (92%) to upper-middle (52%) of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'start 0.52'],
  });

  // Staggered fill: Line 1 sweeps left-to-right first, followed smoothly by Line 2
  const clip1 = useTransform(scrollYProgress, [0, 0.6], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const clip2 = useTransform(scrollYProgress, [0.38, 0.98], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <h2 ref={containerRef} id={id} className={`${className} select-none`}>
      {/* Line 1 */}
      <span className="relative block w-fit">
        {/* Gray / Muted Base */}
        <span aria-hidden="true" className="text-black/20 transition-colors duration-200">
          {line1}
        </span>
        {/* Black Solid Fill Overlay */}
        <motion.span
          style={shouldReduce ? undefined : { clipPath: clip1 }}
          aria-hidden="true"
          className="absolute inset-0 text-ink will-change-[clip-path]"
        >
          {line1}
        </motion.span>
      </span>

      {/* Line 2 */}
      <span className="relative block w-fit mt-1">
        {/* Gray / Muted Base */}
        <span aria-hidden="true" className="text-black/20 transition-colors duration-200">
          {line2}
        </span>
        {/* Black Solid Fill Overlay */}
        <motion.span
          style={shouldReduce ? undefined : { clipPath: clip2 }}
          aria-hidden="true"
          className="absolute inset-0 text-ink will-change-[clip-path]"
        >
          {line2}
        </motion.span>
      </span>

      {/* Accessible screen reader announcement */}
      <span className="sr-only">{`${line1} ${line2}`}</span>
    </h2>
  );
};

export default ScrollFillHeading;
