import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import LGSinarmasLogo from '../../assets/LG_Sinarmas_Logo_Vector.svg';

// Experience (Crisp Bento Canvas with Prominent LG Sinarmas Silhouette)
const Experience = () => {
  const item = {
    title: "Software Engineer",
    place: "LG Sinarmas",
    year: "2025 — Present",
    slug: "software-engineer-lg",
    logo: LGSinarmasLogo,
    desc: "Supporting Smart Factory operations through automated process modeling and server monitoring, while developing scalable enterprise applications using React, TypeScript, and Microfrontend Architecture.",
    tags: ["React 19", "TypeScript", "Microfrontends", "AWS S3", "Smart Factory"],
  };

  return (
    <section id="experience" className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10px" }} 
          variants={fadeUp} 
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase">
              Professional <br className="hidden md:block" />Experience.
            </h2>
          </div>
          
        </motion.div>

        {/* Experience Bento Card */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10px" }} 
            variants={scaleIn}
            className="w-full"
          >
            <Link 
              to={`/career/${item.slug}`}
              className="block outline-none h-full group"
            >
              {/* Outer Frame */}
              <div className="p-1.5 rounded-3xl md:rounded-[36px] bg-white border border-hairline hover:border-[#BC1237]/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#BC1237]/10">
                
                {/* Inner Bento Canvas */}
                <div className="bg-linear-to-br from-[#FFF5F6] via-[#FFEBEF] to-[#FED7E2]/50 rounded-[22px] md:rounded-[30px] p-7 sm:p-9 md:p-12 relative overflow-hidden border border-[#FECDD3] flex flex-col justify-between min-h-95 md:min-h-105">
                  
                  {/* Subtle Ambient Radial Highlight */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#BC1237]/5 rounded-full blur-[90px] pointer-events-none group-hover:bg-[#BC1237]/10 transition-all duration-700"></div>

                  {/* Watermark Mobile: Dempet di Ujung Tepi Kanan Card */}
                  <div className="block md:hidden absolute top-1/2 -translate-y-1/2 -right-51 w-120 rotate-90 origin-center opacity-10 pointer-events-none select-none">
                    <img 
                      src={item.logo} 
                      alt="" 
                      className="w-full h-auto object-contain filter contrast-125" 
                    />
                  </div>

                  {/* Watermark Desktop: Sudut Kanan Bawah */}
                  <div className="hidden md:block absolute md:-bottom-5 md:-right-2 md:w-130 opacity-25 group-hover:opacity-50 transition-all duration-700 ease-out pointer-events-none select-none">
                    <img 
                      src={item.logo} 
                      alt="" 
                      className="w-full h-auto object-contain filter contrast-125 group-hover:saturate-150 transition-all duration-700" 
                    />
                  </div>

                  {/* Top Row: Brand Avatar + Details & Action Circle */}
                  <div className="relative z-10 flex items-center justify-between gap-4 mb-8 sm:mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-black/5 shadow-xs p-2.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <img src={item.logo} alt={item.place} className="w-full h-full object-contain" />
                      </div>
                      
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
                          {item.place}
                        </h4>
                        <span className="text-steel text-xs sm:text-sm font-semibold">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-ink border border-black/5 shadow-xs flex items-center justify-center group-hover:bg-ink group-hover:text-white group-hover:rotate-45 transition-all duration-300 shrink-0">
                      <ArrowRight size={20} weight="bold" />
                    </div>
                  </div>

                  {/* Middle Row: Title & Overview */}
                  <div className="relative z-10 max-w-2xl mb-8 sm:mb-10">
                    <h3 className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-ink tracking-tight leading-[1.15] mb-3.5 group-hover:text-[#BC1237] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#4a4a4a] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Row: Tech Stack Pills & Action Link */}
                  <div className="relative z-10 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3.5 py-1.5 rounded-full text-xs md:text-[13px] font-semibold bg-white/90 backdrop-blur-md border border-black/5 text-ink shadow-xs group-hover:border-black/15 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs md:text-[13px] font-bold uppercase tracking-wider text-ink group-hover:text-[#BC1237] transition-colors shrink-0">
                      <span>View Case Study</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Experience;