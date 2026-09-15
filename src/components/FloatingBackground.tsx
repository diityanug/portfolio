import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingBackgroundProps {
  icons: ReactNode[];
  color?: "sky" | "sun" | "watermelon" | "chrome";
}

export const FloatingBackground = ({
  icons,
  color = "sky",
}: FloatingBackgroundProps) => {
  const bgColors = {
    sky: "bg-sky",
    sun: "bg-sun",
    watermelon: "bg-watermelon",
    chrome: "bg-chrome",
  };
  
  const selectedBg = bgColors[color];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="relative w-full max-w-[1400px] h-full">
        {icons.map((icon, i) => {
          // Responsive positions (using percentages and clamp to keep them around edges)
          const positions = [
            { top: "5%", left: "-10%" },
            { bottom: "10%", right: "-5%" },
            { top: "35%", right: "-10%" },
            { bottom: "35%", left: "-5%" },
            { top: "60%", right: "10%" },
          ];

          const pos = positions[i % positions.length];
          const isEven = i % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ y: 0 }}
              animate={{ y: [0, isEven ? -20 : 20, 0] }}
              transition={{
                duration: 6 + (i % 3) * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              // Isometric/brutalist box style inspired by the reference image
              className="absolute flex items-center justify-center border-2 border-ink bg-surface shadow-[6px_6px_0_#383838] md:shadow-[12px_12px_0_#383838] opacity-30 sm:opacity-40"
              style={{
                ...pos,
                width: 100 + (i % 3) * 40 + "px",
                height: 100 + (i % 3) * 40 + "px",
                transform: `rotate(${isEven ? 10 : -10}deg)`,
              }}
            >
              {/* Inner slight color tint, similar to the blue glow in the image */}
              <div
                className={`absolute inset-0 ${selectedBg} opacity-20 -z-10`}
              />
              <div className="text-ink w-1/2 h-1/2 opacity-70 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {icon}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
