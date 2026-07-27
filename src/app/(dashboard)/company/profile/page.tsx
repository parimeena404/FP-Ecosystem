/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Profile & KYC Page
   Corporate profile details, GSTIN tax filing info, and verification badge
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building, ShieldCheck, CheckCircle2, Globe, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function CompanyProfilePage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="p-4 rounded-2xl bg-fp-neon-purple/20 border border-fp-neon-purple/40 text-fp-neon-purple shrink-0">
            <Building className="w-10 h-10" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <h1 className="text-2xl font-bold text-fp-white font-display">AeroTech Robotics Solution Pvt Ltd</h1>
              <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>KYC Verified</Badge>
            </div>

            <p className="text-xs text-fp-gray">Robotics & Autonomous Aviation • Indore, MP</p>
            <p className="text-xs text-fp-gray font-mono">GSTIN: 23AAAAA0000A1Z5</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="glass" padding="md" className="space-y-3">
          <h3 className="font-semibold text-fp-white font-display">Company Information</h3>
          <p className="text-xs text-fp-gray leading-relaxed">
            AeroTech Robotics develops next-generation autonomous drone inspection platforms for power grids and infrastructure monitoring.
          </p>
        </Card>

        <Card variant="glass" padding="md" className="space-y-3">
          <h3 className="font-semibold text-fp-white font-display">Escrow & Billing Status</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded-xl bg-fp-surface/30">
              <span className="text-fp-gray">Escrow Lock Account</span>
              <span className="text-fp-neon-cyan font-semibold">Active (Razorpay)</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-fp-surface/30">
              <span className="text-fp-gray">Verified GSTIN</span>
              <span className="text-fp-white font-mono">23AAAAA0000A1Z5</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
