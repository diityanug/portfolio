import { motion } from 'framer-motion';
import { Brain, Certificate } from '@phosphor-icons/react';
import { fadeUp, scaleIn } from '../../utils/animations';

// --- Education & Certifications (Dark Mode Grid Layout) ---
const Education = () => {
  const education = [
    { 
      title: "Master of Science in Information Technology", 
      place: "President University", 
      year: "2023 - 2025", 
      desc: "GPA: 3.64. Specialized in Business Intelligence." 
    },
    { 
      title: "Bachelor of Accounting", 
      place: "Tadulako University", 
      year: "2017 - 2022", 
      desc: "GPA: 3.71. Specialized in Financial Accounting and Taxation." 
    },
  ];

  const certifications = [
    { title: "SOLID Principles: Introducing Software Architecture & Design", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-6ff76bda-84e8-4650-82d7-af2298bbe167/" },
    { title: "Clean Code", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-f9a43bb7-cae6-402f-88c9-10ce63c25d24/" },
    { title: "Fundamentals of Software Design and Architecture Course", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-37fc4f6c-08ab-4881-9246-3f561902b2b3/" },
    { title: "Team Agility through Agile Ways of Working", issuer: "Agile Academy Indonesia", year: "2025", link: "https://drive.google.com/drive/folders/1zNRpF_mX7S5pA-MK-BZbmYDiXlbBdhH0?usp=sharing" },
    { title: "C# Basics for Beginners: Learn C# Fundamentals by Coding", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-f5ec86b8-bde2-459f-b596-bf83c536b2ab/" },
    { title: "Belajar Frontend Website (HTML, CSS dan Javascript)", issuer: "Udemy", year: "2025", link: "https://www.udemy.com/certificate/UC-3b379b97-a4bd-4981-b1c5-9375dc8924f4/" },
    { title: "Java Bootcamp: Learn Java with 100+ Java Projects", issuer: "Udemy", year: "2025", link: "https://www.udemy.com/certificate/UC-cf7a6f29-db74-41c8-a2b0-d647df3e28d1/" },
    { title: "Cloud Practitioner Essentials (Learn AWS Cloud Basic)", issuer: "Dicoding Indonesia", year: "2025", link: "https://www.dicoding.com/certificates/53XEDN5R9PRN" },
    { title: "Introduction to REST APIs for Absolute Beginners", issuer: "Udemy", year: "2025", link: "https://www.udemy.com/certificate/UC-da90b50c-184e-4f53-b71f-d7901efe6032/" },
    { title: "Belajar Machine Learning untuk Pemula", issuer: "Dicoding Indonesia", year: "2024", link: "https://www.dicoding.com/certificates/N9ZOOM2R6ZG5" },
    { title: "English Speaking Intensive 1 - Level A1 (Excellent)", issuer: "WECAMP English Village", year: "2023", link: "https://drive.google.com/drive/folders/194f4uT8lAj3exXrlVMSucuPSIFegt2FK?usp=sharing" },
    { title: "Tax Brevet Training AB + e-SPT", issuer: "Centre for Accounting Development, Universitas Indonesia", year: "2023", link: "https://drive.google.com/drive/folders/1975seEYudg15J2RXj18TPMVMR5yE60_w?usp=sharing" },
    { title: "Belajar Dasar Manajemen Proyek", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/KEXL05Q8RPG2" },
    { title: "Belajar Dasar Visualisasi Data", issuer: "Dicoding Indonesia", year: "2023", link: "https://dicoding.com/certificates/0LZ0QOW63Z65" },
    { title: "Belajar Dasar Git dengan Github", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/6RPN4K1J4X2M" },
    { title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/NVP78926RXR0" },
    { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/6RPN48R65X2M" },
    { title: "Memulai Pemrograman dengan Haskell", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/98XWV40V9PM3" },
    { title: "Belajar Dasar Structured Query Language (SQL)", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/07Z68K26JXQR" },
    { title: "Belajar Dasar-Dasar DevOps", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/4EXG4YY9GPRL" },
    { title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/1RXY0N50QZVM" },
  ];

  return (
    <section id="education" className="py-24 md:py-48 bg-white text-ink relative border-t border-black/5">
      <div className="max-w-300 mx-auto px-4 md:px-8">
        
        {/* Education Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} className="mb-16 md:mb-24 text-center md:text-left">
          <motion.div variants={fadeUp} className="inline-block mb-6">
            <span className="rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold bg-black/5 text-steel border border-black/5">
              Academic Background
            </span>
          </motion.div>
          <h2 className="text-[40px] md:text-[80px] font-bold tracking-[-0.03em] leading-[1.05] text-ink">Education & <br className="hidden md:block" />Certifications.</h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20 md:mb-32">
          {education.map((item, i) => (
            <motion.div 
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={scaleIn}
              className="group p-1.5 rounded-4xl md:rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 hover:bg-black/10 hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="bg-[#FAFAFA] p-8 md:p-12 rounded-[1.625rem] md:rounded-[2.125rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center border border-black/5 shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Brain size={28} weight="fill" className="text-ink group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-steel bg-black/5 px-3 py-1 rounded-full">{item.year}</span>
                  </div>
                  <h3 className="text-[28px] md:text-4xl font-bold text-ink mb-3 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="text-[15px] md:text-[17px] font-bold text-steel mb-6">{item.place}</div>
                </div>
                <p className="text-steel leading-[1.8] text-[15px] font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} className="mb-10 text-center md:text-left">
          <h3 className="text-[28px] md:text-[40px] font-bold tracking-tight text-ink">Licenses & Credentials.</h3>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-h-150 md:max-h-200 overflow-y-auto pr-2 custom-scrollbar">
          {certifications.map((cert, i) => {
            const inner = (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp}
                className="group p-6 md:p-8 rounded-3xl md:rounded-4xl bg-[#FAFAFA] ring-1 ring-black/5 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] relative overflow-hidden flex flex-col h-full cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-black/5 shadow-sm group-hover:bg-primary group-hover:border-primary transition-colors duration-500 shrink-0">
                    <Certificate size={22} weight="fill" className="text-ink group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-steel bg-black/5 px-3 py-1 rounded-full shrink-0 ml-4">{cert.year}</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-ink mb-3 leading-tight group-hover:text-primary transition-colors">{cert.title}</h4>
                <div className="text-[13px] md:text-sm font-semibold text-steel mt-auto">{cert.issuer}</div>
              </motion.div>
            );

            return cert.link && cert.link !== "#" ? (
              <a href={cert.link} target="_blank" rel="noreferrer" key={i} className="block h-full">
                {inner}
              </a>
            ) : (
              <div key={i} className="block h-full">
                {inner}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


export default Education;
