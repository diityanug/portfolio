import { useState } from 'react';
import type { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { popUpVariants } from '@utils/animation';

// IMPORT STATIC DOT GRID DI SINI
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

/* MAIN DATA */
const experiences = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'LG Sinarmas',
    location: 'Central Jakarta, Indonesia',
    period: 'June 2025 — Present',
    logo: '/LG_Sinarmas_Logo_Vector.svg',
    tags: ['React', 'TypeScript', 'AWS S3', 'RBAC', 'LMS', 'HRIS', 'Battery Manufacturing', 'Equipment Modeling', 'MCCS Configuration'],
    description: (
      <div className="flex flex-col gap-2">
        <p className="text-justify">
          Contributing to the smart manufacturing ecosystem through two core roles — autonomous process control and fault detection — while also involved in internal software development covering resource management and organizational learning systems.
        </p>
      </div>
    ),
    contributions: [
      {
        system: "APC (Autonomous Process Control)",
        icon: "⚙️",
        points: [
          "Equipment modeling and integration using the Factova platform",
          "Anomaly and alarm analysis across manufacturing processes",
          "Machine failure validation to ensure operational reliability",
          "MCCS configuration management across eight production sites"
        ]
      },
      {
        system: "FDC (Fault Detection and Classification)",
        icon: "🔍",
        points: [
          "User access administration within the FDC system",
          "Assigning and adjusting user roles — from not available and view only to engineer — based on each user's needs and requests"
        ]
      },
      {
        system: "HRIS (Human Resource Integrated System)",
        icon: "👥",
        points: [
          "Developed asset management features to streamline internal resource tracking",
          "Integrated secure cloud storage modules using AWS S3",
          "Implemented precise Role-Based Access Control (RBAC) navigation"
        ]
      },
      {
        system: "LMS (Learning Management System)",
        icon: "📚",
        points: [
          "Maintained internal learning systems through proactive bug fixing and codebase refactoring",
          "Optimized application state and interface reliability to ensure seamless training delivery"
        ]
      }
    ],
    culture: [
      {
        id: 1,
        title: "Sport - Futsal",
        image: "/images/culture-synergy.jpg",
        description: "Engaging in routine technical alignments and cross-cultural engineering syncs with core engineering teams based in South Korea."
      },
      {
        id: 2,
        title: "The Growth Circuit",
        image: "/images/culture-mentorship.jpg",
        description: "Participating in internal tech talks, architectural review boards, and collaborative bonding initiatives to foster strong engineering practices."
      }
    ]
  },
];

/* SLEEK EXPAND ICON */
const ExpandIcon = ({ open }: { open: boolean }) => (
  <motion.span
    animate={{ rotate: open ? 45 : 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center justify-center w-6 h-6 text-[#1A2F24] shrink-0 ml-4"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </motion.span>
);

/* MINIMALIST ACCORDION ROW */
type AccordionRowProps = {
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const AccordionRow = ({ icon, title, subtitle, children }: AccordionRowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#2E4C38]/20 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left group transition-colors hover:bg-[#2E4C38]/[0.02]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="text-xl md:text-2xl shrink-0 opacity-80">{icon}</span>
          <div className="flex-1 min-w-0">
            <h5 className="font-['The_Seasons_Regular'] font-bold text-base md:text-lg text-[#1A2F24] leading-snug break-words">
              {title}
            </h5>
            {subtitle && (
              <span className={`font-['The_Seasons_Regular'] text-sm text-[#4A6750]/60 block mt-1 transition-opacity duration-300 ${open ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <ExpandIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 pl-[44px] md:pl-[52px] pr-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* MAIN PAGE */
const ExperiencePage = (): ReactElement => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
  };

  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Varian Teks Judul
  const typingChar: Variants = {
    hidden: { opacity: 0, y: 15, rotate: -5 },
    show: { 
      opacity: 1, y: 0, rotate: 0,
      transition: { type: "spring", damping: 16, stiffness: 140 }
    }
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.2, staggerChildren: 0.2 } 
    }
  };

  const delayedContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.5, staggerChildren: 0.2 } 
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-32 lg:pt-40 px-6 md:px-12 lg:px-16 pb-24 min-h-screen bg-[#F9F8F4] overflow-x-hidden"
    >
      {/* ===== BACKGROUND STATIC DOT GRID DI SINI ===== */}
      <StaticDotGrid />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          
          <motion.div 
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            className="flex flex-col md:flex-row md:flex-wrap gap-x-6 gap-y-2"
          >
            <h1 className="font-hatton font-normal text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight flex">
              <div className="text-[#1A2F24] flex">
                {"WORK".split("").map((char, i) => (
                  <motion.span key={`work-${i}`} variants={typingChar} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>
            <h1 className="font-hatton font-normal text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight flex">
              <div className="text-[#4A6750] flex">
                {"EXPERIENCE".split("").map((char, i) => (
                  <motion.span key={`exp-${i}`} variants={typingChar} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>
          </motion.div>

          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2 md:text-right shrink-0 border-l-2 md:border-l-0 md:border-r-2 border-[#4A6750] pl-4 md:pl-0 md:pr-4"
          >
            <motion.span variants={popUpVariants} className="font-['The_Seasons_Regular'] text-sm text-[#4A6750]/80">
              {experiences[0].period}
            </motion.span>
          </motion.div>
        </div>

        {/* MAIN EXPERIENCE LIST */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={delayedContainerVariants}
          className="flex flex-col w-full"
        >
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id} 
              variants={popUpVariants}
              className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 pb-16 pt-8 border-t border-[#2E4C38]/20"
            >
              {/* LEFT — Sleek Identity sidebar */}
              <div className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-32 lg:self-start flex flex-col">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-transparent border border-[#2E4C38]/20 rounded-none flex items-center justify-center p-2">
                    <img 
                      src={exp.logo} 
                      alt={exp.company} 
                      className="w-full h-full object-contain opacity-90"
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <h2 className="font-hatton font-bold text-2xl text-[#1A2F24] leading-tight">
                      {exp.role}
                    </h2>
                    <h3 className="font-migra text-lg text-[#4A6750]">
                      {exp.company}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[#1A2F24] text-sm font-medium font-migra">
                    {exp.period}
                  </span>
                  <span className="w-1 h-1 bg-[#1A2F24]/40 rounded-full" />
                  <span className="text-[#1A2F24]/70 text-xs font-bold font-migra tracking-wider uppercase">
                    {exp.location}
                  </span>
                </div>

                <div className="text-[#1A2F24]/80 font-['The_Seasons_Regular'] text-base leading-relaxed font-medium mb-8 text-justify">
                  {exp.description}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="border border-[#2E4C38]/20 text-[#1A2F24]/80 font-['The_Seasons_Regular'] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT — Minimalist List */}
              <div className="flex-1 flex flex-col gap-10">

                <div className="flex flex-col">
                  <span className="font-hatton text-xs tracking-[0.2em] uppercase text-[#1A2F24] font-bold border-b border-[#2E4C38]/20 pb-3 mb-2">
                    Key Contributions
                  </span>
                  <div className="flex flex-col">
                    {exp.contributions.map((contrib, idx) => (
                      <AccordionRow
                        key={idx}
                        icon={contrib.icon}
                        title={contrib.system}
                      >
                        <ul className="flex flex-col gap-4">
                          {contrib.points.map((point, pIdx) => (
                            <motion.li
                              key={pIdx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: pIdx * 0.05 }}
                              className="flex items-start gap-3 text-[#1A2F24]/80 font-['The_Seasons_Regular'] text-base leading-relaxed text-justify"
                            >
                              <span className="text-[#4A6750] mt-1.5 text-[10px] opacity-60">✦</span>
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </AccordionRow>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-hatton text-xs tracking-[0.2em] uppercase text-[#1A2F24] font-bold border-b border-[#2E4C38]/20 pb-3 mb-2">
                    Company Culture
                  </span>
                  <div className="flex flex-col">
                    {exp.culture.map((item, idx) => (
                      <AccordionRow
                        key={item.id}
                        icon={idx === 0 ? '🤝' : '🌱'}
                        title={item.title}
                      >
                        <div className="w-full sm:max-w-sm aspect-[16/9] overflow-hidden mb-4 border border-[#2E4C38]/10">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                            onError={handleImageError}
                          />
                        </div>
                        <p className="font-['The_Seasons_Regular'] text-base text-[#1A2F24]/80 leading-relaxed text-justify">
                          {item.description}
                        </p>
                      </AccordionRow>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperiencePage;