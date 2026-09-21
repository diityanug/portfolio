import { ArrowRight } from '@phosphor-icons/react';

// --- Button-in-Button CTA ---
const ButtonInButton = ({ text, onClick }: { text: string, onClick?: () => void }) => (
  <button onClick={onClick} className="group relative flex items-center gap-4 bg-ink text-white pl-6 pr-2 py-2 rounded-full font-medium hover:bg-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)]">
    <span className="text-[15px]">{text}</span>
    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-ink group-hover:scale-105 group-hover:translate-x-1 group-hover:-translate-y-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
      <ArrowRight size={18} weight="bold" />
    </div>
  </button>
);


export default ButtonInButton;
