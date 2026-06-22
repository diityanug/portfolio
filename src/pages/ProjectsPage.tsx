import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { 
  popUpVariants 
} from '@utils/animation';

// IMPORT STATIC DOT GRID DI SINI
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

/* MAIN PROJECT DATA */
const projects = [
  {
    title: "Genre Game Classifier",
    category: "Natural Language Processing",
    year: "2024",
    image: "public/images/Project 1.png",
    slug: "genre-game-classifier"
  }
];

/* ARROW ICON HELPER */
const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="17" x2="19" y2="5"></line>
    <polyline points="5 5 19 5 19 19"></polyline>
  </svg>
);

/* MAIN PAGE COMPONENT */
const ProjectsPage = () => {
  const navigate = useNavigate();

  const pageVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const typingChar: Variants = {
    hidden: { opacity: 0, y: 15, rotate: -5 },
    show: { 
      opacity: 1, y: 0, rotate: 0,
      transition: { type: "spring", damping: 16, stiffness: 140 }
    }
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 1.0, staggerChildren: 0.2 } 
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-32 lg:pt-40 px-6 md:px-12 lg:px-16 pb-24 min-h-screen bg-[#F9F8F4] overflow-x-hidden"
    >
      {/* BACKGROUND STATIC */}
      <StaticDotGrid />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">

        {/* EDITORIAL HEADER */}
        <div className="mb-20 md:mb-28">
          
          <motion.h1 
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            className="pointer-events-none select-none font-hatton font-normal text-6xl md:text-[80px] lg:text-[100px] leading-[0.85] tracking-tight mb-8 flex flex-col items-start md:flex-row md:flex-wrap md:items-baseline gap-x-5 gap-y-1"
          >
            <div className="text-[#1A2F24] flex pb-2">
              {"PERSONAL".split("").map((char, i) => (
                <motion.span key={`personal-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="text-[#4A6750] flex md:ml-12 lg:ml-20">
              {"PROJECTS".split("").map((char, i) => (
                <motion.span key={`projects-${i}`} variants={typingChar} className="inline-block whitespace-pre">
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </div>

        {/* MAIN PROJECTS LIST */}
        <motion.div 
          variants={listContainerVariants} 
          initial="hidden"
          animate="show"
          className="flex flex-col w-full border-t border-[#2E4C38]/20"
        >
          {projects.map((project) => (
            <motion.div
              variants={popUpVariants}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col lg:flex-row w-full py-12 md:py-16 border-b border-[#2E4C38]/15 hover:border-[#4A6750] transition-colors duration-500 ease-out gap-8 lg:gap-20 items-center"
            >
              
              {/* Image Section */}
              <div className="w-full lg:w-[45%] shrink-0 aspect-[16/10] overflow-hidden rounded-2xl relative bg-[#EAF1EC]/50 border border-[#2E4C38]/5">
                <div className="absolute inset-0 bg-[#1A2F24]/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-[0.22,1,0.36,1]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center w-full">
                
                {/* Index & Category */}
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span className="w-12 h-[1.5px] bg-[#2E4C38]/20" />
                  <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#4A6750] font-bold">
                    {project.category}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-hatton font-normal text-4xl md:text-5xl lg:text-6xl text-[#1A2F24] leading-[1.1] mb-8 md:mb-12 group-hover:text-[#4A6750] transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Footer Details */}
                <div className="flex items-center justify-between w-full pt-6 border-t border-[#2E4C38]/10 mt-auto">
                  <span className="font-migra text-[#1A2F24]/70 text-base md:text-lg font-medium">
                    {project.year}
                  </span>
                  
                  <div className="flex items-center gap-3 text-[#1A2F24]/40 group-hover:text-[#4A6750] transition-colors duration-300 overflow-hidden pr-2">
                    {/* Teks View Project Muncul Saat Dihover */}
                    <span className="font-['Red_Hat_Display'] text-[10px] tracking-[0.2em] uppercase font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                      View Project
                    </span>
                    <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      <ArrowUpRight />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectsPage;