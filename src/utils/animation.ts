import type { Variants } from 'framer-motion';

const customEase = [0.22, 1, 0.36, 1] as const;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const fadeUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: customEase } }
};

export const lineGrowVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: customEase } }
};

export const revealImageVariants: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1, ease: customEase } }
};

export const revealRightVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 0.7, ease: customEase } }
};