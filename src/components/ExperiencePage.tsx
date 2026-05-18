import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      description: "Duduk menikmati senja yang brutal",
      sideActivities: [
        {
          id: 1,
          title: "APC Configuration Automation",
          image: "/images/activity1.jpg",
          description: "makan-makan"
        },
        {
          id: 2,
          title: "UI Component R&D",
          image: "/images/activity2.jpg",
          description: "makan makan lagi."
        }
      ]
    },
  ];

  return (
    <div className="flex flex-col px-8 md:px-16 pb-12 min-h-[calc(100vh-116px)] justify-center relative">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Title */}
        <div className="xl:col-span-5 flex flex-col pt-2 mb-10 xl:mb-0">
          <h1 className="font-lejour font-normal text-6xl md:text-[82.4px] leading-[0.9] mb-4 tracking-tight">
            <div className="pb-4"><Typewriter text="Work" /></div>
            <div><Typewriter text="Experience" delay={0.5} /></div>
          </h1>
          <div className="w-24 border-t-2 border-black/30 mt-6"></div>
        </div>

        {/* Right Side: Content */}
        <div className="xl:col-span-7 flex flex-col gap-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex flex-col md:flex-row gap-8 md:gap-12 group relative">

              {/* Left Side Exp. Section : Logo */}
              <div className="w-32 flex flex-col items-center md:items-start flex-none">
                <div 
                  onClick={() => setOpenExpId(openExpId === exp.id ? null : exp.id)}
                  className="w-full h-12 flex items-center justify-center md:justify-start cursor-pointer group/logo relative"
                  title="Click to view side activities"
                >
                  <img 
                    src={exp.logo} 
                    alt={exp.company} 
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 group-hover/logo:scale-105 transition-all duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Right Side Exp. Section : Details */}
              <div className="flex-1 flex flex-col">
                <h2 className="font-poppins font-bold text-2xl tracking-tight mb-2">
                  {exp.role}
                </h2>
                <h3 className="font-poppins text-md uppercase tracking-widest text-gray-500 mb-1 font-light">
                  {exp.company} — {exp.location}
                </h3>
                <div className="font-poppins text-sm tracking-widest text-gray-400 mb-5 font-light">
                  {exp.period}
                </div>
                <p className="font-poppins text-lg leading-relaxed text-gray-800 font-extralight max-w-2xl text-justify">
                  {exp.description}
                </p>
              </div>

              {/* =========================================================
                  POPOVER DENGAN EKOR KOMIK
                  ========================================================= */}
              <AnimatePresence>
                {openExpId === exp.id && exp.sideActivities && (
                  <>
                    {/* Background Click Detector */}
                    <div className="fixed inset-0 z-30 cursor-default" onClick={() => setOpenExpId(null)} />

                    {/* Kartu Popover */}
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-16 z-40 bg-white border border-black/10 p-6 shadow-xl w-full max-w-xl flex flex-col gap-6"
                    >
                      
                      {/* EKOR KOMIK (Nunjuk ke logo di atasnya) */}
                      <div className="absolute -top-[6px] left-[52px] md:left-12 w-2.5 h-2.5 bg-white border-t border-l border-black/10 rotate-45 z-50" />

                      {/* Header Popover */}
                      <div className="flex justify-between items-center border-b border-black/5 pb-2">
                        <span className="font-telegraf text-xs text-gray-400 tracking-widest uppercase">Side Activities</span>
                        <button onClick={() => setOpenExpId(null)} className="text-gray-400 hover:text-black transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* List Aktivitas */}
                      <div className="flex flex-col gap-6 max-h-[350px] overflow-y-auto pr-1 scrollbar-none">
                        {exp.sideActivities.map((act) => (
                          <div key={act.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start group/item">
                            {/* Foto */}
                            <div className="sm:col-span-4 w-full aspect-[4/3] bg-gray-50 border border-black/5 overflow-hidden">
                              <img 
                                src={act.image} 
                                alt={act.title}
                                className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x112/f8f9fa/adb5bd?text=Activity'; }}
                              />
                            </div>
                            {/* Teks */}
                            <div className="sm:col-span-8 flex flex-col">
                              <h4 className="font-poppins font-bold text-base tracking-tight mb-1">
                                {act.title}
                              </h4>
                              <p className="font-poppins text-xs leading-relaxed text-gray-600 font-extralight text-justify">
                                {act.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExperiencePage;