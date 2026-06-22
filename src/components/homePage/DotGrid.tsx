import { useEffect, useRef, memo } from 'react';
import type { ReactElement } from 'react';

/**
 * High-performance Canvas Dot Grid (Antigravity Style)
 * Murni bintik-bintik yang bereaksi terhadap kursor (Scale & Repel).
 * Warna: Sage Green (#2E4C38 -> rgba(46, 76, 56))
 */
const DotGrid = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip jika ini di perangkat touch (HP)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- KONFIGURASI GRID ---
    const SPACING = 32; // Jarak antar bintik
    const BASE_RADIUS = 1.2; // Ukuran awal bintik
    const MAX_RADIUS = 3.5; // Ukuran bintik saat kena kursor
    const INTERACTION_RADIUS = 130; // Seberapa jauh kursor narik bintik
    const BASE_OPACITY = 0.15; // Ketebalan warna awal
    const MAX_OPACITY = 0.8; // Ketebalan warna saat kena kursor
    const REPEL_DISTANCE = 8; // Efek bintik menyingkir (magnet)

    type Dot = {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      currentRadius: number;
      targetRadius: number;
      currentOpacity: number;
      targetOpacity: number;
    };

    const dots: Dot[] = [];

    const initGrid = () => {
      dots.length = 0;
      // Looping untuk bikin titik di seluruh layar
      for (let x = -SPACING; x < width + SPACING; x += SPACING) {
        for (let y = -SPACING; y < height + SPACING; y += SPACING) {
          dots.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            currentRadius: BASE_RADIUS,
            targetRadius: BASE_RADIUS,
            currentOpacity: BASE_OPACITY,
            targetOpacity: BASE_OPACITY,
          });
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Fix agar canvas tajam di layar resolusi tinggi (Retina display)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      initGrid();
    };

    window.addEventListener('resize', resize);
    resize();

    let mouseX = -1000;
    let mouseY = -1000;
    let isActive = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isActive = true;
    };

    const onMouseLeave = () => {
      isActive = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    let animationFrameId: number;

    const render = () => {
      // Bersihkan layar di setiap frame
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        let targetX = dot.baseX;
        let targetY = dot.baseY;
        dot.targetRadius = BASE_RADIUS;
        dot.targetOpacity = BASE_OPACITY;

        if (isActive) {
          // Hitung jarak bintik ke kursor
          const dx = mouseX - dot.baseX;
          const dy = mouseY - dot.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Jika kursor dekat dengan bintik
          if (dist < INTERACTION_RADIUS) {
            const force = 1 - dist / INTERACTION_RADIUS;
            const easeForce = force * force; // Smooth easing

            dot.targetRadius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * easeForce;
            dot.targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * easeForce;

            // Kalkulasi magnet (bintik menyingkir sedikit)
            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * (REPEL_DISTANCE * easeForce);
            targetY -= Math.sin(angle) * (REPEL_DISTANCE * easeForce);
          }
        }

        // Rumus LERP (Linear Interpolation) agar gerakannya empuk dan balik perlahan
        dot.x += (targetX - dot.x) * 0.15;
        dot.y += (targetY - dot.y) * 0.15;
        dot.currentRadius += (dot.targetRadius - dot.currentRadius) * 0.15;
        dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * 0.15;

        // Gambar bintiknya
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        // RGB dari Sage Green (#2E4C38)
        ctx.fillStyle = `rgba(46, 76, 56, ${dot.currentOpacity})`; 
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        // Agar titik-titik nge-fade (hilang) di pinggir layar
        maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
      }}
    />
  );
};

export default memo(DotGrid);