import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- REAL REPOSITORY DATA ---
  const projects: Record<string, any> = {
    'genre-game-classifier': {
      title: 'Game Genre Classifier',
      category: 'Natural Language Processing',
      year: '2024',
      link: 'https://github.com/diityanug/game-genre-classifier',
      overview:
        'Game Genre Classifier is an end-to-end Machine Learning pipeline built to analyze textual game descriptions and automatically categorize them into their respective video game genres using Natural Language Processing.',
      description:
        'The core engine utilizes NLTK for intensive text normalization including regex-based filtering, tokenization, and stop-word elimination. Features are engineered using a TF-IDF (Term Frequency-Inverse Document Frequency) vectorizer, which feeds token arrays into optimized classification algorithms such as Multinomial Naive Bayes and Logistic Regression for highly accurate multi-class predictions.',
      workflow: [
        {
          image: '/images/project-apc.jpg', // Sesuaikan path gambar lokal Anda
          title: 'Text Cleaning & NLTK Tokenization',
          text: 'Raw description strings undergo case folding, punctuation removal via regular expressions, and tokenization. Stop-words are stripped down to retain only semantically valuable terms.'
        },
        {
          image: '/images/architecture-1.jpg',
          title: 'TF-IDF Feature Extraction',
          text: 'The clean corpus is transformed into high-dimensional numerical vectors using TF-IDF Vectorization, capturing the contextual importance of specific keywords across game titles.'
        },
        {
          image: '/images/architecture-2.jpg',
          title: 'Supervised Model Inference',
          text: 'Vectorized matrices are trained against labeled datasets using Multinomial Naive Bayes / Logistic Regression to output a probability distribution across target game genres.'
        }
      ],
      technologies: [
        'Python',
        'Scikit-learn',
        'NLTK',
        'TF-IDF Vectorizer',
        'Multinomial Naive Bayes',
        'Logistic Regression',
        'Pandas',
        'NumPy'
      ],
    },
  };

  const project = projects[slug as string];

  // --- ANIMATION VARIANTS (FIXED & LINKED) ---
  const customEase = [0.16, 1, 0.3, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3, ease: 'easeOut' } 
    }
  };

  const fadeUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: customEase }
    }
  };

  const lineGrow: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.2, ease: customEase }
    }
  };

  // --- 404 PAGE ---
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
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

  // --- MAIN DETAIL PAGE ---
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative min-h-[calc(100vh-116px)] bg-white px-6 md:px-16 pt-8 md:pt-12 pb-24 overflow-x-hidden"
    >
      {/* BACKGROUND TEXTURES (Menggunakan absolute agar aman bagi layout Navbar global) */}
      <div
        className="absolute inset-0 pointer-events-none -z-30 w-full h-full"
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
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay w-full h-full"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto relative z-10">

        {/* TOP NAVIGATION BAR */}
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-12 md:mb-16 relative z-20">
          <button
            onClick={() => navigate('/projects')}
            className="group flex items-center gap-2 text-[10px] md:text-xs font-poppins uppercase tracking-[0.2em] text-gray-400 hover:text-[#5E7657] transition-colors duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Projects
          </button>

          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 bg-black/[0.02] hover:bg-black/[0.04] transition-colors duration-300 text-[10px] md:text-xs font-poppins uppercase tracking-[0.15em] text-[#2A2320] font-medium"
            >
              Visit Repository <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#5E7657]">↗</span>
            </a>
          )}
        </motion.div>

        {/* HEADER & TYPOGRAPHY HERO */}
        <motion.div variants={fadeUp} className="mb-16 md:mb-24">
          <h1 className="font-lejour text-5xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight text-[#2A2320] max-w-4xl mb-12 relative z-10">
            {project.title}
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
            <div className="flex flex-col gap-2">
              <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Role</span>
              <span className="font-telegraf text-sm md:text-base text-[#2A2320]">Machine Learning</span>
            </div>
          </div>
        </motion.div>

        {/* EDITORIAL OVERVIEW & TECH STACK */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20 md:mb-32">
          
          {/* Main Description */}
          <motion.div variants={fadeUp} className="w-full lg:w-[60%] flex flex-col gap-6">
            <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-3xl md:text-4xl text-[#5E7657]">
              The Case
            </h2>
            <div className="flex flex-col gap-5">
              <p className="font-poppins font-light text-sm md:text-base leading-[1.8] text-gray-600">
                {project.overview}
              </p>
              <p className="font-poppins font-light text-sm md:text-base leading-[1.8] text-gray-600">
                {project.description}
              </p>
            </div>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div variants={fadeUp} className="w-full lg:w-[40%] flex flex-col gap-6 lg:pt-2">
            <h3 className="font-poppins text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech: string) => (
                <motion.span
                  variants={fadeUp}
                  key={tech}
                  className="px-4 py-2 rounded-full border border-black/[0.06] bg-black/[0.01] font-poppins text-[11px] md:text-xs text-gray-500 font-medium hover:border-[#5E7657]/40 hover:text-[#5E7657] hover:bg-[#5E7657]/5 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={lineGrow} className="w-full h-[1px] bg-black/[0.07] mb-16 md:mb-20" />

        {/* SIMPLE & MODERN WORKFLOW GRID */}
        <div className="flex flex-col w-full">
          <motion.div variants={fadeUp} className="mb-12 flex items-end justify-between">
            <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-3xl md:text-4xl text-[#2A2320]">
              Pipeline Architecture
            </h2>
            <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium hidden md:block pb-1">
              0{project.workflow.length} Processing Steps
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {project.workflow.map((step: any, index: number) => (
              <motion.div variants={fadeUp} key={index} className="flex flex-col group cursor-default">
                
                <div className="w-full aspect-[4/3] rounded-3xl bg-black/[0.02] border border-black/[0.04] overflow-hidden mb-6 relative shadow-[0_10px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500">
                  <div className="absolute inset-0 bg-transparent group-hover:bg-[#5E7657]/5 transition-colors duration-500 z-10" />
                  <img
                    src={step.image}
                    alt={step.title || `Step ${index + 1}`}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x450/f8f9fa/adb5bd?text=Pipeline+Stage';
                    }}
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                    <span className="font-telegraf text-xs text-[#2A2320] font-medium">{index + 1}</span>
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <h4 className="font-poppins font-semibold text-lg text-[#2A2320] mb-2 group-hover:text-[#5E7657] transition-colors">
                    {step.title}
                  </h4>
                  <p className="font-poppins font-light text-sm text-gray-500 leading-relaxed">
                    {step.text}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;