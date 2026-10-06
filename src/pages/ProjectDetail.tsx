import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { GithubLogo, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { fadeUp, staggerContainer, TRANSITION } from "../utils/animations";
import { DATA } from "../data";
import LogoHeader from "../components/sections/LogoHeader";

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: TRANSITION }
};

function TimelineItem({ item, idx }: { item: any; idx: number }) {
  const isEven = idx % 2 === 0;
  const numString = (idx + 1).toString().padStart(2, '0');
  
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useInView(ref, { margin: "10000px 0px -50% 0px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-32 w-full group"
    >
      {/* Content Block */}
      <div className={`w-full md:w-[45%] pl-20 md:pl-0 relative ${isEven ? "md:text-right md:pr-16" : "md:order-2 md:text-left md:pl-16"}`}>
        <div className={`absolute top-1/2 -translate-y-1/2 text-[120px] font-bold select-none pointer-events-none -z-10 transition-colors duration-700 ${isActive ? 'text-primary/5' : 'text-black/3'} ${isEven ? "md:right-16 md:text-right" : "md:left-16"}`}>
          {numString}
        </div>
        
        <h4 className={`font-bold text-2xl md:text-3xl mb-4 transition-colors duration-500 ${isActive ? 'text-primary' : 'text-ink'}`}>{item.step}</h4>
        <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${isActive ? 'text-ink' : 'text-steel'}`}>
          {item.desc}
        </p>
      </div>

      {/* Center Dot */}
      <div className={`absolute left-7 md:left-1/2 top-6 md:top-1/2 w-4 h-4 bg-white border-[3px] rounded-full -translate-x-1/2 md:-translate-y-1/2 z-10 transition-all duration-500 shadow-[0_0_0_6px_#FAFAFA] ${isActive ? 'border-primary scale-150' : 'border-black/20 scale-100'}`}></div>

      {/* Image Block */}
      <div className={`w-full md:w-[45%] pl-20 md:pl-0 mt-8 md:mt-0 ${isEven ? "md:order-2 md:pl-16" : "md:pr-16"}`}>
        <div className={`w-full relative ring-1 rounded-3xl transition-all duration-700 bg-white ${isActive ? '-translate-y-2 shadow-[0_40px_100px_-20px_rgba(86,69,212,0.15)] ring-primary/20' : 'shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] ring-black/5'}`}>
          <div className="w-full aspect-video md:aspect-4/3 rounded-3xl overflow-hidden relative bg-black/5 [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
            <img src={item.image} alt={item.step} className={`w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${item.mixBlend ? 'mix-blend-multiply' : ''} ${isActive ? 'scale-105' : 'scale-100'}`} />
            <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const currentSlug = slug || "genre-game-classifier";
  const project = DATA[currentSlug] || DATA["genre-game-classifier"] || {
    title: slug ? slug.replace(/-/g, " ") : "Project",
    subtitle: "Project details",
    overview: "Details for this project could not be found.",
    tags: [],
    role: "Developer",
    timeline: "-",
    color: "bg-card-peach",
    keyFeatures: [],
    challenges: "",
    overviewParagraphs: [],
    githubLink: "",
    workflow: []
  };

  return (
    <div className="min-h-dvh bg-[#FAFAFA] selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans pb-24">
      <LogoHeader backHash="#projects" backName="Projects" />

      <main className="pt-28 md:pt-40 px-4 md:px-8">
        <div className="max-w-350 mx-auto w-full">
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12 md:mb-20 max-w-6xl mx-auto w-full">
            <motion.div variants={fadeUp}>
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
                  {project.tags.map((tag: string, i: number) => (
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
            className="w-full mb-24 md:mb-40 pt-10"
          >
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight mb-6">
                {project.workflowTitle || "Process Workflow"}
              </h2>
              <p className="text-steel max-w-2xl mx-auto text-base md:text-lg">
                {project.workflowSubtitle || "A proven step-by-step process designed to transform complex workflows into scalable systems — efficiently and strategically."}
              </p>
            </div>

            <div ref={timelineRef} className="relative max-w-5xl mx-auto">
              <div className="absolute left-7 md:left-1/2 top-4 bottom-4 w-px bg-black/10 md:-translate-x-1/2"></div>

              <motion.div
                className="absolute left-7 md:left-1/2 top-4 bottom-4 w-0.5 bg-primary md:-translate-x-1/2 origin-top"
                style={{ scaleY: timelineScroll }}
              ></motion.div>
              
              {((project.workflow || DATA[currentSlug]?.workflow || []) as any[]).map((item: any, idx: number) => (
                <TimelineItem key={idx} item={item} idx={idx} />
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
              {project.overviewParagraphs && project.overviewParagraphs.length > 0 ? (
                project.overviewParagraphs.map((paragraph: string, pIdx: number) => (
                  <p key={pIdx} className="mb-8">
                    {paragraph}
                  </p>
                ))
              ) : project.desc ? (
                <p className="mb-8">{project.desc}</p>
              ) : null}

              {project.challenges && (
                <>
                  <h2 className="text-2xl md:text-[32px] font-bold text-ink mb-6 tracking-tight mt-16">The Challenge</h2>
                  <p className="mb-12">
                    {project.challenges}
                  </p>
                </>
              )}
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-10px" }} 
              variants={slideInRight} 
              className="md:col-span-4"
            >
              <div className="bg-white p-6 md:p-8 rounded-4xl md:rounded-4xl shadow-xl shadow-black/5 ring-1 ring-black/5 md:sticky md:top-36">
                <h3 className="text-lg font-bold text-ink mb-6">Key Highlights</h3>
                <ul className="space-y-4 mb-8">
                  {(project.keyFeatures || []).map((feature: string, idx: number) => (
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
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 bg-black/5 text-ink font-bold uppercase tracking-widest px-4 md:px-6 py-3 md:py-4 rounded-xl hover:bg-black/10 transition-all duration-300 hover:shadow-sm text-xs group">
                      <span className="flex items-center gap-2 truncate"><GithubLogo size={18} className="shrink-0" /> <span className="truncate">Source Code</span></span>
                      <ArrowRight size={16} className="opacity-50 shrink-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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