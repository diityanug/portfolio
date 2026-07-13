import { useState, type ReactElement, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

/* Animasi */
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textThereVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 1, ease: customEase, delay: 0.25 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } },
};

/* Icons */
const GearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;

/* Data */
const experiences = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'LG Sinarmas',
    location: 'Central Jakarta, Indonesia',
    period: 'JUNE 2025 — PRESENT',
    logo: '/LG_Sinarmas_Logo_Vector.svg',
    tags: ['React', 'TypeScript', 'AWS S3', 'Battery Manufacturing'],
    description: "Contributing to Smart Factory operations through equipment modeling, server monitoring, and equipment alarm maintenance, while developing scalable internal enterprise applications—including HRIS, LMS, and Job Portal—using React, TypeScript, and Microfrontend Architecture.",
    contributions: [
      { system: "APC (Autonomous Process Control)", icon: <GearIcon />, points: ["Registered and modeled manufacturing equipment using Factova.", "Monitored server and equipment status across multiple production sites.", "Investigated and resolved equipment alarm issues to ensure system reliability."] },
      { system: "FDC (Fault Detection and Classification)", icon: <SearchIcon />, points: ["User access administration within the FDC system", "Assigning and adjusting user roles based on user's needs and requests"] },
      { system: "HRIS (Human Resource Integrated System)", icon: <UsersIcon />, points: ["Developed asset management features to streamline internal resource tracking", "Integrated secure cloud storage modules using AWS S3", "Implemented precise Role-Based Access Control (RBAC) navigation"] },
      { system: "LMS (Learning Management System)", icon: <BookIcon />, points: ["Fixed bugs to improve system stability and user experience.", "Implemented new features based on business requirements.", "Revamped the Learning Management page to enhance usability and interface consistency."] },
      { system: "Job Portal", icon: <BriefcaseIcon />, points: ["Resolved bugs to ensure application reliability.", "Developed and integrated new features to support recruitment workflows.", "Redesigned the Applicant Management popup interface for a more modern and user-friendly experience."] }
    ],
    culture: [
      { id: 1, title: "Sport - Futsal", image: "/images/culture-synergy.jpg", description: "Engaging in routine technical alignments and cross-cultural engineering syncs with core engineering teams based in South Korea." },
      { id: 2, title: "The Growth Circuit", image: "/images/culture-mentorship.jpg", description: "Participating in internal tech talks, architectural review boards, and collaborative bonding initiatives to foster strong engineering practices." }
    ]
  },
];

type Experience = typeof experiences[0];
type TabKey = 'core' | 'culture';

/* Experience Row */
const ExperienceRow = ({ exp }: { exp: Experience; index: number }) => {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);

  const toggleTab = (tab: TabKey) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'core', label: 'Contributions' },
    { key: 'culture', label: 'Culture' },
  ];

  return (
    <motion.article
      variants={itemVariants}
      className="w-full border-b border-[#1A2F24]/10 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6"
    >
      {/* LEFT: logo + period */}
      <div className="lg:col-span-3 flex lg:flex-col justify-between lg:justify-start gap-4">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-4">
          <img
            src={exp.logo}
            alt="Company Logo"
            className="h-6 md:h-7 w-auto object-contain object-left shrink-0"
            onError={handleImageError}
          />
        </div>
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#4A6750] uppercase self-start lg:mt-1">
          {exp.period}
        </span>
      </div>

      {/* RIGHT: content */}
      <div className="lg:col-span-9">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-seasons text-[#1A2F24] leading-[0.95]">
            {exp.role}
          </h2>
          <span className="text-sm text-gray-500 font-sans shrink-0 md:pt-2">{exp.location}</span>
        </div>

        <p className="text-justify text-[15px] md:text-base text-gray-600 leading-relaxed font-sans max-w-2xl mb-5">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {exp.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold uppercase tracking-wide text-[#4A6750] px-3 py-1 rounded-full border border-[#2E4C38]/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* SEGMENTED TOGGLE */}
        <div className="inline-flex bg-[#4A6750]/[0.06] rounded-full p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => toggleTab(tab.key)}
              className={`relative px-5 py-2 text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                activeTab === tab.key ? 'text-[#F9F8F4]' : 'text-[#1A2F24]/55 hover:text-[#1A2F24]'
              }`}
            >
              {activeTab === tab.key && (
                <motion.span
                  layoutId={`tab-pill-${exp.id}`}
                  className="absolute inset-0 bg-[#1A2F24] rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* EXPANDABLE CONTENT */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: activeTab ? 'auto' : 0,
            opacity: activeTab ? 1 : 0 
          }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'core' && (
              <motion.div key="core" variants={fadeVariants} initial="hidden" animate="show" exit="exit" className="pt-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
                  {exp.contributions.map((contrib, idx) => (
                    <div key={idx} className="bg-[#F9F8F4] border border-[#2E4C38]/8 rounded-2xl p-5">
                      <h4 className="flex items-center gap-2.5 text-sm font-semibold text-[#1A2F24] mb-3 font-sans">
                        <span className="text-[#4A6750]">{contrib.icon}</span>
                        {contrib.system}
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {contrib.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-relaxed font-sans">
                            <span className="w-1 h-1 rounded-full bg-[#4A6750] mt-2 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'culture' && (
              <motion.div key="culture" variants={fadeVariants} initial="hidden" animate="show" exit="exit" className="pt-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-1">
                  {exp.culture.map((item) => (
                    <div key={item.id} className="rounded-2xl overflow-hidden border border-[#2E4C38]/10 bg-[#F9F8F4]">
                      <div className="w-full aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="font-medium text-[15px] text-[#1A2F24] mb-1.5 font-sans">{item.title}</h4>
                        <p className="text-[13px] text-gray-600 leading-relaxed font-sans">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.article>
  );
};

/* Main Page */
const ExperiencePage = (): ReactElement => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="relative z-0 flex flex-col pt-32 lg:pt-36 px-6 md:px-10 lg:px-16 pb-32 min-h-[100dvh] bg-[#F9F8F4] overflow-x-hidden font-sans text-gray-800"
    >
      <StaticDotGrid />

      <div className="w-full relative z-10">
        <motion.div variants={textThereVariants} className="w-full mb-14 md:mb-20">
          <h1 className="font-seasons text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-[#1A2F24]">
            WORK<br />
            <span className="text-[#4A6750]">EXPERIENCE</span>
          </h1>
        </motion.div>

        <div className="w-full border-t border-[#1A2F24]/10">
          {experiences.map((exp, i) => (
            <ExperienceRow key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperiencePage;