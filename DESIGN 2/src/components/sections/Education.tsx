import { motion } from 'framer-motion';
import { Brain, Certificate } from '@phosphor-icons/react';
import { fadeUp, scaleIn } from '../../utils/animations';

import { CERTIFICATES } from '../../data';

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
          <h2 className="text-[30px] md:text-[80px] font-bold tracking-[-0.03em] leading-[1.05] text-ink">Education & <br className="hidden md:block" />Certifications.</h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20 md:mb-32">
          {education.map((item, i) => (
            <motion.div 
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={scaleIn}
              className="group p-1.5 rounded-4xl md:rounded-10 bg-black/5 ring-1 ring-black/5 hover:bg-black/10 hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="bg-[#FAFAFA] p-8 md:p-12 rounded-6.5 md:rounded-8.5 h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center border border-black/5 shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Brain size={28} weight="fill" className="text-ink group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-steel bg-black/5 px-3 py-1 rounded-full">{item.year}</span>
                  </div>
                  <h3 className="text-[22px] md:text-4xl font-bold text-ink mb-3 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
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
          <h3 className="text-[22px] md:text-[40px] font-bold tracking-tight text-ink">Licenses & Credentials.</h3>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-h-112 md:max-h-200 overflow-y-auto pr-2 custom-scrollbar">
          {CERTIFICATES.map((cert, i) => {
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
