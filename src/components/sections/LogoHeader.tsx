import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';

interface LogoHeaderProps {
  backHash: `#${string}`;
  backName: string;
}

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/60';

const LogoHeader = ({ backHash, backName }: LogoHeaderProps) => (
  <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
    <nav
      aria-label="Page"
      className="max-w-350 mx-auto px-4 md:px-6 h-16 md:h-20 grid grid-cols-[1fr_auto_1fr] items-center"
    >
      <Link
        to={{ pathname: '/', hash: backHash }}
        className={`group justify-self-start inline-flex items-center gap-2 h-10 px-3 -ml-3 rounded-full text-sm font-semibold text-steel hover:text-ink transition-colors duration-300 motion-reduce:transition-none ${focusRing}`}
      >
        <ArrowLeft
          size={18}
          weight="bold"
          aria-hidden
          className="transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-x-1"
        />
        <span>
          Back<span className="hidden sm:inline"> to {backName}</span>
          <span className="sm:hidden sr-only"> to {backName}</span>
        </span>
      </Link>

      <Link
        to="/"
        aria-label="Aditya Nugraha, Home"
        className={`group justify-self-center block rounded-full ${focusRing}`}
      >
        <img
          src="/logo-static.svg"
          alt=""
          width={36}
          height={36}
          decoding="async"
          className="w-9 h-9 transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
        />
      </Link>
    </nav>
  </header>
);

export default LogoHeader;