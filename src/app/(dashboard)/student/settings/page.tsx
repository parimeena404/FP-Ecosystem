/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Settings Page
   Account security, notification preferences, privacy controls
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Lock, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function StudentSettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [projectAlerts, setProjectAlerts] = useState(true);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }
    toast.success('Password updated successfully!');
    setPassword('');
    setNewPassword('');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Account Settings</h1>
        <p className="text-fp-gray text-sm">Manage security settings, notifications, and privacy options.</p>
      </div>

      {/* Security Section */}
      <Card variant="glass" padding="md" className="space-y-4">
        <h3 className="text-lg font-bold text-fp-white font-display flex items-center gap-2">
          <Lock className="w-5 h-5 text-fp-neon-blue" /> Change Password
        </h3>

        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Min 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit">Update Password</Button>
        </form>
      </Card>

      {/* Notification Preferences */}
      <Card variant="glass" padding="md" className="space-y-4">
        <h3 className="text-lg font-bold text-fp-white font-display flex items-center gap-2">
          <Bell className="w-5 h-5 text-fp-neon-purple" /> Notification Preferences
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-fp-surface/30 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-fp-white">Email Digest</p>
              <p className="text-xs text-fp-gray">Receive weekly summaries of application updates and new projects.</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-5 h-5 accent-fp-neon-blue cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-fp-surface/30 cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-fp-white">Project Match Alerts</p>
              <p className="text-xs text-fp-gray">Instant notification when a project matching your skills is posted.</p>
            </div>
            <input
              type="checkbox"
              checked={projectAlerts}
              onChange={(e) => setProjectAlerts(e.target.checked)}
              className="w-5 h-5 accent-fp-neon-blue cursor-pointer"
            />
          </label>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card variant="glass" padding="md" className="border-fp-neon-pink/30 space-y-3">
        <h3 className="text-lg font-bold text-fp-neon-pink font-display flex items-center gap-2">
          <Trash2 className="w-5 h-5" /> Danger Zone
        </h3>
        <p className="text-xs text-fp-gray">
          Once you delete your account, all earned XP, wallet history, and verified certificates will be permanently removed.
        </p>
        <Button variant="danger" size="sm">Delete Account</Button>
      </Card>
    </motion.div>
  );
}
