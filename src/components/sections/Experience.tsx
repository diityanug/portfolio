import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';
import LGSinarmasLogo from '../../assets/LG_Sinarmas_Logo_Vector.svg';
import { DATA } from '../../data';

const CAREER_DATA = DATA['software-engineer-lg'];

const EXPERIENCE = {
  title: 'Software Engineer',
  year: '2025 — Present',
  slug: 'software-engineer-lg',
  logo: LGSinarmasLogo,
  summary: CAREER_DATA.desc,
  tags: ['React', 'TypeScript', 'AWS S3', 'Automation', 'Oracle DB'],
} as const;

const VIEWPORT = { once: true, margin: '-10px' } as const;

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]';

const Experience = () => {
  const item = EXPERIENCE;

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className="pt-20 md:pt-28 pb-24 md:pb-32 px-4 md:px-8 bg-[#f8f9fa] relative z-10 overflow-hidden border-t border-[#e5e7eb] outline-none"
    >
      <BackgroundShape
        initialIndex={1}
        strokeClassName="stroke-[#111111]/[0.04]"
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

        {/* Experience Card: 2-Column Split Landscape Layout */}
        <div className="max-w-md md:max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={scaleIn}
            className="w-full"
          >
            <Link
              to={`/career/${item.slug}`}
              className={`group block h-full rounded-3xl relative p-1.5 bg-[#ffffff] border border-[#e5e7eb] shadow-[0_12px_36px_-16px_rgba(17,17,17,0.06)] transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none hover:border-[#d1d5db] hover:shadow-[0_20px_48px_-16px_rgba(17,17,17,0.10)] ${focusRing}`}
            >
              {/* Inner Card Surface */}
              <div className="relative overflow-hidden rounded-[18px] border border-[#f3f4f6] bg-[#f8f9fa] p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-colors duration-300 group-hover:bg-[#ffffff]">
                {/* Top Row: Period on the Right */}
                <div className="relative z-10 w-full flex items-center justify-end border-b border-[#e5e7eb] pb-3 mb-6 sm:mb-8">
                  <span className="text-xs font-medium text-[#6b7280] tabular-nums">
                    {item.year}
                  </span>
                </div>

                {/* Main Middle Body: 2-Column Split */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center text-left">
                  {/* Left Column: Brand Logo + Role Title */}
                  <div className="md:col-span-5 flex flex-col items-start gap-3 sm:gap-4">
                    <img
                      src={item.logo}
                      alt="LG Sinarmas"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-44 sm:w-52 h-auto object-contain select-none"
                    />

                    <h3 className="text-2xl sm:text-3xl font-semibold text-[#111111] tracking-[-0.025em] leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Right Column: Scope Summary + Tech Stack Tags */}
                  <div className="md:col-span-7 flex flex-col justify-center gap-4">
                    <p className="text-sm sm:text-base font-normal text-[#374151] leading-[1.6]">
                      {item.summary}
                    </p>

                    <ul className="flex flex-wrap gap-2 pt-1 list-none p-0">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md bg-[#ffffff] border border-[#e5e7eb] px-2.5 py-1 text-xs font-normal text-[#374151] shadow-2xs"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Row: View Detail Action on the Right */}
                <div className="relative z-10 mt-8 pt-5 border-t border-[#e5e7eb] flex items-center justify-end w-full">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-5 py-2.5 text-xs font-medium text-[#ffffff] transition-colors duration-200 group-hover:bg-[#242424]">
                    <span>View Detail</span>
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
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
