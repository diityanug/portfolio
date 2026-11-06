import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
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
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BC1237]/60';

const Experience = () => {
  const item = EXPERIENCE;

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline outline-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-14 md:mb-20"
        >
          <ScrollFillHeading
            id="experience-heading"
            line1="Professional"
            line2="Experience."
          />
        </motion.div>

        {/* Experience Card */}
        <div className="max-w-md md:max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={scaleIn}
            className="w-full"
          >
            <Link
              to={`/career/${item.slug}`}
              className={`group block h-full rounded-4xl md:rounded-[38px] ${focusRing}`}
            >
              {/* Outer Frame — Static position, glows on hover */}
              <div className="p-1.5 rounded-4xl md:rounded-[38px] bg-white border border-hairline shadow-sm transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none group-hover:border-[#BC1237]/60 group-hover:shadow-[0_0_50px_-6px_rgba(188,18,55,0.32)]">
                {/* Inner Card Canvas */}
                <div className="relative overflow-hidden rounded-[26px] md:rounded-[32px] border border-[#FDA4AF]/80 bg-linear-to-b from-[#FFD4DF] via-[#FFE3EA] to-[#FFC4D4] px-7 py-8 sm:px-10 sm:py-11 md:px-14 md:py-12 flex flex-col items-center text-center transition-colors duration-500 group-hover:border-[#BC1237]/50">
                  {/* Ambient hover glow overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.6),transparent_70%)]"
                  />

                  {/* Top Row: Plain Year Text on the Left */}
                  <div className="relative z-20 w-full flex items-center justify-start">
                    <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#4a202a]/85">
                      {item.year}
                    </span>
                  </div>

                  {/* Center Visual + Title */}
                  <div className="relative z-20 mt-10 sm:mt-14 flex flex-col items-center">
                    <img
                      src={item.logo}
                      alt="LG Sinarmas"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-52 sm:w-68 md:w-76 h-auto object-contain select-none drop-shadow-[0_8px_18px_rgba(188,18,55,0.10)]"
                    />

                    <h3 className="mt-5 sm:mt-6 whitespace-nowrap text-[clamp(20px,6vw,28px)] sm:text-[34px] md:text-[40px] font-black uppercase tracking-[-0.02em] text-[#1f1c1d] leading-[1.08] transition-colors duration-300 motion-reduce:transition-none group-hover:text-[#BC1237]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Centered Skills Pills */}
                  <ul className="relative z-20 mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-75 sm:max-w-none mx-auto">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white/85 border border-black/5 px-4 py-1.5 text-xs sm:text-[13px] font-bold text-ink shadow-2xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Row: Dark Pill CTA on the Right */}
                  <div className="relative z-20 w-full mt-10 sm:mt-12 pt-6 border-t border-[#BC1237]/12 flex items-center justify-end">
                    <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[#231f20] px-7 sm:px-8 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-colors duration-300 motion-reduce:transition-none group-hover:bg-[#BC1237]">
                      <span>View Detail</span>
                      <ArrowUpRight size={16} weight="bold" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
