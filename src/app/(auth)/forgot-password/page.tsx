/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Forgot Password Page
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { sendPasswordReset } from '@/services/auth.service';
import { validateEmail } from '@/lib/utils/validators';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateEmail(email);
    if (!result.valid) {
      setError(result.error!);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendPasswordReset(email);
      setSent(true);
      toast.success('Reset link sent!');
    } catch {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-fp-dark/90 backdrop-blur-2xl border border-fp-border/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
    >
      {sent ? (
        <div className="text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-fp-neon-cyan/10"
          >
            <CheckCircle className="w-8 h-8 text-fp-neon-cyan" />
          </motion.div>
          <h2 className="text-xl font-bold text-fp-white font-display mb-2">Check Your Email</h2>
          <p className="text-fp-gray text-sm mb-6">
            We sent a password reset link to <br />
            <span className="text-fp-white font-medium">{email}</span>
          </p>
          <Button variant="ghost" href="/login" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Login
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-fp-white font-display mb-2">Reset Password</h1>
            <p className="text-fp-gray text-sm">Enter your email and we&apos;ll send you a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              icon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />

            <Button type="submit" fullWidth loading={loading} size="lg" className="h-12 text-base font-semibold">
              Send Reset Link
            </Button>
          </form>

          <div className="text-center mt-6">
            <a href="/login" className="text-sm text-fp-gray hover:text-fp-white inline-flex items-center gap-2 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </a>
          </div>
        </>
      )}
    </motion.div>
  );
}
