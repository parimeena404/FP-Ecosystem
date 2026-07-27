/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Achievements Section
   Counter-up impact numbers with visual emphasis
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import CounterAnimation from '@/components/animations/CounterAnimation';
import AuroraBackground from '@/components/three/AuroraBackground';

const achievements = [
  { value: 5000, suffix: '+', label: 'Students Registered', color: 'text-fp-neon-blue' },
  { value: 350, suffix: '+', label: 'Projects Completed', color: 'text-fp-neon-cyan' },
  { value: 120, suffix: '+', label: 'Companies Partnered', color: 'text-fp-neon-purple' },
  { value: 15, suffix: '', label: 'Colleges Onboarded', color: 'text-fp-neon-gold' },
  { value: 25, suffix: 'L+', prefix: '₹', label: 'Total Student Earnings', color: 'text-fp-neon-cyan' },
  { value: 97, suffix: '%', label: 'Client Satisfaction', color: 'text-fp-neon-blue' },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 bg-fp-black overflow-hidden">
      <AuroraBackground variant="cyan" intensity="low" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-cyan tracking-widest uppercase mb-4"
          >
            Impact
          </motion.span>
          <TextReveal
            text="Numbers That Speak For Themselves"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-fp-dark/40 backdrop-blur-sm border border-fp-border/20 hover:border-fp-neon-cyan/20 transition-all text-center group"
            >
              <CounterAnimation
                end={item.value}
                suffix={item.suffix}
                prefix={item.prefix}
                className={`text-5xl md:text-6xl ${item.color}`}
                label={item.label}
                labelClassName="text-base mt-3"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
