import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { SocialButton } from '../components/contactPage/SocialButton';
import { SOCIAL_LINKS, EMAIL_LINK, RESUME_LINK, RESUME_ICON } from '../constants/contactData';

import { 
  containerVariants, 
  popUpVariants, 
  lineGrowVariants 
} from '@utils/animation';

const ContactPage = (): ReactElement => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col px-8 md:px-16 py-6 md:py-8 h-auto min-h-[calc(100vh-116px)] md:min-h-0 md:h-[calc(100vh-116px)] overflow-x-hidden overflow-y-auto md:overflow-hidden bg-transparent"
    >

      <div className="w-full max-w-6xl mx-auto flex flex-col h-full relative z-10 flex-1">

        {/* MAIN HERO */}
        <motion.div variants={containerVariants} className="flex-1 flex flex-col justify-center mb-16 md:mb-24 mt-8 md:mt-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-10 lg:gap-8">

            {/* LEFT SECTION */}
            <motion.div variants={containerVariants} className="flex flex-col items-start w-full lg:w-2/3">
              
              <div className="flex flex-col mb-4 md:mb-5">
                <motion.h1 variants={popUpVariants} className="pointer-events-none select-none font-lejour font-normal text-5xl md:text-[72px] lg:text-[90px] leading-[0.9] tracking-tight text-[#2A2320]">
                  Let’s Build
                </motion.h1>

                {/* Typography Wrapper */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-x-3 gap-y-1 md:gap-3 mt-1 md:mt-3">
                  <motion.h1 variants={popUpVariants} className="pointer-events-none select-none font-lejour font-normal text-5xl md:text-[72px] lg:text-[90px] leading-[0.9] tracking-tight text-[#2A2320]">
                    Something
                  </motion.h1>
                  <motion.span
                    variants={popUpVariants}
                    style={{ fontFamily: "'The Seasons Italic', serif" }}
                    className="pointer-events-none select-none text-6xl md:text-[80px] lg:text-[105px] leading-[0.8] text-[#5E7657] mt-1 md:mt-3"
                  >
                    Great.
                  </motion.span>
                </div>
              </div>

              {/* Decorative Line */}
              <motion.div variants={lineGrowVariants} className="w-full max-w-[250px] border-t-2 border-black/10 my-4 md:my-6" />

              <motion.p variants={popUpVariants} className="pointer-events-none select-none font-poppins text-base md:text-lg font-light tracking-wide text-gray-500 leading-relaxed max-w-lg">
                I’m always excited to collaborate on meaningful projects, discuss tech, or just say hello. Reach out anytime.
              </motion.p>
            </motion.div>

            {/* RIGHT SECTION */}
            {/* CTA Buttons */}
            <motion.div variants={popUpVariants} className="w-full lg:w-1/3 flex justify-start lg:justify-end mt-2 lg:mt-0">
              <a href={EMAIL_LINK} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between gap-3 bg-[#2A2320] text-white px-5 py-2.5 md:px-7 md:py-3.5 rounded-full hover:bg-[#5E7657] transition-all duration-500 ease-out shadow-md hover:shadow-lg hover:-translate-y-1">
                <span className="font-poppins text-xs tracking-[0.2em] uppercase font-medium">Send an Email</span>
                <span className="bg-white/10 p-2 md:p-2.5 rounded-full group-hover:rotate-45 group-hover:bg-white/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* MAIN FOOTER */}
        <motion.div variants={popUpVariants} className="w-full shrink-0 mt-auto">
          {/* Top Border */}
          <div className="w-full border-t border-black/10 mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialButton 
                  key={social.name} 
                  url={social.url} 
                  icon={social.icon} 
                  label={social.name} 
                />
              ))}
              <SocialButton 
                url={RESUME_LINK} 
                icon={RESUME_ICON} 
                label="Resume" 
              />
            </div>

            {/* Status Indicator */}
            <div className="flex flex-col items-start md:items-end gap-1.5 bg-white px-5 py-3 rounded-2xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <p className="font-poppins text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium">Available for work</p>
              </div>
              <p style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-lg md:text-xl text-[#2A2320]">
                Bekasi Regency, West Java.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;