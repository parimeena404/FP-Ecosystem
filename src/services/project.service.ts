/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Project Service
   Project browsing, applications, and milestones (student view)
   ────────────────────────────────────────────────────────────── */

import type { Project, Application, Milestone } from '@/types';
import { COLLECTIONS } from '@/lib/firebase/config';
import {
  getDocument,
  getDocuments,
  createDocument,
  updateDocument,
  onCollectionChange,
  type QueryOptions,
  type QueryFilter,
} from '@/lib/firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';

// ─── Project Browsing ───────────────────────────────────────

export interface ProjectFilters {
  category?: string;
  difficulty?: string;
  skills?: string[];
  minReward?: number;
  maxReward?: number;
  isRemote?: boolean;
  status?: string;
  searchQuery?: string;
}

export async function getProjects(
  filters?: ProjectFilters,
  limitCount: number = 20
): Promise<(Project & { id: string })[]> {
  const queryFilters: QueryFilter[] = [
    { field: 'status', operator: '==', value: 'published' },
  ];

  if (filters?.category) {
    queryFilters.push({ field: 'category', operator: '==', value: filters.category });
  }
  if (filters?.difficulty) {
    queryFilters.push({ field: 'difficulty', operator: '==', value: filters.difficulty });
  }
  if (filters?.isRemote !== undefined) {
    queryFilters.push({ field: 'isRemote', operator: '==', value: filters.isRemote });
  }
  if (filters?.status) {
    queryFilters[0] = { field: 'status', operator: '==', value: filters.status };
  }

  const options: QueryOptions = {
    filters: queryFilters,
    orderByField: 'createdAt',
    orderDirection: 'desc',
    limitCount,
  };

  return getDocuments<Project>(COLLECTIONS.PROJECTS, options);
}

export async function getProjectById(
  projectId: string
): Promise<(Project & { id: string }) | null> {
  return getDocument<Project>(COLLECTIONS.PROJECTS, projectId);
}

export async function getFeaturedProjects(
  limitCount: number = 6
): Promise<(Project & { id: string })[]> {
  return getDocuments<Project>(COLLECTIONS.PROJECTS, {
    filters: [
      { field: 'status', operator: '==', value: 'published' },
      { field: 'isFeatured', operator: '==', value: true },
    ],
    orderByField: 'createdAt',
    orderDirection: 'desc',
    limitCount,
  });
}

// ─── Applications ───────────────────────────────────────────

export async function applyToProject(
  projectId: string,
  studentId: string,
  data: {
    resumeURL: string;
    portfolioURL?: string;
    coverLetter: string;
  }
): Promise<string> {
  const application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'> = {
    projectId,
    studentId,
    status: 'applied' as Application['status'],
    screeningStage: 'submitted',
    resumeURL: data.resumeURL,
    portfolioURL: data.portfolioURL || null,
    coverLetter: data.coverLetter,
    aiScore: null,
    manualScore: null,
    interviewScore: null,
    interviewDate: null,
    interviewNotes: null,
    reviewedBy: null,
    rejectionReason: null,
  };

  const docRef = await createDocument(COLLECTIONS.APPLICATIONS, application);
  return docRef.id;
}

export async function getApplicationsByStudent(
  studentId: string,
  status?: string
): Promise<(Application & { id: string })[]> {
  const filters: QueryFilter[] = [
    { field: 'studentId', operator: '==', value: studentId },
  ];

  if (status) {
    filters.push({ field: 'status', operator: '==', value: status });
  }

  return getDocuments<Application>(COLLECTIONS.APPLICATIONS, {
    filters,
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });
}

export async function getApplicationByProjectAndStudent(
  projectId: string,
  studentId: string
): Promise<(Application & { id: string }) | null> {
  const results = await getDocuments<Application>(COLLECTIONS.APPLICATIONS, {
    filters: [
      { field: 'projectId', operator: '==', value: projectId },
      { field: 'studentId', operator: '==', value: studentId },
    ],
    limitCount: 1,
  });
  return results[0] || null;
}

export async function withdrawApplication(applicationId: string): Promise<void> {
  return updateDocument(COLLECTIONS.APPLICATIONS, applicationId, {
    status: 'withdrawn',
  });
}

export function onApplicationsChange(
  studentId: string,
  callback: (apps: (Application & { id: string })[]) => void
): Unsubscribe {
  return onCollectionChange<Application>(
    COLLECTIONS.APPLICATIONS,
    {
      filters: [{ field: 'studentId', operator: '==', value: studentId }],
      orderByField: 'createdAt',
      orderDirection: 'desc',
    },
    callback
  );
}

// ─── Milestones ─────────────────────────────────────────────

export async function getProjectMilestones(
  projectId: string
): Promise<(Milestone & { id: string })[]> {
  return getDocuments<Milestone>(COLLECTIONS.MILESTONES, {
    filters: [{ field: 'projectId', operator: '==', value: projectId }],
    orderByField: 'orderIndex',
    orderDirection: 'asc',
  });
}

// ─── Categories ─────────────────────────────────────────────

export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile App',
  'AI/ML',
  'Data Science',
  'IoT',
  'Electronics',
  'Mechanical Design',
  'Civil Engineering',
  'UI/UX Design',
  'Content Writing',
  'Marketing',
  'Research',
  'Other',
] as const;
