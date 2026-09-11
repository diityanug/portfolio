import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CaretLeft, ArrowUpRight, TerminalWindow as Terminal, Lightning as Zap, Cube as Blocks } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../../components/SectionLabel';
import { Footer } from '../../components/Footer';
import { DATA } from '../../data';

const getIcon = (name: string) => {
  switch (name) {
    case 'Zap': return <Zap size={24} className="text-ink" />;
    case 'Blocks': return <Blocks size={24} className="text-ink" />;
    default: return <Terminal size={24} className="text-ink" />;
  }
};

export const DetailPage = ({ type }: { type: 'Project' | 'Career' | 'Certificate' }) => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState<'contribution' | 'culture'>('contribution');
  
  const data = DATA[slug || ''] || {
    title: slug?.replace(/-/g, ' '),
    status: 'Unknown',
    date: 'Unknown',
    desc: 'Details for this item could not be found.',
    link: '#'
  };
  

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex flex-col bg-surface"
    >
      <div className="flex-1 max-w-[1000px] w-full mx-auto px-5 md:px-6 py-10 md:py-32 overflow-x-hidden">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase font-bold text-ink hover:text-sky transition-colors mb-8 md:mb-12 group">
          <CaretLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        <div className="mb-6 md:mb-8">
          <SectionLabel text={`${type} Detail`} />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 text-ink break-words">
          {data.title}
        </h1>
        
        {/* Image Placeholder Space */}
        <div className="w-full aspect-video md:aspect-[21/9] bg-chrome border-4 border-ink shadow-[-6px_6px_0_#383838] md:shadow-[-12px_12px_0_#383838] overflow-hidden flex items-center justify-center group mb-2">
          {data.image ? (
            <img src={data.image} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="flex flex-col items-center justify-center opacity-50">
              <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-dashed border-ink mb-2"></div>
              <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest">Image / Media</span>
            </div>
          )}
        </div>
        
        <div className="border-t-4 border-ink pt-8 md:pt-12 mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <p className="text-lg md:text-xl mb-12 font-semibold text-ink">
              {data.desc}
            </p>
            
            {type === 'Career' && (
              <div>
                <div className="flex border-b-2 border-ink mb-8">
                  <button 
                    onClick={() => setActiveTab('contribution')}
                    className={`flex-1 font-mono font-bold uppercase text-xs md:text-sm py-4 border-b-4 transition-colors ${activeTab === 'contribution' ? 'border-sky text-ink' : 'border-transparent text-ink-muted hover:text-ink'}`}
                  >
                    Contributions
                  </button>
                  <button 
                    onClick={() => setActiveTab('culture')}
                    className={`flex-1 font-mono font-bold uppercase text-xs md:text-sm py-4 border-b-4 transition-colors ${activeTab === 'culture' ? 'border-sun text-ink' : 'border-transparent text-ink-muted hover:text-ink'}`}
                  >
                    Culture
                  </button>
                </div>
                
                {activeTab === 'contribution' && data.contributions && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {data.contributions.map((c: any, i: number) => (
                      <div key={i} className="bg-surface border-2 border-ink p-6 shadow-[-4px_4px_0_#383838]">
                        <h4 className="font-bold uppercase tracking-tight text-lg mb-4 text-sky">{c.project}</h4>
                        <ul className="list-disc pl-5 space-y-2 font-mono text-xs md:text-sm text-ink-muted">
                          {c.tasks.map((task: string, t: number) => (
                            <li key={t}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'culture' && data.culture && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {data.culture.map((c: any, i: number) => (
                      <div key={i} className="bg-surface border-2 border-ink shadow-[-4px_4px_0_#383838] flex flex-col h-full">
                        <div className="aspect-video border-b-2 border-ink bg-chrome flex items-center justify-center overflow-hidden">
                          {c.photo ? (
                            <img src={c.photo} alt={c.activity} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-mono text-[10px] uppercase font-bold text-ink-muted">Photo</span>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h4 className="font-bold uppercase tracking-tight text-lg mb-2 text-sun">{c.activity}</h4>
                          <p className="font-mono text-xs md:text-sm text-ink-muted">{c.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {type === 'Project' && data.workflow && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase mb-8">System Workflow</h3>
                <div className="flex flex-col gap-6">
                  {data.workflow.map((w: any, i: number) => (
                    <div key={i} className="flex gap-6 items-start bg-chrome border-2 border-ink p-6 shadow-[-4px_4px_0_#383838]">
                      <div className="w-12 h-12 shrink-0 bg-surface border-2 border-ink flex items-center justify-center shadow-[-2px_2px_0_#383838]">
                        {getIcon(w.icon)}
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-tight text-lg mb-2">{w.step}</h4>
                        <p className="font-mono text-sm text-ink-muted">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {type === 'Certificate' && data.bullets && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase mb-8">Key Learnings</h3>
                <ul className="list-disc pl-6 space-y-4 font-mono text-sm text-ink-muted">
                  {data.bullets.map((bullet: string, i: number) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="bg-chrome border-2 border-ink p-5 sm:p-6 md:p-8 h-fit shadow-[-4px_4px_0_#383838] md:shadow-[-8px_8px_0_#383838]">
            <h3 className="text-base md:text-lg font-bold uppercase tracking-tight mb-5 md:mb-6">Metadata</h3>
            <div className="space-y-4">
              <div>
                <div className="font-mono text-[10px] md:text-xs text-ink-muted mb-1 uppercase">Status</div>
                <div className="font-bold text-sm md:text-base">{data.status}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] md:text-xs text-ink-muted mb-1 uppercase">Date</div>
                <div className="font-bold text-sm md:text-base">{data.date}</div>
              </div>
              <div className="pt-5 md:pt-6 border-t-2 border-ink border-dashed">
                <a href={data.link} className="inline-flex items-center justify-center w-full gap-2 font-mono text-xs md:text-sm uppercase font-bold bg-ink text-surface px-4 py-3 border-2 border-transparent hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#6fc2ff] transition-all">
                  <span>View Live</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};
