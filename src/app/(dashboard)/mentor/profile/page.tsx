/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Profile Page
   Specialization tags, experience, rating overview
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Star, Award, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function MentorProfilePage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
      <Card variant="glass" padding="lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar name="Dr. Rajesh Kulkarni" size="xl" levelColor="#FFD700" />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <h1 className="text-2xl font-bold text-fp-white font-display">Dr. Rajesh Kulkarni</h1>
              <Badge variant="warning" icon={<Star className="w-3.5 h-3.5 fill-fp-neon-gold" />}>4.9 Mentor Rating</Badge>
            </div>

            <p className="text-xs text-fp-gray">12 Years Senior Engineering Experience • Ex-ISRO / AeroTech</p>
            <Badge variant="premium">Embedded Systems & Robotics Architecture</Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
