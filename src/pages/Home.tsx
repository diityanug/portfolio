import Hero from '../components/sections/Hero';
import Profile from '../components/sections/Profile';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#ffffff] text-[#111111] selection:bg-[#111111]/10 selection:text-[#111111] overflow-x-hidden">
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
