import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const AboutPage = () => {
  const education = [
    {
      degree: 'Bachelor of Accounting',
      school: 'Tadulako University',
      period: '2017 - 2022',
      gpa: '3.71',
      details: 'Focused on Financial Accounting and Taxation.',
      link: 'https://drive.google.com/...'
    },
    {
      degree: 'Master of Computer Science',
      school: 'President University',
      period: '2023 - 2025',
      gpa: '3.64',
      details: 'Focused on Business Intelligence.',
      link: 'https://drive.google.com/...'
    }
  ];

  const certificates = [
    {
      title: 'Team Agility through Agile Ways of Working',
      issuer: 'Agile Academy Indonesia',
      year: '2025',
      link: 'link to certificate'
    },
    {
      title: 'React Advanced Patterns',
      issuer: 'Frontend Masters',
      year: '2024',
      link: 'https://frontendmasters.com/...'
    },
    {
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      year: '2023',
      link: 'https://www.scrum.org/...'
    }
  ];

  // --- ANIMATION VARIANTS ---
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
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  const lineVariants: Variants = {
    hidden: {
      scaleX: 0,
      originX: 0
    },
    show: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const revealImage: Variants = {
    hidden: {
      clipPath: 'inset(100% 0 0 0)'
    },
    show: {
      clipPath: 'inset(0% 0 0 0)',
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col pt-16 md:pt-20 px-8 md:px-16 pb-24 min-h-[calc(100vh-116px)] bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">

        {/* ABOUT ME */}

        <div className="flex flex-col-reverse xl:flex-row gap-12 xl:gap-20 items-center xl:items-start mb-24">

          {/* LEFT */}

          <motion.div
            variants={itemVariants}
            className="w-full xl:w-4/12 flex justify-center xl:justify-start xl:pl-8"
          >
            <div className="relative z-10 group cursor-pointer w-full max-w-[220px] md:max-w-[260px] xl:max-w-[280px]">

              <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 w-full h-full bg-[#5E7657] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 -z-10" />

              <motion.div
                variants={revealImage}
                className="w-full aspect-[4/5] overflow-hidden bg-gray-50 border border-black/5 shadow-sm relative"
              >
                <img
                  src="/images/ictures.jpg"
                  alt="Aditya Nugraha Irwan"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT */}

          <div className="w-full xl:w-8/12 flex flex-col pt-4">

            <h1 className="pointer-events-none select-none font-lejour font-normal text-6xl md:text-[82px] leading-[0.9] tracking-tight text-[#2A2320] mb-8">
              <div className="pb-3">
                <Typewriter text="About" />
              </div>

              <div>
                <Typewriter text="Me" delay={0.3} />
              </div>
            </h1>

            <motion.div
              variants={lineVariants}
              className="w-24 border-t-2 border-black/30 mb-8"
            />

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-6 w-full max-w-2xl"
            >
              <p className="font-poppins text-lg md:text-xl leading-relaxed text-gray-700 font-light text-justify">
                aku adalah sipaling palah
              </p>

              <p className="font-poppins text-lg md:text-xl leading-relaxed text-gray-700 font-light text-justify">
                nah ini gatau nih mau nulis apa.
              </p>
            </motion.div>

          </div>
        </div>

        {/* DIVIDER */}

        <motion.div
          variants={lineVariants}
          className="w-full border-t border-black/10 mb-16"
        />

        {/* EDUCATION & CERTIFICATES */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24">

          {/* EDUCATION */}

          <div className="flex flex-col items-start w-full">

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "'The Seasons Italic', serif" }}
              className="text-4xl md:text-5xl tracking-tight text-[#2A2320] mb-10"
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
                    className="block group bg-white border border-black/5 hover:border-black/20 p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >

                    <div className="absolute top-0 left-0 w-1 h-full bg-[#5E7657] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />

                    <span className="font-telegraf text-xs text-gray-400 tracking-widest uppercase mb-2 block">
                      {edu.period}
                    </span>

                    <div className="flex justify-between items-start mb-3">

                      <h3 className="font-poppins font-bold text-xl md:text-2xl text-[#2A2320] group-hover:text-[#5E7657] transition-colors">
                        {edu.degree}
                      </h3>

                      <span className="text-xl text-gray-300 group-hover:text-[#5E7657] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                        ↗
                      </span>

                    </div>

                    <p className="font-poppins text-sm md:text-base text-gray-500 font-medium uppercase tracking-wider mb-2">
                      {edu.school}
                    </p>

                    <p className="font-google text-xs text-gray-500 uppercase tracking-wider mb-4">
                      GPA:
                      {' '}
                      <span className="font-bold text-gray-700">
                        {edu.gpa}
                      </span>
                      {' '}
                      / 4.00
                    </p>

                    <div className="w-full border-t border-black/10 my-4" />

                    <p className="font-poppins text-sm text-gray-500 font-light leading-relaxed">
                      {edu.details}
                    </p>

                  </a>
                </motion.div>
              ))}

            </div>
          </div>

          {/* CERTIFICATES */}

          <div className="flex flex-col items-start w-full">

            <motion.h2
              variants={itemVariants}
              style={{ fontFamily: "'The Seasons Italic', serif" }}
              className="text-4xl md:text-5xl tracking-tight text-[#2A2320] mb-10"
            >
              Certificates
            </motion.h2>

            <div className="flex flex-col w-full">

              {certificates.map((cert) => (
                <motion.div
                  variants={itemVariants}
                  key={cert.title}
                >
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center border-b border-black/10 py-5 group hover:border-black transition-colors duration-300"
                  >

                    <div className="flex flex-col pr-6 transform group-hover:translate-x-2 transition-transform duration-300 ease-out">

                      <h3 className="font-poppins font-bold text-base md:text-lg text-[#2A2320] group-hover:text-[#5E7657] transition-colors mb-1">
                        {cert.title}
                      </h3>

                      <div className="flex items-center gap-2">

                        <p className="font-poppins text-xs text-gray-500 uppercase tracking-widest font-light">
                          {cert.issuer}
                        </p>

                        <span className="text-gray-300 group-hover:text-[#5E7657] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-sm">
                          ↗
                        </span>

                      </div>
                    </div>

                    <span className="font-telegraf text-xs md:text-sm text-gray-400 whitespace-nowrap">
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