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
    <div className="min-h-dvh bg-[#ffffff] text-[#111111] selection:bg-[#111111]/10 selection:text-[#111111] overflow-x-hidden font-sans">
      <main>
        {/* SECTION 1: Hero & Role Overview Bento (Cal.com canvas) */}
        <section className="relative pt-24 md:pt-32 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden bg-[#ffffff]">
          <BackgroundShape
            initialIndex={1}
            strokeClassName="stroke-[#111111]/[0.04]"
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

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#111111] leading-[1.06] tracking-[-0.03em]">
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
                  <div className="rounded-2xl bg-surface-soft border border-[#e5e7eb] p-5 sm:p-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ffffff] border border-[#e5e7eb] flex items-center justify-center shrink-0 text-[#111111]">
                      <MapPin size={20} weight="duotone" aria-hidden />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.06em] font-medium text-[#6b7280] mb-0.5">
                        Status
                      </span>
                      <span className="font-semibold text-[#111111] text-base sm:text-lg tracking-[-0.015em]">
                        {career.status}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-surface-soft border border-[#e5e7eb] p-5 sm:p-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ffffff] border border-[#e5e7eb] flex items-center justify-center shrink-0 text-[#111111]">
                      <CalendarBlank size={20} weight="duotone" aria-hidden />
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-[0.06em] font-medium text-[#6b7280] mb-0.5">
                        Period
                      </span>
                      <span className="font-semibold text-[#111111] text-base sm:text-lg tracking-[-0.015em] tabular-nums">
                        {career.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Role Overview Card */}
                <div className="lg:col-span-8 rounded-2xl border border-[#e5e7eb] bg-surface-soft p-6 sm:p-8 md:p-9 flex flex-col justify-center relative overflow-hidden">
                  <div className="flex items-center gap-2 text-[#6b7280] mb-3">
                    <Briefcase size={18} weight="duotone" aria-hidden />
                    <h2 className="text-xs font-medium uppercase tracking-[0.06em]">
                      Role Overview
                    </h2>
                  </div>
                  <p className="font-normal text-[#111111] text-base sm:text-lg leading-[1.6]">
                    {career.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Key Contributions (Cal.com surface-soft band + Clean Divided List) */}
        {career.contributions && career.contributions.length > 0 && (
          <section className="relative z-10 bg-surface-soft py-20 md:py-28 px-4 md:px-8 border-t border-[#e5e7eb] overflow-hidden">
            <BackgroundShape
              initialIndex={3}
              strokeClassName="stroke-[#111111]/[0.04]"
              className="left-[-28vw] top-[10vh] w-[72vw] h-[72vw] md:left-[-15vw] md:top-[8vh] md:w-[45vw] md:h-[45vw]"
            />

            <div className="max-w-6xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-10 md:mb-14">
                Key Contributions
              </h2>

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
                    className="group rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-7 flex flex-col relative overflow-hidden transition-colors duration-200 hover:border-[#d1d5db]"
                  >
                    <h3 className="font-semibold text-[#111111] text-lg sm:text-xl pb-4 mb-2 border-b border-[#e5e7eb] tracking-[-0.015em]">
                      {c.project}
                    </h3>

                    <ul className="flex flex-col divide-y divide-hairline-soft list-none p-0">
                      {c.tasks.map((task: string, tIdx: number) => (
                        <li
                          key={tIdx}
                          className="flex gap-3 items-start py-3.5 first:pt-2 last:pb-0 text-body text-xs sm:text-sm font-normal leading-[1.6]"
                        >
                          <CheckCircle
                            weight="fill"
                            size={16}
                            className="text-[#111111] shrink-0 mt-1"
                          />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* SECTION 3: Culture & Activities (Cal.com canvas band) */}
        {career.culture && career.culture.length > 0 && (
          <section className="relative z-10 bg-[#ffffff] pt-20 md:pt-28 pb-28 md:pb-36 px-4 md:px-8 border-t border-[#e5e7eb] overflow-hidden">
            <BackgroundShape
              initialIndex={0}
              strokeClassName="stroke-[#111111]/[0.04]"
              className="right-[-28vw] top-[8vh] w-[72vw] h-[72vw] md:right-[-14vw] md:top-[6vh] md:w-[45vw] md:h-[45vw]"
            />

            <div className="max-w-6xl mx-auto relative z-10">
              <h2 className="text-2xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-10 md:mb-14">
                Culture &amp; Activities
              </h2>

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
                    className="group p-3 rounded-2xl bg-surface-soft border border-[#e5e7eb] transition-colors duration-200 hover:border-[#d1d5db] flex flex-col gap-3.5"
                  >
                    <div className="w-full h-44 sm:h-48 rounded-xl bg-surface-card border border-[#e5e7eb] overflow-hidden relative shrink-0">
                      <img
                        src={c.photo}
                        alt={c.activity}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-1 pb-1 flex-1">
                      <h4 className="font-semibold text-[#111111] text-base sm:text-lg mb-1.5 tracking-[-0.015em]">
                        {c.activity}
                      </h4>
                      <p className="text-[#6b7280] text-xs sm:text-sm font-normal leading-[1.6]">
                        {c.desc}
                      </p>
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
