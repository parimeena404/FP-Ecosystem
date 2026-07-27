/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Money Flow Section
   Animated escrow flow diagram showing payment pipeline
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const flowNodes = [
  { label: 'Company', icon: '🏢', subtitle: 'Deposits payment', color: '#00D4FF' },
  { label: 'Future Pilot', icon: '🛡️', subtitle: 'Holds in escrow', color: '#8B5CF6' },
  { label: 'Escrow Wallet', icon: '🔒', subtitle: 'Secured funds', color: '#FFD700' },
  { label: 'Project Completion', icon: '✅', subtitle: 'Milestones approved', color: '#06FFC9' },
  { label: 'Admin Approval', icon: '👍', subtitle: 'Quality verified', color: '#8B5CF6' },
  { label: 'Student Wallet', icon: '💰', subtitle: 'Funds credited', color: '#06FFC9' },
  { label: 'Bank Withdrawal', icon: '🏦', subtitle: 'Direct to bank', color: '#00D4FF' },
];

export default function MoneyFlow() {
  return (
    <section id="money-flow" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fp-neon-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-gold tracking-widest uppercase mb-4"
          >
            Money Flow
          </motion.span>
          <TextReveal
            text="Secure Escrow Protected Payments"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl mx-auto text-lg text-fp-gray"
          >
            Money never goes directly to students. Future Pilot acts as the trusted intermediary,
            ensuring fair payment for every completed milestone.
          </motion.p>
        </div>

        {/* Flow Diagram */}
        <div className="relative flex flex-col items-center gap-0">
          {flowNodes.map((node, i) => (
            <React.Fragment key={node.label}>
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative group w-full max-w-md"
              >
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-fp-dark/60 border border-fp-border/20 hover:border-fp-neon-gold/30 transition-all hover:-translate-y-0.5">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${node.color}15`, boxShadow: `0 0 20px ${node.color}10` }}
                  >
                    {node.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-fp-white group-hover:text-fp-neon-gold transition-colors">
                      {node.label}
                    </h4>
                    <p className="text-sm text-fp-gray">{node.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono text-fp-gray">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </motion.div>

              {/* Arrow connector */}
              {i < flowNodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.1 }}
                  className="flex flex-col items-center py-1 origin-top"
                >
                  <div className="w-px h-6 bg-gradient-to-b from-fp-border/40 to-fp-neon-gold/30" />
                  <svg className="w-3 h-3 text-fp-neon-gold/50" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 12L0 6h12z" />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {['🔒 Escrow Protected', '📋 GST Ready', '🏦 Razorpay Powered', '📊 Full Transparency'].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full bg-fp-surface/40 border border-fp-border/20 text-sm text-fp-gray"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
