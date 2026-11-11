import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ScrollFillHeadingProps {
  id: string;
  line1: string;
  line2: string;
  className?: string;
}

/**
 * Two-line display heading with scroll-driven horizontal wipe fill.
 * Follows Cal.com DESIGN.md:
 * - Weight 600 (display-xl), tight negative tracking (-0.035em)
 * - Unfilled base: #e5e7eb (hairline)
 * - Line 1 fill: #111111 (ink)
 * - Line 2 fill: #6b7280 (muted)
 */
const ScrollFillHeading = ({
  id,
  line1,
  line2,
  className = '',
}: ScrollFillHeadingProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.9', 'start 0.35'],
  });

  const clipLine1 = useTransform(scrollYProgress, [0, 0.55], [
    'inset(-10% 100% -10% 0)',
    'inset(-10% 0% -10% 0)',
  ]);

  const clipLine2 = useTransform(scrollYProgress, [0.3, 1], [
    'inset(-10% 100% -10% 0)',
    'inset(-10% 0% -10% 0)',
  ]);

  return (
    <h2
      ref={headingRef}
      id={id}
      className={`text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.06] select-none ${className}`}
    >
      {/* Line 1 */}
      <span className="relative block w-fit">
        <span aria-hidden="true" className="block text-[#e5e7eb]">
          {line1}
        </span>
        <motion.span
          style={shouldReduce ? undefined : { clipPath: clipLine1 }}
          aria-hidden="true"
          className="absolute inset-0 block text-[#111111] will-change-[clip-path]"
        >
          {line1}
        </motion.span>
        <span className="sr-only">{line1} </span>
      </span>

      {/* Line 2 */}
      <span className="relative block w-fit">
        <span aria-hidden="true" className="block text-[#e5e7eb]">
          {line2}
        </span>
        <motion.span
          style={shouldReduce ? undefined : { clipPath: clipLine2 }}
          aria-hidden="true"
          className="absolute inset-0 block text-[#6b7280] will-change-[clip-path]"
        >
          {line2}
        </motion.span>
        <span className="sr-only">{line2}</span>
      </span>
    </h2>
  );
};

export default ScrollFillHeading;
