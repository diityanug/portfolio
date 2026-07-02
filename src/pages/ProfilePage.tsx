import type { ReactElement, SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';

// IMPORT STAR GRID DI SINI (Sesuaikan letak foldernya)
import StarGrid from '../components/profilePage/StarGrid';

/* ARROW ICON HELPER */
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="17" x2="19" y2="5"></line>
    <polyline points="5 5 19 5 19 19"></polyline>
  </svg>
);

/* =========================================
   KOREOGRAFI ANIMASI (CINEMATIC TIMING)
   ========================================= */
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Wrapper Utama (Cuma buat atur exit pas pindah page)
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.5, ease: customEase } }
};

// 1. Teks "HI" muncul duluan
const textHiVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.1 } }
};

// 2. Teks "THERE!" nyusul dikit
const textThereVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.25 } }
};

// 3. Foto nyusul setelah teks sapaan selesai
const photoVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.6 } }
};

// 4. Bio muncul paling akhir melengkapi scene
const bioVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase, delay: 0.8 } }
};

// Untuk Edukasi & Sertifikat (Muncul bergantian saat di-scroll)
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
      className="relative z-0 flex flex-col pt-24 md:pt-36 px-6 md:px-12 pb-32 min-h-screen bg-[#F9F8F4] overflow-x-hidden text-[#1A2F24]"
    >
      {/* BACKGROUND STAR GRID (Super Tipis) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <StarGrid />
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* ================= HERO SECTION (KIRI FOTO, KANAN KONTEN) ================= */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-12 lg:gap-16 mb-24 md:mb-32 mt-4 relative">
          
          {/* BAGIAN KIRI: FOTO PROFIL GEDE */}
          <motion.div 
            variants={photoVariants} 
            className="w-full md:w-5/12 lg:w-1/2 flex justify-center md:justify-start relative z-10"
          >
            <div 
              className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px] aspect-square"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 75%)',
                maskImage: 'radial-gradient(circle at center, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 75%)'
              }}
            >
              <img
                src="/images/aw aw"
                alt="Aditya Nugraha Irwan"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                onError={handleImageError}
              />
            </div>
          </motion.div>

          {/* BAGIAN KANAN: TEKS "HI THERE!" & BIO */}
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col items-center md:items-start text-center z-20">
            
            {/* TEKS "HI THERE!" */}
            <div className="flex gap-4 md:gap-5 mb-8">
              <motion.h1 variants={textHiVariants} className="font-['The_Seasons_Regular'] text-[70px] md:text-[90px] lg:text-[120px] leading-none text-[#1A2F24] drop-shadow-sm">
                HI
              </motion.h1>
              <motion.h1 variants={textThereVariants} className="font-['The_Seasons_Regular'] text-[70px] md:text-[90px] lg:text-[120px] leading-none text-[#4A6750] drop-shadow-sm">
                THERE!
              </motion.h1>
            </div>

            {/* KONTEN BIO (DIBIKIN RATA KIRI-KANAN / JUSTIFY SEMUA) */}
            <motion.div variants={bioVariants} className="flex flex-col gap-6 w-full max-w-[600px]">
              <p className="font-migra text-justify text-lg md:text-xl leading-relaxed text-[#2E4C38]/90 font-medium">
                I'm <span className="text-[#4A6750] font-bold">Aditya</span>! 👋 I'm a Software Engineer who absolutely loves turning wild ideas into interactive and super smooth web apps. My daily playground mostly involves <span className="bg-[#4A6750]/10 text-[#2E4C38] px-2 py-0.5 rounded-md font-garbata font-bold text-sm md:text-base">React</span> and <span className="bg-[#4A6750]/10 text-[#2E4C38] px-2 py-0.5 rounded-md font-garbata font-bold text-sm md:text-base">TypeScript</span>.
              </p>
              <p className="font-migra text-justify text-lg md:text-xl leading-relaxed text-[#2E4C38]/90 font-medium">
                Beyond the frontend world, I'm also exploring AWS S3, building handy automation tools, and playing around with Python for machine learning. I'm always down to learn new tech, solve real-world puzzles, and just build cool stuff!
              </p>
            </motion.div>
          </div>

        </div>


        {/* ================= EDUCATION SECTION ================= */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="w-full flex flex-col mb-32"
        >
          <motion.div variants={cardVariants} className="flex items-center justify-center md:justify-start gap-4 mb-10">
            <span className="text-3xl">🎓</span>
            <h2 className="font-hatton text-3xl md:text-4xl text-[#1A2F24] tracking-wide">
              EDUCATION
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {EDUCATION_DATA.map((edu: any, index: number) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-[#4A6750]/[0.03] hover:bg-[#4A6750]/[0.06] p-8 md:p-10 rounded-[2.5rem] transition-colors duration-500 flex flex-col h-full border border-transparent hover:border-[#4A6750]/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="bg-white/60 text-[#4A6750] px-4 py-1.5 rounded-full text-sm font-['Red_Hat_Display'] font-bold tracking-wide">
                    {edu.period || edu.year || edu.date}
                  </span>
                  {(edu.gpa || edu.ipk) && (
                    <span className="text-[#2E4C38]/70 text-sm font-['Red_Hat_Display'] font-bold tracking-widest bg-white/40 px-3 py-1 rounded-xl">
                      GPA {edu.gpa || edu.ipk}
                    </span>
                  )}
                </div>

                <h3 className="font-hatton font-bold text-2xl md:text-3xl text-[#1A2F24] mb-2">
                  {edu.degree || edu.title}
                </h3>
                
                <h4 className="font-migra text-[#4A6750] text-xl mb-5 opacity-90">
                  {edu.institution || edu.school}
                </h4>

                {edu.focus && (
                  <div className="font-['Poppins_Light'] text-[#2E4C38] text-sm mb-4">
                    <strong className="font-semibold">Focus:</strong> <span className="opacity-80">{edu.focus}</span>
                  </div>
                )}

                {edu.description && (
                  <p className="text-[#2E4C38]/70 text-base md:text-lg leading-relaxed font-['The_Seasons_Regular'] mt-auto text-justify">
                    {edu.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* ================= CERTIFICATES SECTION ================= */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
          className="w-full flex flex-col"
        >
          <motion.div variants={cardVariants} className="flex items-center justify-center md:justify-start gap-4 mb-10">
            <span className="text-3xl">✨</span>
            <h2 className="font-hatton text-3xl md:text-4xl text-[#1A2F24] tracking-wide">
              CERTIFICATES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {CERTIFICATES_DATA.map((cert: any, index: number) => (
              <motion.div 
                key={cert.title || index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-[#4A6750]/[0.03] hover:bg-[#4A6750]/[0.06] p-6 md:p-8 rounded-[2rem] transition-colors duration-500 flex flex-col h-full group border border-transparent hover:border-[#4A6750]/10"
              >
                <a 
                  href={cert.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full justify-between gap-8 outline-none"
                >
                  <div className="flex flex-col">
                    <h3 className="font-hatton font-bold text-xl text-[#1A2F24] group-hover:text-[#4A6750] transition-colors line-clamp-3 mb-4 leading-snug">
                      {cert.title || cert.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-auto">
                      <span className="text-sm font-medium text-[#4A6750]/80 font-migra">
                        {cert.issuer || cert.organization}
                      </span>
                      {cert.year && (
                        <>
                          <span className="w-1.5 h-1.5 bg-[#4A6750]/30 rounded-full mx-1" />
                          <span className="font-['Red_Hat_Display'] text-xs font-bold text-[#4A6750] bg-white/50 px-2 py-1 rounded-lg">
                            {cert.year}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1A2F24]/30 group-hover:bg-[#4A6750] group-hover:text-white group-hover:rotate-45 transition-all duration-300 self-end shadow-sm">
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