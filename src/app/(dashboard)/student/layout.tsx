/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Route Protection Layout
   Enforces UserRole.STUDENT or ADMIN access
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import { UserRole } from '@/types';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      {children}
    </AuthGuard>
  );
}
