import { type ReactElement } from 'react';
import { motion, type Variants } from 'framer-motion';
import { SocialButton } from '../components/ui/SocialButton';
import { SOCIAL_LINKS, EMAIL_LINK, RESUME_LINK, RESUME_ICON } from '../constants/contactData';
import DotGrid from '../components/ui/DotGrid';

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Ikon khusus untuk tombol Email di mode mobile
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const relaxedEase = [0.4, 0, 0.2, 1] as const;

const ContactSection = (): ReactElement => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.05 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: relaxedEase } 
    }
  };

  const greatVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: relaxedEase, delay: 0.6 } 
    }
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      // bg-[#F9F8F4] DIHAPUS -> diganti bg-transparent agar warna #CAE8E8 dari index.css tembus
      className="relative z-0 flex flex-col items-center justify-center pt-24 pb-24 md:pt-32 md:pb-32 px-6 md:px-12 lg:px-20 w-full bg-transparent overflow-hidden scroll-mt-20"
    >
      <DotGrid />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Info Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
          <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#2E4C38]/10 shadow-sm">
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="relative flex h-2 w-2 rounded-full bg-[#4A6750]"
            />
            <span className="font-redhat text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#1A2F24]/80 font-bold">
              Available for work
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-[#2E4C38]/10 shadow-sm">
            <span className="font-redhat text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#4A6750] font-bold">
              Base: 
            </span>
            <span className="font-aileron text-[11px] md:text-xs text-[#1A2F24] font-bold tracking-wide">
              Bekasi, ID
            </span>
          </div>
        </motion.div>

        {/* Typography */}
        <div className="flex flex-col items-center text-center w-full select-none mb-14 md:mb-20">
          <motion.h2 
            variants={itemVariants} 
            className="font-seasons text-[11vw] sm:text-[64px] lg:text-[84px] leading-[1.1] tracking-tight text-[#1A2F24] flex flex-col items-center"
          >
            <span>LET'S BUILD</span>
            <span className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 mt-[-10px] sm:mt-[-15px]">
              <span>SOMETHING</span>
              <motion.span variants={greatVariants} className="text-[#4A6750] flex">
                {"GREAT.".split("").map((char, i) => (
                  <motion.span
                    key={`great-${i}`}
                    animate={{ y: [-2, 2, -2] }} 
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4, 
                      delay: i * 0.1,
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

        {/* Bottom Glass Card */}
        <motion.div variants={itemVariants} className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 bg-white/50 backdrop-blur-xl border border-white/80 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(46,76,56,0.05)]">
            
            <p className="font-aileron text-center md:text-left text-sm md:text-base text-[#2E4C38]/80 leading-relaxed font-medium flex-1 max-w-sm mb-2 md:mb-0">
              I’m always excited to collaborate on meaningful projects, discuss tech, or just say hello. Reach out anytime!
            </p>

            <div className="flex flex-col items-center md:items-end gap-6 shrink-0 w-full md:w-auto">
              {/* Tombol Let's Talk Pill: HANYA TAMPIL DI DESKTOP */}
              <a 
                href={EMAIL_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden md:flex group items-center justify-center gap-3 bg-[#1A2F24] text-[#F9F8F4] px-6 py-3.5 rounded-full hover:bg-[#2E4C38] transition-all duration-300 shadow-md hover:shadow-lg w-auto"
              >
                <span className="font-redhat text-xs tracking-[0.2em] uppercase font-bold">
                  Let's Talk
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight />
                </span>
              </a>

              {/* Baris Ikon */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Ikon Email khusus untuk Mobile (disembunyikan di desktop karena sudah ada pil button) */}
                <div className="flex md:hidden">
                  <SocialButton url={EMAIL_LINK} icon={<EmailIcon />} label="Email" />
                </div>

                {/* Sisa ikon bawaan */}
                {SOCIAL_LINKS.map((social) => (
                  <SocialButton key={social.name} url={social.url} icon={social.icon} label={social.name} />
                ))}
                <SocialButton url={RESUME_LINK} icon={RESUME_ICON} label="Resume" />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ContactSection;