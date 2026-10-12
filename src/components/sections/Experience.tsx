import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import LGSinarmasLogo from '../../assets/LG_Sinarmas_Logo_Vector.svg';

const EXPERIENCE = {
  title: 'Software Engineer',
  place: 'LG Sinarmas',
  year: '2025 — Present',
  slug: 'software-engineer-lg',
  logo: LGSinarmasLogo,
  desc: 'Supporting Smart Factory operations through automated process modeling and server monitoring, while developing scalable enterprise applications using React, TypeScript, and Microfrontend Architecture.',
  tags: ['React', 'TypeScript', 'Microfrontends', 'AWS S3'],
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
          <h2
            id="experience-heading"
            className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase"
          >
            Professional <br className="hidden md:block" />
            Experience.
          </h2>
        </motion.div>

        {/* Experience Bento Card */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={scaleIn}
            className="w-full"
          >
            <Link
              to={`/career/${item.slug}`}
              className={`group block h-full rounded-3xl md:rounded-[36px] ${focusRing}`}
            >
              {/* Outer Frame */}
              <div className="p-1.5 rounded-3xl md:rounded-[36px] bg-white border border-hairline shadow-sm transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none group-hover:border-brand/40 group-hover:shadow-2xl group-hover:shadow-[#BC1237]/10">
                {/* Inner Bento Canvas */}
                <div className="bg-linear-to-br from-[#FFF5F6] via-[#FFEBEF] to-[#FED7E2]/50 rounded-[22px] md:rounded-[30px] p-7 sm:p-9 md:p-12 relative overflow-hidden border border-[#FECDD3] flex flex-col justify-between min-h-95 md:min-h-105">
                  {/* Ambient glow */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700 motion-reduce:transition-none bg-[radial-gradient(circle_closest-side,rgba(188,18,55,0.10),transparent)]"
                  />

                  {/* Mobile watermark */}
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute inset-y-0 right-0 w-16 flex items-center justify-center pointer-events-none"
                  >
                    <img
                      src={item.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-110 max-w-none shrink-0 h-auto rotate-90 object-contain opacity-10 select-none"
                    />
                  </div>

                  {/* Desktop watermark */}
                  <img
                    src={item.logo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="hidden md:block absolute -bottom-5 -right-2 w-130 h-auto object-contain contrast-125 opacity-25 group-hover:opacity-50 pointer-events-none select-none transition-opacity duration-700 ease-out motion-reduce:transition-none"
                  />

                  {/* Top Row: Brand Avatar + Details & Action Circle */}
                  <div className="relative z-10 flex items-center justify-between gap-4 mb-8 sm:mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-black/5 shadow-xs p-2.5 flex items-center justify-center shrink-0 transition-[scale] duration-300 motion-reduce:transition-none group-hover:scale-105">
                        <img
                          src={item.logo}
                          alt=""
                          width={64}
                          height={64}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <p className="text-lg sm:text-xl font-bold text-ink tracking-tight">
                          {item.place}
                        </p>
                        <span className="text-steel text-xs sm:text-sm font-semibold">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-ink border border-black/5 shadow-xs flex items-center justify-center shrink-0 transition-[background-color,color,rotate] duration-300 motion-reduce:transition-none group-hover:bg-ink group-hover:text-white group-hover:rotate-45">
                      <ArrowRight size={20} weight="bold" aria-hidden />
                    </div>
                  </div>

                  {/* Middle Row: Title & Overview */}
                  <div className="relative z-10 max-w-2xl mb-8 sm:mb-10">
                    <h3 className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-ink tracking-tight leading-[1.15] mb-3.5 transition-colors duration-300 motion-reduce:transition-none group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="text-[#4a4a4a] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Row: Tech Stack Pills & Action Link */}
                  <div className="relative z-10 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                    <ul className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full text-xs md:text-[13px] font-semibold bg-white/90 border border-black/5 text-ink shadow-xs transition-colors duration-300 motion-reduce:transition-none group-hover:border-black/15"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-2 text-xs md:text-[13px] font-bold uppercase tracking-wider text-ink shrink-0 transition-colors duration-300 motion-reduce:transition-none group-hover:text-brand">
                      View Case Study
                      <ArrowRight
                        size={14}
                        weight="bold"
                        aria-hidden
                        className="transition-[translate] duration-300 motion-reduce:transition-none group-hover:translate-x-1.5"
                      />
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