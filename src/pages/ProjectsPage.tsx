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
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 1, ease: [0.32, 0.72, 0, 1] } 
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
const ArrowUpRight = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
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
      viewport={{ once: true, margin: "-10%" }}
      className="relative z-0 flex flex-col py-32 px-4 md:px-12 lg:px-24 w-full bg-[#f7f4ed] text-[#1c1c1c] min-h-[100svh] overflow-hidden"
    >
      <div className="w-full relative z-10 max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="w-full flex flex-col items-center text-center"
        >
          <span className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/5 text-[#5f5f5d] mb-6">
            Personal
          </span>
          <h2 className="font-sans text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tighter font-semibold text-[#1c1c1c]">
            Projects
          </h2>
        </motion.div>

        {/* Project Cards (Z-Axis Cascade / Asymmetrical Bento feel) */}
        <div className="w-full grid grid-cols-1 gap-12 lg:gap-16">
          {projects.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col items-center w-full relative"
            >
              {/* Brutalist Project Card */}
              <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between overflow-hidden group bg-[#f7f4ed] border-2 border-[#1c1c1c] transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]">
                
                  {/* Content Column */}
                  <div className="flex-1 flex flex-col items-start w-full p-8 sm:p-12 lg:p-16 relative z-10 border-b-2 lg:border-b-0 lg:border-r-2 border-[#1c1c1c]">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold text-[#1c1c1c] bg-[#eceae4] px-3 py-1.5 rounded-full uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="font-sans text-[11px] text-[#5f5f5d] uppercase tracking-widest">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1c1c1c] leading-tight mb-6 tracking-tight">
                      {project.title}
                    </h3>

                    <p className="font-sans text-base text-[#5f5f5d] leading-relaxed mb-10 max-w-md">
                      End-to-end Machine Learning pipeline utilizing spaCy, Complement Naive Bayes, and FastAPI with an interactive React frontend.
                    </p>

                    {/* High-End CTA */}
                    <div className="inline-flex items-center gap-4 text-[#1c1c1c] font-sans text-sm font-semibold tracking-wide">
                      <span className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1">View Case Study</span>
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#1c1c1c] group-hover:text-white">
                        <ArrowUpRight />
                      </div>
                    </div>
                  </div>

                  {/* Product Visual Container */}
                  <div className="flex-1 w-full relative h-full min-h-[300px] lg:min-h-[400px]">
                    <div className="absolute inset-0 bg-[#eceae4]/30"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover grayscale-[20%] transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grayscale-0 group-hover:scale-105"
                      onError={handleImageError}
                    />
                  </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default ProjectSection;