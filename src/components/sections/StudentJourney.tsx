/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Journey Section
   Interactive step-by-step timeline from signup to career
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const journey = [
  { step: 'Create Profile', desc: 'Build your student profile with verified skills, Github, and portfolio links.', icon: '👤', color: '#00D4FF' },
  { step: 'Discover Projects', desc: 'Browse curated industry projects matched to your technical skill level.', icon: '🔍', color: '#8B5CF6' },
  { step: 'Apply & Get Shortlisted', desc: 'Submit application proposals. AI screening and mentors shortlist candidates.', icon: '📤', color: '#06FFC9' },
  { step: 'Build With Mentors', desc: 'Deliver production code with guidance from verified senior mentors.', icon: '🛠️', color: '#FFD700' },
  { step: 'Earn XP & Money', desc: 'Complete milestones, unlock level badges, and receive escrow wallet payouts.', icon: '💎', color: '#FF006E' },
  { step: 'Launch Your Career', desc: 'Graduate with real industry experience, income, and verified certificates.', icon: '🚀', color: '#00D4FF' },
];

export default function StudentJourney() {
  return (
    <section id="student-journey" className="relative py-24 sm:py-32 bg-fp-black overflow-hidden border-t border-fp-border/20">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-fp-neon-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs sm:text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-3"
          >
            Student Journey
          </motion.span>
          <TextReveal
            text="Your Path From Student To Professional"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight max-w-4xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {journey.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative p-6 sm:p-7 rounded-2xl bg-fp-dark/80 border border-fp-border/30 hover:border-fp-neon-blue/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)] min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border border-fp-border/40"
                    style={{ backgroundColor: `${s.color}15`, borderColor: `${s.color}30` }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-fp-gray/70">STEP {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-fp-white group-hover:text-fp-neon-blue transition-colors mb-2">
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
