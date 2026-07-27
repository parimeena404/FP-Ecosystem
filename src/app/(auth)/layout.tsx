/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Auth Layout
   Centered layout with subtle animated glow for auth pages
   ────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Pilot — Sign In',
  description: 'Access your Future Pilot workspace',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative bg-fp-black overflow-x-hidden">
      {/* Background Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fp-neon-blue/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-fp-neon-purple/8 rounded-full blur-[140px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto flex flex-col items-center">
        {/* Brand Logo Header */}
        <a href="/" className="inline-flex items-center gap-3 mb-6 group transition-transform hover:scale-105">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <span className="text-white font-bold text-lg font-display">FP</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-fp-white font-display font-bold text-xl tracking-tight leading-tight">
              Future Pilot
            </span>
            <span className="text-fp-neon-cyan text-[10px] font-semibold tracking-widest uppercase">
              Ecosystem
            </span>
          </div>
        </a>

        {/* Form Page Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
