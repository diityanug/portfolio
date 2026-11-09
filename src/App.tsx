import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CareerDetail from "./pages/CareerDetail";
import Nav from "./components/sections/Nav";

const SCROLL_OFFSET = 88;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (pathname === "/" && hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "instant" });
        window.dispatchEvent(new Event("scroll"));
        el.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.dispatchEvent(new Event("scroll"));
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/career/:slug" element={<CareerDetail />} />
      </Routes>
      <ScrollToTop />
      <Nav />
    </BrowserRouter>
  );
}

export default App;
