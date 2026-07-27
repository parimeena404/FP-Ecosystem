/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Leaderboard Page
   Global, College, and Branch XP Leaderboard rankings
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Crown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Table';
import { formatXP } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Aarav Sharma', college: 'IET DAVV', branch: 'Computer Science', xp: 54200, level: 'Future Legend', badges: 18 },
  { rank: 2, name: 'Priya Patel', college: 'IIT Bombay', branch: 'Electrical Engineering', xp: 48900, level: 'Elite Pilot', badges: 15 },
  { rank: 3, name: 'Rohan Verma', college: 'BITS Pilani', branch: 'Mechanical', xp: 41500, level: 'Elite Pilot', badges: 12 },
  { rank: 4, name: 'Sneha Gupta', college: 'IET DAVV', branch: 'IT', xp: 38200, level: 'Expert', badges: 11 },
  { rank: 5, name: 'Vikram Singh', college: 'NIT Trichy', branch: 'AI & Data Science', xp: 34100, level: 'Expert', badges: 9 },
];

export default function StudentLeaderboardPage() {
  const [scope, setScope] = useState('global');

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">XP Leaderboard</h1>
        <p className="text-fp-gray text-sm">Compete with top student pilots across India and earn prestigious badges.</p>
      </div>

      <Tabs
        tabs={[
          { id: 'global', label: 'Global Ranking' },
          { id: 'college', label: 'My College (IET DAVV)' },
          { id: 'branch', label: 'My Branch (CS)' },
        ]}
        activeTab={scope}
        onChange={setScope}
      />

      {/* Top 3 Podium Cards */}
      <div className="grid md:grid-cols-3 gap-6 pt-4">
        {MOCK_LEADERBOARD.slice(0, 3).map((item, idx) => {
          const podiumOrder = idx === 0 ? 'order-1 md:order-2' : idx === 1 ? 'order-2 md:order-1' : 'order-3';
          const isFirst = idx === 0;

          return (
            <motion.div key={item.rank} variants={fadeInUp} className={podiumOrder}>
              <Card
                variant="glass"
                padding="md"
                className={`text-center relative ${
                  isFirst ? 'border-fp-neon-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.15)] md:-translate-y-4' : ''
                }`}
              >
                {isFirst && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 p-2 bg-fp-neon-gold/20 rounded-full border border-fp-neon-gold/40">
                    <Crown className="w-6 h-6 text-fp-neon-gold animate-bounce" />
                  </div>
                )}

                <Avatar name={item.name} size="xl" className="mx-auto mb-3 mt-2" />
                <h3 className="font-bold text-fp-white text-lg font-display">{item.name}</h3>
                <p className="text-xs text-fp-gray mb-1">{item.college}</p>
                <Badge variant={isFirst ? 'warning' : 'premium'} className="mb-4">
                  {item.level}
                </Badge>

                <div className="pt-3 border-t border-fp-border/30 flex justify-between text-xs">
                  <span className="text-fp-gray">Total XP:</span>
                  <span className="font-bold font-mono text-fp-neon-cyan">{formatXP(item.xp)}</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Full Leaderboard List */}
      <Card variant="glass" padding="none">
        <div className="divide-y divide-fp-border/30">
          {MOCK_LEADERBOARD.map((item) => (
            <div key={item.rank} className="p-4 flex items-center justify-between hover:bg-fp-surface/30 transition-colors">
              <div className="flex items-center gap-4">
                <span className={`w-8 text-center font-bold font-display text-lg ${
                  item.rank === 1 ? 'text-fp-neon-gold' : item.rank === 2 ? 'text-fp-gray' : item.rank === 3 ? 'text-fp-neon-pink' : 'text-fp-gray/70'
                }`}>
                  #{item.rank}
                </span>
                <Avatar name={item.name} size="sm" />
                <div>
                  <h4 className="font-semibold text-fp-white text-sm">{item.name}</h4>
                  <p className="text-xs text-fp-gray">{item.college} • {item.branch}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="hidden sm:block text-xs text-fp-gray">{item.badges} Badges</span>
                <span className="font-bold font-mono text-sm text-fp-neon-cyan">{formatXP(item.xp)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
