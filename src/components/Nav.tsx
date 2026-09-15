import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    if (!isHome) {
      navigate(`/${targetId}`);
      return;
    }

    const wasOpen = isOpen;
    setIsOpen(false);

    // Delay scroll slightly on mobile to allow menu to close first,
    // avoiding layout shift conflicts during smooth scroll.
    setTimeout(
      () => {
        const elem = document.querySelector(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      },
      wasOpen ? 350 : 0,
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b-2 border-ink">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between relative z-20 bg-surface">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setIsOpen(false);
          }}
          className="font-mono font-bold text-xl uppercase tracking-wider flex items-center gap-2 group"
        >
          <img src="/logo-animated.svg" alt="Logo" className="w-8 h-8" />
          <span className="group-hover:text-sky transition-colors group-active:text-sky">
            DIITYANUG
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase font-semibold">
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, "#projects")}
            className="hover:text-sky transition-colors cursor-pointer active:text-sky"
          >
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => handleScroll(e, "#experience")}
            className="hover:text-sky transition-colors cursor-pointer active:text-sky"
          >
            Experience
          </a>
          <a
            href="#skills"
            onClick={(e) => handleScroll(e, "#skills")}
            className="hover:text-sky transition-colors cursor-pointer active:text-sky"
          >
            Skills
          </a>
          <a
            href="#education"
            onClick={(e) => handleScroll(e, "#education")}
            className="hover:text-sky transition-colors cursor-pointer active:text-sky"
          >
            Education
          </a>
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="inline-flex items-center gap-2 font-mono text-sm uppercase font-bold bg-sun px-6 py-2 border-2 border-ink hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#383838] transition-all cursor-pointer active:-translate-y-1 active:translate-x-1 active:shadow-[-4px_4px_0_#383838]"
          >
            <span>Contact</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 bg-chrome border-2 border-ink transition-transform active:bg-ink active:text-surface"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden origin-top absolute top-full left-0 w-full z-40"
          >
            <div className="border-t-2 border-b-2 border-ink bg-surface flex flex-col px-6 pb-6 pt-4 gap-4 font-mono uppercase font-bold text-lg shadow-2xl">
              <a
                href="#projects"
                onClick={(e) => handleScroll(e, "#projects")}
                className="py-2 border-b-2 border-ink/10 hover:text-sky active:text-sky transition-all origin-left"
              >
                Projects
              </a>
              <a
                href="#experience"
                onClick={(e) => handleScroll(e, "#experience")}
                className="py-2 border-b-2 border-ink/10 hover:text-sky active:text-sky transition-all origin-left"
              >
                Experience
              </a>
              <a
                href="#skills"
                onClick={(e) => handleScroll(e, "#skills")}
                className="py-2 border-b-2 border-ink/10 hover:text-sky active:text-sky transition-all origin-left"
              >
                Skills
              </a>
              <a
                href="#education"
                onClick={(e) => handleScroll(e, "#education")}
                className="py-2 border-b-2 border-ink/10 hover:text-sky active:text-sky transition-all origin-left"
              >
                Education
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="py-2 text-watermelon active:text-watermelon/80 transition-all origin-left"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
