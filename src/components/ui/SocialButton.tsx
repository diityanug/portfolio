import type { ReactElement, ReactNode } from 'react';

interface SocialButtonProps {
  readonly url: string;
  readonly icon: ReactNode;
  readonly label: string;
}

export const SocialButton = ({ url, icon, label }: SocialButtonProps): ReactElement => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-1.5 rounded-full border border-[#2E4C38]/10 bg-[#4A6750]/5 px-3 py-1.5 text-[#4A6750] transition-colors duration-300 hover:border-[#4A6750] hover:bg-[#4A6750] hover:text-white"
  >
    <span className="shrink-0 text-[#4A6750] transition-colors duration-300 group-hover:text-white">
      {icon}
    </span>
    <span className="font-redhat text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-white">
      {label}
    </span>
  </a>
);