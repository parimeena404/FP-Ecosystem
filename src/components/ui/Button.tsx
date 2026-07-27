/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Button Component
   Premium button with variants, loading state, and animations
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] active:scale-[0.98]',
  secondary:
    'bg-fp-surface text-fp-white border border-fp-border hover:border-fp-neon-blue/50 hover:bg-fp-surface/80',
  ghost:
    'bg-transparent text-fp-gray hover:text-fp-white hover:bg-fp-surface/50',
  danger:
    'bg-fp-neon-pink/10 text-fp-neon-pink border border-fp-neon-pink/30 hover:bg-fp-neon-pink/20',
  outline:
    'bg-transparent text-fp-white border border-fp-border hover:border-fp-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
  sm: 'px-4 py-2 text-sm gap-2 rounded-xl',
  md: 'px-6 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-8 py-3.5 text-base gap-3 rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  href,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'focus-visible:outline-2 focus-visible:outline-fp-neon-blue focus-visible:outline-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {loading && <Spinner />}
      {!loading && icon}
      {children}
      {!loading && iconRight}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
