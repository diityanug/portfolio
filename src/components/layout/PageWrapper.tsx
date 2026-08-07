import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full min-h-screen" 
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;