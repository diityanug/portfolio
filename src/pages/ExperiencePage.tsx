import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

/*─
   Variants─ */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const fadeUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const revealRight: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  show: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/*─
   Data─ */
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
      <div className="flex flex-col gap-4">
        <p>
          Collaborating on global-scale infrastructure and internal platforms, driving engineering efficiency 
          across multiple core systems from battery manufacturing management to enterprise-level internal tools.
        </p>
      </div>
    ),
    contributions: [
      {
        system: "APC (Autonomous Process Control)",
        points: [
          "Managed MCCS configurations and equipment modeling across eight manufacturing sites.",
          "Tracked critical equipment issues and handled operational reporting interfaces for high-throughput factory processes."
        ]
      },
      {
        system: "HRIS (Human Resource Information System)",
        points: [
          "Developed robust asset management features to streamline internal resource tracking.",
          "Integrated secure cloud storage modules utilizing AWS S3 and implemented precise Role-Based Access Control (RBAC) navigation."
        ]
      },
      {
        system: "LMS (Learning Management System)",
        points: [
          "Maintained internal learning systems through proactive bug squashing and codebase refactoring.",
          "Optimized application state and interface reliability to ensure seamless training delivery."
        ]
      }
    ],
    // DITAMBAHKAN PROPERTI IMAGE UNTUK SETIAP FOTO KEGIATAN CULTURE
    culture: [
      {
        id: 1,
        title: "Cross-Border Synergy",
        image: "/images/culture-synergy.jpg", // Ganti dengan path foto asli Anda
        description: "Engaging in routine technical alignments and cross-cultural engineering syncs with core engineering teams based in South Korea."
      },
      {
        id: 2,
        title: "Knowledge Sharing & Technical Mentorship",
        image: "/images/culture-mentorship.jpg", // Ganti dengan path foto asli Anda
        description: "Participating in internal tech talks, architectural review boards, and collaborative bonding initiatives to foster strong engineering practices."
      }
    ]
  },
];

/*─
   Components─ */

// KOMPONEN CARD BARU UNTUK FOTO & DETAIL COMPANY CULTURE
const CultureCard = ({ item }: { item: (typeof experiences)[0]['culture'][0] }) => {
  return (
    <div className="group/cult flex flex-col cursor-pointer">
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-4 rounded-lg border border-black/[0.05] bg-gray-50 isolate transform-gpu">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover/cult:grayscale-0 transition-[transform,filter] duration-700 group-hover/cult:scale-[1.04]"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/640x400/f0ede8/c8c0b8?text=Culture';
          }}
        />
      </div>
      <span className="font-poppins text-[9px] tracking-[0.28em] uppercase text-[#5E7657] mb-1.5 font-medium">Company Culture</span>
      <h4 className="font-poppins font-medium text-[11px] uppercase tracking-widest text-[#1a1a1a] mb-1.5 group-hover/cult:text-[#5E7657] transition-colors duration-300">{item.title}</h4>
      <p className="font-poppins text-[11px] text-gray-400 font-light leading-relaxed text-justify">{item.description}</p>
    </div>
  );
};

/*─
   Page─ */
