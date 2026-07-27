/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Dashboard Page
   Student participation stats, total student earnings, and department leaderboard
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Wallet, Trophy, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function CollegeDashboardPage() {
  const stats = [
    { label: 'Active Students', value: '1,450', icon: Users, color: 'text-fp-neon-blue' },
    { label: 'Total Student Earnings', value: formatINR(1850000), icon: Wallet, color: 'text-fp-neon-cyan' },
    { label: 'Projects Completed', value: '120', icon: CheckCircle2, color: 'text-fp-neon-purple' },
    { label: 'College Rank', value: '#1 in MP', icon: Trophy, color: 'text-fp-neon-gold' },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-1">University Dashboard</h1>
          <p className="text-fp-gray text-sm">Institute of Engineering & Technology, DAVV — Student Participation & Placement Metrics.</p>
        </div>
        <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>Partner Institute</Badge>
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

      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="glass" padding="md">
          <h3 className="font-bold text-fp-white text-lg font-display mb-3">Top Performing Departments</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-fp-surface/30">
              <span className="text-fp-white font-medium">Computer Science & Eng.</span>
              <span className="text-fp-neon-cyan font-bold font-mono">640 Students • ₹11.2L Earned</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-fp-surface/30">
              <span className="text-fp-white font-medium">Information Technology</span>
              <span className="text-fp-neon-cyan font-bold font-mono">420 Students • ₹5.4L Earned</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-fp-surface/30">
              <span className="text-fp-white font-medium">Electronics & Telecom</span>
              <span className="text-fp-neon-cyan font-bold font-mono">280 Students • ₹1.9L Earned</span>
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="md">
          <h3 className="font-bold text-fp-white text-lg font-display mb-3">Campus Placement Readiness</h3>
          <p className="text-xs text-fp-gray mb-4">
            Students completing 2+ industry projects show 84% higher shortlisting rates during campus placements.
          </p>
          <div className="p-3 rounded-xl bg-fp-neon-blue/10 border border-fp-neon-blue/30 text-xs text-fp-neon-blue font-semibold text-center">
            84% Industry Readiness Index Score
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
