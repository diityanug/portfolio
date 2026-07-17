import { useEffect, useState, useRef, type ReactElement, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';
import lgSinarmasLogo from '../assets/LG_Sinarmas_Logo_Vector.svg';

/* Animasi */
const customEase = [0.22, 1, 0.36, 1] as const;

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
    logo: lgSinarmasLogo,
    tags: ['React', 'TypeScript', 'AWS S3', 'Battery Manufacturing', 'Microfrontend Architecture'],
    description: "Contributing to Smart Factory operations through equipment modeling, server monitoring, and equipment alarm maintenance, while developing scalable internal enterprise applications—including HRIS, LMS, and Job Portal—using React, TypeScript, and Microfrontend Architecture.",
    contributions: [
      { system: "APC (Autonomous Process Control)", icon: <GearIcon />, points: ["Registered and modeled manufacturing equipment using Factova.", "Monitored server and equipment status across multiple production sites.", "Investigated and resolved equipment alarm issues to ensure system reliability."] },
      { system: "FDC (Fault Detection and Classification)", icon: <SearchIcon />, points: ["User access administration within the FDC system", "Assigning and adjusting user roles based on user's needs and requests"] },
      { system: "HRIS (Human Resource Integrated System)", icon: <UsersIcon />, points: ["Developed asset management features to streamline internal resource tracking", "Integrated secure cloud storage modules using AWS S3", "Implemented precise Role-Based Access Control (RBAC) navigation"] },
      { system: "LMS (Learning Management System)", icon: <BookIcon />, points: ["Fixed bugs to improve system stability and user experience.", "Implemented new features based on business requirements.", "Revamped the Learning Management page to enhance usability and interface consistency."] },
      { system: "Job Portal", icon: <BriefcaseIcon />, points: ["Resolved bugs to ensure application reliability.", "Developed and integrated new features to support recruitment workflows.", "Redesigned the Applicant Management popup interface for a more modern and user-friendly experience."] }
    ],
    culture: [
      { id: 1, title: "Team Appreciation Dinner", image: "/images/Ayce.webp", description: "A team dining event held to appreciate and celebrate employee performance." },
      { id: 2, title: "Monthly Futsal", image: "/images/Futsal.webp", description: "A monthly sports activity organized to maintain physical fitness and well-being." },
      { id: 3, title: "The Growth Circuit in Motion", image: "/images/LGSM.webp", description: "LGSM's annual event aimed at setting collective goals and aligning the vision for the upcoming year." },
      { id: 4, title: "Company Outing", image: "/images/Outing.webp", description: "An outdoor gathering designed to strengthen the bonds of brotherhood and teamwork among employees." }
    ]
  },
];

type Experience = typeof experiences[0];
type TabKey = 'core' | 'culture';

/* Experience Row */
const ExperienceRow = ({ exp }: { exp: Experience; index: number }) => {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);
  const rowRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [renderedTab, setRenderedTab] = useState<TabKey | null>(null);

  useEffect(() => {
    if (activeTab) setRenderedTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    exp.culture.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [exp.culture]);

  const toggleTab = (tab: TabKey) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      return;
    }

    const node = rowRef.current;
    if (node) {
      const targetTop = node.getBoundingClientRect().top + window.scrollY - 80;
      
      if (window.scrollY > targetTop) {
        if (accordionRef.current) accordionRef.current.style.overflowAnchor = 'none';
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        window.setTimeout(() => {
          if (accordionRef.current) accordionRef.current.style.overflowAnchor = '';
        }, 500);
      }
    }

    setActiveTab(null);
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
      ref={rowRef}
      variants={itemVariants}
      className="w-full border-b border-[#1A2F24]/10 py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 md:gap-y-6"
      style={{ contain: 'layout' }}
    >
      {/* LEFT: logo + period */}
      <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-3 md:gap-4 border-b lg:border-none border-[#1A2F24]/5 pb-3 lg:pb-0">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-4">
          <img src={exp.logo} alt="Company Logo" className="h-5 md:h-7 w-auto object-contain object-left shrink-0" onError={handleImageError} />
        </div>
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#4A6750]/80 md:text-[#4A6750] uppercase lg:mt-1 whitespace-nowrap">
          {exp.period}
        </span>
      </div>

      {/* RIGHT: content */}
      <div className="lg:col-span-9 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 md:gap-2 mb-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-seasons text-[#1A2F24] leading-tight md:leading-[0.95]">
            {exp.role}
          </h2>
          <span className="text-xs md:text-sm text-gray-500 font-sans shrink-0 sm:pt-2">{exp.location}</span>
        </div>

        <p className="text-left sm:text-justify text-sm md:text-base text-gray-600 leading-relaxed font-sans max-w-2xl mb-5">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
          {exp.tags.map((tag, idx) => (
            <span key={idx} className="text-[9px] md:text-[11px] font-semibold uppercase tracking-wide text-[#4A6750] px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border border-[#2E4C38]/15" >
              {tag}
            </span>
          ))}
        </div>

        {/* SEGMENTED TOGGLE */}
        <div className="flex w-full sm:w-auto bg-[#4A6750]/[0.06] rounded-full p-1 gap-1 select-none self-stretch sm:self-start">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => toggleTab(tab.key)} className={`relative flex-1 sm:flex-none text-center px-5 py-2.5 sm:py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors duration-300 ${activeTab === tab.key ? 'text-[#F9F8F4]' : 'text-[#1A2F24]/55 hover:text-[#1A2F24]'}`} >
              {activeTab === tab.key && (
                <motion.span layoutId={`tab-pill-${exp.id}`} className="absolute inset-0 bg-[#1A2F24] rounded-full -z-10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              {tab.label}
            </button>
          ))}
        </div>

        {/* EXPANDABLE CONTENT */}
        <div
          ref={accordionRef}
          className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            gridTemplateRows: activeTab ? '1fr' : '0fr',
            willChange: (activeTab || renderedTab) ? 'grid-template-rows' : 'auto',
          }}
          onTransitionEnd={(e) => {
            if (e.propertyName === 'grid-template-rows' && !activeTab) {
              setRenderedTab(null);
            }
          }}
        >
          <div className="overflow-hidden">
            <div className="pt-6 pb-1">
              {renderedTab === 'core' && (
                <motion.div
                  animate={{ opacity: activeTab === 'core' ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {exp.contributions.map((contrib, idx) => (
                    <div key={idx} className="bg-[#F9F8F4] border border-[#2E4C38]/8 rounded-xl md:rounded-2xl p-4 md:p-5">
                      <h4 className="flex items-center gap-2.5 text-sm md:text-base font-semibold text-[#1A2F24] mb-3 font-sans leading-tight">
                        <span className="text-[#4A6750] shrink-0">{contrib.icon}</span>
                        {contrib.system}
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {contrib.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-[12px] md:text-[13px] text-gray-600 leading-relaxed font-sans text-left sm:text-justify">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4A6750] mt-1.5 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}

              {renderedTab === 'culture' && (
                <motion.div
                  animate={{ opacity: activeTab === 'culture' ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                >
                  {exp.culture.map((item) => (
                    <div key={item.id} className="w-full rounded-xl md:rounded-2xl overflow-hidden border border-[#2E4C38]/10 bg-[#F9F8F4]">
                      <div className="w-full aspect-video bg-gray-200 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={handleImageError} />
                      </div>
                      <div className="p-4 md:p-5">
                        <h4 className="font-bold text-sm md:text-[14px] text-[#1A2F24] mb-1 font-sans">{item.title}</h4>
                        <p className="text-[11px] md:text-[12px] text-gray-600 leading-relaxed font-sans text-left sm:text-justify">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
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
      className="relative z-0 flex flex-col pt-24 lg:pt-36 px-4 sm:px-10 lg:px-16 pb-24 md:pb-32 min-h-[100dvh] bg-[#F9F8F4] overflow-x-hidden font-sans text-gray-800"
    >
      <StaticDotGrid />

      <div className="w-full relative z-10">
        <motion.div variants={textThereVariants} className="w-full mb-10 md:mb-20">
          <h1 className="font-seasons text-[12vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-[#1A2F24]">
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