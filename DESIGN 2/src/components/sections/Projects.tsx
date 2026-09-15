import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import Eyebrow from '../ui/Eyebrow';

// --- Projects Section (Modular) ---
const Projects = () => {
  const projects = [
    {
      title: "ML Pipeline Engine",
      overview: "An end-to-end Machine Learning web application that predicts video game genres from their descriptions. Built using modern NLP techniques, served via FastAPI, and consumed by an interactive React interface.",
      tags: ["React", "TypeScript", "FastAPI", "Python", "NLP"],
      icon: "👾",
      color: "bg-card-peach"
    },
    // Add more projects here easily
  ];

  return (
    <section id="projects" className="py-24 md:py-40 px-4 bg-white relative border-t border-black/5">
      <div className="max-w-300 mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} className="mb-12 md:mb-20 text-center">
          <Eyebrow text="Selected Works" />
          <h2 className="text-[40px] md:text-[64px] font-bold text-ink mb-6 tracking-[-0.03em] leading-tight">Featured Projects.</h2>
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-16">
          {projects.map((project, i) => (
            <Link to={`/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`} key={i} className="block">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={scaleIn}
                className="w-full max-w-5xl mx-auto"
              >
              <div className="p-2 md:p-3 rounded-4xl md:rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group cursor-pointer hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="bg-white rounded-[1.25rem] md:rounded-[1.75rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col md:flex-row overflow-hidden relative">
                  
                  {/* Visual/Icon Side */}
                  <div className={`w-full md:w-2/5 ${project.color} p-10 md:p-16 flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center text-4xl md:text-5xl md:mb-6 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] border border-black/5">
                      {project.icon}
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-16 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-4 md:mb-6 tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-steel leading-[1.8] text-[15px] md:text-base mb-8 md:mb-10">
                      {project.overview}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-[#FAFAFA] border border-black/5 rounded-lg text-xs md:text-[13px] font-semibold text-charcoal">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-primary group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <span>View Case Study</span>
                      <ArrowUpRight size={16} weight="bold" />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Projects;
