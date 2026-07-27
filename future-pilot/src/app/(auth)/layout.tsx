/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Auth Layout
   Centered layout with animated background for auth pages
   ────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Pilot — Sign In',
  description: 'Access your Future Pilot dashboard',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-fp-black">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-fp-neon-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-fp-neon-purple/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-fp-neon-cyan/3 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white font-bold text-xl font-display">FP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-fp-white font-display font-bold text-xl tracking-tight">
              Future Pilot
            </span>
            <span className="text-fp-gray text-[10px] font-medium tracking-widest uppercase">
              Ecosystem
            </span>
          </div>
        </a>

        {children}
      </div>
    </div>
  );
}
