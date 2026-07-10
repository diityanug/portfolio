import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { popUpVariants } from '@utils/animation';
import StaticDotGrid from '../components/experiencePage/StaticDotGrid';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, filter: "blur(10px)", transition: { duration: 0.5, ease: customEase } }
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: customEase } }
};

const metaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.4, staggerChildren: 0.15 } 
  }
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.6, staggerChildren: 0.15 } 
  }
};

const lineGrowVariants: Variants = {
  hidden: { width: 0 },
  show: { width: "100%", transition: { duration: 1, ease: customEase, delay: 0.8 } }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects: Record<string, any> = {
    'genre-game-classifier': {
      title: 'Genre Game Classifier',
      category: 'Full-Stack Machine Learning',
      year: '2024',
      link: 'https://github.com/diityanug/game-genre-classifier',
      overview: 'Game Genre Classifier is an end-to-end Machine Learning pipeline designed to predict video game genres based on their descriptions. The project covers the entire ML lifecycle: automated data mining, an advanced NLP pipeline, a highly optimized REST API, and an interactive React-based frontend.',
      description: 'The core NLP engine utilizes spaCy for deep text normalization and TF-IDF for feature extraction, which is fed into a GridSearchCV-tuned OneVsRest Complement Naive Bayes classifier. The backend is served via FastAPI, featuring dynamic thresholding and a unique Explainable AI logic to extract reasoning keywords. The frontend offers a sleek, animated UI with real-time probability bars, prediction history, and an interactive genre-guessing mini-game.',
      workflow: [
        { 
          image: '/images/Input Desc.png', 
          title: 'Text Input Interface', 
          text: 'Users simply input the game\'s title and description into a clean, minimalist form. The frontend instantly packages this text to be processed by the backend NLP engine.' 
        },
        { 
          image: '/images/Output.png', 
          title: 'Results & Explainability', 
          text: 'The UI reveals real-time prediction results using animated probability bars, and highlights specific keywords from the input that heavily influenced the AI\'s decision.' 
        },
        { 
          image: '/images/history.png', 
          title: 'Prediction History', 
          text: 'All past predictions are automatically saved in the session history. Users can quickly access and review their previous inputs and results whenever needed.' 
        }
      ],
      technologies: [
        'Python', 'spaCy', 'Scikit-Learn', 'Pandas', 
        'FastAPI', 'Pydantic', 'REST API',          
        'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'
      ],
    },
  };

  const project = projects[slug as string];

  if (!project) {
    return (
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="min-h-screen flex flex-col items-center justify-center bg-[#F9F8F4] px-8 relative overflow-hidden"
      >
        <motion.div variants={popUpVariants} className="text-center z-10">
          <h1 className="font-seasons text-8xl md:text-[120px] text-[#1A2F24] mb-2 leading-none">404</h1>
          <p className="font-redhat text-[#4A6750] tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-10">Project not found</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-8 py-4 border border-[#2E4C38]/20 text-[#1A2F24] rounded-full font-redhat text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#1A2F24] hover:text-[#F9F8F4] transition-colors duration-500"
          >
            Back to Projects
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const titleWords = project.title.split(' ');

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative z-0 min-h-screen bg-[#F9F8F4] px-6 md:px-12 lg:px-24 xl:px-32 pt-32 lg:pt-40 pb-24 overflow-x-hidden"
      >
        <StaticDotGrid />
        <div className="w-full max-w-screen-2xl mx-auto relative z-10">
          
          {/* Header Navigation */}
          <motion.div 
            variants={metaContainerVariants} 
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 relative z-20"
          >
            <motion.button variants={popUpVariants} onClick={() => navigate('/projects')} className="group flex items-center gap-3 text-[10px] md:text-xs font-redhat uppercase font-bold tracking-[0.2em] text-[#1A2F24]/50 hover:text-[#4A6750] transition-colors duration-300">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Projects
            </motion.button>
            {project.link && (
              <motion.a variants={popUpVariants} href={project.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[10px] md:text-xs font-redhat uppercase font-bold tracking-[0.2em] text-[#1A2F24]/50 hover:text-[#4A6750] transition-colors duration-300">
                Visit Repository 
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
              </motion.a>
            )}
          </motion.div>

          {/* Hero Section */}
          <div className="mb-16 md:mb-20 flex flex-col">
            <motion.div 
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
              className="flex flex-wrap gap-x-3 md:gap-x-5 gap-y-2 mb-8"
            >
              <h1 className="font-seasons text-5xl sm:text-6xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight flex flex-wrap gap-x-3 md:gap-x-5">
                {titleWords.map((word: string, wIdx: number) => (
                  <motion.div 
                    key={wIdx} 
                    variants={titleWordVariants} 
                    className={`inline-block ${wIdx === titleWords.length - 1 ? 'text-[#4A6750]' : 'text-[#1A2F24]'}`}
                  >
                    {word}
                  </motion.div>
                ))}
              </h1>
            </motion.div>

            {/* Metadata */}
            <motion.div 
              variants={metaContainerVariants} 
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center gap-3"
            >
              <motion.span variants={popUpVariants} className="font-redhat text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#4A6750] font-bold">
                {project.category}
              </motion.span>
              <motion.span variants={popUpVariants} className="w-1 h-1 rounded-full bg-[#2E4C38]/20" />
              <motion.span variants={popUpVariants} className="font-aileron text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#1A2F24]/50">
                {project.year}
              </motion.span>
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div 
            variants={listContainerVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-32 mb-20 md:mb-28"
          >
            {/* Left Section */}
            <motion.div variants={popUpVariants} className="w-full lg:w-[70%] flex flex-col gap-6">
              <h2 className="font-seasons text-3xl md:text-4xl text-[#1A2F24]">
                The Case
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-aileron text-base md:text-lg leading-relaxed text-[#2E4C38]/80 text-justify">
                  {project.overview}
                </p>
                <p className="font-aileron text-base md:text-lg leading-relaxed text-[#2E4C38]/80 text-justify">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div variants={popUpVariants} className="w-full lg:w-[30%] flex flex-col gap-6 lg:pt-1">
              <h3 className="font-redhat text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#1A2F24]/50 font-bold border-b border-[#2E4C38]/10 pb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span 
                    key={tech} 
                    className="bg-[#4A6750]/5 border border-[#4A6750]/10 text-[#4A6750] font-redhat font-bold text-[9px] md:text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={lineGrowVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full h-[1px] bg-[#2E4C38]/10 mb-16 md:mb-20" 
          />

          {/* Features */}
          <motion.div 
            variants={listContainerVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col w-full"
          >
            <motion.div variants={popUpVariants} className="mb-10">
              <h2 className="font-seasons text-3xl md:text-4xl text-[#1A2F24]">
                Features
              </h2>
            </motion.div>
            
            <motion.div variants={listContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {project.workflow.map((step: any, index: number) => (
                <motion.div variants={popUpVariants} key={index} className="flex flex-col group">
                  
                  {/* Thumbnail Workflow */}
                  <div 
                    className="w-full aspect-[4/3] rounded-[1.25rem] bg-[#EAF1EC]/30 border border-[#2E4C38]/10 overflow-hidden mb-5 relative cursor-zoom-in shadow-sm hover:shadow-md transition-shadow duration-300"
                    onClick={() => setSelectedImage(step.image)}
                  >
                    <div className="absolute inset-0 bg-[#1A2F24]/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.22,1,0.36,1]" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/f8f9fa/adb5bd?text=Feature+Preview'; }} 
                    />
                    <div className="absolute top-3 left-3 z-20 bg-[#F9F8F4]/90 backdrop-blur-sm w-7 h-7 rounded-full flex items-center justify-center border border-[#2E4C38]/10 pointer-events-none">
                      <span className="font-aileron text-[10px] md:text-xs text-[#1A2F24] font-bold">0{index + 1}</span>
                    </div>
                  </div>

                  {/* Text Workflow */}
                  <div className="flex flex-col cursor-default">
                    <h4 className="font-seasons font-bold text-xl md:text-2xl text-[#1A2F24] mb-2 group-hover:text-[#4A6750] transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="font-aileron text-sm md:text-base text-[#2E4C38]/70 leading-relaxed text-justify">
                      {step.text}
                    </p>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A2F24]/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                className="absolute -top-5 -right-5 md:-top-6 md:-right-6 text-[#1A2F24] bg-[#F9F8F4] hover:bg-white hover:scale-105 rounded-full p-2.5 md:p-3 shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(null)}
                aria-label="Close popup"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;