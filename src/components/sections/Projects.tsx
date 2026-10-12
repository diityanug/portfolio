import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { fadeUp, scaleIn } from '../../utils/animations';

interface Project {
  slug: string;
  title: string;
  category: string;
  overview: string;
  tags: readonly string[];
  image: string;
  imageClass: string;
  canvas: string;
  frame: string;
  accent: string;
  titleHover: string;
}

const PROJECTS: readonly Project[] = [
  {
    slug: 'genre-game-classifier',
    title: 'Genre Game Classifier',
    category: 'Machine Learning Web App',
    overview:
      'An end-to-end Machine Learning web application that predicts video game genres from descriptions using modern NLP techniques, served via a robust FastAPI backend with an interactive React frontend.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Python', 'NLP', 'Machine Learning'],
    image: '/Genre Game Cover.png',
    imageClass: 'w-full h-full object-cover object-top rounded-2xl shadow-xl ring-1 ring-black/10',
    canvas: 'bg-linear-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]/60 border-[#FED7AA]',
    frame: 'hover:border-[#F97316]/40 hover:shadow-[#F97316]/10',
    accent: 'text-[#C2410C]',
    titleHover: 'group-hover:text-[#C2410C]',
  },
  {
    slug: 'lenvry',
    title: 'Lenvry',
    category: 'Mobile Application',
    overview:
      'A comprehensive personal tracking mobile application built with React Native and Expo Router. Track fitness workouts, habit streaks, daily meals, and personal finances with an offline-first local database architecture.',
    tags: ['React Native', 'Expo', 'TypeScript', 'AsyncStorage', 'Database', 'Mobile'],
    image: '/Lenvrtt-removebg-preview.png',
    imageClass: 'w-full h-full object-contain drop-shadow-2xl',
    canvas: 'bg-linear-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]/60 border-[#BAE6FD]',
    frame: 'hover:border-[#0284C7]/40 hover:shadow-[#0284C7]/10',
    accent: 'text-[#0369A1]',
    titleHover: 'group-hover:text-[#0369A1]',
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
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="mb-14 md:mb-20"
      >
        <h2
          id="projects-heading"
          className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase"
        >
          Personal <br className="hidden md:block" />
          Projects.
        </h2>
      </motion.div>

      {/* Projects Grid */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch"
      >
        {PROJECTS.map((project) => {
          const titleId = `project-${project.slug}-title`;
          const descId = `project-${project.slug}-desc`;

          return (
            <motion.li key={project.slug} variants={scaleIn} className="h-full">
              <Link
                to={`/project/${project.slug}`}
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="block h-full outline-none group focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAFAFA] rounded-3xl md:rounded-[36px]"
              >
                {/* Outer Frame */}
                <div
                  className={`h-full p-1.5 rounded-3xl md:rounded-[36px] bg-white border border-hairline shadow-sm transition-[border-color,box-shadow] duration-500 motion-reduce:transition-none hover:shadow-2xl ${project.frame}`}
                >
                  {/* Inner Canvas */}
                  <div
                    className={`relative h-full overflow-hidden flex flex-col rounded-[22px] md:rounded-[30px] border p-7 sm:p-9 md:p-10 min-h-145 sm:min-h-160 lg:min-h-170 ${project.canvas}`}
                  >
                    {/* Cover as background, 1:1 */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-[82%] sm:w-[72%] lg:w-[74%] aspect-square opacity-45 group-hover:opacity-80 transition-opacity duration-700 ease-out motion-reduce:transition-none pointer-events-none select-none mask-[linear-gradient(to_top,black_50%,transparent_92%)]"
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

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-5 md:gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <p className={`text-sm font-semibold pt-1 ${project.accent}`}>
                          {project.category}
                        </p>
                        <span
                          aria-hidden="true"
                          className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-ink border border-black/5 shadow-xs flex items-center justify-center shrink-0 transition-colors duration-300 motion-reduce:transition-none group-hover:bg-ink group-hover:text-white"
                        >
                          <ArrowUpRight size={20} weight="bold" />
                        </span>
                      </div>

                      <div>
                        <h3
                          id={titleId}
                          className={`text-[28px] sm:text-[36px] md:text-[42px] font-bold text-ink tracking-tight leading-[1.15] mb-3.5 transition-colors duration-300 motion-reduce:transition-none ${project.titleHover}`}
                        >
                          {project.title}
                        </h3>
                        <p
                          id={descId}
                          className="text-[#4a4a4a] text-[15px] sm:text-[16px] leading-[1.75] max-w-xl"
                        >
                          {project.overview}
                        </p>
                      </div>

                      <ul className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="px-3.5 py-1.5 rounded-full text-xs md:text-[13px] font-semibold bg-white/90 border border-black/5 text-ink shadow-xs"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
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