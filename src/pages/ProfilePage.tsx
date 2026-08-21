import { useState, type ReactElement, type SyntheticEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';

// Types & Interfaces
type TabKey = 'education' | 'certificates' | 'skills';

interface Skill {
  name: string;
  slug?: string;
}

interface TechCategory {
  title: string;
  icon: ReactElement;
  description: string;
  skills: Skill[];
}

interface Certificate {
  title?: string;
  name?: string;
  link?: string;
  issuer?: string;
  organization?: string;
  year?: string | number;
}

interface Education {
  period?: string;
  year?: string;
  date?: string;
  institution?: string;
  school?: string;
  degree?: string;
  title?: string;
  gpa?: string | number;
  ipk?: string | number;
  focus?: string;
  description?: string;
}

// UI Icons
const ArrowUpRight = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const GraduationCapIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const BookIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

// Animation configurations
const customEase = [0.22, 1, 0.36, 1] as const; 

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: customEase } }
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase } }
};

const photoVariants: Variants = {
  hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: customEase, delay: 0.2 } }
};

// Local Data
const tabs: { key: TabKey; label: string }[] = [
  { key: 'education', label: 'Education' },
  { key: 'certificates', label: 'Certifications' },
  { key: 'skills', label: 'Skills' },
];

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Frontend",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    description: "Building interactive interfaces and microfrontend systems.",
    skills: [
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Framer Motion", slug: "framer" },
      { name: "JavaScript", slug: "javascript" },
      { name: "HTML", slug: "html5" },
      { name: "Microfrontend Architecture", slug: "webpack" },
    ]
  },
  {
    title: "Backend & Cloud",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    description: "Exploring backend development, APIs, and cloud technologies.",
    skills: [
      { name: "FastAPI", slug: "fastapi" },
      { name: "REST APIs", slug: "openapiinitiative" },
      { name: "Python", slug: "python" },
      { name: "Haskell", slug: "haskell" },
      { name: "AWS Cloud"},
      { name: "AWS S3"},
      { name: "DevOps", slug: "docker" }
    ]
  },
  {
    title: "Machine Learning & Data",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    description: "Exploring NLP, text preprocessing, and classification models.",
    skills: [
      { name: "Pandas", slug: "pandas" },
      { name: "Scikit-Learn", slug: "scikitlearn" },
      { name: "spaCy", slug: "spacy" },
      { name: "Natural Language Processing" },
      { name: "TF-IDF" },
      { name: "Naive Bayes" },
      { name: "Data Visualization" },
    ]
  },
  {
    title: "Automation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    ),
    description: "Automating workflows and exploring process automation.",
    skills: [
      { name: "Selenium", slug: "selenium" },
      { name: "BeautifulSoup", slug: "pypi" },
      { name: "PyAutoGUI", slug: "pypi" },
    ]
  }
];

// Profile Section
const ProfileSection = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<TabKey>('education');
  
  // Handlers
  const toggleTab = (tab: TabKey) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  // Certificate Card
  const renderCertCard = (cert: Certificate, index: number) => (
    <a
      key={cert.title || index}
      href={cert.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/60 backdrop-blur-sm p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-white/80 hover:border-[#4A6750]/30 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between outline-none shrink-0 w-[260px] md:w-[320px] h-[162px] md:h-[178px] snap-center"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] sm:text-xs font-bold text-[#4A6750]/70 font-redhat tracking-wider uppercase truncate pr-2">
          {cert.issuer || cert.organization}
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#1A2F24]/5 flex items-center justify-center text-[#1A2F24]/40 group-hover:bg-[#4A6750] group-hover:text-white group-hover:rotate-45 group-hover:border-transparent transition-all duration-300 shrink-0">
          <ArrowUpRight />
        </div>
      </div>
      <h3 className="font-redhat text-sm sm:text-lg font-bold text-[#1A2F24] group-hover:text-[#4A6750] transition-colors leading-snug mb-2 line-clamp-2">
        {cert.title || cert.name}
      </h3>
      {cert.year && (
        <span className="font-redhat tracking-widest text-[10px] font-bold text-[#1A2F24]/30 uppercase mt-auto pt-1">
          Issued {cert.year}
        </span>
      )}
    </a>
  );

  return (
    <motion.section 
      id="profile"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative z-0 isolate flex flex-col pt-16 pb-12 md:pt-20 md:pb-20 px-4 md:px-12 lg:px-20 bg-[#F9F8F4] overflow-hidden text-[#1A2F24] w-full scroll-mt-20"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" />

      <div className="w-full relative z-10 flex flex-col max-w-6xl mx-auto gap-10 md:gap-16">
        
        {/* Bio Section */}
        <div className="w-full bg-white/70 backdrop-blur-none md:bg-white/40 md:backdrop-blur-xl border border-white/60 shadow-[0_16px_24px_-8px_rgb(0,0,0,0.03)] rounded-2xl md:rounded-[3rem] p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <motion.div
            variants={contentVariants}
            style={{ willChange: 'filter, opacity, transform' }}
            className="w-full lg:w-[55%] flex flex-col text-left justify-center"
          >
            <motion.h2 variants={childVariants} className="font-seasons text-[14vw] sm:text-[60px] md:text-[75px] leading-[1.1] tracking-tight text-[#1A2F24]">
              Hi <span className="italic text-[#4A6750]">There!</span>
            </motion.h2>

            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "80px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: customEase }}
              className="h-[2px] bg-[#4A6750]/30 mt-5 mb-6 md:mt-8 md:mb-10 rounded-full" 
            />

            <motion.div variants={childVariants} className="flex flex-col gap-4 md:gap-5 w-full font-redhat text-justify tracking-wide">
              <p className="text-[14px] font-medium leading-[1.8] text-[#2E4C38]/80 md:text-[16px]">
                I&apos;m{' '}
                <span className="border-b border-[#4A6750]/30 pb-0.5 font-bold text-[#4A6750]">
                  Aditya
                </span>
                , a Software Engineer working across{' '}
                <strong className="font-bold text-[#1A2F24]">Smart Factory</strong>{' '}
                operations and modern{' '}
                <strong className="font-bold text-[#1A2F24]">
                  Frontend Development
                </strong>
                . I work with equipment modeling, server monitoring, and alarm
                maintenance to support reliable manufacturing operations.
              </p>

              <p className="text-[13.5px] font-medium leading-[1.8] text-[#2E4C38]/60 md:text-[15px]">
                I also build scalable internal applications using{' '}
                <strong className="font-bold text-[#1A2F24]/80">
                  React &amp; TypeScript
                </strong>
                , including microfrontend-based systems, while exploring cloud
                technologies, automation, and machine learning.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={photoVariants}
            style={{ willChange: 'filter, opacity, transform' }}
            className="w-full lg:w-[45%] flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[320px] aspect-[4/5] group">
              <div className="absolute inset-0 bg-[#4A6750] rounded-3xl rotate-6 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105" />
              <div className="absolute inset-0 border border-[#1A2F24]/20 rounded-3xl -rotate-3 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-[#1A2F24]/10 bg-[#EAE8E3] z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <img src="/images/pic_aboutMe.webp" alt="Aditya Nugraha Irwan" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[10%] contrast-[105%] transition-transform duration-700 ease-out group-hover:scale-105" onError={handleImageError} />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div id="tabs-section" className="w-full flex flex-col items-center">
          <div className="inline-flex items-center justify-center bg-[#1A2F24]/5 p-1.5 rounded-2xl w-fit max-w-full overflow-x-auto scrollbar-none mb-6 md:mb-10 relative z-10 gap-1 sm:gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => toggleTab(tab.key)}
                  className={`relative px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-redhat font-bold rounded-xl transition-colors duration-300 shrink-0 outline-none whitespace-nowrap ${
                    isActive ? 'text-[#1A2F24]' : 'text-[#1A2F24]/40 hover:text-[#1A2F24]/70'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/5" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full overflow-hidden pt-2 pb-2">
            
            {/* Tab Contents */}
            <div className="grid grid-cols-1 items-start min-h-[360px] md:min-h-[400px]">
              <AnimatePresence>
                
                {/* Education Tab */}
                {activeTab === 'education' && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: customEase }}
                    className="col-start-1 row-start-1 flex flex-row gap-4 md:gap-6 w-full overflow-x-auto pb-4 show-scrollbar snap-x snap-mandatory"
                  >
                    {EDUCATION_DATA.map((edu: Education, index: number) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-3xl md:rounded-[2rem] border border-white/80 hover:border-[#4A6750]/30 transition-all shadow-sm hover:shadow-md group flex flex-col w-[85vw] sm:w-[340px] md:w-[420px] shrink-0 h-[340px] md:h-[380px] snap-center relative overflow-hidden">
                        
                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] scale-[4] transform-gpu pointer-events-none group-hover:scale-[4.5] group-hover:opacity-[0.04] transition-all duration-700">
                          <GraduationCapIcon />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                            <span className="font-redhat text-[11px] sm:text-xs font-bold text-[#4A6750] tracking-widest uppercase mb-2 block">
                              {edu.period || edu.year || edu.date}
                            </span>
                            <h4 className="font-redhat font-bold text-[#1A2F24] text-sm md:text-base leading-snug mb-1.5 opacity-80">
                              {edu.institution || edu.school}
                            </h4>
                            <h3 className="font-redhat text-[22px] md:text-2xl text-[#1A2F24] font-bold leading-tight group-hover:text-[#4A6750] transition-colors mb-4 pr-2">
                              {edu.degree || edu.title}
                            </h3>
                            
                            <div>
                              {(edu.gpa || edu.ipk) && (
                                <span className="inline-flex items-center gap-1.5 bg-[#4A6750]/10 text-[#4A6750] px-3 py-1.5 rounded-lg text-[11.5px] font-redhat font-bold tracking-widest uppercase shadow-sm">
                                  <BookIcon />
                                  GPA {edu.gpa || edu.ipk}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-auto bg-white/40 border-t border-white/60 shadow-[0_-2px_15px_rgb(0,0,0,0.02)] p-6 md:p-8 group-hover:bg-white/60 transition-colors w-full">
                            <div className="font-redhat text-[10px] md:text-[11px] font-bold tracking-widest text-[#4A6750]/60 uppercase mb-2.5">
                              Focus
                            </div>
                            {edu.focus && (
                              <div className="font-redhat text-[#1A2F24] text-[13.5px] md:text-[14.5px] leading-relaxed font-bold">
                                {edu.focus}
                              </div>
                            )}
                            {edu.description && (
                              <p className="text-[#1A2F24]/70 text-[12.5px] md:text-sm leading-relaxed font-redhat text-left line-clamp-2 mt-1.5">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Certificates Tab */}
                {activeTab === 'certificates' && (
                  <motion.div
                    key="certificates"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: customEase }}
                    className="col-start-1 row-start-1 w-full flex flex-col"
                  >
                    <div className="grid grid-rows-2 grid-flow-col gap-4 md:gap-6 w-full overflow-x-auto pb-4 show-scrollbar snap-x snap-mandatory">
                      {CERTIFICATES_DATA.map((cert: Certificate, index: number) => 
                        renderCertCard(cert, index)
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: customEase }}
                    className="col-start-1 row-start-1 flex flex-row gap-4 md:gap-6 w-full overflow-x-auto pb-4 show-scrollbar snap-x snap-mandatory"
                  >
                    {TECH_CATEGORIES.map((category: TechCategory, index: number) => (
                      <div 
                        key={index}
                        className="bg-white/60 backdrop-blur-sm rounded-3xl md:rounded-[2rem] border border-white/80 hover:border-[#4A6750]/30 transition-all shadow-sm hover:shadow-md flex flex-col w-[85vw] sm:w-[320px] md:w-[360px] shrink-0 h-[340px] md:h-[380px] snap-center group relative overflow-hidden"
                      >
                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] scale-[4] transform-gpu pointer-events-none group-hover:scale-[4.5] group-hover:opacity-[0.05] transition-all duration-700">
                          {category.icon}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="p-5 md:p-6 flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-3 text-[#1A2F24] group-hover:text-[#4A6750] transition-colors">
                              <div className="opacity-80 scale-110 origin-left">{category.icon}</div>
                              <h3 className="font-redhat text-lg md:text-xl font-bold">
                                {category.title}
                              </h3>
                            </div>
                            <p className="font-redhat text-[13.5px] md:text-[14.5px] text-[#1A2F24]/70 mb-0 leading-relaxed text-left">
                              {category.description}
                            </p>
                          </div>
                          
                          <div className="mt-auto bg-white/40 border-t border-white/60 shadow-[0_-2px_15px_rgb(0,0,0,0.02)] p-5 md:p-6 group-hover:bg-white/60 transition-colors w-full">
                            <div className="font-redhat text-[10px] md:text-[11px] font-bold tracking-widest text-[#4A6750]/60 uppercase mb-2.5">
                              Core Stack
                            </div>
                            <div className="flex flex-wrap gap-1.5 md:gap-2 max-h-[150px] overflow-y-auto show-scrollbar pr-1">
                              {category.skills.map((skill: Skill, i: number) => (
                                <span 
                                  key={i}
                                  className="group/badge flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#1A2F24]/10 text-[#1A2F24]/80 text-[10.5px] md:text-xs font-redhat font-bold tracking-wide rounded-lg hover:bg-[#4A6750] hover:text-white hover:border-[#4A6750] transition-colors duration-300 cursor-default shadow-sm"
                                >
                                  {skill.slug && (
                                    <img 
                                      src={`https://cdn.simpleicons.org/${skill.slug}/1A2F24`} 
                                      alt={skill.name}
                                      className="w-3.5 h-3.5 opacity-70 group-hover/badge:brightness-0 group-hover/badge:invert group-hover/badge:opacity-100 transition-all duration-300"
                                      loading="lazy"
                                    />
                                  )}
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
              
            {/* Navigation Hint */}
            <div className="flex justify-center items-center gap-1.5 text-[10px] font-redhat tracking-widest text-[#1A2F24]/40 uppercase select-none mt-2">
              <span>Swipe sideways to explore</span>
              <span>→</span>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileSection;