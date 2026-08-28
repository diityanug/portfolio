import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

import Navbar from './components/layout/Navbar';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ProjectDetail from './pages/projectDetail';

const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  out: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
};

const MainPortfolio = () => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="flex flex-col w-full bg-[#F9F8F4]"
    >
      <section id="home"><HomePage /></section>
      <section id="about"><ProfilePage /></section>
      <section id="experience"><ExperiencePage /></section>
      <section id="projects"><ProjectsPage /></section>
      <section id="contact"><ContactPage /></section>
    </motion.main>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={true} onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPortfolio />} />
        <Route
          path="/projects/:slug"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              className="w-full min-h-dvh"
            >
              <ProjectDetail />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <div className="relative z-0 min-h-dvh bg-[#F9F8F4] overflow-x-hidden">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;