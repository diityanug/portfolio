import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: 'easeInOut' }}
      className="w-full min-h-dvh"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;