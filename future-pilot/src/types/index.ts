/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Type Definitions
   Complete TypeScript types for the entire platform ecosystem
   ────────────────────────────────────────────────────────────── */

// ─── Enums ──────────────────────────────────────────────────

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  COMPANY = 'company',
  COLLEGE = 'college',
  MENTOR = 'mentor',
  STUDENT = 'student',
}

export enum ProjectStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ApplicationStatus {
  APPLIED = 'applied',
  AI_SCREENING = 'ai_screening',
  MANUAL_SCREENING = 'manual_screening',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEW_COMPLETED = 'interview_completed',
  SHORTLISTED = 'shortlisted',
  SELECTED = 'selected',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REVISION_REQUESTED = 'revision_requested',
}

export enum TransactionType {
  ESCROW_DEPOSIT = 'escrow_deposit',
  ESCROW_RELEASE = 'escrow_release',
  MILESTONE_PAYMENT = 'milestone_payment',
  WITHDRAWAL = 'withdrawal',
  REFUND = 'refund',
  COMMISSION = 'commission',
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REVERSED = 'reversed',
}

export enum WalletStatus {
  ACTIVE = 'active',
  FROZEN = 'frozen',
  SUSPENDED = 'suspended',
}

export enum KYCStatus {
  NOT_STARTED = 'not_started',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum StudentLevel {
  EXPLORER = 'Explorer',
  BUILDER = 'Builder',
  INNOVATOR = 'Innovator',
  EXPERT = 'Expert',
  ELITE_PILOT = 'Elite Pilot',
  FUTURE_LEGEND = 'Future Legend',
}

export enum ProjectDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum NotificationType {
  APPLICATION_UPDATE = 'application_update',
  PROJECT_UPDATE = 'project_update',
  PAYMENT_UPDATE = 'payment_update',
  MILESTONE_APPROVAL = 'milestone_approval',
  INTERVIEW_SCHEDULE = 'interview_schedule',
  ANNOUNCEMENT = 'announcement',
  BADGE_EARNED = 'badge_earned',
  LEVEL_UP = 'level_up',
  SYSTEM = 'system',
}

// ─── Base Types ─────────────────────────────────────────────

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface BaseEntity {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── User Types ─────────────────────────────────────────────

export interface User extends BaseEntity {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  role: UserRole;
  tenantId: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Timestamp;
  emailVerified: boolean;
}

export interface StudentProfile extends BaseEntity {
  userId: string;
  collegeId: string;
  branch: string;
  department: string;
  semester: number;
  year: number;
  enrollmentNumber: string;
  skills: string[];
  bio: string;

  // XP & Gamification
  lifetimeXP: number;
  currentLevelXP: number;
  level: StudentLevel;
  globalRank: number;
  collegeRank: number;
  branchRank: number;

  // Scores
  trustScore: number;
  performanceScore: number;
  completionRate: number;

  // Verification
  verificationStatus: VerificationStatus;

  // Files
  resumeURL: string | null;
  portfolioURL: string | null;

  // Links
  githubURL: string | null;
  linkedinURL: string | null;
  websiteURL: string | null;

  // Stats
  projectsCompleted: number;
  totalEarnings: number;
  badgeCount: number;
  certificateCount: number;

  // Availability
  isAvailable: boolean;
  weeklyHoursAvailable: number;
}

export interface CompanyProfile extends BaseEntity {
  userId: string;
  name: string;
  description: string;
  industry: string;
  companySize: string;
  website: string;
  logoURL: string | null;
  kycStatus: KYCStatus;

  // Contact
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };

  // Verification
  gstNumber: string | null;
  panNumber: string | null;
  registrationNumber: string | null;

  // Stats
  projectsPosted: number;
  projectsCompleted: number;
  totalSpent: number;
  averageRating: number;
}

export interface CollegeProfile extends BaseEntity {
  userId: string;
  name: string;
  university: string;
  city: string;
  state: string;
  country: string;
  website: string;
  logoURL: string | null;
  departments: string[];
  verificationStatus: VerificationStatus;

  // Stats
  totalStudents: number;
  activeStudents: number;
  projectsParticipated: number;
  placementRate: number;
}

export interface MentorProfile extends BaseEntity {
  userId: string;
  specialization: string[];
  experience: number; // years
  bio: string;
  linkedinURL: string | null;
  rating: number;
  projectsMentored: number;
  studentsGuided: number;
}

// ─── Project Types ──────────────────────────────────────────

export interface Project extends BaseEntity {
  companyId: string;
  mentorId: string | null;
  facultyId: string | null;
  collegeId: string | null;

  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  subcategory: string;
  difficulty: ProjectDifficulty;
  requiredSkills: string[];
  preferredSkills: string[];

  // Rewards
  reward: number;
  currency: string;
  totalXP: number;

  // Timeline
  estimatedDuration: number; // days
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  deadline: Timestamp;

  // Selection
  maxApplicants: number;
  maxSelectedStudents: number;
  selectionStages: string[];

  // Status
  status: ProjectStatus;
  applicantCount: number;
  selectedCount: number;

  // Attachments
  documentURLs: string[];
  resourceURLs: string[];

  // Settings
  isRemote: boolean;
  isFeatured: boolean;
  requiresInterview: boolean;
  autoAIScreening: boolean;
}

export interface Milestone extends BaseEntity {
  projectId: string;
  title: string;
  description: string;
  orderIndex: number;

  // Rewards
  xpReward: number;
  paymentAmount: number;

  // Status
  status: MilestoneStatus;
  dueDate: Timestamp;
  completedAt: Timestamp | null;
  approvedAt: Timestamp | null;
  approvedBy: string | null;

  // Deliverables
  deliverables: string[];
  submissionURL: string | null;
  feedback: string | null;
}

export interface Application extends BaseEntity {
  projectId: string;
  studentId: string;

  // Status
  status: ApplicationStatus;
  screeningStage: string;

  // Submissions
  resumeURL: string;
  portfolioURL: string | null;
  coverLetter: string;

  // Scores
  aiScore: number | null;
  manualScore: number | null;
  interviewScore: number | null;

  // Interview
  interviewDate: Timestamp | null;
  interviewNotes: string | null;

  // Admin
  reviewedBy: string | null;
  rejectionReason: string | null;
}

// ─── Financial Types ────────────────────────────────────────

export interface Wallet extends BaseEntity {
  ownerId: string;
  ownerType: 'student' | 'company' | 'platform';
  balance: number;
  currency: string;
  status: WalletStatus;
  totalDeposited: number;
  totalWithdrawn: number;
  lastTransactionAt: Timestamp | null;
}

export interface Transaction extends BaseEntity {
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  projectId: string | null;
  milestoneId: string | null;
  description: string;

  // Payment Gateway
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;

  // Escrow
  escrowId: string | null;
  fromWalletId: string | null;
  toWalletId: string | null;

  // Metadata
  processedAt: Timestamp | null;
  processedBy: string | null;
}

export interface Escrow extends BaseEntity {
  projectId: string;
  companyId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'funded' | 'partially_released' | 'released' | 'disputed' | 'refunded';
  fundedAt: Timestamp | null;
  releasedAt: Timestamp | null;
  milestoneReleases: {
    milestoneId: string;
    amount: number;
    releasedAt: Timestamp;
  }[];
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  companyId: string;
  projectId: string;
  amount: number;
  tax: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Timestamp;
  paidAt: Timestamp | null;
  invoiceURL: string | null;
}

// ─── Gamification Types ─────────────────────────────────────

export interface Badge extends BaseEntity {
  studentId: string;
  badgeType: string;
  name: string;
  description: string;
  iconURL: string;
  category: 'skill' | 'achievement' | 'contribution' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Timestamp;
}

export interface Certificate extends BaseEntity {
  studentId: string;
  projectId: string;
  title: string;
  description: string;
  certificateURL: string;
  verificationCode: string;
  issuedAt: Timestamp;
  issuedBy: string;
}

export interface LeaderboardEntry {
  studentId: string;
  displayName: string;
  photoURL: string | null;
  collegeName: string;
  branch: string;
  lifetimeXP: number;
  level: StudentLevel;
  rank: number;
  projectsCompleted: number;
  badgeCount: number;
}

// ─── Communication Types ────────────────────────────────────

export interface Notification extends BaseEntity {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionURL: string | null;
  metadata: Record<string, unknown>;
}

export interface Meeting extends BaseEntity {
  projectId: string;
  mentorId: string;
  studentId: string;
  title: string;
  description: string;
  scheduledAt: Timestamp;
  duration: number; // minutes
  meetingURL: string | null;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes: string | null;
}

// ─── Platform Types ─────────────────────────────────────────

export interface AuditLog extends BaseEntity {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, { before: unknown; after: unknown }>;
  ipAddress: string;
  userAgent: string;
}

export interface PlatformSettings {
  platformName: string;
  platformDescription: string;
  commissionRate: number; // percentage
  minWithdrawalAmount: number;
  maxWithdrawalAmount: number;
  escrowEnabled: boolean;
  aiScreeningEnabled: boolean;
  maintenanceMode: boolean;
  allowedFileTypes: string[];
  maxFileSize: number; // bytes
  xpLevelThresholds: Record<StudentLevel, number>;
}

// ─── XP Level Thresholds ────────────────────────────────────

export const XP_LEVEL_THRESHOLDS: Record<StudentLevel, number> = {
  [StudentLevel.EXPLORER]: 0,
  [StudentLevel.BUILDER]: 2000,
  [StudentLevel.INNOVATOR]: 5000,
  [StudentLevel.EXPERT]: 10000,
  [StudentLevel.ELITE_PILOT]: 20000,
  [StudentLevel.FUTURE_LEGEND]: 50000,
};

// ─── Badge Types ────────────────────────────────────────────

export const BADGE_DEFINITIONS = {
  EARLY_BIRD: { name: 'Early Bird', icon: '🐦', rarity: 'common' as const },
  FREELANCER: { name: 'Freelancer', icon: '💼', rarity: 'common' as const },
  PROBLEM_SOLVER: { name: 'Problem Solver', icon: '🧩', rarity: 'common' as const },
  INDUSTRY_READY: { name: 'Industry Ready', icon: '🏭', rarity: 'rare' as const },
  TOP_CONTRIBUTOR: { name: 'Top Contributor', icon: '⭐', rarity: 'rare' as const },
  ELITE_PILOT: { name: 'Elite Pilot', icon: '🚀', rarity: 'epic' as const },
  INNOVATION_AWARD: { name: 'Innovation Award', icon: '💡', rarity: 'epic' as const },
  HUNDRED_PROJECT_CLUB: { name: '100 Project Club', icon: '💯', rarity: 'legendary' as const },
  TOP_MENTOR: { name: 'Top Mentor', icon: '🎓', rarity: 'rare' as const },
  STARTUP_BUILDER: { name: 'Startup Builder', icon: '🏗️', rarity: 'epic' as const },
  OPEN_SOURCE_HERO: { name: 'Open Source Hero', icon: '🌐', rarity: 'rare' as const },
  RESEARCH_EXPERT: { name: 'Research Expert', icon: '🔬', rarity: 'epic' as const },
  AI_SPECIALIST: { name: 'AI Specialist', icon: '🤖', rarity: 'epic' as const },
  ELECTRONICS_EXPERT: { name: 'Electronics Expert', icon: '⚡', rarity: 'rare' as const },
  MECHANICAL_EXPERT: { name: 'Mechanical Expert', icon: '⚙️', rarity: 'rare' as const },
  CIVIL_EXPERT: { name: 'Civil Expert', icon: '🏛️', rarity: 'rare' as const },
  IOT_ENGINEER: { name: 'IoT Engineer', icon: '📡', rarity: 'rare' as const },
  HACKATHON_CHAMPION: { name: 'Hackathon Champion', icon: '🏆', rarity: 'epic' as const },
  GOLD_CONTRIBUTOR: { name: 'Gold Contributor', icon: '🥇', rarity: 'epic' as const },
  DIAMOND_CONTRIBUTOR: { name: 'Diamond Contributor', icon: '💎', rarity: 'legendary' as const },
} as const;
