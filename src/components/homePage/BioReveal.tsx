import { useState } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeywordProps {
  word: string;
  note: string;
}

/**
 * Inline keyword that reveals a small floating annotation on hover.
 * Underline animates in, tooltip pops above the word.
 */
const Keyword = ({ word, note }: KeywordProps): ReactElement => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="relative">
        {word}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-[#2E4C38]"
        />
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#1A2F24] text-[#F9F8F4] font-['Red_Hat_Display'] text-[10px] tracking-[0.1em] uppercase font-bold shadow-md pointer-events-none z-30"
          >
            {note}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

/**
 * Bio paragraph with selected keywords swapped for hoverable annotations.
 * Keeps the original sentence flow and typography intact.
 */
const BioReveal = (): ReactElement => {
  return (
    <>
      Software Engineer focused on{' '}
      <Keyword word="frontend development" note="React · TypeScript" />, with an
      interest in{' '}
      <Keyword word="machine learning" note="Always exploring" /> and{' '}
      <Keyword word="automation" note="Less repetition, more flow" />.
    </>
  );
};

export default BioReveal;
