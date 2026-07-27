/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Corporate Partners Page
   Corporate partnerships & industry project providers
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building, CheckCircle2, Handshake } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_PARTNERS = [
  { id: 'p1', company: 'TechCorp Solutions', industry: 'Software Engineering', hiredStudents: 14, activeProjects: 3 },
  { id: 'p2', company: 'AeroTech Robotics', industry: 'Robotics & Drones', hiredStudents: 8, activeProjects: 2 },
  { id: 'p3', company: 'TalentScale AI', industry: 'AI & Data Science', hiredStudents: 6, activeProjects: 1 },
];

export default function CollegePartnersPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-1">Corporate Partners</h1>
        <p className="text-fp-gray text-sm">Industry partners providing projects and internship offers to your students.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {MOCK_PARTNERS.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-fp-neon-purple/10 text-fp-neon-purple border border-fp-neon-purple/30">
                    <Building className="w-6 h-6" />
                  </div>
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Active MOU</Badge>
                </div>

                <h3 className="font-bold text-fp-white text-base font-display mb-1">{item.company}</h3>
                <p className="text-xs text-fp-gray mb-4">{item.industry}</p>
              </div>

              <div className="pt-3 border-t border-fp-border/30 flex justify-between text-xs">
                <span className="text-fp-gray">{item.hiredStudents} Students Hired</span>
                <span className="text-fp-neon-cyan font-semibold">{item.activeProjects} Projects</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
