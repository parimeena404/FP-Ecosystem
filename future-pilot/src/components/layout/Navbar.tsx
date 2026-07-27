/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Navigation Bar
   Glassmorphic floating navbar with magnetic interactions
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { navigationConfig } from '@/config/site';
import MagneticButton from '@/components/animations/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <nav
          className={cn(
            'mx-auto max-w-7xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500',
            scrolled
              ? 'bg-fp-dark/80 backdrop-blur-xl border border-fp-border/50 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent py-2'
          )}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-bold text-lg font-display">FP</span>
              <div className="absolute -inset-1 bg-gradient-to-br from-fp-neon-blue/30 to-fp-neon-purple/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-fp-white font-display font-bold text-lg leading-tight tracking-tight">
                Future Pilot
              </span>
              <span className="text-fp-gray text-[10px] font-medium tracking-widest uppercase">
                Ecosystem
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationConfig.public.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium text-fp-gray',
                  'hover:text-fp-white transition-colors duration-300',
                  'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                  'after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-fp-neon-blue after:to-fp-neon-purple',
                  'after:transition-all after:duration-300 hover:after:w-3/4',
                  'after:rounded-full'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticButton variant="ghost" size="sm" href="/login" strength={0.2}>
              Log In
            </MagneticButton>
            <MagneticButton variant="primary" size="sm" href="/register" strength={0.2}>
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-fp-white rounded-full origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-6 h-[2px] bg-fp-white rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-fp-white rounded-full origin-center"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-fp-black/90 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-fp-dark/95 backdrop-blur-2xl border-l border-fp-border/50 flex flex-col pt-24 px-8"
            >
              <div className="flex flex-col gap-2">
                {navigationConfig.public.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="py-3 text-lg font-medium text-fp-gray hover:text-fp-white transition-colors border-b border-fp-border/30"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pb-12 flex flex-col gap-3">
                <a
                  href="/login"
                  className="w-full py-3 text-center text-fp-white border border-fp-border rounded-xl hover:border-fp-neon-blue/50 transition-colors"
                >
                  Log In
                </a>
                <a
                  href="/register"
                  className="w-full py-3 text-center text-white bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple rounded-xl font-semibold"
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
