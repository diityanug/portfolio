import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SectionLabel } from "../../components/SectionLabel";

const ProjectCard = ({ title, desc, tags, color, slug, image, link }: any) => (
  <div className="group flex flex-col bg-surface border-2 border-ink h-full hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0_#383838] transition-all duration-200 ease-out active:-translate-y-1 active:translate-x-1 active:shadow-[-8px_8px_0_#383838]">
    <div
      className={`h-40 md:h-48 border-b-2 border-ink ${color} p-6 flex flex-col justify-between relative overflow-hidden`}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="font-mono text-xs font-bold uppercase border-2 border-ink px-3 py-1 bg-surface inline-flex w-fit z-10 relative">
        Featured
      </div>
    </div>
    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-3">
          {title}
        </h3>
        <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed mb-6">
          {desc}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {tags.map((t: string) => (
            <span
              key={t}
              className="font-mono text-[10px] md:text-xs bg-chrome px-2 py-1 border border-ink-muted/30"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 font-mono text-xs md:text-sm uppercase font-bold text-ink hover:text-sky transition-colors group/link active:text-sky"
            >
              <span>Repository</span>
              <ArrowRight
                size={16}
                className="group-hover/link:translate-x-1 transition-transform group-active/link:translate-x-1"
              />
            </a>
          )}
          {slug && (
            <Link
              to={`/project/${slug}`}
              className="inline-flex items-center justify-center gap-2 font-mono text-xs md:text-sm uppercase font-bold text-ink-muted hover:text-ink transition-colors group/link2 active:text-ink"
            >
              <span>Details</span>
              <ArrowUpRight
                size={16}
                className="group-hover/link2:-translate-y-0.5 group-hover/link2:translate-x-0.5 transition-transform group-active/link2:-translate-y-0.5 group-active/link2:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const Projects = () => (
  <section
    id="projects"
    className="py-16 md:py-32 border-b-2 border-ink bg-chrome"
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      <div className="mb-12 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
        <div>
          <SectionLabel text="Personal" />
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Projects.
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-ink-muted max-w-md">
          A collection of independent projects reflecting my ongoing exploration
          of software solutions and modern tech stacks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <ProjectCard
          title="Genre Game Classifier"
          desc="End-to-end ML web app that predicts video game genres from descriptions using NLP, FastAPI, and an interactive React UI."
          tags={[
            "React",
            "FastAPI",
            "Machine Learning",
            "spaCy",
            "Naive Bayes",
            "Python",
          ]}
          link="https://github.com/diityanug/game-genre-classifier"
          slug="genre-game-classifier"
          color="bg-sun"
          image="/genre_classifier_simple.jpg"
        />
      </div>
    </div>
  </section>
);
