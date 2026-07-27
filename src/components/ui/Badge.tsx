/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Badge Component
   Status badges with color-coded variants
   ────────────────────────────────────────────────────────────── */

import React from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'premium';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  dot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  info: 'bg-fp-neon-blue/10 text-fp-neon-blue border-fp-neon-blue/20',
  success: 'bg-fp-neon-cyan/10 text-fp-neon-cyan border-fp-neon-cyan/20',
  warning: 'bg-fp-neon-gold/10 text-fp-neon-gold border-fp-neon-gold/20',
  danger: 'bg-fp-neon-pink/10 text-fp-neon-pink border-fp-neon-pink/20',
  neutral: 'bg-fp-gray/10 text-fp-gray border-fp-gray/20',
  premium: 'bg-gradient-to-r from-fp-neon-blue/10 to-fp-neon-purple/10 text-fp-neon-purple border-fp-neon-purple/20',
};

const dotColors: Record<BadgeVariant, string> = {
  info: 'bg-fp-neon-blue',
  success: 'bg-fp-neon-cyan',
  warning: 'bg-fp-neon-gold',
  danger: 'bg-fp-neon-pink',
  neutral: 'bg-fp-gray',
  premium: 'bg-fp-neon-purple',
};

export default function Badge({
  children,
  variant = 'neutral',
  icon,
  dot = false,
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border rounded-full font-medium',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
      )}
      {icon}
      {children}
    </span>
  );
}
