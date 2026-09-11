import { CodeBlock } from '@phosphor-icons/react';
import { SectionLabel } from '../../components/SectionLabel';

export const Skills = () => (
  <section id="skills" className="py-16 md:py-32 border-b-2 border-ink bg-chrome">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      <div>
        <SectionLabel text="Capabilities" />
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
          Technical<br/>Arsenal.
        </h2>
        <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed max-w-lg mb-8">
          A curated list of technologies and tools I use to build robust, scalable, and high-performance applications. I focus on the JavaScript ecosystem with a strong emphasis on typed languages and component-driven architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-surface border-2 border-ink p-6 md:p-8 shadow-[-8px_8px_0_#383838]">
          <div className="flex items-center gap-3 mb-6">
            <CodeBlock size={24} className="text-sky" />
            <h3 className="font-bold uppercase tracking-tight">Core Stack</h3>
          </div>
          <ul className="space-y-3 font-mono text-sm md:text-base font-bold text-ink-muted">
            <li><span className="text-ink">—</span> TypeScript / JavaScript</li>
            <li><span className="text-ink">—</span> React / Next.js</li>
            <li><span className="text-ink">—</span> Node.js / Bun</li>
            <li><span className="text-ink">—</span> HTML5 / CSS3</li>
          </ul>
        </div>
        
        <div className="bg-surface border-2 border-ink p-6 md:p-8 shadow-[-8px_8px_0_#383838]">
          <div className="flex items-center gap-3 mb-6">
            <CodeBlock size={24} className="text-watermelon" />
            <h3 className="font-bold uppercase tracking-tight">Styling & UI</h3>
          </div>
          <ul className="space-y-3 font-mono text-sm md:text-base font-bold text-ink-muted">
            <li><span className="text-ink">—</span> Tailwind CSS</li>
            <li><span className="text-ink">—</span> Framer Motion</li>
            <li><span className="text-ink">—</span> GSAP</li>
            <li><span className="text-ink">—</span> Radix UI</li>
          </ul>
        </div>

        <div className="bg-surface border-2 border-ink p-6 md:p-8 shadow-[-8px_8px_0_#383838]">
          <div className="flex items-center gap-3 mb-6">
            <CodeBlock size={24} className="text-sun" />
            <h3 className="font-bold uppercase tracking-tight">Tools & Systems</h3>
          </div>
          <ul className="space-y-3 font-mono text-sm md:text-base font-bold text-ink-muted">
            <li><span className="text-ink">—</span> Git / GitHub</li>
            <li><span className="text-ink">—</span> Vercel / Netlify</li>
            <li><span className="text-ink">—</span> Figma</li>
            <li><span className="text-ink">—</span> Jest / Playwright</li>
          </ul>
        </div>
        
        <div className="bg-surface border-2 border-ink p-6 md:p-8 shadow-[-8px_8px_0_#383838]">
          <div className="flex items-center gap-3 mb-6">
            <CodeBlock size={24} className="text-ink" />
            <h3 className="font-bold uppercase tracking-tight">Architecture</h3>
          </div>
          <ul className="space-y-3 font-mono text-sm md:text-base font-bold text-ink-muted">
            <li><span className="text-ink">—</span> REST API Design</li>
            <li><span className="text-ink">—</span> GraphQL</li>
            <li><span className="text-ink">—</span> Micro-frontends</li>
            <li><span className="text-ink">—</span> Serverless</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);
