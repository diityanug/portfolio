import { useState, type ReactElement, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';
import StarGrid from '../components/profilePage/StarGrid';

/* ICONS RESIZABLE */
const ArrowUpRight = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const EduIcon = ({ size = 24 }: { size?: number }): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const CertIcon = ({ size = 24 }: { size?: number }): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

/* BUTTERY SMOOTH ANIMATIONS */
const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutQuint } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } }
};

const heroContentVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutQuint, staggerChildren: 0.12 } }
};

const childVariants: Variants = {
  hidden: { opacity: 0, x: -15, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: easeOutQuint } }
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)", y: 30 },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { duration: 1.2, ease: easeOutQuint, delay: 0.4 } }
};

const panelVariants: Variants = {
 hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.45, ease: easeOutQuint },
      opacity: { duration: 0.35, delay: 0.1 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.4, ease: easeOutQuint },
      opacity: { duration: 0.2 },
    },
  },
};

type EduCertKey = 'education' | 'certificates';

const eduCertTabs: { key: EduCertKey; label: string; desc: string; icon: ReactElement }[] = [
  { key: 'education', label: 'Education', desc: 'Academic history & focus areas', icon: <EduIcon size={22} /> },
  { key: 'certificates', label: 'Certificates', desc: 'Professional credentials & licenses', icon: <CertIcon size={22} /> },
];

