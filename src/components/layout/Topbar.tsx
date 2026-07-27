/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Dashboard Topbar
   Header with Search, Notification Bell dropdown, and Quick Actions
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, Bell, Sparkles, CheckCheck } from 'lucide-react';
import { Dropdown } from '@/components/ui/Table';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

const ROLE_PROFILE_ROUTES: Record<string, string> = {
  student: '/student/profile',
  company: '/company/profile',
  college: '/college/profile',
  mentor: '/mentor/profile',
  admin: '/admin/settings',
};

const ROLE_BADGE_LABELS: Record<string, string> = {
  student: 'Student',
  company: 'Company',
  college: 'University',
  mentor: 'Mentor',
  admin: 'Admin',
};

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(3);

  // Determine current active portal key
  let portalKey = 'student';
  if (pathname?.startsWith('/company')) portalKey = 'company';
  else if (pathname?.startsWith('/college')) portalKey = 'college';
  else if (pathname?.startsWith('/mentor')) portalKey = 'mentor';
  else if (pathname?.startsWith('/admin')) portalKey = 'admin';
  else if (pathname?.startsWith('/student')) portalKey = 'student';
  else if (user?.role) {
    if (user.role === UserRole.COMPANY) portalKey = 'company';
    else if (user.role === UserRole.COLLEGE) portalKey = 'college';
    else if (user.role === UserRole.MENTOR) portalKey = 'mentor';
    else if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) portalKey = 'admin';
  }

  const profileHref = ROLE_PROFILE_ROUTES[portalKey] || '/student/profile';
  const roleLabel = ROLE_BADGE_LABELS[portalKey] || 'Student';

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
            <div className="relative p-2 rounded-xl bg-fp-surface/30 border border-fp-border/30 hover:border-fp-border/60 text-fp-gray hover:text-fp-white transition-colors cursor-pointer">
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
        <Link href={profileHref} className="flex items-center gap-2 hover:opacity-85 transition-opacity">
          <Avatar name={user?.displayName || 'User'} src={user?.photoURL} size="sm" />
          <Badge variant="info" className="hidden sm:inline-flex text-[10px] py-0.5 px-2">
            {roleLabel}
          </Badge>
        </Link>
      </div>
    </header>
  );
}
