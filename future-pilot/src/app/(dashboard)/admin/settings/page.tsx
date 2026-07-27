/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Platform Settings Page
   Platform commission rates, feature flags, maintenance mode controls
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Zap, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function AdminSettingsPage() {
  const [commissionRate, setCommissionRate] = useState('15');
  const [minWithdrawal, setMinWithdrawal] = useState('500');
  const [aiScreening, setAiScreening] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Platform configurations updated!');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Platform Settings & Controls</h1>
        <p className="text-fp-gray text-sm">Configure system parameters, fee rates, and operational feature flags.</p>
      </div>

      <Card variant="glass" padding="md">
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="text-lg font-bold text-fp-white font-display flex items-center gap-2">
            <Zap className="w-5 h-5 text-fp-neon-gold" /> Fee & Wallet Rules
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Platform Commission Fee (%)"
              type="number"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
            />
            <Input
              label="Minimum Withdrawal Limit (₹)"
              type="number"
              value={minWithdrawal}
              onChange={(e) => setMinWithdrawal(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-bold text-fp-white font-display flex items-center gap-2 pt-4 border-t border-fp-border/30">
            <Shield className="w-5 h-5 text-fp-neon-blue" /> System Feature Flags
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-fp-surface/30 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-fp-white">Automated AI Resume Screening</p>
                <p className="text-xs text-fp-gray">Automatically generate match scores for incoming applicant resumes.</p>
              </div>
              <input
                type="checkbox"
                checked={aiScreening}
                onChange={(e) => setAiScreening(e.target.checked)}
                className="w-5 h-5 accent-fp-neon-blue cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-fp-surface/30 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-fp-white">Maintenance Mode</p>
                <p className="text-xs text-fp-gray">Restrict student/company access to platform during maintenance windows.</p>
              </div>
              <input
                type="checkbox"
                checked={maintenance}
                onChange={(e) => setMaintenance(e.target.checked)}
                className="w-5 h-5 accent-fp-neon-pink cursor-pointer"
              />
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit">Save Platform Settings</Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