/* MAIN REVAMPED COMPONENT */
const ProfilePage = (): ReactElement => {
  const [activeSection, setActiveSection] = useState<EduCertKey | null>(null);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-24 md:pt-36 px-6 md:px-12 lg:px-20 pb-28 min-h-screen bg-[#F9F8F4] overflow-x-hidden text-[#1A2F24]"
    >
      {/* BACKGROUND GRAPHIC */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <StarGrid />
      </div>

      <div className="w-full relative z-10 flex flex-col max-w-6xl mx-auto">
        
        {/* HERO ACCENT */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16 mb-14 md:mb-24 mt-2">
          
          {/* LEFT SIDE: INTRODUCTION */}
          <motion.div 
            variants={heroContentVariants}
            className="w-full lg:w-[62%] flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="flex flex-col mb-8 w-full select-none">
              <motion.h1 variants={childVariants} className="font-seasons text-[15vw] sm:text-[85px] md:text-[95px] lg:text-[105px] leading-[0.85] tracking-tight text-[#1A2F24]">
                Hi
              </motion.h1>
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-1">
                <motion.h1 variants={childVariants} className="font-seasons text-[15vw] sm:text-[85px] md:text-[95px] lg:text-[105px] leading-[0.85] tracking-tight text-[#4A6750] italic font-normal">
                  There!
                </motion.h1>
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "60px", opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="h-[1.5px] bg-[#4A6750]/40 hidden lg:block mt-6" 
                />
              </div>
            </div>

            <motion.div variants={childVariants} className="flex flex-col gap-5 w-full font-redhat text-justify text-base md:text-[17px] lg:text-[18px] leading-relaxed text-[#2E4C38]/90 font-medium tracking-wide">
              <p>
                I'm <span className="text-[#4A6750] font-bold border-b border-[#4A6750]/20 pb-0.5">Aditya</span>! 👋 a Software Engineer with experience in both Smart Factory systems and Frontend Development. My primary role involves equipment modeling, server monitoring, and maintaining equipment alarm systems to ensure reliable manufacturing operations across multiple production sites.
              </p>
              <p>
                Alongside my main responsibilities, I contribute to several internal web applications, building microfrontend-based systems using React and TypeScript for HRIS, LMS, and Job Portal platforms.
              </p>
              <p className="border-l-2 border-[#4A6750]/40 pl-4 mt-1 italic text-[#2E4C38]/80 font-normal">
                Beyond my daily work, I love exploring cloud technologies, automation, and machine learning with Python.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={photoVariants}
            className="w-full lg:w-[38%] flex justify-center lg:justify-end mt-4 lg:mt-6"
          >
            <div className="relative w-full max-w-[250px] sm:max-w-[280px] lg:max-w-[310px] aspect-[3/4] group">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#4A6750]/10 to-transparent blur-xl opacity-80 pointer-events-none" />
              <div className="absolute inset-0 rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl border border-[#4A6750]/30 pointer-events-none translate-x-3.5 translate-y-3.5 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              
              <div className="relative w-full h-full rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl overflow-hidden ring-1 ring-[#4A6750]/20 shadow-[0_20px_45px_-12px_rgba(46,76,56,0.18)] bg-[#F9F8F4]">
                <img
                  src="/images/pic_aboutMe.webp"
                  alt="Aditya Nugraha Irwan"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-transform duration-700 ease-out"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F24]/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* HIGH-LIGHTED INTERACTIVE SYSTEM */}
        <div className="w-full flex flex-col gap-6">
          
          {/* INTERACTIVE ROW CARDS */}
          {/* Penyesuaian p-4 di mobile agar hemat tempat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {eduCertTabs.map((tab) => {
              const isActive = activeSection === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveSection(isActive ? null : tab.key)}
                  className={`relative flex items-center gap-4 sm:gap-5 p-4 sm:p-6 text-left rounded-2xl border transition-all duration-300 outline-none overflow-hidden group ${
                    isActive 
                      ? 'bg-[#1A2F24] border-[#1A2F24] text-[#F9F8F4] shadow-md shadow-[#1A2F24]/10' 
                      : 'bg-[#4A6750]/[0.03] border-[#2E4C38]/12 text-[#1A2F24] hover:bg-[#4A6750]/[0.07] hover:border-[#4A6750]/30 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Dynamic Icon Base */}
                  <div className={`p-3 rounded-xl shrink-0 transition-all duration-300 ${
                    isActive ? 'bg-[#4A6750] text-[#F9F8F4] scale-105' : 'bg-[#1A2F24]/5 text-[#4A6750] group-hover:bg-[#4A6750]/10'
                  }`}>
                    {tab.icon}
                  </div>
                  
                  {/* Meta Details */}
                  <div className="flex flex-col min-w-0 pr-4">
                    <span className="font-redhat text-base sm:text-xl font-bold tracking-tight">
                      {tab.label}
                    </span>
                    <span className={`font-redhat text-xs mt-0.5 transition-colors line-clamp-1 ${
                      isActive ? 'text-[#F9F8F4]/65' : 'text-[#1A2F24]/55'
                    }`}>
                      {tab.desc}
                    </span>
                  </div>

                  {/* Corner Visual Indicator */}
                  <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#4A6750]' : 'bg-[#1A2F24]/30'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* DYNAMIC EXPANDABLE SECTION */}
          <div className="w-full">
            <AnimatePresence initial={false} mode="wait">
              {activeSection && (
                <motion.div
                  key={activeSection}
                  variants={panelVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="w-full overflow-hidden"
                >
                  {/* Menyesuaian p-4 di mobile */}
                  <div className="bg-[#4A6750]/[0.015] border border-[#2E4C38]/8 rounded-2xl p-4 md:p-8 lg:p-10 shadow-inner mt-1">

                  {activeSection === 'education' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      {EDUCATION_DATA.map((edu: any, index: number) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="bg-[#F9F8F4] p-5 md:p-7 rounded-xl border border-[#2E4C38]/5 hover:border-[#4A6750]/20 transition-all flex flex-col h-full group shadow-sm"
                        >
                          <div className="min-h-[50px] md:min-h-[72px] pb-3 mb-4 border-b border-[#2E4C38]/8 flex flex-col justify-start">
                            <h3 className="font-redhat text-lg md:text-2xl text-[#1A2F24] tracking-tight font-bold group-hover:text-[#4A6750] transition-colors duration-300 leading-snug">
                              {edu.degree || edu.title}
                            </h3>
                          </div>

                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex flex-col gap-0.5 min-w-0">
                              {/* FIX: Mengganti 'truncate' menjadi 'break-words' agar nama Universitas panjang terlipat rapi */}
                              <h4 className="font-redhat tracking-wide text-[#4A6750] text-xs md:text-base font-bold uppercase break-words">
                                {edu.institution || edu.school}
                              </h4>
                              <span className="font-redhat text-[11px] md:text-sm font-semibold tracking-wider text-[#1A2F24]/45">
                                {edu.period || edu.year || edu.date}
                              </span>
                            </div>

                            {(edu.gpa || edu.ipk) && (
                              <div className="flex items-center bg-[#1A2F24] text-[#F9F8F4] px-2.5 py-1 rounded-full text-[10px] md:text-xs font-redhat font-bold tracking-wider uppercase shrink-0 select-none">
                                <span>GPA {edu.gpa || edu.ipk}</span>
                              </div>
                            )}
                          </div>

                          {edu.focus && (
                            <div className="font-redhat text-[#1A2F24]/85 text-xs md:text-[15px] mb-3 pl-3 border-l-[1.5px] border-[#4A6750]/40 break-words">
                              <strong className="font-bold text-[#1A2F24]">Focus:</strong> {edu.focus}
                            </div>
                          )}

                          {edu.description && (
                            <p className="text-[#1A2F24]/60 text-xs md:text-[15px] leading-relaxed font-redhat mt-auto text-left text-pretty">
                              {edu.description}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'certificates' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                      {CERTIFICATES_DATA.map((cert: any, index: number) => (
                        <motion.div
                          key={cert.title || index}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="bg-[#F9F8F4] hover:bg-white p-5 rounded-xl transition-all flex flex-col h-full group border border-[#2E4C38]/5 hover:border-[#4A6750]/20 shadow-sm"
                        >
                          <a
                            href={cert.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col h-full justify-between gap-5 outline-none"
                          >
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center justify-between gap-3">
                                {/* FIX: Mengganti 'truncate' menjadi 'break-words' agar nama Issuer (seperti Universitas Indonesia) tidak terpotong */}
                                <span className="text-[11px] md:text-sm font-bold text-[#4A6750]/75 font-redhat tracking-wide break-words min-w-0 flex-1">
                                  {cert.issuer || cert.organization}
                                </span>
                                {cert.year && (
                                  <span className="font-redhat tracking-wider text-[10px] md:text-xs font-bold text-[#4A6750] bg-[#4A6750]/5 px-2 py-0.5 rounded-md shrink-0">
                                    {cert.year}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-redhat text-sm md:text-[17px] font-bold text-[#1A2F24] group-hover:text-[#4A6750] transition-colors line-clamp-3 leading-snug">
                                {cert.title || cert.name}
                              </h3>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#1A2F24]/5 text-[#1A2F24]/40 flex items-center justify-center group-hover:bg-[#4A6750] group-hover:text-white group-hover:rotate-45 transition-all duration-300 self-end shadow-xs shrink-0">
                              <ArrowUpRight />
                            </div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;