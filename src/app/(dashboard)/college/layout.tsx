/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Route Protection Layout
   Enforces UserRole.COLLEGE or ADMIN access
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserRole } from '@/types';

export default function CollegeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.COLLEGE, UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
