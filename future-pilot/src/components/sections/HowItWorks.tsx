/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — How It Works Section
   Step-by-step animated diagram with connecting flow lines
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';

const tabs = [
  { id: 'student', label: 'For Students', icon: '👨‍🎓' },
  { id: 'company', label: 'For Companies', icon: '🏢' },
  { id: 'college', label: 'For Colleges', icon: '🎓' },
];

const flows: Record<string, { step: string; description: string; icon: string }[]> = {
  student: [
    { step: 'Sign Up', description: 'Create your profile with skills, resume, and portfolio', icon: '📝' },
    { step: 'Browse Projects', description: 'Explore projects matching your skills and interests', icon: '🔍' },
    { step: 'Apply', description: 'Submit your application with relevant work samples', icon: '📤' },
    { step: 'Get Selected', description: 'Pass AI screening, manual review, and interview', icon: '✅' },
    { step: 'Build & Deliver', description: 'Work on milestones with mentor guidance', icon: '⚡' },
    { step: 'Get Paid', description: 'Receive payment directly to your wallet', icon: '💰' },
  ],
  company: [
    { step: 'Register Company', description: 'Create company profile with KYC verification', icon: '🏢' },
    { step: 'Post Project', description: 'Define project scope, budget, timeline, and skills needed', icon: '📋' },
    { step: 'Review Applicants', description: 'AI-screened candidates presented for your review', icon: '👥' },
    { step: 'Deposit Escrow', description: 'Funds secured in escrow — released only on approval', icon: '🔒' },
    { step: 'Track Progress', description: 'Monitor milestones and communicate with team', icon: '📊' },
    { step: 'Approve & Pay', description: 'Approve deliverables, payment released automatically', icon: '✅' },
  ],
  college: [
    { step: 'Partner Up', description: 'Onboard your college to the Future Pilot ecosystem', icon: '🤝' },
    { step: 'Verify Students', description: 'Authenticate student identities and enrollments', icon: '🔐' },
    { step: 'Track Participation', description: 'Monitor student engagement and project involvement', icon: '📈' },
    { step: 'View Analytics', description: 'Department-wise reports and placement statistics', icon: '📊' },
    { step: 'Boost Placements', description: 'Students graduate with real experience and portfolios', icon: '🚀' },
    { step: 'Build Reputation', description: 'Your college becomes known for industry-ready graduates', icon: '🏆' },
  ],
};

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <section id="how-it-works" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fp-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-4"
          >
            How It Works
          </motion.span>
          <TextReveal
            text="Simple Process Powerful Results"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-16"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-fp-gray hover:text-fp-white bg-fp-dark/50 border border-fp-border/30 hover:border-fp-border/60'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Steps Flow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {flows[activeTab].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {/* Connector line (between cards) */}
                {i < flows[activeTab].length - 1 && (
                  <div className="absolute -right-3 top-1/2 w-6 h-px bg-fp-border/30 hidden lg:block" />
                )}

                <div className="p-6 rounded-2xl bg-fp-dark/50 border border-fp-border/20 hover:border-fp-neon-blue/30 transition-all hover:-translate-y-1 h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-fp-neon-blue/10 text-fp-neon-blue text-sm font-bold font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-fp-white mb-2 group-hover:text-fp-neon-blue transition-colors">
                    {item.step}
                  </h3>
                  <p className="text-sm text-fp-gray leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
