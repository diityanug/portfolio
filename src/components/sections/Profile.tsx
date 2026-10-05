import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

const STACK = ['TypeScript', 'React', 'Python', 'FastAPI'];

const Profile = () => {
  const [filled, setFilled] = useState(false);
  const focusRef = useRef<HTMLSpanElement>(null);

  // Negative zone: klik/tap di luar "about me" mengembalikan ke outline
  useEffect(() => {
    if (!filled) return;
    const handleOutside = (e: PointerEvent) => {
      if (focusRef.current && !focusRef.current.contains(e.target as Node)) {
        setFilled(false);
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [filled]);

  return (
    <section
      id="profile"
      className="relative z-10 bg-[#010102] border-t border-[#23252a] py-20 lg:py-32 px-4 md:px-8 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-120 w-120 rounded-full bg-[#5e6ad2]/10 blur-[140px]"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10px' }}
        variants={staggerContainer}
        className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
      >
        {/* Kiri: judul + teks + stack */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(44px,10vw,64px)] sm:text-[clamp(52px,9vw,96px)] lg:text-[clamp(64px,6.5vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#f7f8f8] mb-10 lg:mb-12 uppercase"
          >
            <span className="block text-canvas">Something</span>
            <span
              ref={focusRef}
              role="button"
              tabIndex={0}
              aria-pressed={filled}
              onClick={() => setFilled(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFilled(true);
                } else if (e.key === 'Escape') {
                  setFilled(false);
                }
              }}
              onBlur={() => setFilled(false)}
              className={`block w-fit cursor-pointer select-none [-webkit-tap-highlight-color:transparent] outline-none [-webkit-text-stroke-width:2px] transition-[color,-webkit-text-stroke-color] duration-300 hover:text-[#5e6ad2] hover:[-webkit-text-stroke-color:#5e6ad2] focus-visible:text-[#5e6ad2] ${
                filled
                  ? 'text-[#5e6ad2] [-webkit-text-stroke-color:#5e6ad2]'
                  : 'text-transparent [-webkit-text-stroke-color:#f7f8f8]'
              }`}
            >
              about me
            </span>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-col">
            <div className="h-px w-12 bg-[#5e6ad2] mb-8 opacity-80" />

            <p className="text-[#f7f8f8] text-xl md:text-2xl leading-[1.45] tracking-[-0.01em] max-w-2xl">
              A Software Engineer focused on frontend development using{' '}
              <span className="text-[#8f98ff]">TypeScript</span> and{' '}
              <span className="text-[#8f98ff]">React</span>, while also exploring backend
              development with Python and FastAPI. I enjoy building modern, clean, and
              user-friendly web applications while continuously learning and improving my
              skills.
            </p>

            <p className="mt-6 text-[#8a8f98] text-base md:text-[17px] leading-[1.75] max-w-2xl">
              Outside of coding, I love playing games and spending time with sports,
              especially badminton and basketball. I can play other sports too, but whether
              I’m actually good at them is another story. I always enjoy trying new things
              and simply having fun with whatever I’m doing.
            </p>

            <div className="mt-12">
              <h3 className="text-sm font-medium text-[#8a8f98] mb-4">Core Stack</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#23252a]">
                {STACK.map((tech) => (
                  <li
                    key={tech}
                    className="group border-b border-r border-[#23252a] px-4 py-5 text-base md:text-lg font-medium tracking-tight text-[#d0d6e0] transition-colors duration-200 hover:bg-[#0f1011] hover:text-[#f7f8f8] cursor-default"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5e6ad2]/50 transition-colors group-hover:bg-[#5e6ad2]" />
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Kanan: foto setinggi kolom kiri */}
        <motion.figure
          variants={fadeUp}
          className="lg:col-span-5 w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 lg:self-stretch flex flex-col"
        >
          <div className="relative w-full aspect-3/4 lg:aspect-auto lg:flex-1 lg:min-h-140 overflow-hidden rounded-2xl border border-[#23252a] bg-[#07080a]">
            <img
              src="/Profile_pics.webp"
              alt="Aditya Nugraha - Software Engineer"
              className="absolute inset-0 h-full w-full object-cover object-[50%_25%] lg:object-top"
            />
            {/* Overlay caption hanya di desktop */}
            <div
              aria-hidden
              className="hidden lg:block absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#010102]/90 to-transparent"
            />
            <figcaption className="hidden lg:flex absolute inset-x-0 bottom-0 items-end justify-between gap-4 p-6">
              <span className="text-[#f7f8f8] font-medium tracking-tight">Aditya Nugraha</span>
              <span className="text-sm text-[#d0d6e0] text-right leading-snug">
                Software Engineer
                <br />
                Frontend Developer
              </span>
            </figcaption>
          </div>

          {/* Caption di bawah foto untuk mobile/tablet */}
          <div className="lg:hidden mt-4 flex items-baseline justify-between gap-4 border-t border-[#23252a] pt-4">
            <span className="text-[#f7f8f8] font-medium tracking-tight">Aditya Nugraha</span>
            <span className="text-sm text-[#8a8f98] text-right leading-snug">
              Software Engineer
              <br />
              Frontend Developer
            </span>
          </div>
        </motion.figure>
      </motion.div>
    </section>
  );
};

export default Profile;