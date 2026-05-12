import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState, type FC } from 'react';

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
}

const Typewriter: FC<TypewriterProps> = ({ text, className, delay = 0 }) => {
  const [key, setKey] = useState(0);
  // State baru untuk mendeteksi apakah pengetikan sudah selesai
  const [isTyped, setIsTyped] = useState(false);

  // Fungsi Restart saat klik: Reset status isTyped juga
  const handleClick = () => {
    setIsTyped(false); 
    setKey(prev => prev + 1);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { display: 'none' },
    visible: { display: 'inline' },
  };

  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 0, 1, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "linear",
      },
    },
    // Variant baru: Kursor menghilang sepenuhnya
    hidden: {
      opacity: 0,
      display: 'none',
      transition: { duration: 0 } 
    }
  };

  return (
    <motion.span
      key={key}
      className={`${className} cursor-pointer inline-flex items-baseline whitespace-pre`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={handleClick}
      // PENTING: Event ini trigger saat animasi stagger selesai
      onAnimationComplete={() => setIsTyped(true)}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      
      {/* Kursor Horizontal di Bawah Teks */}
      <motion.span
        variants={cursorVariants}
        // Pilih variant: kedip jika belum beres, sembunyikan jika sudah beres
        animate={isTyped ? "hidden" : "blinking"}
        // Perubahan style: horizontal bar di bawah (w > h dan translate-y)
        className="inline-block w-[0.8ch] h-[4px] bg-black ml-1 translate-y-[2px]"
      />
    </motion.span>
  );
};

export default Typewriter;