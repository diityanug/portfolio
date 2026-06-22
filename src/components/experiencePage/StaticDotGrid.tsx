import { memo } from 'react';
import type { ReactElement } from 'react';

/**
 * Clean, Static Dot Grid for text-heavy pages.
 * Zero JavaScript event listeners, pure CSS for max performance.
 * Warna: Sage Green (#2E4C38).
 */
const StaticDotGrid = (): ReactElement => {
  // Efek pudar (fade) di pinggir layar agar titik-titiknya menyatu halus
  const radialMask = 'radial-gradient(circle at 50% 50%, black 20%, black 50%, transparent 90%)';

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0" 
      aria-hidden="true"
      style={{
        maskImage: radialMask,
        WebkitMaskImage: radialMask,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          // Ukuran titik 1.5px, jarak antar titik 36px
          backgroundImage: 'radial-gradient(#2E4C38 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          opacity: 0.15, // Ketebalan titik statis
        }}
      />
    </div>
  );
};

export default memo(StaticDotGrid);