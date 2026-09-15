import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { EduCert } from "./EduCert";
import { Footer } from "../../components/Footer";

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="w-full flex flex-col bg-surface">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <EduCert />
      <Footer />
    </main>
  );
};
