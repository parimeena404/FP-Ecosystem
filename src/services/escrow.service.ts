/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Advanced Escrow Service & State Machine
   Full Escrow Lifecycle: created -> locked -> milestone_released -> completed / disputed / refunded
   ────────────────────────────────────────────────────────────── */

import { COLLECTIONS } from '@/lib/firebase/config';
import { getDocument, setDocument, updateDocument, createDocument, getDocuments } from '@/lib/firebase/firestore';

export type EscrowStatus =
  | 'created'
  | 'locked'
  | 'milestone_1_released'
  | 'milestone_2_released'
  | 'completed'
  | 'disputed'
  | 'refunded';

export interface EscrowContract {
  id?: string;
  projectId: string;
  companyId: string;
  studentId: string;
  totalRewardAmount: number;
  commissionFeeAmount: number; // 15% platform fee
  studentPayoutAmount: number; // 85% net payout
  status: EscrowStatus;
  disputeReason?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: number;
  updatedAt: number;
}

export async function createEscrowContract(data: {
  projectId: string;
  companyId: string;
  studentId: string;
  totalRewardAmount: number;
}): Promise<string> {
  const commissionFeeAmount = Math.round(data.totalRewardAmount * 0.15);
  const studentPayoutAmount = data.totalRewardAmount - commissionFeeAmount;

  const contract: Omit<EscrowContract, 'id'> = {
    projectId: data.projectId,
    companyId: data.companyId,
    studentId: data.studentId,
    totalRewardAmount: data.totalRewardAmount,
    commissionFeeAmount,
    studentPayoutAmount,
    status: 'created',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const ref = await createDocument(COLLECTIONS.TRANSACTIONS, contract as Record<string, unknown>);
  return ref.id;
}

export async function lockEscrowFunds(
  escrowId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string
): Promise<void> {
  return updateDocument(COLLECTIONS.TRANSACTIONS, escrowId, {
    status: 'locked',
    razorpayOrderId,
    razorpayPaymentId,
    updatedAt: Date.now(),
  });
}

export async function releaseMilestonePayout(
  escrowId: string,
  milestoneNumber: 1 | 2 | 3,
  payoutAmount: number
): Promise<void> {
  const contract = await getDocument<EscrowContract>(COLLECTIONS.TRANSACTIONS, escrowId);
  if (!contract) throw new Error('Escrow contract not found');

  const nextStatus: EscrowStatus =
    milestoneNumber === 1
      ? 'milestone_1_released'
      : milestoneNumber === 2
      ? 'milestone_2_released'
      : 'completed';

  return updateDocument(COLLECTIONS.TRANSACTIONS, escrowId, {
    status: nextStatus,
    updatedAt: Date.now(),
  });
}

export async function raiseEscrowDispute(escrowId: string, reason: string): Promise<void> {
  return updateDocument(COLLECTIONS.TRANSACTIONS, escrowId, {
    status: 'disputed',
    disputeReason: reason,
    updatedAt: Date.now(),
  });
}

export async function resolveEscrowDispute(
  escrowId: string,
  resolutionStatus: 'completed' | 'refunded'
): Promise<void> {
  return updateDocument(COLLECTIONS.TRANSACTIONS, escrowId, {
    status: resolutionStatus,
    updatedAt: Date.now(),
  });
}

export async function refundEscrowToCompany(escrowId: string): Promise<void> {
  return updateDocument(COLLECTIONS.TRANSACTIONS, escrowId, {
    status: 'refunded',
    updatedAt: Date.now(),
  });
}

export async function getEscrowByProject(projectId: string): Promise<EscrowContract | null> {
  const results = await getDocuments<EscrowContract>(COLLECTIONS.TRANSACTIONS, {
    filters: [{ field: 'projectId', operator: '==', value: projectId }],
  });
  return results.length > 0 ? results[0] : null;
}
