import { Link } from "react-router-dom";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react";
import { SectionLabel } from "../../components/SectionLabel";

export const Experience = () => {
  const jobs = [
    {
      year: "2025 — Present",
      role: "Software Engineer",
      company: "LG Sinarmas",
      desc: "Smart Factory operations and Frontend Developer with React and TypeScript",
      slug: "software-engineer-lg",
      logo: "/LG_Sinarmas_Logo_Vector.svg",
    },
  ];

  return (
    <section
      id="experience"
      className="py-16 md:py-32 border-b-2 border-ink bg-surface"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16">
        <div>
          <SectionLabel text="Career" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter lg:sticky lg:top-32">
            Work
            <br />
            Experience.
          </h2>
        </div>

        <div className="flex flex-col gap-10 md:gap-12">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="group flex flex-col bg-surface border-2 border-ink transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] md:hover:-translate-y-2 md:hover:translate-x-2 md:hover:shadow-[-16px_16px_0_#383838] active:-translate-y-1 active:translate-x-1 active:shadow-[-6px_6px_0_#383838] md:active:-translate-y-2 md:active:translate-x-2 md:active:shadow-[-16px_16px_0_#383838]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-5 md:p-8 border-b-2 border-ink bg-chrome/40">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-surface border-2 border-ink flex items-center justify-center shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:shadow-[-2px_2px_0_#383838] md:group-hover:-translate-y-1 md:group-hover:translate-x-1 md:group-hover:shadow-[-6px_6px_0_#383838]">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="font-mono text-[10px] md:text-xs font-bold uppercase text-ink-muted">
                        Logo
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-3xl font-bold uppercase tracking-tight group-hover:text-sky transition-colors mb-1 group-active:text-sky">
                      {job.role}
                    </h3>
                    <div className="font-mono font-bold text-[10px] md:text-sm text-ink-muted uppercase">
                      {job.company}
                    </div>
                  </div>
                </div>

                <div className="font-mono text-[10px] md:text-xs font-bold bg-ink text-surface px-3 py-1.5 md:px-4 md:py-2 border-2 border-ink self-start sm:self-center shadow-[-2px_2px_0_#87CEEB] md:shadow-[-4px_4px_0_#87CEEB]">
                  {job.year}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 md:p-8 flex flex-col xl:flex-row gap-6 md:gap-8 justify-between items-start xl:items-end">
                <p className="font-sans text-sm md:text-base text-ink leading-relaxed max-w-2xl font-medium">
                  {job.desc}
                </p>
                {job.slug && (
                  <Link
                    to={`/career/${job.slug}`}
                    className="inline-flex items-center justify-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs uppercase font-bold bg-chrome px-5 py-3 md:px-6 md:py-4 border-2 border-ink hover:bg-sky hover:text-ink transition-colors shrink-0 w-full sm:w-auto shadow-[-4px_4px_0_#383838] md:shadow-[-8px_8px_0_#383838] active:bg-sky active:text-ink"
                  >
                    <span>View Details</span>
                    <ArrowRightIcon size={16} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
