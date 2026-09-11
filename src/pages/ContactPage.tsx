import { type ReactElement, type ReactNode, type MouseEvent, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

import {
  SOCIAL_LINKS,
  EMAIL_MAILTO,
  EMAIL_GMAIL_WEB,
  RESUME_LINK,
} from '../constants/contactData';

const customEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
};

const MailIcon = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const UsersIcon = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileIcon = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ArrowRightIcon = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ExternalLinkIcon = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CopyCheckIcon = (): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

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
    className="inline-flex items-center gap-2 border-2 border-[#1c1c1c] bg-white px-5 py-2.5 font-sans text-xs font-semibold text-[#1c1c1c] capitalize tracking-wide transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#1c1c1c] active:scale-95"
  >
    <span className="shrink-0">{icon}</span>
    <span>{label}</span>
    <ExternalLinkIcon />
  </a>
);

const ContactSection = (): ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = EMAIL_MAILTO;
    } else {
      window.open(EMAIL_GMAIL_WEB, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyEmail = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('diityanug13@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSectionScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      className="relative z-0 flex w-full flex-col bg-[#f7f4ed] text-[#1c1c1c] font-sans scroll-mt-24 min-h-[100svh] overflow-hidden"
    >
      {/* Main Contact Container */}
      <div className="w-full px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 md:px-12 lg:px-24 flex-1">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-16 sm:gap-24">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col text-left max-w-3xl mx-auto items-center"
          >
            <span className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold bg-black/5 text-[#5f5f5d] mb-6">
              Contact
            </span>
            <h2 className="font-sans text-[48px] sm:text-[64px] lg:text-[76px] font-semibold leading-[1.05] tracking-tighter text-[#1c1c1c]">
              Let&apos;s talk.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[#5f5f5d] font-sans max-w-xl mx-auto">
              Have a project, an idea, or just want to say hi? I&apos;m always
              open for a good conversation. Pick whichever channel works
              best for you.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: Email */}
            <div className="group bg-[#f7f4ed] border-2 border-[#1c1c1c] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#1c1c1c]">
                  <div className="w-12 h-12 rounded-none border-2 border-[#1c1c1c] bg-[#eceae4] flex items-center justify-center text-[#1c1c1c]">
                    <MailIcon />
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    title="Copy email address"
                    className="inline-flex items-center gap-2 px-4 py-2 font-sans text-xs font-semibold tracking-wide bg-white border-2 border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#eceae4] active:scale-95 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <span className="text-[#1c1c1c]"><CopyCheckIcon /></span>
                        <span className="text-[#1c1c1c]">Copied</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#1c1c1c]">diityanug13@gmail.com</span>
                      </>
                    )}
                  </button>
                </div>
                <h3 className="font-sans text-2xl font-semibold text-[#1c1c1c] tracking-tight mb-2">
                  Email
                </h3>
                <p className="text-sm leading-relaxed text-[#5f5f5d] font-sans">
                  Hit me up to discuss a project, collaboration, or just say hello.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#1c1c1c]">
                <button
                  onClick={handleEmailClick}
                  type="button"
                  className="w-full inline-flex items-center justify-between px-6 py-3.5 bg-[#1c1c1c] text-[#f7f4ed] border-2 border-transparent font-sans text-sm font-semibold active:scale-95 transition-all hover:bg-[#1c1c1c]/90 cursor-pointer"
                >
                  <span>Send an Email</span>
                  <ArrowRightIcon />
                </button>
              </div>
            </div>

            {/* Card 2: Socials */}
            <div className="group bg-[#f7f4ed] border-2 border-[#1c1c1c] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#1c1c1c]">
                  <div className="w-12 h-12 rounded-none border-2 border-[#1c1c1c] bg-[#eceae4] flex items-center justify-center text-[#1c1c1c]">
                    <UsersIcon />
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wide text-[#1c1c1c] bg-white border-2 border-[#1c1c1c] px-3 py-1">
                    Networks
                  </span>
                </div>
                <h3 className="font-sans text-2xl font-semibold text-[#1c1c1c] tracking-tight mb-2">
                  Socials
                </h3>
                <p className="text-sm leading-relaxed text-[#5f5f5d] font-sans">
                  Let&apos;s link up! Find my professional profile and code repositories here.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#1c1c1c]">
                <div className="flex flex-wrap gap-3">
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

            {/* Card 3: Resume */}
            <div className="group bg-[#f7f4ed] border-2 border-[#1c1c1c] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-[-8px_8px_0_#1c1c1c]">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#1c1c1c]">
                  <div className="w-12 h-12 rounded-none border-2 border-[#1c1c1c] bg-[#eceae4] flex items-center justify-center text-[#1c1c1c]">
                    <FileIcon />
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wide text-[#1c1c1c] bg-white border-2 border-[#1c1c1c] px-3 py-1">
                    PDF Document
                  </span>
                </div>
                <h3 className="font-sans text-2xl font-semibold text-[#1c1c1c] tracking-tight mb-2">
                  Resume
                </h3>
                <p className="text-sm leading-relaxed text-[#5f5f5d] font-sans">
                  Grab a copy of my CV to see the full list of my experience and skills.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#1c1c1c]">
                <a
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-6 py-3.5 border-2 border-[#1c1c1c] bg-white text-[#1c1c1c] font-sans text-sm font-semibold active:scale-95 transition-all hover:bg-[#eceae4] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#1c1c1c] cursor-pointer"
                >
                  <span>Download Resume</span>
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elegant Footer Region */}
      <footer className="w-full border-t border-[#eceae4] bg-[#f7f4ed] px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#eceae4]">
            <div className="flex items-center gap-4">
              <span className="font-sans text-xl font-semibold text-[#1c1c1c] tracking-tight">
                Aditya Nugraha
              </span>
              <span className="w-1 h-1 rounded-full bg-[#eceae4]"></span>
              <span className="font-sans text-sm text-[#5f5f5d] font-medium tracking-wide">
                Software Engineer
              </span>
            </div>

            <nav aria-label="Footer directory" className="flex flex-wrap items-center gap-6 md:gap-8">
              {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => handleSectionScroll(section)}
                  className="font-sans text-xs font-medium tracking-wide capitalize text-[#5f5f5d] hover:text-[#1c1c1c] transition-colors cursor-pointer"
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans text-xs text-[#5f5f5d] tracking-wide">
            <p>
              &copy; {new Date().getFullYear()} Aditya Nugraha.
            </p>
            <div className="flex items-center gap-4">
              <span>Jakarta, ID</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.section>
  );
};

export default ContactSection;
