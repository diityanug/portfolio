import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

import { HomeLockProvider, useHomeLock } from './context/HomeLockContext';

import Navbar from './components/layout/Navbar';
import PageWrapper from './components/layout/PageWrapper';
import BackgroundTexture from './components/ui/BackgroundTexture';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ProjectDetail from './pages/projectDetail';

const MainPortfolio = () => {
  const { homeLocked } = useHomeLock();
  const [hasRevealedOnce, setHasRevealedOnce] = useState(!homeLocked);
  
  useEffect(() => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) return;
    
    if (homeLocked) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  }, [homeLocked]);

  useEffect(() => {
    if (!homeLocked && !hasRevealedOnce) {
      setHasRevealedOnce(true);
    }
  }, [homeLocked, hasRevealedOnce]);

  const transitionSpec: Transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="relative w-full bg-[#F9F8F4]">
      
      {/* Main Portfolio Sections */}
      <div className="flex flex-col w-full bg-[#F9F8F4]">
        <section id="about"><ProfilePage /></section>
        <section id="experience"><ExperiencePage /></section>
        <section id="projects"><ProjectsPage /></section>
        <section id="contact"><ContactPage /></section>
      </div>

      {/* Homepage Cover Overlay */}
      <AnimatePresence initial={false}>
        {homeLocked && (
          <motion.div
            key="cover-page"
            initial={{ y: "-110%" }} 
            animate={{ y: "0%", pointerEvents: "auto" }}
            exit={{ y: "-110%", pointerEvents: "none" }}
            transition={transitionSpec}
            className="fixed top-0 left-0 w-full h-[100dvh] z-50 flex flex-col bg-[#F9F8F4] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overscroll-none"
          >
            <AnimatePresence>
              <HomePage />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        if (!window.location.hash) window.scrollTo(0, 0);
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><MainPortfolio /></PageWrapper>} />
        <Route path="/projects/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
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
      <HomeLockProvider>
        <div className="relative z-0 min-h-screen bg-[#F9F8F4] overflow-x-hidden scroll-smooth">
          <BackgroundTexture />
          <Navbar />
          <AnimatedRoutes />
        </div>
      </HomeLockProvider>
    </Router>
  );
}

export default App;