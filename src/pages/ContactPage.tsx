import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const ContactPage = () => {
  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } }
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: { scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const socials = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/diityanug",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/diityanug",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.32a12.3 12.3 0 0 0-6.2 0C6.15 2.5 5 2.8 5 2.8a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 12c0 5.6 3.35 6.6 6.5 7a4.8 4.8 0 0 0-1 3.02v4"></path>
          <path d="M8 19c-3 1-4-1-5-1"></path>
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col px-8 md:px-16 py-6 md:py-8 h-[calc(100vh-116px)] overflow-hidden bg-white"
    >
      
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full">
        
        {/* ================= MAIN HERO CONTENT (Let's Build) ================= */}
        <div className="flex-1 flex flex-col justify-center mb-16 md:mb-24 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-10 lg:gap-8">
            
            {/* Bagian Kiri (Teks) */}
            <div className="flex flex-col items-start w-full lg:w-2/3">
              <motion.div variants={itemVariants} className="flex flex-col mb-4 md:mb-5">
                {/* PERBAIKAN: Tambah pointer-events-none select-none biar kebal klik */}
                <h1 className="pointer-events-none select-none font-lejour font-normal text-5xl md:text-[72px] lg:text-[90px] leading-[0.9] tracking-tight text-[#2A2320]">
                  <Typewriter text="Let’s Build" />
                </h1>
                <div className="flex items-center gap-3 mt-1 md:mt-3">
                  {/* PERBAIKAN: Tambah pointer-events-none select-none */}
                  <h1 className="pointer-events-none select-none font-lejour font-normal text-5xl md:text-[72px] lg:text-[90px] leading-[0.9] tracking-tight text-[#2A2320]">
                    <Typewriter text="Something" delay={0.4} />
                  </h1>
                  
                  <motion.span 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }} 
                    style={{ fontFamily: "'The Seasons Italic', serif" }} 
                    className="pointer-events-none select-none text-6xl md:text-[80px] lg:text-[105px] leading-[0.8] text-[#5E7657] mt-1 md:mt-3"
                  >
                    Great.
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div variants={lineVariants} className="w-full max-w-[250px] border-t-2 border-black/10 my-4 md:my-6" />
              
              {/* PERBAIKAN: Tambah pointer-events-none juga di subtitle buat jaga-jaga kalau dia pakai Typewriter */}
              <motion.p variants={itemVariants} className="pointer-events-none select-none font-poppins text-base md:text-lg font-light tracking-wide text-gray-500 leading-relaxed max-w-lg">
                I’m always excited to collaborate on meaningful projects, discuss tech, or just say hello. Reach out anytime.
              </motion.p>
            </div>

            {/* Bagian Kanan (Tombol) */}
            <motion.div variants={itemVariants} className="w-full lg:w-1/3 flex justify-start lg:justify-end mt-2 lg:mt-0">
              <a 
                href="https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=diityanug13@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 bg-[#2A2320] text-white px-5 py-2.5 md:px-7 md:py-3.5 rounded-full hover:bg-[#5E7657] transition-all duration-500 ease-out shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <span className="font-poppins text-xs tracking-[0.2em] uppercase font-medium">
                  Send an Email
                </span>
                <span className="bg-white/10 p-2 md:p-2.5 rounded-full group-hover:rotate-45 group-hover:bg-white/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </motion.div>

          </div>
        </div>

        {/* ================= FOOTER / STATUS BAR ================= */}
        <motion.div variants={itemVariants} className="w-full shrink-0">
          <div className="w-full border-t border-black/10 mb-6" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
            
            {/* Left: Social Media Pills */}
            <div className="flex gap-3">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-black/10 bg-white hover:border-[#5E7657] hover:bg-[#5E7657] hover:text-white transition-all duration-300 shadow-sm"
                >
                  <span className="text-[#2A2320] group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </span>
                  <span className="font-poppins font-medium text-[10px] md:text-xs tracking-widest uppercase text-[#2A2320] group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Right: Live Status & Location */}
            <div className="flex flex-col items-start md:items-end gap-1.5 bg-white px-5 py-3 rounded-2xl border border-black/5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <p className="font-poppins text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-medium">
                  Available for work
                </p>
              </div>
              <p style={{ fontFamily: "'The Seasons Italic', serif" }} className="text-lg md:text-xl text-[#2A2320]">
                Central Jakarta, Indonesia
              </p>
            </div>

          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default ContactPage;