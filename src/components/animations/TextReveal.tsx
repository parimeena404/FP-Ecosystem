/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Text Reveal Animation
   Clean, robust text entrance animation
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  once?: boolean;
  gradient?: boolean;
}

export default function TextReveal({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  once = true,
  gradient = false,
}: TextRevealProps) {
  return (
    <Tag
      className={cn(
        gradient &&
          'bg-gradient-to-r from-fp-white via-fp-neon-blue to-fp-neon-purple bg-clip-text text-transparent',
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: '-20px' }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </Tag>
  );
}
