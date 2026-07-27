/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Site Configuration
   Centralized metadata, navigation, and brand constants
   ────────────────────────────────────────────────────────────── */

export const siteConfig = {
  name: 'Future Pilot',
  tagline: "India's Largest Student Freelancing Ecosystem",
  description:
    'Future Pilot connects Industry, Colleges, and Students through real projects — delivering experience, income, and career-ready graduates.',
  url: 'https://futurepilot.in',
  ogImage: '/images/og-image.png',
  founder: 'Future Pilot Team',
  college: 'IET DAVV',
  location: 'Indore, India',

  keywords: [
    'student freelancing',
    'college projects',
    'industry projects',
    'internship platform',
    'student earnings',
    'career development',
    'project-based learning',
    'India edtech',
    'IET DAVV',
    'student employment',
  ],

  social: {
    twitter: 'https://twitter.com/futurepilot',
    linkedin: 'https://linkedin.com/company/futurepilot',
    instagram: 'https://instagram.com/futurepilot',
    github: 'https://github.com/futurepilot',
    youtube: 'https://youtube.com/@futurepilot',
  },

  contact: {
    email: 'hello@futurepilot.in',
    support: 'support@futurepilot.in',
    phone: '+91 XXX XXX XXXX',
  },

  stats: {
    studentsRegistered: 5000,
    projectsCompleted: 350,
    companiesPartnered: 120,
    collegesOnboarded: 15,
    totalEarnings: 2500000, // INR
    satisfactionRate: 97,
  },
} as const;

export const navigationConfig = {
  public: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#mission' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Students', href: '#student-journey' },
    { label: 'For Companies', href: '#company-journey' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Contact', href: '#contact' },
  ],
  auth: [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ],
  student: [
    { label: 'Dashboard', href: '/student/dashboard', icon: 'LayoutDashboard' },
    { label: 'Projects', href: '/student/projects', icon: 'Briefcase' },
    { label: 'Applications', href: '/student/applications', icon: 'FileText' },
    { label: 'Portfolio', href: '/student/portfolio', icon: 'FolderOpen' },
    { label: 'Leaderboard', href: '/student/leaderboard', icon: 'Trophy' },
    { label: 'Wallet', href: '/student/wallet', icon: 'Wallet' },
    { label: 'Certificates', href: '/student/certificates', icon: 'Award' },
    { label: 'Achievements', href: '/student/achievements', icon: 'Star' },
    { label: 'Profile', href: '/student/profile', icon: 'User' },
    { label: 'Settings', href: '/student/settings', icon: 'Settings' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Students', href: '/admin/students', icon: 'Users' },
    { label: 'Projects', href: '/admin/projects', icon: 'Briefcase' },
    { label: 'Applications', href: '/admin/applications', icon: 'FileText' },
    { label: 'Companies', href: '/admin/companies', icon: 'Building' },
    { label: 'Colleges', href: '/admin/colleges', icon: 'GraduationCap' },
    { label: 'Mentors', href: '/admin/mentors', icon: 'UserCheck' },
    { label: 'Finance', href: '/admin/finance', icon: 'DollarSign' },
    { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart' },
    { label: 'Notifications', href: '/admin/notifications', icon: 'Bell' },
    { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
  ],
} as const;

// ─── Level System ───────────────────────────────────────────

export const levelConfig = [
  { level: 'Explorer', minXP: 0, maxXP: 1999, color: '#8888AA', icon: '🔍' },
  { level: 'Builder', minXP: 2000, maxXP: 4999, color: '#00D4FF', icon: '🔧' },
  { level: 'Innovator', minXP: 5000, maxXP: 9999, color: '#06FFC9', icon: '💡' },
  { level: 'Expert', minXP: 10000, maxXP: 19999, color: '#8B5CF6', icon: '🎯' },
  { level: 'Elite Pilot', minXP: 20000, maxXP: 49999, color: '#FF006E', icon: '🚀' },
  { level: 'Future Legend', minXP: 50000, maxXP: Infinity, color: '#FFD700', icon: '👑' },
] as const;
