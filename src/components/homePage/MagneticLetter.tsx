import { useRef } from 'react';
import type { ReactElement } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface MagneticLetterProps {
  char: string;
  variants: Variants;
  idleDelay: number;
}

/**
 * Single letter that's magnetically attracted toward the cursor when nearby,
 * layered on top of the existing typing-in + idle float animation.
 * Pulls back to 0 with a spring when the cursor leaves its radius.
 */
const MagneticLetter = ({ char, variants, idleDelay }: MagneticLetterProps): ReactElement => {
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 14, stiffness: 150, mass: 0.4 });
  const springY = useSpring(y, { damping: 14, stiffness: 150, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Pull strength tapers with distance from letter center
    const pullStrength = 0.35;
    x.set(distX * pullStrength);
    y.set(distY * pullStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span key={char} variants={variants} className="inline-block">
      <motion.span
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="inline-block origin-bottom"
      >
        <motion.span
          animate={{ y: -5, rotate: 1.5 }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 1.6,
            delay: idleDelay,
            ease: 'easeInOut',
          }}
          className="inline-block origin-bottom"
        >
          {char}
        </motion.span>
      </motion.span>
    </motion.span>
  );
};

export default MagneticLetter;
