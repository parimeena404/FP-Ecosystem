/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Mentor Assignment & Network Page
   Assign domain expert mentors to ongoing student projects
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Star, Briefcase, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_MENTORS = [
  { id: 'm1', name: 'Dr. Rajesh Kulkarni', specialization: 'Embedded Systems & Robotics', exp: 12, rating: 4.9, activeProjects: 3 },
  { id: 'm2', name: 'Ananya Deshmukh', specialization: 'AI / Machine Learning & NLP', exp: 8, rating: 4.8, activeProjects: 2 },
  { id: 'm3', name: 'Siddharth Iyer', specialization: 'Full-Stack Architecture & Cloud', exp: 10, rating: 5.0, activeProjects: 4 },
];

export default function AdminMentorsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Mentor Network</h1>
          <p className="text-fp-gray text-sm">Assign senior industry experts to guide student pilots through projects.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Add Mentor</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {MOCK_MENTORS.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={item.name} size="md" />
                  <div>
                    <h3 className="font-semibold text-fp-white text-base">{item.name}</h3>
                    <span className="text-xs text-fp-neon-blue">{item.exp} Years Exp</span>
                  </div>
                </div>

                <Badge variant="premium" className="mb-3">{item.specialization}</Badge>
              </div>

              <div className="pt-3 border-t border-fp-border/30 flex items-center justify-between text-xs">
                <span className="text-fp-neon-gold font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-fp-neon-gold" /> {item.rating} Rating
                </span>
                <span className="text-fp-gray">{item.activeProjects} Active Projects</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
