import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import StaticDotGrid from '../components/ui/DotGrid';

// Types & Interfaces
interface WorkflowStep {
  image: string;
  title: string;
  text: string;
}

interface ProjectData {
  title: string;
  category: string;
  year: string;
  link?: string;
  overview: string;
  description: string;
  workflow: WorkflowStep[];
  technologies: string[];
}

// Animation configurations
const customEase = [0.22, 1, 0.36, 1] as const;

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
  show: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } }
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.15 } }
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.98, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: customEase } }
};

const instantFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: customEase } }
};

// Local Data
const projectsData: Record<string, ProjectData> = {
  'genre-game-classifier': {
    title: 'Genre Game Classifier',
    category: 'Machine Learning',
    year: '2024',
    link: 'https://github.com/diityanug/game-genre-classifier',
    overview: 'Game Genre Classifier is an end-to-end Machine Learning pipeline designed to predict video game genres based on their descriptions. The project covers the entire ML lifecycle: automated data mining, an advanced NLP pipeline, a highly optimized REST API, and an interactive React-based frontend.',
    description: 'The core NLP engine utilizes spaCy for deep text normalization and TF-IDF for feature extraction, which is fed into a GridSearchCV-tuned OneVsRest Complement Naive Bayes classifier. The backend is served via FastAPI, featuring dynamic thresholding and a unique Explainable AI logic to extract reasoning keywords. The frontend offers a sleek, animated UI with real-time probability bars, prediction history, and an interactive genre-guessing mini-game.',
    workflow: [
      { 
        image: '/images/Input Desc.png', 
        title: 'Text Input Interface', 
        text: "Users simply input the game's title and description into a clean, minimalist form. The frontend instantly packages this text to be processed by the backend NLP engine." 
      },
      { 
        image: '/images/Output.png', 
        title: 'Results & Explanation', 
        text: "The UI reveals real-time prediction results using animated probability bars, and highlights specific keywords from the input that heavily influenced the AI's decision." 
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

// Main Component: Project Detail
const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = projectsData[slug as string];

  // Handle 404 - Project not found
  if (!project) {
    return (
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="min-h-screen flex flex-col items-center justify-center bg-[#F9F8F4] px-8 relative overflow-hidden"
      >
        <motion.div variants={fadeUpVariants} initial="hidden" animate="show" className="text-center z-10">
          <h1 className="font-seasons text-8xl md:text-[120px] text-[#1A2F24] mb-2 leading-none">404</h1>
          <p className="font-redhat text-[#4A6750] tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-10">Project not found</p>
          <button
            onClick={() => navigate('/#projects')} 
            className="px-6 py-3 border border-[#1A2F24]/10 bg-white shadow-sm text-[#1A2F24] rounded-full font-redhat text-[10px] tracking-[0.2em] uppercase font-bold hover:border-[#4A6750]/30 transition-all duration-300 outline-none"
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
        className="relative z-0 min-h-screen bg-[#F9F8F4] px-6 md:px-12 lg:px-20 pt-12 pb-28 md:pt-20 md:pb-20 overflow-x-hidden"
      >
        <StaticDotGrid />
        
        <div className="w-full max-w-5xl mx-auto relative z-10">
          
          {/* Navigation */}
          <motion.div 
            variants={instantFadeUpVariants} 
            initial="hidden"
            animate="show"
            className="flex flex-row items-center justify-between gap-4 mb-10 md:mb-12 relative z-20"
          >
            <button 
              onClick={() => navigate('/#projects')} 
              className="group flex items-center gap-1.5 text-[10px] font-redhat font-bold tracking-widest uppercase text-[#1A2F24]/50 hover:text-[#4A6750] transition-colors outline-none"
            >
              <span className="text-[12px] leading-none mb-[1px] group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-1.5 text-[10px] font-redhat font-bold tracking-widest uppercase text-[#1A2F24]/50 hover:text-[#4A6750] transition-colors outline-none"
              >
                Visit Repo <span className="text-[12px] leading-none mb-[1px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            )}
          </motion.div>

          {/* Hero Section */}
          <div className="mb-12 md:mb-16 flex flex-col items-start">
            <motion.div 
              variants={metaContainerVariants} 
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 mb-6"
            >
              <motion.span variants={fadeUpVariants} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4A6750]/5 rounded-full border border-[#2E4C38]/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#4A6750]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A6750] animate-pulse"></span>
                {project.category}
              </motion.span>
              <motion.span variants={fadeUpVariants} className="px-3 py-1.5 bg-white rounded-full border border-[#1A2F24]/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#1A2F24]/40">
                {project.year}
              </motion.span>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
              className="flex flex-wrap gap-x-2 md:gap-x-4 gap-y-1 select-none"
            >
              <h1 className="font-seasons text-[44px] min-[375px]:text-[50px] sm:text-6xl md:text-[80px] lg:text-[90px] leading-[0.95] tracking-tight flex flex-wrap gap-x-2 md:gap-x-3">
                {titleWords.map((word: string, wIdx: number) => (
                  <motion.div 
                    key={word + wIdx} 
                    variants={titleWordVariants} 
                    className={`inline-block ${wIdx === titleWords.length - 1 ? 'text-[#4A6750] italic pr-2' : 'text-[#1A2F24]'}`}
                  >
                    {word}
                  </motion.div>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* Explanation & Tech Stack */}
          <motion.div 
            variants={listContainerVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-12 mb-16 md:mb-20"
          >
            {/* Overview */}
            <motion.div variants={fadeUpVariants} className="flex flex-col">
              <h2 className="font-['Garbata'] text-[32px] md:text-[40px] tracking-tight text-[#1A2F24] leading-none mb-5">
                Explanation
              </h2>
              <div className="flex flex-col gap-4">
                <p className="font-aileron text-[14px] md:text-[15px] text-[#2E4C38]/80 leading-[1.65] md:leading-relaxed text-justify">
                  {project.overview}
                </p>
                <p className="font-aileron text-[14px] md:text-[15px] text-[#2E4C38]/80 leading-[1.65] md:leading-relaxed text-justify">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={fadeUpVariants} className="flex flex-col">
              <div className="bg-white/60 backdrop-blur-sm border border-[#1A2F24]/10 rounded-[1.25rem] p-6 shadow-sm flex flex-col h-full">
                <span className="font-redhat text-[10px] tracking-[0.25em] uppercase text-[#4A6750] font-bold mb-5 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#2E4C38]/20"></span>
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1.5 bg-white border border-[#1A2F24]/10 text-[#1A2F24]/80 text-[10.5px] md:text-xs font-redhat font-bold tracking-wide rounded-lg shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="w-full h-px bg-[#1A2F24]/10 mb-12 md:mb-16" />

          {/* Workflow Gallery */}
          <motion.div 
            variants={instantFadeUpVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col w-full"
          >
            <div className="mb-6 md:mb-8 text-left">
              <h2 className="font-['Garbata'] text-[32px] md:text-[40px] tracking-tight text-[#1A2F24] leading-none">
                Workflow
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {project.workflow.map((step: WorkflowStep, index: number) => (
                <div key={step.title + index} className="bg-white border border-[#1A2F24]/10 rounded-[1.25rem] p-5 shadow-sm transition-colors duration-300 hover:border-[#4A6750]/30 flex flex-col group">
                  
                  <button 
                    type="button"
                    className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-[#F9F8F4] border border-[#1A2F24]/5 cursor-zoom-in outline-none"
                    onClick={() => setSelectedImage(step.image)}
                    aria-label={`Enlarge ${step.title}`}
                  >
                    <div className="absolute inset-0 bg-[#1A2F24]/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-700" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/f8f9fa/adb5bd?text=Preview'; }} 
                    />
                  </button>

                  <div className="flex flex-col flex-1 pr-1">
                    <h4 className="font-aileron text-[14px] md:text-[15px] font-bold text-[#1A2F24] mb-3 border-b border-[#1A2F24]/5 pb-3 flex items-center gap-2.5">
                      <span className="text-[#4A6750] bg-[#4A6750]/10 p-1.5 rounded-lg shrink-0 font-redhat text-[10px] leading-none">
                        0{index + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="font-aileron text-[13px] text-[#2E4C38]/80 leading-[1.5] text-justify">
                      {step.text}
                    </p>
                  </div>

                </div>
              ))}
            </div>
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
                className="max-w-full max-h-[90vh] object-contain rounded-[1.25rem] shadow-2xl"
              />
              <button
                className="absolute -top-12 right-0 md:-top-6 md:-right-6 text-[#1A2F24] bg-white hover:scale-105 rounded-full p-2.5 md:p-3 shadow-xl transition-all duration-300 outline-none border border-[#1A2F24]/10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close popup"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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