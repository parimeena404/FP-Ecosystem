/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Dashboard Main Overview
   At-a-glance metrics, XP level progress, active projects, stats
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  FileText,
  Wallet,
  Trophy,
  Star,
  ArrowUpRight,
  Clock,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/Table';
import { useAuth } from '@/hooks/useAuth';
import { formatINR, formatXP } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function StudentDashboardPage() {
  const { user, studentProfile } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '2', icon: Briefcase, color: 'text-fp-neon-blue' },
    { label: 'Applications', value: '5', icon: FileText, color: 'text-fp-neon-purple' },
    { label: 'Total Earnings', value: formatINR(studentProfile?.totalEarnings || 24500), icon: Wallet, color: 'text-fp-neon-cyan' },
    { label: 'Global Rank', value: '#14', icon: Trophy, color: 'text-fp-neon-gold' },
  ];

  const activeProjects = [
    {
      id: 'p1',
      title: 'Full-Stack E-Commerce Escrow Module',
      company: 'TechCorp Solutions',
      reward: 18000,
      deadline: 'in 4 days',
      progress: 75,
      nextMilestone: 'Milestone 3: Final Integration & Audit',
    },
    {
      id: 'p2',
      title: 'Autonomous Rover Sensor Telemetry Dashboard',
      company: 'AeroSpace Innovators',
      reward: 25000,
      deadline: 'in 12 days',
      progress: 30,
      nextMilestone: 'Milestone 1: WebSockets Data Stream',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={fadeInUp}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-fp-neon-blue/20 via-fp-neon-purple/20 to-fp-surface p-8 border border-fp-border/50 shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="premium" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Level 3 Builder
              </Badge>
              <span className="text-xs text-fp-gray">IET DAVV — Computer Science</span>
            </div>
            <h1 className="text-3xl font-bold text-fp-white font-display">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Pilot'}! 🚀
            </h1>
            <p className="text-fp-gray text-sm mt-1 max-w-xl">
              You have 2 milestones due this week. Complete them to earn 1,200 XP and unlock the &quot;Industry Ready&quot; badge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button href="/student/projects" iconRight={<ArrowUpRight className="w-4 h-4" />}>
              Explore Projects
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-fp-neon-blue/10 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div key={index} variants={fadeInUp}>
              <Card variant="glass" padding="sm" hover>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-fp-gray">{item.label}</span>
                  <div className="p-2 rounded-xl bg-fp-surface/60 border border-fp-border/30">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-fp-white font-display">
                  {item.value}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* XP Level Progress & Active Work Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-fp-white font-display">Active Projects</h2>
            <a href="/student/projects" className="text-xs text-fp-neon-blue hover:underline">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {activeProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <Card variant="glass" padding="md" hover>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-fp-white text-base">{project.title}</h3>
                      <p className="text-xs text-fp-gray">{project.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-fp-neon-cyan">{formatINR(project.reward)}</span>
                      <p className="text-xs text-fp-neon-pink flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> Due {project.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-fp-gray">
                      <span>{project.nextMilestone}</span>
                      <span className="font-mono text-fp-white">{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} color="gradient" size="md" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Col: XP Widget & Leaderboard Preview */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-fp-white font-display">Level Progress</h2>
          <Card variant="glass" padding="md">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple p-1 mb-3">
                <div className="w-full h-full rounded-full bg-fp-dark flex items-center justify-center">
                  <Star className="w-8 h-8 text-fp-neon-gold" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-fp-white font-display">Builder Level</h3>
              <p className="text-xs text-fp-gray">{formatXP(3450)} / 5,000 XP to Innovator</p>
            </div>

            <ProgressBar value={69} color="purple" size="lg" className="mb-4" />

            <div className="p-3 rounded-xl bg-fp-surface/30 border border-fp-border/30 text-xs space-y-2">
              <div className="flex justify-between text-fp-gray">
                <span>Next Rank Perk:</span>
                <span className="text-fp-neon-cyan font-semibold">+15% Milestone Bonus</span>
              </div>
              <div className="flex justify-between text-fp-gray">
                <span>Weekly XP Rank:</span>
                <span className="text-fp-white font-mono">Top 5%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
