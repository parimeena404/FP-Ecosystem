/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Auth Provider
   React Context providing Auth state + user profile + Demo Mode
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { User, StudentProfile } from '@/types';
import { UserRole, StudentLevel, VerificationStatus } from '@/types';
import { onAuthChange } from '@/lib/firebase/auth';
import { getUserProfile } from '@/services/auth.service';
import { getStudentProfile } from '@/services/student.service';

export interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  studentProfile: StudentProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  setDemoRole: (role: UserRole) => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  studentProfile: null,
  loading: true,
  isAuthenticated: false,
  role: null,
  setDemoRole: () => {},
  refreshUser: async () => {},
});

const DEMO_USERS: Record<string, User> = {
  [UserRole.STUDENT]: {
    id: 'demo-student-1',
    uid: 'demo-student-1',
    email: 'aarav.sharma@ietdavv.ac.in',
    displayName: 'Aarav Sharma',
    photoURL: null,
    role: UserRole.STUDENT,
    tenantId: UserRole.STUDENT,
    status: 'active',
    emailVerified: true,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  },
  [UserRole.COMPANY]: {
    id: 'demo-company-1',
    uid: 'demo-company-1',
    email: 'contact@aerotechrobotics.com',
    displayName: 'AeroTech Robotics Solutions',
    photoURL: null,
    role: UserRole.COMPANY,
    tenantId: UserRole.COMPANY,
    status: 'active',
    emailVerified: true,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  },
  [UserRole.COLLEGE]: {
    id: 'demo-college-1',
    uid: 'demo-college-1',
    email: 'placements@ietdavv.edu.in',
    displayName: 'IET DAVV University',
    photoURL: null,
    role: UserRole.COLLEGE,
    tenantId: UserRole.COLLEGE,
    status: 'active',
    emailVerified: true,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  },
  [UserRole.MENTOR]: {
    id: 'demo-mentor-1',
    uid: 'demo-mentor-1',
    email: 'dr.vikram@futurepilot.in',
    displayName: 'Dr. Vikram Seth',
    photoURL: null,
    role: UserRole.MENTOR,
    tenantId: UserRole.MENTOR,
    status: 'active',
    emailVerified: true,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  },
  [UserRole.ADMIN]: {
    id: 'demo-admin-1',
    uid: 'demo-admin-1',
    email: 'admin@futurepilot.in',
    displayName: 'Future Pilot Admin',
    photoURL: null,
    role: UserRole.ADMIN,
    tenantId: UserRole.ADMIN,
    status: 'active',
    emailVerified: true,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  },
  [UserRole.SUPER_ADMIN]: {
    id: 'demo-superadmin-1',
    uid: 'demo-superadmin-1',
    email: 'superadmin@futurepilot.in',
    displayName: 'Super Administrator',
    photoURL: null,
    role: UserRole.SUPER_ADMIN,
    tenantId: UserRole.SUPER_ADMIN,
    status: 'active',
    emailVerified: true,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  },
};

const DEMO_STUDENT_PROFILE: StudentProfile = {
  id: 'demo-student-1',
  userId: 'demo-student-1',
  collegeId: 'iet-davv',
  branch: 'Computer Science',
  department: 'Computer Science & Engineering',
  semester: 7,
  year: 4,
  enrollmentNumber: 'DE21CS001',
  skills: ['TypeScript', 'React', 'Next.js', 'Python', 'TailwindCSS'],
  bio: 'Full-stack & AI Developer passionate about autonomous systems and web performance.',

  lifetimeXP: 3850,
  currentLevelXP: 1850,
  level: StudentLevel.BUILDER,
  globalRank: 14,
  collegeRank: 2,
  branchRank: 1,

  trustScore: 98,
  performanceScore: 95,
  completionRate: 100,

  verificationStatus: VerificationStatus.VERIFIED,

  resumeURL: '/resume-sample.pdf',
  portfolioURL: 'https://aarav-portfolio.demo',

  githubURL: 'https://github.com/demo-student',
  linkedinURL: 'https://linkedin.com/in/demo-student',
  websiteURL: 'https://aarav.demo',

  projectsCompleted: 5,
  totalEarnings: 48500,
  badgeCount: 8,
  certificateCount: 4,

  isAvailable: true,
  weeklyHoursAvailable: 20,

  createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getSavedDemoRole = (): UserRole | null => {
    if (typeof window === 'undefined') return null;
    const role = localStorage.getItem('fp_demo_role');
    return role ? (role as UserRole) : null;
  };

  const applyDemoUser = useCallback((targetRole: UserRole) => {
    const demoUser = DEMO_USERS[targetRole] || DEMO_USERS[UserRole.STUDENT];
    setUser(demoUser);
    if (targetRole === UserRole.STUDENT) {
      setStudentProfile(DEMO_STUDENT_PROFILE);
    } else {
      setStudentProfile(null);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('fp_demo_role', targetRole);
    }
  }, []);

  const setDemoRole = useCallback((role: UserRole) => {
    applyDemoUser(role);
  }, [applyDemoUser]);

  const loadUserData = useCallback(async (fbUser: FirebaseUser | null) => {
    if (!fbUser) {
      const savedRole = getSavedDemoRole();
      if (savedRole) {
        applyDemoUser(savedRole);
      } else {
        // Fallback default demo user (Student)
        applyDemoUser(UserRole.STUDENT);
      }
      setLoading(false);
      return;
    }

    try {
      const userDoc = await getUserProfile(fbUser.uid);
      if (userDoc) {
        setUser(userDoc);
        if (userDoc.role === UserRole.STUDENT) {
          const profile = await getStudentProfile(fbUser.uid);
          setStudentProfile(profile || DEMO_STUDENT_PROFILE);
        } else {
          setStudentProfile(null);
        }
      } else {
        const savedRole = getSavedDemoRole() || UserRole.STUDENT;
        applyDemoUser(savedRole);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      const savedRole = getSavedDemoRole() || UserRole.STUDENT;
      applyDemoUser(savedRole);
    } finally {
      setLoading(false);
    }
  }, [applyDemoUser]);

  const refreshUser = useCallback(async () => {
    if (firebaseUser) {
      setLoading(true);
      await loadUserData(firebaseUser);
    }
  }, [firebaseUser, loadUserData]);

  useEffect(() => {
    const unsubscribe = onAuthChange((fbUser) => {
      setFirebaseUser(fbUser);
      loadUserData(fbUser);
    });

    return () => unsubscribe();
  }, [loadUserData]);

  const value: AuthContextType = {
    firebaseUser,
    user,
    studentProfile,
    loading,
    isAuthenticated: !!user,
    role: user?.role || null,
    setDemoRole,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
