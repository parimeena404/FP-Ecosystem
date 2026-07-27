/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Auth Provider
   React Context providing Firebase Auth state + user profile
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { User, StudentProfile } from '@/types';
import { UserRole } from '@/types';
import { onAuthChange } from '@/lib/firebase/auth';
import { getUserProfile } from '@/services/auth.service';
import { getStudentProfile } from '@/services/student.service';

// ─── Context Type ───────────────────────────────────────────

export interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  studentProfile: StudentProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  studentProfile: null,
  loading: true,
  isAuthenticated: false,
  role: null,
  refreshUser: async () => {},
});

// ─── Provider ───────────────────────────────────────────────

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = useCallback(async (fbUser: FirebaseUser | null) => {
    if (!fbUser) {
      setUser(null);
      setStudentProfile(null);
      setLoading(false);
      return;
    }

    try {
      const userDoc = await getUserProfile(fbUser.uid);
      setUser(userDoc);

      // Load student profile if user is a student
      if (userDoc?.role === UserRole.STUDENT) {
        const profile = await getStudentProfile(fbUser.uid);
        setStudentProfile(profile);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUser(null);
      setStudentProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

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
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
