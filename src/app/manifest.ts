/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Web App Manifest
   PWA manifest configuration for mobile & desktop installation
   ────────────────────────────────────────────────────────────── */

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Future Pilot Ecosystem',
    short_name: 'FuturePilot',
    description: "India's Largest Student Freelancing & Industry Project Ecosystem",
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#00D4FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
