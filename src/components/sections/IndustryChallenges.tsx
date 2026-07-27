/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Industry Challenges Section
   Cards highlighting key industry pain points and structural gaps
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const challenges = [
  { title: 'Skill Mismatch', desc: 'Outdated college curricula mean graduates lack the modern tech stack skills employers need.', icon: '📚', stat: '76%', statLabel: 'Employers report skill gaps' },
  { title: 'Zero Practical Experience', desc: 'Toy academic projects fail to teach production workflows, code reviews, and scale.', icon: '🔧', stat: '83%', statLabel: 'Students lack hands-on experience' },
  { title: 'Excessive Hiring Cost', desc: 'Companies spend months and lakhs training freshers who should arrive project-ready.', icon: '💸', stat: '₹3L+', statLabel: 'Average training cost per fresher' },
  { title: 'Undiscovered Talent', desc: 'Top tier candidates outside elite IITs get overlooked due to traditional resume filters.', icon: '🔍', stat: '60%', statLabel: 'Of top talent goes undiscovered' },
  { title: 'Freelance & Trust Risk', desc: 'Students lack payment protection while companies risk unfulfilled project deliverables.', icon: '⚠️', stat: '45%', statLabel: 'Student projects face payment issues' },
];

export default function IndustryChallenges() {
  return (
    <section id="industry-challenges" className="relative py-24 sm:py-32 bg-fp-black overflow-hidden border-t border-fp-border/20">
      {/* Background Amber Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs sm:text-sm font-semibold text-amber-400 tracking-widest uppercase mb-3"
          >
            Industry Challenges
          </motion.span>
          <TextReveal
            text="Why The Current System Fails Everyone"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight max-w-4xl mx-auto"
          />
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 sm:p-7 rounded-2xl bg-fp-dark/80 border border-amber-500/20 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between shadow-[0_8px_30px_rgba(245,158,11,0.05)] min-h-[260px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">{c.icon}</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-amber-400">{c.stat}</div>
                  <p className="text-xs text-amber-300/80 font-medium mt-1 mb-3">{c.statLabel}</p>
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-base text-fp-white group-hover:text-amber-400 transition-colors">
                  {c.title}
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-fp-gray/90 leading-relaxed font-normal">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
