/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Firebase Auth Helpers
   Typed wrappers around Firebase Authentication SDK
   ────────────────────────────────────────────────────────────── */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword as fbUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  type User as FirebaseUser,
  type Unsubscribe,
} from 'firebase/auth';
import { getFirebaseAuth } from './config';

// ─── Auth State ─────────────────────────────────────────────

export function onAuthChange(callback: (user: FirebaseUser | null) => void): Unsubscribe {
  const authInstance = getFirebaseAuth();
  if (!authInstance) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(authInstance, callback);
}

export function getCurrentUser(): FirebaseUser | null {
  const authInstance = getFirebaseAuth();
  if (!authInstance) return null;
  return authInstance.currentUser;
}

export async function getIdToken(): Promise<string | null> {
  const user = getCurrentUser();
  if (!user) return null;
  return user.getIdToken();
}

export async function getIdTokenResult() {
  const user = getCurrentUser();
  if (!user) return null;
  return user.getIdTokenResult();
}

// ─── Email/Password Auth ────────────────────────────────────

export async function createAccount(email: string, password: string) {
  const authInstance = getFirebaseAuth();
  if (!authInstance) throw new Error('Firebase Auth is not configured');
  return createUserWithEmailAndPassword(authInstance, email, password);
}

export async function signInWithEmail(email: string, password: string) {
  const authInstance = getFirebaseAuth();
  if (!authInstance) throw new Error('Firebase Auth is not configured');
  return signInWithEmailAndPassword(authInstance, email, password);
}

export async function signOutUser() {
  const authInstance = getFirebaseAuth();
  if (!authInstance) return;
  return signOut(authInstance);
}

export async function resetPassword(email: string) {
  const authInstance = getFirebaseAuth();
  if (!authInstance) throw new Error('Firebase Auth is not configured');
  return sendPasswordResetEmail(authInstance, email);
}

// ─── Profile Update ─────────────────────────────────────────

export async function updateUserProfile(data: { displayName?: string; photoURL?: string }) {
  const user = getCurrentUser();
  if (!user) throw new Error('No authenticated user');
  return updateProfile(user, data);
}

// ─── Password Update ────────────────────────────────────────

export async function updateUserPassword(currentPassword: string, newPassword: string) {
  const user = getCurrentUser();
  if (!user || !user.email) throw new Error('No authenticated user');

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  return fbUpdatePassword(user, newPassword);
}

// ─── Google Auth ────────────────────────────────────────────

export async function signInWithGoogle() {
  const authInstance = getFirebaseAuth();
  if (!authInstance) throw new Error('Firebase Auth is not configured');
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  return signInWithPopup(authInstance, provider);
}

// ─── Account Deletion ───────────────────────────────────────

export async function deleteUserAccount(password: string) {
  const user = getCurrentUser();
  if (!user || !user.email) throw new Error('No authenticated user');

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
  return deleteUser(user);
}
