/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Root Layout
   ────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Future Pilot — India\'s Largest Student Freelancing Ecosystem',
  description:
    'Future Pilot connects Industry, Colleges, and Students through real projects — delivering experience, income, and career-ready graduates. Join the revolution.',
  keywords: [
    'student freelancing',
    'college projects',
    'industry projects',
    'student employment',
    'IET DAVV',
    'edtech',
    'career development',
    'earn while learning',
  ],
  authors: [{ name: 'Future Pilot' }],
  openGraph: {
    title: 'Future Pilot — India\'s Largest Student Freelancing Ecosystem',
    description:
      'Work on real projects, earn real money, and graduate with a portfolio that speaks louder than any degree.',
    url: 'https://futurepilot.in',
    siteName: 'Future Pilot',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Pilot',
    description: 'India\'s Largest Student Freelancing Ecosystem',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/ui/Toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-fp-black text-fp-white font-body" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

