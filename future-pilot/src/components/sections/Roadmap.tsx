/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Roadmap Section
   Animated timeline with past/current/future milestones
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const roadmapItems = [
  {
    phase: 'Phase 1',
    period: 'Q1 2025',
    title: 'Foundation',
    status: 'completed' as const,
    items: ['Platform development', 'IET DAVV pilot launch', 'First 50 students onboarded', 'First 10 company partnerships'],
  },
  {
    phase: 'Phase 2',
    period: 'Q2 2025',
    title: 'Growth',
    status: 'completed' as const,
    items: ['AI screening engine', 'Escrow payment system', 'Mentor portal launch', 'XP & gamification system'],
  },
  {
    phase: 'Phase 3',
    period: 'Q3 2025',
    title: 'Expansion',
    status: 'current' as const,
    items: ['Multi-college expansion', '500+ active students', 'Mobile app development', 'Advanced analytics dashboard'],
  },
  {
    phase: 'Phase 4',
    period: 'Q4 2025',
    title: 'Scale',
    status: 'upcoming' as const,
    items: ['Pan-India college network', 'Enterprise partnerships', 'Hackathon platform', 'Certification programs'],
  },
  {
    phase: 'Phase 5',
    period: '2026',
    title: 'Global',
    status: 'upcoming' as const,
    items: ['International expansion', 'AI mentor system', 'Marketplace launch', 'SaaS licensing model'],
  },
];

const statusConfig = {
  completed: { color: '#06FFC9', label: 'Completed', dot: 'bg-fp-neon-cyan' },
  current: { color: '#00D4FF', label: 'In Progress', dot: 'bg-fp-neon-blue animate-pulse' },
  upcoming: { color: '#8888AA', label: 'Upcoming', dot: 'bg-fp-gray' },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fp-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-cyan tracking-widest uppercase mb-4"
          >
            Roadmap
          </motion.span>
          <TextReveal
            text="Building The Future One Milestone At A Time"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-fp-border/30" />

          <div className="space-y-12">
            {roadmapItems.map((item, i) => {
              const config = statusConfig[item.status];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } ml-12 md:ml-0`}
                >
                  {/* Connector dot */}
                  <div className="absolute left-[-2.15rem] md:left-1/2 md:-translate-x-1/2 top-6">
                    <div className={`w-3 h-3 rounded-full ${config.dot} ring-4 ring-fp-black`} />
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 max-w-md ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="flex items-center gap-3 mb-3 flex-wrap" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                      <span className="text-xs font-mono px-2 py-1 rounded-md bg-fp-surface text-fp-gray">
                        {item.period}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-md"
                        style={{ color: config.color, backgroundColor: `${config.color}15` }}
                      >
                        {config.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-fp-white mb-1">
                      {item.phase}: {item.title}
                    </h3>

                    <ul className={`mt-3 space-y-2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      {item.items.map((milestone) => (
                        <li key={milestone} className="text-sm text-fp-gray flex items-center gap-2" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                          {!isLeft && (
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: config.color }} />
                          )}
                          {milestone}
                          {isLeft && (
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: config.color }} />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
