/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Meetings & Session Scheduler Page
   Schedule 1-on-1 guidance sessions with student pilots
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Clock, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_MEETINGS = [
  { id: 'm1', student: 'Aarav Sharma', topic: 'WebSockets Scaling & Escrow Audit', time: 'Today, 4:00 PM', link: 'https://meet.google.com/abc-defg-hij' },
  { id: 'm2', student: 'Priya Patel', topic: 'NLP Vector Embedding Optimization', time: 'Tomorrow, 2:30 PM', link: 'https://meet.google.com/xyz-uvwx-rst' },
];

export default function MentorMeetingsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Mentorship Sessions</h1>
          <p className="text-fp-gray text-sm">Schedule 1-on-1 code reviews and technical guidance calls.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Schedule Call</Button>
      </div>

      <div className="space-y-4">
        {MOCK_MEETINGS.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="info">{item.time}</Badge>
                  </div>
                  <h3 className="font-semibold text-fp-white text-base font-display">{item.topic}</h3>
                  <p className="text-xs text-fp-gray">Student: {item.student}</p>
                </div>

                <a href={item.link} target="_blank" rel="noreferrer">
                  <Button size="xs" icon={<Video className="w-3.5 h-3.5" />}>Join Video Call</Button>
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
