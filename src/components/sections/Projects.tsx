import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
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
  type: 'web' | 'mobile';
  visualBg: string;
  visualBorder: string;
  glowColor: string;
  categoryColor: string;
  btnHover: string;
}

const PROJECTS: readonly Project[] = [
  {
    slug: 'genre-game-classifier',
    title: 'Genre Game Classifier',
    category: 'Machine Learning Web App',
    tags: ['React', 'TypeScript', 'FastAPI', 'Python', 'Scikit-Learn', 'spaCy'],
    image: '/Genre Game Cover.png',
    type: 'web',
    visualBg: 'bg-linear-to-br from-[#FFF7ED] via-[#FFEDD5]/60 to-[#FED7AA]/35',
    visualBorder: 'border-orange-200/60',
    glowColor: 'rgba(249, 115, 22, 0.18)',
    categoryColor: 'text-[#C2410C]',
    btnHover: 'hover:bg-[#EA580C]',
  },
  {
    slug: 'lenvry',
    title: 'Lenvry',
    category: 'Personal Life OS Mobile App',
    tags: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'SQLite', 'Zod'],
    image: '/Lenvrtt-removebg-preview.png',
    type: 'mobile',
    visualBg: 'bg-linear-to-br from-[#F0F9FF] via-[#E0F2FE]/60 to-[#BAE6FD]/35',
    visualBorder: 'border-sky-200/60',
    glowColor: 'rgba(2, 132, 199, 0.18)',
    categoryColor: 'text-[#0369A1]',
    btnHover: 'hover:bg-[#0284C7]',
  },
  {
    slug: 'reka',
    title: 'REKA',
    category: 'Personal Finance Mobile App',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Gemini AI', 'Biometric'],
    image: '/reka-cover.png',
    type: 'mobile',
    visualBg: 'bg-linear-to-br from-[#ECFDF5] via-[#D1FAE5]/60 to-[#A7F3D0]/35',
    visualBorder: 'border-emerald-200/60',
    glowColor: 'rgba(5, 150, 105, 0.18)',
    categoryColor: 'text-[#047857]',
    btnHover: 'hover:bg-[#059669]',
  },
];

const STORAGE_KEY = 'portfolio_active_project_idx';

const getInitialIndex = (): number => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < PROJECTS.length) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return 1; // Default to center card (Lenvry)
};

