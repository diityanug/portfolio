// --- Custom Easing Physics ---
export const EASE_HEAVY = [0.32, 0.72, 0, 1] as const;
export const TRANSITION = { duration: 0.9, ease: EASE_HEAVY };

export const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: TRANSITION }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: TRANSITION }
};
