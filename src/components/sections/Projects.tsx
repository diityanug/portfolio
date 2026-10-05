import { motion } from 'framer-motion';
import { ArrowUpRight, GameController } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';

// --- Projects Section (Spacious, Tasteful Silhouette Bento Cards) ---
const Projects = () => {
  const projects = [
    {
      slug: "genre-game-classifier",
      title: "Genre Game Classifier",
      category: "Machine Learning Web App",
      overview: "An end-to-end Machine Learning web application that predicts video game genres from descriptions using modern NLP techniques, served via a robust FastAPI backend with an interactive React frontend.",
      tags: ["React", "TypeScript", "FastAPI", "Python", "NLP", "Machine Learning"],
      image: "/genre game classifier web.webp",
      icon: GameController,
      bgType: "icon" as const,
      gradient: "from-[#FFF8F1] via-[#FFEDD5] to-[#FED7AA]/60",
      borderAccent: "border-[#FDBA74]",
      hoverBorder: "hover:border-[#F97316]/50",
      hoverShadow: "hover:shadow-xl hover:shadow-[#F97316]/10",
      iconBg: "group-hover:bg-[#F97316]",
      silhouetteColor: "text-[#EA580C]",
      mixBlend: true
    },
    {
      slug: "lenvry",
      title: "Lenvry",
      category: "Mobile Application",
      overview: "A comprehensive personal tracking mobile application built with React Native and Expo Router. Track fitness workouts, habit streaks, daily meals, and personal finances with an offline-first local database architecture.",
      tags: ["React Native", "Expo", "TypeScript", "AsyncStorage", "Database", "Mobile"],
      image: "/Lenvrtt-removebg-preview.png",
      bgType: "image" as const,
      gradient: "from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]/60",
      borderAccent: "border-[#7DD3FC]",
      hoverBorder: "hover:border-[#0284C7]/50",
      hoverShadow: "hover:shadow-xl hover:shadow-[#0284C7]/10",
      iconBg: "group-hover:bg-[#0284C7]",
      silhouetteColor: "text-[#0284C7]",
      mixBlend: false
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

        {/* Projects 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {projects.map((project, i) => {
            const IconComponent = project.icon;
            return (
              <Link 
                to={`/project/${project.slug}`} 
                key={i} 
                className="block outline-none h-full group"
              >
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-10px" }} 
                  variants={scaleIn} 
                  className="h-full"
                >
                  {/* Outer Frame (Matching Skills.tsx craftsmanship) */}
                  <div className={`p-1.5 rounded-3xl md:rounded-[36px] bg-white border border-hairline ${project.hoverBorder} transition-all duration-300 shadow-sm ${project.hoverShadow} h-full`}>
                    
                    {/* Inner Canvas */}
                    <div className={`bg-linear-to-br ${project.gradient} h-full rounded-[22px] md:rounded-[30px] p-7 sm:p-9 md:p-12 flex flex-col justify-between relative overflow-hidden border ${project.borderAccent} min-h-115 md:min-h-125`}>
                      
                      {/* Background Watermark Silhouette for Genre Game: Large Phosphor Icon only */}
                      {project.bgType === "icon" && IconComponent && (
                        <div className="absolute -bottom-10 -right-8 sm:-bottom-10 sm:-right-6 md:-bottom-12 md:-right-6 opacity-[0.10] group-hover:opacity-[0.20] group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none select-none">
                          <IconComponent size={280} weight="fill" className={project.silhouetteColor} />
                        </div>
                      )}

                      {/* Background Watermark Silhouette for Lenvry: Real Mockup Image only (No Icon) */}
                      {project.bgType === "image" && (
                        <div className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-8 md:-bottom-12 md:-right-6 w-70 sm:w-87.5 md:w-105 aspect-16/10 rounded-2xl overflow-hidden border border-black/10 shadow-2xl rotate-[-5deg] group-hover:-rotate-2 group-hover:scale-105 opacity-[0.24] sm:opacity-[0.28] group-hover:opacity-[0.40] transition-all duration-700 ease-out pointer-events-none select-none">
                          <img 
                            src={project.image} 
                            alt="" 
                            className="w-full h-full object-cover object-center mix-blend-multiply" 
                          />
                        </div>
                      )}

                      {/* Top Bar: Category Pill + Action Circle */}
                      <div className="relative z-10 flex items-center justify-between gap-4 mb-8 sm:mb-10">
                        <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-bold tracking-wide border border-black/5 shadow-xs">
                          {project.category}
                        </span>

                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md text-ink border border-black/5 shadow-xs flex items-center justify-center group-hover:bg-ink group-hover:text-white group-hover:rotate-45 transition-all duration-300 shrink-0">
                          <ArrowUpRight size={20} weight="bold" />
                        </div>
                      </div>

                      {/* Middle: Title & Generous Breathing Overview */}
                      <div className="relative z-10 max-w-xl mb-8 sm:mb-12">
                        <h3 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-ink tracking-tight leading-[1.2] mb-3.5 group-hover:text-ink transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[#4a4a4a] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-normal">
                          {project.overview}
                        </p>
                      </div>

                      {/* Bottom Footer: Tech Stack Pills & Action Link */}
                      <div className="relative z-10 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-ink rounded-full text-xs md:text-[13px] font-semibold border border-black/5 shadow-xs group-hover:border-black/15 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs md:text-[13px] font-bold uppercase tracking-wider text-ink group-hover:text-ink transition-colors shrink-0">
                          <span>Explore Case Study</span>
                          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;