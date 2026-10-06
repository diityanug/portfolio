import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

interface LogoHeaderProps {
  /** Section tujuan di Home, contoh: "#projects" */
  backHash: string;
  /** Nama section untuk label, contoh: "Projects" */
  backName: string;
}

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/60';

/**
 * Header halaman detail (slug), menetap di atas saat scroll.
 * Kiri: tombol kembali ke section asal di Home. Tengah: logo (Home).
 * Latar belakang konten yang lewat di bawahnya diblur.
 */
const LogoHeader = ({ backHash, backName }: LogoHeaderProps) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-black/5">
      <div className="max-w-350 mx-auto px-4 md:px-6 h-16 md:h-20 grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Kembali ke section */}
        <Link
          to={`/${backHash}`}
          state={{ scrollTo: backHash }}
          aria-label={`Back to ${backName}`}
          className={`group justify-self-start inline-flex items-center gap-2 h-10 px-3 -ml-3 rounded-full text-sm font-semibold text-steel hover:text-ink transition-colors duration-300 ${focusRing}`}
        >
          <ArrowLeft size={18} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to {backName}</span>
        </Link>

        {/* Logo / Home */}
        <Link
          to="/"
          aria-label="Aditya Nugraha, kembali ke Home"
          className={`group justify-self-center block rounded-full ${focusRing}`}
        >
          <img
            src="/logo-static.svg"
            alt=""
            className="w-9 h-9 group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>
    </header>
  );
};

export default LogoHeader;