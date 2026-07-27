/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Journey Section
   Interactive step-by-step timeline from signup to career
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const journey = [
  { step: 'Create Profile', desc: 'Build your student profile with skills, resume, and portfolio links.', icon: '👤', color: '#00D4FF' },
  { step: 'Discover Projects', desc: 'Browse curated industry projects that match your skill level.', icon: '🔍', color: '#8B5CF6' },
  { step: 'Apply & Get Selected', desc: 'Apply with your best work. Our AI + human review ensures fair selection.', icon: '📤', color: '#06FFC9' },
  { step: 'Build With Mentors', desc: 'Work on real deliverables with industry mentor guidance at every step.', icon: '🛠️', color: '#FFD700' },
  { step: 'Earn XP & Money', desc: 'Complete milestones, earn XP to level up, and get paid for your work.', icon: '💎', color: '#FF006E' },
  { step: 'Launch Your Career', desc: 'Graduate with experience, portfolio, earnings, and industry connections.', icon: '🚀', color: '#00D4FF' },
];

export default function StudentJourney() {
  return (
    <section id="student-journey" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-fp-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-4">
            Student Journey
          </motion.span>
          <TextReveal text="Your Path From Student To Professional" as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journey.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-fp-dark/50 border border-fp-border/20 hover:border-fp-neon-blue/30 transition-all hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${s.color}15` }}>{s.icon}</div>
                <span className="text-xs font-mono text-fp-gray">STEP {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h4 className="text-lg font-display font-bold text-fp-white group-hover:text-fp-neon-blue transition-colors mb-2">{s.step}</h4>
              <p className="text-sm text-fp-gray leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
