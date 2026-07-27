/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Contact Section
   Glassmorphic contact form with animated background
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/animations/TextReveal';
import MagneticButton from '@/components/animations/MagneticButton';
import { siteConfig } from '@/config/site';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Integrate with API
  };

  return (
    <section id="contact" className="relative py-32 bg-fp-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fp-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-fp-neon-blue tracking-widest uppercase mb-4"
          >
            Get In Touch
          </motion.span>
          <TextReveal
            text="Ready To Join The Revolution?"
            as="h2"
            className="text-4xl md:text-5xl font-display font-bold text-fp-white leading-tight"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-fp-white mb-4">
                Let&apos;s build the future together
              </h3>
              <p className="text-fp-gray leading-relaxed">
                Whether you&apos;re a student looking for opportunities, a company seeking talent,
                or a college wanting to partner — we&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: '📧', label: 'Email', value: siteConfig.contact.email },
                { icon: '📍', label: 'Location', value: 'IET DAVV, Indore, MP, India' },
                { icon: '🌐', label: 'Website', value: siteConfig.url },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-fp-dark/50 border border-fp-border/20">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-fp-gray">{item.label}</p>
                    <p className="text-sm font-medium text-fp-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-fp-surface border border-fp-border/20 flex items-center justify-center text-fp-gray hover:text-fp-neon-blue hover:border-fp-neon-blue/30 transition-all"
                >
                  <span className="text-sm capitalize">{platform[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center p-12 rounded-3xl bg-fp-dark/60 backdrop-blur-xl border border-fp-neon-cyan/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-6xl mb-6"
                >
                  🚀
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-fp-white mb-2">Message Sent!</h3>
                <p className="text-fp-gray text-center">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-fp-dark/60 backdrop-blur-xl border border-fp-border/30 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-fp-gray mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-fp-surface/50 border border-fp-border/30 text-fp-white placeholder:text-fp-gray/50 focus:outline-none focus:border-fp-neon-blue/50 focus:ring-1 focus:ring-fp-neon-blue/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-fp-gray mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-fp-surface/50 border border-fp-border/30 text-fp-white placeholder:text-fp-gray/50 focus:outline-none focus:border-fp-neon-blue/50 focus:ring-1 focus:ring-fp-neon-blue/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-fp-gray mb-2">I am a</label>
                  <select
                    required
                    value={formState.role}
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-fp-surface/50 border border-fp-border/30 text-fp-white focus:outline-none focus:border-fp-neon-blue/50 focus:ring-1 focus:ring-fp-neon-blue/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-fp-dark">Select your role</option>
                    <option value="student" className="bg-fp-dark">Student</option>
                    <option value="company" className="bg-fp-dark">Company</option>
                    <option value="college" className="bg-fp-dark">College Representative</option>
                    <option value="mentor" className="bg-fp-dark">Mentor</option>
                    <option value="other" className="bg-fp-dark">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-fp-gray mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-fp-surface/50 border border-fp-border/30 text-fp-white placeholder:text-fp-gray/50 focus:outline-none focus:border-fp-neon-blue/50 focus:ring-1 focus:ring-fp-neon-blue/20 transition-all resize-none"
                    placeholder="Tell us what you're interested in..."
                  />
                </div>

                <MagneticButton variant="primary" size="lg" onClick={() => {}} strength={0.15}>
                  Send Message
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
