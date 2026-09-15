import {
  GraduationCap,
  Certificate,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { SectionLabel } from "../../components/SectionLabel";

const EDUCATION_DATA = [
  {
    degree: "Master of Science in Information Technology",
    school: "President University",
    period: "2023 - 2025",
    gpa: "3.64",
    focus: "Business Intelligence",
    link: "#",
  },
  {
    degree: "Bachelor of Accounting",
    school: "Tadulako University",
    period: "2017 - 2022",
    gpa: "3.71",
    focus: "Financial Accounting and Taxation",
    link: "#",
  },
];

const CERTIFICATES_DATA = [
  {
    title: "SOLID Principles: Introducing Software Architecture & Design",
    issuer: "Udemy",
    year: "2026",
    link: "https://www.udemy.com/certificate/UC-6ff76bda-84e8-4650-82d7-af2298bbe167/",
  },
  {
    title: "Clean Code",
    issuer: "Udemy",
    year: "2026",
    link: "https://www.udemy.com/certificate/UC-f9a43bb7-cae6-402f-88c9-10ce63c25d24/",
  },
  {
    title: "Fundamentals of Software Design and Architecture Course",
    issuer: "Udemy",
    year: "2026",
    link: "https://www.udemy.com/certificate/UC-37fc4f6c-08ab-4881-9246-3f561902b2b3/",
  },
  {
    title: "Team Agility through Agile Ways of Working",
    issuer: "Agile Academy Indonesia",
    year: "2025",
    link: "https://drive.google.com/drive/folders/1zNRpF_mX7S5pA-MK-BZbmYDiXlbBdhH0?usp=sharing",
  },
  {
    title: "C# Basics for Beginners: Learn C# Fundamentals by Coding",
    issuer: "Udemy",
    year: "2026",
    link: "https://www.udemy.com/certificate/UC-f5ec86b8-bde2-459f-b596-bf83c536b2ab/",
  },
  {
    title: "Belajar Frontend Website (HTML, CSS dan Javascript)",
    issuer: "Udemy",
    year: "2025",
    link: "https://www.udemy.com/certificate/UC-3b379b97-a4bd-4981-b1c5-9375dc8924f4/",
  },
  {
    title: "Java Bootcamp: Learn Java with 100+ Java Projects",
    issuer: "Udemy",
    year: "2025",
    link: "https://www.udemy.com/certificate/UC-cf7a6f29-db74-41c8-a2b0-d647df3e28d1/",
  },
  {
    title: "Cloud Practitioner Essentials (Learn AWS Cloud Basic)",
    issuer: "Dicoding Indonesia",
    year: "2025",
    link: "https://www.dicoding.com/certificates/53XEDN5R9PRN",
  },
  {
    title: "Introduction to REST APIs for Absolute Beginners",
    issuer: "Udemy",
    year: "2025",
    link: "https://www.udemy.com/certificate/UC-da90b50c-184e-4f53-b71f-d7901efe6032/",
  },
  {
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2024",
    link: "https://www.dicoding.com/certificates/N9ZOOM2R6ZG5",
  },
  {
    title: "English Speaking Intensive 1 - Level A1 (Excellent)",
    issuer: "WECAMP English Village",
    year: "2023",
    link: "https://drive.google.com/drive/folders/194f4uT8lAj3exXrlVMSucuPSIFegt2FK?usp=sharing",
  },
  {
    title: "Tax Brevet Training AB + e-SPT",
    issuer: "Centre for Accounting Development, Universitas Indonesia",
    year: "2023",
    link: "https://drive.google.com/drive/folders/1975seEYudg15J2RXj18TPMVMR5yE60_w?usp=sharing",
  },
  {
    title: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/KEXL05Q8RPG2",
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://dicoding.com/certificates/0LZ0QOW63Z65",
  },
  {
    title: "Belajar Dasar Git dengan Github",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/6RPN4K1J4X2M",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/NVP78926RXR0",
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/6RPN48R65X2M",
  },
  {
    title: "Memulai Pemrograman dengan Haskell",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/98XWV40V9PM3",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/07Z68K26JXQR",
  },
  {
    title: "Belajar Dasar-Dasar DevOps",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/4EXG4YY9GPRL",
  },
  {
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding Indonesia",
    year: "2023",
    link: "https://www.dicoding.com/certificates/1RXY0N50QZVM",
  },
];

export const EduCert = () => (
  <section
    id="education"
    className="py-16 md:py-32 border-b-2 border-ink bg-surface"
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Education */}
      <div className="flex flex-col h-full">
        <div>
          <SectionLabel text="Education" />
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 md:mb-12">
            Academic
            <br />
            Background.
          </h2>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          {EDUCATION_DATA.map((edu, i) => (
            <div
              key={i}
              className="bg-chrome border-2 border-ink p-6 md:p-8 relative group hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0_#383838] transition-all duration-200 flex-1 flex flex-col justify-center active:-translate-y-1 active:translate-x-1 active:shadow-[-8px_8px_0_#383838]"
            >
              <GraduationCap
                size={32}
                className="absolute top-6 md:top-8 right-6 md:right-8 text-ink opacity-20 group-hover:opacity-100 group-hover:text-ink transition-all group-active:opacity-100 group-active:text-ink"
              />
              <div className="font-mono text-xs md:text-sm font-bold text-ink-muted mb-2">
                {edu.period}
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 pr-12">
                {edu.degree}
              </h3>
              <div className="font-mono text-sm md:text-base font-bold text-ink mb-4">
                {edu.school}
              </div>
              <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed max-w-sm">
                GPA: {edu.gpa}. Specialized in {edu.focus}.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <SectionLabel text="Certifications" />
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 md:mb-12">
          Professional
          <br />
          Certificates.
        </h2>
        <div className="flex flex-col gap-4 brutalist-scrollbar max-h-[460px] lg:max-h-[500px] overflow-y-auto pr-2">
          {CERTIFICATES_DATA.map((cert, i) => (
            <div
              key={i}
              className="flex flex-col p-4 md:p-6 border-2 border-ink bg-surface hover:bg-chrome transition-colors group gap-4 active:bg-chrome"
            >
              <div className="flex items-start gap-4">
                <Certificate
                  size={24}
                  className="text-ink-muted shrink-0 mt-1"
                />
                <div className="flex-1 pr-2">
                  <h3 className="font-bold uppercase tracking-tight text-sm md:text-base">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-[10px] md:text-xs text-ink-muted mt-1">
                    {cert.issuer} • {cert.year}
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-mono text-[10px] uppercase font-bold px-4 py-2 border-2 border-transparent group-hover:border-ink group-hover:!bg-ink group-hover:!text-surface transition-all shrink-0 w-fit active:border-ink active:!bg-ink active:!text-surface group-active:border-ink group-active:!bg-ink group-active:!text-surface"
                >
                  <span>View</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
