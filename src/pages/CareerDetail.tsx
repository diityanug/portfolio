import { motion } from "framer-motion";
import { MapPin, CalendarBlank } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { fadeUp, staggerContainer } from "../utils/animations";
import { DATA } from "../data";
import LogoHeader from "../components/sections/LogoHeader";

export default function CareerDetail() {
  const { slug } = useParams();

  const career = DATA[slug || ""] || {
    title: slug?.replace(/-/g, " "),
    status: "Unknown",
    date: "Unknown",
    desc: "Details for this career could not be found.",
    contributions: [],
    culture: [],
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans pb-24">
      <LogoHeader backHash="#experience" backName="Experience" />

      <main className="pt-28 md:pt-40 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="mb-16 md:mb-24">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full">
              <motion.div variants={fadeUp}>
                
                <h1 className="text-[50px] sm:text-[72px] md:text-[96px] font-bold text-ink leading-[0.9] tracking-[-0.04em] uppercase mb-10 md:mb-14">
                  {career.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-6 border-t border-black/5">
                  <div className="flex items-center gap-4 text-steel">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-ink" />
                    </div>
                    <span className="font-semibold text-base md:text-lg">{career.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-steel">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center shrink-0">
                      <CalendarBlank size={20} className="text-ink" />
                    </div>
                    <span className="font-semibold text-base md:text-lg">{career.date}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10px" }} variants={fadeUp} className="w-full flex flex-col gap-20 md:gap-24">
            
            {/* Overview */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-steel mb-6 border-b border-black/5 pb-4">Role Overview</h3>
              <p className="font-medium text-ink text-xl md:text-2xl leading-[1.6]">
                {career.desc}
              </p>
            </div>

            {/* Contributions */}
            {career.contributions && career.contributions.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-ink mb-8 tracking-tight border-b border-black/5 pb-4">Key Contributions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {career.contributions.map((c: any, idx: number) => (
                    <div key={idx} className="group bg-white p-8 rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] ring-1 ring-black/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/40 to-primary/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                      <h4 className="font-bold text-ink text-xl md:text-2xl mb-6 tracking-tight group-hover:text-primary transition-colors">{c.project}</h4>
                      <ul className="flex flex-col gap-4 list-none p-0 mt-auto">
                        {c.tasks.map((task: string, tIdx: number) => (
                          <li key={tIdx} className="flex gap-4 items-start text-steel text-sm md:text-base leading-relaxed">
                            <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/10 transition-colors">
                              <span className="text-[10px] font-bold text-ink/40 group-hover:text-primary transition-colors">✓</span>
                            </div>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Culture */}
            {career.culture && career.culture.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-ink mb-8 tracking-tight border-b border-black/5 pb-4">Culture & Activities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {career.culture.map((c: any, idx: number) => (
                    <div key={idx} className="group bg-white p-5 rounded-3xl shadow-sm ring-1 ring-black/5 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                      <div className="w-full h-48 sm:h-56 rounded-2xl bg-black/5 overflow-hidden flex items-center justify-center relative shrink-0">
                        <img src={c.photo} alt={c.activity} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent mix-blend-overlay group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                      </div>
                      <div className="px-3 pb-2 flex-1">
                        <h4 className="font-bold text-ink text-xl mb-3 group-hover:text-primary transition-colors">{c.activity}</h4>
                        <p className="text-steel text-sm md:text-base leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </main>

    </div>
  );
}