import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { DetailPage } from "./pages/Detail";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/project/:slug"
            element={<DetailPage type="Project" />}
          />
          <Route path="/career/:slug" element={<DetailPage type="Career" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
