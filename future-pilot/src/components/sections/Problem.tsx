/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Problem Section
   Animated statistics with crisis-red accents highlighting
   the education-industry gap
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import CounterAnimation from '@/components/animations/CounterAnimation';
import { staggerContainer, fadeInUp } from '@/lib/animations/variants';

const problems = [
  {
    stat: 80,
    suffix: '%',
    label: 'Engineering graduates are unemployable',
    icon: '⚠️',
  },
  {
    stat: 60,
    suffix: '%',
    label: 'Students lack practical project experience',
    icon: '📉',
  },
  {
    stat: 73,
    suffix: '%',
    label: 'Companies struggle to find skilled freshers',
    icon: '🏢',
  },
  {
    stat: 45,
    suffix: '%',
    label: 'Graduates take 6+ months to get first job',
    icon: '⏳',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-32 bg-fp-black overflow-hidden">
      {/* Red crisis glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-red-400 tracking-widest uppercase mb-4"
          >
            The Problem
          </motion.span>
          <TextReveal
            text="A ₹10 Lakh Degree And Zero Industry Experience"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-fp-gray"
          >
            Indian education produces millions of graduates every year.
            Most of them face the same cruel paradox: &quot;Need experience to get a job,
            need a job to get experience.&quot;
          </motion.p>
        </div>

        {/* Problem Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.label}
              variants={fadeInUp}
              className="group relative p-6 rounded-2xl bg-fp-dark/60 border border-red-500/10 hover:border-red-500/30 transition-all hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <span className="text-3xl">{problem.icon}</span>
                <CounterAnimation
                  end={problem.stat}
                  suffix={problem.suffix}
                  className="text-5xl text-red-400 mt-4"
                />
                <p className="mt-3 text-sm text-fp-gray leading-relaxed">{problem.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent origin-center"
        />

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl md:text-3xl font-display font-bold text-fp-white">
            The system is <span className="text-red-400">broken</span>.
          </p>
          <p className="mt-2 text-lg text-fp-gray">
            But every broken system is an opportunity for a
            <span className="text-fp-neon-blue font-semibold"> revolution</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
