/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Animated Workflow Section
   Interactive SVG pipeline showing the complete project lifecycle
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import AuroraBackground from '@/components/three/AuroraBackground';

const workflowSteps = [
  { id: 1, title: 'Project Submitted', actor: 'Company / Faculty', icon: '📋', color: '#00D4FF', description: 'Company or college faculty submits a project with requirements, timeline, and budget.' },
  { id: 2, title: 'Admin Review', actor: 'Admin', icon: '🔍', color: '#8B5CF6', description: 'Admin reviews project feasibility, requirements, and compliance before publishing.' },
  { id: 3, title: 'Project Published', actor: 'Platform', icon: '🌐', color: '#06FFC9', description: 'Approved project goes live on the platform for students to discover.' },
  { id: 4, title: 'Students Apply', actor: 'Student', icon: '📤', color: '#00D4FF', description: 'Interested students apply with their resume, portfolio, and cover letter.' },
  { id: 5, title: 'AI Screening', actor: 'AI System', icon: '🤖', color: '#FF006E', description: 'AI evaluates applications based on skill match, experience, and profile strength.' },
  { id: 6, title: 'Manual Screening', actor: 'Admin', icon: '👁️', color: '#8B5CF6', description: 'Human review of shortlisted candidates for cultural fit and detailed assessment.' },
  { id: 7, title: 'Interview', actor: 'Company / Mentor', icon: '🎤', color: '#FFD700', description: 'Selected candidates undergo interview rounds with company or assigned mentor.' },
  { id: 8, title: 'Final Selection', actor: 'Admin', icon: '✅', color: '#06FFC9', description: 'Best candidates are selected and officially assigned to the project.' },
  { id: 9, title: 'Project Execution', actor: 'Student + Mentor', icon: '⚡', color: '#00D4FF', description: 'Students work on milestones with mentor guidance and regular progress tracking.' },
  { id: 10, title: 'Quality Review', actor: 'Mentor / Admin', icon: '🔬', color: '#8B5CF6', description: 'Each milestone is reviewed for quality before approval.' },
  { id: 11, title: 'Client Approval', actor: 'Company', icon: '👍', color: '#FFD700', description: 'Company approves the final deliverables and signs off on the project.' },
  { id: 12, title: 'Payment Released', actor: 'Platform', icon: '💰', color: '#06FFC9', description: 'Payment released from escrow to student wallet upon approval.' },
];

export default function AnimatedWorkflow() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="workflow" className="relative py-32 bg-fp-black overflow-hidden">
      <AuroraBackground variant="blue" intensity="low" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-4"
          >
            Project Lifecycle
          </motion.span>
          <TextReveal
            text="From Submission to Payment Every Step Tracked"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        {/* Workflow Pipeline */}
        <div className="relative">
          {/* Background track */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-fp-border/20 -translate-y-1/2 rounded-full" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-fp-neon-blue via-fp-neon-purple to-fp-neon-cyan -translate-y-1/2 rounded-full origin-left"
          />

          {/* Step nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                className="relative group cursor-pointer"
              >
                {/* Node */}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    animate={
                      activeStep === step.id
                        ? { scale: 1.15, boxShadow: `0 0 30px ${step.color}40` }
                        : { scale: 1, boxShadow: `0 0 0px ${step.color}00` }
                    }
                    className="relative w-14 h-14 rounded-2xl bg-fp-dark border border-fp-border/30 flex items-center justify-center text-2xl mb-3 transition-colors group-hover:border-fp-neon-blue/50"
                  >
                    {step.icon}
                    {/* Pulse ring */}
                    <motion.div
                      animate={activeStep === step.id ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2"
                      style={{ borderColor: step.color }}
                    />
                  </motion.div>

                  {/* Step number */}
                  <span className="text-[10px] font-mono text-fp-gray mb-1">
                    STEP {String(step.id).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h4 className="text-xs font-semibold text-fp-white leading-tight group-hover:text-fp-neon-blue transition-colors">
                    {step.title}
                  </h4>

                  {/* Actor */}
                  <span className="text-[10px] text-fp-gray mt-1">{step.actor}</span>
                </div>

                {/* Tooltip on hover */}
                <motion.div
                  initial={false}
                  animate={activeStep === step.id ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 p-4 rounded-xl bg-fp-dark/95 backdrop-blur-xl border border-fp-border/50 shadow-2xl z-20 pointer-events-none"
                >
                  <p className="text-xs text-fp-gray leading-relaxed">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
