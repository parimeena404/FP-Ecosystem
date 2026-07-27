/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Assigned Projects Workspace
   Inspect code repositories, progress, and student guidance history
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, UserCheck, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_MENTOR_PROJECTS = [
  { id: 'mp1', title: 'Autonomous Drone Flight Telemetry Dashboard', student: 'Aarav Sharma', company: 'AeroTech Robotics', progress: 75 },
  { id: 'mp2', title: 'AI Resume Screener & Skill Matcher', student: 'Priya Patel', company: 'TalentScale AI', progress: 40 },
];

export default function MentorProjectsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Assigned Projects Workspace</h1>
        <p className="text-fp-gray text-sm">Monitor student progress and provide technical architectural guidance.</p>
      </div>

      <div className="space-y-4">
        {MOCK_MENTOR_PROJECTS.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-fp-white text-base font-display">{item.title}</h3>
                  <p className="text-xs text-fp-gray">Student: {item.student} • Client: {item.company}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-fp-neon-cyan font-bold">{item.progress}% Complete</span>
                  <Button size="xs" href="/mentor/reviews">Inspect Code</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
