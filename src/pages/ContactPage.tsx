import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SocialButton } from '../components/contactPage/SocialButton';
import { SOCIAL_LINKS, EMAIL_LINK, RESUME_LINK, RESUME_ICON } from '../constants/contactData';
import DotGrid from '../components/homePage/DotGrid';

/* ARROW ICON HELPER */
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const relaxedEase: [number, number, number, number] = [0.4, 0, 0.2, 1];
const ContactPage = (): ReactElement => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.05   
      } 
    },
    exit: { 
      opacity: 0, 
      filter: "blur(10px)", 
      transition: { duration: 0.5, ease: relaxedEase } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: relaxedEase } 
    }
  };

  const greatVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { 
        duration: 0.8, 
        ease: relaxedEase,
        delay: 0.8 
      } 
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col justify-between pt-28 md:pt-32 px-5 md:px-10 lg:px-16 pb-8 md:pb-10 min-h-[100dvh] bg-[#F9F8F4] overflow-hidden"
    >
      <DotGrid />

      {/* TOP BAR: Status & Location */}
      <motion.div variants={itemVariants} className="relative z-10 w-full max-w-[1400px] mx-auto flex justify-between items-start">
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#2E4C38]/10 shadow-sm">
          <motion.span 
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative flex h-2.5 w-2.5 rounded-full bg-[#4A6750]"
          />
          <p className="font-redhat text-[10px] uppercase tracking-[0.2em] text-[#1A2F24]/70 font-bold mt-0.5">
            Available for work
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end gap-1 text-right">
          <span className="font-redhat text-[10px] tracking-[0.2em] uppercase text-[#4A6750] font-bold">
            Base Location
          </span>
          <p className="font-aileron text-sm text-[#1A2F24] font-bold">
            Bekasi Regency, West Java
          </p>
        </div>
      </motion.div>

      {/* CENTER HERO: Typography */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center w-full my-10 lg:my-0">
        <motion.h1 variants={itemVariants} className="font-seasons text-[11vw] sm:text-[70px] lg:text-[100px] leading-[0.85] tracking-tight text-[#1A2F24]">
          LET'S BUILD
        </motion.h1>
        
        <h1 className="font-seasons text-[11vw] sm:text-[70px] lg:text-[100px] leading-[0.85] tracking-tight flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
          <motion.span variants={itemVariants} className="text-[#1A2F24]">
            SOMETHING
          </motion.span>
          
          <motion.span variants={greatVariants} className="text-[#4A6750] flex">
            {"GREAT.".split("").map((char, i) => (
              <motion.span
                key={`great-${i}`}
                animate={{ y: -3, rotate: 0.5 }} 
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "mirror", 
                  duration: 3.5, 
                  delay: 2.5 + (i * 0.15),
                  ease: "easeInOut" 
                }}
                className="inline-block origin-bottom"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h1>
      </div>

      {/* BOTTOM BAR */}
      <motion.div variants={itemVariants} className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-10 xl:gap-20 bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:px-8 md:py-6 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,76,56,0.1)]">
          
          <p className="font-aileron text-center xl:text-left text-base md:text-lg text-[#2E4C38]/80 leading-relaxed font-medium flex-1 min-w-[280px]">
            I’m always excited to collaborate on meaningful projects, discuss tech, or just say hello. Reach out anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-end gap-6 md:gap-8 shrink-0">
            
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialButton key={social.name} url={social.url} icon={social.icon} label={social.name} />
              ))}
              <SocialButton url={RESUME_LINK} icon={RESUME_ICON} label="Resume" />
            </div>

            <a 
              href={EMAIL_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center justify-center gap-3 bg-[#1A2F24] text-[#F9F8F4] pl-5 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 rounded-full hover:bg-[#2E4C38] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_14px_rgba(26,47,36,0.15)] w-full sm:w-auto shrink-0"
            >
              <span className="font-redhat text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold mt-0.5">
                Let's Talk
              </span>
              <span className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:translate-x-1 group-hover:bg-white/20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <ArrowRight />
              </span>
            </a>
            
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
};

export default ContactPage;