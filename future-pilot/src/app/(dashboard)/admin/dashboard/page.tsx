/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Overview & Control Center
   Platform metrics, real-time activity log, pending approval queue
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, GraduationCap, Briefcase, Wallet, ShieldAlert, ArrowUpRight, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function AdminDashboardPage() {
  const metrics = [
    { label: 'Total Students', value: '5,240', icon: Users, color: 'text-fp-neon-blue' },
    { label: 'Partner Companies', value: '142', icon: Building, color: 'text-fp-neon-purple' },
    { label: 'Colleges Network', value: '18', icon: GraduationCap, color: 'text-fp-neon-gold' },
    { label: 'Escrow Locked', value: formatINR(1450000), icon: Wallet, color: 'text-fp-neon-cyan' },
  ];

  const pendingApprovals = [
    { type: 'Company KYC', title: 'AeroTech Robotics Solution Pvt Ltd', detail: 'GST & PAN submitted for review', date: '10 mins ago' },
    { type: 'Project Post', title: 'Autonomous Rover Telemetry System', detail: 'Budget: ₹35,000 • Company: AeroTech', date: '25 mins ago' },
    { type: 'Escrow Release', title: 'Milestone 2 Approval — TechCorp', detail: 'Release ₹18,000 to Aarav Sharma', date: '1 hour ago' },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Admin Command Center</h1>
          <p className="text-fp-gray text-sm">Platform control, live activity, and high-priority approvals queue.</p>
        </div>
        <Button href="/admin/projects/new" icon={<Briefcase className="w-4 h-4" />}>
          Post New Project
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div key={idx} variants={fadeInUp}>
              <Card variant="glass" padding="sm" hover>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-fp-gray">{m.label}</span>
                  <div className="p-2 rounded-xl bg-fp-surface/60 border border-fp-border/30">
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-fp-white font-display">{m.value}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Pending Queue & Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pending Approval Queue */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-fp-white font-display flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-fp-neon-gold" /> Pending Approvals Queue
          </h2>

          <div className="space-y-3">
            {pendingApprovals.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card variant="glass" padding="md" hover>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="warning">{item.type}</Badge>
                        <span className="text-[10px] text-fp-gray">{item.date}</span>
                      </div>
                      <h4 className="font-semibold text-fp-white text-sm">{item.title}</h4>
                      <p className="text-xs text-fp-gray">{item.detail}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="xs">Review & Approve</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-fp-white font-display flex items-center gap-2">
            <Activity className="w-5 h-5 text-fp-neon-blue" /> Live Activity Feed
          </h2>

          <Card variant="glass" padding="md">
            <div className="space-y-4 text-xs">
              <div className="pb-3 border-b border-fp-border/30">
                <span className="text-fp-neon-cyan font-semibold">New Student Registration</span>
                <p className="text-fp-gray">Rohan V. registered from IET DAVV</p>
                <span className="text-[10px] text-fp-gray/70">2 mins ago</span>
              </div>
              <div className="pb-3 border-b border-fp-border/30">
                <span className="text-fp-neon-purple font-semibold">Application Submitted</span>
                <p className="text-fp-gray">Priya P. applied to Drone Telemetry Dashboard</p>
                <span className="text-[10px] text-fp-gray/70">14 mins ago</span>
              </div>
              <div>
                <span className="text-fp-neon-gold font-semibold">Certificate Issued</span>
                <p className="text-fp-gray">Certificate #8841 generated for Aarav S.</p>
                <span className="text-[10px] text-fp-gray/70">1 hour ago</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
