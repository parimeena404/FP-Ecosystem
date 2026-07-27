/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Login Page
   Email/password + Google sign-in + Instant Multi-Role Demo Mode
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, User, Building, GraduationCap, UserCheck, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { loginWithEmail, loginWithGoogleProvider } from '@/services/auth.service';
import { validateEmail, validatePassword } from '@/lib/utils/validators';
import { ROLE_DASHBOARD_ROUTES } from '@/config/rbac';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { setDemoRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    const newErrors: typeof errors = {};
    if (!emailResult.valid) newErrors.email = emailResult.error;
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const user = await loginWithEmail(email, password);
      if (user) {
        toast.success('Welcome back!');
        const redirect = new URLSearchParams(window.location.search).get('redirect');
        window.location.href = redirect || ROLE_DASHBOARD_ROUTES[user.role] || '/';
      }
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Please try again later.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const user = await loginWithGoogleProvider();
      if (user) {
        toast.success('Welcome!');
        window.location.href = ROLE_DASHBOARD_ROUTES[user.role] || '/student/dashboard';
      }
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Google sign-in failed');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDemoAccess = (role: UserRole, targetRoute: string) => {
    setDemoRole(role);
    toast.success(`Entering ${role.toUpperCase()} workspace`);
    window.location.href = targetRoute;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-fp-dark/90 backdrop-blur-2xl border border-fp-border/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-fp-white font-display">Welcome Back</h1>
        <p className="text-fp-gray text-xs sm:text-sm mt-1">Sign in to your Future Pilot workspace</p>
      </div>

      {/* Google Sign-In */}
      <Button
        variant="outline"
        fullWidth
        loading={googleLoading}
        onClick={handleGoogleLogin}
        className="mb-5 h-11 border-fp-border/60 hover:border-fp-neon-blue/40"
        icon={
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        }
      >
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-1 h-px bg-fp-border/40" />
        <span className="text-[11px] text-fp-gray/70 uppercase tracking-widest font-semibold">or</span>
        <div className="flex-1 h-px bg-fp-border/40" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={<Lock className="w-4 h-4" />}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="w-4 h-4 rounded border-fp-border bg-fp-surface accent-fp-neon-blue cursor-pointer shrink-0" />
            <span className="text-xs sm:text-sm text-fp-gray font-medium">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-xs sm:text-sm text-fp-neon-blue hover:underline font-medium transition-colors">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
          className="h-12 mt-2 font-semibold text-base"
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          Sign In
        </Button>
      </form>

      {/* Quick Demo Access Bar */}
      <div className="mt-7 pt-5 border-t border-fp-border/40 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-fp-neon-cyan">
          <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Role Access
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleDemoAccess(UserRole.STUDENT, '/student/dashboard')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-fp-surface/60 hover:bg-fp-neon-blue/15 border border-fp-border/50 hover:border-fp-neon-blue/40 text-fp-white transition-all cursor-pointer font-medium"
          >
            <User className="w-3.5 h-3.5 text-fp-neon-blue shrink-0" /> Student
          </button>
          <button
            type="button"
            onClick={() => handleDemoAccess(UserRole.COMPANY, '/company/dashboard')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-fp-surface/60 hover:bg-fp-neon-purple/15 border border-fp-border/50 hover:border-fp-neon-purple/40 text-fp-white transition-all cursor-pointer font-medium"
          >
            <Building className="w-3.5 h-3.5 text-fp-neon-purple shrink-0" /> Company
          </button>
          <button
            type="button"
            onClick={() => handleDemoAccess(UserRole.COLLEGE, '/college/dashboard')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-fp-surface/60 hover:bg-fp-neon-cyan/15 border border-fp-border/50 hover:border-fp-neon-cyan/40 text-fp-white transition-all cursor-pointer font-medium"
          >
            <GraduationCap className="w-3.5 h-3.5 text-fp-neon-cyan shrink-0" /> University
          </button>
          <button
            type="button"
            onClick={() => handleDemoAccess(UserRole.MENTOR, '/mentor/dashboard')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-fp-surface/60 hover:bg-fp-neon-gold/15 border border-fp-border/50 hover:border-fp-neon-gold/40 text-fp-white transition-all cursor-pointer font-medium"
          >
            <UserCheck className="w-3.5 h-3.5 text-fp-neon-gold shrink-0" /> Mentor
          </button>
          <button
            type="button"
            onClick={() => handleDemoAccess(UserRole.ADMIN, '/admin/dashboard')}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-fp-surface/60 hover:bg-fp-neon-pink/15 border border-fp-border/50 hover:border-fp-neon-pink/40 text-fp-white transition-all col-span-2 cursor-pointer font-medium"
          >
            <Shield className="w-3.5 h-3.5 text-fp-neon-pink shrink-0" /> Admin Command Center
          </button>
        </div>
      </div>

      <p className="text-center text-xs sm:text-sm text-fp-gray mt-6 pt-2">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-fp-neon-blue hover:underline font-semibold transition-colors">
          Create Account
        </a>
      </p>
    </motion.div>
  );
}
