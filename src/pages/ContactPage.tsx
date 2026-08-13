import { type ReactElement } from 'react';
import { motion, type Variants } from 'framer-motion';
import { SocialButton } from '../components/ui/SocialButton';
import { SOCIAL_LINKS, EMAIL_LINK, RESUME_LINK, RESUME_ICON } from '../constants/contactData';
import DotGrid from '../components/ui/DotGrid';

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const relaxedEase = [0.4, 0, 0.2, 1] as const;

const ContactSection = (): ReactElement => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1, ease: relaxedEase } 
    }
  };

  const greatVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: relaxedEase, delay: 0.4 } 
    }
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      // Padding atas dipangkas (pt-12 untuk mobile, pt-16 untuk desktop)
      className="relative z-0 flex flex-col justify-between pt-12 pb-32 md:pt-16 md:pb-16 px-6 md:px-12 lg:px-20 w-full min-h-[90vh] bg-transparent overflow-hidden scroll-mt-20"
    >
      <DotGrid />

      {/* Konten Utama (Tengah) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center flex-grow mt-10 md:mt-0">
        
        {/* Info Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10 md:mb-14">
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#1A2F24]/10 shadow-sm">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative flex h-2.5 w-2.5 rounded-full bg-[#4A6750]"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4A6750] opacity-50 animate-ping"></span>
            </motion.span>
            <span className="font-redhat text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#1A2F24] font-bold mt-[2px]">
              Available for work
            </span>
          </div>
        </motion.div>

        {/* Tipografi Raksasa */}
        <div className="flex flex-col items-center text-center w-full select-none mb-10 md:mb-12">
          <motion.h2 
            variants={itemVariants} 
            className="font-seasons text-[12vw] sm:text-[72px] lg:text-[96px] leading-[1] tracking-tight text-[#1A2F24] flex flex-col items-center"
          >
            <span>LET'S BUILD</span>
            <span className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 mt-[-5px] sm:mt-[-15px]">
              <span>SOMETHING</span>
              <motion.span variants={greatVariants} className="text-[#4A6750] flex italic pr-2">
                {"GREAT.".split("").map((char, i) => (
                  <motion.span
                    key={`great-${i}`}
                    animate={{ y: [-2, 2, -2] }} 
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5, 
                      delay: i * 0.15,
                      ease: "easeInOut" 
                    }}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </span>
          </motion.h2>
        </div>

        {/* Deskripsi */}
        <motion.p 
          variants={itemVariants}
          className="font-aileron text-[16px] md:text-[20px] text-[#2E4C38]/80 leading-relaxed font-medium max-w-xl text-center mb-14 md:mb-16 px-4"
        >
          I’m always excited to collaborate on meaningful projects, discuss emerging tech, or just say hello. My inbox is always open.
        </motion.p>

        {/* Tombol Utama (Lebih Berani & Animasi Ekstra) */}
        <motion.div variants={itemVariants}>
          <motion.a 
            href={EMAIL_LINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-4 bg-[#1A2F24] text-[#F9F8F4] px-10 py-5 md:px-12 md:py-6 rounded-full overflow-hidden shadow-[0_10px_40px_rgb(26,47,36,0.2)] hover:shadow-[0_15px_50px_rgb(74,103,80,0.3)] transition-shadow duration-500"
          >
            {/* Efek Hover Background */}
            <div className="absolute inset-0 bg-[#4A6750] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <span className="relative z-10 font-redhat text-[13px] md:text-sm tracking-[0.25em] uppercase font-bold mt-[5px]">
              Let's Talk
            </span>
            <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500 ease-out">
              <ArrowRight />
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Footer Area / Social Links Bar */}
      <motion.div 
        variants={itemVariants}
        className="relative z-10 w-full max-w-6xl mx-auto mt-24 md:mt-32"
      >
        {/* Divider Tipis */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1A2F24]/20 to-transparent mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 px-4 md:px-0">
          
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {SOCIAL_LINKS.map((social) => (
              <SocialButton key={social.name} url={social.url} icon={social.icon} label={social.name} />
            ))}
            
            <div className="w-[1px] h-6 bg-[#1A2F24]/20 mx-2 hidden md:block"></div>
            
            <SocialButton url={RESUME_LINK} icon={RESUME_ICON} label="Resume" />
          </div>

        </div>
      </motion.div>

    </motion.section>
  );
};

export default ContactSection;