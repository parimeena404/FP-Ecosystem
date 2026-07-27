/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Colleges Network Page
   Manage partner universities, department rosters, and student enrollment
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, CheckCircle2, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_COLLEGES = [
  { id: 'cl1', name: 'Institute of Engineering & Technology, DAVV', city: 'Indore', state: 'Madhya Pradesh', students: 1450, projectsCompleted: 120, status: 'verified' },
  { id: 'cl2', name: 'Indian Institute of Technology, Bombay', city: 'Mumbai', state: 'Maharashtra', students: 2100, projectsCompleted: 185, status: 'verified' },
  { id: 'cl3', name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan', students: 1650, projectsCompleted: 95, status: 'verified' },
];

export default function AdminCollegesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Partner Colleges Network</h1>
        <p className="text-fp-gray text-sm">Monitor university registrations, student participation, and placement metrics.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {MOCK_COLLEGES.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-fp-neon-gold/10 text-fp-neon-gold border border-fp-neon-gold/30">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Partner</Badge>
                </div>

                <h3 className="font-bold text-fp-white text-base font-display mb-1">{item.name}</h3>
                <p className="text-xs text-fp-gray mb-4">{item.city}, {item.state}</p>
              </div>

              <div className="pt-3 border-t border-fp-border/30 flex justify-between text-xs">
                <span className="text-fp-gray flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {item.students} Students
                </span>
                <span className="text-fp-neon-cyan font-semibold">{item.projectsCompleted} Projects</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
