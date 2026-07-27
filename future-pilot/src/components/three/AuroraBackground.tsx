/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Aurora Background
   Animated gradient aurora effect for section backgrounds
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface AuroraBackgroundProps {
  className?: string;
  variant?: 'blue' | 'purple' | 'cyan' | 'multi';
  intensity?: 'low' | 'medium' | 'high';
}

const gradients = {
  blue: [
    'radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
    'radial-gradient(ellipse at 80% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
  ],
  purple: [
    'radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
    'radial-gradient(ellipse at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
  ],
  cyan: [
    'radial-gradient(ellipse at 50% 20%, rgba(6, 255, 201, 0.12) 0%, transparent 50%)',
    'radial-gradient(ellipse at 50% 80%, rgba(6, 255, 201, 0.08) 0%, transparent 50%)',
  ],
  multi: [
    'radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.12) 0%, transparent 50%)',
    'radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
    'radial-gradient(ellipse at 50% 80%, rgba(6, 255, 201, 0.08) 0%, transparent 50%)',
  ],
};

export default function AuroraBackground({
  className,
  variant = 'multi',
  intensity = 'medium',
}: AuroraBackgroundProps) {
  const opacityMap = { low: 0.5, medium: 0.8, high: 1 };

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      style={{ opacity: opacityMap[intensity] }}
    >
      {gradients[variant].map((gradient, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: gradient }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, i % 2 === 0 ? 50 : -50, 0],
            y: [0, i % 2 === 0 ? -30 : 30, 0],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
