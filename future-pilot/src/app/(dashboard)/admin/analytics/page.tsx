/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Growth Analytics Page
   Platform growth visual trends, student registration, and payouts
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Wallet, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Chart } from '@/components/ui/Chart';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function AdminAnalyticsPage() {
  const studentGrowthData = [
    { label: 'Jan', value: 800 },
    { label: 'Feb', value: 1400 },
    { label: 'Mar', value: 2200 },
    { label: 'Apr', value: 3100 },
    { label: 'May', value: 4200 },
    { label: 'Jun', value: 5240 },
  ];

  const payoutData = [
    { label: 'Jan', value: 120000 },
    { label: 'Feb', value: 280000 },
    { label: 'Mar', value: 450000 },
    { label: 'Apr', value: 720000 },
    { label: 'May', value: 1100000 },
    { label: 'Jun', value: 1450000 },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Platform Growth Analytics</h1>
        <p className="text-fp-gray text-sm">Visual trend charts for student onboarding, project payouts, and completion rates.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass" padding="md">
          <h3 className="font-bold text-fp-white text-lg font-display mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-fp-neon-blue" /> Student Registrations Trend
          </h3>
          <Chart data={studentGrowthData} type="line" color="#00D4FF" />
        </Card>

        <Card variant="glass" padding="md">
          <h3 className="font-bold text-fp-white text-lg font-display mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-fp-neon-cyan" /> Monthly Escrow Payouts (₹)
          </h3>
          <Chart data={payoutData} type="bar" color="#06FFC9" />
        </Card>
      </div>
    </motion.div>
  );
}
