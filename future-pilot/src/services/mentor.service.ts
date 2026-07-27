/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Mentor Service
   Mentor profile directory and project assignments
   ────────────────────────────────────────────────────────────── */

import { COLLECTIONS } from '@/lib/firebase/config';
import { getDocuments, getDocument, updateDocument } from '@/lib/firebase/firestore';
import type { MentorProfile } from '@/types';

export async function getMentors(): Promise<(MentorProfile & { id: string })[]> {
  return getDocuments<MentorProfile>(COLLECTIONS.MENTORS);
}

export async function getMentorById(id: string): Promise<(MentorProfile & { id: string }) | null> {
  return getDocument<MentorProfile>(COLLECTIONS.MENTORS, id);
}

export async function assignMentorToProject(mentorId: string, projectId: string): Promise<void> {
  return updateDocument(COLLECTIONS.PROJECTS, projectId, { mentorId });
}
