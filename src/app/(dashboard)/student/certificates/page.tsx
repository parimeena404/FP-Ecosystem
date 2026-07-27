/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Certificates Page
   Verified digital certificates issued by companies & colleges
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_CERTIFICATES = [
  {
    id: 'c1',
    title: 'Full-Stack Engineering Excellence',
    issuedBy: 'TechCorp Solutions',
    date: 'July 15, 2026',
    code: 'FP-CERT-2026-8841',
    verified: true,
  },
  {
    id: 'c2',
    title: 'Embedded IoT Firmware Developer',
    issuedBy: 'PowerGrid Infra',
    date: 'June 02, 2026',
    code: 'FP-CERT-2026-3190',
    verified: true,
  },
];

export default function StudentCertificatesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Verified Certificates</h1>
        <p className="text-fp-gray text-sm">Official certificates automatically issued upon milestone completion.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_CERTIFICATES.map((cert) => (
          <motion.div key={cert.id} variants={fadeInUp}>
            <Card variant="glass" padding="md" hover className="h-full flex flex-col justify-between border-fp-neon-blue/30">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-fp-neon-blue/10 border border-fp-neon-blue/30 text-fp-neon-blue">
                    <Award className="w-8 h-8" />
                  </div>
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Verified</Badge>
                </div>

                <h3 className="text-xl font-bold text-fp-white font-display mb-1">{cert.title}</h3>
                <p className="text-xs text-fp-neon-purple font-medium mb-3">Issued by {cert.issuedBy}</p>
                <p className="text-xs text-fp-gray mb-6 font-mono">Verification Code: {cert.code}</p>
              </div>

              <div className="pt-4 border-t border-fp-border/30 flex items-center justify-between">
                <span className="text-xs text-fp-gray">{cert.date}</span>
                <div className="flex gap-2">
                  <Button size="xs" variant="outline" icon={<Share2 className="w-3.5 h-3.5" />}>Share</Button>
                  <Button size="xs" icon={<Download className="w-3.5 h-3.5" />}>Download PDF</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
