/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Magnetic Button
   Premium hover interaction with magnetic pull effect
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  glow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]',
    secondary:
      'bg-fp-surface text-fp-white border border-fp-border hover:border-fp-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]',
    ghost: 'bg-transparent text-fp-white hover:bg-fp-surface/50',
    outline:
      'bg-transparent border-2 border-fp-neon-blue text-fp-neon-blue hover:bg-fp-neon-blue/10 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
          'transition-all duration-300 ease-out cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fp-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-fp-black',
          variants[variant],
          sizes[size],
          glow && 'after:absolute after:inset-0 after:rounded-xl after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300',
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Component>
    </motion.div>
  );
}
