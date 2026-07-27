/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Navigation Bar
   Glassmorphic floating navbar with magnetic interactions
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import MagneticButton from '@/components/animations/MagneticButton';

const PUBLIC_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Mission', href: '#mission' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Students', href: '#student-journey' },
  { label: 'For Companies', href: '#company-journey' },
  { label: 'Roadmap', href: '#roadmap' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6"
      >
        <nav
          className={cn(
            'mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between rounded-2xl transition-all duration-300',
            scrolled
              ? 'bg-fp-dark/85 backdrop-blur-2xl border border-fp-border/60 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-fp-dark/40 backdrop-blur-md border border-fp-border/30 py-3'
          )}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple rounded-xl opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-bold text-sm font-display">FP</span>
              <div className="absolute -inset-1 bg-gradient-to-br from-fp-neon-blue/40 to-fp-neon-purple/40 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-fp-white font-display font-bold text-base leading-none tracking-tight">
                Future Pilot
              </span>
              <span className="text-fp-neon-cyan text-[9px] font-semibold tracking-widest uppercase mt-0.5">
                Ecosystem
              </span>
            </div>
          </a>

          {/* Desktop Navigation (XL screens) */}
          <div className="hidden xl:flex items-center gap-1">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'relative px-3.5 py-1.5 text-xs xl:text-sm font-medium text-fp-gray hover:text-fp-white transition-colors duration-200',
                  'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                  'after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-fp-neon-blue after:to-fp-neon-purple',
                  'after:transition-all after:duration-200 hover:after:w-2/3',
                  'after:rounded-full'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0">
            <MagneticButton variant="ghost" size="sm" href="/login" strength={0.2}>
              Log In
            </MagneticButton>
            <MagneticButton variant="primary" size="sm" href="/register" strength={0.2}>
              Get Started
              <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </MagneticButton>
          </div>

          {/* Mobile / Tablet Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-xl bg-fp-surface/40 border border-fp-border/30 text-fp-white hover:bg-fp-surface/60 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-fp-white rounded-full origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-5 h-[2px] bg-fp-white rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-fp-white rounded-full origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-fp-black/90 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-fp-dark/95 backdrop-blur-2xl border-l border-fp-border/50 flex flex-col pt-24 px-6 pb-8"
            >
              <div className="flex flex-col gap-1">
                {PUBLIC_NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.05 }}
                    className="py-3 px-3 text-base font-medium text-fp-gray hover:text-fp-white hover:bg-fp-surface/40 rounded-xl transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-fp-border/30 flex flex-col gap-3">
                <a
                  href="/login"
                  className="w-full py-2.5 text-center text-sm text-fp-white border border-fp-border/40 rounded-xl hover:bg-fp-surface/40 transition-colors"
                >
                  Log In
                </a>
                <a
                  href="/register"
                  className="w-full py-2.5 text-center text-sm text-white bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple rounded-xl font-semibold shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                >
                  Get Started
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
