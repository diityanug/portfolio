import type { ComponentPropsWithoutRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

type ButtonInButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  text: string;
};

const EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]';

const ButtonInButton = ({
  text,
  type = 'button',
  className = '',
  ...props
}: ButtonInButtonProps) => (
  <button
    type={type}
    className={`group flex items-center gap-4 rounded-full bg-ink py-2 pl-6 pr-2 font-medium text-white
      shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)] outline-none
      transition-[background-color,transform] duration-300 ${EASE}
      hover:bg-black active:scale-[0.98]
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/60
      disabled:pointer-events-none disabled:opacity-50
      motion-reduce:transition-none ${className}`}
    {...props}
  >
    <span className="text-[15px]">{text}</span>
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/15
        transition-[background-color,color,transform] duration-500 ${EASE}
        group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105
        group-hover:bg-white group-hover:text-ink
        motion-reduce:transition-none`}
    >
      <ArrowRight size={18} weight="bold" aria-hidden="true" />
    </span>
  </button>
);

export default ButtonInButton;