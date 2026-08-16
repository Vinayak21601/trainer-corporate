'use client';

import { MouseEventHandler, ReactNode } from 'react';
import { motion } from 'motion/react';

type LandingButtonVariant = 'primary' | 'accent' | 'secondary' | 'dark';
type LandingButtonSize = 'xs' | 'sm' | 'md';

interface LandingButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: LandingButtonSize;
  type?: 'button' | 'submit';
  variant?: LandingButtonVariant;
}

const variantClasses: Record<LandingButtonVariant, string> = {
  primary: 'border-[#173E82] bg-[#176BFF] text-white shadow-[0_12px_28px_rgba(23,107,255,0.24)] hover:bg-[#0D5DE8]',
  accent: 'border-[#25C99A] bg-[#31E6B1] text-[#071B2F] shadow-[0_12px_28px_rgba(49,230,177,0.24)] hover:bg-[#55EFC1]',
  secondary: 'border-[#C9D9EA] bg-white/92 text-[#102044] shadow-[0_10px_24px_rgba(35,67,104,0.09)] hover:border-[#9DBBDB] hover:bg-white',
  dark: 'border-[#1C315B] bg-[#091B3E] text-white shadow-[0_12px_28px_rgba(7,19,47,0.24)] hover:bg-[#102B59]'
};

const sizeClasses: Record<LandingButtonSize, string> = {
  xs: 'h-8 px-3 text-[10px]',
  sm: 'h-10 px-4 text-xs',
  md: 'h-11 px-5 text-xs sm:text-sm'
};

export function LandingButton({
  children,
  className = '',
  disabled = false,
  endIcon,
  onClick,
  size = 'md',
  type = 'button',
  variant = 'primary'
}: LandingButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`atlas-focus group relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-[8px] border font-black transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-white/70 opacity-80" />
      <span className="relative z-10">{children}</span>
      {endIcon && (
        <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-[6px] bg-current/10 transition-transform duration-200 group-hover:translate-x-0.5">
          {endIcon}
        </span>
      )}
    </motion.button>
  );
}
