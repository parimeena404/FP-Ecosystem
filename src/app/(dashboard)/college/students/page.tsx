/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Student Roster Page
   Department & semester student directory, verification controls
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { formatXP } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_COLLEGE_STUDENTS = [
  { id: 'cs1', name: 'Aarav Sharma', branch: 'Computer Science', sem: 6, xp: 4800, projects: 4, verified: true },
  { id: 'cs2', name: 'Sneha Gupta', branch: 'Information Technology', sem: 6, xp: 38200, projects: 7, verified: true },
  { id: 'cs3', name: 'Rohan Verma', branch: 'Mechanical', sem: 4, xp: 1200, projects: 1, verified: false },
];

export default function CollegeStudentsPage() {
  const [students, setStudents] = useState(MOCK_COLLEGE_STUDENTS);

  const toggleVerify = (id: string) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s)));
    toast.success('Student status updated!');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Student Roster</h1>
        <p className="text-fp-gray text-sm">Verify student enrollments and track project contributions per department.</p>
      </div>

      <Card variant="glass" padding="none">
        <div className="divide-y divide-fp-border/30">
          {students.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar name={item.name} size="md" />
                <div>
                  <h4 className="font-semibold text-fp-white text-sm flex items-center gap-2">
                    {item.name}
                    {item.verified && <CheckCircle2 className="w-4 h-4 text-fp-neon-cyan" />}
                  </h4>
                  <p className="text-xs text-fp-gray">{item.branch} • Semester {item.sem}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-xs text-fp-gray">{item.projects} Projects Completed</span>
                <span className="font-bold font-mono text-sm text-fp-neon-cyan">{formatXP(item.xp)}</span>
                <Button size="xs" variant={item.verified ? 'ghost' : 'outline'} onClick={() => toggleVerify(item.id)}>
                  {item.verified ? 'Verified' : 'Verify Student'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
