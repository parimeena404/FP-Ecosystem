/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Dashboard Topbar
   Header with Search, Notification Bell dropdown, and Quick Actions
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { Menu, Search, Bell, Sparkles, CheckCheck } from 'lucide-react';
import { Dropdown } from '@/components/ui/Table';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { formatRelativeTime } from '@/lib/utils/format';

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(3);

  const mockNotifications = [
    { id: '1', title: 'Application Shortlisted', message: 'Your application for AI Chatbot Frontend was shortlisted!', time: new Date(Date.now() - 3600000) },
    { id: '2', title: 'Milestone Approved', message: 'Milestone 2 payment of ₹5,000 was released into your wallet.', time: new Date(Date.now() - 86400000) },
    { id: '3', title: 'New Badge Earned', message: 'You earned the "Problem Solver" badge!', time: new Date(Date.now() - 172800000) },
  ];

  return (
    <header className="sticky top-0 z-20 bg-fp-dark/80 backdrop-blur-xl border-b border-fp-border/40 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-fp-gray hover:text-fp-white hover:bg-fp-surface/50 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fp-gray" />
          <input
            type="text"
            placeholder="Search projects, skills, or mentors..."
            className="w-full bg-fp-surface/40 border border-fp-border/30 rounded-xl pl-9 pr-4 py-1.5 text-xs lg:text-sm text-fp-white placeholder-fp-gray/50 focus:outline-none focus:border-fp-neon-blue/50 focus:ring-1 focus:ring-fp-neon-blue/30 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <Dropdown
          trigger={
            <div className="relative p-2 rounded-xl bg-fp-surface/30 border border-fp-border/30 hover:border-fp-border/60 text-fp-gray hover:text-fp-white transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-fp-neon-pink ring-2 ring-fp-dark animate-pulse" />
              )}
            </div>
          }
          items={[
            {
              label: `Notifications (${unreadCount} unread)`,
              icon: <Sparkles className="w-4 h-4 text-fp-neon-blue" />,
              onClick: () => {},
            },
            ...mockNotifications.map((n) => ({
              label: n.title,
              icon: <CheckCheck className="w-4 h-4 text-fp-neon-cyan" />,
              onClick: () => setUnreadCount(Math.max(0, unreadCount - 1)),
            })),
          ]}
        />

        {/* User Profile */}
        <a href="/student/profile" className="flex items-center gap-2">
          <Avatar name={user?.displayName || 'Student'} src={user?.photoURL} size="sm" />
        </a>
      </div>
    </header>
  );
}
