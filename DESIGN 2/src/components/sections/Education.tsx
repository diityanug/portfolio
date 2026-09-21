import { motion } from 'framer-motion';
import { Brain, Certificate } from '@phosphor-icons/react';
import { fadeUp, scaleIn } from '../../utils/animations';

import { CERTIFICATES } from '../../data';

// Education & Certifications
const Education = () => {

  const education = [
    { 
      title: "Master of Science in Information Technology", 
      place: "President University", 
      year: "2023 - 2025", 
      gpa: "3.64",
      desc: "Focused on Business Intelligence." 
    },
    { 
      title: "Bachelor of Accounting", 
      place: "Tadulako University", 
      year: "2017 - 2022", 
      gpa: "3.71",
      desc: "Focused on Financial Accounting and Taxation." 
    },
  ];

  return (
    <section id="education" className="pt-16 md:pt-24 pb-28 md:pb-40 bg-white text-ink relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
      <div className="max-w-300 mx-auto px-4 md:px-8">
        
        {/* Education Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-[32px] md:text-[80px] font-bold tracking-[-0.03em] leading-[1.05] text-ink">
            Academic <br className="hidden md:block" />Background.
          </h2>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-20 md:mb-32">
          {education.map((item, i) => (
            <motion.div 
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={scaleIn}
              className="group p-1.5 rounded-[28px] md:rounded-10 bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_80px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2 h-full"
            >
              <div className="bg-[#fcfcfc] p-6 sm:p-8 md:p-12 rounded-[22px] md:rounded-8.5 h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden">
                
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center group-hover:scale-105 group-hover:bg-primary transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Brain size={28} weight="fill" className="text-ink group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 md:py-1.5 rounded-full">
                        GPA {item.gpa}
                      </span>
                      <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-steel bg-black/5 px-3 py-1 md:py-1.5 rounded-full">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-[22px] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3 md:mb-4 tracking-tight group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  <div className="text-base sm:text-lg md:text-[22px] font-semibold text-steel mb-6 md:mb-8">
                    {item.place}
                  </div>
                </div>
                <p className="text-steel leading-[1.7] md:leading-[1.8] text-[15px] sm:text-base md:text-lg relative z-10">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h3 className="text-[22px] md:text-[40px] font-bold tracking-tight text-ink">Certificates</h3>
          <p className="text-steel text-sm md:text-base max-w-md md:text-right">
            A collection of personal certificates for continuous learning and skill development.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="max-h-[60vh] md:max-h-[70vh] overflow-y-auto overflow-x-hidden pr-2 md:pr-4 -mr-2 md:-mr-4 [&::-webkit-scrollbar]:w-1.5 md:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-black/20 transition-colors pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CERTIFICATES.map((cert) => {
              const isLink = cert.link && cert.link !== "#";
              const Wrapper = isLink ? "a" : "div";
              const wrapperProps = isLink ? { href: cert.link, target: "_blank", rel: "noreferrer" } : {};

              return (
                <motion.div
                  key={cert.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10px" }}
                  variants={fadeUp}
                  className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl md:rounded-4xl"
                >
                  <Wrapper {...(wrapperProps as any)} className="block h-full outline-none">
                    <div className="group p-1.5 rounded-3xl md:rounded-4xl bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_10px_40px_-10px_rgba(86,69,212,0.15)] hover:-translate-y-1.5 h-full cursor-pointer">
                      <div className="bg-[#fcfcfc] p-5 sm:p-6 md:p-8 rounded-[18px] md:rounded-[26px] h-full flex flex-col relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                        
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none"></div>

                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-500 shrink-0">
                            <Certificate size={22} weight="fill" className="text-ink group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-widest text-steel bg-black/5 px-2.5 py-1 rounded-full shrink-0 ml-4 mt-1">
                            {cert.year}
                          </span>
                        </div>
                        <h4 className="text-[17px] sm:text-lg md:text-xl font-bold text-ink mb-2 md:mb-3 leading-[1.3] group-hover:text-primary transition-colors relative z-10">
                          {cert.title}
                        </h4>
                        <div className="text-[13px] md:text-sm font-semibold text-steel mt-auto relative z-10">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;

