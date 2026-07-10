import { type ReactElement, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

/* Animation Variants */
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textThereVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase, delay: 0.25 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
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
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
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
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="relative z-0 flex flex-col pt-32 lg:pt-36 px-6 md:px-10 lg:px-16 pb-32 min-h-[100dvh] bg-[#F9F8F4] overflow-x-hidden"
    >
      <StaticDotGrid />

      {/* CONTAINER */}
      <div className="w-full relative z-10">

        {/* HEADER */}
        <motion.div variants={textThereVariants} className="w-full mb-14 md:mb-20">
          <h1 className="font-seasons text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-[#1A2F24]">
            PERSONAL<br />
            <span className="text-[#4A6750]">PROJECTS</span>
          </h1>
        </motion.div>

        {/* SHOWCASE LIST */}
        <div className="w-full border-t border-[#1A2F24]/10">
          {projects.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group flex flex-col md:flex-row items-start md:items-center w-full py-8 md:py-10 border-b border-[#1A2F24]/10 cursor-pointer gap-5 md:gap-8"
            >

              {/* Thumbnail */}
              <div className="w-full md:w-40 aspect-video relative overflow-hidden rounded-xl bg-[#EAF1EC]/50 shrink-0 border border-[#2E4C38]/10">
                <div className="absolute inset-0 bg-[#1A2F24]/5 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-redhat text-[10px] tracking-[0.15em] uppercase text-[#4A6750] font-bold">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#2E4C38]/20" />
                  <span className="font-aileron text-[10px] font-bold uppercase tracking-wider text-[#1A2F24]/50">
                    {project.year}
                  </span>
                </div>

                <h3 className="font-seasons text-2xl md:text-3xl text-[#1A2F24] group-hover:text-[#4A6750] transition-colors duration-500">
                  {project.title}
                </h3>
              </div>

              {/* Arrow Icon */}
              <div className="hidden md:flex items-center h-10 rounded-full border border-[#2E4C38]/20 text-[#1A2F24] group-hover:bg-[#1A2F24] group-hover:text-[#F9F8F4] group-hover:border-transparent transition-all duration-500 shrink-0">
                <div className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:pl-4 transition-all duration-500 ease-out font-aileron text-[10px] font-bold tracking-[0.15em] uppercase">
                  View Project
                </div>
                <span className="w-10 h-10 flex items-center justify-center group-hover:-rotate-45 transition-transform duration-500 shrink-0">
                  <ArrowRight />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectsPage;