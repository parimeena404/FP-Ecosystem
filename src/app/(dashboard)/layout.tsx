/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Dashboard Shell Layout
   Wraps protected dashboard routes with AuthGuard
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UserRole } from '@/types';

export default function DashboardRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard
      allowedRoles={[
        UserRole.STUDENT,
        UserRole.COLLEGE,
        UserRole.COMPANY,
        UserRole.MENTOR,
        UserRole.ADMIN,
        UserRole.SUPER_ADMIN,
      ]}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
