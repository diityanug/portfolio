import type { Variants } from 'framer-motion';

const customEase = [0.22, 1, 0.36, 1] as const;

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  // Memberikan efek fade-down global untuk transisi pindah halaman
  exit: { opacity: 0, y: 30, transition: { duration: 0.3, ease: 'easeOut' } }
};

// Tambahan Pop-up Variants
export const popUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 200, damping: 15 } 
  },
  // Item ikut turun dan mengecil sedikit saat keluar
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const fadeUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: customEase } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const lineGrowVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: customEase } },
  exit: { scaleX: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const revealImageVariants: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1, ease: customEase } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const revealRightVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 0.7, ease: customEase } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};