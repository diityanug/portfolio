import { motion } from 'framer-motion';
import { 
  DeviceMobile, 
  Code, 
  Brain, 
  Database, 
  HardDrives, 
  Robot, 
  GitBranch 
} from '@phosphor-icons/react';
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
          {/* Frontend & Mobile (Warm Amber Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-7 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#F59E0B]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#F59E0B]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#FDE68A]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <DeviceMobile size={240} weight="fill" className="text-[#78350F]" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#F59E0B] group-hover:text-white transition-all duration-300">
                  <DeviceMobile size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-[22px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">Frontend & Mobile</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-6 max-w-md">Developing responsive cross-platform mobile apps and dynamic web applications with seamless animations and modern navigation.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {['React.js', 'React Native', 'Expo', 'Expo Router', 'Tailwind CSS', 'Framer Motion'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#F59E0B]/40 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Programming Languages (Indigo Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-5 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#6366F1]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#6366F1]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#C7D2FE]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#C7D2FE]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <Code size={240} weight="fill" className="text-[#3730A3]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#6366F1] group-hover:text-white transition-all duration-300">
                  <Code size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-[22px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">Programming Languages</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-6">Core languages used to engineer software architectures, web platforms, and data pipelines.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#6366F1]/40 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI / Machine Learning & NLP (Mint Green Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-7 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#10B981]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#10B981]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#A7F3D0]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <Brain size={240} weight="fill" className="text-[#065F46]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                  <Brain size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[22px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">AI / Machine Learning & NLP</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-6 max-w-lg">Building text preprocessing pipelines, multi-label classification models, explainable AI, and data visualization analytics.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {[
                  'Scikit-Learn (TF-IDF, Naive Bayes, Multi-Label Classification)',
                  'NLTK',
                  'spaCy',
                  'Explainable AI (XAI)',
                  'Pandas',
                  'Matplotlib',
                  'Seaborn'
                ].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#10B981]/40 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Backend & API (Peach Coral Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-5 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#F97316]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#F97316]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FDBA74]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#FDBA74]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <Database size={240} weight="fill" className="text-[#9A3412]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                  <Database size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[22px] md:text-[28px] font-bold text-ink mb-2 tracking-[-0.02em]">Backend & API</h3>
                <p className="text-steel text-[14px] md:text-[15px] leading-[1.6] mb-6">Designing robust RESTful web services with asynchronous execution and schema validation.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {['FastAPI', 'Uvicorn', 'RESTful APIs', 'Pydantic'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#F97316]/40 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* State Management & Storage (Sky Blue Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-4 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#0284C7]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#0284C7]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#BAE6FD]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <HardDrives size={220} weight="fill" className="text-[#075985]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-300">
                  <HardDrives size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[20px] md:text-[24px] font-bold text-ink mb-2 tracking-[-0.02em]">State & Storage</h3>
                <p className="text-steel text-[14px] leading-[1.6] mb-6">Persistent storage solutions and offline-first client architecture.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {['AsyncStorage (Offline-First Architecture)', 'JSON Data Management'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#0284C7]/40 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Automation (Lavender Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-4 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#8B5CF6]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#DDD6FE]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <Robot size={220} weight="fill" className="text-[#5B21B6]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
                  <Robot size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[20px] md:text-[24px] font-bold text-ink mb-2 tracking-[-0.02em]">Automation</h3>
                <p className="text-steel text-[14px] leading-[1.6] mb-6">Web scraping, desktop automation, and repetitive workflow scripting.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {['Selenium', 'BeautifulSoup', 'PyAutoGUI'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#8B5CF6]/40 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools & Workflow (Rose Accent) */}
          <motion.div variants={scaleIn} className="md:col-span-4 p-1.5 rounded-3xl md:rounded-4xl bg-white border border-hairline hover:border-[#EC4899]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#EC4899]/10 group flex flex-col">
            <div className="bg-linear-to-br from-[#FDF2F8] via-[#FCE7F3] to-[#FBCFE8]/60 h-full rounded-[22px] md:rounded-[26px] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border border-[#FBCFE8]">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none">
                <GitBranch size={220} weight="fill" className="text-[#9D174D]" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-black/5 shadow-sm group-hover:bg-[#EC4899] group-hover:text-white transition-all duration-300">
                  <GitBranch size={26} className="text-ink group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[20px] md:text-[24px] font-bold text-ink mb-2 tracking-[-0.02em]">Tools & Workflow</h3>
                <p className="text-steel text-[14px] leading-[1.6] mb-6">Development tooling, version control, and package environments.</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                {['Git', 'GitHub', 'Vite', 'npm', 'Expo CLI'].map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs hover:border-[#EC4899]/40 transition-all">
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