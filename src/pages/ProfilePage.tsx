import type { ReactElement, SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';
import StarGrid from '../components/profilePage/StarGrid';

/* ARROW ICON HELPER */
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="17" x2="19" y2="5"></line>
    <polyline points="5 5 19 5 19 19"></polyline>
  </svg>
);

/* THEME ICONS */
const EduIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#4A6750]">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const CertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#4A6750]">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.5, ease: customEase } }
};

const textHiVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.1 } }
};

const textThereVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.25 } }
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: customEase, delay: 0.4 } }
};

const bioVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase, delay: 0.6 } }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
};

/* MAIN PAGE COMPONENT */
const ProfilePage = (): ReactElement => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-28 md:pt-36 px-6 md:px-10 lg:px-16 pb-24 md:pb-32 min-h-screen bg-[#F9F8F4] overflow-x-hidden text-[#1A2F24]"
    >

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <StarGrid />
      </div>

      <div className="w-full relative z-10 flex flex-col">
        
        {/* HERO SECTION - REDESIGNED */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-24 md:mb-36 mt-4 relative">

          {/* LEFT SECTION: REDESIGNED PROFILE PIC (Asymmetrical Frame & Floating Effect) */}
          <motion.div
            variants={photoVariants}
            className="w-full lg:w-5/12 flex justify-center lg:justify-start relative z-10"
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] aspect-[3/4]">
              
              {/* Decorative Geometric Background Glow & Accents */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[#4A6750]/20 to-transparent blur-2xl opacity-70" />
              <div className="absolute inset-0 rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl border-2 border-[#4A6750]/20 pointer-events-none translate-x-4 translate-y-4 transition-transform duration-500 hover:translate-x-2 hover:translate-y-2" />
              <div className="absolute inset-0 rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl border border-[#4A6750]/10 pointer-events-none -translate-x-2 -translate-y-2" />
              
              {/* Main Photo Wrapper */}
              <motion.div 
                // whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: customEase }}
                className="relative w-full h-full rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl overflow-hidden ring-1 ring-[#4A6750]/15 shadow-[0_30px_60px_-15px_rgba(46,76,56,0.25)] bg-[#F9F8F4]"
              >
                <img
                  src="public/images/pic_aboutMe.jpg"
                  alt="Aditya Nugraha Irwan"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F24]/10 via-transparent to-transparent pointer-events-none" />
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT SECTION: REDESIGNED TEKS "HI THERE!" & BIO CONTAINER */}
          <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            
            {/* Elegant Minimalist Typography Header */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-1 sm:gap-4 mb-8 w-full justify-center lg:justify-start">
              <div className="flex gap-3 sm:gap-4">
                <motion.h1 variants={textHiVariants} className="font-seasons text-[14vw] sm:text-[70px] md:text-[85px] lg:text-[90px] leading-none tracking-tight text-[#1A2F24]">
                  Hi
                </motion.h1>
                <motion.h1 variants={textThereVariants} className="font-seasons text-[14vw] sm:text-[70px] md:text-[85px] lg:text-[90px] leading-none tracking-tight text-[#4A6750] italic">
                  There!
                </motion.h1>
              </div>
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "60px", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[2px] bg-[#4A6750]/30 self-center hidden lg:block mt-4" 
              />
            </div>

            {/* Structured and Enhanced Typography Spacing (Content Intact) */}
            <motion.div variants={bioVariants} className="flex flex-col gap-6 w-full lg:max-w-[95%] xl:max-w-[90%]">
              <p className="font-redhat text-justify text-base md:text-lg lg:text-[19px] xl:text-[21px] leading-relaxed text-[#2E4C38]/85 font-semibold tracking-wide">
                I'm <span className="text-[#4A6750] font-bold">Aditya</span>! 👋 a Software Engineer with experience in both Smart Factory systems and Frontend Development. My primary role involves equipment modeling, server monitoring, and maintaining equipment alarm systems to ensure reliable manufacturing operations across multiple production sites.
              </p>
              <p className="font-redhat text-justify text-base md:text-lg lg:text-[19px] xl:text-[21px] leading-relaxed text-[#2E4C38]/85 font-semibold tracking-wide">
                Alongside my main responsibilities, I contribute to several internal web applications, building microfrontend-based systems using React and TypeScript for HRIS, LMS, and Job Portal platforms. I enjoy creating clean, scalable, and user-friendly interfaces while continuously improving application performance.
              </p>
              <p className="font-redhat text-justify text-base md:text-lg lg:text-[19px] xl:text-[21px] leading-relaxed text-[#2E4C38]/85 font-semibold tracking-wide border-l-2 border-[#4A6750]/20 pl-4 lg:pl-0 lg:border-none italic lg:not-italic opacity-90">
                Beyond my daily work, I love exploring cloud technologies, automation, and machine learning with Python. I'm always excited to learn new technologies and build solutions that solve real-world problems.
              </p>
            </motion.div>
          </div>

        </div>


        {/* EDUCATION SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="w-full flex flex-col mb-24 md:mb-32"
        >
          <motion.div variants={cardVariants} className="flex items-center justify-center md:justify-start gap-4 mb-8 md:mb-10">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4A6750]/10">
              <EduIcon />
            </span>
            <h2 className="font-seasons text-3xl md:text-4xl lg:text-5xl text-[#1A2F24] tracking-wide mt-1">
              EDUCATION
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full">
            {EDUCATION_DATA.map((edu: any, index: number) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-[#4A6750]/[0.03] hover:bg-[#4A6750]/[0.06] p-5 md:p-6 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-transparent hover:border-[#4A6750]/10 transition-colors duration-500 flex flex-col h-full group"
              >
                
                {/* 1. Baris Atas: Gelar (Degree) dengan min-height agar sejajar */}
                <div className="min-h-[76px] md:min-h-[96px] lg:min-h-[108px] pb-4 mb-8 border-b border-[#2E4C38]/10 flex flex-col justify-start">
                  <h3 className="font-redhat text-2xl md:text-3xl lg:text-4xl text-[#1A2F24] font-semibold tracking-tight group-hover:text-[#4A6750] transition-colors duration-500">
                    {edu.degree || edu.title}
                  </h3>
                </div>

                {/* 2. Baris Tengah: Kampus & Tahun (Kiri), GPA (Kanan) */}
                <div className="flex items-start justify-between gap-2 sm:gap-4 mb-6 md:mb-8 mt-2">
                  
                  {/* Kiri: Nama Kampus & Tahun */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h4 className="font-redhat tracking-wide text-[#4A6750] text-[13px] sm:text-sm md:text-base font-bold uppercase whitespace-nowrap">
                      {edu.institution || edu.school}
                    </h4>
                    <span className="font-redhat text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] text-[#1A2F24]/50">
                      {edu.period || edu.year || edu.date}
                    </span>
                  </div>
                  
                  {/* Kanan: Pill GPA */}
                  {(edu.gpa || edu.ipk) && (
                    <div className="flex items-center bg-[#1A2F24] text-[#F9F8F4] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-redhat font-bold tracking-[0.15em] uppercase shadow-sm shrink-0">
                      <span>GPA {edu.gpa || edu.ipk}</span>
                    </div>
                  )}
                  
                </div>

                {/* 3. Baris Bawah: Focus & Deskripsi */}
                {edu.focus && (
                  <div className="font-redhat text-[#1A2F24]/80 text-sm md:text-base mb-6 pl-4 border-l-2 border-[#4A6750]/40">
                    <strong className="font-bold text-[#1A2F24]">Focus:</strong> {edu.focus}
                  </div>
                )}

                {edu.description && (
                  <p className="text-[#1A2F24]/60 text-sm md:text-base leading-relaxed font-redhat mt-auto text-justify">
                    {edu.description}
                  </p>
                )}
                
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* CERTIFICATES SECTION */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="w-full flex flex-col"
        >
          <motion.div variants={cardVariants} className="flex items-center justify-center md:justify-start gap-4 mb-8 md:mb-10">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4A6750]/10">
              <CertIcon />
            </span>
            <h2 className="font-seasons text-3xl md:text-4xl lg:text-5xl text-[#1A2F24] tracking-wide mt-1">
              CERTIFICATES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 w-full">
            {CERTIFICATES_DATA.map((cert: any, index: number) => (
              <motion.div 
                key={cert.title || index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-[#4A6750]/[0.03] hover:bg-[#4A6750]/[0.06] p-5 md:p-6 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-colors duration-500 flex flex-col h-full group border border-transparent hover:border-[#4A6750]/10"
              >
                <a 
                  href={cert.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full justify-between gap-6 md:gap-8 outline-none"
                >
                  <div className="flex flex-col gap-4 md:gap-5">
                    
                    {/* Baris Atas: Issuer & Tahun Sejajar */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs md:text-sm font-medium text-[#4A6750]/80 font-redhat tracking-wide mt-1">
                        {cert.issuer || cert.organization}
                      </span>
                      {cert.year && (
                        <span className="font-redhat tracking-wide text-[10px] md:text-xs font-bold text-[#4A6750] bg-white/50 px-3 py-1 rounded-lg shrink-0">
                          {cert.year}
                        </span>
                      )}
                    </div>
                    
                    {/* Judul di Tengah */}
                    <h3 className="font-redhat text-lg md:text-xl text-[#1A2F24] group-hover:text-[#4A6750] transition-colors line-clamp-3 leading-snug">
                      {cert.title || cert.name}
                    </h3>

                  </div>

                  {/* Tombol Panah Tetap di Bawah Kanan */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-[#1A2F24]/30 group-hover:bg-[#4A6750] group-hover:text-white group-hover:rotate-45 transition-all duration-300 self-end shadow-sm shrink-0">
                    <ArrowUpRight />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProfilePage;