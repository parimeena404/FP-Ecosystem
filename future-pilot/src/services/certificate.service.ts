/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Certificate Service
   Certificate generation and verification engine
   ────────────────────────────────────────────────────────────── */

import { COLLECTIONS } from '@/lib/firebase/config';
import { createDocument, getDocuments, getDocument } from '@/lib/firebase/firestore';
import type { Certificate } from '@/types';

export async function issueCertificate(data: {
  studentId: string;
  projectId: string;
  title: string;
  description: string;
  issuedBy: string;
}): Promise<string> {
  const code = `FP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const cert: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'> = {
    studentId: data.studentId,
    projectId: data.projectId,
    title: data.title,
    description: data.description,
    issuedBy: data.issuedBy,
    verificationCode: code,
    certificateURL: `/certificates/${code}`,
    issuedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  };

  const ref = await createDocument(COLLECTIONS.CERTIFICATES, cert);
  return ref.id;
}

export async function verifyCertificate(code: string): Promise<(Certificate & { id: string }) | null> {
  const certs = await getDocuments<Certificate>(COLLECTIONS.CERTIFICATES, {
    filters: [{ field: 'verificationCode', operator: '==', value: code }],
    limitCount: 1,
  });
  return certs[0] || null;
}
