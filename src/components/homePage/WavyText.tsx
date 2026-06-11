import { memo } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
interface WavyTextProps {
  readonly text: string;
  readonly delayOffset?: number;
  readonly isWavy?: boolean;
  readonly className?: string;
}

const revealTransition = {
  opacity: { duration: 0.4 },
  y: { type: 'spring' as const, stiffness: 300, damping: 20 },
};

const wavyCharStyle = `
  @keyframes wave-bounce {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-4px); }
  }

  .wavy-char {
    display: inline-block;
    white-space: pre;
    transform-origin: bottom;
    animation-name: wave-bounce;
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-delay: var(--wave-delay, 0s);
  }

  .wavy-char--stopped {
    animation: none;
    transform: translateY(0px);
    transition: transform 0.3s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .wavy-char,
    .wavy-char--stopped {
      animation: none;
      transform: none;
      transition: none;
    }
  }
`;

let styleInjected = false;

export const WavyText = memo(({
  text,
  delayOffset = 0,
  isWavy = false,
  className = '',
}: WavyTextProps): ReactElement => {
  if (!styleInjected) {
    const style = document.createElement('style');
    style.textContent = wavyCharStyle;
    document.head.appendChild(style);
    styleInjected = true;
  }

  return (
    <motion.div
      className={`flex ${className}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...revealTransition,
        opacity: { duration: 0.4, delay: delayOffset },
        y: { ...revealTransition.y, delay: delayOffset },
      }}
    >
      {Array.from(text).map((letter, index) => {
        const waveDelay = (delayOffset + index * 0.1).toFixed(2);

        return (
          <span
            key={index}
            className={isWavy ? 'wavy-char' : 'wavy-char wavy-char--stopped'}
            style={{ '--wave-delay': `${waveDelay}s` } as React.CSSProperties}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
});

WavyText.displayName = 'WavyText';