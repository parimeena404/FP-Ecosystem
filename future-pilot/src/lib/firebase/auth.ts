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
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export function getCurrentUser(): FirebaseUser | null {
  return getFirebaseAuth().currentUser;
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
  return createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signOutUser() {
  return signOut(getFirebaseAuth());
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(getFirebaseAuth(), email);
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
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  return signInWithPopup(getFirebaseAuth(), provider);
}

// ─── Account Deletion ───────────────────────────────────────

export async function deleteUserAccount(password: string) {
  const user = getCurrentUser();
  if (!user || !user.email) throw new Error('No authenticated user');

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
  return deleteUser(user);
}
