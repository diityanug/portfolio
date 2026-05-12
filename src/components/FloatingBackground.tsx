import { motion } from 'framer-motion';
import type { FC } from 'react';

const icons = [
  "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", 
  "M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4",
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "M13 10V3L4 14h7v7l9-11h-7z"
];

const FloatingBackground: FC = () => {
  const particles = Array.from({ length: 20 }); // Tambah jumlahnya jadi 20

  return (
    // Z-index diturunkan ke -10 dan pastikan tidak ada background solid di sini
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-10] select-none">
      {particles.map((_, i) => {
        const iconPath = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 20 + 15; // Ukuran diperbesar sedikit (15px - 35px)
        const horizontalPos = Math.random() * 100;
        const duration = Math.random() * 15 + 15; // Lebih cepat sedikit
        const delay = Math.random() * 10;

        return (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5" // Garis dipertebal
            className="absolute text-gray-300/60" // Warna lebih gelap sedikit (opacity 60%)
            style={{ 
              width: `${size}px`, 
              height: `${size}px`, 
              left: `${horizontalPos}%` 
            }}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.4, 0], // Muncul perlahan lalu hilang
              rotate: 360 // Tambahkan sedikit rotasi biar lebih hidup
            }}
            transition={{
              duration: duration,
              ease: "linear",
              repeat: Infinity,
              delay: delay,
            }}
          >
            <path d={iconPath} />
          </motion.svg>
        );
      })}
    </div>
  );
};

export default FloatingBackground;