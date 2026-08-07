import { memo } from 'react';
import type { ReactElement } from 'react';

const StaticDotGrid = (): ReactElement => {
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
          backgroundImage: 'radial-gradient(#2E4C38 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          opacity: 0.15,
        }}
      />
    </div>
  );
};

export default memo(StaticDotGrid);