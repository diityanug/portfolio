import { motion } from 'framer-motion';
import {
  MapPin,
  CalendarBlank,
  CheckCircle,
  Briefcase,
} from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../utils/animations';
import BackgroundShape from '../components/ui/BackgroundShape';
import Footer from '../components/sections/Footer';
import LGSinarmasLogo from '../assets/LG_Sinarmas_Logo_Vector.svg';
import { DATA } from '../data';

export default function CareerDetail() {
  const { slug } = useParams();

  const career = DATA[slug || ''] || {
    title: slug?.replace(/-/g, ' '),
    status: 'Unknown',
    date: 'Unknown',
    desc: 'Details for this career could not be found.',
    contributions: [],
    culture: [],
  };

  return (
    <div className="min-h-dvh bg-[#FAFAFA] selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">

      <main>
        {/* SECTION 1: Hero & Role Overview Bento */}
        <section className="relative pt-24 md:pt-32 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden bg-[#FAFAFA]">
          <BackgroundShape
            initialIndex={1}
            strokeClassName="stroke-brand/7"
            className="right-[-28vw] top-[-8vw] w-[75vw] h-[75vw] md:right-[-12vw] md:top-[2vh] md:w-[48vw] md:h-[48vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Brand Logo & Main Title */}
              <motion.div variants={fadeUp} className="mb-10 md:mb-14">
                <div className="mb-5 sm:mb-6">
                  <img
                    src={LGSinarmasLogo}
                    alt="LG Sinarmas"
                    className="h-6 sm:h-7 md:h-8 w-auto object-contain"
                  />
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-[76px] font-black text-ink leading-[0.95] tracking-[-0.04em] uppercase">
                  {career.title}
                </h1>
              </motion.div>

              {/* Segmented Bento Grid: Status + Timeline + Role Overview */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-stretch"
              >
                {/* Left Column: Status & Period Tiles */}
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="rounded-3xl bg-white border border-hairline p-5 sm:p-6 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center shrink-0 text-brand">
                      <MapPin size={22} weight="duotone" aria-hidden />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-widest font-extrabold text-steel">
                        Status
                      </span>
                      <span className="font-bold text-ink text-base sm:text-lg">
                        {career.status}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white border border-hairline p-5 sm:p-6 shadow-xs flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center shrink-0 text-brand">
                      <CalendarBlank size={22} weight="duotone" aria-hidden />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-widest font-extrabold text-steel">
                        Period
                      </span>
                      <span className="font-bold text-ink text-base sm:text-lg">
                        {career.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Role Overview Card */}
                <div className="lg:col-span-8 rounded-3xl border border-[#FDA4AF]/70 bg-linear-to-br from-[#FFF5F6] via-[#FFEBEF] to-[#FED7E2]/50 p-6 sm:p-8 md:p-9 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 text-brand mb-3">
                    <Briefcase size={18} weight="duotone" aria-hidden />
                    <h2 className="text-xs font-extrabold uppercase tracking-widest">
                      Role Overview
                    </h2>
                  </div>
                  <p className="font-semibold text-ink text-base sm:text-lg md:text-xl leading-relaxed">
                    {career.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Key Contributions (Segmented White Section) */}
        {career.contributions && career.contributions.length > 0 && (
          <section className="relative z-10 bg-white rounded-t-[40px] md:rounded-t-[64px] -mt-8 py-20 md:py-28 px-4 md:px-8 border-t border-hairline overflow-hidden shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
            <BackgroundShape
              initialIndex={3}
              strokeClassName="stroke-black/[0.045]"
              className="left-[-28vw] top-[10vh] w-[72vw] h-[72vw] md:left-[-15vw] md:top-[8vh] md:w-[45vw] md:h-[45vw]"
            />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="flex items-center gap-3 mb-10 md:mb-14">
                <span className="inline-flex items-center rounded-full bg-[#FFF1F2] border border-[#FECDD3] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-brand">
                  Key Contributions
                </span>
                <div className="h-px flex-1 bg-hairline" />
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10px' }}
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              >
                {career.contributions.map((c: any, idx: number) => (
                  <div
                    key={idx}
                    className="group rounded-3xl border border-hairline bg-[#FAFAFA] p-6 sm:p-7 flex flex-col relative overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-brand/45 hover:shadow-[0_20px_50px_-15px_rgba(188,18,55,0.14)]"
                  >
                    <h3 className="font-bold text-ink text-lg sm:text-xl pb-4 mb-5 border-b border-black/8 tracking-tight group-hover:text-brand transition-colors">
                      {c.project}
                    </h3>

                    <ul className="flex flex-col gap-3.5 list-none p-0 mt-auto">
                      {c.tasks.map((task: string, tIdx: number) => (
                        <li
                          key={tIdx}
                          className="flex gap-3 items-start rounded-2xl bg-white border border-black/5 p-3.5 text-steel text-xs sm:text-sm leading-relaxed shadow-2xs"
                        >
                          <CheckCircle
                            weight="fill"
                            size={17}
                            className="text-brand shrink-0 mt-0.5"
                          />
                          <span className="text-ink/85">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* SECTION 3: Culture & Activities (Segmented Tinted Section) */}
        {career.culture && career.culture.length > 0 && (
          <section className="relative z-10 bg-[#FAFAFA] rounded-t-[40px] md:rounded-t-[64px] -mt-8 pt-20 md:pt-28 pb-28 md:pb-36 px-4 md:px-8 border-t border-hairline overflow-hidden shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
            <BackgroundShape
              initialIndex={0}
              strokeClassName="stroke-brand/6"
              className="right-[-28vw] top-[8vh] w-[72vw] h-[72vw] md:right-[-14vw] md:top-[6vh] md:w-[45vw] md:h-[45vw]"
            />

            <div className="max-w-6xl mx-auto relative z-10">
              <div className="flex items-center gap-3 mb-10 md:mb-14">
                <span className="inline-flex items-center rounded-full bg-[#FFF1F2] border border-[#FECDD3] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-brand">
                  Culture &amp; Activities
                </span>
                <div className="h-px flex-1 bg-hairline" />
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10px' }}
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
              >
                {career.culture.map((c: any, idx: number) => (
                  <div
                    key={idx}
                    className="group p-1.5 rounded-3xl bg-white border border-hairline shadow-xs transition-[border-color,box-shadow] duration-500 hover:border-brand/40 hover:shadow-[0_20px_45px_-12px_rgba(188,18,55,0.15)] flex flex-col"
                  >
                    <div className="rounded-[18px] bg-[#FAFAFA] border border-black/5 p-3.5 flex flex-col gap-4 h-full">
                      <div className="w-full h-44 sm:h-48 rounded-xl bg-black/5 overflow-hidden relative shrink-0">
                        <img
                          src={c.photo}
                          alt={c.activity}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-1 pb-1 flex-1">
                        <h4 className="font-bold text-ink text-base sm:text-lg mb-1.5 group-hover:text-brand transition-colors">
                          {c.activity}
                        </h4>
                        <p className="text-steel text-xs sm:text-sm leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
