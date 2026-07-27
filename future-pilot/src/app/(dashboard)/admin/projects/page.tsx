/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Projects Management Page
   Lifecycle pipeline board & review approvals
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Clock, CheckCircle, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_PROJECTS = [
  { id: 'p1', title: 'Autonomous Drone Flight Telemetry Dashboard', company: 'AeroTech Robotics', status: 'published', reward: 35000, applicants: 12 },
  { id: 'p2', title: 'Full-Stack E-Commerce Escrow Module', company: 'TechCorp Solutions', status: 'in_progress', reward: 18000, applicants: 8 },
  { id: 'p3', title: 'Autonomous Rover Sensor Telemetry System', company: 'AeroTech Robotics', status: 'pending_review', reward: 40000, applicants: 0 },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  const approveProject = (id: string) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, status: 'published' } : p)));
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Projects Pipeline</h1>
          <p className="text-fp-gray text-sm">Review incoming project drafts, assign mentors, and track completion.</p>
        </div>
        <Button href="/admin/projects/new" icon={<Plus className="w-4 h-4" />}>
          Post New Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <motion.div key={p.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={p.status === 'published' ? 'success' : p.status === 'pending_review' ? 'warning' : 'info'}>
                      {p.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-fp-gray">{p.company}</span>
                  </div>
                  <h3 className="font-semibold text-fp-white text-base font-display">{p.title}</h3>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-fp-gray block">Budget</span>
                    <span className="text-base font-bold font-mono text-fp-neon-cyan">{formatINR(p.reward)}</span>
                  </div>

                  {p.status === 'pending_review' ? (
                    <Button size="xs" onClick={() => approveProject(p.id)}>
                      Approve & Publish
                    </Button>
                  ) : (
                    <span className="text-xs text-fp-gray font-semibold">{p.applicants} Applicants</span>
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
