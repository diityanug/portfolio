import { Link } from 'react-router-dom';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react';
import { SectionLabel } from '../../components/SectionLabel';


export const Experience = () => {
  const jobs = [
    { year: '2023 — Present', role: 'Senior Frontend Engineer', company: 'Sinar Mas', desc: 'Leading architecture for core product lines. Migrated legacy monolith to Next.js.', slug: 'techcorp-senior-fe', logo: '/LG_Sinarmas_Logo_Vector.svg' },
    { year: '2021 — 2023', role: 'Frontend Developer', company: 'Studio XYZ', desc: 'Built high-conversion marketing sites and e-commerce experiences for premium brands.', slug: 'studio-xyz-fe', logo: '' },
    { year: '2019 — 2021', role: 'Web Developer', company: 'Agency Beta', desc: 'Developed bespoke web applications and interactive campaigns.', slug: 'agency-beta-webdev', logo: '' }
  ];

  return (
    <section id="experience" className="py-16 md:py-32 border-b-2 border-ink bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
        <div>
          <SectionLabel text="Experience" />
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter lg:sticky lg:top-32">
            Career<br/>Log.
          </h2>
        </div>

        <div className="flex flex-col">
          {jobs.map((job, i) => (
            <div key={i} className="group border-b-2 border-ink py-8 md:py-10 first:pt-0 last:border-b-0">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 mb-4">
                <div className="font-mono text-xs md:text-sm font-bold text-ink-muted min-w-[140px] pt-1 sm:pt-4">
                  {job.year}
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-surface border-2 border-ink flex items-center justify-center shrink-0 shadow-[-4px_4px_0_#383838] overflow-hidden">
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="font-mono text-[10px] md:text-xs font-bold uppercase text-ink-muted">Logo</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-sky transition-colors">
                      {job.role}
                    </h3>
                    <div className="font-mono font-bold text-xs md:text-sm mt-1">{job.company}</div>
                  </div>
                </div>
              </div>
              <div className="sm:ml-[188px]">
                <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed max-w-2xl mb-4">{job.desc}</p>
                <Link to={`/career/${job.slug}`} className="inline-flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase font-bold bg-chrome px-4 py-2 border-2 border-ink hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#383838] transition-all">
                  <span>View Details</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
