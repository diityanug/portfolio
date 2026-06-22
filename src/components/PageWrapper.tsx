import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      // Hapus semua pt-*, biarkan min-h-screen saja agar mentok atas
      className="w-full min-h-screen" 
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;