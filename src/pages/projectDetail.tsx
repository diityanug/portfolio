import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const projects: Record<string, any> = {
    'genre-game-classifier': {
      title: 'Genre Game Classifier',
      category: 'Natural Language Processing',
      year: '2024',
      overview:
        'Genre Game Classifier is a machine learning project designed to predict game genres based on game titles and descriptions using Natural Language Processing techniques.',
      description:
        'This project was built using preprocessing methods such as case folding, tokenizing, stopword removal, and TF-IDF vectorization. The processed text data is then classified using the Naive Bayes algorithm to predict the most suitable game genre.',
      workflow: [
        {
          image: '/images/project-apc.jpg',
          title: 'Input Data',
          text: 'User memasukkan judul dan deskripsi game mentah ke dalam form input yang disediakan pada halaman utama.'
        },
        {
          image: '/images/architecture-1.jpg',
          title: 'Preprocessing',
          text: 'Proses data preprocessing berjalan di latar belakang: teks dibersihkan melalui case folding, tokenizing, dan stopword removal.'
        },
        {
          image: '/images/architecture-2.jpg',
          title: 'Classification',
          text: 'TF-IDF Vectorizer mengubah teks bersih menjadi bentuk matriks numerik, kemudian model Naive Bayes memprediksi genre.'
        }
      ],
      technologies: [
        'Python',
        'Scikit-learn',
        'TF-IDF',
        'Naive Bayes',
        'Pandas',
        'React',
        'Tailwind CSS'
      ],
    },
  };

  const project = projects[slug as string];

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const fadeUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const lineGrow: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // --- 404 PAGE ---
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
      className="relative min-h-[calc(100vh-116px)] bg-white px-6 md:px-16 pt-8 md:pt-12 pb-24 overflow-hidden"
    >
      {/* ========================================== */}
      {/* BACKGROUND TEXTURES */}
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

      <div className="w-full max-w-[1200px] mx-auto relative z-10">

        {/* ========================================== */}
        {/* HEADER & TYPOGRAPHY HERO (Ditarik ke atas) */}
        {/* ========================================== */}
        <motion.div variants={fadeUp} className="mb-12 md:mb-16">
          <button
            onClick={() => navigate('/projects')}
            className="group flex items-center gap-2 text-[10px] md:text-xs font-poppins uppercase tracking-[0.2em] text-gray-400 hover:text-[#5E7657] transition-colors duration-300 mb-6 md:mb-8"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Collection
          </button>

          <h1 className="font-lejour text-5xl md:text-[80px] lg:text-[100px] leading-[0.9] tracking-tight text-[#2A2320] max-w-4xl mb-8">
            <Typewriter text={project.title} />
          </h1>

          <div className="flex flex-wrap gap-8 md:gap-16 pt-5 border-t border-black/[0.07]">
            <div className="flex flex-col gap-1.5">
              <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Category</span>
              <span className="font-telegraf text-sm md:text-base text-[#2A2320]">{project.category}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Year</span>
              <span className="font-telegraf text-sm md:text-base text-[#2A2320]">{project.year}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">Role</span>
              <span className="font-telegraf text-sm md:text-base text-[#2A2320]">Developer</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* EDITORIAL OVERVIEW & TECH STACK */}
        {/* ========================================== */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16 md:mb-24">
          
          {/* Main Description */}
          <motion.div variants={fadeUp} className="w-full lg:w-[55%] flex flex-col gap-6">
            <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-3xl md:text-4xl text-[#5E7657]">
              The Case
            </h2>
            <div className="flex flex-col gap-5">
              <p className="font-poppins font-light text-sm md:text-base leading-[1.8] text-gray-500">
                {project.overview}
              </p>
              <p className="font-poppins font-light text-sm md:text-base leading-[1.8] text-gray-500">
                {project.description}
              </p>
            </div>
          </motion.div>

          {/* Tech Stack Pills (Disamakan dengan Homepage Role Tags) */}
          <motion.div variants={fadeUp} className="w-full lg:w-[45%] flex flex-col gap-5 lg:pt-2">
            <h3 className="font-poppins text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-full border border-black/[0.06] bg-black/[0.01] font-poppins text-xs md:text-sm text-gray-500 font-light hover:border-[#5E7657]/30 hover:text-[#5E7657] transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={lineGrow} className="w-full h-[1px] bg-black/[0.07] mb-16 md:mb-20" />

        {/* ========================================== */}
        {/* SIMPLE & MODERN WORKFLOW GRID */}
        {/* ========================================== */}
        <div className="flex flex-col w-full">
          <motion.div variants={fadeUp} className="mb-10 md:mb-12 flex items-center justify-between">
            <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-3xl md:text-4xl text-[#2A2320]">
              Process Workflow
            </h2>
            <span className="font-poppins text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium hidden md:block">
              0{project.workflow.length} Steps
            </span>
          </motion.div>

          {/* Grid Layout santai 3 Kolom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10">
            {project.workflow.map((step: any, index: number) => (
              <motion.div variants={fadeUp} key={index} className="flex flex-col group cursor-default">
                
                {/* Modern Rounded Image (Pewarnaan Border disamakan dengan homepage) */}
                <div className="w-full aspect-[4/3] rounded-3xl bg-black/[0.02] border border-black/[0.04] overflow-hidden mb-5 relative shadow-[0_10px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-shadow duration-500">
                  <div className="absolute inset-0 bg-[#5E7657]/0 group-hover:bg-[#5E7657]/10 transition-colors duration-500 z-10" />
                  <img
                    src={step.image}
                    alt={step.title || `Step ${index + 1}`}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x450/f8f9fa/adb5bd?text=Workflow';
                    }}
                  />
                  {/* Floating Step Number */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                    <span className="font-telegraf text-xs text-[#2A2320] font-medium">{index + 1}</span>
                  </div>
                </div>

                {/* Clean Text Details */}
                <div className="flex flex-col px-1">
                  <h4 className="font-poppins font-semibold text-base md:text-lg text-[#2A2320] mb-2 group-hover:text-[#5E7657] transition-colors">
                    {step.title}
                  </h4>
                  <p className="font-poppins font-light text-xs md:text-sm text-gray-500 leading-relaxed">
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