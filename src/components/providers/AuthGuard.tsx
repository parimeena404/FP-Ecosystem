/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Auth Guard
   Client-side route protection with role checking
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { ROLE_DASHBOARD_ROUTES } from '@/config/rbac';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallbackPath?: string;
}

export default function AuthGuard({
  children,
  allowedRoles,
  fallbackPath = '/login',
}: AuthGuardProps) {
  const { user, loading, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      window.location.href = `${fallbackPath}?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
      // Redirect to user's own dashboard
      window.location.href = ROLE_DASHBOARD_ROUTES[role] || '/';
    }
  }, [loading, isAuthenticated, role, allowedRoles, fallbackPath]);

  if (loading) {
    return <AuthLoadingSkeleton />;
  }

  if (!isAuthenticated) {
    return <AuthLoadingSkeleton />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <AuthLoadingSkeleton />;
  }

  return <>{children}</>;
}

// ─── Loading Skeleton ───────────────────────────────────────

function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-fp-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple rounded-2xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-2xl font-display">FP</span>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-br from-fp-neon-blue/20 to-fp-neon-purple/20 rounded-2xl blur-xl animate-pulse" />
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-fp-surface rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple rounded-full animate-loading-bar" />
        </div>

        <p className="text-fp-gray text-sm font-medium">Loading your dashboard...</p>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 80%; }
          100% { width: 100%; transform: translateX(0); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
