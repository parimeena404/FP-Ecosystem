/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Framer Motion Variants
   Reusable animation presets for consistent motion design
   ────────────────────────────────────────────────────────────── */

import type { Variants } from 'framer-motion';

// ─── Fade Animations ────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Scale Animations ───────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// ─── Stagger Containers ────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Text Animations ───────────────────────────────────────

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const wordReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

// ─── Glow Pulse ─────────────────────────────────────────────

export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0px rgba(0, 212, 255, 0)' },
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 212, 255, 0.3)',
      '0 0 40px rgba(0, 212, 255, 0.1)',
      '0 0 20px rgba(0, 212, 255, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── Slide Reveal (for sections) ────────────────────────────

export const slideReveal: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  },
};

// ─── Card Hover ─────────────────────────────────────────────

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Navigation ─────────────────────────────────────────────

export const navSlide: Variants = {
  closed: {
    x: '100%',
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
  open: {
    x: '0%',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Counter Animation ─────────────────────────────────────

export const counterFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Flow Line Animation ───────────────────────────────────

export const flowLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Blob Morph ─────────────────────────────────────────────

export const blobMorph: Variants = {
  initial: {
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
  },
  animate: {
    borderRadius: [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '60% 40% 30% 70% / 60% 30% 70% 40%',
    ],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};
