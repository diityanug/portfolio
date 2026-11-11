import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Certificate,
  ArrowUpRight,
  CaretDown,
} from '@phosphor-icons/react';
import { fadeUp, staggerContainer } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';
import { CERTIFICATES } from '../../data';

const EDUCATIONS = [
  {
    level: 'Postgraduate Degree',
    title: 'Master of Science in Information Technology',
    school: 'President University',
    location: 'Cikarang, Indonesia',
    year: '2023 — 2025',
    gpa: '3.64',
    desc: 'Business Intelligence',
  },
  {
    level: 'Undergraduate Degree',
    title: 'Bachelor of Accounting',
    school: 'Tadulako University',
    location: 'Palu, Indonesia',
    year: '2017 — 2022',
    gpa: '3.71',
    desc: 'Financial Accounting and Taxation',
  },
] as const;

type CertCategory =
  | 'Featured'
  | 'Architecture & Security'
  | 'AI, Cloud & Data'
  | 'Engineering & Languages'
  | 'All';

interface CategorizedCertificate {
  title: string;
  issuer: string;
  year: string;
  link: string;
  category: Exclude<CertCategory, 'Featured' | 'All'>;
  featured: boolean;
}

const FEATURED_TITLES = new Set([
  'Panduan LLM untuk Developer: Dasar hingga Aplikasi Praktis',
  'Principles of Secure Coding',
  'SOLID Principles: Introducing Software Architecture & Design',
  'Clean Code',
  'Fundamentals of Software Design and Architecture Course',
  'Cloud Practitioner Essentials (Learn AWS Cloud Basic)',
]);

const categorizeCert = (title: string): Exclude<CertCategory, 'Featured' | 'All'> => {
  const lower = title.toLowerCase();
  if (
    lower.includes('architecture') ||
    lower.includes('solid') ||
    lower.includes('clean code') ||
    lower.includes('secure') ||
    lower.includes('agile') ||
    lower.includes('manajemen proyek')
  ) {
    return 'Architecture & Security';
  }
  if (
    lower.includes('llm') ||
    lower.includes('machine learning') ||
    lower.includes('cloud') ||
    lower.includes('visualisasi data') ||
    lower.includes('devops') ||
    lower.includes('sql')
  ) {
    return 'AI, Cloud & Data';
  }
  return 'Engineering & Languages';
};

const ENRICHED_CERTIFICATES: readonly CategorizedCertificate[] = CERTIFICATES.map(
  (cert) => ({
    ...cert,
    category: categorizeCert(cert.title),
    featured: FEATURED_TITLES.has(cert.title),
  }),
);

const FILTER_TABS: readonly CertCategory[] = [
  'Featured',
  'Architecture & Security',
  'AI, Cloud & Data',
  'Engineering & Languages',
  'All',
];

const VIEWPORT = { once: true, margin: '-10px' } as const;

interface CertCardProps {
  cert: CategorizedCertificate;
}

