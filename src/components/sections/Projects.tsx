import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';

interface Project {
  slug: string;
  title: string;
  category: string;
  tags: readonly string[];
  image: string;
  imageClass: string;
  canvas: string;
  frameGlow: string;
  spotlightBorder: string;
  innerBorderHover: string;
  categoryColor: string;
  titleHover: string;
  dividerBorder: string;
  btnHover: string;
}

const PROJECTS: readonly Project[] = [
  {
    slug: 'genre-game-classifier',
    title: 'Genre Game Classifier',
    category: 'Machine Learning Web App',
    tags: ['React', 'TypeScript', 'FastAPI', 'Python', 'NLP', 'Machine Learning'],
    image: '/Genre Game Cover.png',
    imageClass:
      'w-full max-w-56 h-32 sm:h-36 object-cover object-top rounded-xl shadow-md ring-1 ring-black/10',
    canvas: 'bg-linear-to-b from-[#FFE8CC] via-[#FFF2E2] to-[#FFD8A8] border-[#FDBA74]/80',
    frameGlow:
      'group-hover:border-[#F97316]/60 group-hover:shadow-[0_0_40px_-6px_rgba(249,115,22,0.3)]',
    spotlightBorder: 'rgba(249, 115, 22, 0.3)',
    innerBorderHover: 'group-hover:border-[#F97316]/50',
    categoryColor: 'text-[#7C2D12]/85',
    titleHover: 'group-hover:text-[#C2410C]',
    dividerBorder: 'border-[#C2410C]/12',
    btnHover: 'group-hover:bg-[#EA580C]',
  },
  {
    slug: 'lenvry',
    title: 'Lenvry',
    category: 'Mobile Application',
    tags: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'Database', 'Mobile'],
    image: '/Lenvrtt-removebg-preview.png',
    imageClass: 'h-32 sm:h-36 w-auto object-contain drop-shadow-lg',
    canvas: 'bg-linear-to-b from-[#D8F1FF] via-[#E8F7FF] to-[#BAE6FD] border-[#7DD3FC]/80',
    frameGlow:
      'group-hover:border-[#0284C7]/60 group-hover:shadow-[0_0_40px_-6px_rgba(2,132,199,0.3)]',
    spotlightBorder: 'rgba(2, 132, 199, 0.3)',
    innerBorderHover: 'group-hover:border-[#0284C7]/50',
    categoryColor: 'text-[#0C4A6E]/85',
    titleHover: 'group-hover:text-[#0369A1]',
    dividerBorder: 'border-[#0369A1]/12',
    btnHover: 'group-hover:bg-[#0284C7]',
  },
  {
    slug: 'reka',
    title: 'REKA',
    category: 'Personal Finance Mobile App',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Gemini AI', 'Mobile'],
    image: '/reka-cover.png',
    imageClass: 'h-32 sm:h-36 w-auto object-contain drop-shadow-lg',
    canvas: 'bg-linear-to-b from-[#D1FAE5] via-[#E6FBF0] to-[#A7F3D0] border-[#6EE7B7]/80',
    frameGlow:
      'group-hover:border-[#059669]/60 group-hover:shadow-[0_0_40px_-6px_rgba(5,150,105,0.3)]',
    spotlightBorder: 'rgba(5, 150, 105, 0.28)',
    innerBorderHover: 'group-hover:border-[#059669]/50',
    categoryColor: 'text-[#064E3B]/85',
    titleHover: 'group-hover:text-[#047857]',
    dividerBorder: 'border-[#047857]/12',
    btnHover: 'group-hover:bg-[#059669]',
  },
];

const VIEWPORT = { once: true, margin: '-10px' } as const;

