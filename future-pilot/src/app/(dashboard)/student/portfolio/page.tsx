/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Portfolio Showcase Page
   Highlight completed industry projects, GitHub repos, live demos
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ExternalLink, Star, Award, Plus } from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_PORTFOLIO_ITEMS = [
  {
    id: 'pf1',
    title: 'Smart Energy Grid Load Balancer',
    category: 'IoT / Embedded Systems',
    description: 'Designed a micro-controller solution predicting peak grid strain using micro-ML models, reducing power surges by 18%.',
    tech: ['C++', 'FreeRTOS', 'TensorFlow Lite', 'MQTT'],
    stars: 14,
    liveUrl: 'https://github.com/example/grid-balancer',
    verifiedByCompany: 'PowerGrid Infra',
  },
  {
    id: 'pf2',
    title: 'Multi-Tenant Fintech Escrow Engine',
    category: 'Web Development',
    description: 'Implemented an automated escrow lock/release engine supporting Razorpay webhooks and milestone approvals.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    stars: 28,
    liveUrl: 'https://github.com/example/escrow-engine',
    verifiedByCompany: 'TechCorp Solutions',
  },
];

export default function StudentPortfolioPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Verified Portfolio</h1>
          <p className="text-fp-gray text-sm">Showcase verified industry projects to future employers.</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Add Custom Project</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_PORTFOLIO_ITEMS.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="premium">{item.category}</Badge>
                  {item.verifiedByCompany && (
                    <span className="text-[10px] text-fp-neon-cyan flex items-center gap-1 bg-fp-neon-cyan/10 px-2 py-0.5 rounded-full border border-fp-neon-cyan/20">
                      <Award className="w-3 h-3" /> Verified by {item.verifiedByCompany}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-fp-white font-display mb-2">{item.title}</h3>
                <p className="text-xs text-fp-gray mb-4 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-fp-surface/60 border border-fp-border/30 text-[10px] text-fp-white">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-fp-border/30 flex items-center justify-between">
                <span className="text-xs text-fp-gray flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-fp-neon-gold" /> {item.stars} Stars
                </span>
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-fp-neon-blue hover:underline flex items-center gap-1"
                >
                  <GithubIcon className="w-4 h-4" /> View Source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
