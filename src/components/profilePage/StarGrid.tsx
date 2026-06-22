import { useEffect, useRef, memo } from 'react';
import type { ReactElement } from 'react';

/**
 * High-performance Canvas Star Grid (Antigravity Style)
 * Bentuk bintik diubah menjadi Bintang 4-Sudut (Sparkle ✧).
 * Warna: Sage Green (#2E4C38).
 */
const StarGrid = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // --- KONFIGURASI GRID ---
    const SPACING = 40; // Jarak antar bintang (dibikin agak renggang biar elegan)
    const BASE_RADIUS = 2.5; // Ukuran awal bintang
    const MAX_RADIUS = 7.5; // Ukuran saat kena kursor
    const INTERACTION_RADIUS = 140; // Jarak tarikan kursor
    const BASE_OPACITY = 0.12; 
    const MAX_OPACITY = 0.8; 
    const REPEL_DISTANCE = 12; // Jarak menyingkir

    type Star = {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      currentRadius: number;
      targetRadius: number;
      currentOpacity: number;
      targetOpacity: number;
    };

    const stars: Star[] = [];

    const initGrid = () => {
      stars.length = 0;
      for (let x = -SPACING; x < width + SPACING; x += SPACING) {
        for (let y = -SPACING; y < height + SPACING; y += SPACING) {
          stars.push({
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
    const onMouseLeave = () => { isActive = false; };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    let animationFrameId: number;

    // Fungsi untuk menggambar bentuk bintang 4 sudut (Sparkle)
    const drawSparkle = (x: number, y: number, size: number) => {
      const inner = size * 0.25; // Ketebalan inti bintang
      ctx.beginPath();
      ctx.moveTo(x, y - size); // Top
      ctx.lineTo(x + inner, y - inner);
      ctx.lineTo(x + size, y); // Right
      ctx.lineTo(x + inner, y + inner);
      ctx.lineTo(x, y + size); // Bottom
      ctx.lineTo(x - inner, y + inner);
      ctx.lineTo(x - size, y); // Left
      ctx.lineTo(x - inner, y - inner);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        let targetX = star.baseX;
        let targetY = star.baseY;
        star.targetRadius = BASE_RADIUS;
        star.targetOpacity = BASE_OPACITY;

        if (isActive) {
          const dx = mouseX - star.baseX;
          const dy = mouseY - star.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INTERACTION_RADIUS) {
            const force = 1 - dist / INTERACTION_RADIUS;
            const easeForce = force * force;

            star.targetRadius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * easeForce;
            star.targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * easeForce;

            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * (REPEL_DISTANCE * easeForce);
            targetY -= Math.sin(angle) * (REPEL_DISTANCE * easeForce);
          }
        }

        star.x += (targetX - star.x) * 0.15;
        star.y += (targetY - star.y) * 0.15;
        star.currentRadius += (star.targetRadius - star.currentRadius) * 0.15;
        star.currentOpacity += (star.targetOpacity - star.currentOpacity) * 0.15;

        // Set Warna Sage Green
        ctx.fillStyle = `rgba(46, 76, 56, ${star.currentOpacity})`; 
        drawSparkle(star.x, star.y, star.currentRadius);
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
        maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
      }}
    />
  );
};

export default memo(StarGrid);