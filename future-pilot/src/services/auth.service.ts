/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Auth Service
   User registration, login, and account management
   ────────────────────────────────────────────────────────────── */

import { UserRole, type User } from '@/types';
import { COLLECTIONS } from '@/lib/firebase/config';
import {
  createAccount,
  signInWithEmail,
  signOutUser,
  resetPassword,
  signInWithGoogle,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} from '@/lib/firebase/auth';
import { setDocument, getDocument } from '@/lib/firebase/firestore';

// ─── Register ───────────────────────────────────────────────

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole
): Promise<string> {
  // Create Firebase Auth account
  const { user: fbUser } = await createAccount(email, password);

  // Update display name
  await updateUserProfile({ displayName });

  // Create user document in Firestore
  const userData: Omit<User, 'id'> = {
    uid: fbUser.uid,
    email,
    displayName,
    photoURL: null,
    role,
    tenantId: role, // Default tenant = role
    status: 'active',
    emailVerified: false,
    lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  };

  await setDocument(COLLECTIONS.USERS, fbUser.uid, userData);

  return fbUser.uid;
}

// ─── Login ──────────────────────────────────────────────────

export async function loginWithEmail(email: string, password: string): Promise<User | null> {
  const { user: fbUser } = await signInWithEmail(email, password);
  return getUserProfile(fbUser.uid);
}

export async function loginWithGoogleProvider(): Promise<User | null> {
  const { user: fbUser } = await signInWithGoogle();

  // Check if user document exists
  let userDoc = await getUserProfile(fbUser.uid);

  if (!userDoc) {
    // First-time Google login — create user document
    const userData: Omit<User, 'id'> = {
      uid: fbUser.uid,
      email: fbUser.email || '',
      displayName: fbUser.displayName || '',
      photoURL: fbUser.photoURL,
      role: UserRole.STUDENT, // Default role for Google sign-in
      tenantId: UserRole.STUDENT,
      status: 'active',
      emailVerified: true,
      lastLogin: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
      createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
      updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    };

    await setDocument(COLLECTIONS.USERS, fbUser.uid, userData);
    userDoc = { id: fbUser.uid, ...userData };
  }

  return userDoc;
}

// ─── Logout ─────────────────────────────────────────────────

export async function logout(): Promise<void> {
  return signOutUser();
}

// ─── Password Reset ─────────────────────────────────────────

export async function sendPasswordReset(email: string): Promise<void> {
  return resetPassword(email);
}

// ─── Password Update ────────────────────────────────────────

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  return updateUserPassword(currentPassword, newPassword);
}

// ─── Profile ────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<User | null> {
  return getDocument<User>(COLLECTIONS.USERS, uid);
}

export async function updateUserDoc(
  uid: string,
  data: Partial<Pick<User, 'displayName' | 'photoURL' | 'status'>>
): Promise<void> {
  await setDocument(COLLECTIONS.USERS, uid, data as Record<string, unknown>, true);
  if (data.displayName || data.photoURL) {
    await updateUserProfile({
      displayName: data.displayName,
      photoURL: data.photoURL ?? undefined,
    });
  }
}

// ─── Account Deletion ───────────────────────────────────────

export async function deleteAccount(password: string): Promise<void> {
  return deleteUserAccount(password);
}
