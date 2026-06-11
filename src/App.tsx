import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import PageWrapper from './components/PageWrapper';
import ProjectDetail from './pages/projectDetail';
import BackgroundTexture from './components/BackgroundTexture';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><ProfilePage /></PageWrapper>} />
        <Route path="/experience" element={<PageWrapper><ExperiencePage /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/projects/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="relative z-0 min-h-screen bg-white overflow-x-hidden">
        <BackgroundTexture />

        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;