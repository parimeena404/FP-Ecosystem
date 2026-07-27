/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Firestore Helpers
   Typed CRUD wrappers around Firestore SDK
   ────────────────────────────────────────────────────────────── */

import {
  doc,
  getDoc as fbGetDoc,
  getDocs as fbGetDocs,
  setDoc,
  updateDoc as fbUpdateDoc,
  deleteDoc as fbDeleteDoc,
  addDoc as fbAddDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
  type DocumentReference,
  type Unsubscribe,
  type WhereFilterOp,
  type OrderByDirection,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { getFirebaseDB } from './config';

// ─── Types ──────────────────────────────────────────────────

export interface QueryFilter {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}

export interface QueryOptions {
  filters?: QueryFilter[];
  orderByField?: string;
  orderDirection?: OrderByDirection;
  limitCount?: number;
  startAfterDoc?: DocumentSnapshot;
}

// ─── Single Document ────────────────────────────────────────

export async function getDocument<T>(
  collectionName: string,
  docId: string
): Promise<(T & { id: string }) | null> {
  const docRef = doc(getFirebaseDB(), collectionName, docId);
  const docSnap = await fbGetDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
}

export async function setDocument<T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: T,
  merge: boolean = false
): Promise<void> {
  const docRef = doc(getFirebaseDB(), collectionName, docId);
  return setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge });
}

export async function createDocument<T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<DocumentReference> {
  const colRef = collection(getFirebaseDB(), collectionName);
  return fbAddDoc(colRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: Record<string, unknown>
): Promise<void> {
  const docRef = doc(getFirebaseDB(), collectionName, docId);
  return fbUpdateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const docRef = doc(getFirebaseDB(), collectionName, docId);
  return fbDeleteDoc(docRef);
}

// ─── Collections Query ──────────────────────────────────────

export async function getDocuments<T>(
  collectionName: string,
  options?: QueryOptions
): Promise<(T & { id: string })[]> {
  const constraints = buildConstraints(options);
  const q = query(collection(getFirebaseDB(), collectionName), ...constraints);
  const snapshot = await fbGetDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T & { id: string });
}

// ─── Real-time Listeners ────────────────────────────────────

export function onDocumentChange<T>(
  collectionName: string,
  docId: string,
  callback: (data: (T & { id: string }) | null) => void
): Unsubscribe {
  const docRef = doc(getFirebaseDB(), collectionName, docId);
  return onSnapshot(docRef, (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }
    callback({ id: snap.id, ...snap.data() } as T & { id: string });
  });
}

export function onCollectionChange<T>(
  collectionName: string,
  options: QueryOptions | undefined,
  callback: (data: (T & { id: string })[]) => void
): Unsubscribe {
  const constraints = buildConstraints(options);
  const q = query(collection(getFirebaseDB(), collectionName), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T & { id: string });
    callback(docs);
  });
}

// ─── Helpers ────────────────────────────────────────────────

function buildConstraints(options?: QueryOptions): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];
  if (!options) return constraints;

  if (options.filters) {
    for (const filter of options.filters) {
      constraints.push(where(filter.field, filter.operator, filter.value));
    }
  }
  if (options.orderByField) {
    constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
  }
  if (options.limitCount) {
    constraints.push(limit(options.limitCount));
  }
  if (options.startAfterDoc) {
    constraints.push(startAfter(options.startAfterDoc));
  }

  return constraints;
}
