/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Post Project Page
   Client project creation wizard with milestone budget definition
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { fadeInUp } from '@/lib/animations/variants';

export default function CompanyNewProjectPage() {
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reward) {
      toast.error('Project title and reward budget are required.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Project posted! Sent to Admin review.');
      window.location.href = '/company/projects';
    }, 1200);
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Post Industry Project</h1>
        <p className="text-fp-gray text-sm">Define your project requirements, reward budget, and milestone deliverables.</p>
      </div>

      <Card variant="glass" padding="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. AI Resume Screener Microservice"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="Project Reward Budget (₹)"
            type="number"
            placeholder="e.g. 45000"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            icon={<DollarSign className="w-4 h-4" />}
          />

          <Textarea
            label="Project Scope & Deliverables"
            placeholder="Detailed description of technical requirements and milestone breakdown..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

          <Input
            label="Required Skills"
            placeholder="e.g. Python, FastAPI, PyTorch (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" href="/company/projects">Cancel</Button>
            <Button type="submit" loading={submitting}>Submit for Approval</Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
