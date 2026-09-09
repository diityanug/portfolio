import { type ReactElement, type ReactNode, type MouseEvent } from 'react';
import { motion, type Variants } from 'framer-motion';

import {
  SOCIAL_LINKS,
  EMAIL_MAILTO,
  EMAIL_GMAIL_WEB,
  RESUME_LINK,
} from '../constants/contactData';

interface SocialButtonProps {
  readonly url: string;
  readonly icon: ReactNode;
  readonly label: string;
}

const SocialButton = ({ url, icon, label }: SocialButtonProps): ReactElement => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full border border-[#1A2F24]/15 bg-transparent px-4 py-2 text-[#1A2F24] transition-all duration-300 hover:border-[#1A2F24] hover:bg-[#1A2F24] hover:text-[#F9F8F4]"
  >
    <span className="shrink-0">{icon}</span>
    <span className="font-karla text-[13px] font-bold tracking-wide">{label}</span>
  </a>
);

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
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UsersIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ArrowIcon = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ContactSection = (): ReactElement => {
  const handleEmailClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = EMAIL_MAILTO;
    } else {
      window.open(EMAIL_GMAIL_WEB, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="relative z-0 flex w-full scroll-mt-20 flex-col overflow-hidden bg-[#F9F8F4] px-6 pt-12 pb-24 md:py-20 lg:py-24 md:px-12 lg:px-24 font-sans text-[#1A2F24]"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col gap-16 lg:gap-20">
        
        <div className="flex flex-col">
          <motion.div variants={textVariants} className="flex flex-col text-left">
            <span className="font-redhat mb-3 md:mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#4A6750]">
              Contact
            </span>
            <h2 className="font-autour text-[35px] sm:text-[54px] lg:text-[64px] leading-[1.1] tracking-tight text-[#1A2F24]">
              Let&apos;s <span className="text-[#4A6750]">talk</span>
            </h2>
            <p className="font-karla mt-5 max-w-xl text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] text-[#2E4C38]/80 font-medium text-justify">
              Have a project, an idea, or just want to say hi? I&apos;m always
              open for a good conversation — pick whichever channel works
              best for you.
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="w-full flex flex-col border-t border-[#1A2F24]/10">
          
          <a
            href={EMAIL_MAILTO}
            onClick={handleEmailClick}
            className="group/row flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-7 md:py-10 border-b border-[#1A2F24]/10 transition-colors hover:bg-white/40 -mx-4 px-4 rounded-xl"
          >
            <div className="flex items-center gap-4 md:w-1/4 shrink-0 text-[#1A2F24]">
              <MailIcon />
              <h4 className="font-overlock text-[18px] md:text-[22px] font-bold">Email</h4>
            </div>
            <div className="md:w-1/2">
              <p className="font-karla text-[14px] md:text-[16px] leading-relaxed text-[#2E4C38]/70">
                Hit me up to discuss a project, collaboration, or just say hello.
              </p>
            </div>
            <div className="md:w-1/4 flex md:justify-end mt-3 md:mt-0">
              <span className="font-karla inline-flex items-center gap-2.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#4A6750] transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:text-[#1A2F24]">
                Send Message <ArrowIcon />
              </span>
            </div>
          </a>

          <div className="group/row flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-7 md:py-10 border-b border-[#1A2F24]/10 transition-colors hover:bg-white/40 -mx-4 px-4 rounded-xl">
            <div className="flex items-center gap-4 md:w-1/4 shrink-0 text-[#1A2F24]">
              <UsersIcon />
              <h4 className="font-overlock text-[18px] md:text-[22px] font-bold">Socials</h4>
            </div>
            <div className="md:w-1/2">
              <p className="font-karla text-[14px] md:text-[16px] leading-relaxed text-[#2E4C38]/70">
                Let&apos;s link up! Find my professional profile and code repositories here.
              </p>
            </div>
            <div className="md:w-1/4 flex md:justify-end gap-2 flex-wrap mt-3 md:mt-0">
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

          <a
            href={RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group/row flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-7 md:py-10 border-b border-[#1A2F24]/10 transition-colors hover:bg-white/40 -mx-4 px-4 rounded-xl"
          >
            <div className="flex items-center gap-4 md:w-1/4 shrink-0 text-[#1A2F24]">
              <FileIcon />
              <h4 className="font-overlock text-[18px] md:text-[22px] font-bold">Resume</h4>
            </div>
            <div className="md:w-1/2">
              <p className="font-karla text-[14px] md:text-[16px] leading-relaxed text-[#2E4C38]/70">
                Grab a copy of my CV to see the full list of my experience and skills.
              </p>
            </div>
            <div className="md:w-1/4 flex md:justify-end mt-3 md:mt-0">
              <span className="font-karla inline-flex items-center gap-2.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#4A6750] transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:text-[#1A2F24]">
                Download PDF <ArrowIcon />
              </span>
            </div>
          </a>

        </motion.div>

      </div>
    </motion.section>
  );
};

export default ContactSection;