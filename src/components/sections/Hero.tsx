/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Hero Section
   Full-viewport cinematic hero with particle field,
   animated headline, and responsive badges
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ParticleField from '@/components/three/ParticleField';
import AuroraBackground from '@/components/three/AuroraBackground';
import TextReveal from '@/components/animations/TextReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import CounterAnimation from '@/components/animations/CounterAnimation';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-28 flex flex-col items-center justify-center overflow-hidden bg-fp-black"
    >
      {/* Background Layers */}
      <AuroraBackground variant="multi" intensity="medium" />
      <ParticleField
        particleCount={60}
        connectionDistance={110}
        mouseInfluence={100}
        speed={0.2}
      />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fp-neon-blue/10 blur-[130px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fp-surface/60 backdrop-blur-md border border-fp-border/60 mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fp-neon-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fp-neon-cyan" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-fp-gray">
            Launching at <span className="text-fp-white font-semibold">IET DAVV</span> — Join the Ecosystem
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="space-y-1 sm:space-y-2">
          <TextReveal
            text="Where Students Build"
            as="h1"
            className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-bold text-fp-white leading-[1.08] tracking-tight"
            delay={0.2}
            stagger={0.05}
          />
          <TextReveal
            text="Real Careers"
            as="h1"
            className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-bold leading-[1.08] tracking-tight bg-gradient-to-r from-fp-neon-blue via-fp-neon-cyan to-fp-neon-purple bg-clip-text text-transparent"
            delay={0.4}
            stagger={0.06}
            gradient={false}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-fp-gray leading-relaxed font-normal"
        >
          The platform connecting Industry, Colleges, and Students through real projects — delivering experience, income, and career-ready graduates.
        </motion.p>

        {/* Feature Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {['Real Projects', 'Guaranteed Escrow', 'AI Skill Matching', 'Mentorship'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-fp-dark/80 border border-fp-border/40 text-xs text-fp-gray font-medium flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fp-neon-cyan" />
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton variant="primary" size="lg" href="/register">
            Start Your Journey
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-fp-dark/60 border border-fp-border/30 backdrop-blur-xl"
        >
          <CounterAnimation end={5000} suffix="+" label="Students Registered" className="text-2xl sm:text-4xl font-bold text-fp-white font-display" labelClassName="text-xs text-fp-gray mt-1" />
          <CounterAnimation end={350} suffix="+" label="Projects Completed" className="text-2xl sm:text-4xl font-bold text-fp-neon-cyan font-display" labelClassName="text-xs text-fp-gray mt-1" />
          <CounterAnimation end={120} suffix="+" label="Partner Companies" className="text-2xl sm:text-4xl font-bold text-fp-neon-purple font-display" labelClassName="text-xs text-fp-gray mt-1" />
          <CounterAnimation end={97} suffix="%" label="Satisfaction Rate" className="text-2xl sm:text-4xl font-bold text-fp-neon-blue font-display" labelClassName="text-xs text-fp-gray mt-1" />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-fp-black to-transparent pointer-events-none" />
    </section>
  );
}
