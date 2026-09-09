import { useEffect, useState, type ReactElement, type SyntheticEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import lgSinarmasLogo from '../assets/LG_Sinarmas_Logo_Vector.svg';

// Animation configurations
const customEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: customEase, delay: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: customEase } },
};

// UI Icons
const GearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;

// Experience data
const experiences = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'LG Sinarmas',
    location: 'Central Jakarta, Indonesia',
    period: 'JUNE 2025 — PRESENT',
    logo: lgSinarmasLogo,
    tags: ['React', 'TypeScript', 'Javascript' ,'AWS S3', 'Microfrontend Architecture', 'Factova'],
    description: "Supporting Smart Factory operations through equipment modeling, server monitoring, and equipment alarm maintenance, while developing scalable internal enterprise applications using React, TypeScript, and Microfrontend Architecture.",
    contributions: [
      { system: "APC (Autonomous Process Control)", icon: <GearIcon />, points: ["Modeled manufacturing equipment using Factova.", "Monitored server and equipment status across sites.", "Investigated and resolved equipment alarms."] },
      { system: "FDC (Fault Detection and Classification)", icon: <SearchIcon />, points: ["Managed user access within the FDC system.", "Assigned and adjusted user roles based on requests."] },
      { system: "HRIS (Human Resource Integrated System)", icon: <UsersIcon />, points: ["Developed asset management features.", "Integrated secure cloud storage modules using AWS S3.", "Implemented Role-Based Access Control."] },
      { system: "LMS (Learning Management System)", icon: <BookIcon />, points: ["Fixed bugs to improve system stability.", "Revamped the Learning Management page."] },
      { system: "Job Portal", icon: <BriefcaseIcon />, points: ["Developed new features to support recruitment.", "Redesigned the Applicant Management interface."] }
    ],
    culture: [
      { id: 1, title: "Team Dinner", image: "/images/Ayce.webp", description: "Appreciating and celebrating employee performance." },
      { id: 2, title: "Monthly Futsal", image: "/images/Futsal.webp", description: "Organized to maintain physical fitness and well-being." },
      { id: 3, title: "Growth Circuit", image: "/images/LGSM.webp", description: "Annual event setting goals and aligning vision." },
      { id: 4, title: "Company Outing", image: "/images/Outing.webp", description: "Strengthening the bonds of brotherhood and teamwork." }
    ]
  },
];

type Experience = typeof experiences[0];
type TabKey = 'core' | 'culture';

