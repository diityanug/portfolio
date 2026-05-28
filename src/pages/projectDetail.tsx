import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const projects: any = {
    'genre-game-classifier': {
      title: 'Genre Game Classifier',
      category: 'Natural Language Processing',
      year: '2024',
      image: '/images/project-apc.jpg',
      overview:
        'Genre Game Classifier is a machine learning project designed to predict game genres based on game titles and descriptions using Natural Language Processing techniques.',
      description:
        'This project was built using preprocessing methods such as case folding, tokenizing, stopword removal, and TF-IDF vectorization. The processed text data is then classified using the Naive Bayes algorithm to predict the most suitable game genre.',
      workflow: [
        {
          image: '/images/project-apc.jpg',
          text: 'User memasukkan judul dan deskripsi game mentah ke dalam form input yang disediakan pada halaman utama.'
        },
        {
          image: '/images/architecture-1.jpg',
          text: 'Proses data preprocessing berjalan di latar belakang: teks dibersihkan melalui case folding, tokenizing, dan stopword removal.'
        },
        {
          image: '/images/architecture-2.jpg',
          text: 'TF-IDF Vectorizer mengubah teks bersih menjadi bentuk matriks numerik, kemudian model Naive Bayes memprediksi genre terbaik beserta persentase probabilitasnya.'
        }
      ],
      technologies: [
        'Python', 'Scikit-learn', 'TF-IDF', 'Naive Bayes', 'Pandas', 'React', 'TailwindCSS'
      ],
    },
  };

  const project = projects[slug as string];

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUp: Variants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const lineGrow: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
  };

  const revealImage: Variants = {
    hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
    show: { 
      clipPath: "inset(0 0% 0 0)", 
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // --- 404 PAGE ---
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
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

  // Pisahkan judul jika terlalu panjang untuk efek layout asimetris
  const titleWords = project.title.split(" ");
  const firstHalfTitle = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(" ");
  const secondHalfTitle = titleWords.slice(Math.ceil(titleWords.length / 2)).join(" ");

  // --- MAIN DETAIL PAGE ---
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-white px-6 md:px-12 pt-24 md:pt-32 pb-32 overflow-x-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* ================= HERO SECTION (EDITORIAL STYLE) ================= */}
        
        {/* Navigasi & Meta Data */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-12 md:mb-20 gap-8">
          <button
            onClick={() => navigate('/projects')}
            className="group flex items-center gap-3 text-xs font-poppins uppercase tracking-widest text-gray-400 hover:text-[#2A2320] transition-colors duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> 
            Back to Collection
          </button>
          
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="font-poppins text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">
              Category
            </span>
            <span className="font-telegraf text-sm md:text-base tracking-widest uppercase text-[#5E7657]">
              {project.category}
            </span>
          </div>
        </motion.div>

        {/* Massive Title Layout */}
        <div className="flex flex-col mb-16 md:mb-24 w-full">
          <motion.h1 
            variants={fadeUp}
            className="pointer-events-none select-none font-lejour font-normal text-[12vw] md:text-[90px] lg:text-[130px] leading-[0.8] tracking-tight text-[#2A2320]"
          >
            <Typewriter text={firstHalfTitle} />
          </motion.h1>
          
          <div className="flex w-full items-center justify-end mt-4 md:mt-8 gap-6 md:gap-12">
            <motion.div variants={lineGrow} className="w-16 md:w-48 h-[2px] bg-black/10" />
            <motion.h1 
              variants={fadeUp}
              className="pointer-events-none select-none font-lejour font-normal text-[12vw] md:text-[90px] lg:text-[130px] leading-[0.8] tracking-tight text-[#5E7657]"
            >
              <Typewriter text={secondHalfTitle} delay={0.6} />
            </motion.h1>
          </div>
        </div>

        {/* MAIN IMAGE WITH OVERLAPPING STATUS BAR */}
        <div className="relative mb-32 md:mb-40">
          <motion.div variants={revealImage} className="w-full aspect-[4/3] md:aspect-[21/9] bg-gray-50 border border-black/5 shadow-sm overflow-hidden relative z-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
          
          {/* Status Bar mengambang di bawah gambar */}
          <motion.div 
            variants={fadeUp}
            className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-white border border-black/5 shadow-xl px-8 py-4 md:px-12 md:py-6 flex justify-between items-center gap-8 md:gap-24 z-10"
          >
            <div className="flex flex-col">
              <span className="font-poppins text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">Year</span>
              <span className="font-telegraf text-sm md:text-base text-[#2A2320]">{project.year}</span>
            </div>
            <div className="w-[1px] h-8 bg-black/10" />
            <div className="flex flex-col">
              <span className="font-poppins text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">Role</span>
              <span className="font-telegraf text-sm md:text-base text-[#2A2320]">Developer</span>
            </div>
          </motion.div>
        </div>


        {/* ================= CONTENT SECTIONS (MAGAZINE LAYOUT) ================= */}
        
        <div className="flex flex-col gap-24 md:gap-40 w-full max-w-[1200px] mx-auto">
          
          {/* OVERVIEW & DESCRIPTION (Side by Side di Desktop) */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full">
            
            {/* Kiri: Judul Section Besar */}
            <div className="w-full lg:w-1/3 flex flex-col">
              <motion.h2 
                variants={fadeUp} 
                style={{ fontFamily: "'The Seasons Italic', serif" }} 
                className="text-4xl md:text-5xl text-[#2A2320] mb-6"
              >
                The Case
              </motion.h2>
              <motion.div variants={lineGrow} className="w-24 h-[2px] bg-[#5E7657]" />
            </div>

            {/* Kanan: Teks Berkolom */}
            <div className="w-full lg:w-2/3 flex flex-col gap-10">
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Overview</span>
                <p className="font-poppins font-light text-base md:text-lg leading-[1.8] text-[#4A3B32] text-justify">
                  {project.overview}
                </p>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gray-400 font-medium">Description</span>
                <p className="font-poppins font-light text-base md:text-lg leading-[1.8] text-[#4A3B32] text-justify">
                  {project.description}
                </p>
              </motion.div>
            </div>
            
          </div>

          <motion.div variants={lineGrow} className="w-full h-[1px] bg-black/10" />

          {/* WORKFLOW (Asymmetric Overlap Layout) */}
          <div className="flex flex-col w-full">
            <motion.div variants={fadeUp} className="mb-16 md:mb-24 flex items-center justify-between">
              <h2 style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-4xl md:text-5xl text-[#2A2320]">
                Process Workflow
              </h2>
              <span className="font-poppins text-xs tracking-[0.3em] uppercase text-[#5E7657] font-medium hidden md:block">
                0{project.workflow.length} Steps
              </span>
            </motion.div>
            
            <div className="flex flex-col gap-24 md:gap-32">
              {project.workflow.map((step: any, index: number) => {
                // Menentukan apakah gambar di kiri atau kanan (selang-seling)
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div variants={fadeUp} key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-0 relative group`}>
                    
                    {/* Gambar Workflow */}
                    <div className="w-full lg:w-[60%] aspect-[4/3] bg-gray-50 border border-black/5 shadow-sm overflow-hidden relative z-0">
                      <div className="absolute top-0 left-0 w-full h-full bg-[#5E7657]/0 group-hover:bg-[#5E7657]/10 transition-colors duration-500 z-10" />
                      <img 
                        src={step.image} 
                        alt={`Step ${index + 1}`} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>

                    {/* Teks Workflow yang menimpa (overlap) gambar di desktop */}
                    <div className={`w-full lg:w-[50%] bg-white p-8 md:p-12 border border-black/5 shadow-xl relative z-10 
                      ${isEven ? 'lg:-ml-20' : 'lg:-mr-20'} 
                      flex flex-col gap-6 transform lg:group-hover:-translate-y-4 transition-transform duration-500`}
                    >
                      <span className="font-lejour text-5xl md:text-6xl text-[#5E7657]/20 absolute top-4 right-8 select-none pointer-events-none">
                        0{index + 1}
                      </span>
                      <div className="w-12 h-[2px] bg-[#5E7657] mb-2" />
                      <p className="font-poppins font-light text-base md:text-lg leading-[1.8] text-[#4A3B32] text-justify relative z-20">
                        {step.text}
                      </p>
                    </div>
                    
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div variants={lineGrow} className="w-full h-[1px] bg-black/10" />

          {/* TECHNOLOGIES (Clean Tag List) */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full pb-10">
            <div className="w-full lg:w-1/3 flex flex-col">
              <motion.h2 
                variants={fadeUp} 
                style={{ fontFamily: "'The Seasons Italic', serif" }} 
                className="text-4xl md:text-5xl text-[#2A2320]"
              >
                Tech Stack
              </motion.h2>
            </div>
            
            <div className="w-full lg:w-2/3 flex flex-wrap gap-4 items-start">
              {project.technologies.map((tech: string, index: number) => (
                <motion.div
                  variants={fadeUp}
                  key={index}
                  className="font-poppins font-light px-6 py-3 border border-black/10 text-[#2A2320] text-sm tracking-widest uppercase hover:bg-[#2A2320] hover:text-white transition-all duration-300 cursor-default shadow-sm"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </motion.div>
  );
};

export default ProjectDetail;