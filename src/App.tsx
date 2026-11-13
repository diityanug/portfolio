import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CareerDetail from "./pages/CareerDetail";
import AdminDashboard from "./pages/AdminDashboard";
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

const AppShell = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/career/:slug" element={<CareerDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <ScrollToTop />
      {!isAdminRoute && <Nav />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
