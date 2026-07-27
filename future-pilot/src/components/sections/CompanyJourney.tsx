/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Journey Section
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const steps = [
  { step: 'Register & Verify', desc: 'Complete KYC and set up your company profile with industry credentials.', icon: '🏢' },
  { step: 'Post a Project', desc: 'Define scope, skills needed, budget, and timeline for your project.', icon: '📋' },
  { step: 'AI-Screened Talent', desc: 'Receive pre-vetted candidates matched by our AI to your exact requirements.', icon: '🤖' },
  { step: 'Secure Escrow', desc: 'Deposit payment into escrow — only released when you approve deliverables.', icon: '🔒' },
  { step: 'Track & Approve', desc: 'Monitor milestone progress and approve completed work in real-time.', icon: '📊' },
  { step: 'Quality Results', desc: 'Receive professional deliverables at a fraction of agency costs.', icon: '✅' },
];

export default function CompanyJourney() {
  return (
    <section id="company-journey" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fp-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-purple tracking-widest uppercase mb-4">
            For Companies
          </motion.span>
          <TextReveal text="Get Quality Work Done By Top Student Talent" as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-fp-dark/50 border border-fp-border/20 hover:border-fp-neon-purple/30 transition-all hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-mono text-fp-gray">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h4 className="text-lg font-display font-bold text-fp-white group-hover:text-fp-neon-purple transition-colors mb-2">{s.step}</h4>
              <p className="text-sm text-fp-gray leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
