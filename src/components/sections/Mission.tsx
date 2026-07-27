/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mission Section
   Split-screen editorial layout with counter animations
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import CounterAnimation from '@/components/animations/CounterAnimation';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const pillars = [
  {
    icon: '🎯',
    title: 'Industry-Ready Graduates',
    description: 'Students graduate with real experience, not just theoretical knowledge.',
  },
  {
    icon: '💰',
    title: 'Earn While Learning',
    description: 'Every project pays. Build your career and your bank balance simultaneously.',
  },
  {
    icon: '🚀',
    title: 'Bridge The Gap',
    description: 'We eliminate the gap between education and industry — permanently.',
  },
];

export default function Mission() {
  return (
    <section id="mission" className="relative py-32 bg-fp-black overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fp-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-4"
            >
              Our Mission
            </motion.span>

            <TextReveal
              text="Create India's Largest Student Freelancing Ecosystem"
              as="h2"
              className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-lg text-fp-gray leading-relaxed"
            >
              Future Pilot is not just a platform — it&apos;s a movement. We&apos;re building the infrastructure
              that connects industry demands with student talent, ensuring every graduate enters the workforce
              with confidence, experience, and a proven track record.
            </motion.p>

            {/* Mission Pillars */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 space-y-6"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeInUp}
                  className="flex gap-4 p-4 rounded-xl bg-fp-dark/50 border border-fp-border/30 hover:border-fp-neon-blue/30 transition-colors group"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">{pillar.icon}</span>
                  <div>
                    <h3 className="text-fp-white font-semibold group-hover:text-fp-neon-blue transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm text-fp-gray">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual Impact */}
          <div className="relative">
            {/* Glassmorphic stat cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-fp-dark/80 to-fp-surface/40 backdrop-blur-xl border border-fp-border/30 hover:border-fp-neon-blue/40 transition-all hover:-translate-y-1"
              >
                <CounterAnimation
                  end={25}
                  suffix="L+"
                  prefix="₹"
                  label="Earned by Students"
                  className="text-3xl text-fp-neon-cyan"
                  labelClassName="text-xs"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-fp-dark/80 to-fp-surface/40 backdrop-blur-xl border border-fp-border/30 hover:border-fp-neon-purple/40 transition-all hover:-translate-y-1 mt-8"
              >
                <CounterAnimation
                  end={15}
                  suffix="+"
                  label="Partner Colleges"
                  className="text-3xl text-fp-neon-purple"
                  labelClassName="text-xs"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-fp-dark/80 to-fp-surface/40 backdrop-blur-xl border border-fp-border/30 hover:border-fp-neon-cyan/40 transition-all hover:-translate-y-1 -mt-4"
              >
                <CounterAnimation
                  end={350}
                  suffix="+"
                  label="Projects Completed"
                  className="text-3xl text-fp-neon-blue"
                  labelClassName="text-xs"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-fp-dark/80 to-fp-surface/40 backdrop-blur-xl border border-fp-border/30 hover:border-fp-neon-gold/40 transition-all hover:-translate-y-1 mt-4"
              >
                <CounterAnimation
                  end={97}
                  suffix="%"
                  label="Success Rate"
                  className="text-3xl text-fp-neon-gold"
                  labelClassName="text-xs"
                />
              </motion.div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fp-neon-purple/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
