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
        photo: "../LGSM.webp",
        desc: "Annual event setting goals and aligning vision.",
      },
      {
        activity: "Team Dinner",
        photo: "../Ayce.webp",
        desc: "Appreciating and celebrating employee performance.",
      },
      {
        activity: "Company Outing",
        photo: "../Outing.webp",
        desc: "Strengthening the bonds of brotherhood and teamwork.",
      },
      {
        activity: "Futsal",
        photo: "../Futsal.webp",
        desc: "Organized to maintain physical fitness and well-being.",
      },
    ],
  },

  // Certificates
  "aws-cert": {
    title: "AWS Certified Developer",
    status: "Active",
    date: "Oct 2023",
    desc: "Validation of technical expertise in developing and maintaining applications on the AWS platform.",
    link: "#",
    bullets: [
      "Deep understanding of core AWS services",
      "Proficiency in developing cloud-based applications",
    ],
  },
  "react-patterns": {
    title: "Advanced React Patterns",
    status: "Completed",
    date: "Mar 2022",
    desc: "Comprehensive course covering advanced component patterns and performance optimization in React.",
    link: "#",
    bullets: [
      "Mastered Compound Components",
      "Deepened knowledge of React hooks",
    ],
  },
  "uiux-design": {
    title: "UI/UX Design Specialization",
    status: "Completed",
    date: "Nov 2021",
    desc: "A multi-course specialization focusing on user research, wireframing, and interactive prototyping.",
    link: "#",
    bullets: [
      "Applied human-computer interaction theories",
      "Conducted usability tests",
    ],
  },
  "gcp-foundations": {
    title: "Cloud Architecture Foundations",
    status: "Completed",
    date: "Jan 2021",
    desc: "Foundational knowledge of Google Cloud computing and infrastructure.",
    link: "#",
    bullets: [
      "Configured VPCs and Compute Engine",
      "Studied fundamental cloud security principles",
    ],
  },
};
