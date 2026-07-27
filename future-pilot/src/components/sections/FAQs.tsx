/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — FAQ Section
   Animated accordion with smooth expand/collapse
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const faqs = [
  {
    question: 'Who can join Future Pilot?',
    answer: 'Currently, we are launching with IET DAVV students. However, our platform is designed as a multi-tenant SaaS — any college can onboard their students. If you\'re from another college and interested, contact us to join the waitlist.',
  },
  {
    question: 'How do students get paid?',
    answer: 'Companies deposit project payments into an escrow wallet managed by Future Pilot. Once milestones are completed and approved by both the mentor and admin, funds are released to the student\'s wallet. Students can then withdraw to their bank account.',
  },
  {
    question: 'Is there a fee or commission?',
    answer: 'Future Pilot charges a platform commission (typically 15%) on project payments. This covers AI screening, mentor coordination, payment processing, and platform maintenance. Premium partners may qualify for reduced rates.',
  },
  {
    question: 'What types of projects are available?',
    answer: 'We support projects across all engineering disciplines — Software Development, Web/Mobile Apps, AI/ML, IoT, PCB Design, CAD Modeling, Civil Engineering, and more. Projects range from beginner-friendly to expert-level.',
  },
  {
    question: 'How does the XP and leveling system work?',
    answer: 'Every project has a total of 1000 XP divided across milestones. As you complete milestones, you earn XP that contributes to your Lifetime XP. Your Lifetime XP determines your level (Explorer → Future Legend), global rank, and eligibility for premium projects.',
  },
  {
    question: 'How are students selected for projects?',
    answer: 'Our selection process has multiple stages: AI-powered skill matching, manual profile review by admins, and optional interviews. This ensures companies get the best talent while giving deserving students fair opportunities.',
  },
  {
    question: 'Can companies post any type of project?',
    answer: 'Companies undergo KYC verification before posting. All projects are reviewed by our admin team for feasibility, fair compensation, and appropriate scope before being published to students.',
  },
  {
    question: 'What happens if a student can\'t complete a project?',
    answer: 'We have milestone-based tracking with mentor oversight. If issues arise, our admin team mediates between all parties. Escrow funds are protected until deliverables are approved, ensuring fairness for everyone.',
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border rounded-2xl transition-all duration-300 ${
        isOpen ? 'border-fp-neon-blue/30 bg-fp-dark/60' : 'border-fp-border/20 bg-fp-dark/30 hover:border-fp-border/40'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
      >
        <h3 className={`text-lg font-semibold transition-colors ${isOpen ? 'text-fp-neon-blue' : 'text-fp-white'}`}>
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-fp-surface flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-fp-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-fp-gray leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-4"
          >
            FAQs
          </motion.span>
          <TextReveal
            text="Got Questions? We've Got Answers"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
