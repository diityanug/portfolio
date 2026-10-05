import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';

// --- Projects Section (Simple Cards) ---
const Projects = () => {
  const projects = [
    {
      slug: "genre-game-classifier",
      title: "Genre Game Classifier",
      category: "Machine Learning Web App",
      overview: "An end-to-end Machine Learning web application that predicts video game genres from descriptions using modern NLP techniques, served via a robust FastAPI backend with an interactive React frontend.",
      tags: ["React", "TypeScript", "FastAPI", "Python", "NLP", "Machine Learning"],
      image: "/genre game classifier web.webp",
      imageClass: "w-full h-full object-cover object-top rounded-xl shadow-lg ring-1 ring-black/10",
      media: "bg-[#FFEDD5]",
      accent: "text-[#C2410C]",
      tag: "bg-[#FFF7ED] text-[#9A3412] border-[#FED7AA]",
      hoverBorder: "hover:border-[#F97316]/60",
      arrowHover: "group-hover:bg-[#F97316] group-hover:text-white",
    },
    {
      slug: "lenvry",
      title: "Lenvry",
      category: "Mobile Application",
      overview: "A comprehensive personal tracking mobile application built with React Native and Expo Router. Track fitness workouts, habit streaks, daily meals, and personal finances with an offline-first local database architecture.",
      tags: ["React Native", "Expo", "TypeScript", "AsyncStorage", "Database", "Mobile"],
      image: "/Lenvrtt-removebg-preview.png",
      imageClass: "w-full h-full object-contain drop-shadow-xl",
      media: "bg-[#E0F2FE]",
      accent: "text-[#0369A1]",
      tag: "bg-[#F0F9FF] text-[#075985] border-[#BAE6FD]",
      hoverBorder: "hover:border-[#0284C7]/60",
      arrowHover: "group-hover:bg-[#0284C7] group-hover:text-white",
    },
  ];

  return (
    <section id="projects" className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10px" }} 
          variants={fadeUp} 
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase">
              Personal <br className="hidden md:block" />Projects.
            </h2>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {projects.map((project) => (
            <Link
              to={`/project/${project.slug}`}
              key={project.slug}
              className="block outline-none h-full group"
            >
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10px" }}
                variants={scaleIn}
                className={`h-full flex flex-col overflow-hidden rounded-3xl bg-white border border-hairline shadow-sm transition-colors duration-300 ${project.hoverBorder}`}
              >
                {/* Gambar */}
                <div className={`aspect-16/10 w-full p-4 sm:p-6 ${project.media}`}>
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className={project.imageClass}
                  />
                </div>

                {/* Isi */}
                <div className="flex flex-col flex-1 p-5 sm:p-7 gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-sm font-semibold mb-1 ${project.accent}`}>{project.category}</p>
                      <h3 className="text-2xl sm:text-[28px] font-bold text-ink tracking-tight leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <span className={`w-10 h-10 rounded-full border border-hairline text-ink flex items-center justify-center shrink-0 transition-colors duration-300 ${project.arrowHover}`}>
                      <ArrowUpRight size={18} weight="bold" />
                    </span>
                  </div>

                  <p className="text-[#4a4a4a] text-[15px] md:text-base leading-[1.7]">
                    {project.overview}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${project.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;