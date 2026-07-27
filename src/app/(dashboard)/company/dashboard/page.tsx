/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Overview Dashboard
   Active project stats, candidate pipeline, and escrow metrics
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Wallet, Plus, ShieldCheck, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function CompanyDashboardPage() {
  const stats = [
    { label: 'Active Projects', value: '4', icon: Briefcase, color: 'text-fp-neon-blue' },
    { label: 'Total Applicants', value: '38', icon: Users, color: 'text-fp-neon-purple' },
    { label: 'Escrow Locked', value: formatINR(140000), icon: Wallet, color: 'text-fp-neon-gold' },
    { label: 'Completed Projects', value: '12', icon: ShieldCheck, color: 'text-fp-neon-cyan' },
  ];

  const activeProjects = [
    { id: 'cp1', title: 'Autonomous Drone Flight Telemetry Dashboard', applicants: 12, milestone: 'Milestone 2 Review', reward: 35000, status: 'in_progress' },
    { id: 'cp2', title: 'AI Resume Screener & Skill Matcher', applicants: 18, milestone: 'Milestone 1 Deliverable', reward: 45000, status: 'in_progress' },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Company Workspace</h1>
          <p className="text-fp-gray text-sm">Post projects, review candidate applications, and approve milestone payouts.</p>
        </div>
        <Button href="/company/projects/new" icon={<Plus className="w-4 h-4" />}>
          Post New Project
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div key={idx} variants={fadeInUp}>
              <Card variant="glass" padding="sm" hover>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-fp-gray">{item.label}</span>
                  <div className="p-2 rounded-xl bg-fp-surface/60 border border-fp-border/30">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-fp-white font-display">{item.value}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-fp-white font-display">Active Projects</h2>
        <div className="space-y-3">
          {activeProjects.map((p) => (
            <motion.div key={p.id} variants={fadeInUp}>
              <Card variant="glass" padding="md" hover>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="info">In Progress</Badge>
                      <span className="text-xs text-fp-gray">{p.applicants} Applicants</span>
                    </div>
                    <h3 className="font-semibold text-fp-white text-base font-display">{p.title}</h3>
                    <p className="text-xs text-fp-gray flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-fp-neon-gold" /> Current: {p.milestone}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold font-mono text-fp-neon-cyan">{formatINR(p.reward)}</span>
                    <Button size="xs" href="/company/applicants">Review Applicants</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
