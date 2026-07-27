/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Vision Section
   Vertical flow diagram: Industry → College → Students → Career
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import AuroraBackground from '@/components/three/AuroraBackground';

const visionSteps = [
  { label: 'Industry', icon: '🏢', color: 'from-fp-neon-blue to-blue-600', description: 'Companies post real-world projects' },
  { label: 'College', icon: '🎓', color: 'from-fp-neon-purple to-purple-600', description: 'Colleges integrate industry learning' },
  { label: 'Students', icon: '👨‍💻', color: 'from-fp-neon-cyan to-teal-600', description: 'Students work on live projects' },
  { label: 'Real Projects', icon: '📋', color: 'from-blue-500 to-fp-neon-blue', description: 'Hands-on experience with real deliverables' },
  { label: 'Experience', icon: '⚡', color: 'from-fp-neon-gold to-yellow-600', description: 'Portfolio and skills that matter' },
  { label: 'Income', icon: '💰', color: 'from-green-500 to-emerald-600', description: 'Earn while you learn and grow' },
  { label: 'Career', icon: '🚀', color: 'from-fp-neon-pink to-rose-600', description: 'Graduate industry-ready with confidence' },
];

export default function Vision() {
  return (
    <section id="vision" className="relative py-32 bg-fp-black overflow-hidden">
      <AuroraBackground variant="purple" intensity="low" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-purple tracking-widest uppercase mb-4"
          >
            Our Vision
          </motion.span>
          <TextReveal
            text="The Complete Pipeline From Campus to Career"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        {/* Vertical Flow */}
        <div className="relative">
          {/* Central vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fp-neon-blue via-fp-neon-purple to-fp-neon-pink origin-top"
          />

          <div className="space-y-0">
            {visionSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-center gap-6 py-6 ${
                    isLeft ? 'flex-row md:pr-[52%]' : 'flex-row-reverse md:pl-[52%]'
                  }`}
                >
                  {/* Connector dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br border-2 border-fp-black z-10"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}`}
                    />
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.color}`} />
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 p-5 rounded-2xl bg-fp-dark/60 backdrop-blur-sm border border-fp-border/30 hover:border-fp-neon-blue/30 transition-all hover:-translate-y-1 group ${
                      isLeft ? 'text-right md:text-right' : 'text-left md:text-left'
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-2xl ${isLeft ? 'order-2' : 'order-1'}`}>{step.icon}</span>
                      <h3 className={`text-xl font-display font-bold text-fp-white group-hover:text-fp-neon-blue transition-colors ${isLeft ? 'order-1' : 'order-2'}`}>
                        {step.label}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-fp-gray">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom outcome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-6 rounded-2xl bg-fp-surface/50 backdrop-blur-xl border border-fp-border/30">
            {['Experience', 'Portfolio', 'Money', 'Skills', 'Confidence'].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-fp-neon-blue/10 to-fp-neon-purple/10 border border-fp-neon-blue/20 text-sm font-semibold text-fp-neon-blue"
              >
                ✓ {item}
              </motion.span>
            ))}
          </div>
          <p className="mt-4 text-fp-gray text-sm">
            Students graduate with everything they need to succeed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
