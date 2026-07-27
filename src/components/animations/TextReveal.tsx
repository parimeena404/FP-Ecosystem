/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Text Reveal Animation
   Cinematic text entrance with per-word stagger
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
  const words = text.split(' ');

  return (
    <Tag
      className={cn(
        gradient &&
          'bg-gradient-to-r from-fp-white via-fp-neon-blue to-fp-neon-purple bg-clip-text text-transparent',
        className
      )}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%', opacity: 0, rotateX: -80 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
