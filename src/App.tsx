import { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import RouteErrorBoundary from './components/ErrorBoundary';

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

const RouteLoadingFallback = () => (
  <div className="w-full min-h-dvh flex items-center justify-center bg-[#f7f4ed]">
    <div className="w-8 h-8 rounded-full border-2 border-black/10 border-t-black animate-spin" />
  </div>
);
const MainPortfolio = () => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="flex flex-col w-full bg-[#f7f4ed]"
    >
      <HomePage />
      <ProfilePage />
      <ExperiencePage />
      <ProjectsPage />
      <ContactPage />
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
      <div className="relative z-0 min-h-dvh bg-[#f7f4ed] text-[#1c1c1c] overflow-x-hidden">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;