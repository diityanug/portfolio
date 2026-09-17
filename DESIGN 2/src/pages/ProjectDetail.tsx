import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Globe, GithubLogo, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useParams, Link } from "react-router-dom";
import { fadeUp, scaleIn, staggerContainer, TRANSITION } from "../utils/animations";
import { DATA } from "../data";
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
    title: "Game Genre Classifier",
    subtitle: "Machine Learning and NLP web app for predicting game genres based on description.",
    overview: "A Full-Stack Machine Learning application designed to intelligently predict multiple genres and tags of a video game (e.g., Action, RPG, Horror, Strategy) based purely on its Title and Description.",
    tags: ["React", "Tailwind CSS", "FastAPI", "Python", "Scikit-Learn", "NLTK"],
    role: "Fullstack Machine Learning Engineer",
    timeline: "2024 ~ 2025",
    color: "bg-card-peach",
    keyFeatures: [
      "Multi-Label NLP AI (predicts 15+ complex genre categories)",
      "Explainable AI (XAI) that highlights specific triggering keywords",
      "Real-Time FastAPI backend with lightning-fast local network access",
      "Fully responsive Glassmorphism-inspired React UI",
      "Local History Log to automatically save recent predictions"
    ],
    challenges: "The core challenge was building a robust Multi-Label Classification architecture that accurately predicts genres without losing context. This was solved by combining TF-IDF, Complement Naive Bayes, and OneVsRestClassifier, paired with an Explainable AI (XAI) logic to give users transparency on why a genre was chosen. All wrapped in a performant React interface communicating asynchronously with FastAPI.",
    githubLink: "https://github.com/diityanug/game-genre-classifier"
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
            <img src="/logo-static.svg" alt="Aditya Nugraha Logo" className="w-8 h-8 group-hover:scale-105 transition-transform duration-500" />
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
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="w-full mb-20 md:mb-32"
          >
            <h3 className="text-2xl font-bold text-ink mb-8 tracking-tight border-b border-black/5 pb-4">Project Workflow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {(DATA[slug || "genre-game-classifier"]?.workflow || []).map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-5 group">
                  <div className="w-full aspect-4/3 bg-black/5 rounded-3xl shadow-sm overflow-hidden relative ring-1 ring-black/5 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-500">
                    <img src={item.image} alt={item.step} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-100/20 to-purple-100/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="px-2">
                    <h4 className="font-bold text-ink text-xl mb-3 group-hover:text-primary transition-colors">{item.step}</h4>
                    <p className="text-steel text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
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
                The architecture relies on a custom Multi-Label Classification pipeline. Using Scikit-Learn's TF-IDF Vectorizer to normalize and extract features from text, the engine intelligently classifies complex descriptions into multiple target genres using Complement Naive Bayes and OneVsRestClassifier.
              </p>
              <p className="mb-12">
                To elevate the user experience, an Explainable AI (XAI) feature was integrated directly into the inference layer. It isolates and highlights the exact keywords that tipped the model's confidence scores, offering users transparent, real-time insights behind the AI's reasoning.
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
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 bg-black/5 text-ink font-bold uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-black/10 transition-all duration-300 hover:shadow-sm text-xs group">
                      <span className="flex items-center gap-2"><GithubLogo size={18} /> Source Code</span>
                      <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          


        </div>
      </main>
    </div>
  );
}
