/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Dashboard Sidebar
   Collapsible, responsive navigation sidebar for Student Portal
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  FolderOpen,
  Trophy,
  Wallet,
  Award,
  Star,
  User as UserIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/ui/Avatar';
import { ProgressBar } from '@/components/ui/Table';
import { logout } from '@/services/auth.service';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/student/projects', icon: Briefcase },
  { label: 'Applications', href: '/student/applications', icon: FileText },
  { label: 'Portfolio', href: '/student/portfolio', icon: FolderOpen },
  { label: 'Leaderboard', href: '/student/leaderboard', icon: Trophy },
  { label: 'Wallet', href: '/student/wallet', icon: Wallet },
  { label: 'Certificates', href: '/student/certificates', icon: Award },
  { label: 'Achievements', href: '/student/achievements', icon: Star },
  { label: 'Profile', href: '/student/profile', icon: UserIcon },
  { label: 'Settings', href: '/student/settings', icon: Settings },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user, studentProfile } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const navContent = (
    <div className="flex flex-col h-full py-4">
      {/* Brand */}
      <div className="px-4 mb-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple rounded-xl opacity-90" />
            <span className="relative text-white font-bold text-sm font-display">FP</span>
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="text-fp-white font-display font-bold text-base leading-tight">
                Future Pilot
              </span>
              <span className="text-fp-gray text-[9px] font-medium tracking-widest uppercase">
                Student Portal
              </span>
            </motion.div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-fp-gray hover:text-fp-white hover:bg-fp-surface/50 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-gradient-to-r from-fp-neon-blue/15 to-fp-neon-purple/15 text-fp-white border border-fp-neon-blue/30 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                  : 'text-fp-gray hover:text-fp-white hover:bg-fp-surface/40'
              )}
            >
              <Icon className={cn('w-5 h-5 shrink-0 transition-colors', isActive ? 'text-fp-neon-blue' : 'group-hover:text-fp-white')} />
              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-fp-neon-blue rounded-r-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* XP & User Widget */}
      {!collapsed && studentProfile && (
        <div className="px-4 py-3 mx-3 my-3 bg-fp-surface/30 border border-fp-border/30 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-fp-neon-cyan">{studentProfile.level || 'Explorer'}</span>
            <span className="text-fp-gray font-mono">{studentProfile.lifetimeXP || 0} XP</span>
          </div>
          <ProgressBar value={studentProfile.currentLevelXP || 150} max={2000} color="cyan" size="sm" />
        </div>
      )}

      {/* Profile & Logout */}
      <div className="px-3 pt-3 border-t border-fp-border/30">
        <div className={cn('flex items-center justify-between p-2 rounded-xl bg-fp-dark/60 border border-fp-border/20', collapsed && 'justify-center')}>
          <div className="flex items-center gap-2 overflow-hidden">
            <Avatar name={user?.displayName || 'User'} src={user?.photoURL} size="sm" />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-fp-white truncate">{user?.displayName || 'Student Pilot'}</span>
                <span className="text-[10px] text-fp-gray truncate">{user?.email}</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 text-fp-gray hover:text-fp-neon-pink hover:bg-fp-neon-pink/10 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block fixed top-0 left-0 bottom-0 z-30 bg-fp-dark/95 border-r border-fp-border/40 backdrop-blur-2xl transition-all duration-300',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-fp-black/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-fp-dark border-r border-fp-border/50 shadow-2xl"
            >
              {navContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
