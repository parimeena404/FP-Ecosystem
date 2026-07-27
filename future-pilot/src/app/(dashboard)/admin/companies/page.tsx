/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Company Verification & KYC Page
   Review corporate credentials, GST/PAN numbers, and KYC approvals
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_COMPANIES = [
  { id: 'c1', name: 'AeroTech Robotics Solution Pvt Ltd', industry: 'Robotics & Aerospace', kycStatus: 'pending', gst: '23AAAAA0000A1Z5', projects: 2 },
  { id: 'c2', name: 'TechCorp Solutions India', industry: 'Software Engineering', kycStatus: 'verified', gst: '27BBBBB1111B2Z3', projects: 5 },
  { id: 'c3', name: 'GreenMobility Motors', industry: 'Automotive / EV', kycStatus: 'verified', gst: '29CCCCC2222C3Z1', projects: 1 },
];

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);

  const verifyKYC = (id: string) => {
    setCompanies(companies.map((c) => (c.id === id ? { ...c, kycStatus: 'verified' } : c)));
    toast.success('Company KYC verified successfully!');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Company Verification & KYC</h1>
        <p className="text-fp-gray text-sm">Review corporate tax filings, verify KYC, and inspect project history.</p>
      </div>

      <div className="space-y-4">
        {companies.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-fp-white text-base font-display">{item.name}</h3>
                    <Badge variant={item.kycStatus === 'verified' ? 'success' : 'warning'}>
                      {item.kycStatus}
                    </Badge>
                  </div>
                  <p className="text-xs text-fp-gray">{item.industry} • GSTIN: <span className="font-mono text-fp-white">{item.gst}</span></p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-fp-gray">{item.projects} Posted Projects</span>
                  {item.kycStatus === 'pending' && (
                    <Button size="xs" onClick={() => verifyKYC(item.id)} icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                      Approve KYC
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
