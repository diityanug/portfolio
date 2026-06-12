import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { 
  containerVariants, 
  popUpVariants, 
  lineGrowVariants 
} from '@utils/animation';

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

/* MAIN PAGE COMPONENT */
const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="w-full px-8 md:px-16 bg-transparent min-h-[calc(100vh-116px)] overflow-x-hidden relative z-0 pt-16 md:pt-24 pb-24"
    >
      {/* // Background Blur */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-gray-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* // Top Border */}
      <motion.div
        variants={lineGrowVariants}
        className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.07] pointer-events-none"
      />

      <div className="w-full max-w-[1440px] mx-auto relative z-10">

        {/* MAIN HEADER */}
        <motion.div variants={containerVariants} className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="flex flex-col">
            {/* // Title */}
            <h1 className="pointer-events-none select-none font-lejour font-normal text-5xl md:text-[80px] lg:text-[96px] leading-[0.9] tracking-tight flex flex-col">
               <motion.div variants={popUpVariants} className="text-[#2A2320] pb-1 md:pb-2">
                 Personal
               </motion.div>
               <motion.div variants={popUpVariants} className="text-[#5E7657]">
                 Projects
               </motion.div>
            </h1>
            
            {/* // Decorative Line */}
            <motion.div variants={lineGrowVariants} className="w-16 md:w-32 h-[1px] bg-[#5E7657] mt-8" />
          </div>
          
          {/* // Subtitle */}
          <motion.p 
            variants={popUpVariants}
            className="font-poppins text-gray-400 uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium max-w-[220px] text-left md:text-right leading-relaxed pb-1"
          >
            Projects, Experiments, and Ideas Brought to Life
          </motion.p>
        </motion.div>

        {/* MAIN PROJECTS GRID */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          
          {/* // Project Cards Iteration */}
          {projects.map((project) => (
            <motion.div
              variants={popUpVariants}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col w-full rounded-[28px] bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
            >
              <div className="w-full aspect-[16/9] overflow-hidden relative bg-black/[0.02]">
                <div className="absolute inset-0 bg-[#2A2320]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-white/50 font-poppins text-[9px] font-semibold tracking-widest text-[#2A2320]">
                  {project.year}
                </div>

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#f8f9fa';
                  }}
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <span className="font-poppins text-[9px] tracking-[0.25em] uppercase text-gray-400 font-semibold mb-3">
                  {project.category}
                </span>
                
                <div className="flex items-start justify-between gap-4 mt-auto">
                  <h3 
                    className="text-xl md:text-[22px] text-black leading-snug tracking-wide group-hover:text-[#5E7657] transition-colors duration-300"
                    style={{ fontFamily: "'Poppins ExtraLight', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  
                  <span className="text-[#5E7657] text-xl opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    ↗
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