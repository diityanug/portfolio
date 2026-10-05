import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowUpRight, 
  Certificate,
  Check
} from '@phosphor-icons/react';
import { fadeUp, scaleIn } from '../../utils/animations';
import { CERTIFICATES } from '../../data';

// --- Tema warna per penyelenggara ---
interface IssuerTheme {
  card: string;      // gradient + border + hover card
  tile: string;      // kotak ikon (default + hover)
  watermark: string; // ikon besar di background
  pill: string;      // badge issuer
  link: string;      // teks link
}

const THEMES: Record<string, IssuerTheme> = {
  violet: {
    card: 'bg-linear-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]/60 border-[#DDD6FE] hover:border-[#8B5CF6]/60 hover:shadow-[#8B5CF6]/15',
    tile: 'text-[#6D28D9] group-hover:bg-[#8B5CF6] group-hover:text-white',
    watermark: 'text-[#5B21B6]',
    pill: 'bg-white/80 text-[#6D28D9] border-[#DDD6FE]',
    link: 'text-[#6D28D9]',
  },
  sky: {
    card: 'bg-linear-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]/60 border-[#BAE6FD] hover:border-[#0EA5E9]/60 hover:shadow-[#0EA5E9]/15',
    tile: 'text-[#0369A1] group-hover:bg-[#0EA5E9] group-hover:text-white',
    watermark: 'text-[#075985]',
    pill: 'bg-white/80 text-[#0369A1] border-[#BAE6FD]',
    link: 'text-[#0369A1]',
  },
  emerald: {
    card: 'bg-linear-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]/60 border-[#A7F3D0] hover:border-[#10B981]/60 hover:shadow-[#10B981]/15',
    tile: 'text-[#047857] group-hover:bg-[#10B981] group-hover:text-white',
    watermark: 'text-[#065F46]',
    pill: 'bg-white/80 text-[#047857] border-[#A7F3D0]',
    link: 'text-[#047857]',
  },
  amber: {
    card: 'bg-linear-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/60 border-[#FDE68A] hover:border-[#F59E0B]/60 hover:shadow-[#F59E0B]/15',
    tile: 'text-[#B45309] group-hover:bg-[#F59E0B] group-hover:text-white',
    watermark: 'text-[#78350F]',
    pill: 'bg-white/80 text-[#B45309] border-[#FDE68A]',
    link: 'text-[#B45309]',
  },
  rose: {
    card: 'bg-linear-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]/60 border-[#FECDD3] hover:border-[#F43F5E]/60 hover:shadow-[#F43F5E]/15',
    tile: 'text-[#BE123C] group-hover:bg-[#F43F5E] group-hover:text-white',
    watermark: 'text-[#9F1239]',
    pill: 'bg-white/80 text-[#BE123C] border-[#FECDD3]',
    link: 'text-[#BE123C]',
  },
  orange: {
    card: 'bg-linear-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FDBA74]/60 border-[#FDBA74] hover:border-[#F97316]/60 hover:shadow-[#F97316]/15',
    tile: 'text-[#C2410C] group-hover:bg-[#F97316] group-hover:text-white',
    watermark: 'text-[#9A3412]',
    pill: 'bg-white/80 text-[#C2410C] border-[#FDBA74]',
    link: 'text-[#C2410C]',
  },
};

// Penyelenggara yang sudah dikenal punya warna tetap
const ISSUER_THEME: [string, keyof typeof THEMES][] = [
  ['udemy', 'violet'],
  ['dicoding', 'sky'],
  ['agile', 'emerald'],
];

// Penyelenggara lain: warna dipilih konsisten dari nama (hash)
const FALLBACK_POOL: (keyof typeof THEMES)[] = ['amber', 'rose', 'orange'];

const getIssuerTheme = (issuer: string): IssuerTheme => {
  const lower = issuer.toLowerCase();
  const known = ISSUER_THEME.find(([key]) => lower.includes(key));
  if (known) return THEMES[known[1]];
  let hash = 0;
  for (let i = 0; i < lower.length; i++) hash = (hash * 31 + lower.charCodeAt(i)) >>> 0;
  return THEMES[FALLBACK_POOL[hash % FALLBACK_POOL.length]];
};

