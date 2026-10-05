import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface JapaneseHoverTextProps {
  japanese: string;
  english: string;
  subRuby?: string;
  className?: string;
  jpClassName?: string;
  enClassName?: string;
  /** Jeda (ms) sebelum teks otomatis berganti. Default 3500. */
  interval?: number;
  /** Tambahan jeda (ms) hanya untuk pergantian pertama, untuk membuat baris bergantian. */
  offset?: number;
  /** Matikan pergantian otomatis jika false. */
  autoPlay?: boolean;
}

export const JapaneseHoverText: React.FC<JapaneseHoverTextProps> = ({
  japanese,
  english,
  subRuby: _subRuby,
  className = '',
  jpClassName = '',
  enClassName = '',
  interval = 3500,
  offset = 0,
  autoPlay = true,
}) => {
  const [showEnglish, setShowEnglish] = useState(false);
  const reduce = useReducedMotion();
  const isFirstCycle = useRef(true);

  // Timer dijadwalkan ulang setiap showEnglish berubah,
  // jadi klik user otomatis mereset hitungan mundur.
  useEffect(() => {
    if (!autoPlay || reduce) return;
    const delay = interval + (isFirstCycle.current ? offset : 0);
    const id = window.setTimeout(() => {
      isFirstCycle.current = false;
      setShowEnglish((prev) => !prev);
    }, delay);
    return () => window.clearTimeout(id);
  }, [showEnglish, autoPlay, reduce, interval, offset]);

  const toggle = () => {
    isFirstCycle.current = false;
    setShowEnglish((prev) => !prev);
  };

  return (
    <span
      className={`relative inline-grid cursor-pointer select-none overflow-hidden [-webkit-tap-highlight-color:transparent] ${className}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={showEnglish}
      aria-label={`${japanese} (${english})`}
    >
      {/* Spacer tak terlihat agar ukuran tetap stabil */}
      <span className="invisible pointer-events-none col-start-1 row-start-1 leading-none py-1 select-none font-sans whitespace-nowrap">
        {english}
      </span>
      <span className="invisible pointer-events-none col-start-1 row-start-1 leading-none py-1 select-none font-jp-serif whitespace-nowrap">
        {japanese}
      </span>

      {/* Japanese */}
      <span
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
        className={`col-start-1 row-start-1 flex items-center transition-all duration-700 font-jp-serif py-1 will-change-transform ${
          showEnglish
            ? 'translate-y-[-110%] opacity-0 scale-[0.98]'
            : 'translate-y-0 opacity-100 scale-100'
        } ${jpClassName}`}
        aria-hidden={showEnglish}
      >
        {japanese}
      </span>

      {/* English */}
      <span
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
        className={`col-start-1 row-start-1 flex items-center transition-all duration-700 font-sans py-1 will-change-transform ${
          showEnglish
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-[110%] opacity-0 scale-[0.98]'
        } ${enClassName}`}
        aria-hidden={!showEnglish}
      >
        {english}
      </span>
    </span>
  );
};

export default JapaneseHoverText;