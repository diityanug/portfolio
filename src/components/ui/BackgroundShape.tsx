import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const SHAPES = [
  {
    id: 'circle',
    viewBox: '0 0 894.49 894.98',
    d: 'M442.88 0C203.46 3.25 9.64 195.31 3.6 434.05 244.07 433.12 439.13 239.79 442.89 0ZM505.53 430.41h388.84C886.62 198.16 701.14 10.94 469.59.43v394.04c0 19.85 16.09 35.94 35.94 35.94M392.5 460.69H3.71c7.76 232.25 193.24 419.47 424.78 429.98V496.69c0-19.88-16.12-36-36-36ZM455.21 891.1c239.42-3.24 433.24-195.31 439.29-434.05-240.47.93-435.53 194.26-439.29 434.05',
  },
  {
    id: 'halfcircle',
    viewBox: '0 0 894.49 898.37',
    d: 'M447.25 0C325.22 0 225.41 95 217.69 215.08h459.13C669.08 95 569.27 0 447.25 0M677.29 217.54c-1.32 125.93-103.8 227.61-230.04 227.61 127.06 0 230.07 103.01 230.07 230.07H217.52c6.52 121.23 106.87 217.52 229.73 217.52s223.21-96.29 229.73-217.52C798.21 670.45 894.5 570.1 894.5 447.24c0-122.75-96.13-223.03-217.21-229.71Z',
  },
  {
    id: 'pattern',
    viewBox: '0 0 894.49 894.98',
    d: 'M0 0c0 209.76 144.4 385.79 339.21 434.11 54.96 13.63 108.04-28.37 108.04-85V0zM434.1 555.34C385.75 750.12 209.73 894.49 0 894.49V447.24h349.05c56.66 0 98.69 53.1 85.04 108.09ZM460.37 339.27C508.67 144.43 684.72 0 894.49 0v447.25H545.32c-56.6 0-98.57-53.04-84.96-107.98ZM894.49 894.49c0-209.77-144.42-385.81-339.25-434.12-54.94-13.62-107.99 28.36-107.99 84.97v349.15H894.5Z',
  },
  {
    id: 'roundedsquare',
    viewBox: '0 0 894.49 894.98',
    d: 'M597.43 0H300.46c-23.09 0-45.24 9.17-61.57 25.5L28.9 235.49a87.07 87.07 0 0 0-25.5 61.57v296.97c0 23.09 9.17 45.24 25.5 61.57l209.99 209.99a87.07 87.07 0 0 0 61.57 25.5h296.97c23.09 0 45.24-9.17 61.57-25.5L868.99 655.6a87.07 87.07 0 0 0 25.5-61.57V297.06c0-23.09-9.17-45.24-25.5-61.57L659 25.5A87.07 87.07 0 0 0 597.43 0Z',
  },
] as const;

interface BackgroundShapeProps {
  className?: string;
  strokeClassName?: string;
  initialIndex?: number;
  intervalMs?: number;
}

const BackgroundShape = ({
  className = ' right-[-25vw] top-[-10vw] w-[75vw] h-[75vw] md:right-[-16vw] md:top-[2vh] md:w-[52vw] md:h-[52vw]',
  strokeClassName = 'stroke-black/[0.055]',
  initialIndex = 0,
  intervalMs = 6500,
}: BackgroundShapeProps) => {
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(initialIndex % SHAPES.length);

  useEffect(() => {
    if (shouldReduce) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % SHAPES.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [shouldReduce, intervalMs]);

  const shape = SHAPES[index];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 select-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={shape.id}
          initial={shouldReduce ? false : { opacity: 0, rotate: -90, scale: 0.94 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={shouldReduce ? undefined : { opacity: 0, rotate: 90, scale: 0.94 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={shape.viewBox}
            fill="none"
            className={`h-full w-full ${strokeClassName}`}
          >
            <path
              d={shape.d}
              strokeWidth={2.2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundShape;
