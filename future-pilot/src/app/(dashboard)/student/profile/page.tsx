/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Profile Page
   Personal info, college details, skills, resume, and public view
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, MapPin, Globe, Edit2, CheckCircle2 } from 'lucide-react';

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
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

export default function StudentProfilePage() {
  const { user, studentProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || 'Student Pilot');
  const [branch, setBranch] = useState(studentProfile?.branch || 'Computer Science');
  const [college, setCollege] = useState('IET DAVV, Indore');

  const handleSave = () => {
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Card Header */}
      <Card variant="glass" padding="lg" className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar name={name} src={user?.photoURL} size="xl" levelColor="#00D4FF" />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <h1 className="text-2xl font-bold text-fp-white font-display">{name}</h1>
              <Badge variant="premium">Builder • Level 3</Badge>
            </div>

            <p className="text-xs text-fp-gray flex items-center justify-center sm:justify-start gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {branch} • {college}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-fp-gray hover:text-fp-white transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-fp-gray hover:text-fp-white transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://futurepilot.in" target="_blank" rel="noreferrer" className="text-fp-gray hover:text-fp-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={() => setEditing(!editing)} icon={<Edit2 className="w-4 h-4" />}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </Card>

      {/* Profile Form / Content */}
      {editing ? (
        <Card variant="glass" padding="md" className="space-y-4">
          <h3 className="text-lg font-bold text-fp-white font-display">Edit Information</h3>
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="College" value={college} onChange={(e) => setCollege(e.target.value)} />
          <Input label="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
          <div className="flex justify-end pt-2">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="glass" padding="md" className="space-y-3">
            <h3 className="font-semibold text-fp-white font-display">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'TailwindCSS', 'Firebase', 'Git'].map((s) => (
                <span key={s} className="px-3 py-1 rounded-xl bg-fp-surface border border-fp-border/40 text-xs text-fp-white">
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card variant="glass" padding="md" className="space-y-3">
            <h3 className="font-semibold text-fp-white font-display">Verification Status</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-xl bg-fp-surface/30">
                <span className="text-fp-gray">College Student ID</span>
                <span className="text-fp-neon-cyan font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-fp-surface/30">
                <span className="text-fp-gray">Email Address</span>
                <span className="text-fp-neon-cyan font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
