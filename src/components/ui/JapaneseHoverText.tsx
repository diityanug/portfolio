import { useInView, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface JapaneseHoverTextProps {
  japanese: string;
  english: string;
  className?: string;
  jpClassName?: string;
  enClassName?: string;
  /** Hold duration (ms) when full text is typed. Default 3200ms. */
  interval?: number;
  /** Initial offset delay (ms) for staggered multi-line choreography. */
  offset?: number;
  /** Milliseconds per character when typing. Default 65ms. */
  typeSpeed?: number;
  /** Milliseconds per character when deleting. Default 35ms. */
  deleteSpeed?: number;
  /** Enable automatic cycling. Default true. */
  autoPlay?: boolean;
}

type Phase = 'holding' | 'deleting' | 'paused' | 'typing';

const spacer =
  'invisible pointer-events-none col-start-1 row-start-1 py-1 leading-none whitespace-nowrap select-none';

export const JapaneseHoverText = ({
  japanese,
  english,
  className = '',
  jpClassName = '',
  enClassName = '',
  interval = 3200,
  offset = 0,
  typeSpeed = 65,
  deleteSpeed = 35,
  autoPlay = true,
}: JapaneseHoverTextProps) => {
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const [displayedText, setDisplayedText] = useState(japanese);
  const [phase, setPhase] = useState<Phase>('holding');
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(containerRef, { margin: '50px' });
  const reduceMotion = useReducedMotion();
  const isFirstCycle = useRef(true);

  // Split into character arrays for safe multibyte Japanese unicode handling
  const jaChars = useRef(Array.from(japanese));
  const enChars = useRef(Array.from(english));

  useEffect(() => {
    jaChars.current = Array.from(japanese);
    enChars.current = Array.from(english);
  }, [japanese, english]);

  // Fast forward / toggle on user click
  const handleToggle = useCallback(() => {
    isFirstCycle.current = false;
    if (phase === 'holding') {
      setPhase('deleting');
    } else if (phase === 'deleting' || phase === 'paused') {
      const nextLang = currentLang === 'ja' ? 'en' : 'ja';
      setCurrentLang(nextLang);
      setDisplayedText('');
      setPhase('typing');
    }
  }, [phase, currentLang]);

  // Typewriter state machine
  useEffect(() => {
    if (!autoPlay || !inView || isHovered) return;

    if (reduceMotion) {
      // Instant transition when reduced motion is preferred
      const timer = window.setTimeout(() => {
        const nextLang = currentLang === 'ja' ? 'en' : 'ja';
        setCurrentLang(nextLang);
        setDisplayedText(nextLang === 'ja' ? japanese : english);
      }, interval);
      return () => clearTimeout(timer);
    }

    let timeoutId: number;

    if (phase === 'holding') {
      const delay = interval + (isFirstCycle.current ? offset : 0);
      timeoutId = window.setTimeout(() => {
        isFirstCycle.current = false;
        setPhase('deleting');
      }, delay);
    } else if (phase === 'deleting') {
      const chars = Array.from(displayedText);
      if (chars.length > 0) {
        timeoutId = window.setTimeout(() => {
          setDisplayedText(chars.slice(0, -1).join(''));
        }, deleteSpeed);
      } else {
        // Finished deleting, brief pause before typing next word
        timeoutId = window.setTimeout(() => {
          setCurrentLang((prev) => (prev === 'ja' ? 'en' : 'ja'));
          setPhase('paused');
        }, 180);
      }
    } else if (phase === 'paused') {
      timeoutId = window.setTimeout(() => {
        setPhase('typing');
      }, 140);
    } else if (phase === 'typing') {
      const targetChars = currentLang === 'ja' ? jaChars.current : enChars.current;
      const currentChars = Array.from(displayedText);

      if (currentChars.length < targetChars.length) {
        timeoutId = window.setTimeout(() => {
          setDisplayedText(targetChars.slice(0, currentChars.length + 1).join(''));
        }, typeSpeed);
      } else {
        // Finished typing word, hold for interval
        setPhase('holding');
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    autoPlay,
    inView,
    isHovered,
    reduceMotion,
    phase,
    displayedText,
    currentLang,
    interval,
    offset,
    typeSpeed,
    deleteSpeed,
    japanese,
    english,
  ]);

  const activeFontClass = currentLang === 'ja' ? 'font-jp-serif' : 'font-sans';
  const activeStyleClass = currentLang === 'ja' ? jpClassName : enClassName;

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={handleToggle}
      onPointerEnter={(e) => setIsHovered(e.pointerType === 'mouse')}
      onPointerLeave={() => setIsHovered(false)}
      aria-label={`${japanese} (${english})`}
      className={`relative inline-grid cursor-pointer select-none text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current [-webkit-tap-highlight-color:transparent] ${className}`}
    >
      {/* Invisible spacers reserve max dimensions to prevent layout shifts */}
      <span className={`${spacer} font-sans ${enClassName}`}>{english}</span>
      <span className={`${spacer} font-jp-serif ${jpClassName}`}>{japanese}</span>

      {/* Typewriter active text container */}
      <span
        lang={currentLang}
        className={`col-start-1 row-start-1 flex items-center py-1 whitespace-nowrap leading-none ${activeFontClass} ${activeStyleClass}`}
      >
        <span>{displayedText}</span>
      </span>
    </button>
  );
};

export default JapaneseHoverText;