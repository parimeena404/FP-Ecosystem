/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Projects Browser Page
   Browse, filter by category/difficulty/reward, search, and apply
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, Clock, Award, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { formatINR, formatXP } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Autonomous Drone Flight Telemetry Dashboard',
    company: 'AeroTech Robotics',
    category: 'IoT & Web',
    difficulty: 'Intermediate',
    reward: 35000,
    xp: 2500,
    deadline: '14 days left',
    skills: ['React', 'WebSockets', 'Three.js', 'Python'],
    isRemote: true,
    description: 'Build a high-performance web dashboard displaying real-time 3D flight paths and telemetry metrics for autonomous inspection drones.',
  },
  {
    id: '2',
    title: 'AI Resume Screener & Skill Matcher Microservice',
    company: 'TalentScale AI',
    category: 'AI/ML',
    difficulty: 'Advanced',
    reward: 45000,
    xp: 3500,
    deadline: '20 days left',
    skills: ['Python', 'FastAPI', 'PyTorch', 'LangChain'],
    isRemote: true,
    description: 'Develop an NLP pipeline to extract candidate skills from PDF resumes and calculate semantic match scores against job requirements.',
  },
  {
    id: '3',
    title: 'EV Battery Thermal Management Simulator',
    company: 'GreenMobility Motors',
    category: 'Electronics',
    difficulty: 'Beginner',
    reward: 20000,
    xp: 1500,
    deadline: '7 days left',
    skills: ['MATLAB', 'Simulink', 'C++'],
    isRemote: false,
    description: 'Model thermal dissipation across lithium-ion cells under fast charging conditions.',
  },
];

export default function StudentProjectsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [applyingProject, setApplyingProject] = useState<typeof MOCK_PROJECTS[0] | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = ['All', 'IoT & Web', 'AI/ML', 'Electronics', 'Mobile App'];

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      toast.error('Please include a short cover letter.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplyingProject(null);
      setCoverLetter('');
      toast.success('Application submitted successfully!');
    }, 1200);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Industry Projects</h1>
        <p className="text-fp-gray text-sm">Work on real paid projects from top companies and earn XP.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between bg-fp-dark/60 p-4 rounded-2xl border border-fp-border/30">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fp-gray" />
          <input
            type="text"
            placeholder="Search by title or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-fp-surface/50 border border-fp-border/40 rounded-xl pl-9 pr-4 py-2 text-sm text-fp-white placeholder-fp-gray/50 focus:outline-none focus:border-fp-neon-blue/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-fp-neon-blue text-fp-black font-semibold'
                  : 'bg-fp-surface/40 text-fp-gray hover:text-fp-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="info">{project.category}</Badge>
                  <span className="text-xs text-fp-gray flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {project.deadline}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-fp-white font-display mb-1">{project.title}</h3>
                <p className="text-xs text-fp-neon-purple font-medium mb-3">{project.company}</p>
                <p className="text-xs text-fp-gray mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded-md bg-fp-surface/60 border border-fp-border/30 text-[10px] text-fp-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-fp-border/30 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-fp-neon-cyan font-display">{formatINR(project.reward)}</span>
                  <span className="text-xs text-fp-gray ml-2">+{formatXP(project.xp)}</span>
                </div>

                <Button size="sm" onClick={() => setApplyingProject(project)}>
                  Apply Now
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={!!applyingProject}
        onClose={() => setApplyingProject(null)}
        title={`Apply to ${applyingProject?.title}`}
        description={`Company: ${applyingProject?.company} • Reward: ${formatINR(applyingProject?.reward || 0)}`}
      >
        <div className="space-y-4">
          <Textarea
            label="Cover Letter / Proposal"
            placeholder="Explain why you're a great fit for this project and your relevant experience..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={5}
          />

          <div className="p-3 rounded-xl bg-fp-surface/30 border border-fp-border/30 text-xs text-fp-gray space-y-1">
            <p className="flex items-center gap-1.5 text-fp-neon-cyan font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Escrow Protected Payment
            </p>
            <p>Funds are locked in escrow prior to project start and released per milestone approval.</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setApplyingProject(null)}>Cancel</Button>
            <Button loading={submitting} onClick={handleApply}>Submit Application</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
