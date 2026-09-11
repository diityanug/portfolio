import { useState, type ReactElement, type SyntheticEvent } from 'react';
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
    tags: ['React', 'TypeScript', 'Javascript', 'AWS S3', 'Microfrontend', 'Factova'],
    description: "Supporting Smart Factory operations through equipment modeling, server monitoring, and equipment alarm maintenance, while developing scalable internal enterprise applications using React, TypeScript, and Microfrontend Architecture.",
    contributions: [
      { system: "APC (Autonomous Process Control)", icon: <GearIcon />, points: ["Modeled manufacturing equipment using Factova.", "Monitored server and equipment status across sites.", "Investigated and resolved equipment alarms."] },
      { system: "FDC (Fault Detection and Classification)", icon: <SearchIcon />, points: ["Managed user access within the FDC system.", "Assigned and adjusted user roles based on requests."] },
      { system: "HRIS (Human Resource Integrated System)", icon: <UsersIcon />, points: ["Developed asset management features.", "Integrated secure cloud storage modules using AWS S3.", "Implemented Role-Based Access Control."] },
      { system: "LMS (Learning Management System)", icon: <BookIcon />, points: ["Fixed bugs to improve system stability.", "Revamped the Learning Management page."] },
      { system: "Job Portal", icon: <BriefcaseIcon />, points: ["Developed new features to support recruitment.", "Redesigned the Applicant Management interface."] }
    ],
    culture: [
      { id: 'c1', title: 'Team Dinner', image: '/images/Ayce.webp', description: 'Appreciating and celebrating employee performance.' },
      { id: 'c2', title: 'Growth Circuit', image: '/images/Outing.webp', description: 'Strengthening the bonds of brotherhood and teamwork.' },
      { id: 'c3', title: 'Company Outing', image: '/images/LGSM.webp', description: 'Annual event setting goals and aligning vision.' },
      { id: 'c4', title: 'Futsal', image: '/images/Futsal.webp', description: 'Organized to maintain physical fitness and well-being.' }
    ]
  },
];

type Experience = typeof experiences[0];

// Component: Experience Item Row
const ExperienceRow = ({ exp }: { exp: Experience }) => {
  const [activeTab, setActiveTab] = useState<'core' | 'culture'>('core');
  
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.article
      variants={itemVariants}
      className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full mb-32 last:mb-0 relative"
    >
      {/* Left Column: Typography & Info */}
      <div className="w-full lg:w-2/5 flex flex-col lg:pr-12 relative z-10 pt-2">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#eceae4] flex items-center justify-center p-2.5 shadow-sm overflow-hidden shrink-0 group-hover:border-neutral-500 transition-colors">
            <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain grayscale-[20%]" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-3xl font-semibold tracking-tight text-[#1c1c1c] leading-none">
              {exp.role}
            </h3>
            <span className="font-mono text-sm tracking-tight text-[#5f5f5d]">
              {exp.company}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-3 text-sm font-sans text-[#5f5f5d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eceae4]"></span>
            <span>{exp.period}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-sans text-[#5f5f5d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eceae4]"></span>
            <span>{exp.location}</span>
          </div>
        </div>

        <p className="font-sans text-base leading-relaxed text-[#5f5f5d] mb-8">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1.5 rounded-md border border-[#eceae4] bg-[#eceae4]/30 font-mono text-[10px] text-[#5f5f5d] uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Interactive Tabs & Cards */}
      <div className="w-full lg:w-3/5 flex flex-col items-start overflow-hidden bg-[#eceae4]/30 border border-[#eceae4] p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
        
        {/* Editorial Tabs */}
        <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-[#eceae4]/60">
          <div className="flex items-center gap-3">
            {(['core', 'culture'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-wider transition-all duration-200 outline-none uppercase ${
                  activeTab === tab 
                    ? 'bg-white text-[#1c1c1c] shadow-sm border border-[#eceae4]' 
                    : 'bg-transparent text-[#5f5f5d] hover:text-[#1c1c1c] border border-transparent hover:bg-black/5/50'
                }`}
              >
                {tab === 'core' ? 'Responsibilities' : 'Culture'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="w-full">
          <div className="grid grid-cols-1 items-start min-h-[340px]">
            <AnimatePresence mode="wait">
              
              {/* Contributions Tab */}
              {activeTab === 'core' && (
                <motion.div
                  key="core"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 flex gap-5 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory w-full"
                >
                  {exp.contributions.map((contrib, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#f7f4ed] p-6 w-[82vw] sm:w-[320px] md:w-[350px] shrink-0 snap-center flex flex-col h-[320px] justify-between relative overflow-hidden group border-2 border-[#1c1c1c] transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1c1c1c]">
                          <span className="text-[#1c1c1c] bg-[#eceae4] p-2.5 rounded-none border-2 border-[#1c1c1c] shrink-0">
                            {contrib.icon}
                          </span>
                          <h4 className="font-sans font-medium text-lg text-[#1c1c1c] tracking-tight">
                            {contrib.system}
                          </h4>
                        </div>
                        <ul className="flex flex-col gap-3.5 font-sans">
                          {contrib.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3 text-sm text-[#5f5f5d] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1c] mt-1.5 shrink-0"></span>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 flex gap-5 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory w-full"
                >
                  {exp.culture.map((item) => (
                    <div 
                      key={item.id} 
                      className="w-[82vw] sm:w-[320px] md:w-[350px] shrink-0 snap-center bg-[#f7f4ed] flex flex-col h-[320px] p-2 justify-between group overflow-hidden border-2 border-[#1c1c1c] transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]"
                    >
                      <div className="relative w-full h-[180px] bg-[#eceae4] overflow-hidden shrink-0 border-2 border-[#1c1c1c]">
                        <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" onError={handleImageError} />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-sans font-medium text-lg text-[#1c1c1c] mb-2 tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#5f5f5d] leading-relaxed font-sans line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
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
      className="relative z-0 flex flex-col py-20 px-4 md:px-12 lg:px-24 w-full bg-[#f7f4ed] text-[#1c1c1c] min-h-[100svh] scroll-mt-24"
    >
      <div className="w-full relative z-10 max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        
        {/* Section header */}
        <motion.div variants={textVariants} className="w-full flex flex-col items-center text-center">
          <span className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/5 text-[#5f5f5d] mb-6">
            Career
          </span>
          <h2 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-tight text-[#1c1c1c]">
            Work Experience
          </h2>
        </motion.div>

        <div className="w-full mt-8">
          {experiences.map((exp) => (
            <ExperienceRow key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;