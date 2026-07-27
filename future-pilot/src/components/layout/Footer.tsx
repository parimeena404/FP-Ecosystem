/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Footer
   Premium footer with newsletter, links, and branding
   ────────────────────────────────────────────────────────────── */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

const footerLinks = {
  Platform: [
    { label: 'For Students', href: '#student-journey' },
    { label: 'For Companies', href: '#company-journey' },
    { label: 'For Colleges', href: '#' },
    { label: 'For Mentors', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Help Center', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#mission' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Press Kit', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-fp-dark border-t border-fp-border/20">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fp-neon-blue/10 via-fp-neon-purple/10 to-fp-neon-cyan/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-fp-white mb-4"
          >
            Ready to launch your career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-fp-gray mb-8 max-w-lg mx-auto"
          >
            Join thousands of students already building their future with real projects and real income.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/register"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-fp-neon-blue to-fp-neon-purple text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all"
            >
              Get Started Free
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl border-2 border-fp-border text-fp-white font-semibold hover:border-fp-neon-blue/50 transition-all"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fp-neon-blue to-fp-neon-purple flex items-center justify-center text-white font-bold text-lg font-display">
                FP
              </div>
              <div>
                <span className="text-fp-white font-display font-bold text-lg">Future Pilot</span>
                <p className="text-fp-gray text-[10px] tracking-widest uppercase">Ecosystem</p>
              </div>
            </div>
            <p className="text-sm text-fp-gray leading-relaxed max-w-xs mb-6">
              {siteConfig.description}
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-fp-surface/50 border border-fp-border/20 flex items-center justify-center text-fp-gray hover:text-fp-neon-blue hover:border-fp-neon-blue/30 transition-all text-xs"
                  aria-label={platform}
                >
                  {platform[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-fp-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-fp-gray hover:text-fp-neon-blue transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-fp-border/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fp-gray">
            © {new Date().getFullYear()} Future Pilot. All rights reserved.
          </p>
          <p className="text-xs text-fp-gray/50">
            Built with ❤️ at IET DAVV, Indore
          </p>
        </div>
      </div>
    </footer>
  );
}