const VIEWPORT = { once: true, margin: '-10px' } as const;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState<number>(getInitialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingByCode = useRef(false);

  // Scroll target card to horizontal center
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
      behavior: smooth ? 'smooth' : 'instant',
    });

    setTimeout(() => {
      isScrollingByCode.current = false;
    }, 450);
  }, []);

  // Detect which card is currently centered during scroll
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
      try {
        sessionStorage.setItem(STORAGE_KEY, closestIndex.toString());
      } catch {
        // ignore
      }
    }
  }, [activeIndex]);

  // Synchronous positioning on mount: sets scrollLeft BEFORE browser paints (0ms jump)
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const initIdx = getInitialIndex();
    const card = container.children[initIdx] as HTMLElement;
    if (card) {
      const scrollTarget =
        card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollLeft = Math.max(0, scrollTarget);
    }
  }, []);

  // Ensure alignment after layout stabilizes
  useEffect(() => {
    const initIdx = getInitialIndex();
    scrollToCard(initIdx, false);
  }, [scrollToCard]);

  // Maintain center alignment on window resize
  useEffect(() => {
    const handleResize = () => {
      scrollToCard(activeIndex, false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, scrollToCard]);

  const updateActiveIndex = (newIdx: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, newIdx));
    setActiveIndex(clamped);
    scrollToCard(clamped, true);
    try {
      sessionStorage.setItem(STORAGE_KEY, clamped.toString());
    } catch {
      // ignore
    }
  };

  const handlePrev = () => updateActiveIndex(activeIndex - 1);
  const handleNext = () => updateActiveIndex(activeIndex + 1);

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="pt-20 md:pt-32 pb-24 md:pb-36 bg-[#FAFAFA] relative z-10 overflow-hidden rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline outline-none"
    >
      <BackgroundShape
        initialIndex={2}
        strokeClassName="stroke-primary/8"
        className="left-[-28vw] top-[8vh] w-[72vw] h-[72vw] md:left-[-15vw] md:top-[6vh] md:w-[48vw] md:h-[48vw]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-8 md:mb-12 px-4 md:px-8"
        >
          <ScrollFillHeading
            id="projects-heading"
            line1="Personal"
            line2="Projects."
          />
        </motion.div>

        {/* Carousel Container (Native touch swipe on mobile, smooth scroll, zero jump on refresh) */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative flex items-center gap-3.5 sm:gap-4 lg:gap-6 overflow-x-auto py-6 sm:py-10 px-[11vw] sm:px-[18vw] lg:px-[calc((100vw-420px)/2)] snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {PROJECTS.map((project, idx) => {
            const isCenter = idx === activeIndex;

            return (
              <div
                key={project.slug}
                onClick={() => {
                  if (!isCenter) {
                    updateActiveIndex(idx);
                  }
                }}
                className={`snap-center shrink-0 w-[78vw] sm:w-90 lg:w-105 transition-all duration-500 ease-out select-none ${
                  isCenter
                    ? 'scale-100 opacity-100 brightness-100 z-20 cursor-default'
                    : 'scale-[0.88] sm:scale-[0.86] opacity-35 brightness-50 hover:opacity-60 hover:brightness-75 z-10 cursor-pointer'
                }`}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Portrait Card Container (Memanjang ke Bawah) */}
                <div
                  className={`group relative h-full rounded-[26px] sm:rounded-4xl bg-white border transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                    isCenter
                      ? 'border-black/10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14)] ring-1 ring-black/5'
                      : 'border-hairline shadow-xs'
                  }`}
                >
                  {/* Top Visual Area (Spacious & Clean) */}
                  <div
                    className={`w-[calc(100%-16px)] sm:w-[calc(100%-20px)] mx-auto mt-2 sm:mt-2.5 rounded-[20px] sm:rounded-[26px] border ${project.visualBorder} ${project.visualBg} flex items-center justify-center p-3.5 sm:p-5 h-47.5 sm:h-56.25 lg:h-61.25 relative overflow-hidden transition-all duration-500 shrink-0`}
                  >
                    {/* Ambient Glow */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${project.glowColor}, transparent 70%)`,
                      }}
                    />

                    {project.type === 'web' ? (
                      /* Web App Minimalist Browser Window Frame */
                      <div className="relative z-10 w-full max-w-57.5 sm:max-w-67.5 rounded-xl overflow-hidden shadow-lg border border-black/10 bg-white transition-transform duration-500 group-hover:scale-[1.03]">
                        <div className="h-5 bg-black/4 border-b border-black/5 px-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                          <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                        </div>
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                          className="w-full aspect-16/10 object-cover object-top"
                        />
                      </div>
                    ) : (
                      /* Mobile App Floating Phone Mockup */
                      <div className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                          className="h-36 sm:h-44 w-auto max-w-32.5 sm:max-w-40 object-contain drop-shadow-xl"
                        />
                      </div>
                    )}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="flex-1 flex flex-col justify-between p-4.5 sm:p-5 lg:p-6 pt-4 sm:pt-5">
                    <div>
                      {/* Category Label */}
                      <span
                        className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] ${project.categoryColor} mb-2 block`}
                      >
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-ink uppercase tracking-[-0.03em] leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Architectural Tech Stack Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-black/4 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-ink/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-3 sm:pt-3.5 border-t border-black/6 flex items-center justify-end">
                      <Link
                        to={`/project/${project.slug}`}
                        tabIndex={isCenter ? 0 : -1}
                        aria-label={`View detail for ${project.title}`}
                        onClick={(e) => {
                          if (!isCenter) {
                            e.preventDefault();
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-full bg-[#18181B] px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 ${project.btnHover} hover:shadow-md ${
                          isCenter ? 'cursor-pointer' : 'pointer-events-none'
                        } group/btn`}
                      >
                        <span>View Detail</span>
                        <ArrowUpRight
                          size={14}
                          weight="bold"
                          aria-hidden
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls (Arrows + Dot Indicators) */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/10 bg-white/90 shadow-2xs flex items-center justify-center text-ink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-ink hover:enabled:text-white hover:enabled:border-ink active:enabled:scale-95 cursor-pointer"
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-white/80 border border-black/5 shadow-2xs">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => updateActiveIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 sm:w-6 bg-ink'
                    : 'w-1.5 sm:w-2 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === PROJECTS.length - 1}
            aria-label="Next project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/10 bg-white/90 shadow-2xs flex items-center justify-center text-ink transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-ink hover:enabled:text-white hover:enabled:border-ink active:enabled:scale-95 cursor-pointer"
          >
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