const Projects = () => {
  // Start with center item (index 1 = Lenvry)
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingByCode = useRef(false);

  // Scroll center card into container view
  const scrollToCard = useCallback((index: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;

    isScrollingByCode.current = true;
    const scrollTarget =
      card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;

    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: smooth ? 'smooth' : 'auto',
    });

    setTimeout(() => {
      isScrollingByCode.current = false;
    }, 450);
  }, []);

  // Sync scroll position to detect which card is currently centered
  const handleScroll = useCallback(() => {
    if (isScrollingByCode.current) return;
    const container = containerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  // Center initial active card on mount
  useEffect(() => {
    scrollToCard(1, false);
  }, [scrollToCard]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    setActiveIndex(nextIdx);
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(PROJECTS.length - 1, activeIndex + 1);
    setActiveIndex(nextIdx);
    scrollToCard(nextIdx);
  };

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 overflow-hidden rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline outline-none"
    >
      <BackgroundShape
        initialIndex={2}
        strokeClassName="stroke-primary/[0.08]"
        className="-left-[28vw] top-[8vh] w-[72vw] h-[72vw] md:-left-[15vw] md:top-[6vh] md:w-[48vw] md:h-[48vw]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <ScrollFillHeading
            id="projects-heading"
            line1="Personal"
            line2="Projects."
          />

          {/* Carousel Slider Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto pb-1 sm:pb-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="w-11 h-11 rounded-full border border-black/10 bg-white/90 shadow-2xs flex items-center justify-center text-ink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-ink hover:enabled:text-white hover:enabled:border-ink active:enabled:scale-95"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToCard(idx);
                  }}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-6 bg-ink'
                      : 'w-2 bg-black/20 hover:bg-black/40'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === PROJECTS.length - 1}
              aria-label="Next project"
              className="w-11 h-11 rounded-full border border-black/10 bg-white/90 shadow-2xs flex items-center justify-center text-ink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-ink hover:enabled:text-white hover:enabled:border-ink active:enabled:scale-95"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </motion.div>

        {/* 3D Coverflow / Center Carousel Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative flex items-center gap-5 sm:gap-7 lg:gap-8 overflow-x-auto py-8 sm:py-10 px-[10vw] sm:px-[18vw] lg:px-[22vw] snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROJECTS.map((project, idx) => {
            const isCenter = idx === activeIndex;
            const titleId = `project-${project.slug}-title`;

            return (
              <div
                key={project.slug}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(idx);
                    scrollToCard(idx);
                  }
                }}
                className={`snap-center shrink-0 w-[82vw] sm:w-[380px] lg:w-[410px] transition-all duration-500 ease-out cursor-pointer ${
                  isCenter
                    ? 'scale-100 opacity-100 brightness-100 z-20'
                    : 'scale-[0.88] sm:scale-90 opacity-40 brightness-60 hover:opacity-75 hover:brightness-85 z-10'
                }`}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  aria-labelledby={titleId}
                  tabIndex={isCenter ? 0 : -1}
                  className="block h-full outline-none group focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] rounded-[28px]"
                >
                  {/* Outer Frame — Glows & Highlights */}
                  <div
                    onMouseMove={handleCardMouseMove}
                    className={`relative h-full p-1.5 rounded-[28px] bg-white border transition-all duration-500 ${
                      isCenter
                        ? `border-black/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.14)] ${project.frameGlow}`
                        : 'border-hairline shadow-sm'
                    }`}
                  >
                    {/* Outer Cursor Border Spotlight Glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[28px]"
                      style={{
                        background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 35%), ${project.spotlightBorder}, transparent 70%)`,
                      }}
                    />

                    {/* Inner Card Canvas */}
                    <div
                      className={`relative h-full overflow-hidden rounded-[22px] border p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-colors duration-500 ${project.canvas} ${project.innerBorderHover}`}
                    >
                      {/* Dynamic Cursor Spotlight Glow overlay */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[inherit]"
                        style={{
                          background:
                            'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 35%), rgba(255,255,255,0.65), transparent 75%)',
                        }}
                      />

                      {/* Top Row: Plain Category Text on the Left */}
                      <div className="relative z-20 w-full flex items-center justify-start">
                        <span
                          className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] ${project.categoryColor}`}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Center Visual + Title */}
                      <div className="relative z-20 mt-4 sm:mt-5 flex flex-col items-center w-full">
                        <div
                          aria-hidden="true"
                          className="w-full flex items-center justify-center pointer-events-none select-none mask-[linear-gradient(to_bottom,black_65%,transparent_100%)]"
                        >
                          <img
                            src={project.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className={project.imageClass}
                          />
                        </div>

                        <h3
                          id={titleId}
                          className={`mt-2.5 text-lg sm:text-xl font-black uppercase tracking-[-0.02em] text-[#1f1c1d] leading-snug transition-colors duration-300 ${project.titleHover}`}
                        >
                          {project.title}
                        </h3>
                      </div>

                      {/* Centered Skill Pills */}
                      <ul className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-1.5">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-white/85 border border-black/5 px-2.5 py-1 text-[11px] font-bold text-ink shadow-2xs"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      {/* Bottom Row: Dark Pill CTA */}
                      <div
                        className={`relative z-20 w-full mt-5 pt-4 border-t ${project.dividerBorder} flex items-center justify-end`}
                      >
                        <span
                          className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[#231f20] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-300 ${project.btnHover}`}
                        >
                          <span>View Detail</span>
                          <ArrowUpRight size={14} weight="bold" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
