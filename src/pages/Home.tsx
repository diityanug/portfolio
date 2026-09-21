import Nav from '../components/sections/Nav';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Profile from '../components/sections/Profile';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-svh bg-white selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <Nav />
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
