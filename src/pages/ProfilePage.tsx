import type { ReactElement, SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { EducationCard, CertificateRow } from '../components/profilePage/ProfileCard';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../constants/profileData';

import {
  containerVariants,
  popUpVariants,
  lineGrowVariants,
  revealImageVariants
} from '@utils/animation';

/* MAIN PAGE COMPONENT */
const ProfilePage = (): ReactElement => {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    if (target.parentElement) {
      target.parentElement.style.backgroundColor = '#f8f9fa';
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-16 md:pt-24 px-8 md:px-16 pb-24 min-h-[calc(100vh-116px)] bg-transparent overflow-hidden"
    >

      <div className="w-full max-w-[1400px] mx-auto relative z-10">

        {/* MAIN ABOUT */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col-reverse xl:flex-row gap-12 xl:gap-24 items-center xl:items-start mb-24"
        >
          {/* // Image Profile */}
          <motion.div
            variants={popUpVariants}
            className="w-full xl:w-4/12 flex justify-center xl:justify-start xl:pl-4"
          >
            <div className="relative z-10 group cursor-pointer w-full max-w-[240px] md:max-w-[280px]">
              <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 w-full h-full bg-[#5E7657] rounded-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 -z-10" />
              <motion.div
                variants={revealImageVariants}
                className="w-full aspect-[4/5] overflow-hidden bg-gray-50 rounded-2xl border border-black/5 shadow-sm relative"
              >
                <img
                  src="/images/aw aw"
                  alt="Aditya Nugraha Irwan"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-[filter] duration-700 ease-out grayscale group-hover:grayscale-0"
                  onError={handleImageError}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* // Text Content */}
          <div className="w-full xl:w-8/12 flex flex-col pt-4 xl:pt-8">
            <h1 className="pointer-events-none select-none font-lejour font-normal text-6xl md:text-[96px] leading-[0.9] tracking-tight mb-8">
              <motion.div variants={popUpVariants} className="pb-2 md:pb-3 text-[#2A2320]">
                About
              </motion.div>
              <motion.div variants={popUpVariants} className="text-[#5E7657]">
                Me
              </motion.div>
            </h1>

            <motion.div
              variants={lineGrowVariants}
              className="w-16 md:w-24 border-t-[1.5px] border-[#5E7657] mb-10"
            />

            <motion.div
              variants={popUpVariants}
              className="flex flex-col gap-6 w-full max-w-2xl"
            >
              <p className="font-poppins text-lg md:text-[20px] leading-relaxed text-gray-500 font-light text-justify">
                Hi, I'm Aditya! I enjoy turning ideas into interactive and user-friendly web applications. My main focus is frontend development using React and TypeScript, where I love creating clean interfaces and smooth user experiences.
              </p>
              <p className="font-poppins text-lg md:text-[20px] leading-relaxed text-gray-500 font-light text-justify">
                I also have experience working with AWS S3, building automation tools, and exploring machine learning projects with Python. I'm always excited to learn new technologies and solve real-world problems through software, whether it's developing web applications, automation solutions, or AI-powered projects.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* MAIN DIVIDER */}
        <motion.div
          variants={lineGrowVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full border-t border-black/[0.08] mb-16 md:mb-20"
        />

        {/* MAIN EDUCATION & CERTIFICATES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24"
        >
          {/* // Education */}
          <div className="flex flex-col items-start w-full">
            <motion.h2
              variants={popUpVariants}
              style={{ fontFamily: "'The Seasons Italic', serif" }}
              className="text-4xl md:text-[44px] tracking-tight text-[#2A2320] mb-10"
            >
              Education
            </motion.h2>

            <div className="flex flex-col gap-6 w-full">
              {EDUCATION_DATA.map((edu) => (
                <motion.div key={edu.degree} variants={popUpVariants}>
                  <EducationCard {...edu} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* // Certificates */}
          <div className="flex flex-col items-start w-full">
            <motion.h2
              variants={popUpVariants}
              style={{ fontFamily: "'The Seasons Italic', serif" }}
              className="text-4xl md:text-[44px] tracking-tight text-[#2A2320] mb-10"
            >
              Certificates
            </motion.h2>

            <div className="flex flex-col w-full border-t border-black/[0.08]">
              {CERTIFICATES_DATA.map((cert) => (
                <motion.div key={cert.title} variants={popUpVariants}>
                  <CertificateRow {...cert} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;