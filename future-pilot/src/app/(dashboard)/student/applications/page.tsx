/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Applications Page
   Track active, shortlisted, selected, and past applications
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Sparkles, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Table';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_APPLICATIONS = [
  {
    id: 'a1',
    projectTitle: 'Autonomous Drone Flight Telemetry Dashboard',
    company: 'AeroTech Robotics',
    status: 'shortlisted',
    appliedDate: '3 days ago',
    aiScore: 94,
    stage: 'Technical Screening',
    reward: 35000,
  },
  {
    id: 'a2',
    projectTitle: 'Full-Stack E-Commerce Escrow Module',
    company: 'TechCorp Solutions',
    status: 'selected',
    appliedDate: '1 week ago',
    aiScore: 98,
    stage: 'Project Assigned',
    reward: 18000,
  },
  {
    id: 'a3',
    projectTitle: 'AI Resume Screener & Skill Matcher Microservice',
    company: 'TalentScale AI',
    status: 'applied',
    appliedDate: '1 day ago',
    aiScore: 88,
    stage: 'Under AI Review',
    reward: 45000,
  },
];

export default function StudentApplicationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredApps = MOCK_APPLICATIONS.filter((app) => {
    if (activeTab === 'all') return true;
    return app.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'selected':
        return <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Selected</Badge>;
      case 'shortlisted':
        return <Badge variant="info" icon={<Sparkles className="w-3 h-3" />}>Shortlisted</Badge>;
      case 'applied':
        return <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>Applied</Badge>;
      case 'rejected':
        return <Badge variant="danger" icon={<XCircle className="w-3 h-3" />}>Rejected</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">My Applications</h1>
        <p className="text-fp-gray text-sm">Monitor your project applications, screening scores, and interview invites.</p>
      </div>

      <Tabs
        tabs={[
          { id: 'all', label: 'All Applications', badge: MOCK_APPLICATIONS.length },
          { id: 'selected', label: 'Selected' },
          { id: 'shortlisted', label: 'Shortlisted' },
          { id: 'applied', label: 'In Review' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="space-y-4">
        {filteredApps.map((app) => (
          <motion.div key={app.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-fp-white text-base font-display">{app.projectTitle}</h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <p className="text-xs text-fp-gray">{app.company} • Applied {app.appliedDate}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-fp-gray block">AI Match Score</span>
                    <span className="text-sm font-bold font-mono text-fp-neon-cyan">{app.aiScore}%</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-fp-gray block">Current Stage</span>
                    <span className="text-xs font-semibold text-fp-white">{app.stage}</span>
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
