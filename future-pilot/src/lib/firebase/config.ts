/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Firebase Configuration
   Initialize Firebase Auth, Firestore, and Cloud Storage
   ────────────────────────────────────────────────────────────── */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Singleton pattern — prevent multiple initializations
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDB(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

// ─── Collection References ──────────────────────────────────

export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  COMPANIES: 'companies',
  COLLEGES: 'colleges',
  MENTORS: 'mentors',
  PROJECTS: 'projects',
  APPLICATIONS: 'applications',
  MILESTONES: 'milestones',
  WALLETS: 'wallets',
  TRANSACTIONS: 'transactions',
  ESCROWS: 'escrows',
  INVOICES: 'invoices',
  BADGES: 'badges',
  CERTIFICATES: 'certificates',
  NOTIFICATIONS: 'notifications',
  MEETINGS: 'meetings',
  AUDIT_LOGS: 'audit_logs',
  SETTINGS: 'settings',
  SKILLS: 'skills',
  DEPARTMENTS: 'departments',
  DOCUMENTS: 'documents',
  REPORTS: 'reports',
  ANALYTICS: 'analytics',
} as const;
