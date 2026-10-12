import { motion } from 'framer-motion';
import {
  IconBrowser,
  IconDeviceMobile,
  IconCode,
  IconBrain,
  IconDatabase,
  IconServer,
  IconRobot,
  IconGitBranch,
  IconBolt,
  IconFileTypeCsv,
  IconHandFinger,
  IconIcons,
  IconRoute,
  IconHammer,
  IconSoup,
  IconMouse,
  IconApi,
  IconFileText,
  IconChartDots,
  IconTags,
  IconAbc,
  IconEye,
  type Icon as TablerIcon,
} from '@tabler/icons-react';
import {
  SiReact, SiTypescript, SiJavascript, SiPython, SiHtml5, SiCss,
  SiExpo, SiTailwindcss, SiFramer, SiFastapi, SiScikitlearn,
  SiPandas, SiSelenium, SiGit, SiGithub, SiBun, SiNpm, SiVite, SiEslint,
  SiJson, SiLucide, SiNumpy, SiReactrouter,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import type { IconType } from 'react-icons';
import { fadeUp, scaleIn, staggerContainer } from '../../utils/animations';

interface Skill {
  name: string;
  icon: IconType | TablerIcon;
  color: string;
}

interface SkillCard {
  id: string;
  span: string;
  CategoryIcon: TablerIcon;
  title: string;
  description: string;
  skills: readonly Skill[];
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverShadow: string;
  iconBg: string;
  titleColor: string;
  descColor: string;
  pillBg: string;
  pillHover: string;
  glow: string;
}

const SKILLS_DATA: readonly SkillCard[] = [
  // Frontend (Web)
  {
    id: 'frontend',
    span: 'md:col-span-6',
    CategoryIcon: IconBrowser,
    title: 'Frontend Developer',
    description: 'Used for personal projects and internal company systems such as LMS, Job Portal, and HRIS.',
    skills: [
      { name: 'HTML5',         icon: SiHtml5,       color: '#E34F26' },
      { name: 'CSS3',          icon: SiCss,         color: '#1572B6' },
      { name: 'React.js',      icon: SiReact,       color: '#61DAFB' },
      { name: 'Vite',          icon: SiVite,        color: '#646CFF' },
      { name: 'TypeScript',    icon: SiTypescript,  color: '#3178C6' },
      { name: 'Tailwind CSS',  icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: SiFramer,      color: '#0055FF' },
      { name: 'React Router',  icon: SiReactrouter, color: '#CA4245' },
      { name: 'Lucide React',  icon: SiLucide,      color: '#F56565' },
    ],
    cardBg: 'bg-linear-to-br from-[#FFF7ED] to-[#FFEDD5]',
    cardBorder: 'border-[#FDBA74]/60',
    hoverBorder: 'hover:border-[#F97316]',
    hoverShadow: 'hover:shadow-[#F97316]/20',
    iconBg: 'bg-linear-to-br from-[#F97316] to-[#EA580C]',
    titleColor: 'text-[#7C2D12]',
    descColor: 'text-[#9A3412]/80',
    pillBg: 'bg-white/85 border-[#FDBA74]/60 text-[#7C2D12]',
    pillHover: 'hover:bg-[#F97316] hover:text-white hover:border-[#F97316]',
    glow: 'from-[#F97316]/30',
  },

  // Mobile App (Lenvry)
  {
    id: 'mobile',
    span: 'md:col-span-6',
    CategoryIcon: IconDeviceMobile,
    title: 'Mobile App',
    description: 'Development environment utilized for building my personal mobile application, Lenvry.',
    skills: [
      { name: 'React Native',    icon: SiReact,             color: '#61DAFB' },
      { name: 'Expo Go',         icon: SiExpo,              color: '#000000' },
      { name: 'Expo Router',     icon: IconRoute,           color: '#000000' },
      { name: 'Reanimated v4',   icon: TbBrandFramerMotion, color: '#0055FF' },
      { name: 'Gesture Handler', icon: IconHandFinger,      color: '#61DAFB' },
      { name: 'Vector Icons',    icon: IconIcons,           color: '#61DAFB' },
      { name: 'EAS Build',       icon: IconHammer,          color: '#000000' },
    ],
    cardBg: 'bg-linear-to-br from-[#ECFEFF] to-[#CFFAFE]',
    cardBorder: 'border-[#67E8F9]/60',
    hoverBorder: 'hover:border-[#06B6D4]',
    hoverShadow: 'hover:shadow-[#06B6D4]/20',
    iconBg: 'bg-linear-to-br from-[#06B6D4] to-[#0891B2]',
    titleColor: 'text-[#164E63]',
    descColor: 'text-[#155E75]/80',
    pillBg: 'bg-white/85 border-[#67E8F9]/60 text-[#164E63]',
    pillHover: 'hover:bg-[#06B6D4] hover:text-white hover:border-[#06B6D4]',
    glow: 'from-[#06B6D4]/30',
  },

  // Programming Languages
  {
    id: 'languages',
    span: 'md:col-span-5',
    CategoryIcon: IconCode,
    title: 'Programming Languages',
    description: 'Primary programming languages actively used across various ongoing projects.',
    skills: [
      { name: 'Python',     icon: SiPython,     color: '#3776AB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    ],
    cardBg: 'bg-linear-to-br from-[#EEF2FF] to-[#E0E7FF]',
    cardBorder: 'border-[#C7D2FE]/60',
    hoverBorder: 'hover:border-[#6366F1]',
    hoverShadow: 'hover:shadow-[#6366F1]/20',
    iconBg: 'bg-linear-to-br from-[#6366F1] to-[#4F46E5]',
    titleColor: 'text-[#312E81]',
    descColor: 'text-[#3730A3]/80',
    pillBg: 'bg-white/85 border-[#C7D2FE]/60 text-[#312E81]',
    pillHover: 'hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1]',
    glow: 'from-[#6366F1]/30',
  },

  // Backend & API
  {
    id: 'backend',
    span: 'md:col-span-7',
    CategoryIcon: IconDatabase,
    title: 'Backend & API',
    description: 'Exploratory technologies and APIs implemented in the Genre Game Classifier project.',
    skills: [
      { name: 'FastAPI',   icon: SiFastapi,  color: '#009688' },
      { name: 'Uvicorn',   icon: IconBolt,   color: '#F97316' },
      { name: 'REST APIs', icon: IconApi,    color: '#F97316' },
    ],
    cardBg: 'bg-linear-to-br from-[#FDF2F8] to-[#FCE7F3]',
    cardBorder: 'border-[#FBCFE8]/60',
    hoverBorder: 'hover:border-[#EC4899]',
    hoverShadow: 'hover:shadow-[#EC4899]/20',
    iconBg: 'bg-linear-to-br from-[#EC4899] to-[#DB2777]',
    titleColor: 'text-[#831843]',
    descColor: 'text-[#9D174D]/80',
    pillBg: 'bg-white/85 border-[#FBCFE8]/60 text-[#831843]',
    pillHover: 'hover:bg-[#EC4899] hover:text-white hover:border-[#EC4899]',
    glow: 'from-[#EC4899]/30',
  },

  // AI / ML & NLP
  {
    id: 'ai',
    span: 'md:col-span-7',
    CategoryIcon: IconBrain,
    title: 'AI / ML & NLP',
    description: 'Applied in the Genre Game Classifier project and studied extensively during my Master\'s education.',
    skills: [
      { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Pandas',       icon: SiPandas,      color: '#150458' },
      { name: 'NumPy',        icon: SiNumpy,       color: '#013243' },
      { name: 'TF-IDF',       icon: IconFileText,  color: '#10B981' },
      { name: 'Naive Bayes',  icon: IconChartDots, color: '#10B981' },
      { name: 'MultiLabel',   icon: IconTags,      color: '#10B981' },
      { name: 'NLTK',         icon: IconAbc,       color: '#10B981' },
      { name: 'XAI',          icon: IconEye,       color: '#10B981' },
    ],
    cardBg: 'bg-linear-to-br from-[#ECFDF5] to-[#D1FAE5]',
    cardBorder: 'border-[#A7F3D0]/60',
    hoverBorder: 'hover:border-[#10B981]',
    hoverShadow: 'hover:shadow-[#10B981]/20',
    iconBg: 'bg-linear-to-br from-[#10B981] to-[#059669]',
    titleColor: 'text-[#064E3B]',
    descColor: 'text-[#065F46]/80',
    pillBg: 'bg-white/85 border-[#A7F3D0]/60 text-[#064E3B]',
    pillHover: 'hover:bg-[#10B981] hover:text-white hover:border-[#10B981]',
    glow: 'from-[#10B981]/30',
  },

  // State & Storage
  {
    id: 'state',
    span: 'md:col-span-5',
    CategoryIcon: IconServer,
    title: 'State & Storage',
    description: 'Offline-first architecture and persistent data across platforms.',
    skills: [
      { name: 'AsyncStorage', icon: IconDatabase,    color: '#61DAFB' },
      { name: 'CSV Files',    icon: IconFileTypeCsv, color: '#10B981' },
      { name: 'JSON',         icon: SiJson,          color: '#000000' },
    ],
    cardBg: 'bg-linear-to-br from-[#F0F9FF] to-[#E0F2FE]',
    cardBorder: 'border-[#BAE6FD]/60',
    hoverBorder: 'hover:border-[#0EA5E9]',
    hoverShadow: 'hover:shadow-[#0EA5E9]/20',
    iconBg: 'bg-linear-to-br from-[#0EA5E9] to-[#0284C7]',
    titleColor: 'text-[#0C4A6E]',
    descColor: 'text-[#075985]/80',
    pillBg: 'bg-white/85 border-[#BAE6FD]/60 text-[#0C4A6E]',
    pillHover: 'hover:bg-[#0EA5E9] hover:text-white hover:border-[#0EA5E9]',
    glow: 'from-[#0EA5E9]/30',
  },

  // Automation
  {
    id: 'automation',
    span: 'md:col-span-6',
    CategoryIcon: IconRobot,
    title: 'Automation',
    description: 'Utilized for personal web scraping projects and desktop automation to streamline operational server monitoring at work.',
    skills: [
      { name: 'Selenium',      icon: SiSelenium, color: '#43B02A' },
      { name: 'BeautifulSoup', icon: IconSoup,   color: '#3776AB' },
      { name: 'PyAutoGUI',     icon: IconMouse,  color: '#3776AB' },
    ],
    cardBg: 'bg-linear-to-br from-[#F5F3FF] to-[#EDE9FE]',
    cardBorder: 'border-[#DDD6FE]/60',
    hoverBorder: 'hover:border-[#8B5CF6]',
    hoverShadow: 'hover:shadow-[#8B5CF6]/20',
    iconBg: 'bg-linear-to-br from-[#8B5CF6] to-[#7C3AED]',
    titleColor: 'text-[#4C1D95]',
    descColor: 'text-[#5B21B6]/80',
    pillBg: 'bg-white/85 border-[#DDD6FE]/60 text-[#4C1D95]',
    pillHover: 'hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6]',
    glow: 'from-[#8B5CF6]/30',
  },

  // Tools & Workflow
  {
    id: 'tools',
    span: 'md:col-span-6',
    CategoryIcon: IconGitBranch,
    title: 'Tools & Workflow',
    description: 'Version control, bundlers, package managers, and development workflow configurations.',
    skills: [
      { name: 'Git',    icon: SiGit,        color: '#F05032' },
      { name: 'GitHub', icon: SiGithub,     color: '#181717' },
      { name: 'Bun',    icon: SiBun,        color: '#000000' },
      { name: 'npm',    icon: SiNpm,        color: '#CB3837' },
      { name: 'Vite',   icon: SiVite,       color: '#646CFF' },
      { name: 'ESLint', icon: SiEslint,     color: '#4B32C3' },
      { name: 'tsc',    icon: SiTypescript, color: '#3178C6' },
    ],
    cardBg: 'bg-linear-to-br from-[#FFFBEB] to-[#FEF3C7]',
    cardBorder: 'border-[#FDE68A]/60',
    hoverBorder: 'hover:border-[#F59E0B]',
    hoverShadow: 'hover:shadow-[#F59E0B]/20',
    iconBg: 'bg-linear-to-br from-[#F59E0B] to-[#D97706]',
    titleColor: 'text-[#78350F]',
    descColor: 'text-[#92400E]/80',
    pillBg: 'bg-white/85 border-[#FDE68A]/60 text-[#78350F]',
    pillHover: 'hover:bg-[#F59E0B] hover:text-white hover:border-[#F59E0B]',
    glow: 'from-[#F59E0B]/30',
  },
];

const VIEWPORT = { once: true, margin: '-10px' } as const;

const Skills = () => (
  <section
    id="skills"
    tabIndex={-1}
    aria-labelledby="skills-heading"
    className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline outline-none"
  >
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="mb-14 md:mb-20"
      >
        <h2
          id="skills-heading"
          className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase"
        >
          Technical <br />
          Skills.
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
      >
        {SKILLS_DATA.map((card) => {
          const { CategoryIcon } = card;

          return (
            <motion.li
              key={card.id}
              variants={scaleIn}
              className={`${card.span} ${card.cardBg} ${card.cardBorder} ${card.hoverBorder} ${card.hoverShadow}
                group relative flex flex-col overflow-hidden rounded-3xl border-2 p-6 sm:p-7 md:p-8
                transition-[translate,box-shadow,border-color] duration-300 motion-reduce:transition-none
                hover:-translate-y-1.5 hover:shadow-2xl`}
            >
              {/* Background watermark */}
              <div
                aria-hidden="true"
                className="absolute -bottom-12 -right-12 opacity-[0.08] group-hover:opacity-[0.16] group-hover:scale-110 transition-[opacity,scale] duration-700 motion-reduce:transition-none pointer-events-none"
              >
                <CategoryIcon size={260} strokeWidth={1.2} className={card.titleColor} />
              </div>

              {/* Corner glow */}
              <div
                aria-hidden="true"
                className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-radial ${card.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none pointer-events-none`}
              />

              {/* Category icon */}
              <div className="relative z-10 mb-6">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 ${card.iconBg} text-white rounded-2xl flex items-center justify-center shadow-xl transition-[scale,rotate] duration-300 motion-reduce:transition-none group-hover:scale-110 group-hover:rotate-3`}
                >
                  <CategoryIcon size={36} strokeWidth={2} aria-hidden className="size-9 md:size-10" />
                </div>
              </div>

              {/* Title + description */}
              <div className="relative z-10 mb-5">
                <h3
                  className={`text-[22px] md:text-[26px] font-bold ${card.titleColor} tracking-[-0.02em] mb-1.5`}
                >
                  {card.title}
                </h3>
                <p className={`text-[14px] md:text-[15px] leading-[1.6] ${card.descColor}`}>
                  {card.description}
                </p>
              </div>

              {/* Skill pills */}
              <ul className="relative z-10 flex flex-wrap gap-2 mt-auto pt-5">
                {card.skills.map(({ name, icon: SkillIcon, color }) => (
                  <li
                    key={name}
                    className={`group/pill inline-flex items-center gap-2 px-3 py-2
                      ${card.pillBg} ${card.pillHover}
                      rounded-xl text-[12px] md:text-[13px] font-semibold
                      border-2 shadow-sm cursor-default
                      transition-[background-color,color,border-color] duration-200 motion-reduce:transition-none`}
                  >
                    <SkillIcon
                      size={18}
                      aria-hidden
                      style={{ color }}
                      className="shrink-0 transition-[filter] duration-200 motion-reduce:transition-none group-hover/pill:brightness-0 group-hover/pill:invert"
                    />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  </section>
);

export default Skills;