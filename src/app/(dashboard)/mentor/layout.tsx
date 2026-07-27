/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Route Protection Layout
   Enforces UserRole.MENTOR or ADMIN access
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserRole } from '@/types';

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.MENTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
