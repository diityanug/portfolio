import { motion, type Variants } from 'framer-motion';
import { GraduationCap, ArrowUpRight, Certificate, Check } from '@phosphor-icons/react';
import { fadeUp, scaleIn } from '../../utils/animations';
import { CERTIFICATES } from '../../data';

interface IssuerTheme {
  card: string;
  hover: string;
  tile: string;
  watermark: string;
  pill: string;
  link: string;
}

const THEMES = {
  violet: {
    card: 'bg-linear-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]/60 border-[#DDD6FE]',
    hover: 'hover:border-[#8B5CF6]/60 hover:shadow-[#8B5CF6]/15',
    tile: 'text-[#6D28D9] group-hover:bg-[#8B5CF6] group-hover:text-white',
    watermark: 'text-[#5B21B6]',
    pill: 'bg-white/80 text-[#6D28D9] border-[#DDD6FE]',
    link: 'text-[#6D28D9]',
  },
  sky: {
    card: 'bg-linear-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]/60 border-[#BAE6FD]',
    hover: 'hover:border-[#0EA5E9]/60 hover:shadow-[#0EA5E9]/15',
    tile: 'text-[#0369A1] group-hover:bg-[#0EA5E9] group-hover:text-white',
    watermark: 'text-[#075985]',
    pill: 'bg-white/80 text-[#0369A1] border-[#BAE6FD]',
    link: 'text-[#0369A1]',
  },
  emerald: {
    card: 'bg-linear-to-br from-[#ECFDF5] via-[#D1FAE5] to-[#A7F3D0]/60 border-[#A7F3D0]',
    hover: 'hover:border-[#10B981]/60 hover:shadow-[#10B981]/15',
    tile: 'text-[#047857] group-hover:bg-[#10B981] group-hover:text-white',
    watermark: 'text-[#065F46]',
    pill: 'bg-white/80 text-[#047857] border-[#A7F3D0]',
    link: 'text-[#047857]',
  },
  amber: {
    card: 'bg-linear-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/60 border-[#FDE68A]',
    hover: 'hover:border-[#F59E0B]/60 hover:shadow-[#F59E0B]/15',
    tile: 'text-[#B45309] group-hover:bg-[#F59E0B] group-hover:text-white',
    watermark: 'text-[#78350F]',
    pill: 'bg-white/80 text-[#B45309] border-[#FDE68A]',
    link: 'text-[#B45309]',
  },
  rose: {
    card: 'bg-linear-to-br from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]/60 border-[#FECDD3]',
    hover: 'hover:border-[#F43F5E]/60 hover:shadow-[#F43F5E]/15',
    tile: 'text-[#BE123C] group-hover:bg-[#F43F5E] group-hover:text-white',
    watermark: 'text-[#9F1239]',
    pill: 'bg-white/80 text-[#BE123C] border-[#FECDD3]',
    link: 'text-[#BE123C]',
  },
  orange: {
    card: 'bg-linear-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FDBA74]/60 border-[#FDBA74]',
    hover: 'hover:border-[#F97316]/60 hover:shadow-[#F97316]/15',
    tile: 'text-[#C2410C] group-hover:bg-[#F97316] group-hover:text-white',
    watermark: 'text-[#9A3412]',
    pill: 'bg-white/80 text-[#C2410C] border-[#FDBA74]',
    link: 'text-[#C2410C]',
  },
} as const satisfies Record<string, IssuerTheme>;

type ThemeKey = keyof typeof THEMES;

// Issuer themes
const ISSUER_THEME: ReadonlyArray<readonly [string, ThemeKey]> = [
  ['udemy', 'violet'],
  ['dicoding', 'sky'],
  ['agile', 'emerald'],
];

// Fallback pool for unknown issuers (hashed)
const FALLBACK_POOL: readonly ThemeKey[] = ['amber', 'rose', 'orange'];

const getIssuerTheme = (issuer: string): IssuerTheme => {
  const lower = issuer.toLowerCase();
  const known = ISSUER_THEME.find(([key]) => lower.includes(key));
  if (known) return THEMES[known[1]];
  let hash = 0;
  for (let i = 0; i < lower.length; i++) hash = (hash * 31 + lower.charCodeAt(i)) >>> 0;
  return THEMES[FALLBACK_POOL[hash % FALLBACK_POOL.length]];
};

interface EducationItem {
  level: string;
  title: string;
  place: string;
  location: string;
  year: string;
  gpa: string;
  desc: string;
  theme: ThemeKey;
}

const EDUCATION: readonly EducationItem[] = [
  {
    level: 'Postgraduate Degree',
    title: 'Master of Science in Information Technology',
    place: 'President University',
    location: 'Cikarang, Indonesia',
    year: '2023 - 2025',
    gpa: '3.64',
    desc: 'Business Intelligence.',
    theme: 'violet',
  },
  {
    level: 'Undergraduate Degree',
    title: 'Bachelor of Accounting',
    place: 'Tadulako University',
    location: 'Palu, Indonesia',
    year: '2017 - 2022',
    gpa: '3.71',
    desc: 'Financial Accounting and Taxation.',
    theme: 'orange',
  },
];

const CERTS = CERTIFICATES.map((cert) => ({
  ...cert,
  theme: getIssuerTheme(cert.issuer),
  href: cert.link && cert.link !== '#' ? cert.link : null,
}));

type CertItem = (typeof CERTS)[number];

const VIEWPORT = { once: true, margin: '-10px' } as const;

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/60';

