/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Admin Route Protection Layout
   Enforces UserRole.ADMIN or SUPER_ADMIN access
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import { UserRole } from '@/types';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      {children}
    </AuthGuard>
  );
}
