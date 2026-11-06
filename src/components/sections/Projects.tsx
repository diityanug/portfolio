import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';
import ScrollFillHeading from '../ui/ScrollFillHeading';

interface Project {
  slug: string;
  title: string;
  category: string;
  tags: readonly string[];
  image: string;
  imageClass: string;
  canvas: string;
  frameGlow: string;
  innerBorderHover: string;
  categoryColor: string;
  titleHover: string;
  dividerBorder: string;
  btnHover: string;
}

const PROJECTS: readonly Project[] = [
  {
    slug: 'genre-game-classifier',
    title: 'Genre Game Classifier',
    category: 'Machine Learning Web App',
    tags: ['React', 'TypeScript', 'FastAPI', 'Python', 'NLP', 'Machine Learning'],
    image: '/Genre Game Cover.png',
    imageClass:
      'w-full max-w-56 h-32 sm:h-36 object-cover object-top rounded-xl shadow-md ring-1 ring-black/10',
    canvas: 'bg-linear-to-b from-[#FFE8CC] via-[#FFF2E2] to-[#FFD8A8] border-[#FDBA74]/80',
    frameGlow:
      'group-hover:border-[#F97316]/60 group-hover:shadow-[0_0_40px_-6px_rgba(249,115,22,0.3)]',
    innerBorderHover: 'group-hover:border-[#F97316]/50',
    categoryColor: 'text-[#7C2D12]/85',
    titleHover: 'group-hover:text-[#C2410C]',
    dividerBorder: 'border-[#C2410C]/12',
    btnHover: 'group-hover:bg-[#EA580C]',
  },
  {
    slug: 'lenvry',
    title: 'Lenvry',
    category: 'Mobile Application',
    tags: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'Database', 'Mobile'],
    image: '/Lenvrtt-removebg-preview.png',
    imageClass: 'h-32 sm:h-36 w-auto object-contain drop-shadow-lg',
    canvas: 'bg-linear-to-b from-[#D8F1FF] via-[#E8F7FF] to-[#BAE6FD] border-[#7DD3FC]/80',
    frameGlow:
      'group-hover:border-[#0284C7]/60 group-hover:shadow-[0_0_40px_-6px_rgba(2,132,199,0.3)]',
    innerBorderHover: 'group-hover:border-[#0284C7]/50',
    categoryColor: 'text-[#0C4A6E]/85',
    titleHover: 'group-hover:text-[#0369A1]',
    dividerBorder: 'border-[#0369A1]/12',
    btnHover: 'group-hover:bg-[#0284C7]',
  },
  {
    slug: 'reka',
    title: 'REKA',
    category: 'Personal Finance Mobile App',
    tags: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Gemini AI', 'Mobile'],
    image: '/reka-cover.png',
    imageClass: 'h-32 sm:h-36 w-auto object-contain drop-shadow-lg',
    canvas: 'bg-linear-to-b from-[#D1FAE5] via-[#E6FBF0] to-[#A7F3D0] border-[#6EE7B7]/80',
    frameGlow:
      'group-hover:border-[#059669]/60 group-hover:shadow-[0_0_40px_-6px_rgba(5,150,105,0.3)]',
    innerBorderHover: 'group-hover:border-[#059669]/50',
    categoryColor: 'text-[#064E3B]/85',
    titleHover: 'group-hover:text-[#047857]',
    dividerBorder: 'border-[#047857]/12',
    btnHover: 'group-hover:bg-[#059669]',
  },
];

const VIEWPORT = { once: true, margin: '-10px' } as const;

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Projects Section
const Projects = () => (
  <section
    id="projects"
    tabIndex={-1}
    aria-labelledby="projects-heading"
    className="pt-20 md:pt-32 pb-24 md:pb-36 px-4 md:px-8 bg-[#FAFAFA] relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] border-t border-hairline outline-none"
  >
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="mb-14 md:mb-20"
      >
        <ScrollFillHeading
          id="projects-heading"
          line1="Personal"
          line2="Projects."
        />
      </motion.div>

      {/* Uniform 3-Card Grid on Desktop, Compact Single Column on Mobile */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-sm md:max-w-4xl lg:max-w-7xl mx-auto"
      >
        {PROJECTS.map((project) => {
          const titleId = `project-${project.slug}-title`;

          return (
            <motion.li key={project.slug} variants={scaleIn} className="h-full">
              <Link
                to={`/project/${project.slug}`}
                aria-labelledby={titleId}
                className="block h-full outline-none group focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] rounded-[28px]"
              >
                {/* Outer Frame — Static position, glows on hover */}
                <div
                  className={`h-full p-1.5 rounded-[28px] bg-white border border-hairline shadow-sm transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none ${project.frameGlow}`}
                >
                  {/* Inner Card Canvas */}
                  <div
                    className={`relative h-full overflow-hidden rounded-[22px] border p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-colors duration-500 ${project.canvas} ${project.innerBorderHover}`}
                  >
                    {/* Ambient hover glow overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.6),transparent_70%)]"
                    />

                    {/* Top Row: Plain Category Text on the Left */}
                    <div className="relative z-20 w-full flex items-center justify-start">
                      <span
                        className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] ${project.categoryColor}`}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Center Visual + Title */}
                    <div className="relative z-20 mt-4 sm:mt-5 flex flex-col items-center w-full">
                      <div
                        aria-hidden="true"
                        className="w-full flex items-center justify-center pointer-events-none select-none mask-[linear-gradient(to_bottom,black_65%,transparent_100%)]"
                      >
                        <img
                          src={project.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className={project.imageClass}
                        />
                      </div>

                      <h3
                        id={titleId}
                        className={`mt-2.5 text-lg sm:text-xl font-black uppercase tracking-[-0.02em] text-[#1f1c1d] leading-snug transition-colors duration-300 motion-reduce:transition-none ${project.titleHover}`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Centered Skill Pills */}
                    <ul className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-1.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-white/85 border border-black/5 px-2.5 py-1 text-[11px] font-bold text-ink shadow-2xs"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Row: Dark Pill CTA */}
                    <div
                      className={`relative z-20 w-full mt-5 pt-4 border-t ${project.dividerBorder} flex items-center justify-end`}
                    >
                      <span
                        className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[#231f20] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-300 motion-reduce:transition-none ${project.btnHover}`}
                      >
                        <span>View Detail</span>
                        <ArrowUpRight size={14} weight="bold" aria-hidden />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  </section>
);

export default Projects;
