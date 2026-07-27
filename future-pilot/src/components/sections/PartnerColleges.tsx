/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Partner Colleges Section
   ────────────────────────────────────────────────────────────── */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import { staggerContainer, fadeInUp } from '@/lib/animations/variants';

const colleges = [
  { name: 'IET DAVV', location: 'Indore, MP', students: 1200, status: 'Active' },
  { name: 'SGSITS', location: 'Indore, MP', students: 0, status: 'Coming Soon' },
  { name: 'MANIT', location: 'Bhopal, MP', students: 0, status: 'Coming Soon' },
  { name: 'IIT Indore', location: 'Indore, MP', students: 0, status: 'Coming Soon' },
  { name: 'IIPS DAVV', location: 'Indore, MP', students: 0, status: 'Coming Soon' },
  { name: 'SVVV', location: 'Indore, MP', students: 0, status: 'Coming Soon' },
];

export default function PartnerColleges() {
  return (
    <section id="partner-colleges" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-cyan tracking-widest uppercase mb-4">
            Partner Colleges
          </motion.span>
          <TextReveal text="Building A Network of Excellence" as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((c) => (
            <motion.div key={c.name} variants={fadeInUp}
              className="p-6 rounded-2xl bg-fp-dark/40 backdrop-blur-sm border border-fp-border/20 hover:border-fp-neon-cyan/30 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-fp-surface flex items-center justify-center text-xl font-bold text-fp-neon-cyan font-display">
                  {c.name.split(' ').map(w => w[0]).join('')}
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${
                  c.status === 'Active' ? 'text-fp-neon-cyan bg-fp-neon-cyan/10' : 'text-fp-gray bg-fp-surface'
                }`}>{c.status}</span>
              </div>
              <h4 className="font-display font-bold text-fp-white group-hover:text-fp-neon-cyan transition-colors">{c.name}</h4>
              <p className="text-sm text-fp-gray mt-1">{c.location}</p>
              {c.students > 0 && <p className="text-xs text-fp-neon-cyan mt-2">{c.students.toLocaleString()} active students</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
