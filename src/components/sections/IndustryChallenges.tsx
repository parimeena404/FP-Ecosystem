/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Industry Challenges Section
   Horizontal scroll cards highlighting industry pain points
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const challenges = [
  { title: 'Skill Mismatch', desc: 'Curricula are outdated — graduates lack skills companies actually need.', icon: '📚', stat: '76%', statLabel: 'of employers report skill gaps' },
  { title: 'Zero Practical Experience', desc: 'Academic projects don\'t translate to real-world problem solving ability.', icon: '🔧', stat: '83%', statLabel: 'of students lack hands-on experience' },
  { title: 'Hiring Cost', desc: 'Companies spend months training freshers who should be job-ready.', icon: '💸', stat: '₹3L+', statLabel: 'average training cost per fresher' },
  { title: 'Talent Discovery', desc: 'Great students are hidden — no platform showcases their real abilities.', icon: '🔍', stat: '60%', statLabel: 'of talent goes undiscovered' },
  { title: 'Freelance Risk', desc: 'Students lack trust infrastructure to work with companies directly.', icon: '⚠️', stat: '45%', statLabel: 'of student projects face payment issues' },
];

export default function IndustryChallenges() {
  return (
    <section id="industry-challenges" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4">
            Industry Challenges
          </motion.span>
          <TextReveal text="Why The Current System Fails Everyone" as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        </div>

        {/* Horizontally scrollable on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible scrollbar-hide">
          {challenges.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="min-w-[260px] lg:min-w-0 p-6 rounded-2xl bg-fp-dark/50 border border-fp-border/20 hover:border-amber-400/30 transition-all hover:-translate-y-2 group flex-shrink-0">
              <span className="text-3xl">{c.icon}</span>
              <div className="mt-4 text-3xl font-display font-bold text-amber-400">{c.stat}</div>
              <p className="text-[10px] text-fp-gray mb-3">{c.statLabel}</p>
              <h4 className="font-display font-bold text-fp-white group-hover:text-amber-400 transition-colors">{c.title}</h4>
              <p className="mt-2 text-sm text-fp-gray leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
