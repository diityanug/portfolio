import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "../../components/SectionLabel";
import { Footer } from "../../components/Footer";
import { DATA } from "../../data";

export const DetailPage = ({
  type,
}: {
  type: "Project" | "Career" | "Certificate";
}) => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState<"contribution" | "culture">(
    "contribution",
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const data = DATA[slug || ""] || {
    title: slug?.replace(/-/g, " "),
    status: "Unknown",
    date: "Unknown",
    desc: "Details for this item could not be found.",
    link: "#",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-[100dvh] flex flex-col bg-surface"
    >
      <div className="flex-1 max-w-[1200px] w-full mx-auto px-5 md:px-8 py-10 md:py-32 overflow-x-hidden">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 font-mono text-xs md:text-sm uppercase font-bold bg-surface px-4 py-2 border-2 border-ink hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#383838] transition-all mb-8 md:mb-12 group active:-translate-y-1 active:translate-x-1 active:shadow-[-4px_4px_0_#383838]"
        >
          <CaretLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-6 md:mb-8">
          <SectionLabel text={`${type} Detail`} />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-8 md:mb-10 text-ink break-words">
          {data.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16 lg:mb-24 items-start pt-8 md:pt-12 border-t-4 border-ink">
          <p className="text-lg md:text-2xl font-medium text-ink max-w-4xl leading-relaxed flex-1">
            {data.desc}
          </p>

          {/* Info card — grid fixed agar tidak layout shift di mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-0 bg-chrome border-2 border-ink shrink-0 w-full lg:w-[320px] transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] md:hover:-translate-y-2 md:hover:translate-x-2 md:hover:shadow-[-12px_12px_0_#383838]">
            {/* Status */}
            <div className="p-4 lg:p-6 border-b-2 border-ink lg:border-b-2 border-r-2 lg:border-r-0">
              <div className="font-mono text-[10px] md:text-xs text-ink-muted mb-2 uppercase font-bold tracking-widest border-b-2 border-ink/10 pb-2">
                Status
              </div>
              <div className="font-bold text-sm md:text-base uppercase mt-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-none bg-sky shrink-0 border border-ink"></span>
                {data.status}
              </div>
            </div>
            {/* Timeline */}
            <div className="p-4 lg:p-6 border-b-2 border-ink">
              <div className="font-mono text-[10px] md:text-xs text-ink-muted mb-2 uppercase font-bold tracking-widest border-b-2 border-ink/10 pb-2">
                Timeline
              </div>
              <div className="font-bold text-sm md:text-base uppercase mt-2">
                {data.date}
              </div>
            </div>
            {/* Link — selalu render, hanya disabled jika # */}
            <div className="col-span-2 lg:col-span-1 p-4 lg:p-6">
              <div className="font-mono text-[10px] md:text-xs text-ink-muted mb-2 uppercase font-bold tracking-widest border-b-2 border-ink/10 pb-2">
                Link
              </div>
              <div className="mt-2">
                {data.link && data.link !== "#" ? (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm md:text-base text-sky underline underline-offset-4 break-all hover:text-ink transition-colors active:text-ink"
                  >
                    {data.link.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-ink-muted italic">
                    —
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          {type === "Career" && (
            <div>
              <div className="flex border-b-2 border-ink mb-10 w-fit">
                <button
                  onClick={() => setActiveTab("contribution")}
                  className={`font-mono font-bold uppercase text-xs md:text-sm py-4 px-6 md:px-10 border-b-4 transition-colors ${activeTab === "contribution" ? "border-sky text-ink bg-chrome" : "border-transparent text-ink-muted hover:text-ink hover:bg-chrome/50"}`}
                >
                  Contributions
                </button>
                <button
                  onClick={() => setActiveTab("culture")}
                  className={`font-mono font-bold uppercase text-xs md:text-sm py-4 px-6 md:px-10 border-b-4 transition-colors ${activeTab === "culture" ? "border-sun text-ink bg-chrome" : "border-transparent text-ink-muted hover:text-ink hover:bg-chrome/50"}`}
                >
                  Culture
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "contribution" && data.contributions && (
                  <motion.div
                    key="contribution"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex gap-6 overflow-x-auto pb-8 pt-2 brutalist-scrollbar snap-x snap-mandatory w-full"
                  >
                    {data.contributions.map((c: any, i: number) => (
                      <div
                        key={i}
                        className="bg-surface border-2 border-ink p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] md:hover:-translate-y-2 md:hover:translate-x-2 md:hover:shadow-[-12px_12px_0_#383838] active:-translate-y-1 active:translate-x-1 active:shadow-[-6px_6px_0_#383838] md:active:-translate-y-2 md:active:translate-x-2 md:active:shadow-[-12px_12px_0_#383838] w-[85vw] sm:w-[350px] md:w-[400px] h-[350px] shrink-0 snap-center flex flex-col"
                      >
                        <h4 className="font-bold uppercase tracking-tight text-xl md:text-2xl mb-6 text-sky shrink-0">
                          {c.project}
                        </h4>
                        <div className="flex-1 overflow-y-auto pr-2 brutalist-scrollbar">
                          <ul className="flex flex-col gap-4 font-mono text-xs md:text-sm text-ink-muted">
                            {c.tasks.map((task: string, t: number) => (
                              <li
                                key={t}
                                className="flex items-start gap-3 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-ink mt-1.5 shrink-0"></span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "culture" && data.culture && (
                  <motion.div
                    key="culture"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex gap-6 overflow-x-auto pb-8 pt-2 brutalist-scrollbar snap-x snap-mandatory w-full"
                  >
                    {data.culture.map((c: any, i: number) => (
                      <div
                        key={i}
                        className="bg-surface border-2 border-ink transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] md:hover:-translate-y-2 md:hover:translate-x-2 md:hover:shadow-[-12px_12px_0_#383838] active:-translate-y-1 active:translate-x-1 active:shadow-[-6px_6px_0_#383838] md:active:-translate-y-2 md:active:translate-x-2 md:active:shadow-[-12px_12px_0_#383838] w-[85vw] sm:w-[350px] md:w-[400px] h-[380px] shrink-0 snap-center flex flex-col"
                      >
                        <div className="h-[200px] w-full border-b-2 border-ink bg-chrome overflow-hidden shrink-0">
                          {c.photo ? (
                            <img
                              src={c.photo}
                              alt={c.activity}
                              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 hover:scale-105 transition-all duration-500 active:grayscale-0 active:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono text-[10px] uppercase font-bold text-ink-muted">
                              Photo
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h4 className="font-bold uppercase tracking-tight text-lg md:text-xl mb-3 text-sun">
                            {c.activity}
                          </h4>
                          <p className="font-mono text-xs md:text-sm text-ink-muted leading-relaxed line-clamp-3">
                            {c.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {type === "Project" && data.workflow && (
            <div>
              <h3 className="text-2xl md:text-4xl font-bold uppercase mb-10 md:mb-12">
                System Workflow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.workflow.map((w: any, i: number) => (
                  <div
                    key={i}
                    className="group flex flex-col bg-surface border-2 border-ink transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0_#383838] md:hover:-translate-y-2 md:hover:translate-x-2 md:hover:shadow-[-12px_12px_0_#383838] active:-translate-y-1 active:translate-x-1 active:shadow-[-6px_6px_0_#383838] md:active:-translate-y-2 md:active:translate-x-2 md:active:shadow-[-12px_12px_0_#383838]"
                  >
                    {w.image && (
                      <div
                        className="w-full aspect-video border-b-2 border-ink bg-chrome overflow-hidden cursor-zoom-in group/img relative"
                        onClick={() => setSelectedImage(w.image)}
                      >
                        <img
                          src={w.image}
                          alt={w.step}
                          className="w-full h-full object-cover grayscale-[20%] group-hover/img:grayscale-0 group-hover/img:scale-105 group-active/img:grayscale-0 group-active/img:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-ink/0 group-hover/img:bg-ink/10 group-active/img:bg-ink/10 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 group-active/img:opacity-100">
                          <div className="bg-surface border-2 border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink shadow-[-4px_4px_0_#383838]">
                            View Detail
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* <div className="font-mono text-[10px] md:text-xs font-bold text-ink-muted uppercase tracking-widest mb-3">
                        Step 0{i + 1}
                      </div> */}
                      <h4 className="font-bold uppercase tracking-tight text-lg md:text-xl mb-3">
                        0{i + 1}. {w.step}
                      </h4>
                      <p className="font-mono text-xs md:text-sm text-ink-muted leading-relaxed">
                        {w.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "Certificate" && data.bullets && (
            <div>
              <h3 className="text-2xl md:text-4xl font-bold uppercase mb-10 md:mb-12">
                Key Learnings
              </h3>
              <ul className="list-disc pl-6 space-y-4 font-mono text-sm md:text-base text-ink-muted max-w-3xl">
                {data.bullets.map((bullet: string, i: number) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Image Zoom Popup / Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-surface/90 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedImage}
              alt="Workflow detail"
              className="max-w-full max-h-[90vh] md:border-4 md:border-ink md:shadow-[-16px_16px_0_#383838] object-contain bg-transparent md:bg-chrome"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
