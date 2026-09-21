import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';

// --- Projects Section (Modular) ---
const Projects = () => {
  const projects = [
    {
      title: "Genre Game Classifier",
      overview: "An end-to-end Machine Learning web application that predicts video game genres from their descriptions. Built using modern NLP techniques, served via FastAPI, and consumed by an interactive React interface.",
      tags: ["React", "TypeScript", "FastAPI", "Python", "NLP"],
      image: "/genre_game_vector_cover.jpg",
      color: "bg-card-peach"
    },
    // Add more projects here easily
  ];

  return (
    <section id="projects" className="pt-16 md:pt-24 pb-28 md:pb-40 px-4 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} 
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 px-2 md:px-0"
        >
          <div>
            <h2 className="text-[40px] md:text-[80px] font-bold text-ink tracking-[-0.03em] leading-none">
              Personal <br className="hidden md:block" />Projects.
            </h2>
          </div>
          <p className="text-steel text-base md:text-[19px] max-w-md leading-[1.6]">
            Showcasing end-to-end applications built to solve complex problems with modern technologies.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-16">
          {projects.map((project, i) => (
            <Link to={`/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`} key={i} className="block outline-none">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={scaleIn}
                className="w-full group"
              >
                <div className="p-2 md:p-3 rounded-4xl md:rounded-[48px] bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2">
                  <div className="bg-[#fcfcfc] rounded-3xl md:rounded-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] overflow-hidden relative flex flex-col lg:flex-row min-h-100 lg:min-h-125">

                    {/* Content Side */}
                    <div className="w-full lg:w-5/12 p-8 sm:p-10 md:p-16 flex flex-col justify-center relative z-10 order-2 lg:order-1">
                      <h3 className="text-3xl md:text-5xl font-bold text-ink mb-6 tracking-tight group-hover:text-primary transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-steel leading-[1.8] text-base md:text-[17px] mb-10">
                        {project.overview}
                      </p>
                      <div className="flex flex-wrap gap-2.5 mb-12">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-white border border-black/5 shadow-sm rounded-full text-[12px] md:text-[13px] font-semibold text-ink">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest text-ink group-hover:text-primary transition-colors mt-auto">
                        <span className="relative">
                          Explore Case Study
                          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                        </span>
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:-rotate-45 transition-all duration-500">
                          <ArrowUpRight size={18} weight="bold" />
                        </div>
                      </div>
                    </div>

                    {/* Image Showcase Side (Responsive) */}
                    <div className="w-full lg:w-7/12 relative aspect-video lg:aspect-auto lg:min-h-full bg-[#FAFAFA] overflow-hidden order-1 lg:order-2 flex items-center justify-center p-6 md:p-12 border-b lg:border-b-0 lg:border-l border-black/5">
                      <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] bg-white ring-1 ring-black/5">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-center mix-blend-multiply"
                        />
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
