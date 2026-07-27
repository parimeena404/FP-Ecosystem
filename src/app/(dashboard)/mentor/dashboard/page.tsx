/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Overview Dashboard
   Assigned projects, pending milestone reviews, upcoming meetings
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Star, Briefcase, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function MentorDashboardPage() {
  const stats = [
    { label: 'Assigned Projects', value: '3', icon: Briefcase, color: 'text-fp-neon-blue' },
    { label: 'Pending Reviews', value: '2', icon: Clock, color: 'text-fp-neon-gold' },
    { label: 'Students Guided', value: '14', icon: UserCheck, color: 'text-fp-neon-purple' },
    { label: 'Mentor Rating', value: '4.9 ★', icon: Star, color: 'text-fp-neon-cyan' },
  ];

  const pendingReviews = [
    { id: 'r1', student: 'Aarav Sharma', project: 'Autonomous Drone Flight Telemetry', milestone: 'Milestone 2: WebSockets Stream', submitted: '3 hours ago' },
    { id: 'r2', student: 'Priya Patel', project: 'AI Resume Screener', milestone: 'Milestone 1: NLP Parser Pipeline', submitted: 'Yesterday' },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Mentor Workspace</h1>
        <p className="text-fp-gray text-sm">Guide student pilots, review technical milestone code, and host mentorship sessions.</p>
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
        <h2 className="text-xl font-bold text-fp-white font-display">Pending Milestone Reviews</h2>
        <div className="space-y-3">
          {pendingReviews.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Card variant="glass" padding="md" hover>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="warning">Review Required</Badge>
                      <span className="text-xs text-fp-gray">{item.submitted}</span>
                    </div>
                    <h3 className="font-semibold text-fp-white text-base font-display">{item.milestone}</h3>
                    <p className="text-xs text-fp-gray">Student: {item.student} • Project: {item.project}</p>
                  </div>

                  <Button size="xs" href="/mentor/reviews">Review Deliverable</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
