/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Constants
   Application-wide constants and configuration values
   ────────────────────────────────────────────────────────────── */

// ─── Breakpoints ────────────────────────────────────────────

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ─── Animation Durations ────────────────────────────────────

export const DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  page: 1.0,
} as const;

// ─── Easing Curves ──────────────────────────────────────────

export const EASE = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  smooth: { type: 'spring' as const, stiffness: 100, damping: 20 },
} as const;

// ─── File Upload ────────────────────────────────────────────

export const FILE_LIMITS = {
  maxResumeSize: 5 * 1024 * 1024, // 5MB
  maxPortfolioSize: 10 * 1024 * 1024, // 10MB
  maxProjectFileSize: 50 * 1024 * 1024, // 50MB
  maxImageSize: 2 * 1024 * 1024, // 2MB
  allowedResumeTypes: ['.pdf', '.doc', '.docx'],
  allowedImageTypes: ['.jpg', '.jpeg', '.png', '.webp'],
  allowedDocTypes: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
} as const;

// ─── Pagination ─────────────────────────────────────────────

export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
  leaderboardPageSize: 50,
} as const;

// ─── Platform Commission ────────────────────────────────────

export const COMMISSION = {
  defaultRate: 15, // 15%
  premiumRate: 10, // 10% for premium partners
  gstRate: 18, // 18% GST
} as const;
