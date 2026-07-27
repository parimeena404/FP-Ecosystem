/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Achievements & Badges Page
   Gamification achievements, rarity badges, and unlock progress
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { BADGE_DEFINITIONS } from '@/types';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function StudentAchievementsPage() {
  const badgesList = Object.entries(BADGE_DEFINITIONS).map(([key, item], idx) => ({
    id: key,
    ...item,
    unlocked: idx < 6, // First 6 unlocked for demo
    earnedAt: idx < 6 ? 'Earned July 2026' : 'Locked',
  }));

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Badge variant="warning">Legendary</Badge>;
      case 'epic': return <Badge variant="premium">Epic</Badge>;
      case 'rare': return <Badge variant="info">Rare</Badge>;
      default: return <Badge variant="neutral">Common</Badge>;
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Achievements & Badges</h1>
        <p className="text-fp-gray text-sm">Unlock badges as you complete milestones, solve problems, and earn XP.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badgesList.map((badge) => (
          <motion.div key={badge.id} variants={fadeInUp}>
            <Card
              variant="glass"
              padding="md"
              className={`text-center relative transition-all ${
                badge.unlocked ? 'border-fp-neon-blue/30 shadow-[0_0_15px_rgba(0,212,255,0.08)]' : 'opacity-60 grayscale'
              }`}
            >
              <div className="text-4xl mb-3 flex items-center justify-center">
                {badge.icon}
              </div>

              <h3 className="font-semibold text-fp-white text-sm mb-1">{badge.name}</h3>
              <div className="flex justify-center mb-3">{getRarityBadge(badge.rarity)}</div>

              <p className="text-[10px] text-fp-gray flex items-center justify-center gap-1">
                {badge.unlocked ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-fp-neon-cyan" /> {badge.earnedAt}
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3" /> Locked
                  </>
                )}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
