/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Technology Section
   Floating tech stack showcase with hover cards
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import { staggerContainer, fadeInUp } from '@/lib/animations/variants';

const techStack = [
  { name: 'Next.js', category: 'Frontend', color: '#00D4FF' },
  { name: 'React', category: 'UI Library', color: '#61DAFB' },
  { name: 'TypeScript', category: 'Language', color: '#3178C6' },
  { name: 'Tailwind CSS', category: 'Styling', color: '#06B6D4' },
  { name: 'Framer Motion', category: 'Animations', color: '#FF006E' },
  { name: 'GSAP', category: 'Scroll Effects', color: '#88CE02' },
  { name: 'Three.js', category: '3D Graphics', color: '#FFD700' },
  { name: 'Firebase', category: 'Backend', color: '#FFCA28' },
  { name: 'Firestore', category: 'Database', color: '#FF6F00' },
  { name: 'Cloud Functions', category: 'Serverless', color: '#8B5CF6' },
  { name: 'Razorpay', category: 'Payments', color: '#06FFC9' },
  { name: 'Vercel', category: 'Deployment', color: '#FFFFFF' },
];

export default function Technology() {
  return (
    <section id="technology" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-fp-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-purple tracking-widest uppercase mb-4"
          >
            Technology
          </motion.span>
          <TextReveal
            text="Built With The World's Best Technology"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative p-5 rounded-2xl bg-fp-dark/50 border border-fp-border/20 hover:border-fp-neon-blue/30 transition-all text-center cursor-default"
            >
              <div
                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-xl font-bold font-mono"
                style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
              >
                {tech.name[0]}
              </div>
              <h4 className="text-sm font-semibold text-fp-white group-hover:text-fp-neon-blue transition-colors">
                {tech.name}
              </h4>
              <p className="text-[10px] text-fp-gray mt-1">{tech.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
