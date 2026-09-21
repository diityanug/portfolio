import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import LGSinarmasLogo from '../../assets/LG_Sinarmas_Logo_Vector.svg';

// Experience
const Experience = () => {
  const items = [
    { 
      title: "Software Engineer", 
      place: "LG Sinarmas", 
      year: "2025 - Present", 
      desc: "Smart Factory operations and Frontend Developer with React and TypeScript.",
      slug: "software-engineer-lg",
      logo: LGSinarmasLogo
    },
  ];

  return (
    <section id="experience" className="pt-16 md:pt-24 pb-28 md:pb-40 px-4 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="max-w-300 mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} 
          className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-[40px] md:text-[80px] font-bold text-ink tracking-[-0.03em] leading-none">
              Professional <br className="hidden md:block" />Experience.
            </h2>
          </div>
          <p className="text-steel text-base md:text-[19px] max-w-md leading-[1.6]">
            A proven history of building scalable, enterprise-grade applications and optimizing operational workflows.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6 md:gap-10">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
              className="group"
            >
              <Link 
                to={item.slug ? `/career/${item.slug}` : '#'} 
                className="block p-1.5 rounded-10 bg-white ring-1 ring-black/5 hover:ring-primary/30 transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(86,69,212,0.15)] hover:-translate-y-2"
              >
                <div className="bg-[#fcfcfc] h-full rounded-8.5 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden">
                  
                  {/* Decorative Gradient */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none"></div>

                  {/* Left: Logo & Role */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 relative z-10 w-full lg:w-auto">
                    {/* Logo Box */}
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-6 bg-white shadow-md ring-1 ring-black/5 flex items-center justify-center p-4 group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      {item.logo ? (
                        <img src={item.logo} alt={item.place} className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-bold text-xl text-steel">{item.place.charAt(0)}</span>
                      )}
                    </div>
                    
                    {/* Text Details */}
                    <div>
                      <div className="inline-block px-4 py-1.5 bg-ink text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4 md:mb-5">
                        {item.year}
                      </div>
                      <h3 className="text-[24px] md:text-[44px] font-bold text-ink tracking-tight mb-2 group-hover:text-primary transition-colors duration-500 leading-none">
                        {item.title}
                      </h3>
                      <p className="text-xl md:text-[22px] font-semibold text-steel">
                        {item.place}
                      </p>
                    </div>
                  </div>

                  {/* Right: Desc & Action */}
                  <div className="flex flex-col lg:items-end relative z-10 w-full lg:w-1/3">
                    <p className="text-steel text-base md:text-lg leading-[1.7] mb-8 lg:text-right">
                      {item.desc}
                    </p>
                    
                    <div className="inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest text-ink group-hover:text-primary transition-colors">
                      <span className="relative">
                        View Details
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                      </span>
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:-rotate-45 transition-all duration-500">
                        <ArrowRight size={18} weight="bold" />
                      </div>
                    </div>
                  </div>
                  
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
