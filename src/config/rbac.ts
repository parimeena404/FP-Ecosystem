/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — RBAC Configuration
   Role-Based Access Control permissions matrix
   ────────────────────────────────────────────────────────────── */

import { UserRole } from '@/types';

export type Permission =
  | 'platform:configure'
  | 'admins:manage'
  | 'students:read'
  | 'students:write'
  | 'students:delete'
  | 'projects:read'
  | 'projects:create'
  | 'projects:edit'
  | 'projects:delete'
  | 'projects:assign'
  | 'applications:read'
  | 'applications:review'
  | 'applications:apply'
  | 'milestones:read'
  | 'milestones:approve'
  | 'wallets:read'
  | 'wallets:manage'
  | 'wallets:withdraw'
  | 'payments:approve'
  | 'analytics:read'
  | 'analytics:global'
  | 'colleges:manage'
  | 'companies:manage'
  | 'mentors:manage'
  | 'certificates:generate'
  | 'audit:read'
  | 'notifications:send'
  | 'settings:platform'
  | 'settings:own';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    'platform:configure',
    'admins:manage',
    'students:read',
    'students:write',
    'students:delete',
    'projects:read',
    'projects:create',
    'projects:edit',
    'projects:delete',
    'projects:assign',
    'applications:read',
    'applications:review',
    'milestones:read',
    'milestones:approve',
    'wallets:read',
    'wallets:manage',
    'payments:approve',
    'analytics:read',
    'analytics:global',
    'colleges:manage',
    'companies:manage',
    'mentors:manage',
    'certificates:generate',
    'audit:read',
    'notifications:send',
    'settings:platform',
    'settings:own',
  ],

  [UserRole.ADMIN]: [
    'students:read',
    'students:write',
    'projects:read',
    'projects:create',
    'projects:edit',
    'projects:assign',
    'applications:read',
    'applications:review',
    'milestones:read',
    'milestones:approve',
    'wallets:read',
    'wallets:manage',
    'payments:approve',
    'analytics:read',
    'colleges:manage',
    'companies:manage',
    'mentors:manage',
    'certificates:generate',
    'audit:read',
    'notifications:send',
    'settings:own',
  ],

  [UserRole.COMPANY]: [
    'projects:read',
    'projects:create',
    'projects:edit',
    'applications:read',
    'students:read',
    'milestones:read',
    'wallets:read',
    'analytics:read',
    'settings:own',
  ],

  [UserRole.COLLEGE]: [
    'students:read',
    'projects:read',
    'applications:read',
    'analytics:read',
    'settings:own',
  ],

  [UserRole.MENTOR]: [
    'projects:read',
    'students:read',
    'applications:read',
    'milestones:read',
    'milestones:approve',
    'analytics:read',
    'settings:own',
  ],

  [UserRole.STUDENT]: [
    'projects:read',
    'applications:apply',
    'milestones:read',
    'wallets:read',
    'wallets:withdraw',
    'analytics:read',
    'settings:own',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: '/superadmin/dashboard',
  [UserRole.ADMIN]: '/admin/dashboard',
  [UserRole.COMPANY]: '/company/dashboard',
  [UserRole.COLLEGE]: '/college/dashboard',
  [UserRole.MENTOR]: '/mentor/dashboard',
  [UserRole.STUDENT]: '/student/dashboard',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Administrator',
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.COMPANY]: 'Company',
  [UserRole.COLLEGE]: 'College',
  [UserRole.MENTOR]: 'Mentor',
  [UserRole.STUDENT]: 'Student',
};
