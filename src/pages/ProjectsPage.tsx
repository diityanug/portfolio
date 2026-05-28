import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const ProjectsPage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Genre Game Classifier",
      category: "Natural Language Processing",
      year: "2024",
      image: "/images/project-apc.jpg",
      slug: "genre-game-classifier"
    }
  ];

  // ANIMATION VARIANTS
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col pt-16 md:pt-20 px-8 md:px-16 pb-24 min-h-screen bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">

        {/* HEADER SECTION */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="pointer-events-none select-none font-lejour font-normal text-6xl md:text-[82.4px] leading-[0.9] tracking-tight text-[#2A2320]">
              <div className="pb-3"><Typewriter text="Personal" /></div>
              <div><Typewriter text="Projects" delay={0.3} /></div>
            </h1>
            <motion.div variants={lineVariants} className="w-24 border-t-2 border-black/30 mt-8" />
          </div>
          
          <motion.p 
            variants={itemVariants}
            className="font-poppins text-gray-400 uppercase tracking-widest text-xs font-light max-w-[200px] text-left md:text-right leading-relaxed"
          >
            A collection of my project.
          </motion.p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-16 w-full">
          {projects.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.slug} // ✅ Diperbaiki menggunakan project.slug
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col"
            >
              
              {/* Image Card Container */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-6 relative border border-black/5 shadow-sm">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#f3f4f6';
                  }}
                />
                <div className="absolute bottom-5 left-5 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full font-poppins text-xs font-medium uppercase tracking-widest text-[#2A2320] flex items-center gap-3 shadow-md">
                    View Project <span className="text-[#5E7657] text-base leading-none">↗</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-poppins font-bold text-2xl text-[#2A2320] group-hover:text-[#5E7657] transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-telegraf text-sm text-gray-400 mt-1">
                    {project.year}
                  </span>
                </div>

                <p 
                  style={{ fontFamily: "'The Seasons Italic', serif" }} 
                  className="text-xl md:text-2xl text-gray-500 tracking-wide"
                >
                  {project.category}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectsPage;