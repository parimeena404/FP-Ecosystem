/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Finance & Escrow Ledger Page
   Platform escrow holdings, commission revenue, and manual release triggers
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, ArrowUpRight, DollarSign, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_ESCROW_LOGS = [
  { id: 'e1', project: 'Full-Stack E-Commerce Escrow Module', company: 'TechCorp Solutions', student: 'Aarav Sharma', amount: 18000, status: 'funded' },
  { id: 'e2', project: 'Autonomous Drone Flight Telemetry', company: 'AeroTech Robotics', student: 'Priya Patel', amount: 35000, status: 'partially_released' },
  { id: 'e3', project: 'AI Resume Screener & Skill Matcher', company: 'TalentScale AI', student: 'Rohan Verma', amount: 45000, status: 'funded' },
];

export default function AdminFinancePage() {
  const triggerRelease = (id: string) => {
    toast.success('Escrow payout triggered successfully via Razorpay!');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Finance & Escrow Ledger</h1>
        <p className="text-fp-gray text-sm">Monitor platform commission revenues, escrow vaults, and manual payout overrides.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="glass" padding="md">
          <span className="text-xs text-fp-gray block mb-1">Total Escrow Vault Balance</span>
          <span className="text-3xl font-bold text-fp-neon-cyan font-display">{formatINR(1450000)}</span>
          <p className="text-[10px] text-fp-gray mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-fp-neon-cyan" /> Locked across 42 active projects
          </p>
        </Card>

        <Card variant="glass" padding="md">
          <span className="text-xs text-fp-gray block mb-1">Platform Commission Revenue</span>
          <span className="text-3xl font-bold text-fp-neon-purple font-display">{formatINR(420000)}</span>
          <p className="text-[10px] text-fp-gray mt-2">15% fee per completed milestone</p>
        </Card>

        <Card variant="glass" padding="md">
          <span className="text-xs text-fp-gray block mb-1">Total Payouts Released</span>
          <span className="text-3xl font-bold text-fp-neon-gold font-display">{formatINR(2500000)}</span>
          <p className="text-[10px] text-fp-gray mt-2">Paid out to student pilots</p>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-fp-white font-display">Active Escrow Contracts</h2>
        <Card variant="glass" padding="none">
          <div className="divide-y divide-fp-border/30">
            {MOCK_ESCROW_LOGS.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-fp-white text-sm">{item.project}</h4>
                  <p className="text-xs text-fp-gray">Company: {item.company} • Student: {item.student}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold font-mono text-sm text-fp-neon-cyan">{formatINR(item.amount)}</span>
                  <Badge variant="warning">{item.status}</Badge>
                  <Button size="xs" onClick={() => triggerRelease(item.id)}>
                    Release Payout
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
