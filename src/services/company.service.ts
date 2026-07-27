/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Company Service
   Company directory, KYC status management & verification
   ────────────────────────────────────────────────────────────── */

import { COLLECTIONS } from '@/lib/firebase/config';
import { getDocuments, getDocument, updateDocument, setDocument } from '@/lib/firebase/firestore';
import type { CompanyProfile, KYCStatus } from '@/types';

export async function getCompanies(kycFilter?: KYCStatus): Promise<(CompanyProfile & { id: string })[]> {
  const options = kycFilter
    ? { filters: [{ field: 'kycStatus', operator: '==' as const, value: kycFilter }] }
    : undefined;
  return getDocuments<CompanyProfile>(COLLECTIONS.COMPANIES, options);
}

export async function getCompanyById(id: string): Promise<(CompanyProfile & { id: string }) | null> {
  return getDocument<CompanyProfile>(COLLECTIONS.COMPANIES, id);
}

export async function updateKYCStatus(companyId: string, status: KYCStatus): Promise<void> {
  return updateDocument(COLLECTIONS.COMPANIES, companyId, { kycStatus: status });
}
