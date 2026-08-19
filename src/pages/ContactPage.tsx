import { type ReactElement } from 'react';
import { motion, type Variants } from 'framer-motion';

import { SocialButton } from '../components/ui/SocialButton';
import {
  SOCIAL_LINKS,
  EMAIL_LINK,
  RESUME_LINK,
} from '../constants/contactData';

const customEase = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase, delay: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

const MailIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UsersIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ArrowIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ContactSection = (): ReactElement => {
  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      className="
        relative z-0
        flex w-full scroll-mt-20
        flex-col overflow-hidden
        bg-[#F9F8F4] px-6
        pt-12 pb-28 font-sans
        text-gray-800
        md:px-12 md:pt-20 md:pb-20
        lg:px-20
      "
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        
        {/* Header Section */}
        <motion.div variants={textVariants} className="mb-8 flex w-full flex-col md:mb-12">
          <span className="font-redhat mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#4A6750]">
            Contact
          </span>
          <h2 className="font-seasons text-[40px] leading-none tracking-tight text-[#1A2F24] md:text-5xl lg:text-6xl">
            Let&apos;s talk.
          </h2>
          <p className="font-aileron mt-4 max-w-2xl text-justify text-[14px] leading-[1.65] text-[#2E4C38]/80 md:text-[15px] md:leading-relaxed">
            Have a project, an idea, or just want to say hi? I&apos;m always
            open for a good conversation — pick whichever channel works
            best for you.
          </p>
        </motion.div>

        {/* Status Tag */}
        <motion.div
          variants={itemVariants}
          className="show-scrollbar mb-2 -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0"
        >
          <span className="
            inline-flex shrink-0 items-center gap-1.5
            rounded-full border border-[#2E4C38]/10
            bg-[#4A6750]/5 px-2.5 py-1
            text-[9px] font-bold uppercase tracking-widest text-[#4A6750]
          ">
            <span className="relative flex h-1 w-1">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#4A6750]/40" />
              <span className="relative h-1 w-1 rounded-full bg-[#4A6750]" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Channel Cards */}
        <motion.div variants={itemVariants} className="mt-4 w-full overflow-hidden">
          <div className="
            show-scrollbar -mx-6 flex snap-x snap-mandatory gap-4
            overflow-x-auto px-6 pb-4 pt-1
            md:mx-0 md:px-0
          ">
            
            {/* Email Card */}
            <a
              href={EMAIL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex h-[180px] w-[75vw] shrink-0 snap-center flex-col
                rounded-[1.25rem] border border-[#1A2F24]/10 bg-white
                p-5 shadow-sm transition-colors duration-300
                hover:border-[#4A6750]/30 sm:w-[300px] md:h-[190px]
              "
            >
              <h4 className="font-aileron mb-3 flex items-center gap-2.5 border-b border-[#1A2F24]/5 pb-3 text-[14px] font-bold text-[#1A2F24] md:text-[15px]">
                <span className="shrink-0 rounded-lg bg-[#4A6750]/10 p-1.5 text-[#4A6750]">
                  <MailIcon />
                </span>
                Email
              </h4>
              <div className="flex flex-1 flex-col justify-between">
                <p className="font-aileron text-[13px] leading-[1.5] text-[#2E4C38]/80">
                  Drop a message about a project, an idea, or just to say
                  hi. I read every email myself.
                </p>
                <span className="font-redhat mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4A6750] transition-colors duration-300 group-hover:text-[#E0BA5C]">
                  Send a message <ArrowIcon />
                </span>
              </div>
            </a>

            {/* Socials Card */}
            <div className="
              flex h-[180px] w-[75vw] shrink-0 snap-center flex-col
              rounded-[1.25rem] border border-[#1A2F24]/10 bg-white
              p-5 shadow-sm sm:w-[300px] md:h-[190px]
            ">
              <h4 className="font-aileron mb-3 flex items-center gap-2.5 border-b border-[#1A2F24]/5 pb-3 text-[14px] font-bold text-[#1A2F24] md:text-[15px]">
                <span className="shrink-0 rounded-lg bg-[#4A6750]/10 p-1.5 text-[#4A6750]">
                  <UsersIcon />
                </span>
                Socials
              </h4>
              <div className="flex flex-1 flex-col justify-between">
                <p className="font-aileron text-[13px] leading-[1.5] text-[#2E4C38]/80">
                  Find me across the web — always happy to connect and
                  swap ideas.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <SocialButton
                      key={social.name}
                      url={social.url}
                      icon={social.icon}
                      label={social.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Card */}
            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex h-[180px] w-[75vw] shrink-0 snap-center flex-col
                rounded-[1.25rem] border border-[#1A2F24]/10 bg-white
                p-5 shadow-sm transition-colors duration-300
                hover:border-[#4A6750]/30 sm:w-[300px] md:h-[190px]
              "
            >
              <h4 className="font-aileron mb-3 flex items-center gap-2.5 border-b border-[#1A2F24]/5 pb-3 text-[14px] font-bold text-[#1A2F24] md:text-[15px]">
                <span className="shrink-0 rounded-lg bg-[#4A6750]/10 p-1.5 text-[#4A6750]">
                  <FileIcon />
                </span>
                Resume
              </h4>
              <div className="flex flex-1 flex-col justify-between">
                <p className="font-aileron text-[13px] leading-[1.5] text-[#2E4C38]/80">
                  Get the full picture — download my complete resume as
                  a PDF.
                </p>
                <span className="font-redhat mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#4A6750] transition-colors duration-300 group-hover:text-[#E0BA5C]">
                  Download <ArrowIcon />
                </span>
              </div>
            </a>

          </div>

          <div className="font-redhat mt-1 flex select-none items-center justify-start gap-2 text-[9px] uppercase tracking-widest text-[#1A2F24]/30">
            <span>Swipe to explore</span>
            <span>→</span>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ContactSection;