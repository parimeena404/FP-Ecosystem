/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — useFirestore Hook
   Generic Firestore document and collection hooks with
   real-time listeners and loading states
   ────────────────────────────────────────────────────────────── */
'use client';

import { useState, useEffect } from 'react';
import {
  getDocument,
  getDocuments,
  onDocumentChange,
  onCollectionChange,
  type QueryOptions,
} from '@/lib/firebase/firestore';

// ─── Single Document Hook ───────────────────────────────────

export function useDocument<T>(
  collectionName: string,
  docId: string | null | undefined,
  realtime: boolean = false
) {
  const [data, setData] = useState<(T & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!docId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (realtime) {
      const unsubscribe = onDocumentChange<T>(collectionName, docId, (doc) => {
        setData(doc);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      getDocument<T>(collectionName, docId)
        .then((doc) => {
          setData(doc);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [collectionName, docId, realtime]);

  return { data, loading, error };
}

// ─── Collection Hook ────────────────────────────────────────

export function useCollection<T>(
  collectionName: string,
  options?: QueryOptions,
  realtime: boolean = false
) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Serialize options for dependency tracking
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const parsedOptions = options;

    if (realtime) {
      const unsubscribe = onCollectionChange<T>(collectionName, parsedOptions, (docs) => {
        setData(docs);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      getDocuments<T>(collectionName, parsedOptions)
        .then((docs) => {
          setData(docs);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, optionsKey, realtime]);

  return { data, loading, error };
}
