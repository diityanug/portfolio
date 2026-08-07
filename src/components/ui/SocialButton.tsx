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
    className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-black/10 bg-white hover:border-[#5E7657] hover:bg-[#5E7657] hover:text-white transition-all duration-300 shadow-sm"
  >
    <span className="text-[#2A2320] group-hover:text-white transition-colors duration-300">
      {icon}
    </span>
    <span className="font-poppins font-medium text-[10px] md:text-xs tracking-widest uppercase text-[#2A2320] group-hover:text-white transition-colors duration-300">
      {label}
    </span>
  </a>
);