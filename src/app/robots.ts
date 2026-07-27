/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Robots.txt Directives
   Search engine crawler directives
   ────────────────────────────────────────────────────────────── */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/student/', '/company/', '/college/', '/mentor/', '/api/'],
    },
    sitemap: 'https://futurepilot.in/sitemap.xml',
  };
}
