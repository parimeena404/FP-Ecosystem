/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Journey Section
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const steps = [
  { step: 'Register & Verify', desc: 'Complete corporate KYC with GSTIN & business credentials for verified partner badge.', icon: '🏢' },
  { step: 'Post a Project', desc: 'Define project requirements, tech stack, milestones, budget, and delivery deadline.', icon: '📋' },
  { step: 'AI-Screened Talent', desc: 'Receive pre-vetted student applications scored by AI and matched to your domain.', icon: '🤖' },
  { step: 'Secure Escrow Lock', desc: 'Lock project rewards in Razorpay escrow — funds are released only upon milestone approval.', icon: '🔒' },
  { step: 'Track & Approve', desc: 'Review code submissions, request revisions, and approve milestones in real-time.', icon: '📊' },
  { step: 'Production Deliverables', desc: 'Get production-grade deliverables and build a talent pipeline for full-time hiring.', icon: '✅' },
];

export default function CompanyJourney() {
  return (
    <section id="company-journey" className="relative py-24 sm:py-32 bg-fp-black overflow-hidden border-t border-fp-border/20">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fp-neon-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs sm:text-sm font-semibold text-fp-neon-purple tracking-widest uppercase mb-3"
          >
            For Companies
          </motion.span>
          <TextReveal
            text="Get Quality Work Done By Top Student Talent"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight max-w-4xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 sm:p-7 rounded-2xl bg-fp-dark/80 border border-fp-border/30 hover:border-fp-neon-purple/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)] min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl p-2 rounded-xl bg-fp-neon-purple/10 border border-fp-neon-purple/20">{s.icon}</span>
                  <span className="text-xs font-mono font-semibold text-fp-gray/70">STEP {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-fp-white group-hover:text-fp-neon-purple transition-colors mb-2">
                  {s.step}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-fp-gray/90 leading-relaxed font-normal">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
