import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const springTransition = {
    type: "spring",
    stiffness: 60,
    damping: 28,
    mass: 0.8
  } as any;

  return (
    <nav className="w-full py-6 md:py-10 px-4 md:px-16 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      
      <div className="flex items-center w-full h-8 relative min-w-0">
        
        {/* GARIS DINAMIS */}
        <motion.div 
          layout="size"
          transition={springTransition}
          className="h-[1px] bg-black/20 flex-grow shrink min-w-[40px] md:min-w-[80px] origin-left will-change-transform"
        />

        {/* SPACER */}
        <motion.div 
          layout
          transition={springTransition}
          className="w-[clamp(8px,2vw,40px)] shrink-0"
        />

        {/* 🔥 PENTING: Container kanan ikut layout */}
        <motion.div 
          layout
          transition={springTransition}
          className="flex items-center justify-end shrink-0 relative min-h-[32px]"
        >
          
          <AnimatePresence mode="popLayout">
            {isHome ? (
              <motion.div
                layout
                key="welcome"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }} // 👉 keluar ke kanan
                transition={springTransition}
                className="font-telegraf font-bold text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap"
              >
                Welcome
              </motion.div>
            ) : (
              <motion.div
                layout
                key="nav-links"
                initial={{ opacity: 0, x: 60 }} // 👉 masuk dari kanan
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }} // 👉 keluar ke kanan juga (biar konsisten arah)
                transition={springTransition}
                className="flex items-center gap-5 lg:gap-8"
              >
                <div className="hidden md:flex items-center gap-5 lg:gap-8 font-telegraf font-bold text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      className={`${
                        location.pathname === link.path ? 'opacity-100' : 'opacity-40'
                      } hover:opacity-100 transition-all duration-300 flex items-center shrink-0`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-50 focus:outline-none"
                >
                  <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                  <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      <AnimatePresence>
        {!isHome && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              ...springTransition,
              delay: 0.05
            }}
            className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md flex flex-col items-center pt-0 pb-9 gap-6 border-b border-black md:hidden shadow-sm"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-telegraf font-bold text-[11px] tracking-[0.2em] uppercase ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;