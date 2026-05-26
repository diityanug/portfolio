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
  const [isTyped, setIsTyped] = useState(false);

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
      onAnimationComplete={() => setIsTyped(true)}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      
      <motion.span
        variants={cursorVariants}
        animate={isTyped ? "hidden" : "blinking"}
        className="inline-block w-[0.8ch] h-[4px] bg-black ml-1 translate-y-[2px]"
      />
    </motion.span>
  );
};

export default Typewriter;