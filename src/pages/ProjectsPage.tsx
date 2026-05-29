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
      className="relative flex flex-col pt-16 md:pt-24 px-8 md:px-16 pb-24 min-h-[calc(100vh-116px)] bg-white overflow-hidden"
    >
      {/* ========================================== */}
      {/* BACKGROUND TEXTURES (Konsisten dengan Homepage) */}
      {/* ========================================== */}
      <div
        className="absolute inset-0 pointer-events-none -z-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at top center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at top center, black 40%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h1 className="pointer-events-none select-none font-lejour font-normal text-6xl md:text-[96px] leading-[0.9] tracking-tight text-[#2A2320]">
              <div className="pb-2 md:pb-3"><Typewriter text="Personal" /></div>
              <div className="text-[#5E7657]"><Typewriter text="Projects" delay={0.3} /></div>
            </h1>
            <motion.div variants={lineVariants} className="w-16 md:w-24 border-t-[1.5px] border-[#5E7657] mt-8" />
          </div>
          
          <motion.p 
            variants={itemVariants}
            className="font-poppins text-gray-400 uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium max-w-[220px] text-left md:text-right leading-relaxed"
          >
            A curated collection of my independent work & experiments.
          </motion.p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 w-full">
          {projects.map((project) => (
            <motion.div
              variants={itemVariants}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col"
            >
              
              {/* Image Card Container */}
              <div className="w-full aspect-[4/3] rounded-[28px] overflow-hidden bg-black/[0.02] mb-6 relative border border-black/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out">
                {/* Overlay Hitam Transparan */}
                <div className="absolute inset-0 bg-[#2A2320]/0 group-hover:bg-[#2A2320]/20 transition-colors duration-500 z-10" />
                
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#f8f9fa';
                  }}
                />
                
                {/* Floating View Project Button (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full font-poppins text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2A2320] flex items-center gap-3 shadow-xl">
                    View Project <span className="text-[#5E7657] text-lg leading-none">↗</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-poppins font-semibold text-2xl text-[#2A2320] group-hover:text-[#5E7657] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 mt-1 rounded-full border border-black/5 bg-black/[0.02] font-poppins text-[10px] font-medium tracking-widest text-gray-400">
                    {project.year}
                  </span>
                </div>

                <p 
                  style={{ fontFamily: "'The Seasons Italic', serif" }} 
                  className="text-[22px] text-gray-500 tracking-wide mt-1"
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