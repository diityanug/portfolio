import { motion } from 'framer-motion';
import { Lightning as Zap, ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { SectionLabel } from '../../components/SectionLabel';

const ProjectCard = ({ title, desc, tags, link, color, slug }: any) => (
  <motion.div 
    whileHover={{ y: -4, x: 4, boxShadow: "-8px 8px 0px #383838" }}
    className="group flex flex-col bg-surface border-2 border-ink transition-all duration-300 h-full"
  >
    <div className={`h-40 md:h-48 border-b-2 border-ink ${color} p-6 flex flex-col justify-between relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
        <Zap size={64} className="text-ink" />
      </div>
      <div className="font-mono text-xs font-bold uppercase border-2 border-ink px-3 py-1 bg-surface inline-flex w-fit">
        Featured
      </div>
    </div>
    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-3">{title}</h3>
        <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed mb-6">{desc}</p>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {tags.map((t: string) => (
            <span key={t} className="font-mono text-[10px] md:text-xs bg-chrome px-2 py-1 border border-ink-muted/30">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          <a href={link} className="inline-flex items-center justify-center gap-2 font-mono text-xs md:text-sm uppercase font-bold text-ink hover:text-sky transition-colors group/link">
            <span>Explore</span>
            <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
          </a>
          {slug && (
            <Link to={`/project/${slug}`} className="inline-flex items-center justify-center gap-2 font-mono text-xs md:text-sm uppercase font-bold text-ink-muted hover:text-ink transition-colors group/link2">
              <span>Details</span>
              <ArrowUpRight size={16} className="group-hover/link2:-translate-y-0.5 group-hover/link2:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export const Projects = () => (
  <section id="work" className="py-16 md:py-32 border-b-2 border-ink bg-chrome">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="mb-12 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
        <div>
          <SectionLabel text="Work" />
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Selected<br/>Projects.
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-ink-muted max-w-md">
          A collection of recent production-ready applications, internal tools, and open-source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <ProjectCard 
          title="DataFlow Platform"
          desc="High-performance data visualization dashboard for enterprise metrics, processing 1M+ rows in browser."
          tags={["React", "WebGL", "TypeScript"]}
          link="#"
          slug="dataflow-platform"
          color="bg-sun"
        />
        <ProjectCard 
          title="Serverless CMS"
          desc="Headless content management system built on edge functions with real-time collaborative editing."
          tags={["Next.js", "Redis", "Tailwind"]}
          link="#"
          slug="serverless-cms"
          color="bg-sky"
        />
        <ProjectCard 
          title="E-Commerce Core"
          desc="Modular storefront architecture supporting multiple payment gateways and inventory syncing."
          tags={["Remix", "Prisma", "Stripe"]}
          link="#"
          slug="ecommerce-core"
          color="bg-watermelon"
        />
      </div>
    </div>
  </section>
);
