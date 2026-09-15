import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Globe, GithubLogo, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useParams, Link } from "react-router-dom";
import { fadeUp, scaleIn, staggerContainer, TRANSITION } from "../utils/animations";

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: TRANSITION }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Mock data based on slug.
  const project = {
    title: slug === "ml-pipeline-engine" ? "ML Pipeline Engine" : "Premium Digital Experience",
    subtitle: "Orchestrating high-performance machine learning workflows",
    overview: "An end-to-end Machine Learning web application that predicts video game genres from their descriptions. Built using modern NLP techniques, served via FastAPI, and consumed by an interactive React interface.",
    tags: ["React", "TypeScript", "FastAPI", "Python", "NLP", "PyTorch"],
    role: "Fullstack Architect",
    timeline: "2024 - 3 Months",
    color: "bg-card-peach",
    keyFeatures: [
      "High-concurrency inference pipeline with <200ms latency",
      "Interactive React dashboard for real-time predictions",
      "Model fine-tuning on 50k+ datasets using PyTorch",
      "Robust CI/CD deployment on AWS infrastructure"
    ],
    challenges: "The main challenge was handling the massive influx of real-time requests without degrading the inference latency. By orchestrating a robust FastAPI backend and implementing smart caching, we successfully scaled the application to handle 10k+ concurrent users."
  };

  return (
    <div className="min-h-dvh bg-[#FAFAFA] selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans pb-24">
      {/* Simple Nav */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={TRANSITION}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-black/5"
      >
        <div className="max-w-350 mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center text-white text-xs font-serif italic shadow-inner group-hover:scale-105 transition-transform duration-500">D</div>
            <span className="font-bold tracking-[-0.02em] text-base text-ink uppercase hidden sm:block">Aditya Nugraha</span>
          </Link>
        </div>
      </motion.nav>

      <main className="pt-24 md:pt-32 px-4 md:px-8 overflow-hidden">
        <div className="max-w-350 mx-auto w-full">
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12 md:mb-20 max-w-6xl mx-auto w-full">
            <motion.div variants={fadeUp}>
              <Link to="/" className="inline-flex items-center gap-2 text-steel hover:text-ink transition-colors font-semibold text-sm mb-12 md:mb-16 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
              </Link>
              <h1 className="text-5xl sm:text-7xl md:text-[100px] font-bold text-ink leading-[0.95] tracking-[-0.04em] mb-6">
                {project.title}.
              </h1>
              <p className="text-xl md:text-[28px] text-steel font-medium tracking-tight mb-10 max-w-200">
                {project.subtitle}
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-16 border-y border-black/5 py-10 mt-12">
              <div className="flex-1 min-w-37.5">
                <span className="block text-[11px] uppercase tracking-widest text-steel font-bold mb-3">Role</span>
                <span className="text-ink font-semibold text-[15px] md:text-base">{project.role}</span>
              </div>
              <div className="flex-1 min-w-37.5">
                <span className="block text-[11px] uppercase tracking-widest text-steel font-bold mb-3">Timeline</span>
                <span className="text-ink font-semibold text-[15px] md:text-base">{project.timeline}</span>
              </div>
              <div className="flex-2 min-w-62.5">
                <span className="block text-[11px] uppercase tracking-widest text-steel font-bold mb-3">Tech Stack</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag, i) => (
                    <motion.span 
                      key={tag} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                      className="text-[11px] md:text-xs font-bold text-ink bg-black/5 px-3 py-1.5 rounded-md"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={scaleIn} 
            transition={{ delay: 0.2 }} 
            className="w-full aspect-4/3 sm:aspect-video md:aspect-21/9 bg-black/5 rounded-4xl md:rounded-[3rem] shadow-2xl overflow-hidden relative mb-20 md:mb-32 ring-1 ring-black/5 group"
          >
             <motion.div style={{ y }} className="absolute inset-0 bg-linear-to-br from-indigo-100 to-purple-100 mix-blend-multiply scale-110"></motion.div>
             <div className="absolute inset-0 bg-linear-to-tr from-card-peach/60 to-transparent mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div className="w-full h-full flex flex-col items-center justify-center text-ink/40 font-bold text-2xl md:text-5xl text-center px-4 z-10 relative">
               <span className="blur-[1px]">Visual Mockup</span>
               <span className="text-sm tracking-widest uppercase mt-4 opacity-50 blur-none">Hero Asset</span>
             </div>
          </motion.div>

          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10px" }} 
              variants={fadeUp} 
              className="md:col-span-8 text-base md:text-lg text-steel leading-[1.8]"
            >
              <h2 className="text-2xl md:text-[32px] font-bold text-ink mb-6 tracking-tight">Project Overview</h2>
              <p className="mb-8 font-medium text-ink text-lg md:text-[22px] leading-[1.6]">
                {project.overview}
              </p>
              <p className="mb-8">
                The architecture was designed to handle high concurrency while ensuring that the inference latency remains under 200ms. By orchestrating a robust FastAPI backend with a sleek React frontend, we created a seamless end-to-end user experience.
              </p>
              <p className="mb-12">
                Deep learning models were trained on over 50,000 video game descriptions, applying state-of-the-art NLP transformers to extract contextual embeddings.
              </p>

              <h2 className="text-2xl md:text-[32px] font-bold text-ink mb-6 tracking-tight mt-16">The Challenge</h2>
              <p className="mb-12">
                {project.challenges}
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10px" }} 
              variants={slideInRight} 
              className="md:col-span-4"
            >
              <div className="bg-white p-8 rounded-4xl shadow-xl shadow-black/5 ring-1 ring-black/5 sticky top-32">
                <h3 className="text-lg font-bold text-ink mb-6">Key Highlights</h3>
                <ul className="space-y-4 mb-8">
                  {project.keyFeatures.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 text-steel text-sm"
                    >
                      <CheckCircle weight="fill" className="text-primary mt-1 shrink-0" size={18} />
                      <span className="leading-snug">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="flex flex-col gap-3 pt-6 border-t border-black/5">
                  <a href="#" className="flex items-center justify-between gap-2 bg-ink text-white font-bold uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-xs group">
                    <span className="flex items-center gap-2"><Globe size={18} /> Visit Site</span>
                    <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                  <a href="#" className="flex items-center justify-between gap-2 bg-black/5 text-ink font-bold uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-black/10 transition-all duration-300 hover:shadow-sm text-xs group">
                    <span className="flex items-center gap-2"><GithubLogo size={18} /> Source Code</span>
                    <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Next Project Teaser */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            variants={fadeUp}
            className="mt-32 pt-20 border-t border-black/5 flex flex-col items-center text-center"
          >
            <span className="text-[11px] uppercase tracking-widest text-steel font-bold mb-4">Up Next</span>
            <Link to="/project/another-slug" className="group">
              <h2 className="text-[32px] md:text-[56px] font-bold text-ink tracking-tight group-hover:text-primary transition-colors duration-500">
                Data Visualization Hub
              </h2>
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
