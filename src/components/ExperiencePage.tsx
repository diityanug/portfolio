import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from './Typewriter';

const ExperiencePage = () => {
  const [openExpId, setOpenExpId] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      role: "Software Engineer",
      company: "LG Sinarmas",
      location: "Central Jakarta, Indonesia",
      period: "June 2025 - Present",
      logo: "/LG_Sinarmas_Logo_Vector.svg", 
      description: "Duduk menikmati senja yang brutal di lab integrasi sistem sembari melakukan orkestrasi microservices dan optimasi performa backend.",
      sideActivities: [
        {
          id: 1,
          title: "APC Configuration Automation",
          image: "/images/activity1.jpg",
          description: "Otomasi alur kerja mesin pabrik."
        },
        {
          id: 2,
          title: "UI Component R&D",
          image: "/images/activity2.jpg",
          description: "Pengembangan library komponen internal."
        }
      ]
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0, opacity: 0 },
    show: { 
      scaleX: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 40, 
        damping: 12,
        mass: 0.8
      } 
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } 
    }
  };

  const revealVariants: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    show: { 
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col pt-16 md:pt-20 px-8 md:px-16 pb-20 min-h-screen bg-white"
    >
      
      {/* Header Section */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="font-lejour font-normal text-6xl md:text-[82.4px] leading-[0.9] tracking-tight text-[#2A2320]">
            <div className="pb-3"><Typewriter text="Work" /></div>
            <div><Typewriter text="Experience" delay={0.4} /></div>
          </h1>
          <motion.div 
            variants={lineVariants}
            className="w-24 border-t-2 border-black/30 mt-8"
          />
        </div>
        
        <motion.p 
          variants={fadeUpVariants}
          className="font-poppins text-gray-400 uppercase tracking-widest text-xs font-light max-w-[200px] text-left md:text-right leading-relaxed"
        >
          A timeline of my professional journey.
        </motion.p>
      </div>

      {/* Experience List */}
      <div className="flex flex-col w-full relative">
        <motion.div variants={lineVariants} className="w-full border-t border-black/20" />

        {experiences.map((exp) => (
          <div key={exp.id} className="relative">
            <div className="group py-12 md:py-16 grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 transition-colors hover:bg-gray-50/50 px-4 -mx-4 rounded-xl">
              
              {/* Left Column: Identity */}
              <div className="xl:col-span-4 flex flex-col items-start pr-0 xl:pr-8">
                
                {/* Logo Reveal */}
                <motion.div variants={revealVariants}>
                  <img 
                    src={exp.logo} 
                    alt={exp.company} 
                    className="h-5 md:h-7 w-auto object-contain mb-5 grayscale group-hover:grayscale-0 transition-all duration-500" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </motion.div>
                
                {/* PERBAIKAN: Role / Jabatan dengan Font The Seasons Italic */}
                <motion.h2 
                  variants={fadeUpVariants}
                  style={{ fontFamily: "'The Seasons Italic', serif" }}
                  className="text-4xl md:text-5xl text-[#2A2320] tracking-tight mb-3"
                >
                  {exp.role}
                </motion.h2>
                
                {/* Company */}
                <motion.h3 
                  variants={fadeUpVariants}
                  className="font-poppins text-sm md:text-base uppercase tracking-widest text-[#5E7657] font-medium mb-5"
                >
                  {exp.company}
                </motion.h3>

                {/* Garis Vertikal & Meta */}
                <div className="relative pl-4 overflow-hidden">
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10" 
                  />
                  <motion.div variants={containerVariants} className="flex flex-col gap-1.5">
                    <motion.span variants={fadeUpVariants} className="font-telegraf text-xs text-gray-500 uppercase tracking-widest">
                      {exp.period}
                    </motion.span>
                    <motion.span variants={fadeUpVariants} className="font-poppins text-xs text-gray-400 uppercase tracking-widest">
                      {exp.location}
                    </motion.span>
                  </motion.div>
                </div>
              </div>

              {/* Right Column: Description */}
              <div className="xl:col-span-8 flex flex-col justify-start">
                <motion.p 
                  variants={fadeUpVariants}
                  className="font-poppins text-base md:text-lg leading-relaxed text-[#4A3B32] font-light text-justify mb-8"
                >
                  {exp.description}
                </motion.p>

                {/* Toggle Button */}
                <motion.button
                  variants={fadeUpVariants}
                  onClick={() => setOpenExpId(openExpId === exp.id ? null : exp.id)}
                  className="self-start flex items-center gap-3 border border-black/20 px-6 py-3 font-poppins text-xs uppercase tracking-widest text-[#2A2320] hover:bg-[#5E7657] hover:text-white hover:border-[#5E7657] transition-all duration-300 rounded-full"
                >
                  {openExpId === exp.id ? "Close Projects" : "View Key Projects"}
                  <motion.span 
                    animate={{ rotate: openExpId === exp.id ? 180 : 0 }}
                    className="inline-block"
                  >
                    ↓
                  </motion.span>
                </motion.button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {openExpId === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-black/10">
                        {exp.sideActivities.map((act) => (
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            key={act.id} 
                            className="flex flex-col group/act cursor-pointer"
                          >
                            {act.image && (
                              <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden mb-5 rounded-lg border border-black/5 relative">
                                <img 
                                  src={act.image} 
                                  alt={act.title} 
                                  className="w-full h-full object-cover grayscale group-hover/act:grayscale-0 transition-all duration-700 group-hover/act:scale-105" 
                                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/f8f9fa/adb5bd?text=Project'; }}
                                />
                              </div>
                            )}
                            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-[#2A2320] mb-2 group-hover/act:text-[#5E7657] transition-colors">
                              {act.title}
                            </h4>
                            <p className="font-poppins text-sm text-gray-600 font-light leading-relaxed">
                              {act.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
            
            <motion.div variants={lineVariants} className="w-full border-b border-black/10" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperiencePage;