import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  fadeUpVariants, 
  lineGrowVariants 
} from '@utils/animation';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
      delayChildren: 0.6,
    },
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // REPOSITORY DATA
  const projects: Record<string, any> = {
    'genre-game-classifier': {
      title: 'Game Genre Classifier',
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

  // 404 PAGE
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="font-lejour text-8xl md:text-[120px] text-[#2A2320] mb-2">404</h1>
          <p className="font-poppins text-gray-500 tracking-widest uppercase text-sm mb-10">Project not found.</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-8 py-4 bg-[#2A2320] text-white rounded-full font-poppins text-xs tracking-[0.2em] uppercase hover:bg-[#5E7657] transition-colors duration-300"
          >
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  // MAIN PAGE
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
        className="relative z-0 min-h-[calc(100vh-116px)] bg-transparent px-6 md:px-16 pt-8 md:pt-12 pb-24 overflow-x-hidden"
      >
        <div className="w-full max-w-[1200px] mx-auto relative z-10">
          
          {/* NAV */}
          <motion.div variants={fadeUpVariants} className="flex items-center justify-between mb-12 md:mb-16 relative z-20">
            <button onClick={() => navigate('/projects')} className="group flex items-center gap-2 text-[10px] md:text-xs font-poppins uppercase tracking-[0.2em] text-gray-400 hover:text-[#5E7657] transition-colors duration-300">
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Projects
            </button>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 bg-black/[0.02] hover:bg-black/[0.04] transition-colors duration-300 text-[10px] md:text-xs font-poppins uppercase tracking-[0.15em] text-[#2A2320] font-medium">
                Visit Repository <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#5E7657]">↗</span>
              </a>
            )}
          </motion.div>

          {/* HERO */}
          <motion.div variants={fadeUpVariants} className="mb-16 md:mb-24">
            <h1 className="font-lejour text-5xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight text-[#2A2320] max-w-4xl mb-12 relative z-10">
              {project.title.split(' ').map((word: string, index: number) => (
                <span key={index} className={word === 'Classifier' ? 'text-[#5E7657]' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <div className="flex flex-wrap gap-10 md:gap-20 pt-8 border-t border-black/[0.07]">
              <div className="flex flex-col gap-2">
                <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Category</span>
                <span className="font-telegraf text-sm md:text-base text-[#2A2320]">{project.category}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Year</span>
                <span className="font-telegraf text-sm md:text-base text-[#2A2320]">{project.year}</span>
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20 md:mb-32">
            <motion.div variants={fadeUpVariants} className="w-full lg:w-[60%] flex flex-col gap-6">
              <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-3xl md:text-4xl text-[#5E7657]">The Case</h2>
              <p className="font-poppins font-light text-sm md:text-base leading-[1.8] text-gray-600">{project.overview}</p>
              <p className="font-poppins font-light text-sm md:text-base leading-[1.8] text-gray-600">{project.description}</p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="w-full lg:w-[40%] flex flex-col gap-6 lg:pt-2">
              <h3 className="font-poppins text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">Tech Stack</h3>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-black/[0.06] bg-black/[0.01] font-poppins text-[11px] md:text-xs text-gray-500 font-medium hover:border-[#5E7657]/40 hover:text-[#5E7657] hover:bg-[#5E7657]/5 transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={lineGrowVariants} className="w-full h-[1px] bg-black/[0.07] mb-16 md:mb-20" />

          {/* INTERACTIVE FEATURES */}
          <div className="flex flex-col w-full">
            <motion.div variants={fadeUpVariants} className="mb-12 flex items-end justify-between">
              <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-3xl md:text-4xl text-[#2A2320]">Interactive Features</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
              {project.workflow.map((step: any, index: number) => (
                <motion.div variants={fadeUpVariants} key={index} className="flex flex-col group">
                  <div 
                    className="w-full aspect-[4/3] rounded-3xl bg-black/[0.02] border border-black/[0.04] overflow-hidden mb-6 relative shadow-[0_10px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-zoom-in"
                    onClick={() => setSelectedImage(step.image)}
                  >
                    <div className="absolute inset-0 bg-transparent group-hover:bg-[#5E7657]/5 transition-colors duration-500 z-10" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/f8f9fa/adb5bd?text=Feature+Preview'; }} 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm pointer-events-none">
                      <span className="font-telegraf text-xs text-[#2A2320] font-medium">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex flex-col px-1 cursor-default">
                    <h4 className="font-poppins font-semibold text-lg text-[#2A2320] mb-2 group-hover:text-[#5E7657] transition-colors">{step.title}</h4>
                    <p className="font-poppins font-light text-sm text-gray-500 leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* OVERLAY POPUP PICTURE */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />
              
              <button
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-[#2A2320] bg-white hover:bg-gray-100 hover:scale-105 rounded-full p-2 md:p-3 shadow-lg transition-all"
                onClick={() => setSelectedImage(null)}
                aria-label="Close popup"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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