const ExperiencePage = () => {
  const [expandedSections, setExpandedSections] = useState<Record<number, 'contributions' | 'culture' | null>>({});

  const toggleSection = (id: number, type: 'contributions' | 'culture') => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: prev[id] === type ? null : type
    }));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative flex flex-col pt-16 md:pt-24 px-8 md:px-16 pb-28 min-h-[calc(100vh-116px)] bg-white overflow-hidden"
    >
      {/* Background Textures */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-30" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.028) 1px, transparent 1px)`, backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 30%, transparent 90%)', WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 30%, transparent 90%)' }} />
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="w-full max-w-[1440px] mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mb-16 md:mb-20">
          <div>
            <h1 className="font-lejour font-normal leading-[0.9] tracking-tight text-[#1a1a1a] select-none pointer-events-none text-[56px] md:text-[80px] lg:text-[96px]">
              <div className="pb-1 md:pb-2"><Typewriter text="Work" /></div>
              <div className="text-[#5E7657]"><Typewriter text="Experience" delay={0.4} /></div>
            </h1>
            <motion.div variants={lineGrow} className="w-12 md:w-16 h-[1px] bg-[#5E7657] mt-6" />
          </div>
          <motion.div variants={fadeUp} className="flex flex-col items-start md:items-end gap-3 pb-1">
            <p className="font-poppins text-[10px] tracking-[0.22em] uppercase text-gray-400 font-light max-w-[180px] text-left md:text-right leading-loose">A timeline of my professional journey.</p>
          </motion.div>
        </div>

        {/* EXPERIENCE LIST */}
        <div className="flex flex-col">
          <motion.div variants={lineGrow} className="w-full h-[1px] bg-black/10" />

          {experiences.map((exp) => {
            const currentActive = expandedSections[exp.id] || null;

            return (
              <div key={exp.id}>
                <div className="group grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 py-14 md:py-20 transition-colors duration-300 hover:bg-gray-50/60 px-3 md:px-6 -mx-3 md:-mx-6 rounded-2xl">
                  
                  {/* LEFT PANELS */}
                  <div className="lg:col-span-4 flex flex-col items-start">
                    <motion.div variants={revealRight} className="mb-5 h-[18px]">
                      <img src={exp.logo} alt={exp.company} className="h-[16px] md:h-[18px] w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="font-poppins font-normal text-[22px] md:text-[26px] lg:text-[28px] text-[#1a1a1a]/70 tracking-normal leading-snug mb-8">{exp.role}</motion.h2>
                    <motion.div variants={fadeUp} className="pl-4 border-l border-black/10 flex flex-col gap-3 mb-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-telegraf text-[9px] uppercase tracking-[0.28em] text-gray-300">Period</span>
                        <span className="font-poppins text-[11px] text-gray-500 tracking-wide">{exp.period}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-telegraf text-[9px] uppercase tracking-[0.28em] text-gray-300">Location</span>
                        <span className="font-poppins text-[11px] text-gray-400 font-light">{exp.location}</span>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => <span key={tag} className="font-poppins text-[9px] uppercase tracking-[0.18em] text-gray-400 font-light px-3.5 py-1.5 rounded-full border border-black/[0.07] bg-transparent">{tag}</span>)}
                    </motion.div>
                  </div>

                  {/* RIGHT PANELS */}
                  <div className="lg:col-span-8 flex flex-col justify-start pt-0 md:pt-2">
                    <motion.div variants={fadeUp} className="font-poppins font-light text-sm md:text-base lg:text-[17px] leading-[1.9] text-gray-500/80 mb-10 max-w-[600px] text-justify">
                      {exp.description}
                    </motion.div>

                    {/* TWO INTERACTIVE BUTTONS */}
                    <div className="flex flex-wrap gap-4 mb-2">
                      {/* Button 1: Key Contributions */}
                      <motion.button
                        variants={fadeUp}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleSection(exp.id, 'contributions')}
                        className="relative flex items-center rounded-full border border-black/10 overflow-hidden outline-none"
                        style={{ width: '200px', height: '40px' }}
                      >
                        <motion.span className="absolute inset-0 rounded-full bg-[#5E7657]" initial={false} animate={{ x: currentActive === 'contributions' ? "0%" : "-101%" }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ willChange: "transform" }} />
                        <span className="relative z-10 flex items-center justify-center font-poppins text-[10px] uppercase tracking-[0.15em]" style={{ width: '160px', color: currentActive === 'contributions' ? '#fff' : '#888' }}>
                          {currentActive === 'contributions' ? 'Hide Details' : 'Key Contributions'}
                        </span>
                        <span className="relative z-10 flex items-center justify-center border-l border-black/10 w-[40px] h-[40px]">
                          <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ rotate: currentActive === 'contributions' ? 45 : 0 }} style={{ color: currentActive === 'contributions' ? '#fff' : '#aaa' }}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></motion.svg>
                        </span>
                      </motion.button>

                      {/* Button 2: Company Culture */}
                      <motion.button
                        variants={fadeUp}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleSection(exp.id, 'culture')}
                        className="relative flex items-center rounded-full border border-black/10 overflow-hidden outline-none"
                        style={{ width: '200px', height: '40px' }}
                      >
                        <motion.span className="absolute inset-0 rounded-full bg-[#5E7657]" initial={false} animate={{ x: currentActive === 'culture' ? "0%" : "-101%" }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ willChange: "transform" }} />
                        <span className="relative z-10 flex items-center justify-center font-poppins text-[10px] uppercase tracking-[0.15em]" style={{ width: '160px', color: currentActive === 'culture' ? '#fff' : '#888' }}>
                          {currentActive === 'culture' ? 'Hide Culture' : 'Company Culture'}
                        </span>
                        <span className="relative z-10 flex items-center justify-center border-l border-black/10 w-[40px] h-[40px]">
                          <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ rotate: currentActive === 'culture' ? 45 : 0 }} style={{ color: currentActive === 'culture' ? '#fff' : '#aaa' }}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></motion.svg>
                        </span>
                      </motion.button>
                    </div>

                    {/* EXPANDABLE HOUSING */}
                    <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-out" style={{ gridTemplateRows: currentActive ? '1fr' : '0fr', opacity: currentActive ? 1 : 0 }}>
                      <div className="overflow-hidden">
                        <div className="pt-10 pb-4">
                          <AnimatePresence mode="wait">
                            
                            {/* RENDER KEY CONTRIBUTIONS */}
                            {currentActive === 'contributions' && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8 max-w-[640px]">
                                {exp.contributions.map((group, idx) => (
                                  <div key={idx} className="flex flex-col gap-2.5 pl-2">
                                    <h4 className="font-poppins font-medium text-xs uppercase tracking-wider text-[#1a1a1a]">{group.system}</h4>
                                    <ul className="list-none flex flex-col gap-2">
                                      {group.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="font-poppins font-light text-sm leading-relaxed text-gray-500 flex gap-3">
                                          <span className="text-[#5E7657] font-medium">—</span>
                                          <span>{pt}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </motion.div>
                            )}

                            {/* RENDER COMPANY CULTURE (SUDAH MEMAKAI COMPONENT CARD BER-FOTO) */}
                            {currentActive === 'culture' && (
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                {exp.culture.map((item) => (
                                  <CultureCard key={item.id} item={item} />
                                ))}
                              </motion.div>
                            )}

                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <motion.div variants={lineGrow} className="w-full h-[1px] bg-black/[0.07]" />
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperiencePage;