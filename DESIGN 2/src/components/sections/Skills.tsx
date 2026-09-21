import { motion } from 'framer-motion';
import { CodeBlock, TerminalWindow, Database, Brain } from '@phosphor-icons/react';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/animations';

// --- Asymmetrical Bento Grid ---
const Skills = () => {
  return (
    <section id="skills" className="pt-16 md:pt-24 pb-28 md:pb-40 px-4 md:px-8 bg-white relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
      <div className="max-w-300 mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-[40px] md:text-[80px] font-bold text-ink tracking-[-0.03em] leading-[1.05]">
              Technical <br className="hidden md:block" />Skills.
            </h2>
          </div>
          <p className="text-steel text-base md:text-[19px] max-w-md leading-[1.6]">
            A unified stack for end-to-end development, from systemic architecture to fluid, pixel-perfect interfaces.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Frontend Architecture */}
          <motion.div variants={scaleIn} className="md:col-span-8 p-1.5 rounded-[28px] md:rounded-10 bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_80px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2 group">
            <div className="bg-card-yellow-bold h-full rounded-[22px] md:rounded-8.5 p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div className="absolute -bottom-12 -right-12 opacity-10 group-hover:opacity-20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none">
                <TerminalWindow size={300} weight="fill" className="text-ink" />
              </div>
              <div className="relative z-10 max-w-lg">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-8 md:mb-10 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-500">
                  <TerminalWindow size={24} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[26px] md:text-[32px] font-bold text-ink mb-3 md:mb-4 tracking-[-0.02em]">Frontend Architecture</h3>
                <p className="text-steel text-[15px] md:text-[17px] leading-[1.7] mb-10 md:mb-12 max-w-md">Building interactive, highly performant interfaces and complex microfrontend systems with absolute precision.</p>
                
                <div className="flex flex-wrap gap-2.5">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML', 'Microfrontend Architecture'].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white/70 backdrop-blur-md text-ink rounded-full text-[12px] md:text-[13px] font-semibold ring-1 ring-black/5 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Intelligence */}
          <motion.div variants={scaleIn} className="md:col-span-4 p-1.5 rounded-[28px] md:rounded-10 bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_80px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2 group">
            <div className="bg-card-mint h-full rounded-[22px] md:rounded-8.5 p-6 sm:p-8 md:p-12 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-500">
                  <Brain size={24} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-ink mb-3 md:mb-4 tracking-[-0.02em]">Data Intelligence</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6]">Implementing NLP, text preprocessing, and classification models.</p>
              </div>
              <div className="mt-10 md:mt-12 flex flex-col gap-3">
                {['Pandas', 'Scikit-Learn', 'spaCy', 'Natural Language Processing', 'TF-IDF', 'Naive Bayes', 'Data Visualization'].map(skill => (
                  <div key={skill} className="flex items-center gap-3 text-ink font-semibold text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-ink/40"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Backend & Infra */}
          <motion.div variants={scaleIn} className="md:col-span-6 p-1.5 rounded-[28px] md:rounded-10 bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_80px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2 group">
            <div className="bg-card-peach h-full rounded-[22px] md:rounded-8.5 p-6 sm:p-8 md:p-12 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-500">
                  <Database size={24} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-ink mb-3 md:mb-4 tracking-[-0.02em]">Backend & Infra</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-8">Designing robust REST APIs and scalable cloud infrastructure.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                 {['FastAPI', 'REST APIs', 'Python', 'Haskell', 'AWS Cloud', 'AWS S3', 'DevOps'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/50 text-ink rounded-full text-[12px] md:text-[13px] font-semibold ring-1 ring-black/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Process Automation */}
          <motion.div variants={scaleIn} className="md:col-span-6 p-1.5 rounded-[28px] md:rounded-10 bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_80px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2 group">
            <div className="bg-card-lavender h-full rounded-[22px] md:rounded-8.5 p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 group-hover:translate-x-4 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none">
                <CodeBlock size={240} weight="fill" className="text-ink" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-500">
                  <CodeBlock size={24} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold text-ink mb-3 md:mb-4 tracking-[-0.02em]">Process Automation</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-8 max-w-[280px] md:max-w-[320px]">Writing efficient scripts to scrape data and eliminate manual labor.</p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2.5">
                 {['Selenium', 'BeautifulSoup', 'PyAutoGUI'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/50 text-ink rounded-full text-[12px] md:text-[13px] font-semibold ring-1 ring-black/5">
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
