import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import BackgroundShape from '../ui/BackgroundShape';

const STACK = [
  { name: 'TypeScript', color: '#3b82f6' },
  { name: 'React', color: '#61dafb' },
  { name: 'Python', color: '#ffd43b' },
  { name: 'FastAPI', color: '#14b8a6' },
] as const;

const VIEWPORT = { once: true, margin: '-10px' } as const;

const Profile = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldReduce = useReducedMotion();

  // Scroll progress for "about me." title fill
  const { scrollYProgress: headingScroll } = useScroll({
    target: headingRef,
    offset: ['start 0.9', 'start 0.4'],
  });

  const titleClip = useTransform(headingScroll, [0, 1], [
    'inset(0 100% 0 0)',
    'inset(0 0% 0 0)',
  ]);

  return (
    <section
      id="profile"
      tabIndex={-1}
      aria-labelledby="profile-heading"
      className="relative z-10 bg-[#010102] border-t border-[#23252a] py-20 lg:py-32 px-4 md:px-8 overflow-hidden outline-none"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-60 right-[-15%] h-160 w-160 bg-[radial-gradient(circle_closest-side,rgba(94,106,210,0.12),transparent)]"
      />

      {/* Subtle wireframe background shape */}
      <BackgroundShape
        initialIndex={3}
        strokeClassName="stroke-[#5e6ad2]/[0.14]"
        className="-left-[28vw] -bottom-[10vw] w-[75vw] h-[75vw] md:-left-[16vw] md:top-[8vh] md:w-[48vw] md:h-[48vw]"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
        className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
      >
        {/* Left column: Bio & Stack */}
        <div className="lg:col-span-7 flex flex-col">
          <motion.h2
            ref={headingRef}
            id="profile-heading"
            variants={fadeUp}
            className="text-[clamp(44px,10vw,64px)] sm:text-[clamp(52px,9vw,96px)] lg:text-[clamp(64px,6.5vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#f7f8f8] mb-10 lg:mb-12 uppercase"
          >
            <span className="block text-canvas">Something</span>
            {/* Scroll-driven text fill */}
            <span className="relative block w-fit select-none">
              {/* Wireframe outline base */}
              <span
                aria-hidden="true"
                className="block text-transparent [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#f7f8f8]"
              >
                about me.
              </span>
              {/* Dynamic filled layer swept across via scroll */}
              <motion.span
                style={shouldReduce ? undefined : { clipPath: titleClip }}
                aria-hidden="true"
                className="absolute inset-0 block text-[#5e6ad2] [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#5e6ad2] will-change-[clip-path]"
              >
                about me.
              </motion.span>
              <span className="sr-only">about me.</span>
            </span>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-col">
            <div aria-hidden="true" className="h-px w-12 bg-[#5e6ad2] mb-8 opacity-80" />

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
                <div aria-hidden="true" className="h-px flex-1 bg-[#23252a]" />
              </div>

              <ul className="flex flex-wrap gap-3">
                {STACK.map(({ name, color }) => (
                  <li
                    key={name}
                    style={{ '--c': color } as CSSProperties}
                    className="inline-flex items-center gap-2.5 rounded-full border border-[#23252a] bg-[#0f1011] px-4 py-2.5 text-sm md:text-base font-medium tracking-tight text-[#d0d6e0] cursor-default transition-[translate,color,border-color,background-color] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:text-[#f7f8f8] hover:border-(--c) hover:bg-[color-mix(in_srgb,var(--c)_12%,#0f1011)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-(--c) shadow-[0_0_10px_var(--c)]"
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right column: Profile Card */}
        <motion.div
          variants={fadeUp}
          className="order-first lg:order-0 lg:col-span-5 w-full max-w-sm sm:max-w-md lg:max-w-105 mx-auto lg:ml-auto flex"
        >
          <div className="relative w-full rounded-[38px] border border-[#23252a] bg-[#14161b] p-2.5 shadow-[0_24px_60px_-20px_rgba(94,106,210,0.35)]">
            <div className="relative w-full aspect-3/4 min-h-120 sm:min-h-132 overflow-hidden rounded-[30px] bg-[#0a0b0e]">
              {/* Portrait illustration anchored to bottom & lifted into top 82% so subject sits above text */}
              <img
                src="/Profile_pics.webp"
                alt="Aditya Nugraha"
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 top-0 h-[82%] w-full object-cover object-bottom select-none"
              />

              {/* Smooth bottom fade blending the illustration bottom edge into card base */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-linear-to-t from-[#0a0b0e] from-42% via-[#0a0b0e]/85 via-72% to-transparent"
              />

              {/* Bottom content overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-6 sm:p-7">
                <h3 className="text-2xl sm:text-[28px] font-bold tracking-[-0.02em] text-[#f7f8f8] leading-tight">
                  Aditya Nugraha Irwan
                </h3>

                {/* Subtitle / Role */}
                <p className="mt-2.5 flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs min-[380px]:text-[13px] sm:text-sm font-normal leading-relaxed text-[#b4bcd0]">
                  <span>Software Engineer</span>
                  <span aria-hidden="true" className="text-[#5e6ad2] select-none">
                    |
                  </span>
                  <span>Frontend Development</span>
                </p>

                {/* Actions row: LinkedIn + GitHub icons on the left, Follow button on the right */}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/in/diityanug"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn (opens in new tab)"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#23252a] bg-[#14161b]/90 text-[#d0d6e0] transition-[color,border-color,background-color,transform] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-[#5e6ad2] hover:bg-[#5e6ad2]/15 hover:text-[#f7f8f8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e6ad2]"
                    >
                      <LinkedinLogo size={22} weight="regular" aria-hidden />
                    </a>

                    <a
                      href="https://github.com/diityanug"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub (opens in new tab)"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#23252a] bg-[#14161b]/90 text-[#d0d6e0] transition-[color,border-color,background-color,transform] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:border-[#5e6ad2] hover:bg-[#5e6ad2]/15 hover:text-[#f7f8f8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e6ad2]"
                    >
                      <GithubLogo size={22} weight="regular" aria-hidden />
                    </a>
                  </div>

                  <a
                    href="https://www.instagram.com/diityanug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#5e6ad2] px-7 py-2.5 text-sm sm:text-[15px] font-semibold tracking-tight text-[#f7f8f8] shadow-[0_8px_24px_-4px_rgba(94,106,210,0.55)] transition-[background-color,transform,box-shadow] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:bg-[#6e7ae2] hover:shadow-[0_12px_28px_-4px_rgba(94,106,210,0.7)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f98ff]"
                  >
                    Follow
                    <span className="sr-only"> on Instagram (opens in new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Profile;
