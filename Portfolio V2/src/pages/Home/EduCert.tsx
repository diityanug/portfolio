import { GraduationCap, Certificate, ArrowUpRight } from '@phosphor-icons/react';
import { SectionLabel } from '../../components/SectionLabel';

export const EduCert = () => (
  <section className="py-16 md:py-32 border-b-2 border-ink bg-surface">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      
      {/* Education */}
      <div>
        <SectionLabel text="Education" />
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 md:mb-12">
          Academic<br/>Background.
        </h2>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="bg-chrome border-2 border-ink p-6 md:p-8 relative group hover:shadow-[-8px_8px_0_#ffde00] transition-shadow">
            <GraduationCap size={32} className="absolute top-6 md:top-8 right-6 md:right-8 text-ink opacity-20 group-hover:opacity-100 group-hover:text-sun transition-all" />
            <div className="font-mono text-xs md:text-sm font-bold text-ink-muted mb-2">2015 — 2019</div>
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-1">Computer Science, B.Sc.</h3>
            <div className="font-mono text-sm md:text-base font-bold text-ink mb-4">University of Technology</div>
            <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed">
              Graduated with Honors. Specialized in Software Engineering and Human-Computer Interaction. Built a predictive algorithm for thesis project.
            </p>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div>
        <SectionLabel text="Certifications" />
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 md:mb-12">
          Professional<br/>Certificates.
        </h2>
        <div className="flex flex-col gap-4 brutalist-scrollbar max-h-[420px] overflow-y-auto pr-2">
          {[
            { title: 'AWS Certified Developer', date: 'Oct 2023', issuer: 'Amazon Web Services', href: 'https://aws.amazon.com/certification/' },
            { title: 'Advanced React Patterns', date: 'Mar 2022', issuer: 'Frontend Masters', href: 'https://frontendmasters.com/' },
            { title: 'UI/UX Design Specialization', date: 'Nov 2021', issuer: 'Coursera', href: 'https://coursera.org/' },
            { title: 'Cloud Architecture Foundations', date: 'Jan 2021', issuer: 'Google Cloud', href: 'https://cloud.google.com/certification' }
          ].map((cert, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 md:p-6 border-2 border-ink bg-surface hover:bg-chrome transition-colors group gap-4">
              <div className="flex items-start gap-4">
                <Certificate size={24} className="text-ink-muted shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold uppercase tracking-tight text-sm md:text-base">{cert.title}</h3>
                  <div className="font-mono text-[10px] md:text-xs text-ink-muted mt-1">{cert.issuer} • {cert.date}</div>
                </div>
              </div>
              <a href={cert.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold px-3 py-1.5 border-2 border-transparent group-hover:border-ink hover:!bg-ink hover:!text-surface transition-all shrink-0 w-fit">
                <span>View</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);
