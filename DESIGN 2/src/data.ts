export const DATA: Record<string, any> = {
  // Projects
  "genre-game-classifier": {
    title: "Genre Game Classifier",
    status: "Completed",
    date: "2024",
    desc: "Game Genre Classifier is an end-to-end Machine Learning pipeline designed to predict video game genres based on their descriptions. The core NLP engine utilizes spaCy for deep text normalization and TF-IDF for feature extraction. The backend is served via FastAPI, featuring dynamic thresholding and a unique Explainable AI logic to extract reasoning keywords. The frontend offers a sleek, animated UI with real-time probability bars.",
    link: "https://github.com/diityanug/game-genre-classifier",
    image: "/card.png",
    workflow: [
      {
        image: "/input-desc.webp",
        step: "Text Input Interface",
        desc: "Users simply input the game's title and description into a clean, minimalist form. The frontend instantly packages this text to be processed by the backend NLP engine.",
      },
      {
        image: "/output.webp",
        step: "Results & Explanation",
        desc: "The UI reveals real-time prediction results using animated probability bars, and highlights specific keywords from the input that heavily influenced the AI's decision.",
      },
      {
        image: "/history.webp",
        step: "Prediction History",
        desc: "All past predictions are automatically saved in the session history. Users can quickly access and review their previous inputs and results whenever needed.",
      },
    ],
  },

  // Careers
  "software-engineer-lg": {
    title: "Software Engineer at LG Sinarmas",
    status: "Current Role",
    date: "JUNE 2025 — PRESENT",
    desc: "Supporting Smart Factory operations through equipment modeling, server monitoring, and equipment alarm maintenance, while developing scalable internal enterprise applications using React, TypeScript, and Microfrontend Architecture.",
    link: "#",
    image: "/LG_Sinarmas_Logo_Vector.svg",
    contributions: [
      {
        project: "APC (Autonomous Process Control)",
        tasks: [
          "Modeled manufacturing equipment using Factova.",
          "Monitored server and equipment status across sites.",
          "Investigated and resolved equipment alarms.",
        ],
      },
      {
        project: "FDC (Fault Detection and Classification)",
        tasks: [
          "Managed user access within the FDC system.",
          "Assigned and adjusted user roles based on requests.",
        ],
      },
      {
        project: "HRIS (Human Resource Integrated System)",
        tasks: [
          "Developed asset management features.",
          "Integrated secure cloud storage modules using AWS S3.",
          "Implemented Role-Based Access Control.",
        ],
      },
      {
        project: "LMS (Learning Management System)",
        tasks: [
          "Fixed bugs to improve system stability.",
          "Revamped the Learning Management page.",
        ],
      },
      {
        project: "Job Portal",
        tasks: [
          "Developed new features to support recruitment.",
          "Redesigned the Applicant Management interface.",
        ],
      },
    ],
    culture: [
      {
        activity: "Growth Circuit",
        photo: "/LGSM.webp",
        desc: "Annual event setting goals and aligning vision.",
      },
      {
        activity: "Team Dinner",
        photo: "/Ayce.webp",
        desc: "Appreciating and celebrating employee performance.",
      },
      {
        activity: "Company Outing",
        photo: "/Outing.webp",
        desc: "Strengthening the bonds of brotherhood and teamwork.",
      },
      {
        activity: "Futsal",
        photo: "/Futsal.webp",
        desc: "Organized to maintain physical fitness and well-being.",
      },
    ],
  },

};

// Certificates
export const CERTIFICATES = [
  { title: "SOLID Principles: Introducing Software Architecture & Design", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-6ff76bda-84e8-4650-82d7-af2298bbe167/" },
  { title: "Clean Code", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-f9a43bb7-cae6-402f-88c9-10ce63c25d24/" },
  { title: "Fundamentals of Software Design and Architecture Course", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-37fc4f6c-08ab-4881-9246-3f561902b2b3/" },
  { title: "Team Agility through Agile Ways of Working", issuer: "Agile Academy Indonesia", year: "2025", link: "https://drive.google.com/drive/folders/1zNRpF_mX7S5pA-MK-BZbmYDiXlbBdhH0?usp=sharing" },
  { title: "C# Basics for Beginners: Learn C# Fundamentals by Coding", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-f5ec86b8-bde2-459f-b596-bf83c536b2ab/" },
  { title: "Belajar Frontend Website (HTML, CSS dan Javascript)", issuer: "Udemy", year: "2025", link: "https://www.udemy.com/certificate/UC-3b379b97-a4bd-4981-b1c5-9375dc8924f4/" },
  { title: "Java Bootcamp: Learn Java with 100+ Java Projects", issuer: "Udemy", year: "2025", link: "https://www.udemy.com/certificate/UC-cf7a6f29-db74-41c8-a2b0-d647df3e28d1/" },
  { title: "Cloud Practitioner Essentials (Learn AWS Cloud Basic)", issuer: "Dicoding Indonesia", year: "2025", link: "https://www.dicoding.com/certificates/53XEDN5R9PRN" },
  { title: "Introduction to REST APIs for Absolute Beginners", issuer: "Udemy", year: "2025", link: "https://www.udemy.com/certificate/UC-da90b50c-184e-4f53-b71f-d7901efe6032/" },
  { title: "Belajar Machine Learning untuk Pemula", issuer: "Dicoding Indonesia", year: "2024", link: "https://www.dicoding.com/certificates/N9ZOOM2R6ZG5" },
  { title: "English Speaking Intensive 1 - Level A1 (Excellent)", issuer: "WECAMP English Village", year: "2023", link: "https://drive.google.com/drive/folders/194f4uT8lAj3exXrlVMSucuPSIFegt2FK?usp=sharing" },
  { title: "Tax Brevet Training AB + e-SPT", issuer: "Centre for Accounting Development, Universitas Indonesia", year: "2023", link: "https://drive.google.com/drive/folders/1975seEYudg15J2RXj18TPMVMR5yE60_w?usp=sharing" },
  { title: "Belajar Dasar Manajemen Proyek", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/KEXL05Q8RPG2" },
  { title: "Belajar Dasar Visualisasi Data", issuer: "Dicoding Indonesia", year: "2023", link: "https://dicoding.com/certificates/0LZ0QOW63Z65" },
  { title: "Belajar Dasar Git dengan Github", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/6RPN4K1J4X2M" },
  { title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/NVP78926RXR0" },
  { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/6RPN48R65X2M" },
  { title: "Memulai Pemrograman dengan Haskell", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/98XWV40V9PM3" },
  { title: "Belajar Dasar Structured Query Language (SQL)", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/07Z68K26JXQR" },
  { title: "Belajar Dasar-Dasar DevOps", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/4EXG4YY9GPRL" },
  { title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software", issuer: "Dicoding Indonesia", year: "2023", link: "https://www.dicoding.com/certificates/1RXY0N50QZVM" },
];
