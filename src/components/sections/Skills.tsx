import type { ComponentType } from 'react';
import { motion, type Variants } from 'framer-motion';
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SkillItem {
  name: string;
  icon: IconType | TablerIcon | ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface SkillGroup {
  id: string;
  title: string;
  categoryIcon: TablerIcon;
  skills: readonly SkillItem[];
}

const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    categoryIcon: IconBrowser,
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
    categoryIcon: IconDeviceMobile,
    skills: [
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Expo', icon: SiExpo, color: '#111111' },
      { name: 'Reanimated', icon: TbBrandFramerMotion, color: '#0055FF' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning & NLP',
    categoryIcon: IconBrain,
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
    categoryIcon: IconServer,
    skills: [
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'RESTful APIs', icon: IconApi, color: '#F97316' },
      { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
      { name: 'Git & GitHub', icon: SiGithub, color: '#181717' },
    ],
  },
];

const VIEWPORT = { once: true, margin: '-10px' } as const;

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
      staggerChildren: 0.03,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

const Skills = () => {
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-heading"
      className="pt-20 md:pt-28 pb-24 md:pb-32 px-4 md:px-8 bg-[#ffffff] relative z-10 overflow-hidden border-t border-[#e5e7eb] outline-none"
    >
      <BackgroundShape
        initialIndex={0}
        strokeClassName="stroke-[#111111]/[0.04]"
        className="right-[-28vw] top-[-8vw] w-[75vw] h-[75vw] md:right-[-12vw] md:top-[4vh] md:w-[46vw] md:h-[46vw]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
            line1="Skills &"
            line2="Technologies."
          />
        </motion.div>

        {/* Clean 2x2 Architectural Grid (Cal.com DESIGN.md - Zero Pills) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {SKILL_GROUPS.map((group) => {
            const CategoryIcon = group.categoryIcon;
            return (
              <motion.div
                key={group.id}
                variants={groupVariants}
                className="rounded-2xl bg-[#ffffff] border border-[#e5e7eb] p-6 sm:p-8 flex flex-col justify-between hover:border-[#111111]/30 transition-colors duration-200"
              >
                {/* Category Header with clean hairline divider (No pill container, no box) */}
                <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-hairline-soft">
                  <CategoryIcon size={19} strokeWidth={1.8} className="text-[#111111] shrink-0" aria-hidden />
                  <h3 className="text-base sm:text-lg font-semibold text-[#111111] tracking-tight">
                    {group.title}
                  </h3>
                </div>

                {/* Clean Typographic 2-Column Grid (Zero Pills/Capsules) */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                  {group.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={chipVariants}
                        className="group flex items-center gap-3 py-1 text-body hover:text-[#111111] transition-colors"
                      >
                        <Icon
                          className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{ color: skill.color }}
                        />
                        <span className="text-xs sm:text-sm font-medium tracking-tight truncate transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
