import { type ReactElement, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

// Types & Interfaces
interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
  slug: string;
}

// Animation configurations
const customEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: customEase, delay: 0.1 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: customEase } 
  },
};

// Local Data
const projects: Project[] = [
  {
    title: "Genre Game Classifier",
    category: "Machine Learning",
    year: "2024",
    image: "/images/Cover Project.webp",
    slug: "genre-game-classifier"
  },
];

// UI Icons
const ArrowRight = (): ReactElement => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" height="18" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2.5" 
    strokeLinecap="round" strokeLinejoin="round" 
    className="transition-transform duration-300 group-hover:-rotate-45"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Main Component: Project Section
const ProjectSection = (): ReactElement => {
  const navigate = useNavigate();

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <motion.section
      id="projects"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative z-0 flex flex-col pt-12 pb-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-24 w-full bg-[#F9F8F4] overflow-hidden scroll-mt-20"
    >
      <div className="w-full relative z-10 max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        
        {/* Section Header */}
        <motion.div variants={textVariants} className="w-full flex flex-col text-left">
          <span className="font-karla text-[10px] tracking-[0.25em] uppercase text-[#4A6750] font-bold mb-3 md:mb-4">
            Personal
          </span>
          <h2 className="font-autour text-[35px] sm:text-[54px] lg:text-[64px] leading-[1.1] tracking-tight text-[#1A2F24]">
            Projects
          </h2>
        </motion.div>

        {/* Swipeable Projects Carousel */}
        <div className="w-full relative z-10">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-8 pt-2 scrollbar-none -mx-6 px-6 lg:mx-0 lg:px-0">
            {projects.map((project) => (
              <motion.div
                variants={itemVariants}
                key={project.slug}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="group flex flex-col shrink-0 w-[85vw] sm:w-[380px] md:w-[460px] snap-center cursor-pointer"
              >
                
                {/* Image Cover Container */}
                <div className="w-full aspect-[4/3] md:aspect-[16/11] relative overflow-hidden bg-white border border-[#1A2F24]/10 rounded-[1.5rem] md:rounded-[2rem] mb-5 md:mb-6 shadow-sm group-hover:shadow-md group-hover:border-[#4A6750]/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-[#1A2F24]/0 group-hover:bg-[#1A2F24]/5 transition-colors duration-500 z-10 pointer-events-none" />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={handleImageError}
                  />
                  
                  {/* Action Button */}
                  <div className="absolute bottom-5 right-5 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-md text-[#1A2F24] flex items-center justify-center shadow-sm z-20 transition-all duration-300 group-hover:bg-[#1A2F24] group-hover:text-[#F9F8F4] active:scale-95 border border-[#1A2F24]/5">
                    <ArrowRight />
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col px-2">
                  
                  {/* Metadata Tags */}
                  <div className="flex items-center gap-3 mb-0.2">
                    <span className="font-overlock text-[11px] md:text-[12px] font-bold tracking-widest uppercase text-[#4A6750] ">
                      {project.category}
                    </span>
                    <span className="text-[#1A2F24]/20 text-[10px]">|</span>
                    <span className="font-overlock text-[11px] md:text-[12px] font-bold tracking-widest uppercase text-[#1A2F24]/40">
                      {project.year}
                    </span>
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="font-overlock text-[29px] md:text-[30px] font-semi bold text-[#1A2F24] group-hover:text-[#4A6750] transition-colors duration-300 tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
              </motion.div>
            ))}
          </div>

          {/* Navigation Hint */}
          <div className="flex justify-start items-center gap-1.5 text-[10px] md:text-[11px] font-karla tracking-widest text-[#1A2F24]/40 uppercase select-none mt-2">
            <span>Swipe sideways to explore</span>
            <span>→</span>
          </div>
          
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectSection;