# Aditya Nugraha — Portfolio

Personal portfolio website, Software Engineer focusing on frontend, web, and mobile app development.

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

---

## ⚡ Tech Stack

- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **Tooling**: Vite, Bun, Oxlint

---

## ✨ Features

- **Interactive Hero**: Dynamic character animations and micro-interactions.
- **Editorial Profile**: Bio, background, and core tech stack overview.
- **Career Highlights**: Experience timeline and detailed role breakdowns (e.g., LG Sinarmas).
- **Featured Projects**: Project showcase with step-by-step workflow breakdowns and source links.
- **Education & Credentials**: Academic background and verifiable certificates.
- **Responsive Layout**: Designed for seamless experience across mobile, tablet, and desktop.

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended, `>=1.0.0`) or [Node.js](https://nodejs.org/) (`>=18.x`)

### Installation & Run

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── sections/    # Hero, Profile, Skills, Experience, Projects, Education, Footer
│   └── ui/          # Reusable UI elements (AnimatedCharacter, etc.)
├── pages/           # Home, ProjectDetail, CareerDetail
├── utils/           # Animation variants and helpers
├── App.tsx          # App routing and scroll restoration
├── data.ts          # Portfolio data (projects, career, certificates)
└── main.tsx         # Application entry point
```

---

## 📝 License

Designed and developed by [Aditya Nugraha](https://github.com/diityanug).
