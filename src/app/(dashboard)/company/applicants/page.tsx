/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Applicants Review Page
   Screen student applicants, view AI match scores, and hire candidates
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Sparkles, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_APPLICANTS = [
  { id: 'ap1', studentName: 'Aarav Sharma', college: 'IET DAVV', branch: 'Computer Science', projectTitle: 'Drone Telemetry Dashboard', aiScore: 96, status: 'shortlisted' },
  { id: 'ap2', studentName: 'Priya Patel', college: 'IIT Bombay', branch: 'Electrical', projectTitle: 'AI Resume Screener', aiScore: 98, status: 'shortlisted' },
];

export default function CompanyApplicantsPage() {
  const [candidates, setCandidates] = useState(MOCK_APPLICANTS);

  const hireCandidate = (id: string, name: string) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: 'hired' } : c)));
    toast.success(`Hired ${name}! Funds locked in Escrow.`);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Applicant Pipeline</h1>
        <p className="text-fp-gray text-sm">Review candidate profiles, inspect AI match scores, and assign project roles.</p>
      </div>

      <div className="space-y-4">
        {candidates.map((c) => (
          <motion.div key={c.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar name={c.studentName} size="md" />
                  <div>
                    <h3 className="font-semibold text-fp-white text-base">{c.studentName}</h3>
                    <p className="text-xs text-fp-gray">{c.college} • {c.branch}</p>
                    <p className="text-xs text-fp-neon-blue mt-1">Project: {c.projectTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-fp-gray block">AI Score</span>
                    <span className="text-sm font-bold font-mono text-fp-neon-cyan">{c.aiScore}%</span>
                  </div>

                  {c.status === 'hired' ? (
                    <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>Hired</Badge>
                  ) : (
                    <Button size="xs" onClick={() => hireCandidate(c.id, c.studentName)}>
                      Hire & Lock Escrow
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
