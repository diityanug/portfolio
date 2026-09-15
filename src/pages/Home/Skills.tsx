import { SectionLabel } from "../../components/SectionLabel";

const TECH_CATEGORIES = [
  {
    title: "Frontend Architecture",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    description: "Building interactive interfaces and microfrontend systems.",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "JavaScript" },
      { name: "HTML" },
      { name: "Microfrontend Architecture" },
    ],
  },
  {
    title: "Backend & Infrastructure",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    description: "Exploring backend development, APIs, and cloud technologies.",
    skills: [
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "Python" },
      { name: "Haskell" },
      { name: "AWS Cloud" },
      { name: "AWS S3" },
      { name: "DevOps" },
    ],
  },
  {
    title: "Data Intelligence",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    description:
      "Exploring NLP, text preprocessing, and classification models.",
    skills: [
      { name: "Pandas" },
      { name: "Scikit-Learn" },
      { name: "spaCy" },
      { name: "Natural Language Processing" },
      { name: "TF-IDF" },
      { name: "Naive Bayes" },
      { name: "Data Visualization" },
    ],
  },
  {
    title: "Process Automation",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    ),
    description: "Automating workflows and exploring process automation.",
    skills: [
      { name: "Selenium" },
      { name: "BeautifulSoup" },
      { name: "PyAutoGUI" },
    ],
  },
];

export const Skills = () => (
  <section
    id="skills"
    className="py-16 md:py-32 border-b-2 border-ink bg-chrome"
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-12 lg:gap-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
        <div>
          <SectionLabel text="Skills" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter">
            Technical
            <br />
            Stack.
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed max-w-md">
          Technologies, frameworks, and tools I actively use across professional
          work and ongoing academic learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {TECH_CATEGORIES.map((category, idx) => (
          <div
            key={idx}
            className="group bg-surface border-2 border-ink p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] md:hover:-translate-y-2 md:hover:translate-x-2 md:hover:shadow-[-16px_16px_0_#383838] active:-translate-y-1 active:translate-x-1 active:shadow-[-6px_6px_0_#383838] md:active:-translate-y-2 md:active:translate-x-2 md:active:shadow-[-16px_16px_0_#383838]"
          >
            <div>
              <div className="flex items-start sm:items-center gap-4 mb-4 flex-col sm:flex-row">
                <div className="p-2.5 border-2 border-ink bg-chrome shrink-0">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg md:text-xl uppercase tracking-tight leading-tight">
                  {category.title}
                </h3>
              </div>
              <p className="font-sans text-sm md:text-base text-ink-muted mb-6 leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-ink/10">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 border-2 border-ink/10 bg-chrome/50 font-mono text-[10px] md:text-xs font-bold text-ink-muted uppercase tracking-widest group-hover:border-ink group-hover:text-ink transition-colors group-active:border-ink group-active:text-ink"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
