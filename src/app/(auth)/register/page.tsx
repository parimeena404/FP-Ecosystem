/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Register Page
   Multi-step registration with role selection
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, GraduationCap, Building, BookOpen, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/Table';
import { registerWithEmail } from '@/services/auth.service';
import { createStudentProfile } from '@/services/student.service';
import { UserRole } from '@/types';
import { validateEmail, validatePassword, getPasswordStrength } from '@/lib/utils/validators';

const ROLES = [
  {
    id: UserRole.STUDENT,
    label: 'Student',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Apply to projects, earn money, and build your career',
    color: 'from-fp-neon-blue to-fp-neon-cyan',
  },
  {
    id: UserRole.COMPANY,
    label: 'Company',
    icon: <Building className="w-6 h-6" />,
    description: 'Post projects, find talented students, get work done',
    color: 'from-fp-neon-purple to-fp-neon-pink',
  },
  {
    id: UserRole.COLLEGE,
    label: 'College',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Manage students, track placements, build industry connections',
    color: 'from-fp-neon-gold to-fp-neon-pink',
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Student-specific fields
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [skills, setSkills] = useState('');

  const totalSteps = role === UserRole.STUDENT ? 3 : 2;
  const passwordStrength = getPasswordStrength(password);

  const validateStep1 = () => {
    if (!role) {
      toast.error('Please select your role');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!emailResult.valid) newErrors.email = emailResult.error!;
    if (!passwordResult.valid) newErrors.password = passwordResult.error!;
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) {
      if (totalSteps === 2) handleSubmit();
      else setStep(3);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uid = await registerWithEmail(email, password, name, role!);

      if (role === UserRole.STUDENT) {
        await createStudentProfile(uid, {
          branch,
          semester: parseInt(semester) || 1,
          skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        });
      }

      toast.success('Account created successfully!');

      if (role === UserRole.STUDENT) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/login';
      }
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === 'auth/email-already-in-use') {
        toast.error('Email already in use. Try logging in.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
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
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-fp-white font-display mb-1">Create Account</h1>
        <p className="text-fp-gray text-xs sm:text-sm">Join the Future Pilot ecosystem</p>
      </div>

      {/* Progress Bar Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i + 1 <= step
                    ? 'bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                    : 'bg-fp-surface text-fp-gray border border-fp-border/40'
                }`}
              >
                {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    i + 1 < step ? 'bg-fp-neon-blue' : 'bg-fp-surface'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Role Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold text-fp-gray uppercase tracking-wider mb-2">I am joining as...</p>
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  role === r.id
                    ? 'border-fp-neon-blue bg-fp-neon-blue/10 shadow-[0_0_20px_rgba(0,212,255,0.15)]'
                    : 'border-fp-border/40 hover:border-fp-border/80 hover:bg-fp-surface/40'
                }`}
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${r.color} text-white shrink-0`}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-fp-white">{r.label}</p>
                  <p className="text-xs text-fp-gray/80 truncate">{r.description}</p>
                </div>
                {role === r.id && (
                  <div className="shrink-0">
                    <Check className="w-5 h-5 text-fp-neon-blue" />
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Step 2: Account Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
            />
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                icon={<Lock className="w-4 h-4" />}
              />
              {password && (
                <div className="mt-2">
                  <ProgressBar
                    value={passwordStrength.score}
                    max={4}
                    size="sm"
                    color={passwordStrength.score >= 4 ? 'cyan' : passwordStrength.score >= 3 ? 'blue' : passwordStrength.score >= 2 ? 'gold' : 'pink'}
                  />
                  <p className="text-xs mt-1 font-medium" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              icon={<Lock className="w-4 h-4" />}
            />
          </motion.div>
        )}

        {/* Step 3: Student Details */}
        {step === 3 && role === UserRole.STUDENT && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <Input
              label="College Name"
              placeholder="e.g., IET DAVV"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              icon={<BookOpen className="w-4 h-4" />}
            />
            <Input
              label="Branch / Department"
              placeholder="e.g., Computer Science"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            <Input
              label="Current Semester"
              type="number"
              placeholder="e.g., 5"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              min="1"
              max="10"
            />
            <Input
              label="Skills"
              placeholder="e.g., React, Python, UI Design"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              helperText="Separate with commas"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 mt-7 pt-2">
        {step > 1 && (
          <Button variant="ghost" onClick={() => setStep(step - 1)} icon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
        )}
        <Button
          fullWidth
          loading={loading}
          size="lg"
          className="h-12 text-base font-semibold"
          onClick={step === totalSteps ? handleSubmit : handleNext}
          iconRight={step < totalSteps ? <ArrowRight className="w-4 h-4" /> : undefined}
        >
          {step === totalSteps ? 'Create Account' : 'Continue'}
        </Button>
      </div>

      <p className="text-center text-xs sm:text-sm text-fp-gray mt-6">
        Already have an account?{' '}
        <a href="/login" className="text-fp-neon-blue hover:underline font-semibold transition-colors">
          Sign In
        </a>
      </p>
    </motion.div>
  );
}
