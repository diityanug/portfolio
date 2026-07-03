import { type ReactElement, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// IMPORT STATIC DOT GRID DI SINI
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

/* =========================================
   KOREOGRAFI ANIMASI (CINEMATIC TIMING)
   ========================================= */
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.5, ease: customEase } }
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase } }
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase, delay: 0.4 } }
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.6, staggerChildren: 0.15 } 
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: customEase } }
};

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
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="17" x2="19" y2="5"></line>
    <polyline points="5 5 19 5 19 19"></polyline>
  </svg>
);

/* MAIN PAGE COMPONENT */
const ProjectsPage = (): ReactElement => {
  const navigate = useNavigate();

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-32 lg:pt-40 px-6 md:px-12 lg:px-16 pb-32 min-h-screen bg-[#F9F8F4] overflow-x-hidden"
    >
      {/* BACKGROUND STATIC */}
      <StaticDotGrid />

      <div className="w-full max-w-[1000px] mx-auto relative z-10">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 mb-16 md:mb-20">
          <motion.div 
            initial="hidden" 
            animate="show" 
            transition={{ staggerChildren: 0.15 }}
            className="flex flex-col md:flex-row gap-x-5 gap-y-1"
          >
            <motion.h1 variants={textVariants} className="font-['The_Seasons_Regular'] text-[50px] sm:text-[70px] md:text-[90px] lg:text-[100px] leading-[0.85] tracking-tight text-[#1A2F24] drop-shadow-sm">
              PERSONAL
            </motion.h1>
            <motion.h1 variants={textVariants} className="font-['The_Seasons_Regular'] text-[50px] sm:text-[70px] md:text-[90px] lg:text-[100px] leading-[0.85] tracking-tight text-[#4A6750] drop-shadow-sm">
              PROJECTS
            </motion.h1>
          </motion.div>
          
          <motion.div 
            variants={subtitleVariants}
            className="flex items-center gap-4 mt-2"
          >
            <span className="font-['Red_Hat_Display'] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#4A6750] bg-[#4A6750]/5 px-4 py-2 rounded-full border border-[#4A6750]/10">
              Selected Works
            </span>
            <div className="flex-1 h-[1px] bg-[#2E4C38]/10" />
          </motion.div>
        </div>

        {/* ================= COMPACT LIST INDEX ================= */}
        <motion.div 
          variants={listContainerVariants} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col w-full border-t border-[#2E4C38]/10"
        >
          {projects.map((project) => (
            <motion.div
              variants={cardVariants}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center py-8 md:py-10 border-b border-[#2E4C38]/10 hover:bg-[#4A6750]/[0.02] px-4 -mx-4 rounded-2xl transition-colors duration-500 ease-out"
            >
              
              {/* Image Section - Compact Thumbnail */}
              <div className="w-full md:w-[260px] lg:w-[320px] shrink-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] relative bg-[#EAF1EC]/50 border border-[#2E4C38]/10 group-hover:shadow-md transition-all duration-500">
                <div className="absolute inset-0 bg-[#1A2F24]/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]"
                  onError={handleImageError}
                />
              </div>

              {/* Content Section - Compact & Aligned */}
              <div className="flex-1 flex flex-col justify-center w-full">
                
                {/* Meta Tags */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-['Red_Hat_Display'] text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#4A6750] font-bold">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#2E4C38]/20" />
                  <span className="font-['Aileron'] text-[#1A2F24]/50 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    {project.year}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-['The_Seasons_Regular'] text-3xl md:text-4xl lg:text-5xl text-[#1A2F24] leading-[1.1] mb-6 group-hover:text-[#4A6750] transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Custom Action Button */}
                <div className="flex items-center gap-3 text-[#1A2F24]/40 group-hover:text-[#4A6750] transition-colors duration-300 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#2E4C38]/10 flex items-center justify-center text-[#1A2F24]/50 group-hover:bg-[#1A2F24] group-hover:text-[#F9F8F4] group-hover:border-transparent transition-all duration-300 shadow-sm">
                    <ArrowUpRight />
                  </div>
                  <span className="font-['Red_Hat_Display'] text-[10px] tracking-[0.2em] uppercase font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                    Explore
                  </span>
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