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
import Nav from '../components/sections/Nav';
import BackgroundShape from '../components/ui/BackgroundShape';
import Footer from '../components/sections/Footer';
import { DATA } from '../data';

interface ProjectTheme {
  primaryHex: string;
  shapeStroke: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder?: string;
  iconText: string;
  cardBorderHover: string;
  cardShadowActive: string;
  challengeCardBg: string;
  challengeCardBorder: string;
  challengeTitle: string;
  challengeText: string;
  checkIcon: string;
  buttonHoverBg: string;
  timelineBar: string;
  timelineDotActive: string;
}

const PROJECT_THEMES: Record<string, ProjectTheme> = {
  'genre-game-classifier': {
    primaryHex: '#ea580c',
    shapeStroke: 'stroke-[#ea580c]/[0.08]',
    badgeBg: 'bg-[#ea580c]/10',
    badgeText: 'text-[#c2410c]',
    iconText: 'text-[#ea580c]',
    cardBorderHover: 'border-[#ea580c]/40',
    cardShadowActive: 'shadow-[0_24px_60px_-15px_rgba(234,88,12,0.15)]',
    challengeCardBg: 'bg-linear-to-br from-[#FFF7ED] to-[#FFEDD5]/70',
    challengeCardBorder: 'border-[#FDBA74]/80',
    challengeTitle: 'text-[#7C2D12]',
    challengeText: 'text-[#9A3412]/90',
    checkIcon: 'text-[#ea580c]',
    buttonHoverBg: 'hover:bg-[#ea580c]',
    timelineBar: 'bg-[#ea580c]',
    timelineDotActive: 'border-[#ea580c]',
  },
  lenvry: {
    primaryHex: '#0284c7',
    shapeStroke: 'stroke-[#0284c7]/[0.08]',
    badgeBg: 'bg-[#0284c7]/10',
    badgeText: 'text-[#0369a1]',
    iconText: 'text-[#0284c7]',
    cardBorderHover: 'border-[#0284c7]/40',
    cardShadowActive: 'shadow-[0_24px_60px_-15px_rgba(2,132,199,0.15)]',
    challengeCardBg: 'bg-linear-to-br from-[#F0F9FF] to-[#E0F2FE]/70',
    challengeCardBorder: 'border-[#BAE6FD]/80',
    challengeTitle: 'text-[#0C4A6E]',
    challengeText: 'text-[#075985]/90',
    checkIcon: 'text-[#0284c7]',
    buttonHoverBg: 'hover:bg-[#0284c7]',
    timelineBar: 'bg-[#0284c7]',
    timelineDotActive: 'border-[#0284c7]',
  },
  reka: {
    primaryHex: '#059669',
    shapeStroke: 'stroke-[#059669]/[0.08]',
    badgeBg: 'bg-[#059669]/10',
    badgeText: 'text-[#047857]',
    iconText: 'text-[#059669]',
    cardBorderHover: 'border-[#059669]/40',
    cardShadowActive: 'shadow-[0_24px_60px_-15px_rgba(5,150,105,0.15)]',
    challengeCardBg: 'bg-linear-to-br from-[#ECFDF5] to-[#D1FAE5]/70',
    challengeCardBorder: 'border-[#A7F3D0]/80',
    challengeTitle: 'text-[#064E3B]',
    challengeText: 'text-[#065F46]/90',
    checkIcon: 'text-[#059669]',
    buttonHoverBg: 'hover:bg-[#059669]',
    timelineBar: 'bg-[#059669]',
    timelineDotActive: 'border-[#059669]',
  },
};

