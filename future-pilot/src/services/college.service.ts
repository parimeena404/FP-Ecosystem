/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — College Service
   College partner directory and student roster tracking
   ────────────────────────────────────────────────────────────── */

import { COLLECTIONS } from '@/lib/firebase/config';
import { getDocuments, getDocument, updateDocument } from '@/lib/firebase/firestore';
import type { CollegeProfile } from '@/types';

export async function getColleges(): Promise<(CollegeProfile & { id: string })[]> {
  return getDocuments<CollegeProfile>(COLLECTIONS.COLLEGES);
}

export async function getCollegeById(id: string): Promise<(CollegeProfile & { id: string }) | null> {
  return getDocument<CollegeProfile>(COLLECTIONS.COLLEGES, id);
}

export async function updateCollegeVerification(
  collegeId: string,
  status: 'verified' | 'pending' | 'rejected'
): Promise<void> {
  return updateDocument(COLLECTIONS.COLLEGES, collegeId, { verificationStatus: status });
}
