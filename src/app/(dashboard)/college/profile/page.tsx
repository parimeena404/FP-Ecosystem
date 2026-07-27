/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Profile Page
   University accreditation details & department configuration
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CheckCircle2, MapPin, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function CollegeProfilePage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
      <Card variant="glass" padding="lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="p-4 rounded-2xl bg-fp-neon-gold/20 border border-fp-neon-gold/40 text-fp-neon-gold shrink-0">
            <GraduationCap className="w-10 h-10" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <h1 className="text-2xl font-bold text-fp-white font-display">Institute of Engineering & Technology, DAVV</h1>
              <Badge variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>Verified Institute</Badge>
            </div>

            <p className="text-xs text-fp-gray flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5" /> Indore, Madhya Pradesh • NAAC A+ Accredited
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
