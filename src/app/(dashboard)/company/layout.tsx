/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Route Protection Layout
   Enforces UserRole.COMPANY or ADMIN access
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import { UserRole } from '@/types';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.COMPANY, UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      {children}
    </AuthGuard>
  );
}