// Component: Experience Item Row
const ExperienceRow = ({ exp }: { exp: Experience; index: number }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('core');

  // Preload culture images
  useEffect(() => {
    exp.culture.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [exp.culture]);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.article
      variants={itemVariants}
      className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start pt-4 border-t border-[#1A2F24]/10 lg:border-none"
    >
      {/* Left Column: Role Details */}
      <div className="w-full lg:w-2/5 flex flex-col">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] bg-white border border-[#1A2F24]/10 shadow-sm flex items-center justify-center p-2 shrink-0">
            <img src={exp.logo} alt="Logo" loading="lazy" decoding="async" className="w-full h-full object-contain" onError={handleImageError} />
          </div>
          <div className="flex flex-col pt-0">
            <h3 className="font-overlock font-bold tracking-[0.05em] text-[25px] md:text-[32px] leading-tight text-[#1A2F24] group-hover:text-[#4A6750] transition-colors duration-500 mb-1">
              {exp.role}
            </h3>
            <span className="font-overlock font-semibold text-[13px] md:text-[14px] text-[#4A6750] leading-tight mb-2 tracking-[0.2em]">
              {exp.company}
            </span>
            <span className="font-autour text-[9px] md:text-[10px] tracking-[0.15em] font-bold uppercase text-[#1A2F24]/40 mt-1">
              {exp.period}
            </span>
          </div>
        </div>

        <p className="font-karla text-[14px] md:text-[15px] lg:text-[16px] text-[#2E4C38]/80 leading-[1.65] md:leading-relaxed text-justify mb-6">
          {exp.description}
        </p>
          
        {/* Scrollable tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag, idx) => (
            <span key={idx} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#4A6750] px-3 py-1.5 bg-[#4A6750]/5 rounded-full border border-[#2E4C38]/10 shrink-0">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Interactive Tabs & Cards */}
      <div className="w-full lg:w-3/5 flex flex-col items-start overflow-hidden mt-2 lg:mt-0">
        
        {/* Navigation tabs */}
        <div className="w-full flex gap-6 border-b border-[#1A2F24]/10 mb-4 md:mb-6 relative">
          {(['core', 'culture'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[11px] md:text-[12px] font-karla font-bold tracking-[0.15em] uppercase relative transition-colors outline-none ${
                activeTab === tab ? 'text-[#1A2F24]' : 'text-[#1A2F24]/30'
              }`}
            >
              {tab === 'core' ? 'Contributions' : 'Culture'}
              {activeTab === tab && (
                <motion.div 
                  layoutId={`underline-${exp.id}`}
                  className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#4A6750]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="w-full">
          <div className="grid grid-cols-1 items-start min-h-[300px] md:min-h-[330px]">
            <AnimatePresence mode="wait">
              
              {/* Contributions Tab */}
              {activeTab === 'core' && (
                <motion.div
                  key="core"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 flex gap-4 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0 w-[calc(100%+3rem)] lg:w-full"
                >
                  {exp.contributions.map((contrib, idx) => (
                    <div key={idx} className="bg-white border border-[#1A2F24]/10 rounded-[1.25rem] p-6 w-[82vw] sm:w-[360px] md:w-[380px] shrink-0 snap-center flex flex-col h-[280px] md:h-[310px] shadow-sm">
                      <h4 className="flex items-center gap-2.5 text-[15px] md:text-[16px] font-bold text-[#1A2F24] mb-3 font-overlock border-b border-[#1A2F24]/5 pb-3 tracking-wider">
                        <span className="text-[#4A6750] bg-[#4A6750]/10 p-2 rounded-lg shrink-0">{contrib.icon}</span>
                        {contrib.system}
                      </h4>
                      <div className="overflow-y-auto show-scrollbar flex-1 pr-1">
                        <ul className="flex flex-col gap-3">
                          {contrib.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5 text-[13.5px] md:text-[14px] text-[#2E4C38]/80 leading-[1.6] font-karla">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6750]/40 mt-2 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Culture Tab */}
              {activeTab === 'culture' && (
                <motion.div
                  key="culture"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 flex gap-4 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0 w-[calc(100%+3rem)] lg:w-full"
                >
                  {exp.culture.map((item) => (
                    <div key={item.id} className="w-[82vw] sm:w-[360px] md:w-[380px] shrink-0 snap-center rounded-[1.25rem] overflow-hidden border border-[#1A2F24]/10 bg-white shadow-sm flex flex-col h-[280px] md:h-[310px]">
                      <div className="w-full h-[160px] md:h-[175px] bg-gray-100 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover" onError={handleImageError} />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="font-bold text-[15px] md:text-[16px] text-[#1A2F24] mb-1.5 font-karla">{item.title}</h4>
                        <p className="text-[13px] md:text-[13.5px] text-[#2E4C38]/70 leading-relaxed font-karla line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
          
          {/* Swipe indicator */}
          <div className="flex justify-start items-center gap-2 text-[9px] font-karla tracking-widest text-[#1A2F24]/30 uppercase select-none mt-1">
            <span>Swipe to explore</span>
            <span>→</span>
          </div>

        </div>
      </div>
    </motion.article>
  );
};

// Component: Main Experience Section
const ExperienceSection = (): ReactElement => {
  return (
    <motion.section
      id="experience"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="relative z-0 flex flex-col pt-12 pb-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-24 w-full bg-[#F9F8F4] overflow-hidden font-karla text-[#1A2F24] scroll-mt-20"
    >
      <div className="w-full relative z-10 max-w-7xl mx-auto flex flex-col gap-8 lg:gap-8">
        
        {/* Section header */}
        <motion.div variants={textVariants} className="w-full flex flex-col mb-0 text-left">
          <span className="font-overlock text-[10px] tracking-[0.25em] uppercase text-[#4A6750] font-bold mb-2">
            Work
          </span>
          <h2 className="font-autour text-[35px] sm:text-[54px] lg:text-[64px] tracking-tight text-[#1A2F24] leading-[1.1]">
            Experience
          </h2>
        </motion.div>

        <div className="w-full">
          {experiences.map((exp, i) => (
            <ExperienceRow key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;