import { motion } from 'framer-motion';
import { CodeBlock, TerminalWindow, Database, Brain } from '@phosphor-icons/react';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/animations';

// --- Colorful Bento Grid (Linear Craft System) ---
const Skills = () => {
  return (
    <section id="skills" className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10px" }} 
          variants={fadeUp}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase">
              Technical <br />Skills.
            </h2>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10px" }} 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7"
        >
          {/* Frontend Architecture (Yellow Warm Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-8 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#5e6ad2]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#5e6ad2]/10 group">
            <div className="bg-linear-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border border-[#FDE68A]">
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <TerminalWindow size={280} weight="fill" className="text-[#78350F]" />
              </div>
              
              <div className="relative z-10 max-w-xl">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-black/5 shadow-sm group-hover:bg-[#5e6ad2] group-hover:text-white transition-all duration-300">
                  <TerminalWindow size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-[26px] md:text-[32px] font-bold text-ink mb-3 tracking-[-0.02em]">Frontend Architecture</h3>
                <p className="text-steel text-[15px] md:text-[17px] leading-[1.7] mb-8 md:mb-10 max-w-md">Building interactive, highly performant interfaces and complex microfrontend systems with absolute precision.</p>
                
                <div className="flex flex-wrap gap-2.5">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML', 'Microfrontend Architecture'].map(skill => (
                    <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-sm hover:border-[#5e6ad2]/40 transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Intelligence (Mint Green Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-4 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#10B981]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#10B981]/10 group">
            <div className="bg-linear-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#A7F3D0]">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                  <Brain size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">Data Intelligence</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6]">Implementing NLP, text preprocessing, and classification models.</p>
              </div>
              
              <div className="mt-8 flex flex-col gap-2.5">
                {['Pandas', 'Scikit-Learn', 'spaCy', 'Natural Language Processing', 'TF-IDF', 'Naive Bayes', 'Data Visualization'].map(skill => (
                  <div key={skill} className="flex items-center gap-2.5 text-ink font-semibold text-xs md:text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#059669]"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Backend & Infra (Peach Coral Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-6 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#F97316]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#F97316]/10 group">
            <div className="bg-linear-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FDBA74]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#FDBA74]">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                  <Database size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">Backend & Infra</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-6">Designing robust REST APIs and scalable cloud infrastructure.</p>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {['FastAPI', 'REST APIs', 'Python', 'Haskell', 'AWS Cloud', 'AWS S3', 'DevOps'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Process Automation (Lavender Violet Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-6 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#8B5CF6]/10 group">
            <div className="bg-linear-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#DDD6FE]">
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
                <CodeBlock size={220} weight="fill" className="text-[#5B21B6]" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
                  <CodeBlock size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">Automation</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-6 max-w-75">Writing efficient scripts to scrape data and eliminate manual labor.</p>
              </div>
              
              <div className="relative z-10 flex flex-wrap gap-2.5">
                {['Selenium', 'BeautifulSoup', 'PyAutoGUI'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Skills;