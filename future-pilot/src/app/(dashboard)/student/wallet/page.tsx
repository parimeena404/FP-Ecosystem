/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Student Escrow Wallet Page
   Balance breakdown, transaction history, withdrawal requests
   ────────────────────────────────────────────────────────────── */
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownRight, ArrowUpRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { formatINR } from '@/lib/utils/format';
import { fadeInUp, staggerContainer } from '@/lib/animations/variants';

const MOCK_TRANSACTIONS = [
  { id: 't1', type: 'Escrow Release', project: 'Full-Stack E-Commerce Escrow Module', amount: 5000, date: 'Yesterday', status: 'completed' },
  { id: 't2', type: 'Milestone Deposit', project: 'Autonomous Drone Flight Telemetry', amount: 10000, date: '3 days ago', status: 'escrow_locked' },
  { id: 't3', type: 'Withdrawal to UPI', project: 'Bank Account ****4920', amount: 12000, date: '1 week ago', status: 'completed' },
];

export default function StudentWalletPage() {
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = () => {
    if (!amount || parseInt(amount) < 500) {
      toast.error('Minimum withdrawal is ₹500.');
      return;
    }
    if (!upiId.trim()) {
      toast.error('Please enter a valid UPI ID or Bank account.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setWithdrawModal(false);
      setAmount('');
      toast.success('Withdrawal request submitted! Processing via Razorpay.');
    }, 1200);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fp-white font-display mb-2">Escrow Wallet</h1>
          <p className="text-fp-gray text-sm">Real-time earnings, escrow holdings, and Razorpay withdrawals.</p>
        </div>
        <Button onClick={() => setWithdrawModal(true)} icon={<ArrowUpRight className="w-4 h-4" />}>
          Withdraw Funds
        </Button>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="glass" padding="md">
          <span className="text-xs font-medium text-fp-gray block mb-1">Available Balance</span>
          <span className="text-3xl font-bold text-fp-neon-cyan font-display">{formatINR(14500)}</span>
          <p className="text-[10px] text-fp-gray mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-fp-neon-cyan" /> Ready for instant bank transfer
          </p>
        </Card>

        <Card variant="glass" padding="md">
          <span className="text-xs font-medium text-fp-gray block mb-1">Locked in Escrow</span>
          <span className="text-3xl font-bold text-fp-neon-gold font-display">{formatINR(28000)}</span>
          <p className="text-[10px] text-fp-gray mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-fp-neon-gold" /> Protected until milestone completion
          </p>
        </Card>

        <Card variant="glass" padding="md">
          <span className="text-xs font-medium text-fp-gray block mb-1">Lifetime Earnings</span>
          <span className="text-3xl font-bold text-fp-neon-purple font-display">{formatINR(54500)}</span>
          <p className="text-[10px] text-fp-gray mt-2">Across 6 completed projects</p>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-fp-white font-display">Recent Transactions</h2>
        <Card variant="glass" padding="none">
          <div className="divide-y divide-fp-border/30">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${tx.type.includes('Withdrawal') ? 'bg-fp-neon-pink/10 text-fp-neon-pink' : 'bg-fp-neon-cyan/10 text-fp-neon-cyan'}`}>
                    {tx.type.includes('Withdrawal') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-fp-white text-sm">{tx.type}</h4>
                    <p className="text-xs text-fp-gray">{tx.project} • {tx.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-bold font-mono text-sm ${tx.type.includes('Withdrawal') ? 'text-fp-neon-pink' : 'text-fp-neon-cyan'}`}>
                    {tx.type.includes('Withdrawal') ? '-' : '+'}{formatINR(tx.amount)}
                  </span>
                  <Badge variant={tx.status === 'completed' ? 'success' : 'warning'} className="block ml-auto mt-1">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Withdrawal Modal */}
      <Modal
        isOpen={withdrawModal}
        onClose={() => setWithdrawModal(false)}
        title="Withdraw Funds"
        description="Transfer your earnings directly to your bank account via UPI / IMPS."
      >
        <div className="space-y-4">
          <Input
            label="Withdrawal Amount (₹)"
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            label="UPI ID / VPA"
            placeholder="e.g. student@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setWithdrawModal(false)}>Cancel</Button>
            <Button loading={loading} onClick={handleWithdraw}>Confirm Withdrawal</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
