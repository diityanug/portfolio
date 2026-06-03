import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const AboutPage = () => {
  // Education
  const education = [
    {
      degree: 'Master of Science in Information Technology',
      school: 'President University',
      period: '2023 - 2025',
      gpa: '3.64',
      details: 'Specializing in frontend development and intelligent systems.',
      link: '#'
    },
    {
      degree: 'Bachelor of Accounting',
      school: 'Tadulako University',
      period: '2017 - 2022',
      gpa: '3.71',
      details: 'Focused on Financial Accounting and Taxation.',
      link: '#'
    }
  ];

  // Certificates
  const certificates = [
    {
      title: 'Learn Frontend Web Development (HTML, CSS dan Javascript)',
      issuer: 'Udemy',
      year: '2025',
      link: '#'
    },
    {
      title: 'Java Bootcamp: Learn Java with 100+ Java Projects',
      issuer: 'Udemy',
      year: '2025',
      link: '#'
    },
    {
      title: 'Cloud Practitioner Essentials (Learn AWS Cloud Basic)',
      issuer: 'Dicoding Indonesia',
      year: '2025',
      link: '#'
    },
    {
      title: 'Learn Machine Learning for Beginners',
      issuer: 'Dicoding Indonesia',
      year: '2024',
      link: '#'
    },
    {
      title: 'English Speaking Intensive 1 - Level A1 (Excellent)',
      issuer: 'WECAMP English Village',
      year: '2023',
      link: '#'
    },
    {
      title: 'Tax Brevet Training AB + e-SPT',
      issuer: 'Centre for Accounting Development, Universitas Indonesia',
      year: '2023',
      link: '#'
    },
    {
      title: 'Start Programming with Python',
      issuer: 'Dicoding Indonesia',
      year: '2023',
      link: '#'
    },
    {
      title: 'Learn JavaScript Programming Basics',
      issuer: 'Dicoding Indonesia',
      year: '2023',
      link: '#'
    },
    {
      title: 'Learn Basic Structured Query Language (SQL)',
      issuer: 'Dicoding Indonesia',
      year: '2023',
      link: '#'
    },
    {
      title: 'Learn DevOps Basics',
      issuer: 'Dicoding Indonesia',
      year: '2023',
      link: '#'
    },
    {
      title: 'Starting Basic Programming to Become a Software Developer',
      issuer: 'Dicoding Indonesia',
      year: '2023',
      link: '#'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
    }
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const revealImage: Variants = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    show: {
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative flex flex-col pt-16 md:pt-24 px-8 md:px-16 pb-24 min-h-[calc(100vh-116px)] bg-white overflow-hidden"
    >
      {/* ========================================== */}
      {/* BACKGROUND TEXTURES */}
      {/* ========================================== */}
      <div
        className="absolute inset-0 pointer-events-none -z-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(circle at top center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at top center, black 40%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="w-full max-w-[1400px] mx-auto relative z-10">

        {/* ========================================== */}
        {/* ABOUT ME SECTION */}
        {/* ========================================== */}
        <div className="flex flex-col-reverse xl:flex-row gap-12 xl:gap-24 items-center xl:items-start mb-24">

          {/* LEFT: IMAGE PROFILE */}
          <motion.div
            variants={itemVariants}
            className="w-full xl:w-4/12 flex justify-center xl:justify-start xl:pl-4"
          >
            <div className="relative z-10 group cursor-pointer w-full max-w-[240px] md:max-w-[280px]">
              {/* Green Offset Shadow */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 w-full h-full bg-[#5E7657] rounded-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 -z-10" />

              {/* Main Image */}
              <motion.div
                variants={revealImage}
                className="w-full aspect-[4/5] overflow-hidden bg-gray-50 rounded-2xl border border-black/5 shadow-sm relative"
              >
                <img
                  src="/images/ictures.jpg"
                  alt="Aditya Nugraha Irwan"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.backgroundColor = '#f8f9fa';
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: TYPOGRAPHY & TEXT */}
          <div className="w-full xl:w-8/12 flex flex-col pt-4 xl:pt-8">
            <h1 className="pointer-events-none select-none font-lejour font-normal text-6xl md:text-[96px] leading-[0.9] tracking-tight text-[#2A2320] mb-8">
              <div className="pb-2 md:pb-3">
                <Typewriter text="About" />
              </div>
              <div className="text-[#5E7657]">
                <Typewriter text="Me" delay={0.3} />
              </div>
            </h1>

            <motion.div
              variants={lineVariants}
              className="w-16 md:w-24 border-t-[1.5px] border-[#5E7657] mb-10"
            />

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 w-full max-w-2xl"
            >
              {/*[cite: 1] Deskripsi disesuaikan dengan profil CV */}
              <p className="font-poppins text-lg md:text-[20px] leading-relaxed text-gray-500 font-light text-justify">
                Hi, I'm Aditya! I enjoy turning ideas into interactive and user-friendly web applications. My main focus is frontend development using React and TypeScript, where I love creating clean interfaces and smooth user experiences.
              </p>

              <p className="font-poppins text-lg md:text-[20px] leading-relaxed text-gray-500 font-light text-justify">
                I also have experience working with AWS S3, building automation tools, and exploring machine learning projects with Python. I'm always excited to learn new technologies and solve real-world problems through software, whether it's developing web applications, automation solutions, or AI-powered projects.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION DIVIDER */}
        {/* ========================================== */}
        <motion.div
          variants={lineVariants}
          className="w-full border-t border-black/[0.08] mb-16 md:mb-20"
        />

        {/* ========================================== */}
        {/* EDUCATION & CERTIFICATES */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24">

          {/* EDUCATION COLUMN */}
          <div className="flex flex-col items-start w-full">
            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "'The Seasons Italic', serif" }}
              className="text-4xl md:text-[44px] tracking-tight text-[#2A2320] mb-10"
            >
              Education
            </motion.h2>

            <div className="flex flex-col gap-6 w-full">
              {education.map((edu) => (
                <motion.div
                  variants={itemVariants}
                  key={edu.degree}
                  className="w-full"
                >
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group bg-white rounded-3xl border border-black/5 hover:border-black/10 p-7 md:p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Animated side border line */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5E7657] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />

                    <span className="font-telegraf text-xs text-gray-400 tracking-widest uppercase mb-3 block">
                      {edu.period}
                    </span>

                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-poppins font-semibold text-xl md:text-2xl text-[#2A2320] group-hover:text-[#5E7657] transition-colors pr-4">
                        {edu.degree}
                      </h3>
                      
                      {/* PANAH DI SINI DIBUAT HIDE SAAT IDLE, MUNCUL SAAT HOVER */}
                      <span className="text-xl text-[#5E7657] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        ↗
                      </span>
                    </div>

                    <p className="font-poppins text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider mb-2">
                      {edu.school}
                    </p>

                    <p className="font-google text-xs text-gray-500 uppercase tracking-wider mb-5">
                      GPA:{' '}
                      <span className="font-bold text-gray-700">
                        {edu.gpa}
                      </span>{' '}
                      / 4.00
                    </p>

                    <div className="w-full border-t border-black/5 my-5" />

                    <p className="font-poppins text-sm text-gray-500 font-light leading-relaxed">
                      {edu.details}
                    </p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CERTIFICATES COLUMN */}
          <div className="flex flex-col items-start w-full">
            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "'The Seasons Italic', serif" }}
              className="text-4xl md:text-[44px] tracking-tight text-[#2A2320] mb-10"
            >
              Certificates
            </motion.h2>

            <div className="flex flex-col w-full border-t border-black/[0.08]">
              {certificates.map((cert) => (
                <motion.div
                  variants={itemVariants}
                  key={cert.title}
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center border-b border-black/[0.08] py-6 group hover:border-black/30 transition-colors duration-300"
                  >
                    <div className="flex flex-col pr-6 transform group-hover:translate-x-2 transition-transform duration-300 ease-out">
                      <h3 className="font-poppins font-semibold text-sm md:text-base text-[#2A2320] group-hover:text-[#5E7657] transition-colors mb-1.5">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="font-poppins text-[11px] md:text-xs text-gray-500 uppercase tracking-widest font-light">
                          {cert.issuer}
                        </p>
                        <span className="text-gray-300 group-hover:text-[#5E7657] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-sm">
                          ↗
                        </span>
                      </div>
                    </div>

                    <span className="font-telegraf text-xs md:text-sm text-gray-400 whitespace-nowrap pl-2">
                      {cert.year}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;