/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Students Directory Page
   Manage registered students, verification statuses & account suspensions
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, ShieldOff, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { formatXP } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_STUDENTS = [
  { id: 's1', name: 'Aarav Sharma', email: 'aarav@ietdavv.edu.in', college: 'IET DAVV', branch: 'Computer Science', level: 'Builder', xp: 4800, verified: true, status: 'active' },
  { id: 's2', name: 'Priya Patel', email: 'priya@iitb.ac.in', college: 'IIT Bombay', branch: 'Electrical', level: 'Elite Pilot', xp: 24500, verified: true, status: 'active' },
  { id: 's3', name: 'Rohan Verma', email: 'rohan@bits.ac.in', college: 'BITS Pilani', branch: 'Mechanical', level: 'Explorer', xp: 1200, verified: false, status: 'active' },
];

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const toggleVerify = (id: string) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s)));
    toast.success('Student verification updated!');
  };

  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.college.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Students Directory</h1>
        <p className="text-fp-gray text-sm">Manage student profiles, verify college credentials, and inspect XP ranks.</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fp-gray" />
        <input
          type="text"
          placeholder="Search students by name or college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-fp-surface/50 border border-fp-border/40 rounded-xl pl-9 pr-4 py-2 text-sm text-fp-white placeholder-fp-gray/50 focus:outline-none focus:border-fp-neon-blue/60"
        />
      </div>

      <Card variant="glass" padding="none">
        <div className="divide-y divide-fp-border/30">
          {filtered.map((student) => (
            <div key={student.id} className="p-4 flex items-center justify-between hover:bg-fp-surface/30 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar name={student.name} size="md" />
                <div>
                  <h4 className="font-semibold text-fp-white text-sm flex items-center gap-2">
                    {student.name}
                    {student.verified && <CheckCircle2 className="w-4 h-4 text-fp-neon-cyan" />}
                  </h4>
                  <p className="text-xs text-fp-gray">{student.email} • {student.college} ({student.branch})</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="premium">{student.level}</Badge>
                <span className="font-bold font-mono text-sm text-fp-neon-cyan">{formatXP(student.xp)}</span>
                <Button size="xs" variant={student.verified ? 'ghost' : 'outline'} onClick={() => toggleVerify(student.id)}>
                  {student.verified ? 'Unverify' : 'Verify'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
