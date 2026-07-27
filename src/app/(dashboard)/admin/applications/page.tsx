/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Application Screening Pipeline Page
   Inspect candidate AI match scores, shortlist, and schedule interviews
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, XCircle, Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_APPLICANTS = [
  { id: 'ap1', studentName: 'Aarav Sharma', projectTitle: 'Drone Telemetry Dashboard', aiScore: 96, status: 'applied', college: 'IET DAVV' },
  { id: 'ap2', studentName: 'Priya Patel', projectTitle: 'E-Commerce Escrow Module', aiScore: 98, status: 'shortlisted', college: 'IIT Bombay' },
  { id: 'ap3', studentName: 'Rohan Verma', projectTitle: 'Drone Telemetry Dashboard', aiScore: 74, status: 'applied', college: 'BITS Pilani' },
];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState(MOCK_APPLICANTS);

  const updateStatus = (id: string, status: string) => {
    setApps(apps.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success(`Application updated to ${status}!`);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Application Screener</h1>
        <p className="text-fp-gray text-sm">AI match score breakdown and candidate shortlisting pipeline.</p>
      </div>

      <div className="space-y-4">
        {apps.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar name={item.studentName} size="md" />
                  <div>
                    <h3 className="font-semibold text-fp-white text-base">{item.studentName}</h3>
                    <p className="text-xs text-fp-gray">{item.college} • Applied for <span className="text-fp-white font-medium">{item.projectTitle}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-fp-gray block">AI Score</span>
                    <span className="text-sm font-bold font-mono text-fp-neon-cyan">{item.aiScore}%</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="xs" variant="outline" onClick={() => updateStatus(item.id, 'shortlisted')}>
                      Shortlist
                    </Button>
                    <Button size="xs" onClick={() => updateStatus(item.id, 'selected')}>
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