const CertCard = ({ cert }: CertCardProps) => (
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-5 rounded-2xl bg-[#ffffff] border border-[#e5e7eb] hover:border-[#d1d5db] hover:shadow-xs transition-[border-color,box-shadow] duration-200 flex flex-col justify-between gap-4 outline-none focus-visible:outline-2 focus-visible:outline-[#111111] min-h-[112px]"
  >
    {/* Top Row: Icon + Category & Year / Arrow (No icon box pill) */}
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-[#111111]">
        <Certificate size={18} weight="bold" className="text-[#111111] shrink-0" aria-hidden />
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#898989]">
          {cert.category}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs font-normal text-[#6b7280] tabular-nums">
          {cert.year}
        </span>
        <ArrowUpRight
          size={14}
          weight="bold"
          className="text-[#898989] group-hover:text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
        />
      </div>
    </div>

    {/* Title & Issuer */}
    <div>
      <h4 className="text-sm sm:text-[15px] font-medium text-[#111111] leading-snug line-clamp-2 mb-1.5 group-hover:text-[#000000]">
        {cert.title}
      </h4>
      <p className="text-xs font-normal text-[#6b7280] truncate">
        {cert.issuer}
      </p>
    </div>
  </a>
);

const Education = () => {
  const [activeCategory, setActiveCategory] = useState<CertCategory>('Featured');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const certsGridRef = useRef<HTMLDivElement>(null);

  const filteredCerts = useMemo(() => {
    if (activeCategory === 'Featured') {
      return ENRICHED_CERTIFICATES.filter((c) => c.featured);
    }
    if (activeCategory === 'All') {
      return ENRICHED_CERTIFICATES;
    }
    return ENRICHED_CERTIFICATES.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  // If 8 or fewer cards, show all cleanly without an artificial toggle
  const initialCerts = useMemo(() => {
    if (filteredCerts.length <= 8) {
      return filteredCerts;
    }
    return filteredCerts.slice(0, 6);
  }, [filteredCerts]);

  const extraCerts = useMemo(() => {
    if (filteredCerts.length <= 8) {
      return [];
    }
    return filteredCerts.slice(6);
  }, [filteredCerts]);

  const hasExtra = extraCerts.length > 0;

  const handleTabChange = (tab: CertCategory) => {
    setActiveCategory(tab);
    setIsExpanded(false);
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      const el = certsGridRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        // If top of grid scrolled past viewport, scroll top cleanly into view
        if (rect.top < 80) {
          const targetY = window.scrollY + rect.top - 100;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth',
          });
        }
      }
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <section
      id="education"
      tabIndex={-1}
      aria-labelledby="education-heading"
      className="pt-20 md:pt-28 pb-24 md:pb-32 px-4 md:px-8 bg-[#f8f9fa] relative z-10 overflow-hidden border-t border-[#e5e7eb] outline-none"
    >
      <BackgroundShape
        initialIndex={3}
        strokeClassName="stroke-[#111111]/[0.04]"
        className="right-[-28vw] top-[10vh] w-[75vw] h-[75vw] md:right-[-12vw] md:top-[8vh] md:w-[46vw] md:h-[46vw]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-12 md:mb-20"
        >
          <ScrollFillHeading
            id="education-heading"
            line1="Academic"
            line2="Background."
          />
        </motion.div>

        {/* PART 1: Academic Degrees (Refined Architectural Cards) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-20 md:mb-28"
        >
          {EDUCATIONS.map((edu) => (
            <motion.div
              key={edu.title}
              variants={fadeUp}
              className="group relative rounded-2xl bg-[#ffffff] border border-[#e5e7eb] hover:border-[#111111]/30 hover:shadow-[0_16px_36px_-16px_rgba(17,17,17,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Top Row: Degree Level & Period (Clean divider row, zero pills) */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-6 sm:mb-7 border-b border-[#f3f4f6]">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                      <GraduationCap size={17} weight="bold" className="text-[#111111]" aria-hidden />
                      <span>{edu.level}</span>
                    </div>

                    <span className="text-xs font-medium text-[#6b7280] tabular-nums shrink-0">
                      {edu.year}
                    </span>
                  </div>

                  {/* Degree Title & Institution */}
                  <div>
                    <h3 className="text-xl sm:text-[22px] font-semibold text-[#111111] tracking-[-0.02em] leading-snug mb-2 md:min-h-[60px]">
                      {edu.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-[#4b5563]">
                      <span className="font-semibold text-[#111111]">{edu.school}</span>
                      <span aria-hidden="true" className="text-[#d1d5db]">•</span>
                      <span className="inline-flex items-center gap-1.5 text-[#6b7280]">
                        <MapPin size={14} weight="duotone" className="text-[#898989] shrink-0" />
                        <span>{edu.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Shelf: Focus & GPA */}
                <div className="mt-8 pt-5 border-t border-[#f0f1f3] flex items-end justify-between gap-4">
                  <p className="min-w-0 text-xs sm:text-sm font-medium text-[#111111] leading-snug">
                    {edu.desc}
                  </p>

                  <div className="text-right shrink-0">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-2xl sm:text-3xl font-semibold text-[#111111] tabular-nums tracking-tight">
                        {edu.gpa}
                      </span>
                      <span className="text-xs font-normal text-[#6b7280]">/ 4.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PART 2: Certifications */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="flex flex-col gap-6 mb-8 md:mb-10"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111111] tracking-[-0.025em]">
              Certifications
            </h3>

            {/* Category Filter Tabs (Fixed container, zero underline, bold active, hidden scrollbar) */}
            <div
              role="tablist"
              aria-label="Filter certifications by category"
              className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2.5"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeCategory === tab;
                const count =
                  tab === 'Featured'
                    ? ENRICHED_CERTIFICATES.filter((c) => c.featured).length
                    : tab === 'All'
                      ? ENRICHED_CERTIFICATES.length
                      : ENRICHED_CERTIFICATES.filter((c) => c.category === tab).length;

                return (
                  <button
                    key={tab}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(tab)}
                    className={`inline-flex items-center text-xs sm:text-sm py-1 transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                      isActive
                        ? 'text-[#111111] font-bold'
                        : 'text-[#6b7280] font-normal hover:text-[#111111]'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`ml-1.5 text-xs tabular-nums ${
                        isActive ? 'text-[#111111] font-bold' : 'text-[#9ca3af] font-normal'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Symmetrical 2-Column Grid Container */}
          <div ref={certsGridRef} className="relative w-full scroll-mt-28">
            {/* Initial Grid (Always in DOM) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {initialCerts.map((cert) => (
                <CertCard key={cert.title} cert={cert} />
              ))}
            </div>

            {/* Smooth Height-Animated Accordion for Extra Cards */}
            <AnimatePresence initial={false}>
              {isExpanded && hasExtra && (
                <motion.div
                  key="extra-certs-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.45, ease: 'easeOut', delay: 0.05 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.35, ease: 'easeInOut' },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-3.5 sm:pt-4">
                    {extraCerts.map((cert) => (
                      <CertCard key={cert.title} cert={cert} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clean Expand / Collapse Button (Cal.com button-secondary style, zero pills) */}
            {hasExtra && (
              <div className="mt-8 flex justify-center relative z-20">
                <button
                  type="button"
                  onClick={handleToggleExpand}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffffff] border border-[#e5e7eb] hover:border-[#111111] hover:bg-[#f8f9fa] text-xs sm:text-sm font-medium text-[#111111] transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  <span>{isExpanded ? 'Show Less' : `Show All (${filteredCerts.length})`}</span>
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`text-[#6b7280] group-hover:text-[#111111] transition-transform duration-500 ease-out ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
