/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Testimonials Section
   Card carousel with avatar + quotes
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'CS Student, IET DAVV',
    quote: 'Future Pilot changed my life. I earned ₹45,000 in my first semester working on a real startup project. My LinkedIn now has a portfolio that actually matters.',
    avatar: 'AS',
    rating: 5,
    project: 'E-commerce Platform',
    earned: '₹45,000',
  },
  {
    name: 'Priya Mehta',
    role: 'ECE Student, IET DAVV',
    quote: 'I designed PCB layouts for an IoT company through Future Pilot. The mentor guidance was incredible — they treated me like a real team member, not an intern.',
    avatar: 'PM',
    rating: 5,
    project: 'IoT Sensor Module',
    earned: '₹32,000',
  },
  {
    name: 'Rajesh Kumar',
    role: 'CTO, TechNova Solutions',
    quote: 'We got a full-stack web app built by a team of 3 students for 60% less than a typical agency. The quality exceeded our expectations — these students are talented.',
    avatar: 'RK',
    rating: 5,
    project: 'SaaS Dashboard',
    earned: 'Company',
  },
  {
    name: 'Dr. Sunita Patel',
    role: 'HOD, CS Department',
    quote: 'Our department saw a 40% increase in placement rates after partnering with Future Pilot. Students are graduating with genuine industry experience.',
    avatar: 'SP',
    rating: 5,
    project: 'Department Partnership',
    earned: 'College',
  },
  {
    name: 'Vikram Joshi',
    role: 'ME Student, IET DAVV',
    quote: 'I never thought my CAD skills would earn me money while in college. Future Pilot connected me with a manufacturing firm and I designed actual production parts.',
    avatar: 'VJ',
    rating: 5,
    project: 'CAD Design Project',
    earned: '₹28,000',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fp-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-purple tracking-widest uppercase mb-4"
          >
            Testimonials
          </motion.span>
          <TextReveal
            text="Real Stories From Real People"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        {/* Main testimonial card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-12 rounded-3xl bg-fp-dark/60 backdrop-blur-xl border border-fp-border/30"
            >
              {/* Quote icon */}
              <svg className="w-10 h-10 text-fp-neon-purple/30 mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>

              <p className="text-xl md:text-2xl text-fp-white leading-relaxed font-light italic">
                &quot;{testimonials[active].quote}&quot;
              </p>

              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <p className="font-display font-bold text-fp-white">{testimonials[active].name}</p>
                    <p className="text-sm text-fp-gray">{testimonials[active].role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-fp-gray">Project</p>
                    <p className="text-sm font-semibold text-fp-neon-blue">{testimonials[active].project}</p>
                  </div>
                  {testimonials[active].earned.startsWith('₹') && (
                    <div className="px-3 py-1.5 rounded-lg bg-fp-neon-cyan/10 border border-fp-neon-cyan/20">
                      <p className="text-xs text-fp-gray">Earned</p>
                      <p className="text-sm font-bold text-fp-neon-cyan">{testimonials[active].earned}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stars */}
              <div className="mt-4 flex gap-1">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-fp-neon-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-fp-surface border border-fp-border/30 flex items-center justify-center text-fp-gray hover:text-fp-white hover:border-fp-neon-purple/50 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === active ? 'bg-fp-neon-purple w-8' : 'bg-fp-border hover:bg-fp-gray'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-fp-surface border border-fp-border/30 flex items-center justify-center text-fp-gray hover:text-fp-white hover:border-fp-neon-purple/50 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
