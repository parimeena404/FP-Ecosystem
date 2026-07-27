/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Selection Process (Funnel)
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const stages = [
  { stage: 'Applications Received', pct: 100, count: '500+', color: '#00D4FF', icon: '📩' },
  { stage: 'AI Screening', pct: 70, count: '~350', color: '#8B5CF6', icon: '🤖' },
  { stage: 'Manual Review', pct: 40, count: '~200', color: '#06FFC9', icon: '👁️' },
  { stage: 'Interview', pct: 20, count: '~100', color: '#FFD700', icon: '🎤' },
  { stage: 'Final Selection', pct: 8, count: '~40', color: '#FF006E', icon: '🏆' },
];

export default function SelectionProcess() {
  return (
    <section id="selection" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-pink tracking-widest uppercase mb-4">
            Selection Process
          </motion.span>
          <TextReveal text="Only The Best Make It Through" as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        </div>

        {/* Funnel */}
        <div className="space-y-4">
          {stages.map((s, i) => (
            <motion.div key={s.stage} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative group">
              <div className="flex items-center gap-4">
                <span className="text-2xl w-10 text-center flex-shrink-0">{s.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-fp-white">{s.stage}</span>
                    <span className="text-xs font-mono text-fp-gray">{s.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-fp-surface overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.color, boxShadow: `0 0 12px ${s.color}40` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
