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
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);



// Animation configurations
const customEase = [0.16, 1, 0.3, 1] as const; 

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: customEase } }
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const getChildVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 15, ...(skipBlur ? {} : { filter: "blur(4px)" }) },
  show: { opacity: 1, y: 0, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 0.8, ease: customEase } }
});

const getPhotoVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 40, x: 20, rotate: -4, ...(skipBlur ? {} : { filter: "blur(12px)" }) },
  show: { opacity: 1, y: 0, x: 0, rotate: 0, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
});

// Local Data
const tabs: { key: TabKey; label: string; icon: ReactElement }[] = [
  { key: 'education', label: 'Education', icon: <></> },
  { key: 'certificates', label: 'Certificates', icon: <></> },
  { key: 'skills', label: 'Skills', icon: <></> },
];

const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Frontend Architecture",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    title: "Backend & Infrastructure",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    title: "Data Intelligence",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    title: "Process Automation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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

// Profile Section (Antigravity Technical Aesthetic)
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

  const renderCertCard = (cert: Certificate, index: number) => (
    <a
      key={cert.title || index}
      href={cert.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between p-5 outline-none w-[82vw] sm:w-[280px] md:w-[320px] shrink-0 snap-center h-[160px] bg-[#f7f4ed] border-2 border-[#1c1c1c] transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-[#5f5f5d] group-hover:text-[#1c1c1c] transition-colors tracking-widest uppercase truncate pr-2">
          {cert.issuer || cert.organization}
        </span>
        <div className="text-[#5f5f5d] group-hover:text-[#1c1c1c] transition-colors shrink-0">
          <ArrowUpRight />
        </div>
      </div>
      <h3 className="font-sans text-base font-medium text-[#1c1c1c] group-hover:text-[#1c1c1c] transition-colors leading-snug mb-3">
        {cert.title || cert.name}
      </h3>
      {cert.year && (
        <div className="mt-auto pt-2 border-t border-[#eceae4]/50">
          <span className="font-mono text-[10px] text-[#5f5f5d] uppercase tracking-widest">
            Year: {cert.year}
          </span>
        </div>
      )}
    </a>
  );

  return (
    <motion.section 
      id="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative z-0 flex flex-col py-20 px-4 md:px-12 lg:px-24 bg-[#f7f4ed] text-[#1c1c1c] min-h-[100svh] scroll-mt-24"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-[-1] bg-[url('https://cdn.tailwindcss.com/bg-grid-black.svg')] bg-center opacity-[0.02]" style={{ backgroundSize: '24px 24px' }}></div>

      <div className="w-full relative z-10 flex flex-col max-w-7xl mx-auto gap-16 lg:gap-24">
        
        {/* Bio Section */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          <motion.div
            variants={contentVariants}
            className="w-full lg:w-3/5 flex flex-col text-left"
          >
            {/* Header */}
            <motion.div variants={childVariants} className="w-full flex flex-col mb-8 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-black/80 animate-pulse"></div>
                <span className="font-mono text-xs font-medium text-[#5f5f5d] uppercase tracking-widest">
                  Profile
                </span>
              </div>
              <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1c1c1c] leading-tight">
                About Me
              </h2>
            </motion.div>

            {/* Paragraphs */}
            <motion.div
              variants={childVariants}
              className="flex flex-col gap-6 w-full font-sans text-[#5f5f5d]"
            >
              <p className="text-lg leading-relaxed font-normal">
                I’m a Software Engineer focused on frontend development using TypeScript
                and React, while also exploring backend development with Python and
                FastAPI. I enjoy building modern, clean, and user-friendly web
                applications while continuously learning and improving my skills.
              </p>

              <p className="text-lg leading-relaxed font-normal text-[#5f5f5d]">
                Outside of coding, I enjoy playing games and spending time with sports,
                especially badminton and basketball. I can play other sports too, but
                whether I’m actually good at them is another story. I also enjoy trying
                new things and simply having fun with whatever I’m doing.
              </p>
            </motion.div>
          </motion.div>

          {/* Photo Gallery - Technical Framed Card */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] aspect-[4/5] p-2 group bg-[#f7f4ed] border-2 border-[#1c1c1c] transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]">
              <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-[#1c1c1c]/50 tracking-widest">
                
              </div>
              <div className="absolute bottom-4 right-4 z-10 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#eceae4]/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#eceae4]/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black/80"></div>
              </div>
              
              <div className="relative w-full h-full overflow-hidden bg-[#f7f4ed] border-2 border-[#1c1c1c]">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="/images/pic_aboutMe.webp" 
                  alt="Aditya Nugraha Irwan" 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 contrast-125 transition-all duration-700 ease-out scale-100 group-hover:scale-105" 
                  onError={handleImageError} 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Data Section */}
        <div className="w-full flex flex-col items-start bg-[#eceae4]/30 border border-[#eceae4] rounded-2xl p-4 md:p-8 backdrop-blur-sm">
          
          {/* CLI-style Tab Selector */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-[#eceae4] pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => toggleTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs md:text-sm font-medium tracking-wider transition-all duration-200 outline-none ${
                    activeTab === tab.key
                      ? 'bg-black/5 text-[#1c1c1c] shadow-sm border border-[#eceae4]'
                      : 'bg-transparent text-[#5f5f5d] hover:text-[#1c1c1c] border border-transparent hover:bg-black/5/50'
                  }`}
                >
                  <span className={activeTab === tab.key ? 'text-[#1c1c1c]' : 'text-[#5f5f5d]'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="font-mono text-[10px] text-[#5f5f5d] uppercase tracking-widest hidden lg:block">
              
            </div>
          </div>

          <div className="w-full overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* Education Tab */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 flex gap-5 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory w-full"
                >
                  {EDUCATION_DATA.map((edu: Education, index: number) => (
                    <div 
                      key={index} 
                      className="w-[82vw] sm:w-[320px] md:w-[380px] shrink-0 snap-center h-[340px] bg-[#f7f4ed] border-2 border-[#1c1c1c] p-6 flex flex-col relative overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]"
                    >
                        {/* Top Row: Year & GPA */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="inline-flex items-center gap-2 rounded-full border border-[#eceae4] bg-white px-3 py-1 font-sans text-[10px] font-semibold text-[#5f5f5d] uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1c]/20"></span>
                            {edu.period || edu.year || edu.date}
                          </span>
                          {(edu.gpa || edu.ipk) && (
                            <span className="font-sans text-[11px] font-bold text-[#1c1c1c] bg-[#eceae4] px-2.5 py-1 rounded-md tracking-wide">
                              GPA {edu.gpa || edu.ipk}
                            </span>
                          )}
                        </div>

                        {/* Middle: Degree & Institution */}
                        <div className="flex flex-col mb-auto">
                          <h3 className="font-sans text-2xl font-semibold text-[#1c1c1c] leading-tight mb-2 tracking-tight">
                            {edu.degree || edu.title}
                          </h3>
                          <h4 className="font-sans text-sm text-[#5f5f5d] font-medium">
                            {edu.institution || edu.school}
                          </h4>
                        </div>

                        {/* Bottom: Description / Focus */}
                        {(edu.focus || edu.description) && (
                          <div className="pt-5 mt-4 border-t border-[#eceae4]/60">
                            {edu.focus && (
                              <p className="font-sans text-sm font-semibold text-[#1c1c1c] mb-1">
                                {edu.focus}
                              </p>
                            )}
                            {edu.description && (
                              <p className="font-sans text-xs text-[#5f5f5d] leading-relaxed line-clamp-2">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 grid grid-rows-2 grid-flow-col gap-5 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory w-full"
                >
                  {CERTIFICATES_DATA.map((cert: Certificate, index: number) => 
                    renderCertCard(cert, index)
                  )}
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: customEase }}
                  className="col-start-1 row-start-1 flex gap-5 overflow-x-auto pb-4 pt-1 show-scrollbar snap-x snap-mandatory w-full"
                >
                  {TECH_CATEGORIES.map((category: TechCategory, index: number) => (
                    <div 
                      key={index}
                      className="flex flex-col w-[82vw] sm:w-[320px] md:w-[380px] shrink-0 snap-center h-full overflow-hidden group bg-[#f7f4ed] border-2 border-[#1c1c1c] transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]"
                    >
                      <div className="p-6 flex-1 flex flex-col border-b border-[#eceae4]/60">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-[#1c1c1c] bg-[#eceae4] p-2.5 rounded-lg border border-[#eceae4]">
                            {category.icon}
                          </div>
                          <h3 className="font-sans text-xl font-medium text-[#1c1c1c] tracking-tight">
                            {category.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[#5f5f5d] font-sans leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      
                      <div className="p-6 bg-[#eceae4]/20 flex-none">
                        <div className="font-mono text-[10px] text-[#5f5f5d] uppercase tracking-widest mb-4">
                          Stack
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill: Skill, i: number) => {
                            const SkillIcon = skill.slug ? SKILL_ICON_MAP[skill.slug] : undefined;
                            return (
                              <span 
                                key={i}
                                className="group/badge inline-flex items-center gap-2 px-3 py-1.5 bg-[#eceae4] border border-[#eceae4] text-[#1c1c1c] font-mono text-[11px] uppercase tracking-wider rounded-md hover:border-[#eceae4] hover:text-[#1c1c1c] transition-colors cursor-default"
                              >
                                {SkillIcon && (
                                  <SkillIcon
                                    size={14}
                                    color="currentColor"
                                    aria-hidden="true"
                                    className="opacity-60 group-hover/badge:opacity-100 transition-opacity"
                                  />
                                )}
                                {skill.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileSection;