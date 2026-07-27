/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Toast Component
   Custom toast notifications with glassmorphic style
   ────────────────────────────────────────────────────────────── */
'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(18, 18, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          color: '#F0F0FF',
          border: '1px solid rgba(42, 42, 62, 0.5)',
          borderRadius: '12px',
          fontSize: '14px',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
        success: {
          iconTheme: {
            primary: '#06FFC9',
            secondary: '#0A0A0F',
          },
        },
        error: {
          iconTheme: {
            primary: '#FF006E',
            secondary: '#0A0A0F',
          },
        },
      }}
    />
  );
}
