/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Hero Section
   Full-viewport cinematic hero with particle field,
   animated headline, and floating badge elements
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ParticleField from '@/components/three/ParticleField';
import AuroraBackground from '@/components/three/AuroraBackground';
import TextReveal from '@/components/animations/TextReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import CounterAnimation from '@/components/animations/CounterAnimation';

const floatingBadges = [
  { text: 'AI Screening', x: '10%', y: '25%', delay: 1.2 },
  { text: 'Real Projects', x: '85%', y: '20%', delay: 1.5 },
  { text: 'Earn While Learning', x: '8%', y: '70%', delay: 1.8 },
  { text: 'Industry Ready', x: '82%', y: '75%', delay: 2.0 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fp-black"
    >
      {/* Background Layers */}
      <AuroraBackground variant="multi" intensity="medium" />
      <ParticleField
        particleCount={70}
        connectionDistance={120}
        mouseInfluence={120}
        speed={0.25}
      />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-fp-neon-blue/5 blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: badge.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-fp-dark/60 backdrop-blur-md border border-fp-border/40 text-xs font-medium text-fp-gray"
          style={{ left: badge.x, top: badge.y }}
        >
          <span className="w-2 h-2 rounded-full bg-fp-neon-cyan animate-pulse" />
          {badge.text}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fp-surface/50 backdrop-blur-md border border-fp-border/50 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fp-neon-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fp-neon-cyan" />
          </span>
          <span className="text-sm font-medium text-fp-gray">
            Launching at <span className="text-fp-white">IET DAVV</span> — Join the revolution
          </span>
        </motion.div>

        {/* Headline */}
        <TextReveal
          text="Where Students Build"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-fp-white leading-[1.05] tracking-tight"
          delay={0.3}
          stagger={0.06}
        />
        <TextReveal
          text="Real Careers"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-fp-neon-blue via-fp-neon-cyan to-fp-neon-purple bg-clip-text text-transparent mt-2"
          delay={0.6}
          stagger={0.08}
          gradient={false}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-fp-gray leading-relaxed"
        >
          The platform where industry meets talent. Work on real projects, earn real money,
          and graduate with a portfolio that speaks louder than any degree.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" size="lg" href="/register">
            Start Your Journey
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </MagneticButton>
          <MagneticButton variant="outline" size="lg" href="#how-it-works">
            See How It Works
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <CounterAnimation end={5000} suffix="+" label="Students" className="text-3xl md:text-4xl text-fp-white" labelClassName="text-sm" />
          <CounterAnimation end={350} suffix="+" label="Projects Done" className="text-3xl md:text-4xl text-fp-neon-cyan" labelClassName="text-sm" />
          <CounterAnimation end={120} suffix="+" label="Companies" className="text-3xl md:text-4xl text-fp-neon-purple" labelClassName="text-sm" />
          <CounterAnimation end={97} suffix="%" label="Satisfaction" className="text-3xl md:text-4xl text-fp-neon-blue" labelClassName="text-sm" />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fp-black to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-fp-gray font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-fp-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-fp-neon-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