const DEFAULT_THEME: ProjectTheme = {
  primaryHex: '#5e6ad2',
  shapeStroke: 'stroke-primary/[0.08]',
  badgeBg: 'bg-primary/10',
  badgeText: 'text-primary',
  iconText: 'text-primary',
  cardBorderHover: 'border-primary/40',
  cardShadowActive: 'shadow-[0_24px_60px_-15px_rgba(86,69,212,0.14)]',
  challengeCardBg: 'bg-linear-to-br from-[#EEF2FF] to-[#E0E7FF]/60',
  challengeCardBorder: 'border-[#C7D2FE]/80',
  challengeTitle: 'text-[#1E1B4B]',
  challengeText: 'text-[#312E81]/90',
  checkIcon: 'text-primary',
  buttonHoverBg: 'hover:bg-primary',
  timelineBar: 'bg-primary',
  timelineDotActive: 'border-primary',
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
  const numString = (idx + 1).toString().padStart(2, '0');

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
          className={`relative overflow-hidden rounded-3xl border bg-white p-6 sm:p-7 md:p-8 transition-[border-color,box-shadow] duration-500 ${
            isActive
              ? `${theme.cardBorderHover} ${theme.cardShadowActive}`
              : 'border-hairline shadow-xs'
          }`}
        >
          {/* Background Watermark Number */}
          <span
            aria-hidden="true"
            className="absolute right-4 top-2 text-[84px] sm:text-[96px] font-black leading-none select-none pointer-events-none transition-colors duration-500"
            style={{
              color: isActive
                ? `${theme.primaryHex}20`
                : 'rgba(0, 0, 0, 0.04)',
            }}
          >
            {numString}
          </span>

          <div className="relative z-10 pr-12">
            <h4
              className="font-bold text-xl sm:text-2xl mb-2.5 tracking-tight transition-colors duration-500"
              style={{ color: isActive ? theme.primaryHex : '#1a1a1a' }}
            >
              {item.step}
            </h4>
            <p className="text-sm sm:text-base text-steel leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Center Timeline Dot */}
      <div
        className={`absolute left-5 md:left-1/2 top-8 md:top-1/2 w-4 h-4 bg-white border-[3px] rounded-full -translate-x-1/2 md:-translate-y-1/2 z-10 transition-all duration-500 shadow-[0_0_0_6px_#FAFAFA] ${
          isActive ? `${theme.timelineDotActive} scale-125` : 'border-black/20 scale-100'
        }`}
      />

      {/* Image Preview Block */}
      <div
        className={`w-full md:w-[46%] pl-14 md:pl-0 mt-4 md:mt-0 ${
          isEven ? 'md:order-2 md:pl-10' : 'md:pr-10'
        }`}
      >
        <div
          className={`p-1.5 rounded-3xl bg-white border transition-[border-color,box-shadow] duration-500 ${
            isActive
              ? `${theme.cardBorderHover} ${theme.cardShadowActive}`
              : 'border-hairline shadow-xs'
          }`}
        >
          <div className="w-full aspect-video md:aspect-4/3 rounded-[18px] overflow-hidden relative bg-[#F4F4F6]">
            <img
              src={item.image}
              alt={item.step}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
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
    <div className="min-h-dvh bg-[#FAFAFA] selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <Nav />

      <main>
        {/* SECTION 1: Hero & Metadata Bento */}
        <section className="relative pt-24 md:pt-32 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden bg-[#FAFAFA]">
          <BackgroundShape
            initialIndex={0}
            strokeClassName={theme.shapeStroke}
            className="-right-[28vw] -top-[8vw] w-[75vw] h-[75vw] md:-right-[12vw] md:top-[2vh] md:w-[48vw] md:h-[48vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Title & Subtitle */}
              <motion.div variants={fadeUp} className="mb-10 md:mb-14">
                <h1 className="text-4xl sm:text-6xl md:text-[80px] font-black text-ink leading-[0.96] tracking-[-0.04em] uppercase mb-5">
                  {project.title}.
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-steel font-medium tracking-tight max-w-3xl leading-relaxed">
                  {project.subtitle}
                </p>
              </motion.div>

              {/* Segmented Metadata Bento Grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
              >
                {/* Role Card */}
                <div className="md:col-span-3 rounded-3xl bg-white border border-hairline p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-3">
                  <div className={`flex items-center gap-2 ${theme.iconText}`}>
                    <UserCircle size={20} weight="duotone" aria-hidden />
                    <span className="text-[11px] uppercase tracking-widest font-extrabold text-steel">
                      Role
                    </span>
                  </div>
                  <p className="text-ink font-bold text-base sm:text-lg tracking-tight">
                    {project.role}
                  </p>
                </div>

                {/* Timeline Card */}
                <div className="md:col-span-3 rounded-3xl bg-white border border-hairline p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-3">
                  <div className={`flex items-center gap-2 ${theme.iconText}`}>
                    <CalendarBlank size={20} weight="duotone" aria-hidden />
                    <span className="text-[11px] uppercase tracking-widest font-extrabold text-steel">
                      Timeline
                    </span>
                  </div>
                  <p className="text-ink font-bold text-base sm:text-lg tracking-tight">
                    {project.timeline}
                  </p>
                </div>

                {/* Tech Stack Card */}
                <div className="md:col-span-6 rounded-3xl bg-white border border-hairline p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-3">
                  <div className={`flex items-center gap-2 ${theme.iconText}`}>
                    <Stack size={20} weight="duotone" aria-hidden />
                    <span className="text-[11px] uppercase tracking-widest font-extrabold text-steel">
                      Tech Stack
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-bold text-ink bg-[#F4F4F7] border border-black/5 px-3 py-1 rounded-full"
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

        {/* SECTION 2: Overview, Challenge & Highlights (Segmented White Canvas) */}
        <section className="relative z-10 bg-white rounded-t-[40px] md:rounded-t-[64px] -mt-8 py-20 md:py-28 px-4 md:px-8 border-t border-hairline overflow-hidden shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
          <BackgroundShape
            initialIndex={2}
            strokeClassName="stroke-black/[0.045]"
            className="-left-[30vw] top-[10vh] w-[70vw] h-[70vw] md:-left-[16vw] md:top-[8vh] md:w-[44vw] md:h-[44vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-10 md:mb-14">
              <span
                className={`inline-flex items-center rounded-full ${theme.badgeBg} px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest ${theme.badgeText}`}
              >
                Architecture &amp; Context
              </span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

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
                <div className="rounded-3xl border border-hairline bg-[#FAFAFA] p-6 sm:p-8 md:p-9">
                  <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4 tracking-tight">
                    Project Overview
                  </h2>
                  <p className="mb-5 font-semibold text-ink text-base sm:text-lg leading-relaxed">
                    {project.overview}
                  </p>
                  {project.overviewParagraphs &&
                  project.overviewParagraphs.length > 0 ? (
                    <div className="space-y-4 text-steel text-sm sm:text-base leading-relaxed">
                      {project.overviewParagraphs.map(
                        (paragraph: string, pIdx: number) => (
                          <p key={pIdx}>{paragraph}</p>
                        ),
                      )}
                    </div>
                  ) : project.desc ? (
                    <p className="text-steel text-sm sm:text-base leading-relaxed">
                      {project.desc}
                    </p>
                  ) : null}
                </div>

                {/* Challenge Bento Card */}
                {project.challenges && (
                  <div
                    className={`rounded-3xl border p-6 sm:p-8 md:p-9 ${theme.challengeCardBg} ${theme.challengeCardBorder}`}
                  >
                    <h2
                      className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 ${theme.challengeTitle}`}
                    >
                      Challenge
                    </h2>
                    <p className={`text-sm sm:text-base leading-relaxed ${theme.challengeText}`}>
                      {project.challenges}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Right Column: Key Highlights Sticky Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10px' }}
                variants={slideInRight}
                className="lg:col-span-5 lg:sticky lg:top-24"
              >
                <div className="rounded-3xl border border-hairline bg-[#FAFAFA] p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-bold text-ink mb-5 tracking-tight">
                    Key Highlights
                  </h3>

                  <ul className="space-y-3 mb-7">
                    {(project.keyFeatures || []).map(
                      (feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 rounded-2xl bg-white border border-black/5 p-3.5 text-ink/85 text-xs sm:text-sm font-medium shadow-2xs"
                        >
                          <CheckCircle
                            weight="fill"
                            className={`${theme.checkIcon} mt-0.5 shrink-0`}
                            size={18}
                          />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-2 bg-ink text-white font-bold uppercase tracking-wider px-5 py-3.5 rounded-2xl ${theme.buttonHoverBg} transition-colors duration-300 text-xs group`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <GithubLogo size={18} weight="bold" className="shrink-0" />
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

        {/* SECTION 3: Process Workflow & Modules (Segmented Tinted Canvas) */}
        <section className="relative z-10 bg-[#FAFAFA] rounded-t-[40px] md:rounded-t-[64px] -mt-8 pt-20 md:pt-28 pb-28 md:pb-36 px-4 md:px-8 border-t border-hairline overflow-hidden shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
          <BackgroundShape
            initialIndex={1}
            strokeClassName={theme.shapeStroke}
            className="-right-[28vw] top-[12vh] w-[72vw] h-[72vw] md:-right-[14vw] md:top-[10vh] md:w-[46vw] md:h-[46vw]"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-10 md:mb-14">
              <span
                className={`inline-flex items-center rounded-full ${theme.badgeBg} px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest ${theme.badgeText}`}
              >
                System Walkthrough
              </span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

            <div className="text-center mb-14 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight uppercase mb-4">
                {project.workflowTitle || 'Process Workflow'}
              </h2>
              <p className="text-steel max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                {project.workflowSubtitle ||
                  'A step-by-step breakdown of the core modules and architecture.'}
              </p>
            </div>

            <div ref={timelineRef} className="relative max-w-5xl mx-auto">
              <div className="absolute left-5 md:left-1/2 top-4 bottom-4 w-px bg-black/10 md:-translate-x-1/2" />

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
