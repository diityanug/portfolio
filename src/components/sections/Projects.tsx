import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';
import { DATA } from '../../data';

interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: readonly string[];
  image: string;
  type: 'web' | 'mobile';
}

const PROJECTS: readonly Project[] = [
  {
    slug: 'genre-game-classifier',
    title: 'Genre Game Classifier',
    category: 'Machine Learning Web App',
    summary: DATA['genre-game-classifier'].subtitle,
    tags: ['React', 'TypeScript', 'FastAPI', 'Python', 'Scikit-Learn', 'spaCy'],
    image: '/Genre Game Cover.png',
    type: 'web',
  },
  {
    slug: 'lenvry',
    title: 'Lenvry',
    category: 'Personal Life OS Mobile App',
    summary: DATA['lenvry'].subtitle,
    tags: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'SQLite', 'Zod'],
    image: '/Lenvrtt-removebg-preview.png',
    type: 'mobile',
  },
  {
    slug: 'reka',
    title: 'REKA',
    category: 'Personal Finance Mobile App',
    summary: DATA['reka'].subtitle,
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Gemini AI', 'Biometric'],
    image: '/reka-cover.png',
    type: 'mobile',
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

  // Synchronous positioning on mount
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
      className="pt-20 md:pt-28 pb-24 md:pb-32 bg-[#ffffff] relative z-10 overflow-hidden border-t border-[#e5e7eb] outline-none"
    >
      <BackgroundShape
        initialIndex={2}
        strokeClassName="stroke-[#111111]/[0.04]"
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

        {/* Carousel Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="relative flex items-stretch gap-3.5 sm:gap-4 lg:gap-6 overflow-x-auto py-6 sm:py-10 px-[11vw] sm:px-[18vw] lg:px-[calc((100vw-420px)/2)] snap-x snap-mandatory scroll-smooth no-scrollbar"
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
                role="group"
                tabIndex={isCenter ? -1 : 0}
                aria-label={
                  isCenter
                    ? project.title
                    : `Select ${project.title}`
                }
                onClick={() => {
                  if (!isCenter) {
                    updateActiveIndex(idx);
                  }
                }}
                onKeyDown={(e) => {
                  if (!isCenter && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    updateActiveIndex(idx);
                  }
                }}
                className={`snap-center shrink-0 w-[78vw] sm:w-90 lg:w-105 transition-all duration-500 ease-out select-none outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] rounded-3xl ${
                  isCenter
                    ? 'scale-100 opacity-100 z-20 cursor-default'
                    : 'scale-[0.88] sm:scale-[0.86] opacity-45 hover:opacity-75 z-10 cursor-pointer'
                }`}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Portrait Card Container (Cal.com DESIGN.md surface-soft / canvas) */}
                <div
                  className={`group relative h-full rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                    isCenter
                      ? 'bg-[#ffffff] border-[#d1d5db] shadow-[0_20px_50px_-20px_rgba(17,17,17,0.12)]'
                      : 'bg-[#f8f9fa] border-[#e5e7eb]'
                  }`}
                >
                  {/* Top Visual Area */}
                  <div className="w-[calc(100%-16px)] sm:w-[calc(100%-20px)] mx-auto mt-2 sm:mt-2.5 rounded-[18px] border border-[#e5e7eb] bg-[#f5f5f5] flex items-center justify-center p-3.5 sm:p-5 h-47.5 sm:h-56.25 lg:h-61.25 relative overflow-hidden transition-all duration-500 shrink-0">
                    {project.type === 'web' ? (
                      /* Web App Minimalist Browser Window Frame */
                      <div className="relative z-10 w-full max-w-57.5 sm:max-w-67.5 rounded-xl overflow-hidden border border-[#e5e7eb] bg-[#ffffff] shadow-sm transition-transform duration-500 group-hover:scale-[1.03]">
                        <div className="h-5 bg-[#f8f9fa] border-b border-[#e5e7eb] px-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]" />
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
                          className="h-36 sm:h-44 w-auto max-w-32.5 sm:max-w-40 object-contain drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="flex-1 flex flex-col justify-between p-4.5 sm:p-5 lg:p-6 pt-4 sm:pt-5">
                    <div>
                      {/* Category Label */}
                      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#6b7280] mb-1.5 block">
                        {project.category}
                      </span>

                      {/* Title (weight 600 per Cal.com DESIGN.md title-lg) */}
                      <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-[#111111] tracking-[-0.02em] leading-snug mb-2">
                        {project.title}
                      </h3>

                      {/* Short Recruiter Summary */}
                      <p className="text-xs sm:text-[13px] font-normal text-[#6b7280] leading-[1.55] mb-4">
                        {project.summary}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4 sm:mb-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-[#f5f5f5] border border-[#e5e7eb] px-2.5 py-1 text-[11px] sm:text-xs font-normal text-[#374151]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row (Cal.com #111111 primary CTA) */}
                    <div className="pt-3.5 border-t border-[#e5e7eb] flex items-center justify-end">
                      <Link
                        to={`/project/${project.slug}`}
                        tabIndex={isCenter ? 0 : -1}
                        aria-label={`View detail for ${project.title}`}
                        onClick={(e) => {
                          if (!isCenter) {
                            e.preventDefault();
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-medium text-[#ffffff] transition-colors duration-200 hover:bg-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] ${
                          isCenter ? 'cursor-pointer' : 'pointer-events-none'
                        }`}
                      >
                        <span>View Detail</span>
                        <ArrowUpRight
                          size={14}
                          weight="bold"
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#e5e7eb] bg-[#ffffff] flex items-center justify-center text-[#111111] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-[#f5f5f5] active:enabled:scale-95 cursor-pointer"
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-[#f8f9fa] border border-[#e5e7eb]">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => updateActiveIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 sm:w-6 bg-[#111111]'
                    : 'w-1.5 sm:w-2 bg-[#d1d5db] hover:bg-[#9ca3af]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === PROJECTS.length - 1}
            aria-label="Next project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#e5e7eb] bg-[#ffffff] flex items-center justify-center text-[#111111] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-[#f5f5f5] active:enabled:scale-95 cursor-pointer"
          >
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