const Education = () => {
  const education = [
    { 
      level: "Postgraduate Degree",
      degreeCode: "M.Kom / M.Sc",
      title: "Master of Science in Information Technology", 
      place: "President University", 
      location: "Cikarang, Indonesia",
      year: "2023 - 2025", 
      gpa: "3.64",
      desc: "Business Intelligence.",
      theme: "violet" as const,
    },
    { 
      level: "Undergraduate Degree",
      degreeCode: "S.Ak / B.Acc",
      title: "Bachelor of Accounting", 
      place: "Tadulako University", 
      location: "Palu, Indonesia",
      year: "2017 - 2022", 
      gpa: "3.71",
      desc: "Financial Accounting and Taxation.",
      theme: "orange" as const,
    },
  ];

  return (
    <section id="education" className="pt-20 md:pt-32 pb-28 md:pb-40 bg-white text-ink relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
      <div className="max-w-300 mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10px" }} 
          variants={fadeUp} 
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase">
            Academic <br /> Background.
          </h2>
          
        </motion.div>

        {/* Academic Degrees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32">
          {education.map((item) => {
            const theme = THEMES[item.theme];
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10px" }}
                variants={scaleIn}
                className={`group relative h-full overflow-hidden rounded-3xl border p-5 sm:p-9 flex flex-col justify-between gap-6 sm:gap-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${theme.card}`}
              >
                <GraduationCap
                  size={180}
                  weight="fill"
                  aria-hidden
                  className={`absolute -right-8 -bottom-10 sm:-right-10 sm:-bottom-12 opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-500 pointer-events-none ${theme.watermark}`}
                />

                {/* Top: level + tahun */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border ${theme.pill}`}>
                    <GraduationCap size={15} weight="duotone" className="shrink-0" />
                    {item.level}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-ink/70 bg-white/80 border border-black/5 px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm shrink-0">
                    {item.year}
                  </span>
                </div>

                {/* Middle: gelar + kampus */}
                <div className="relative z-10">
                  <h3 className="text-[22px] sm:text-[28px] md:text-3xl font-bold text-ink tracking-[-0.02em] leading-tight mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-ink/80">{item.place}</p>
                  <p className="text-xs sm:text-sm font-medium text-ink/50 mt-0.5">{item.location}</p>
                </div>

                {/* Bottom: fokus + GPA */}
                <div className="relative z-10 flex items-end justify-between gap-4 border-t border-black/10 pt-4 sm:pt-5">
                  <p className="min-w-0 text-[13px] sm:text-base font-semibold text-ink/80 leading-snug">{item.desc}</p>
                  <p className={`shrink-0 text-[28px] sm:text-4xl font-bold tracking-tight leading-none ${theme.link}`}>
                    {item.gpa}
                    <span className="text-xs sm:text-sm font-medium text-ink/40"> / 4.00</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="pt-4">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-10px" }} 
            variants={fadeUp} 
            className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h3 className="text-2xl sm:text-5xl font-bold tracking-tight text-ink">
                Certifications.
              </h3>
            </div>
          </motion.div>

          {/* Certifications Grid */}
          <div className="max-h-170 md:max-h-190 overflow-y-auto overflow-x-hidden pt-1 pr-2 md:pr-4 -mr-2 md:-mr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300 transition-colors pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
              {CERTIFICATES.map((cert) => {
                const isLink = cert.link && cert.link !== "#";
                const Wrapper = isLink ? "a" : "div";
                const wrapperProps = isLink ? { href: cert.link, target: "_blank", rel: "noreferrer" } : {};
                const theme = getIssuerTheme(cert.issuer);

                return (
                  <motion.div
                    key={cert.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10px" }}
                    variants={fadeUp}
                    className="block h-full outline-none"
                  >
                    <Wrapper {...(wrapperProps as any)} className="block h-full outline-none group cursor-pointer">
                      <div className={`relative h-full overflow-hidden rounded-3xl border p-6 sm:p-7 flex flex-col justify-between gap-8 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl ${theme.card}`}>
                        
                        {/* Watermark */}
                        <Certificate
                          size={190}
                          weight="fill"
                          aria-hidden
                          className={`absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-all duration-500 pointer-events-none ${theme.watermark}`}
                        />

                        {/* Top: ikon + issuer (kiri), tahun (kanan) */}
                        <div className="relative z-10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-12 h-12 rounded-2xl bg-white/90 border border-black/5 shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 ${theme.tile}`}>
                              <Certificate size={26} weight="duotone" />
                            </div>
                            <span className={`text-sm font-semibold truncate ${theme.link}`}>
                              {cert.issuer}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-ink/70 bg-white/80 border border-black/5 px-3.5 py-1.5 rounded-full shadow-sm shrink-0">
                            {cert.year}
                          </span>
                        </div>

                        {/* Middle: judul */}
                        <h4 className="relative z-10 text-lg sm:text-xl lg:text-[22px] font-bold text-ink leading-snug tracking-[-0.01em] lg:max-w-[90%]">
                          {cert.title}
                        </h4>

                        {/* Bottom: aksi kiri, tombol bulat kanan */}
                        <div className="relative z-10 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                          <span className={`text-sm font-semibold ${isLink ? theme.link : 'text-ink/50'}`}>
                            {isLink ? 'Verify Credential' : 'Completed'}
                          </span>
                          <span className={`w-10 h-10 rounded-full bg-white/90 border border-black/5 shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 ${theme.tile}`}>
                            {isLink ? <ArrowUpRight size={18} weight="bold" /> : <Check size={18} weight="bold" />}
                          </span>
                        </div>

                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;