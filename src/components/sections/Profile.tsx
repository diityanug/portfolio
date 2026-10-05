import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';

const STACK = [
  { name: 'TypeScript', color: '#3b82f6' },
  { name: 'React', color: '#61dafb' },
  { name: 'Python', color: '#ffd43b' },
  { name: 'FastAPI', color: '#14b8a6' },
];

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
              <div className="flex items-center gap-4 mb-5">
                <h3 className="text-sm font-medium text-[#8a8f98] shrink-0">Core Stack</h3>
                <div className="h-px flex-1 bg-[#23252a]" />
              </div>

              <ul className="flex flex-wrap gap-3">
                {STACK.map(({ name, color }) => (
                  <li
                    key={name}
                    style={{ '--c': color } as React.CSSProperties}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-[#23252a] bg-[#0f1011] px-4 py-2.5 text-sm md:text-base font-medium tracking-tight text-[#d0d6e0] transition-all duration-300 cursor-default hover:-translate-y-0.5 hover:text-[#f7f8f8] hover:border-(--c) hover:bg-[color-mix(in_srgb,var(--c)_12%,#0f1011)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-(--c) shadow-[0_0_10px_var(--c)]" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Kanan: foto */}
        <motion.div
          variants={fadeUp}
          className="order-first lg:order-0 lg:col-span-5 w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 lg:self-stretch flex"
        >
          <figure className="group relative w-full flex overflow-hidden rounded-[28px] border border-[#23252a] bg-[#07080a] shadow-[0_24px_60px_-20px_rgba(94,106,210,0.35)]">
            <div className="relative w-full aspect-3/4 lg:aspect-auto lg:min-h-120">
              <img
                src="/Profile_pics.webp"
                alt="Aditya Nugraha - Software Engineer"
                className="absolute inset-0 h-full w-full object-cover object-[50%_25%] lg:object-top"
              />
            </div>

            {/* Label melayang */}
            <figcaption className="absolute left-3 right-3 bottom-3 lg:left-4 lg:right-4 lg:bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#010102]/60 backdrop-blur-md px-4 py-3">
              <span className="text-sm lg:text-base font-semibold tracking-tight text-[#f7f8f8]">
                Aditya Nugraha
              </span>
              <span className="text-[11px] lg:text-xs text-[#d0d6e0] text-right leading-snug">
                Software Engineer
                <br />
                Frontend Developer
              </span>
            </figcaption>
          </figure>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Profile;