/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Service
   Student profile CRUD, leaderboard, and stats
   ────────────────────────────────────────────────────────────── */

import type { StudentProfile, LeaderboardEntry, Badge, Certificate } from '@/types';
import { StudentLevel } from '@/types';
import { COLLECTIONS } from '@/lib/firebase/config';
import {
  getDocument,
  setDocument,
  getDocuments,
  updateDocument,
  onDocumentChange,
  onCollectionChange,
  type QueryOptions,
} from '@/lib/firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';

// ─── Profile CRUD ───────────────────────────────────────────

export async function createStudentProfile(
  userId: string,
  data: Partial<StudentProfile>
): Promise<void> {
  const defaultProfile: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'> = {
    userId,
    collegeId: '',
    branch: '',
    department: '',
    semester: 1,
    year: 1,
    enrollmentNumber: '',
    skills: [],
    bio: '',
    lifetimeXP: 0,
    currentLevelXP: 0,
    level: StudentLevel.EXPLORER,
    globalRank: 0,
    collegeRank: 0,
    branchRank: 0,
    trustScore: 100,
    performanceScore: 0,
    completionRate: 0,
    verificationStatus: 'unverified' as StudentProfile['verificationStatus'],
    resumeURL: null,
    portfolioURL: null,
    githubURL: null,
    linkedinURL: null,
    websiteURL: null,
    projectsCompleted: 0,
    totalEarnings: 0,
    badgeCount: 0,
    certificateCount: 0,
    isAvailable: true,
    weeklyHoursAvailable: 20,
    ...data,
  };

  await setDocument(COLLECTIONS.STUDENTS, userId, defaultProfile);
}

export async function getStudentProfile(
  userId: string
): Promise<(StudentProfile & { id: string }) | null> {
  return getDocument<StudentProfile>(COLLECTIONS.STUDENTS, userId);
}

export async function updateStudentProfile(
  userId: string,
  data: Partial<StudentProfile>
): Promise<void> {
  return updateDocument(COLLECTIONS.STUDENTS, userId, data as Record<string, unknown>);
}

// ─── Real-time Profile ──────────────────────────────────────

export function onStudentProfileChange(
  userId: string,
  callback: (profile: (StudentProfile & { id: string }) | null) => void
): Unsubscribe {
  return onDocumentChange<StudentProfile>(COLLECTIONS.STUDENTS, userId, callback);
}

// ─── Leaderboard ────────────────────────────────────────────

export async function getLeaderboard(
  scope: 'global' | 'college' | 'branch' = 'global',
  scopeId?: string,
  limitCount: number = 50
): Promise<LeaderboardEntry[]> {
  const options: QueryOptions = {
    orderByField: 'lifetimeXP',
    orderDirection: 'desc',
    limitCount,
  };

  if (scope === 'college' && scopeId) {
    options.filters = [{ field: 'collegeId', operator: '==', value: scopeId }];
  } else if (scope === 'branch' && scopeId) {
    options.filters = [{ field: 'branch', operator: '==', value: scopeId }];
  }

  const students = await getDocuments<StudentProfile>(COLLECTIONS.STUDENTS, options);

  return students.map((student, index) => ({
    studentId: student.id,
    displayName: '', // Will be enriched with user data
    photoURL: null,
    collegeName: '',
    branch: student.branch,
    lifetimeXP: student.lifetimeXP,
    level: student.level,
    rank: index + 1,
    projectsCompleted: student.projectsCompleted,
    badgeCount: student.badgeCount,
  }));
}

// ─── Badges ─────────────────────────────────────────────────

export async function getStudentBadges(studentId: string): Promise<(Badge & { id: string })[]> {
  return getDocuments<Badge>(COLLECTIONS.BADGES, {
    filters: [{ field: 'studentId', operator: '==', value: studentId }],
    orderByField: 'earnedAt',
    orderDirection: 'desc',
  });
}

export function onStudentBadgesChange(
  studentId: string,
  callback: (badges: (Badge & { id: string })[]) => void
): Unsubscribe {
  return onCollectionChange<Badge>(
    COLLECTIONS.BADGES,
    {
      filters: [{ field: 'studentId', operator: '==', value: studentId }],
      orderByField: 'earnedAt',
      orderDirection: 'desc',
    },
    callback
  );
}

// ─── Certificates ───────────────────────────────────────────

export async function getStudentCertificates(
  studentId: string
): Promise<(Certificate & { id: string })[]> {
  return getDocuments<Certificate>(COLLECTIONS.CERTIFICATES, {
    filters: [{ field: 'studentId', operator: '==', value: studentId }],
    orderByField: 'issuedAt',
    orderDirection: 'desc',
  });
}

// ─── Stats ──────────────────────────────────────────────────

export async function getStudentStats(userId: string) {
  const profile = await getStudentProfile(userId);
  if (!profile) return null;

  return {
    lifetimeXP: profile.lifetimeXP,
    level: profile.level,
    projectsCompleted: profile.projectsCompleted,
    totalEarnings: profile.totalEarnings,
    badgeCount: profile.badgeCount,
    certificateCount: profile.certificateCount,
    globalRank: profile.globalRank,
    collegeRank: profile.collegeRank,
    trustScore: profile.trustScore,
    performanceScore: profile.performanceScore,
    completionRate: profile.completionRate,
  };
}

// ─── Availability ───────────────────────────────────────────

export async function updateAvailability(
  userId: string,
  isAvailable: boolean,
  weeklyHours?: number
): Promise<void> {
  const data: Record<string, unknown> = { isAvailable };
  if (weeklyHours !== undefined) data.weeklyHoursAvailable = weeklyHours;
  return updateDocument(COLLECTIONS.STUDENTS, userId, data);
}
