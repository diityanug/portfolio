import { motion } from 'framer-motion';
import { CodeBlock, TerminalWindow, Database, Brain } from '@phosphor-icons/react';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/animations';
import Eyebrow from '../ui/Eyebrow';

// --- Asymmetrical Bento Grid ---
const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-48 px-4 bg-[#FAFAFA]">
      <div className="max-w-300 mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp}
          className="text-center mb-16 md:mb-32"
        >
          <Eyebrow text="Engineering Arsenal" />
          <h2 className="text-[40px] md:text-[64px] font-bold text-ink mb-4 md:mb-6 tracking-[-0.03em] leading-tight">Technical Skills.</h2>
          <p className="text-base md:text-[19px] text-steel max-w-2xl mx-auto leading-[1.6]">A unified stack for end-to-end development, from systemic architecture to fluid, pixel-perfect interfaces.</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          <motion.div variants={scaleIn} className="md:col-span-8 p-1.5 rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 group">
            <div className="bg-card-yellow-bold h-full rounded-[2.125rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div className="absolute -bottom-12 -right-12 opacity-10 group-hover:opacity-20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <TerminalWindow size={300} weight="fill" className="text-ink" />
              </div>
              <div className="relative z-10 max-w-lg">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 transition-transform duration-500">
                  <TerminalWindow size={24} className="text-ink" />
                </div>
                <h3 className="text-[32px] font-bold text-ink mb-4 tracking-[-0.02em]">Frontend Architecture</h3>
                <p className="text-steel text-[17px] leading-[1.7] mb-12 max-w-md">Building interactive, highly performant interfaces and complex microfrontend systems with absolute precision.</p>
                
                <div className="flex flex-wrap gap-2.5">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML', 'Microfrontend Architecture'].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white/70 backdrop-blur-md text-ink rounded-full text-[13px] font-semibold ring-1 ring-black/5 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className="md:col-span-4 p-1.5 rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 group">
            <div className="bg-card-mint h-full rounded-[2.125rem] p-8 md:p-12 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 transition-transform duration-500">
                  <Brain size={24} className="text-ink" />
                </div>
                <h3 className="text-[28px] font-bold text-ink mb-4 tracking-[-0.02em]">Data Intelligence</h3>
                <p className="text-steel text-[15px] leading-[1.6]">Implementing NLP, text preprocessing, and classification models.</p>
              </div>
              <div className="mt-12 flex flex-col gap-3">
                {['Pandas', 'Scikit-Learn', 'spaCy', 'Natural Language Processing', 'TF-IDF', 'Naive Bayes', 'Data Visualization'].map(skill => (
                  <div key={skill} className="flex items-center gap-3 text-ink font-semibold text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-ink/40"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className="md:col-span-6 p-1.5 rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 group">
            <div className="bg-card-peach h-full rounded-[2.125rem] p-8 md:p-12 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 transition-transform duration-500">
                  <Database size={24} className="text-ink" />
                </div>
                <h3 className="text-[28px] font-bold text-ink mb-4 tracking-[-0.02em]">Backend & Infra</h3>
                <p className="text-steel text-[15px] leading-[1.6] mb-8">Designing robust REST APIs and scalable cloud infrastructure.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                 {['FastAPI', 'REST APIs', 'Python', 'Haskell', 'AWS Cloud', 'AWS S3', 'DevOps'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/50 text-ink rounded-full text-[13px] font-semibold ring-1 ring-black/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className="md:col-span-6 p-1.5 rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 group">
            <div className="bg-card-lavender h-full rounded-[2.125rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 group-hover:translate-x-4 transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <CodeBlock size={240} weight="fill" className="text-ink" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm ring-1 ring-black/5 group-hover:-translate-y-1 transition-transform duration-500">
                  <CodeBlock size={24} className="text-ink" />
                </div>
                <h3 className="text-[28px] font-bold text-ink mb-4 tracking-[-0.02em]">Process Automation</h3>
                <p className="text-steel text-[15px] leading-[1.6] mb-8 max-w-70">Writing efficient scripts to scrape data and eliminate manual labor.</p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-2.5">
                 {['Selenium', 'BeautifulSoup', 'PyAutoGUI'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/50 text-ink rounded-full text-[13px] font-semibold ring-1 ring-black/5">
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
