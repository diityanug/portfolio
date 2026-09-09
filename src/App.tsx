import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import RouteErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/layout/Navbar';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  out: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeIn' } }
};

const RouteLoadingFallback = () => (
  <div className="w-full min-h-dvh flex items-center justify-center bg-[#F9F8F4]">
    <div className="w-8 h-8 rounded-full border-2 border-[#1A2F24]/20 border-t-[#4A6750] animate-spin" />
  </div>
);
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
              <RouteErrorBoundary>
                <Suspense fallback={<RouteLoadingFallback />}>
                  <ProjectDetail />
                </Suspense>
              </RouteErrorBoundary>
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