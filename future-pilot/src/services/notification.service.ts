/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Notification Service
   Notification CRUD with real-time listener support
   ────────────────────────────────────────────────────────────── */

import type { Notification } from '@/types';
import { COLLECTIONS } from '@/lib/firebase/config';
import {
  getDocuments,
  updateDocument,
  onCollectionChange,
  type QueryFilter,
} from '@/lib/firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';

// ─── Fetch ──────────────────────────────────────────────────

export async function getNotifications(
  userId: string,
  limitCount: number = 50
): Promise<(Notification & { id: string })[]> {
  return getDocuments<Notification>(COLLECTIONS.NOTIFICATIONS, {
    filters: [{ field: 'userId', operator: '==', value: userId }],
    orderByField: 'createdAt',
    orderDirection: 'desc',
    limitCount,
  });
}

export async function getUnreadNotifications(
  userId: string
): Promise<(Notification & { id: string })[]> {
  return getDocuments<Notification>(COLLECTIONS.NOTIFICATIONS, {
    filters: [
      { field: 'userId', operator: '==', value: userId },
      { field: 'read', operator: '==', value: false },
    ],
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });
}

export async function getUnreadCount(userId: string): Promise<number> {
  const unread = await getUnreadNotifications(userId);
  return unread.length;
}

// ─── Mark as Read ───────────────────────────────────────────

export async function markAsRead(notificationId: string): Promise<void> {
  return updateDocument(COLLECTIONS.NOTIFICATIONS, notificationId, { read: true });
}

export async function markAllAsRead(userId: string): Promise<void> {
  const unread = await getUnreadNotifications(userId);
  const promises = unread.map((notif) =>
    updateDocument(COLLECTIONS.NOTIFICATIONS, notif.id, { read: true })
  );
  await Promise.all(promises);
}

// ─── Real-time Listener ────────────────────────────────────

export function onNotificationsChange(
  userId: string,
  callback: (notifications: (Notification & { id: string })[]) => void
): Unsubscribe {
  return onCollectionChange<Notification>(
    COLLECTIONS.NOTIFICATIONS,
    {
      filters: [{ field: 'userId', operator: '==', value: userId }] as QueryFilter[],
      orderByField: 'createdAt',
      orderDirection: 'desc',
      limitCount: 50,
    },
    callback
  );
}

// ─── Notification Icons ─────────────────────────────────────

export const NOTIFICATION_ICONS: Record<string, string> = {
  application_update: '📋',
  project_update: '💼',
  payment_update: '💰',
  milestone_approval: '✅',
  interview_schedule: '📅',
  announcement: '📢',
  badge_earned: '🏅',
  level_up: '⬆️',
  system: '🔔',
};
