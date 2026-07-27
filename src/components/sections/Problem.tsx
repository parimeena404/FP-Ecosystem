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
    label: 'Engineering graduates are unemployable due to lack of practical industry skills',
    icon: '⚠️',
  },
  {
    stat: 60,
    suffix: '%',
    label: 'Students graduate with zero real-world production project experience',
    icon: '📉',
  },
  {
    stat: 73,
    suffix: '%',
    label: 'Companies struggle to find job-ready freshers without expensive retraining',
    icon: '🏢',
  },
  {
    stat: 45,
    suffix: '%',
    label: 'Graduates spend 6+ months searching for their first entry-level role',
    icon: '⏳',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32 bg-fp-black overflow-hidden border-t border-fp-border/20">
      {/* Red crisis glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs sm:text-sm font-semibold text-red-400 tracking-widest uppercase mb-3"
          >
            The Problem
          </motion.span>
          <TextReveal
            text="A ₹10 Lakh Degree And Zero Industry Experience"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight max-w-4xl mx-auto"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg text-fp-gray leading-relaxed font-normal"
          >
            Indian higher education produces millions of graduates every year, but most face the same cruel paradox: &quot;Need experience to get a job, need a job to get experience.&quot;
          </motion.p>
        </div>

        {/* Problem Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.label}
              variants={fadeInUp}
              className="group relative p-6 sm:p-7 rounded-2xl bg-fp-dark/80 border border-red-500/20 hover:border-red-500/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-[0_8px_30px_rgba(239,68,68,0.06)] min-h-[240px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2 rounded-xl bg-red-500/10 border border-red-500/20">{problem.icon}</span>
              </div>
              <div className="mt-4">
                <CounterAnimation
                  end={problem.stat}
                  suffix={problem.suffix}
                  className="text-4xl sm:text-5xl font-display font-bold text-red-400"
                />
                <p className="mt-3 text-sm text-fp-gray/90 leading-relaxed font-medium">
                  {problem.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 sm:mt-20 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent origin-center"
        />

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="text-2xl sm:text-3xl font-display font-bold text-fp-white">
            The system is <span className="text-red-400">broken</span>.
          </p>
          <p className="mt-2 text-base sm:text-lg text-fp-gray">
            Future Pilot was built to transform education through
            <span className="text-fp-neon-blue font-semibold"> real industry execution</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
