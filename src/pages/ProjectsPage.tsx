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

// Animation Variants
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

// Mock Data
const projects: Project[] = [
  {
    title: "Genre Game Classifier",
    category: "Machine Learning",
    year: "2024",
    image: "/images/Cover.png",
    slug: "genre-game-classifier"
  },
];

//  Sub-components 
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

//  Main Component 
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
      viewport={{ once: true, margin: "-10%" }}
      className="relative z-0 flex flex-col pt-12 pb-12 md:pt-20 md:pb-20 px-6 md:px-12 lg:px-20 w-full bg-[#F9F8F4] overflow-hidden scroll-mt-20"
    >
      <div className="w-full relative z-10 max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div variants={textVariants} className="w-full mb-4 md:mb-8 flex flex-col">
          <span className="font-redhat text-[10px] tracking-[0.25em] uppercase text-[#4A6750] font-bold mb-2">
            Personal
          </span>
          <h2 className="font-seasons text-[40px] md:text-5xl lg:text-6xl tracking-tight text-[#1A2F24] leading-none">
            Projects.
          </h2>
        </motion.div>

        {/* Swipeable Projects Carousel */}
        <div className="w-full relative z-10">
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 md:gap-8 pb-6 pt-2 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
            {projects.map((project) => (
              <motion.div
                variants={itemVariants}
                key={project.slug}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="group flex flex-col shrink-0 w-[80vw] sm:w-[340px] md:w-[420px] snap-center cursor-pointer"
              >
                
                {/* Image Cover Container */}
                <div className="w-full aspect-[4/3] md:aspect-[16/11] relative overflow-hidden bg-white border border-[#1A2F24]/10 rounded-[1.25rem] md:rounded-[1.5rem] mb-4 md:mb-5 shadow-sm group-hover:shadow-md group-hover:border-[#4A6750]/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-[#1A2F24]/0 group-hover:bg-[#1A2F24]/5 transition-colors duration-500 z-10 pointer-events-none" />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={handleImageError}
                  />
                  
                  {/* Floating Action Button */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md text-[#1A2F24] flex items-center justify-center shadow-sm z-20 transition-all duration-300 group-hover:bg-[#1A2F24] group-hover:text-[#F9F8F4] active:scale-95 border border-[#1A2F24]/5">
                    <ArrowRight />
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col px-1">
                  
                  {/* Metadata Tags */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#4A6750] px-3 py-1.5 bg-[#4A6750]/5 rounded-full border border-[#2E4C38]/10 shrink-0">
                      {project.category}
                    </span>
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#1A2F24]/40 px-3 py-1.5 bg-white rounded-full border border-[#1A2F24]/10 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  
                  {/* Project Title */}
                  <h3 className="font-['Garbata'] font-bold text-[24px] md:text-[24px] tracking-wide leading-tight text-[#1A2F24] group-hover:text-[#4A6750] transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
                
              </motion.div>
            ))}
          </div>

          {/* Swipe Indicator */}
          <div className="flex justify-start items-center gap-2 text-[9px] font-redhat tracking-widest text-[#1A2F24]/30 uppercase select-none mt-2">
            <span>Swipe to explore</span>
            <span>→</span>
          </div>
          
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectSection;