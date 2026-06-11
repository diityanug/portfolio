import type { ReactElement } from 'react';

const BackgroundTexture = (): ReactElement => {
  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none -z-30" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.028) 1px, transparent 1px)`, 
          backgroundSize: '4rem 4rem', 
          maskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 30%, transparent 90%)', 
          WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 30%, transparent 90%)' 
        }} 
      />
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }} 
      />
    </>
  );
};

export default BackgroundTexture;