### Personal Portfolio ###

Personal portfolio website of Aditya Nugraha, a Software Engineer specializing in Frontend Development. Built with React + TypeScript, featuring Home, About, Experience, Projects, and Contact pages with smooth transition animations powered by Framer Motion.

## ✨ Features

- Animated page transitions — page switching using Framer Motion's `AnimatePresence`, complete with blur & fade effects.
- Home — hero section with staggered text animation, a real-time local clock (`ClockWidget`), and a dot grid background.
- About / Profile — education history and certifications.
- Experience — expandable work experience cards highlighting microfrontend contributions & work culture.
- Projects — list of projects with individual detail pages (dynamic route `/projects/:slug`).
- Contact — social links (LinkedIn, GitHub), resume, and direct email.
- Custom fonts — utilizes a collection of custom fonts (The Seasons, Aileron, Red Hat Display, Cardo, Migra, etc.).
- Fully responsive, optimized from mobile to desktop.

## 🛠️ Tech Stack

| Category          | Technology                              |
|-------------------|-----------------------------------------|
| Framework         | React 19 + TypeScript                   |
| Build tool        | Vite                                    |
| Routing           | React Router DOM v7                     |
| Animasi           | Framer Motion                           |
| Styling           | Tailwind CSS                            |
| Icons             | Lucide React                            |
| Package manager   | Bun                                     |
| Linting           | ESLint (typescript-eslint, react-hooks) |


## 📁 Project Structure

src/
├── assets/                     # SVGs & static assets
├── components/
│   ├── contactPage/            # SocialButton, contactDetails
│   ├── experiencePage/         # StaticDotGrid
│   ├── homePage/               # ClockWeather, DotGrid
│   ├── profilePage/            # StarGrid
│   ├── BackgroundTexture.tsx
│   ├── Navbar.tsx
│   └── PageWrapper.tsx
|
├── constants/                  # Static data (profile, contact)
├── pages/                      # HomePage, ProfilePage, ExperiencePage, ProjectsPage, ContactPage, projectDetail
├── types/                      # TypeScript type definitions
├── utils/                      # Animation helpers
├── App.tsx                     # Main routing
└── main.tsx                    # Entry point

public/
├── fonts/                     # Custom font collection
└── images/                    # Images & logos

## 🚀 Local Development

This project uses Bun as the package manager.

```bash
# Clone repository
git clone <repo-url>
cd portofolio

# Install dependencies
bun install

# Run development server
bun run dev
```

Open `http://localhost:5173` in your browser.

### Other Scripts

```bash
bun run build      # Build for production (tsc -b && vite build)
bun run lint       # Run ESLint
bun run preview    # Preview production build
```

## 🧭 Routing

| Path              | Page            |
|-------------------|-----------------|
| `/`               | Home            |
| `/about`          | Profile         |
| `/experience`     | Experience      |
| `/projects`       | Projects        |    
| `/projects/:slug` | Project Details |
| `/contact`        | Contact         |

## 📬 Contact

- Email: diityanug13@gmail.com
- LinkedIn: [linkedin.com/in/diityanug](https://linkedin.com/in/diityanug)
- GitHub: [github.com/diityanug](https://github.com/diityanug)
