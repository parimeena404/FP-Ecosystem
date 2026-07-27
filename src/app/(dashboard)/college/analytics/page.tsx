/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Placement Analytics Page
   Placement readiness charts & skill breakdown
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, BarChart2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Chart } from '@/components/ui/Chart';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function CollegeAnalyticsPage() {
  const departmentEarnings = [
    { label: 'CS', value: 1120000 },
    { label: 'IT', value: 540000 },
    { label: 'ETC', value: 190000 },
    { label: 'Mech', value: 80000 },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Placement & Project Analytics</h1>
        <p className="text-fp-gray text-sm">Department earnings breakdown, student participation trends, and skill metrics.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card variant="glass" padding="md">
          <h3 className="font-bold text-fp-white text-lg font-display mb-4">Department Student Earnings (₹)</h3>
          <Chart data={departmentEarnings} type="bar" color="#00D4FF" />
        </Card>

        <Card variant="glass" padding="md" className="space-y-4">
          <h3 className="font-bold text-fp-white text-lg font-display">Campus Skill Distribution</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded-xl bg-fp-surface/30">
              <span className="text-fp-gray">Web & Mobile App Development</span>
              <span className="text-fp-neon-cyan font-bold">48% Students</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-fp-surface/30">
              <span className="text-fp-gray">AI / Machine Learning & Data</span>
              <span className="text-fp-neon-purple font-bold">32% Students</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-fp-surface/30">
              <span className="text-fp-gray">Embedded IoT & Robotics</span>
              <span className="text-fp-neon-gold font-bold">20% Students</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
