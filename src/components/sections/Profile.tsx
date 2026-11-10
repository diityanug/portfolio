import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import BackgroundShape from '../ui/BackgroundShape';

const VIEWPORT = { once: true, margin: '-10px' } as const;

const RESUME_URL =
  'https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing';

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
      className="relative z-10 bg-[#f8f9fa] border-t border-[#e5e7eb] py-20 lg:py-32 px-4 md:px-8 overflow-hidden outline-none"
    >
      {/* Subtle wireframe background shape */}
      <BackgroundShape
        initialIndex={3}
        strokeClassName="stroke-[#111111]/[0.04]"
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
            className="text-[clamp(40px,8vw,56px)] sm:text-[clamp(48px,7vw,72px)] lg:text-[clamp(56px,5.5vw,84px)] font-semibold leading-[1.02] tracking-[-0.038em] text-[#111111] mb-10 lg:mb-12 uppercase"
          >
            <span className="block text-[#111111]">Something</span>
            {/* Scroll-driven text fill */}
            <span className="relative block w-fit select-none">
              {/* Wireframe outline base */}
              <span
                aria-hidden="true"
                className="block text-transparent [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#111111]"
              >
                about me.
              </span>
              {/* Dynamic filled layer swept across via scroll */}
              <motion.span
                style={shouldReduce ? undefined : { clipPath: titleClip }}
                aria-hidden="true"
                className="absolute inset-0 block text-[#111111] [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#111111] will-change-[clip-path]"
              >
                about me.
              </motion.span>
              <span className="sr-only">about me.</span>
            </span>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-col">
            <div aria-hidden="true" className="h-px w-12 bg-[#111111] mb-8" />

            <p className="text-[#111111] text-lg sm:text-xl md:text-[21px] font-normal leading-[1.55] tracking-[-0.01em] max-w-2xl">
              A Software Engineer focused on frontend and mobile development using{' '}
              <span className="font-medium underline decoration-[#d1d5db] underline-offset-4">
                TypeScript
              </span>
              ,{' '}
              <span className="font-medium underline decoration-[#d1d5db] underline-offset-4">
                React
              </span>
              , and{' '}
              <span className="font-medium underline decoration-[#d1d5db] underline-offset-4">
                React Native
              </span>
              , while also building backend services with Python and FastAPI.
            </p>

            <p className="mt-6 text-[#6b7280] text-base md:text-[16px] font-normal leading-[1.7] max-w-2xl">
              Outside of coding, I love playing games and spending time with sports,
              especially badminton and basketball. I can play other sports too, but whether
              I’m actually good at them is another story. I always enjoy trying new things
              and simply having fun with whatever I’m doing.
            </p>
          </motion.div>
        </div>

        {/* Right column: Profile Card (Cal.com light surface) */}
        <motion.div
          variants={fadeUp}
          className="order-first lg:order-0 lg:col-span-5 w-full max-w-sm sm:max-w-md lg:max-w-105 mx-auto lg:ml-auto flex"
        >
          <div className="relative w-full rounded-3xl border border-[#e5e7eb] bg-[#ffffff] p-2.5 shadow-[0_20px_50px_-20px_rgba(17,17,17,0.08)]">
            <div className="relative w-full aspect-3/4 min-h-120 sm:min-h-132 overflow-hidden rounded-[20px] bg-[#ffffff] border border-[#e5e7eb]/70">
              <img
                src="/Profile_pics.webp"
                alt="Aditya Nugraha"
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 top-0 h-[82%] w-full object-cover object-bottom select-none"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-linear-to-t from-[#ffffff] from-42% via-[#ffffff]/90 via-75% to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-6 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#111111] leading-tight">
                  Aditya Nugraha Irwan
                </h3>

                <p className="mt-2 flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-xs sm:text-sm font-normal leading-relaxed text-[#6b7280]">
                  <span>Software Engineer</span>
                  <span aria-hidden="true" className="text-[#d1d5db] select-none">
                    |
                  </span>
                  <span>Frontend Development</span>
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://linkedin.com/in/diityanug"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn (opens in new tab)"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f8f9fa] text-[#111111] transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-[#ffffff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                    >
                      <LinkedinLogo size={20} weight="regular" aria-hidden />
                    </a>

                    <a
                      href="https://github.com/diityanug"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub (opens in new tab)"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f8f9fa] text-[#111111] transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-[#ffffff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                    >
                      <GithubLogo size={20} weight="regular" aria-hidden />
                    </a>
                  </div>

                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-[#ffffff] transition-colors duration-200 hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] shadow-2xs active:scale-[0.98]"
                  >
                    Resume
                    <span className="sr-only"> (opens in new tab)</span>
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
