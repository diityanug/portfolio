import { useState, type ReactElement, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

// IMPORT STATIC DOT GRID DI SINI
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

/* =========================================
   KOREOGRAFI ANIMASI (CINEMATIC TIMING)
   ========================================= */
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Wrapper Utama (Exit pakai blur disamakan dengan Profile Page)
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.5, ease: customEase } }
};

// 1. Teks "WORK" muncul duluan pakai blur
const textWorkVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.1 } }
};

// 2. Teks "EXPERIENCE" nyusul
const textExperienceVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.25 } }
};

// 3. Subtitle / Garis pembatas nyusul
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase, delay: 0.6 } }
};

// 4. Container & Card untuk list experience
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
};

/* =========================================
   MAIN DATA
   ========================================= */
const experiences = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'LG Sinarmas',
    location: 'Central Jakarta, Indonesia',
    period: 'June 2025 — Present',
    logo: '/LG_Sinarmas_Logo_Vector.svg',
    tags: ['React', 'TypeScript', 'AWS S3', 'RBAC', 'LMS', 'HRIS', 'Battery Manufacturing', 'Equipment Modeling', 'MCCS Configuration'],
    description: "Contributing to the smart manufacturing ecosystem through two core roles — autonomous process control and fault detection — while also involved in internal software development covering resource management and organizational learning systems.",
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
          "Assigning and adjusting user roles based on user's needs and requests"
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

/* =========================================
   MODERN CHEVRON ICON
   ========================================= */
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg 
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3, ease: customEase }}
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </motion.svg>
);

/* =========================================
   MAIN PAGE
   ========================================= */
const ExperiencePage = (): ReactElement => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-32 lg:pt-40 px-6 md:px-12 lg:px-16 pb-32 min-h-screen bg-[#F9F8F4] overflow-x-hidden"
    >
      <StaticDotGrid />

      <div className="w-full max-w-[1000px] mx-auto relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 mb-20">
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-1">
            <motion.h1 variants={textWorkVariants} className="font-['The_Seasons_Regular'] text-[60px] sm:text-[80px] md:text-[100px] lg:text-[110px] leading-[0.85] tracking-tight text-[#1A2F24] drop-shadow-sm">
              WORK
            </motion.h1>
            <motion.h1 variants={textExperienceVariants} className="font-['The_Seasons_Regular'] text-[60px] sm:text-[80px] md:text-[100px] lg:text-[110px] leading-[0.85] tracking-tight text-[#4A6750] drop-shadow-sm">
              EXPERIENCE
            </motion.h1>
          </div>
          
          <motion.div 
            variants={subtitleVariants}
            className="flex items-center gap-4 mt-2"
          >
            <span className="font-['Red_Hat_Display'] text-xs font-bold tracking-[0.2em] uppercase text-[#4A6750]/80 bg-white/60 px-4 py-2 rounded-full border border-[#4A6750]/20">
              Professional Journey
            </span>
            <div className="flex-1 h-[1px] bg-[#2E4C38]/10" />
          </motion.div>
        </div>

        {/* ================= PREMIUM EXP CARDS ================= */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="flex flex-col w-full gap-12"
        >
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div 
                key={exp.id}
                variants={cardVariants}
                className="w-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_rgba(46,76,56,0.05)] rounded-[2.5rem] p-6 md:p-10 transition-shadow hover:shadow-[0_15px_50px_rgba(46,76,56,0.08)]"
              >
                
                {/* --- CARD HEADER --- */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white shadow-sm border border-[#2E4C38]/10 rounded-2xl flex items-center justify-center p-4 shrink-0">
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          className="w-full h-full object-contain"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="font-['The_Seasons_Regular'] text-3xl md:text-5xl text-[#1A2F24] leading-[1.1]">
                          {exp.role}
                        </h2>
                        {/* INI FONT-NYA UDAH DIGANTI JADI TIPIS ELEGANT */}
                        <h3 className="font-['Poppins_Light'] text-xl md:text-2xl text-[#4A6750] tracking-wide mt-1">
                          at {exp.company}
                        </h3>
                      </div>
                    </div>

                    {/* Metadata Kanan */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2">
                      <span className="font-['Red_Hat_Display'] text-[11px] md:text-xs font-bold tracking-[0.1em] text-[#1A2F24] bg-[#4A6750]/10 px-3 py-1.5 rounded-md">
                        {exp.period}
                      </span>
                      <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#1A2F24]/50">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Deskripsi, Tags & Toggle */}
                  <div className="flex flex-col gap-6">
                    <p className="font-['Aileron'] text-lg md:text-xl text-[#2E4C38]/80 leading-relaxed text-justify">
                      {exp.description}
                    </p>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="flex flex-wrap gap-2 md:max-w-[70%]">
                        {exp.tags.map((tag, idx) => (
                          <span key={idx} className="bg-white/80 border border-[#2E4C38]/10 text-[#1A2F24]/70 font-['Red_Hat_Display'] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleToggle(exp.id)}
                        className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-['Red_Hat_Display'] text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 outline-none shrink-0 ${
                          isExpanded 
                            ? 'bg-[#1A2F24] text-white shadow-md' 
                            : 'bg-white/80 text-[#1A2F24] border border-[#2E4C38]/20 hover:bg-[#1A2F24] hover:text-white hover:shadow-lg'
                        }`}
                      >
                        {isExpanded ? 'Close Details' : 'Explore Details'}
                        <ChevronIcon isOpen={isExpanded} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* --- EXPANDED CONTENT --- */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "tween", duration: 0.5, ease: customEase }}
                      className="overflow-hidden"
                    >
                      <div className="pt-10 pb-2 mt-10 border-t border-[#2E4C38]/10 flex flex-col gap-12">
                        
                        <div className="flex flex-col gap-6">
                          <span className="font-['Red_Hat_Display'] text-xs font-bold tracking-[0.2em] uppercase text-[#4A6750]">
                            Core Impact & Contributions
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {exp.contributions.map((contrib, idx) => (
                              <div key={idx} className="bg-white/50 border border-[#2E4C38]/10 p-6 rounded-2xl flex flex-col gap-4">
                                <h5 className="font-['Aileron'] font-bold text-xl text-[#1A2F24] flex items-center gap-3">
                                  <span className="text-2xl drop-shadow-sm">{contrib.icon}</span>
                                  {contrib.system}
                                </h5>
                                <ul className="flex flex-col gap-3">
                                  {contrib.points.map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-3 text-[#2E4C38]/80 font-['Aileron'] text-base leading-relaxed text-justify">
                                      <span className="text-[#4A6750] mt-1.5 text-[10px] opacity-60 shrink-0">✦</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-6">
                          <span className="font-['Red_Hat_Display'] text-xs font-bold tracking-[0.2em] uppercase text-[#4A6750]">
                            Culture & Environment
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {exp.culture.map((item) => (
                              <div key={item.id} className="bg-white/50 border border-[#2E4C38]/10 p-4 rounded-2xl flex flex-col gap-4 group">
                                <div className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-[#2E4C38]/5 relative">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                    onError={handleImageError}
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5 px-2 pb-2">
                                  <h6 className="font-['The_Seasons_Regular'] font-bold text-2xl text-[#1A2F24]">
                                    {item.title}
                                  </h6>
                                  <p className="font-['Aileron'] text-sm md:text-base text-[#2E4C38]/80 leading-relaxed text-justify">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ExperiencePage;