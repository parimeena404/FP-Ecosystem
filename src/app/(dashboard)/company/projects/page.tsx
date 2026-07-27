/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Projects Page
   Track posted projects, milestone progress, and applicant counts
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_COMPANY_PROJECTS = [
  { id: 'cp1', title: 'Autonomous Drone Flight Telemetry Dashboard', reward: 35000, applicants: 12, status: 'in_progress', category: 'IoT & Web' },
  { id: 'cp2', title: 'AI Resume Screener & Skill Matcher', reward: 45000, applicants: 18, status: 'in_progress', category: 'AI/ML' },
  { id: 'cp3', title: 'EV Battery Thermal Management Simulator', reward: 20000, applicants: 8, status: 'published', category: 'Electronics' },
];

export default function CompanyProjectsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Company Projects</h1>
          <p className="text-fp-gray text-sm">Manage posted projects, view applicants, and track deliverable milestones.</p>
        </div>
        <Button href="/company/projects/new" icon={<Plus className="w-4 h-4" />}>
          Post New Project
        </Button>
      </div>

      <div className="space-y-4">
        {MOCK_COMPANY_PROJECTS.map((p) => (
          <motion.div key={p.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="info">{p.category}</Badge>
                    <Badge variant={p.status === 'in_progress' ? 'warning' : 'success'}>{p.status.replace('_', ' ')}</Badge>
                  </div>
                  <h3 className="font-semibold text-fp-white text-base font-display">{p.title}</h3>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-fp-gray block">Reward Budget</span>
                    <span className="text-base font-bold font-mono text-fp-neon-cyan">{formatINR(p.reward)}</span>
                  </div>

                  <Button size="xs" href="/company/applicants">
                    View Applicants ({p.applicants})
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
