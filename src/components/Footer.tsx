import {
  GithubLogo as Github,
  LinkedinLogo as Linkedin,
  EnvelopeSimple as Mail,
  DownloadSimple as Download,
} from "@phosphor-icons/react";

export const Footer = () => (
  <footer
    id="contact"
    className="bg-ink text-surface py-16 md:py-24 border-t border-ink"
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
      <div>
        <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
          Let's
          <br />
          Connect Together
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:diityanug13@gmail.com"
            className="inline-flex items-center justify-center gap-4 font-mono text-sm md:text-lg uppercase font-bold bg-sun text-ink px-6 md:px-8 py-4 md:py-5 border-2 border-transparent hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0_#ece6df] transition-all active:-translate-y-1 active:translate-x-1 active:shadow-[-8px_8px_0_#ece6df]"
          >
            <span>diityanug13@gmail.com</span>
            <Mail size={20} />
          </a>
          <a
            href="https://drive.google.com/file/d/1ZEeBS8w4b7iTEp52l0HBhRG-ADgdc1jt/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-4 font-mono text-sm md:text-lg uppercase font-bold bg-surface text-ink px-6 md:px-8 py-4 md:py-5 border-2 border-surface hover:bg-[#10b981] hover:text-white hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0_#ece6df] transition-all active:bg-[#10b981] active:text-white active:-translate-y-1 active:translate-x-1 active:shadow-[-8px_8px_0_#ece6df]"
          >
            <span>Resume</span>
            <Download size={20} />
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-end md:items-end gap-8 md:gap-12">
        <div className="flex gap-4 md:gap-6">
          <a
            href="https://github.com/diityanug"
            className="w-12 h-12 bg-surface text-ink flex items-center justify-center hover:bg-[#24292f] hover:text-white hover:border-[#24292f] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#ece6df] transition-all border-2 border-surface active:bg-[#24292f] active:text-white active:border-[#24292f] active:-translate-y-1 active:translate-x-1 active:shadow-[-4px_4px_0_#ece6df]"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/diityanug"
            className="w-12 h-12 bg-surface text-ink flex items-center justify-center hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-4px_4px_0_#ece6df] transition-all border-2 border-surface active:bg-[#0a66c2] active:text-white active:border-[#0a66c2] active:-translate-y-1 active:translate-x-1 active:shadow-[-4px_4px_0_#ece6df]"
          >
            <Linkedin size={24} />
          </a>
        </div>
        <div className="font-mono text-xs md:text-sm text-ink-muted/60 text-left md:text-right">
          © {new Date().getFullYear()} ADITYA NUGRAHA.
          <br />
          SOFTWARE ENGINEER | FRONTEND DEVELOPER.
        </div>
      </div>
    </div>
  </footer>
);
