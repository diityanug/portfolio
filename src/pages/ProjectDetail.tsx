import { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import {
  GithubLogo,
  CheckCircle,
  ArrowUpRight,
  UserCircle,
  CalendarBlank,
  Stack,
} from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';
import { fadeUp, staggerContainer, TRANSITION } from '../utils/animations';
import BackgroundShape from '../components/ui/BackgroundShape';
import CharaMascot, { type CharaName } from '../components/ui/CharaMascot';
import Footer from '../components/sections/Footer';
import { DATA } from '../data';

const CHARA_NAMES: readonly CharaName[] = [
  'awan',
  'bola',
  'kapsul',
  'kotak',
  'puncak',
] as const;

interface ProjectTheme {
  primaryHex: string;
  charaColors: readonly string[];
  charaMuted: string;
  shapeStroke: string;
  cardBorderHover: string;
  timelineBar: string;
  timelineDotActive: string;
}

const PROJECT_THEMES: Record<string, ProjectTheme> = {
  'genre-game-classifier': {
    primaryHex: '#ea580c',
    charaColors: ['#FB923C', '#F97316', '#F59E0B', '#EA580C', '#FDBA74'],
    charaMuted: '#FED7AA',
    shapeStroke: 'stroke-[#111111]/[0.04]',
    cardBorderHover: 'border-[#d1d5db]',
    timelineBar: 'bg-[#111111]',
    timelineDotActive: 'border-[#111111]',
  },
  lenvry: {
    primaryHex: '#0284c7',
    charaColors: ['#38BDF8', '#0EA5E9', '#60A5FA', '#0284C7', '#7DD3FC'],
    charaMuted: '#BAE6FD',
    shapeStroke: 'stroke-[#111111]/[0.04]',
    cardBorderHover: 'border-[#d1d5db]',
    timelineBar: 'bg-[#111111]',
    timelineDotActive: 'border-[#111111]',
  },
  reka: {
    primaryHex: '#059669',
    charaColors: ['#34D399', '#10B981', '#2DD4BF', '#059669', '#6EE7B7'],
    charaMuted: '#A7F3D0',
    shapeStroke: 'stroke-[#111111]/[0.04]',
    cardBorderHover: 'border-[#d1d5db]',
    timelineBar: 'bg-[#111111]',
    timelineDotActive: 'border-[#111111]',
  },
};

const DEFAULT_THEME: ProjectTheme = {
  primaryHex: '#111111',
  charaColors: ['#818CF8', '#6366F1', '#A78BFA', '#5E6AD2', '#C4B5FD'],
  charaMuted: '#E5E7EB',
  shapeStroke: 'stroke-[#111111]/[0.04]',
  cardBorderHover: 'border-[#d1d5db]',
  timelineBar: 'bg-[#111111]',
  timelineDotActive: 'border-[#111111]',
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: TRANSITION },
};

function TimelineItem({
  item,
  idx,
  theme,
}: {
  item: any;
  idx: number;
  theme: ProjectTheme;
}) {
  const isEven = idx % 2 === 0;
  const charaName = CHARA_NAMES[idx % CHARA_NAMES.length];
  const activeCharaColor = theme.charaColors[idx % theme.charaColors.length];

  const ref = useRef<HTMLDivElement>(null);
  const isActive = useInView(ref, { margin: '10000px 0px -45% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between mb-12 md:mb-24 last:mb-0 w-full group"
    >
      {/* Content Card Block */}
      <div
        className={`w-full md:w-[46%] pl-14 md:pl-0 relative ${
          isEven ? 'md:pr-10' : 'md:order-2 md:pl-10'
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-2xl border bg-surface-soft p-6 sm:p-7 md:p-8 transition-colors duration-300 ${
            isActive ? theme.cardBorderHover : 'border-[#e5e7eb]'
          }`}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="font-semibold text-xl sm:text-2xl tracking-[-0.015em] text-[#111111]">
                {item.step}
              </h4>

              <CharaMascot
                name={charaName}
                color={isActive ? activeCharaColor : theme.charaMuted}
                className={`w-15 h-18 sm:w-18 sm:h-21 shrink-0 -my-2 transition-transform duration-500 ${
                  isActive ? 'scale-105' : 'scale-95 opacity-80'
                }`}
              />
            </div>

            <p className="text-sm sm:text-base text-[#6b7280] font-normal leading-[1.6]">
              {item.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Center Timeline Dot */}
      <div
        className={`absolute left-5 md:left-1/2 top-8 md:top-1/2 w-4 h-4 bg-[#ffffff] border-[3px] rounded-full -translate-x-1/2 md:-translate-y-1/2 z-10 transition-all duration-500 shadow-[0_0_0_6px_#ffffff] ${
          isActive ? `${theme.timelineDotActive} scale-125` : 'border-[#d1d5db] scale-100'
        }`}
      />

      {/* Image Preview Block */}
      <div
        className={`w-full md:w-[46%] pl-14 md:pl-0 mt-4 md:mt-0 ${
          isEven ? 'md:order-2 md:pl-10' : 'md:pr-10'
        }`}
      >
        <div
          className={`p-1.5 rounded-2xl bg-surface-soft border transition-colors duration-300 ${
            isActive ? theme.cardBorderHover : 'border-[#e5e7eb]'
          }`}
        >
          <div className="w-full aspect-4/3 rounded-xl overflow-hidden relative bg-surface-card">
            <img
              src={item.image}
              alt={item.step}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const currentSlug = slug || 'genre-game-classifier';
  const theme = PROJECT_THEMES[currentSlug] || DEFAULT_THEME;

  const project = DATA[currentSlug] ||
    DATA['genre-game-classifier'] || {
      title: slug ? slug.replace(/-/g, ' ') : 'Project',
      subtitle: 'Project details',
      overview: 'Details for this project could not be found.',
      tags: [],
      role: 'Developer',
      timeline: '-',
      keyFeatures: [],
      challenges: '',
      overviewParagraphs: [],
      githubLink: '',
      workflow: [],
    };

  return (
    <div className="min-h-dvh bg-[#ffffff] text-[#111111] selection:bg-[#111111]/10 selection:text-[#111111] overflow-x-hidden font-sans">
      <main>
        {/* SECTION 1: Hero & Metadata Bento (Cal.com canvas) */}
        <section className="relative pt-24 md:pt-32 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden bg-[#ffffff]">
          <BackgroundShape
            initialIndex={0}
            strokeClassName={theme.shapeStroke}
            className="right-[-28vw] top-[-8vw] w-[75vw] h-[75vw] md:right-[-12vw] md:top-[2vh] md:w-[48vw] md:h-[48vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Title & Subtitle */}
              <motion.div variants={fadeUp} className="mb-10 md:mb-14">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#111111] leading-[1.06] tracking-[-0.03em] mb-4">
                  {project.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#6b7280] font-normal max-w-3xl leading-[1.6]">
                  {project.subtitle}
                </p>
              </motion.div>

              {/* Segmented Metadata Bento Grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
              >
                {/* Role Card */}
                <div className="md:col-span-3 rounded-2xl bg-surface-soft border border-[#e5e7eb] p-5 sm:p-6 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#111111]">
                    <UserCircle size={20} weight="duotone" aria-hidden />
                    <span className="text-[11px] uppercase tracking-[0.06em] font-medium text-[#6b7280]">
                      Role
                    </span>
                  </div>
                  <p className="text-[#111111] font-semibold text-base sm:text-lg tracking-[-0.015em]">
                    {project.role}
                  </p>
                </div>

                {/* Timeline Card */}
                <div className="md:col-span-3 rounded-2xl bg-surface-soft border border-[#e5e7eb] p-5 sm:p-6 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#111111]">
                    <CalendarBlank size={20} weight="duotone" aria-hidden />
                    <span className="text-[11px] uppercase tracking-[0.06em] font-medium text-[#6b7280]">
                      Timeline
                    </span>
                  </div>
                  <p className="text-[#111111] font-semibold text-base sm:text-lg tracking-[-0.015em] tabular-nums">
                    {project.timeline}
                  </p>
                </div>

                {/* Tech Stack Card */}
                <div className="md:col-span-6 rounded-2xl bg-surface-soft border border-[#e5e7eb] p-5 sm:p-6 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#111111]">
                    <Stack size={20} weight="duotone" aria-hidden />
                    <span className="text-[11px] uppercase tracking-[0.06em] font-medium text-[#6b7280]">
                      Tech Stack
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#ffffff] border border-[#e5e7eb] px-2.5 py-1 text-xs font-normal text-body"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Overview, Challenge & Highlights (Cal.com surface-soft band) */}
        <section className="relative z-10 bg-surface-soft py-20 md:py-28 px-4 md:px-8 border-t border-[#e5e7eb] overflow-hidden">
          <BackgroundShape
            initialIndex={2}
            strokeClassName="stroke-[#111111]/[0.04]"
            className="left-[-30vw] top-[10vh] w-[70vw] h-[70vw] md:left-[-16vw] md:top-[8vh] md:w-[44vw] md:h-[44vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
              {/* Left Column: Overview + Challenge Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10px' }}
                variants={fadeUp}
                className="lg:col-span-7 flex flex-col gap-6"
              >
                {/* Overview Bento Card */}
                <div className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-8 md:p-9">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#111111] mb-4 tracking-[-0.015em]">
                    Project Overview
                  </h2>
                  <p className="mb-5 font-normal text-[#111111] text-base sm:text-lg leading-[1.6]">
                    {project.overview}
                  </p>
                  {project.overviewParagraphs &&
                  project.overviewParagraphs.length > 0 ? (
                    <div className="space-y-4 text-[#6b7280] text-sm sm:text-base font-normal leading-[1.6]">
                      {project.overviewParagraphs.map(
                        (paragraph: string, pIdx: number) => (
                          <p key={pIdx}>{paragraph}</p>
                        ),
                      )}
                    </div>
                  ) : project.desc ? (
                    <p className="text-[#6b7280] text-sm sm:text-base font-normal leading-[1.6]">
                      {project.desc}
                    </p>
                  ) : null}
                </div>

                {/* Challenge Bento Card */}
                {project.challenges && (
                  <div className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-8 md:p-9">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.015em] mb-3 text-[#111111]">
                      Challenge
                    </h2>
                    <p className="text-sm sm:text-base font-normal leading-[1.6] text-[#6b7280]">
                      {project.challenges}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Right Column: Key Highlights Card (Clean Divided List) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10px' }}
                variants={slideInRight}
                className="lg:col-span-5"
              >
                <div className="rounded-2xl border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-8 md:p-9">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#111111] pb-4 mb-2 border-b border-[#e5e7eb] tracking-[-0.015em]">
                    Key Highlights
                  </h3>

                  <ul className="divide-y divide-hairline-soft mb-7">
                    {(project.keyFeatures || []).map(
                      (feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 py-3.5 first:pt-2 last:pb-0 text-body text-xs sm:text-sm font-normal"
                        >
                          <CheckCircle
                            weight="fill"
                            className="text-[#111111] mt-1 shrink-0"
                            size={17}
                          />
                          <span className="leading-[1.6]">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 bg-[#111111] text-[#ffffff] font-medium px-5 py-3.5 rounded-lg hover:bg-primary-active transition-colors duration-200 text-sm group"
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <GithubLogo size={18} weight="regular" className="shrink-0" />
                        <span className="truncate">View Source Code</span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        weight="bold"
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Process Workflow & Modules (Cal.com canvas band) */}
        <section className="relative z-10 bg-[#ffffff] pt-20 md:pt-28 pb-28 md:pb-36 px-4 md:px-8 border-t border-[#e5e7eb] overflow-hidden">
          <BackgroundShape
            initialIndex={1}
            strokeClassName={theme.shapeStroke}
            className="right-[-28vw] top-[12vh] w-[72vw] h-[72vw] md:right-[-14vw] md:top-[10vh] md:w-[46vw] md:h-[46vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-14 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#111111] tracking-tight mb-4">
                {project.workflowTitle || 'Process Workflow'}
              </h2>
              <p className="text-[#6b7280] font-normal max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-[1.6]">
                {project.workflowSubtitle ||
                  'A step-by-step breakdown of the core modules and architecture.'}
              </p>
            </div>

            <div ref={timelineRef} className="relative max-w-5xl mx-auto">
              <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-px bg-[#e5e7eb] md:-translate-x-1/2" />

              <motion.div
                className={`absolute left-5 md:left-1/2 top-4 bottom-4 w-0.5 ${theme.timelineBar} md:-translate-x-1/2 origin-top`}
                style={{ scaleY: timelineScroll }}
              />

              {(
                (project.workflow || DATA[currentSlug]?.workflow || []) as any[]
              ).map((item: any, idx: number) => (
                <TimelineItem key={idx} item={item} idx={idx} theme={theme} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
