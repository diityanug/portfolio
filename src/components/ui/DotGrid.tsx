import { useEffect, useRef, memo } from 'react';
import type { ReactElement } from 'react';

const DotGrid = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const SPACING = 32;
    const BASE_RADIUS = 1.2;
    const BASE_OPACITY = 0.15;

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(46, 76, 56, ${BASE_OPACITY})`;

      for (let x = -SPACING; x < width + SPACING; x += SPACING) {
        for (let y = -SPACING; y < height + SPACING; y += SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, BASE_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      drawGrid();
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
      }}
    />
  );
};

export default memo(DotGrid);