export const DATA: Record<string, any> = {
  // Projects
  "genre-game-classifier": {
    title: "Genre Game Classifier",
    subtitle: "Predicts video game genres from story descriptions.",
    role: "Fullstack Machine Learning",
    timeline: "2024 ~ 2025",
    desc: "A web app that reads a game's title and description, then automatically guesses its genres (like Action, RPG, or Horror) and shows which words led to that answer.",
    overview: "An AI web app that predicts up to 5 video game genres just from a game's title and short description, complete with a fun 'Guess the Genre' minigame.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "FastAPI", "Python", "Scikit-Learn", "spaCy"],
    workflowTitle: "How It Works",
    workflowSubtitle: "Three simple steps from typing a game description to seeing the AI's genre prediction.",
    keyFeatures: [
      "Predicts up to 5 genres at once across 15 game categories",
      "Highlights the exact words that made the AI choose each genre",
      "Playable 'Guess the Genre' minigame with live score tracking",
      "Clean side-by-side screen with auto-typed game examples",
      "Saves your last 10 searches so you can reopen them anytime",
    ],
    challenges: "A single game rarely fits just one genre—for example, a game can be both RPG and Adventure. The main challenge was teaching the AI to pick multiple relevant genres without guessing too many random ones, and showing users the exact keywords behind every prediction so the result is easy to understand.",
    overviewParagraphs: [
      "Users simply type or paste a game's title and summary. In seconds, the system analyzes the text and shows the most likely genres with clear percentage bars.",
      "Instead of acting like a 'black box', the app highlights the top 3 words from your text that triggered each genre. It also includes an interactive minigame where you can test yourself by guessing genres from real game descriptions.",
    ],
    githubLink: "https://github.com/diityanug/game-genre-classifier",
    workflow: [
      {
        image: "/ggc-input.svg",
        step: "Enter Game Title & Story",
        desc: "Type a game title and description, try one of the auto-typed examples, or switch to the 'Guess the Genre' minigame.",
      },
      {
        image: "/ggc-output.svg",
        step: "See Genres & Trigger Words",
        desc: "View the top predicted genres with confidence bars and see the exact words from your text that influenced the AI.",
      },
      {
        image: "/ggc-history.svg",
        step: "Recent History & Minigame",
        desc: "Reopen your last 10 predictions with one click, or play the built-in quiz to guess genres from mystery game descriptions.",
      },
    ],
  },
  "lenvry": {
    title: "Lenvry",
    subtitle: "Offline tracker for workouts, habits, and meals.",
    role: "Mobile App Developer",
    timeline: "2026 - Still Development",
    desc: "Lenvry combines a workout logger, habit alarm, calorie & water tracker, money manager, sticky notes, and online course tracker into one private offline app.",
    overview: "An all-in-one daily life tracker built with React Native. Manage your workouts, habits, daily meals, finances, sticky notes, and learning progress in one place—100% offline.",
    tags: ["React Native", "Expo Router", "TypeScript", "Zustand", "SQLite", "Zod", "AsyncStorage"],
    workflowTitle: "App Modules & Features",
    workflowSubtitle: "A quick look at the five main tools inside Lenvry for managing your daily routine.",
    keyFeatures: [
      "Home & Growth Hub: Daily summary, Sticky Notes, and Online Course Tracker",
      "Fitness Tracker: Log workouts quickly with saved routine presets",
      "Habit Tracker: Daily streaks and reminders with custom alarm sounds",
      "Meal & Water Tracker: Built-in Indonesian food list, calorie/macro counter & water log",
      "Finance Manager: Track IDR & USD wallets, pockets, debts, and monthly bills",
      "100% Offline & Private: All data stays on your phone with easy file backup & restore",
    ],
    challenges: "Most people get tired of opening five different apps just to log their workout, meals, habits, expenses, and notes. The challenge was combining all of those daily tools into one fast, easy-to-use app that works completely offline without losing or mixing up user data.",
    overviewParagraphs: [
      "Lenvry replaces multiple daily apps with one clean dashboard. From the Home screen, you can check today's habits, calories, workouts, and spending—or switch to the 'Growth' tab to pin sticky notes and track online courses you are taking.",
      "Everything is saved directly on your phone so it works anytime without an internet connection, including a built-in Indonesian food database and one-tap backup to keep your data safe.",
    ],
    githubLink: "https://github.com/diityanug/Lenvry",
    workflow: [
      {
        image: "/lenvry-fitness.svg",
        step: "Workout & Routine Tracker",
        desc: "Save your favorite gym routines, log sets and weights, and track your total training volume by muscle group.",
      },
      {
        image: "/lenvry-habits.svg",
        step: "Daily Habits & Custom Alarms",
        desc: "Build daily streaks, set priority tasks, and get reminded with custom notification chimes.",
      },
      {
        image: "/lenvry-nutrition.svg",
        step: "Meals, Calories & Water Log",
        desc: "Search everyday Indonesian foods and drinks offline, track protein/carbs/fat automatically, and log your daily water glasses.",
      },
      {
        image: "/lenvry-finance.svg",
        step: "Wallets, Debts & Monthly Bills",
        desc: "Manage IDR and USD wallets, split money into sub-pockets, record debts (hutang/piutang), and track recurring bills.",
      },
      {
        image: "/lenvry-growth.svg",
        step: "Sticky Notes, Courses & Backup",
        desc: "Pin colorful sticky notes and checklists, track your online courses, and back up all your app data anytime.",
      },
    ],
  },
  "reka": {
    title: "REKA",
    subtitle: "Private money manager with AI receipt scanning.",
    role: "Mobile App Developer",
    timeline: "2026",
    desc: "REKA helps you track IDR & USD wallets, saving pockets, budget plans, and shared loans ('talangan') offline—plus AI scanners to read shopping receipts and bank e-Statements automatically.",
    overview: "A private, offline-first money manager for IDR and USD. Organize saving pockets, track shared expenses ('talangan'), lock your app with biometrics, and scan receipts or bank statements using Google Gemini AI.",
    tags: ["React Native", "Expo", "TypeScript", "SQLite", "Google Gemini", "Biometric Auth", "PDF Export"],
    workflowTitle: "App Modules & Features",
    workflowSubtitle: "How REKA makes managing multiple wallets, budgets, and receipts effortless.",
    keyFeatures: [
      "Multi-Currency Wallets: Track IDR & USD balances with live exchange rates",
      "AI Receipt & e-Statement Scanner: Auto-read shopping photos and bank PDF/CSV statements",
      "Loan & 'Talangan' Tracker: Record money lent or borrowed and track repayments",
      "Saving Pockets & Budget Plans: Split accounts into pockets and 50/30/20 budgets",
      "Biometric & PIN Lock: Protect your financial data with Face ID, Fingerprint, or PIN",
      "A4 PDF Reports & Backup: Export neat A4 PDF financial statements, CSV sheets, or full backups",
    ],
    challenges: "Recording daily expenses manually is tiring, and mixing Rupiah (IDR) with US Dollars (USD) or tracking friends' reimbursements ('uang talangan') often makes wallet balances messy. REKA solves this by keeping IDR and USD neatly organized, linking loan repayments directly to your wallets, and using AI to read receipts and bank statements in seconds.",
    overviewParagraphs: [
      "REKA (from 'Merancang Keuangan') is built for people who want full control of their money without connecting their bank login to the cloud. All your bank accounts, e-wallets, saving pockets, and budget plans are stored privately on your phone.",
      "When you don't want to type transactions one by one, simply snap a photo of a shopping receipt or upload a bank/e-wallet e-Statement (PDF, CSV, or screenshot). Gemini AI reads the items, matches the right wallet, and skips duplicate entries automatically.",
    ],
    githubLink: "https://github.com/diityanug/REKA",
    workflow: [
      {
        image: "/reka-overview.svg",
        step: "Multi-Currency Wallets & Transfers",
        desc: "View all your IDR and USD accounts in one place, reorder wallets easily, and transfer money across currencies with live exchange rates.",
      },
      {
        image: "/reka-pockets.svg",
        step: "Saving Pockets, Budgets & 'Talangan'",
        desc: "Divide any account into saving pockets, plan monthly budgets (like 50/30/20), and track money lent ('piutang/talangan') or borrowed.",
      },
      {
        image: "/reka-scanner.svg",
        step: "AI Receipt & Bank Statement Scanner",
        desc: "Take a photo of a shopping receipt or import bank/e-wallet PDF & CSV statements—AI extracts the numbers and prevents duplicates.",
      },
      {
        image: "/reka-analytics.svg",
        step: "Spending Charts, App Lock & PDF Export",
        desc: "Check your savings rate and spending charts, lock the app with Fingerprint/Face ID, and export formal A4 PDF financial reports.",
      },
    ],
  },

  // Careers
  "software-engineer-lg": {
    title: "Software Engineer at LG Sinarmas",
    status: "Current Work",
    date: "JUNE 2025 — PRESENT",
    desc: "Part of GDC Indonesia - currently working on APC modeling equipment and as a system administrator for CSR on FDC. Additionally, working on internal projects such as HRIS, LMS Management, and a Job portal.",
    contributions: [
      {
        project: "APC (Autonomous Process Control)",
        tasks: [
          "Modeled manufacturing equipment parameters and configurations using the Factova platform.",
          "Engineered an automated hourly alarm extraction script to harvest, parse, and compile equipment alarms across systems for regular reporting.",
          "Provisioned and configured server environments, including connecting Factova to Oracle Database, installing essential software dependencies, and linking Git with related repositories.",
        ],
      },
      {
        project: "FDC (Fault Detection and Classification)",
        tasks: [
          "Developed automated monitoring scripts to track disk and RAM utilization across multiple factory sites.",
          "Helped mitigate system bottlenecks and outages through proactive multi-server resource usage monitoring.",
          "Administered user access and managed role permissions across the FDC platform based on internal requests.",
        ],
      },
      {
        project: "HRIS (Human Resource Integrated System)",
        tasks: [
          "Developed the centralized Asset Management page, enabling dynamic web asset management to eliminate hardcoded resources.",
          "Integrated AWS S3 cloud storage for secure, scalable asset uploads, caching, and fast web delivery.",
          "Implemented Role-Based Access Control (RBAC) to enforce strict internal permission levels and secure asset access.",
        ],
      },
      {
        project: "LMS (Learning Management System)",
        tasks: [
          "Revamped and modernized the Learning Management interface with a clean UI system for Common Code and Common Code Group management.",
          "Standardized dynamic code configurations across modules, enabling seamless administration of system master data.",
          "Fixed critical frontend bugs and optimized state handling to deliver a more stable and responsive user experience.",
        ],
      },
      {
        project: "Job Portal",
        tasks: [
          "Leading full Frontend development across core recruitment modules: Job Posting, Job Requisition, and Application Management.",
          "Engineered new interactive features, including an Activity Log slide-over sidebar for real-time audit and tracking.",
          "Revamped and modernized workflow modals to elevate user experience, responsiveness, and interaction flow.",
          "Resolved complex bugs and edge cases to consistently improve system stability and performance.",
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
  { title: "Panduan LLM untuk Developer: Dasar hingga Aplikasi Praktis", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-fbbe3ef3-e512-4e29-9900-754de977e6f7/" },
  { title: "Principles of Secure Coding", issuer: "Udemy", year: "2026", link: "https://www.udemy.com/certificate/UC-1438581d-574b-4338-a428-6d9dbc1dacf8/" },
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
  { title: "Tax Brevet Training AB + e-SPT", issuer: "Universitas Indonesia", year: "2023", link: "https://drive.google.com/drive/folders/1975seEYudg15J2RXj18TPMVMR5yE60_w?usp=sharing" },
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
