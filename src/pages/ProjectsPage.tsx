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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const lineGrowHorizontal: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full px-8 md:px-16 bg-white min-h-[calc(100vh-116px)] overflow-x-hidden relative z-0 pt-16 md:pt-24 pb-24"
    >
      {/* BACKGROUND TEXTURES */}
      <div
        className="absolute inset-0 pointer-events-none -z-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
      
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-gray-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        variants={lineGrowHorizontal}
        className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.07] pointer-events-none"
      />

      <div className="w-full max-w-[1440px] mx-auto relative z-10">

        {/* HEADER SECTION */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h1 className="pointer-events-none select-none font-lejour font-normal text-5xl md:text-[80px] lg:text-[96px] leading-[0.9] tracking-tight text-[#2A2320]">
              <div className="pb-1 md:pb-2"><Typewriter text="Personal" /></div>
              <div className="text-[#5E7657]"><Typewriter text="Projects" delay={0.5} /></div>
            </h1>
            
            <motion.div variants={lineGrowHorizontal} className="w-16 md:w-32 h-[1px] bg-[#5E7657] mt-8" />
          </div>
          
          <motion.p 
            variants={fadeUp}
            className="font-poppins text-gray-400 uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium max-w-[220px] text-left md:text-right leading-relaxed"
          >
            Projects, Experiments, and Ideas Brought to Life
          </motion.p>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          {projects.map((project) => (
            <motion.div
              variants={fadeUp}
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="group cursor-pointer flex flex-col w-full rounded-[28px] bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
            >
              
              {/* Card Image */}
              <div className="w-full aspect-[4/3] overflow-hidden relative bg-black/[0.02]">
                <div className="absolute inset-0 bg-[#2A2320]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                {/* Year Pill */}
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

              {/* Card Content */}
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
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectsPage;