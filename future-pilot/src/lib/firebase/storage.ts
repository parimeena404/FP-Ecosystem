/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Cloud Storage Helpers
   File upload, download, and management utilities
   ────────────────────────────────────────────────────────────── */

import {
  ref,
  uploadBytesResumable,
  getDownloadURL as fbGetDownloadURL,
  deleteObject,
  type UploadTask,
} from 'firebase/storage';
import { getFirebaseStorage } from './config';

// ─── Types ──────────────────────────────────────────────────

export interface UploadProgress {
  progress: number;       // 0–100
  bytesTransferred: number;
  totalBytes: number;
  state: 'running' | 'paused' | 'success' | 'canceled' | 'error';
}

export interface UploadResult {
  downloadURL: string;
  fullPath: string;
}

// ─── Upload ─────────────────────────────────────────────────

export function uploadFile(
  path: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(getFirebaseStorage(), path);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.({
          progress,
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          state: snapshot.state,
        });
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await fbGetDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadURL,
          fullPath: uploadTask.snapshot.ref.fullPath,
        });
      }
    );
  });
}

// ─── Download URL ───────────────────────────────────────────

export async function getDownloadURL(path: string): Promise<string> {
  const storageRef = ref(getFirebaseStorage(), path);
  return fbGetDownloadURL(storageRef);
}

// ─── Delete ─────────────────────────────────────────────────

export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(getFirebaseStorage(), path);
  return deleteObject(storageRef);
}

// ─── Path Helpers ───────────────────────────────────────────

export function getAvatarPath(userId: string, fileName: string): string {
  const ext = fileName.split('.').pop();
  return `users/${userId}/avatar.${ext}`;
}

export function getResumePath(userId: string, fileName: string): string {
  return `users/${userId}/resume/${fileName}`;
}

export function getPortfolioPath(userId: string, fileName: string): string {
  return `users/${userId}/portfolio/${fileName}`;
}

export function getProjectFilePath(projectId: string, fileName: string): string {
  return `projects/${projectId}/files/${fileName}`;
}
