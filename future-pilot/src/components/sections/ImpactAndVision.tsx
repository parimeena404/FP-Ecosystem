/* FUTURE PILOT — Impact + Future Vision Sections */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import AuroraBackground from '@/components/three/AuroraBackground';

export function Impact() {
  return (
    <section id="impact" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-block text-sm font-semibold text-fp-neon-cyan tracking-widest uppercase mb-4">
          Our Impact
        </motion.span>
        <TextReveal text="Transforming Education One Project At A Time" as="h2"
          className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.3 }} className="mt-6 max-w-2xl mx-auto text-lg text-fp-gray">
          Every project on Future Pilot isn&apos;t just work — it&apos;s a step toward closing the education-industry gap.
          We measure our success not in revenue, but in careers launched and lives changed.
        </motion.p>
        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {[
            { label: 'Students got their first job through FP portfolios', value: '180+', icon: '💼' },
            { label: 'Average earning per active student/semester', value: '₹18K', icon: '💰' },
            { label: 'Companies returned for second project', value: '89%', icon: '🔄' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-fp-dark/40 border border-fp-border/20">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-4xl font-display font-bold text-fp-neon-cyan mt-3">{item.value}</p>
              <p className="text-sm text-fp-gray mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FutureVision() {
  return (
    <section id="future-vision" className="relative py-32 bg-fp-black overflow-hidden">
      <AuroraBackground variant="multi" intensity="medium" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-block text-sm font-semibold text-fp-neon-purple tracking-widest uppercase mb-4">
          The Future
        </motion.span>
        <TextReveal text="From One College To A Global Ecosystem" as="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-fp-white leading-tight" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="mt-8 text-xl text-fp-gray leading-relaxed">
          We started at IET DAVV. But our vision is limitless.
          Every college. Every discipline. Every student. Every country.
          The future of education is <span className="text-fp-neon-blue font-semibold">project-based</span>,
          <span className="text-fp-neon-cyan font-semibold"> industry-connected</span>, and
          <span className="text-fp-neon-purple font-semibold"> student-empowered</span>.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.6 }} className="mt-12 flex flex-wrap justify-center gap-3">
          {['Hackathons', 'Marketplace', 'AI Mentors', 'Global Expansion', 'Startup Incubation', 'Research Projects', 'Open Source', 'Certifications'].map((item) => (
            <span key={item} className="px-4 py-2 rounded-full bg-fp-surface/30 border border-fp-border/20 text-sm text-fp-gray hover:text-fp-neon-blue hover:border-fp-neon-blue/30 transition-all cursor-default">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
