/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Project Creation Wizard Page
   Form to define project specs, budget, skills, and escrow milestones
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Calendar, Sparkles, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input, { Textarea } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { fadeInUp } from '@/lib/animations/variants';

export default function NewProjectPage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [reward, setReward] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reward) {
      toast.error('Title and reward budget are required.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Project published successfully to marketplace!');
      window.location.href = '/admin/projects';
    }, 1200);
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Post New Project</h1>
        <p className="text-fp-gray text-sm">Create an escrow-backed industry project for student pilots.</p>
      </div>

      <Card variant="glass" padding="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g., Autonomous Telemetry Dashboard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              placeholder="e.g., AeroTech Robotics"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <Input
              label="Budget Reward (₹)"
              type="number"
              placeholder="e.g., 35000"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              icon={<DollarSign className="w-4 h-4" />}
            />
          </div>

          <Textarea
            label="Project Description"
            placeholder="Detailed scope, deliverables, and expectations..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

          <Input
            label="Required Skills"
            placeholder="e.g., React, Python, Three.js (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" href="/admin/projects">Cancel</Button>
            <Button type="submit" loading={submitting}>Publish Project</Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
