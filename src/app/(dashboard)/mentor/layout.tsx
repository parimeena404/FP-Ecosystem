/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Route Protection Layout
   Enforces UserRole.MENTOR or ADMIN access
   ────────────────────────────────────────────────────────────── */

import AuthGuard from '@/components/providers/AuthGuard';
import { UserRole } from '@/types';

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={[UserRole.MENTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      {children}
    </AuthGuard>
  );
}
