/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Onboarding
   Post-registration wizard for profile completion
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Globe, Clock, Sparkles, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/Table';
import { useAuth } from '@/hooks/useAuth';
import { updateStudentProfile } from '@/services/student.service';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
    </svg>
  );
}

const STEPS = [
  { id: 'bio', label: 'About You', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'links', label: 'Social Links', icon: <Globe className="w-5 h-5" /> },
  { id: 'availability', label: 'Availability', icon: <Clock className="w-5 h-5" /> },
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Form state
  const [bio, setBio] = useState('');
  const [githubURL, setGithubURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('20');

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await updateStudentProfile(user.uid, {
        bio,
        githubURL: githubURL || null,
        linkedinURL: linkedinURL || null,
        websiteURL: websiteURL || null,
        weeklyHoursAvailable: parseInt(weeklyHours) || 20,
      });

      setCompleted(true);
      toast.success('Profile completed!');
      setTimeout(() => {
        window.location.href = '/student/dashboard';
      }, 2000);
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fp-black">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-fp-white font-display mb-2">You&apos;re All Set!</h2>
          <p className="text-fp-gray mb-4">Redirecting to your dashboard...</p>
          <div className="w-32 mx-auto">
            <ProgressBar value={100} color="gradient" size="sm" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-fp-black p-4">
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-fp-neon-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-fp-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fp-white font-display mb-2">
            Welcome, {user?.displayName?.split(' ')[0] || 'Pilot'}! 🚀
          </h1>
          <p className="text-fp-gray">Let&apos;s set up your profile to get you started</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i <= step
                    ? 'bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple text-white'
                    : 'bg-fp-surface text-fp-gray'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 ${i < step ? 'bg-fp-neon-blue' : 'bg-fp-surface'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-fp-dark/60 backdrop-blur-xl border border-fp-border/30 rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="bio"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-fp-white font-display flex items-center gap-2">
                  {STEPS[0].icon} Tell us about yourself
                </h3>
                <Textarea
                  label="Bio"
                  placeholder="Write a short introduction about yourself, your interests, and what you're looking for..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  helperText={`${bio.length}/500 characters`}
                  maxLength={500}
                />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="links"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-fp-white font-display flex items-center gap-2">
                  {STEPS[1].icon} Connect your profiles
                </h3>
                <Input
                  label="GitHub"
                  placeholder="https://github.com/username"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                  icon={<GithubIcon className="w-4 h-4" />}
                />
                <Input
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinURL}
                  onChange={(e) => setLinkedinURL(e.target.value)}
                  icon={<LinkedinIcon className="w-4 h-4" />}
                />
                <Input
                  label="Personal Website"
                  placeholder="https://yourwebsite.com"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  icon={<Globe className="w-4 h-4" />}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="availability"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-fp-white font-display flex items-center gap-2">
                  {STEPS[2].icon} Set your availability
                </h3>
                <div>
                  <label className="text-sm font-medium text-fp-gray mb-3 block">
                    Hours available per week: <span className="text-fp-neon-blue font-bold">{weeklyHours}h</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    className="w-full h-2 bg-fp-surface rounded-full appearance-none cursor-pointer accent-fp-neon-blue"
                  />
                  <div className="flex justify-between text-xs text-fp-gray mt-1">
                    <span>5h</span>
                    <span>20h</span>
                    <span>40h</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-8">
            {step > 0 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button fullWidth onClick={() => setStep(step + 1)} iconRight={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            ) : (
              <Button fullWidth loading={loading} onClick={handleComplete}>
                Complete Setup 🎉
              </Button>
            )}
          </div>

          {/* Skip Option */}
          <button
            onClick={() => (window.location.href = '/student/dashboard')}
            className="w-full text-center text-sm text-fp-gray hover:text-fp-white mt-4 transition-colors cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
