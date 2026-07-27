/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Milestone Review & Feedback Page
   Approve milestone code or request revisions
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function MentorReviewsPage() {
  const [feedback, setFeedback] = useState('');

  const handleApprove = () => {
    toast.success('Milestone approved! Recommended escrow release.');
  };

  const handleRevision = () => {
    toast.success('Revision request sent to student.');
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Milestone Code Review</h1>
        <p className="text-fp-gray text-sm">Review student code submission for Milestone 2: WebSockets Data Stream.</p>
      </div>

      <Card variant="glass" padding="lg" className="space-y-4">
        <div className="p-3 rounded-xl bg-fp-surface/30 border border-fp-border/30 text-xs space-y-1">
          <p className="text-fp-white font-semibold">Submitted Deliverables:</p>
          <p className="text-fp-neon-blue font-mono">https://github.com/example/telemetry-dashboard/pull/3</p>
        </div>

        <Textarea
          label="Mentor Feedback & Technical Notes"
          placeholder="Provide constructive feedback on architecture, code quality, or test coverage..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={handleRevision}>Request Revision</Button>
          <Button onClick={handleApprove} icon={<CheckCircle2 className="w-4 h-4" />}>Approve Deliverable</Button>
        </div>
      </Card>
    </motion.div>
  );
}
