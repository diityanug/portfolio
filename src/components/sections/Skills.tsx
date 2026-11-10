import { motion } from 'framer-motion';
import {
  IconBrowser,
  IconDeviceMobile,
  IconBrain,
  IconServer,
  IconFileText,
  IconApi,
  type Icon as TablerIcon,
} from '@tabler/icons-react';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiExpo,
  SiSqlite,
  SiPython,
  SiGooglegemini,
  SiScikitlearn,
  SiPandas,
  SiFastapi,
  SiSelenium,
  SiGithub,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import type { IconType } from 'react-icons';
import { fadeUp, staggerContainer } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';
import BackgroundShape from '../ui/BackgroundShape';

interface Skill {
  name: string;
  icon: IconType | TablerIcon;
  color: string;
}

interface SkillSpec {
  id: string;
  title: string;
  CategoryIcon: TablerIcon;
  skills: readonly Skill[];
}

const SKILL_SPECS: readonly SkillSpec[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    CategoryIcon: IconBrowser,
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    id: 'android',
    title: 'Android Development',
    CategoryIcon: IconDeviceMobile,
    skills: [
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Expo', icon: SiExpo, color: '#000000' },
      { name: 'Reanimated', icon: TbBrandFramerMotion, color: '#0055FF' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning & NLP',
    CategoryIcon: IconBrain,
    skills: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Google Gemini', icon: SiGooglegemini, color: '#8E75FF' },
      { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
      { name: 'NLP', icon: IconFileText, color: '#059669' },
    ],
  },
  {
    id: 'backend-tools',
    title: 'Backend, Automation & Tools',
    CategoryIcon: IconServer,
    skills: [
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'RESTful APIs', icon: IconApi, color: '#F97316' },
      { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
      { name: 'Git & GitHub', icon: SiGithub, color: '#181717' },
    ],
  },
];

const VIEWPORT = { once: true, margin: '-10px' } as const;

const Skills = () => (
  <section
    id="skills"
    tabIndex={-1}
    aria-labelledby="skills-heading"
    className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#ffffff] relative z-10 overflow-hidden border-t border-[#e5e7eb] outline-none"
  >
    <BackgroundShape
      initialIndex={0}
      strokeClassName="stroke-[#111111]/[0.04]"
      className="right-[-28vw] top-[4vh] w-[72vw] h-[72vw] md:right-[-15vw] md:top-[6vh] md:w-[48vw] md:h-[48vw]"
    />
    <div className="max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="mb-14 md:mb-20"
      >
        <ScrollFillHeading
          id="skills-heading"
          line1="Technical"
          line2="Skills."
        />
      </motion.div>

      {/* Editorial Spec Sheet (Border-Free List) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
        className="border-t border-b border-[#e5e7eb] divide-y divide-[#e5e7eb]"
      >
        {SKILL_SPECS.map((spec) => {
          const { CategoryIcon } = spec;

          return (
            <motion.div
              key={spec.id}
              variants={fadeUp}
              className="group py-7 sm:py-9 lg:py-11 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 lg:gap-10 transition-colors duration-300"
            >
              {/* Left Column: Category Title & Icon */}
              <div className="flex items-center gap-3.5 min-w-fit">
                <CategoryIcon
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden
                  className="text-[#6b7280] group-hover:text-[#111111] transition-colors duration-300 shrink-0"
                />
                <h3 className="text-xl sm:text-2xl md:text-[25px] font-semibold text-[#111111] tracking-tight transition-colors duration-300">
                  {spec.title}
                </h3>
              </div>

              {/* Right Column: Skill Tokens */}
              <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:justify-end">
                {spec.skills.map(({ name, icon: SkillIcon, color }) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] md:text-sm font-medium bg-[#ffffff] border border-[#e5e7eb] shadow-2xs hover:border-[#111111]/30 hover:shadow-xs text-[#111111] transition-all duration-200 cursor-default hover:-translate-y-0.5"
                  >
                    <SkillIcon
                      size={17}
                      aria-hidden
                      style={{ color }}
                      className="shrink-0 transition-transform duration-200"
                    />
                    <span className="font-medium tracking-tight">{name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Skills;
