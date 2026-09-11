import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useSkipHeavyEffects } from '../hooks/useSkipHeavyEffects';

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
const customEase = [0.16, 1, 0.3, 1] as const;

const getPageVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, ...(skipBlur ? {} : { filter: "blur(8px)" }), transition: { duration: 0.5, ease: customEase } }
});

const getTitleWordVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 20, ...(skipBlur ? {} : { filter: "blur(8px)" }) },
  show: { opacity: 1, y: 0, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 0.8, ease: customEase } }
});

const metaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } }
};

const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } }
};

const getFadeUpVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 15, scale: 0.98, ...(skipBlur ? {} : { filter: "blur(4px)" }) },
  show: { opacity: 1, y: 0, scale: 1, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 0.8, ease: customEase } }
});

const getInstantFadeUpVariants = (skipBlur: boolean): Variants => ({
  hidden: { opacity: 0, y: 10, ...(skipBlur ? {} : { filter: "blur(4px)" }) },
  show: { opacity: 1, y: 0, ...(skipBlur ? {} : { filter: "blur(0px)" }), transition: { duration: 0.6, ease: customEase } }
});

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
        image: '/images/input-desc.webp', 
        title: 'Text Input Interface', 
        text: "Users simply input the game's title and description into a clean, minimalist form. The frontend instantly packages this text to be processed by the backend NLP engine." 
      },
      { 
        image: '/images/output.webp', 
        title: 'Results & Explanation', 
        text: "The UI reveals real-time prediction results using animated probability bars, and highlights specific keywords from the input that heavily influenced the AI's decision." 
      },
      { 
        image: '/images/history.webp', 
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

// UI Icons
const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

// Main Component: Project Detail
const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const skipHeavyEffects = useSkipHeavyEffects();

  const pageVariants = useMemo(() => getPageVariants(skipHeavyEffects), [skipHeavyEffects]);
  const titleWordVariants = useMemo(() => getTitleWordVariants(skipHeavyEffects), [skipHeavyEffects]);
  const fadeUpVariants = useMemo(() => getFadeUpVariants(skipHeavyEffects), [skipHeavyEffects]);
  const instantFadeUpVariants = useMemo(() => getInstantFadeUpVariants(skipHeavyEffects), [skipHeavyEffects]);

  const project = projectsData[slug as string];

  // Handle 404 - Project not found
  if (!project) {
    return (
      <motion.div 
        variants={pageVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="min-h-[100svh] flex flex-col items-center justify-center bg-[#f7f4ed] px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-[-1] bg-[url('https://cdn.tailwindcss.com/bg-grid-black.svg')] bg-center opacity-[0.02]" style={{ backgroundSize: '24px 24px' }}></div>
        <motion.div variants={fadeUpVariants} initial="hidden" animate="show" className="text-center z-10 flex flex-col items-center">
          <h1 className="font-mono text-8xl md:text-[110px] font-semibold text-[#1c1c1c] mb-4 leading-none">404</h1>
          <p className="text-[#5f5f5d] font-mono tracking-widest uppercase text-xs md:text-sm mb-8">ERR_PROJECT_NOT_FOUND</p>
          <button
            onClick={() => navigate('/#projects')}
            className="px-6 py-2.5 bg-[#eceae4] border border-[#eceae4] text-[#1c1c1c] rounded-md font-mono text-xs uppercase tracking-widest hover:bg-black/5 hover:border-[#eceae4] transition-all outline-none flex items-center gap-2"
          >
            <span>←</span> RETURN_TO_DIRECTORY
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
        className="relative z-0 min-h-[100svh] bg-[#f7f4ed] text-[#1c1c1c] pt-28 pb-24 md:pt-36 md:pb-32 overflow-x-hidden"
      >
        {/* Background Mesh */}
        <div className="absolute inset-0 z-[-1] bg-[url('https://cdn.tailwindcss.com/bg-grid-black.svg')] bg-center opacity-[0.02]" style={{ backgroundSize: '24px 24px' }}></div>

        {/* Sticky Sub-nav Bar */}
        <div className="w-full bg-[#f7f4ed]/80 backdrop-blur-xl border-b border-[#eceae4] sticky top-[44px] z-30 transition-all">
          <div className="max-w-7xl w-full mx-auto h-[52px] px-4 md:px-12 flex items-center justify-between">
            <button 
              onClick={() => navigate('/#projects')} 
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#5f5f5d] hover:text-[#1c1c1c] transition-colors outline-none"
            >
              <span className="text-[14px] leading-none group-hover:-translate-x-1 transition-transform">←</span>
              <span>DIR_BACK</span>
            </button>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-white text-neutral-950 hover:bg-[#eceae4] transition-all font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest outline-none"
              >
                <span>INIT_REPO</span>
                <span className="text-[14px] leading-none">↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 pt-12 flex flex-col gap-12 lg:gap-20">
          
          {/* Hero Section */}
          <div className="flex flex-col items-start border-b border-[#eceae4]/60 pb-12">
            <motion.div 
              variants={metaContainerVariants} 
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <motion.span variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-[#eceae4] border border-[#eceae4] rounded-md font-mono text-[10px] font-semibold uppercase tracking-widest text-[#1c1c1c]">
                <TerminalIcon />
                {project.category}
              </motion.span>
              <motion.span variants={fadeUpVariants} className="px-3 py-1 bg-[#eceae4]/50 border border-[#eceae4] rounded-md font-mono text-[10px] font-medium uppercase tracking-widest text-[#5f5f5d]">
                TS_{project.year}
              </motion.span>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
              className="select-none max-w-4xl"
            >
              <h1 className="font-sans text-5xl sm:text-6xl lg:text-[72px] font-semibold leading-[1.05] tracking-tight text-[#1c1c1c] flex flex-wrap gap-x-4">
                {titleWords.map((word: string, wIdx: number) => (
                  <motion.span 
                    key={word + wIdx} 
                    variants={titleWordVariants} 
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* Explanation & Tech Stack */}
          <motion.div 
            variants={listContainerVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start"
          >
            {/* Overview */}
            <motion.div variants={fadeUpVariants} className="flex flex-col">
              <div className="w-full flex flex-col text-left mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#eceae4]"></div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#5f5f5d]">
                    SYS_OVERVIEW
                  </span>
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-[#1c1c1c]">
                  Project Details
                </h2>
              </div>
              <div className="flex flex-col gap-6 font-sans text-[#5f5f5d]">
                <p className="text-lg leading-relaxed font-normal">
                  {project.overview}
                </p>
                <p className="text-lg leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Tech Stack Card */}
            <motion.div variants={fadeUpVariants} className="flex flex-col">
              <div className="bg-[#eceae4]/30 border border-[#eceae4] rounded-2xl p-6 sm:p-8 flex flex-col backdrop-blur-sm">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#5f5f5d] mb-6 flex items-center gap-2">
                  <TerminalIcon /> TECH_STACK_MODULES
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-[#eceae4] border border-[#eceae4] text-[#1c1c1c] font-mono text-[11px] uppercase tracking-wider rounded-md hover:border-[#eceae4] hover:text-[#1c1c1c] transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full h-px bg-black/5/60" />

          {/* Workflow Gallery */}
          <motion.div 
            variants={instantFadeUpVariants} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col w-full"
          >
            <div className="w-full flex flex-col text-left mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#eceae4]"></div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#5f5f5d]">
                  SYS_ARCHITECTURE
                </span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-[#1c1c1c]">
                Process Workflow
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {project.workflow.map((step: WorkflowStep, index: number) => (
                <div 
                  key={step.title + index} 
                  className="bg-[#f7f4ed] border border-[#eceae4] rounded-xl p-4 flex flex-col justify-between group hover:border-[#eceae4] transition-all duration-300"
                >
                  <button 
                    type="button"
                    className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-5 relative bg-[#eceae4] border border-[#eceae4] cursor-zoom-in outline-none group-hover:scale-[1.02] transition-transform duration-500"
                    onClick={() => setSelectedImage(step.image)}
                    aria-label={`Enlarge ${step.title}`}
                  >
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/171717/404040?text=IMG_ERR'; }} 
                    />
                  </button>

                  <div className="flex flex-col flex-1 px-2 pb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-[10px] font-semibold text-[#5f5f5d] uppercase tracking-widest">
                        STEP_0{index + 1}
                      </span>
                    </div>
                    <h4 className="font-sans text-lg font-medium text-[#1c1c1c] mb-2 tracking-tight">
                      {step.title}
                    </h4>
                    <p className="font-sans text-sm text-[#5f5f5d] leading-relaxed">
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl border border-[#eceae4] shadow-2xl"
              />
              <button
                className="absolute -top-12 right-0 md:-top-4 md:-right-4 text-[#5f5f5d] bg-[#eceae4] border border-[#eceae4] hover:bg-black/5 hover:text-[#1c1c1c] rounded-full p-2.5 transition-all outline-none"
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