import { useState, useMemo, type ReactElement, type SyntheticEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';
import { useSkipHeavyEffects } from '../hooks/useSkipHeavyEffects';
import { SKILL_ICON_MAP } from '../utils/skillIcons';

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

const getChildVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 20, ...(skipBlur ? {} : { filter: "blur(5px)" }) },
  show: { opacity: 1, y: 0, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 1, ease: customEase } }
});

const getPhotoVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, x: 30, ...(skipBlur ? {} : { filter: "blur(10px)" }) },
  show: { opacity: 1, x: 0, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 1.2, ease: customEase, delay: 0.2 } }
});

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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  const skipHeavyEffects = useSkipHeavyEffects();
  const childVariants = useMemo(() => getChildVariants(skipHeavyEffects), [skipHeavyEffects]);
  const photoVariants = useMemo(() => getPhotoVariants(skipHeavyEffects), [skipHeavyEffects]);
  
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
      className="bg-white border border-[#1A2F24]/10 p-6 md:p-8 rounded-[1.25rem] hover:border-[#4A6750]/30 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between outline-none shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] h-[172px] md:h-[190px] snap-center"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semi bold text-[#4A6750]/70 font-karla  tracking-wider uppercase truncate pr-2">
          {cert.issuer || cert.organization}
        </span>
        <div className="w-8 h-8 rounded-full bg-[#1A2F24]/5 flex items-center justify-center text-[#1A2F24]/40 group-hover:bg-[#4A6750] group-hover:text-white group-hover:rotate-45 transition-all duration-300 shrink-0">
          <ArrowUpRight />
        </div>
      </div>
      <h3 className="font-overlock text-[16px] md:text-[16px] font-bold text-[#1A2F24] group-hover:text-[#4A6750] transition-colors leading-snug mb-2 line-clamp-2">
        {cert.title || cert.name}
      </h3>
      {cert.year && (
        <span className="font-autour tracking-widest text-[10px] md:text-[11px] font-bold text-[#1A2F24]/30 uppercase mt-auto pt-1">
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
      className="relative z-0 isolate flex flex-col pt-6 pb-16 md:py-12 lg:py-16 px-6 md:px-12 lg:px-24 bg-[#F9F8F4] overflow-hidden text-[#1A2F24] w-full scroll-mt-20"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" />

      <div className="w-full relative z-10 flex flex-col max-w-7xl mx-auto gap-20 lg:gap-24">
        
        {/* Bio Section */}
        <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div
            variants={contentVariants}
            style={{ willChange: 'filter, opacity, transform' }}
            className="w-full lg:w-3/5 flex flex-col text-left justify-center"
          >
            {/* Header - Now fully text-left */}
            <motion.div variants={childVariants} className="w-full flex flex-col mb-6 md:mb-8 text-left">
              <span className="font-overlock text-[10px] tracking-[0.25em] uppercase text-[#4A6750] font-bold mb-2">
                Profile
              </span>
              <h2 className="font-autour text-[35px] sm:text-[54px] lg:text-[64px] tracking-tight text-[#1A2F24] leading-[1.1]">
                About <span className="text-[#4A6750]">Me</span>
              </h2>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="flex flex-col gap-5 md:gap-6 w-full font-karla text-justify"
            >
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#2E4C38]/80 font-normal">
                I’m a Software Engineer focused on frontend development using TypeScript
                and React, while also exploring backend development with Python and
                FastAPI. I enjoy building modern, clean, and user-friendly web
                applications while continuously learning and improving my skills.
              </p>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#2E4C38]/80 font-normal">
                Outside of coding, I enjoy playing games and spending time with sports,
                especially badminton and basketball. I can play other sports too, but
                whether I’m actually good at them is another story. I also enjoy trying
                new things and simply having fun with whatever I’m doing.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={photoVariants}
            style={{ willChange: 'filter, opacity, transform' }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[280px] lg:max-w-[320px] aspect-[4/5] group mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-[#4A6750] rounded-3xl rotate-6 opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105" />
              <div className="absolute inset-0 border border-[#1A2F24]/20 rounded-3xl -rotate-3 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-[#1A2F24]/10 bg-[#EAE8E3] z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <img src="/images/pic_aboutMe.webp" alt="Aditya Nugraha Irwan" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[10%] contrast-[105%] transition-transform duration-700 ease-out group-hover:scale-105" onError={handleImageError} />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Details Section */}
        <div id="tabs-section" className="w-full flex flex-col items-start">
          
          {/* Navigation Tabs */}
          <div className="w-full flex justify-center gap-6 border-b border-[#1A2F24]/10 mb-6 md:mb-8 relative overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => toggleTab(tab.key)}
                className={`pb-3 text-[12px] md:text-[12px] font-karla font-bold tracking-[0.15em] uppercase relative transition-colors outline-none shrink-0 ${
                  activeTab === tab.key ? 'text-[#1A2F24]' : 'text-[#1A2F24]/30 hover:text-[#1A2F24]/70'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div 
                    layoutId="activeTabProfile"
                    className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#4A6750]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="w-full overflow-hidden">
            {/* Tab Contents */}
            <div className="grid grid-cols-1 items-start min-h-[380px] md:min-h-[420px]">
              <AnimatePresence mode="wait">
                
                {/* Education Tab */}
                {activeTab === 'education' && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: customEase }}
                    className="col-start-1 row-start-1 flex flex-row gap-5 md:gap-6 w-full overflow-x-auto pb-6 pt-1 show-scrollbar snap-x snap-mandatory px-4 md:px-0"
                  >
                    {EDUCATION_DATA.map((edu: Education, index: number) => (
                      <div key={index} className="bg-white border border-[#1A2F24]/10 rounded-[1.25rem] transition-all shadow-sm hover:shadow-md group flex flex-col w-[85vw] sm:w-[340px] md:w-[380px] shrink-0 h-[360px] md:h-[400px] snap-center relative overflow-hidden">
                        
                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] scale-[4] transform-gpu pointer-events-none group-hover:scale-[4.5] group-hover:opacity-[0.04] transition-all duration-700">
                          <GraduationCapIcon />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                            <span className="font-karla text-[11px] font-bold text-[#4A6750] tracking-widest uppercase mb-3 block">
                              {edu.period || edu.year || edu.date}
                            </span>
                            <h4 className="font-karla font-semi bold text-[#1A2F24] text-[14px] md:text-[15px] leading-snug mb-1.5 opacity-80">
                              {edu.institution || edu.school}
                            </h4>
                            <h3 className="font-overlock font-bold text-[24px] md:text-[28px] text-[#1A2F24] leading-tight group-hover:text-[#4A6750] transition-colors mb-5 pr-2">
                                {edu.degree || edu.title}
                            </h3>
                            
                            <div>
                              {(edu.gpa || edu.ipk) && (
                                <span className="inline-flex items-center gap-1.5 bg-[#4A6750]/10 text-[#4A6750] px-3 py-1.5 rounded-lg text-[11px] font-overlock font-bold tracking-widest uppercase shadow-sm">
                                  <BookIcon />
                                  GPA {edu.gpa || edu.ipk}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-auto bg-[#F9F8F4]/50 border-t border-[#1A2F24]/5 p-6 md:p-8 transition-colors w-full">
                            <div className="font-overlock text-[10px] md:text-[11px] font-bold tracking-widest text-[#4A6750]/80 uppercase mb-2">
                                Focus
                            </div>
                            {edu.focus && (
                                <div className="font-overlock text-[#1A2F24] text-[18px] md:text-[15px] font-bold tracking-wide">
                                    {edu.focus}
                                </div>
                            )}
                            {edu.description && (
                              <p className="text-[#1A2F24]/70 text-[13px] leading-relaxed font-overlock text-left line-clamp-2 mt-1.5">
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
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: customEase }}
                    className="col-start-1 row-start-1 w-full flex flex-col pt-1"
                  >
                    <div className="grid grid-rows-2 grid-flow-col gap-4 md:gap-5 w-full overflow-x-auto pb-6 show-scrollbar snap-x snap-mandatory px-4 md:px-0">
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
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, ease: customEase }}
                    className="col-start-1 row-start-1 flex flex-row gap-5 md:gap-6 w-full overflow-x-auto pb-6 pt-1 show-scrollbar snap-x snap-mandatory px-4 md:px-0"
                  >
                    {TECH_CATEGORIES.map((category: TechCategory, index: number) => (
                      <div 
                        key={index}
                        className="bg-white border border-[#1A2F24]/10 rounded-[1.25rem] transition-all shadow-sm hover:shadow-md flex flex-col w-[85vw] sm:w-[340px] md:w-[380px] shrink-0 h-[360px] md:h-[400px] snap-center group relative overflow-hidden"
                      >
                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] scale-[4] transform-gpu pointer-events-none group-hover:scale-[4.5] group-hover:opacity-[0.05] transition-all duration-700">
                          {category.icon}
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center border-b border-[#1A2F24]/5">
                            <div className="flex items-center gap-3 mb-3 text-[#1A2F24] group-hover:text-[#4A6750] transition-colors">
                              <div className="opacity-80 scale-110 origin-left">{category.icon}</div>
                              <h3 className="font-overlock text-[22px] md:text-[21px] font-bold">
                                {category.title}
                              </h3>
                            </div>
                            <p className="font-karla text-[13.5px] md:text-[14.5px] text-[#2E4C38]/80 mb-0 leading-relaxed text-left">
                              {category.description}
                            </p>
                          </div>
                          
                          <div className="mt-auto bg-[#F9F8F4]/50 p-6 md:p-8 transition-colors w-full h-[220px] md:h-[240px]">
                            <div className="font-overlock text-[10px] md:text-[11px] font-bold tracking-widest text-[#4A6750]/80 uppercase mb-3">
                              Core Stack
                            </div>

                            <div className="flex flex-wrap gap-2 pr-1">
                              {category.skills.map((skill: Skill, i: number) => {
                                const SkillIcon = skill.slug ? SKILL_ICON_MAP[skill.slug] : undefined;
                                return (
                                  <span 
                                    key={i}
                                    className="group/badge flex items-center gap-2 px-2.5 py-1.5 bg-white border border-[#1A2F24]/10 text-[#1A2F24]/80 text-[11px] md:text-xs font-karla font-semibold tracking-wide rounded-lg hover:bg-[#4A6750] hover:text-white hover:border-[#4A6750] transition-colors duration-300 cursor-default shadow-sm"
                                  >
                                    {SkillIcon && (
                                      <SkillIcon
                                        size={14}
                                        color="currentColor"
                                        aria-hidden="true"
                                        className="opacity-70 group-hover/badge:opacity-100 transition-opacity duration-300"
                                      />
                                    )}
                                    {skill.name}
                                  </span>
                                );
                              })}
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
            <div className="flex justify-center md:justify-start items-center gap-1.5 text-[10px] md:text-[11px] font-karla tracking-widest text-[#1A2F24]/40 uppercase select-none mt-2">
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