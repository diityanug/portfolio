import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariants, revealRightVariants, lineGrowVariants } from '@utils/animation';

// Types
type Contribution = { system: string; points: string[] };
type Culture = { id: number; title: string; image: string; description: string };

export type ExperienceData = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  logo: string;
  tags: string[];
  description: React.ReactNode;
  contributions: Contribution[];
  culture: Culture[];
};

// CultureCard Component
export const CultureCard = ({ item }: { item: Culture }) => {
  return (
    <div className="group/cult flex flex-col cursor-pointer">
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-4 rounded-lg border border-black/[0.05] bg-gray-50 isolate transform-gpu">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover/cult:grayscale-0 transition-[transform,filter] duration-700 group-hover/cult:scale-[1.04]"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/640x400/f0ede8/c8c0b8?text=Culture';
          }}
        />
      </div>
      <span className="font-poppins text-[9px] tracking-[0.28em] uppercase text-[#5E7657] mb-1.5 font-medium">Company Culture</span>
      <h4 className="font-poppins font-medium text-[11px] uppercase tracking-widest text-[#1a1a1a] mb-1.5 group-hover/cult:text-[#5E7657] transition-colors duration-300">{item.title}</h4>
      <p className="font-poppins text-[11px] text-gray-400 font-light leading-relaxed text-justify">{item.description}</p>
    </div>
  );
};

// Expandable Button Component
const ExpandButton = ({ 
  isActive, 
  onClick, 
  activeText, 
  inactiveText 
}: { 
  isActive: boolean, 
  onClick: () => void, 
  activeText: string, 
  inactiveText: string 
}) => (
  <motion.button variants={fadeUpVariants} whileTap={{ scale: 0.97 }} onClick={onClick} className="relative flex items-center rounded-full border border-black/10 overflow-hidden outline-none" style={{ width: '200px', height: '40px' }}>
    <motion.span className="absolute inset-0 rounded-full bg-[#5E7657]" initial={false} animate={{ x: isActive ? "0%" : "-101%" }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ willChange: "transform" }} />
    <span className="relative z-10 flex items-center justify-center font-poppins text-[10px] uppercase tracking-[0.15em]" style={{ width: '160px', color: isActive ? '#fff' : '#888' }}>
      {isActive ? activeText : inactiveText}
    </span>
    <span className="relative z-10 flex items-center justify-center border-l border-black/10 w-[40px] h-[40px]">
      <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" animate={{ rotate: isActive ? 45 : 0 }} style={{ color: isActive ? '#fff' : '#aaa' }}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></motion.svg>
    </span>
  </motion.button>
);

// ExperienceItem Component
export const ExperienceItem = ({ exp }: { exp: ExperienceData }) => {
  const [activeTab, setActiveTab] = useState<'contributions' | 'culture' | null>(null);

  const toggleTab = (type: 'contributions' | 'culture') => {
    setActiveTab(prev => prev === type ? null : type);
  };

  return (
    <div>
      <div className="group grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 py-14 md:py-20 transition-colors duration-300 hover:bg-gray-50/60 px-3 md:px-6 -mx-3 md:-mx-6 rounded-2xl">
        
        {/* LEFT PANELS */}
        <div className="lg:col-span-4 flex flex-col items-start">
          <motion.div variants={revealRightVariants} className="mb-5 h-[18px]">
            <img src={exp.logo} alt={exp.company} className="h-[16px] md:h-[18px] w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          </motion.div>
          <motion.h2 variants={fadeUpVariants} className="font-poppins font-normal text-[22px] md:text-[26px] lg:text-[28px] text-[#1a1a1a]/70 tracking-normal leading-snug mb-8">{exp.role}</motion.h2>
          <motion.div variants={fadeUpVariants} className="pl-4 border-l border-black/10 flex flex-col gap-3 mb-6">
            <div className="flex flex-col gap-0.5">
              <span className="font-telegraf text-[9px] uppercase tracking-[0.28em] text-gray-300">Period</span>
              <span className="font-poppins text-[11px] text-gray-500 tracking-wide">{exp.period}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-telegraf text-[9px] uppercase tracking-[0.28em] text-gray-300">Location</span>
              <span className="font-poppins text-[11px] text-gray-400 font-light">{exp.location}</span>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => <span key={tag} className="font-poppins text-[9px] uppercase tracking-[0.18em] text-gray-400 font-light px-3.5 py-1.5 rounded-full border border-black/[0.07] bg-transparent">{tag}</span>)}
          </motion.div>
        </div>

        {/* RIGHT PANELS */}
        <div className="lg:col-span-8 flex flex-col justify-start pt-0 md:pt-2">
          <motion.div variants={fadeUpVariants} className="font-poppins font-light text-sm md:text-base lg:text-[17px] leading-[1.9] text-gray-500/80 mb-10 max-w-[600px] text-justify">
            {exp.description}
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-2">
            <ExpandButton isActive={activeTab === 'contributions'} onClick={() => toggleTab('contributions')} activeText="Hide Details" inactiveText="Key Contributions" />
            <ExpandButton isActive={activeTab === 'culture'} onClick={() => toggleTab('culture')} activeText="Hide Details" inactiveText="Company Culture" />
          </div>

          {/* EXPANDABLE HOUSING */}
          <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-out" style={{ gridTemplateRows: activeTab ? '1fr' : '0fr', opacity: activeTab ? 1 : 0 }}>
            <div className="overflow-hidden">
              <div className="pt-10 pb-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'contributions' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-8 max-w-[640px]">
                      {exp.contributions.map((group, idx) => (
                        <div key={idx} className="flex flex-col gap-2.5 pl-2">
                          <h4 className="font-poppins font-medium text-xs uppercase tracking-wider text-[#1a1a1a]">{group.system}</h4>
                          <ul className="list-none flex flex-col gap-2">
                            {group.points.map((pt, pIdx) => (
                              <li key={pIdx} className="font-poppins font-light text-sm leading-relaxed text-gray-500 flex gap-3">
                                <span className="text-[#5E7657] font-medium">—</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'culture' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                      {exp.culture.map((item) => (
                        <CultureCard key={item.id} item={item} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div variants={lineGrowVariants} className="w-full h-[1px] bg-black/[0.07]" />
    </div>
  );
};