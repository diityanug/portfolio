import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';
import LGSinarmasLogo from '../../assets/LG_Sinarmas_Logo_Vector.svg';

const EXPERIENCE = {
  title: 'Software Engineer',
  year: '2025 — Present',
  slug: 'software-engineer-lg',
  logo: LGSinarmasLogo,
  tags: ['React', 'TypeScript', 'AWS S3', 'Automation', 'Oracle DB'],
} as const;

const VIEWPORT = { once: true, margin: '-10px' } as const;

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand/60';

const Experience = () => {
  const item = EXPERIENCE;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 overflow-hidden rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline outline-none"
    >
      <BackgroundShape
        initialIndex={1}
        strokeClassName="stroke-brand/7"
        className="right-[-28vw] top-[-8vw] w-[75vw] h-[75vw] md:right-[-14vw] md:top-[4vh] md:w-[46vw] md:h-[46vw]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-12 md:mb-20"
        >
          <ScrollFillHeading
            id="experience-heading"
            line1="Professional"
            line2="Experience."
          />
        </motion.div>

        {/* Experience Bento Card */}
        <div className="max-w-md md:max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={scaleIn}
            className="w-full"
          >
            <div className="group block h-full rounded-[28px] sm:rounded-4xl md:rounded-[38px]">
              {/* Outer Frame — Static position, glows on hover + mouse spotlight */}
              <div
                onMouseMove={handleMouseMove}
                className="relative p-1.5 rounded-[28px] sm:rounded-4xl md:rounded-[38px] bg-white border border-hairline shadow-sm transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none group-hover:border-brand/60 group-hover:shadow-[0_0_50px_-6px_rgba(188,18,55,0.32)]"
              >
                {/* Outer Cursor Border Spotlight Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[28px] sm:rounded-4xl md:rounded-[38px]"
                  style={{
                    background:
                      'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 35%), rgba(188, 18, 55, 0.28), transparent 70%)',
                  }}
                />

                {/* Inner Card Canvas (Spacious on mobile, generous padding on desktop) */}
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-4xl border border-[#FDA4AF]/80 bg-linear-to-b from-[#FFD4DF] via-[#FFE3EA] to-[#FFC4D4] px-6 py-8 sm:px-10 sm:py-11 md:px-14 md:py-12 flex flex-col items-center text-center transition-colors duration-500 group-hover:border-brand/50">
                  {/* Dynamic Cursor Spotlight Glow overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[inherit]"
                    style={{
                      background:
                        'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 35%), rgba(255, 255, 255, 0.65), transparent 75%)',
                    }}
                  />

                  {/* Top Row: Year Text on the Left */}
                  <div className="relative z-20 w-full flex items-center justify-start">
                    <span className="text-[11px] sm:text-xs md:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#541221]/90">
                      {item.year}
                    </span>
                  </div>

                  {/* Center Visual + Title */}
                  <div className="relative z-20 mt-8 sm:mt-10 md:mt-14 flex flex-col items-center w-full">
                    <img
                      src={item.logo}
                      alt="LG Sinarmas"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-48 sm:w-60 md:w-76 h-auto object-contain select-none drop-shadow-[0_8px_18px_rgba(188,18,55,0.10)]"
                    />

                    <h3 className="mt-4 sm:mt-5 md:mt-6 whitespace-nowrap text-xl sm:text-[32px] md:text-[40px] font-black uppercase tracking-[-0.02em] text-[#1f1c1d] leading-tight transition-colors duration-300 motion-reduce:transition-none group-hover:text-brand">
                      {item.title}
                    </h3>
                  </div>

                  {/* Centered Skills Tags (Generous breathing room from title, harmonized with Crimson/Rose Theme) */}
                  <ul className="relative z-20 mt-9 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-sm sm:max-w-none mx-auto">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-lg bg-brand/9 hover:bg-brand/14 border border-brand/15 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs md:text-[13px] font-bold text-[#6D0E23] tracking-tight transition-colors"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Row: Dark Pill CTA on the Right */}
                  <div className="relative z-20 w-full mt-9 sm:mt-11 md:mt-12 pt-5 sm:pt-6 border-t border-brand/12 flex items-center justify-end">
                    <Link
                      to={`/career/${item.slug}`}
                      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#231f20] px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors duration-300 motion-reduce:transition-none hover:bg-brand ${focusRing}`}
                    >
                      <span>View Detail</span>
                      <ArrowUpRight size={15} weight="bold" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
