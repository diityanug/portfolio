import { motion } from 'framer-motion';
import { containerVariants, popUpVariants, lineGrowVariants } from '@utils/animation';
import { ExperienceItem } from '../components/experiencePage/ExperienceCard';
import type { ExperienceData } from '../components/experiencePage/ExperienceCard';

/* MAIN DATA */
const experiences: ExperienceData[] = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'LG Sinarmas',
    location: 'Central Jakarta, Indonesia',
    period: 'June 2025 — Present',
    logo: '/LG_Sinarmas_Logo_Vector.svg',
    tags: ['React', 'TypeScript', 'AWS S3', 'RBAC', 'LMS', 'HRIS', 'Battery Manufacturing', 'Equipment Modeling', 'MCCS Configuration'],
    description: (
      <div className="flex flex-col gap-4">
        <p>
          Contributing to the smart manufacturing ecosystem through two core roles — autonomous process control and fault detection —while also involved in internal software development covering resource management and organizational learning systems.
        </p>
      </div>
    ),
    contributions: [
      {
        system: "APC (Autonomous Process Control)",
        points: [
          "Equipment modeling and integration using the Factova platform",
          "Anomaly and alarm analysis across manufacturing processes",
          "Machine failure validation to ensure operational reliability",
          "MCCS configuration management across eight production sites"
        ]
      },
      {
        system: "FDC (Fault Detection and Classification)",
        points: [
          "User access administration within the FDC system",
          "Assigning and adjusting user roles — from not available and view only to engineer — based on each user's needs and requests"
        ]
      },
      {
        system: "HRIS (Human Resource Information System)",
        points: [
          "Developed asset management features to streamline internal resource tracking",
          "Integrated secure cloud storage modules using AWS S3",
          "Implemented precise Role-Based Access Control (RBAC) navigation"
        ]
      },
      {
        system: "LMS (Learning Management System)",
        points: [
          "Maintained internal learning systems through proactive bug fixing and codebase refactoring",
          "Optimized application state and interface reliability to ensure seamless training delivery"
        ]
      }
    ],
    culture: [
      {
        id: 1,
        title: "Sport - Futsal",
        image: "/images/culture-synergy.jpg",
        description: "Engaging in routine technical alignments and cross-cultural engineering syncs with core engineering teams based in South Korea."
      },
      {
        id: 2,
        title: "The Growth Circuit in Motion",
        image: "/images/culture-mentorship.jpg",
        description: "Participating in internal tech talks, architectural review boards, and collaborative bonding initiatives to foster strong engineering practices."
      }
    ]
  },
];

/* MAIN PAGE */
const ExperiencePage = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative z-0 flex flex-col pt-16 md:pt-24 px-8 md:px-16 pb-28 min-h-[calc(100vh-116px)] bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto relative z-10">
        
        {/* MAIN HEADER */}
        <motion.div variants={containerVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mb-16 md:mb-20">
          <div className="flex flex-col">
            <motion.h1 variants={popUpVariants} className="font-lejour font-normal leading-[0.9] tracking-tight text-[#1a1a1a] select-none pointer-events-none text-[56px] md:text-[80px] lg:text-[96px] pb-1 md:pb-2">
              Work
            </motion.h1>
            <motion.h1 variants={popUpVariants} className="font-lejour font-normal leading-[0.9] tracking-tight text-[#5E7657] select-none pointer-events-none text-[56px] md:text-[80px] lg:text-[96px]">
              Experience
            </motion.h1>
            
            {/* // Decorative Line */}
            <motion.div variants={lineGrowVariants} className="w-12 md:w-16 h-[1px] bg-[#5E7657] mt-6" />
          </div>
          
          {/* // Subtitle */}
          <motion.div variants={popUpVariants} className="flex flex-col items-start md:items-end gap-3 pb-1">
            <p className="font-poppins text-[10px] tracking-[0.22em] uppercase text-gray-400 font-light max-w-[180px] text-left md:text-right leading-loose">
              A timeline of my professional journey.
            </p>
          </motion.div>
        </motion.div>

        {/* MAIN EXPERIENCE LIST */}
        <motion.div variants={containerVariants} className="flex flex-col">
          
          {/* // Top Divider */}
          <motion.div variants={lineGrowVariants} className="w-full h-[1px] bg-black/10" />

          {/* // Experience Cards Iteration */}
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={popUpVariants}>
              <ExperienceItem exp={exp} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExperiencePage;