import { useEffect, useRef, memo } from 'react';
import type { ReactElement } from 'react';

const DotGrid = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Grid Config
    const SPACING = 32; 
    const BASE_RADIUS = 1.2;
    const MAX_RADIUS = 3.5;
    const INTERACTION_RADIUS = 130;
    const BASE_OPACITY = 0.15;
    const MAX_OPACITY = 0.8;
    const REPEL_DISTANCE = 8;

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
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        let targetX = dot.baseX;
        let targetY = dot.baseY;
        dot.targetRadius = BASE_RADIUS;
        dot.targetOpacity = BASE_OPACITY;

        if (isActive) {
          
          const dx = mouseX - dot.baseX;
          const dy = mouseY - dot.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INTERACTION_RADIUS) {
            const force = 1 - dist / INTERACTION_RADIUS;
            const easeForce = force * force; 

            dot.targetRadius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * easeForce;
            dot.targetOpacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * easeForce;

            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * (REPEL_DISTANCE * easeForce);
            targetY -= Math.sin(angle) * (REPEL_DISTANCE * easeForce);
          }
        }

        dot.x += (targetX - dot.x) * 0.15;
        dot.y += (targetY - dot.y) * 0.15;
        dot.currentRadius += (dot.targetRadius - dot.currentRadius) * 0.15;
        dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * 0.15;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
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
        maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
      }}
    />
  );
};

export default memo(DotGrid);