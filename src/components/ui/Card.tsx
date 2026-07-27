/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Card Component
   Glassmorphic card with hover effects and gradient border
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type CardVariant = 'glass' | 'solid' | 'outline' | 'ghost';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  gradientBorder?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  glass: 'bg-fp-dark/60 backdrop-blur-xl border border-fp-border/30',
  solid: 'bg-fp-dark border border-fp-border/50',
  outline: 'bg-transparent border border-fp-border/40',
  ghost: 'bg-fp-surface/20',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  variant = 'glass',
  hover = false,
  gradientBorder = false,
  padding = 'md',
  className,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'cursor-pointer hover:border-fp-neon-blue/30 hover:shadow-[0_8px_32px_rgba(0,212,255,0.08)]',
        gradientBorder && 'gradient-border',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default Card;

// ─── Card Sub-components ────────────────────────────────────

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-lg font-semibold text-fp-white font-display', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm text-fp-gray', className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-fp-border/30', className)}>
      {children}
    </div>
  );
}