const CertCard = ({ cert }: { cert: CertItem }) => {
  const { theme, href } = cert;
  const isLink = href !== null;

  const card = (
    <div
      className={`relative h-full overflow-hidden rounded-3xl border p-6 sm:p-7 flex flex-col justify-between gap-8 ${theme.card} ${
        isLink
          ? `group transition-[translate,box-shadow,border-color] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-xl ${theme.hover}`
          : ''
      }`}
    >
      {/* Watermark */}
      <Certificate
        size={190}
        weight="fill"
        aria-hidden
        className={`absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-[opacity,scale] duration-500 motion-reduce:transition-none pointer-events-none ${theme.watermark}`}
      />

      {/* Header: icon & issuer */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl bg-white/90 border border-black/5 shadow-sm flex items-center justify-center shrink-0 transition-colors duration-300 motion-reduce:transition-none ${theme.tile}`}
          >
            <Certificate size={26} weight="duotone" aria-hidden />
          </div>
          <span className={`text-sm font-semibold truncate ${theme.link}`}>{cert.issuer}</span>
        </div>
        <span className="text-xs font-semibold text-ink/70 bg-white/80 border border-black/5 px-3.5 py-1.5 rounded-full shadow-sm shrink-0">
          {cert.year}
        </span>
      </div>

      {/* Title */}
      <h4 className="relative z-10 text-lg sm:text-xl lg:text-[22px] font-bold text-ink leading-snug tracking-[-0.01em] lg:max-w-[90%]">
        {cert.title}
      </h4>

      {/* Footer: action link */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
        <span className={`text-sm font-semibold ${isLink ? theme.link : 'text-ink/70'}`}>
          {isLink ? 'View Certificate' : 'Completed'}
        </span>
        <span
          className={`w-10 h-10 rounded-full bg-white/90 border border-black/5 shadow-sm flex items-center justify-center shrink-0 transition-colors duration-300 motion-reduce:transition-none ${theme.tile}`}
        >
          {isLink ? (
            <ArrowUpRight size={18} weight="bold" aria-hidden />
          ) : (
            <Check size={18} weight="bold" aria-hidden />
          )}
        </span>
      </div>
    </div>
  );

  return (
    <motion.li variants={fadeUp} className="h-full">
      {isLink ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify credential: ${cert.title} (opens in new tab)`}
          className={`block h-full rounded-3xl ${focusRing}`}
        >
          {card}
        </a>
      ) : (
        card
      )}
    </motion.li>
  );
};

const Education = () => (
  <section
    id="education"
    tabIndex={-1}
    aria-labelledby="education-heading"
    className="pt-20 md:pt-32 pb-28 md:pb-40 bg-white text-ink relative z-10 rounded-t-[40px] md:rounded-t-[64px] -mt-10 md:-mt-16 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)] outline-none"
  >
    <div className="max-w-300 mx-auto px-4 md:px-8">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="mb-14 md:mb-20"
      >
        <h2
          id="education-heading"
          className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-ink tracking-[-0.03em] leading-none uppercase"
        >
          Academic <br /> Background.
        </h2>
      </motion.div>

      {/* Academic Degrees */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32"
      >
        {EDUCATION.map((item) => {
          const theme = THEMES[item.theme];
          return (
            <motion.li
              key={item.title}
              variants={scaleIn}
              className={`group relative h-full overflow-hidden rounded-3xl border p-5 sm:p-9 flex flex-col justify-between gap-6 sm:gap-10 transition-[translate,box-shadow,border-color] duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-xl ${theme.card} ${theme.hover}`}
            >
              <GraduationCap
                size={180}
                weight="fill"
                aria-hidden
                className={`absolute -right-8 -bottom-10 sm:-right-10 sm:-bottom-12 opacity-[0.07] group-hover:opacity-[0.14] group-hover:scale-105 transition-[opacity,scale] duration-500 motion-reduce:transition-none pointer-events-none ${theme.watermark}`}
              />

              {/* Top: level + year */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full border ${theme.pill}`}
                >
                  <GraduationCap size={15} weight="duotone" aria-hidden className="shrink-0" />
                  {item.level}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-ink/70 bg-white/80 border border-black/5 px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm shrink-0">
                  {item.year}
                </span>
              </div>

              {/* Middle: Degree & institution */}
              <div className="relative z-10">
                <h3 className="text-[22px] sm:text-[28px] md:text-3xl font-bold text-ink tracking-[-0.02em] leading-tight mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-ink/80">{item.place}</p>
                <p className="text-xs sm:text-sm font-medium text-ink/70 mt-0.5">{item.location}</p>
              </div>

              {/* Bottom: Focus & GPA */}
              <div className="relative z-10 flex items-end justify-between gap-4 border-t border-black/10 pt-4 sm:pt-5">
                <p className="min-w-0 text-[13px] sm:text-base font-semibold text-ink/80 leading-snug">
                  {item.desc}
                </p>
                <p
                  className={`shrink-0 text-[28px] sm:text-4xl font-bold tracking-tight leading-none ${theme.link}`}
                >
                  {item.gpa}
                  <span className="text-xs sm:text-sm font-medium text-ink/60"> / 4.00</span>
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Certifications */}
      <div className="pt-4">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mb-8 text-center md:text-left text-2xl sm:text-5xl font-bold tracking-tight text-ink"
        >
          Certifications.
        </motion.h3>

        <div
          role="region"
          aria-label="Certifications list"
          tabIndex={0}
          className={`max-h-170 md:max-h-190 overflow-y-auto overflow-x-hidden pt-1 pb-4 pr-2 md:pr-4 -mr-2 md:-mr-4 rounded-xl ${focusRing} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300`}
        >
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6"
          >
            {CERTS.map((cert) => (
              <CertCard key={`${cert.issuer}-${cert.title}-${cert.year}`} cert={cert} />
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  </section>
);

export default Education;