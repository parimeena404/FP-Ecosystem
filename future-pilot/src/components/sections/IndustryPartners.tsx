/* FUTURE PILOT — Industry Partners Section */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import { staggerContainer, fadeInUp } from '@/lib/animations/variants';

const partners = [
  { name: 'TechNova Solutions', industry: 'Software Development', projects: 12 },
  { name: 'InnoSpark Labs', industry: 'AI & Machine Learning', projects: 8 },
  { name: 'GreenBuild India', industry: 'Civil Engineering', projects: 5 },
  { name: 'CircuitMinds', industry: 'Electronics & IoT', projects: 7 },
  { name: 'AutoCraft Works', industry: 'Mechanical Design', projects: 4 },
  { name: 'DataPulse Analytics', industry: 'Data Science', projects: 9 },
  { name: 'CloudSync Systems', industry: 'Cloud Computing', projects: 6 },
  { name: 'DesignForge Studio', industry: 'UI/UX Design', projects: 11 },
];

export default function IndustryPartners() {
  return (
    <section id="industry-partners" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-gold tracking-widest uppercase mb-4">
            Industry Partners
          </motion.span>
          <TextReveal text="Trusted By Leading Companies" as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((p) => (
            <motion.div key={p.name} variants={fadeInUp}
              className="p-5 rounded-2xl bg-fp-dark/40 border border-fp-border/20 hover:border-fp-neon-gold/30 transition-all hover:-translate-y-1 group">
              <div className="w-10 h-10 rounded-lg bg-fp-surface flex items-center justify-center text-sm font-bold text-fp-neon-gold font-mono mb-3">
                {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <h4 className="font-semibold text-fp-white text-sm group-hover:text-fp-neon-gold transition-colors">{p.name}</h4>
              <p className="text-xs text-fp-gray mt-1">{p.industry}</p>
              <p className="text-xs text-fp-neon-gold/70 mt-2">{p.projects} projects posted</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
