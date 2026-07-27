/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Razorpay Payment & Escrow SDK Integration
   Razorpay order creation, HMAC signature verification, and payouts
   ────────────────────────────────────────────────────────────── */

import crypto from 'crypto';

export interface RazorpayOrderOptions {
  amount: number; // in INR rupees (will be converted to paise)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface PaymentVerificationOptions {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  secret: string;
}

/**
 * Creates a Razorpay Order payload for frontend checkout
 */
export function createRazorpayOrderPayload(options: RazorpayOrderOptions) {
  const amountInPaise = Math.round(options.amount * 100);
  return {
    amount: amountInPaise,
    currency: options.currency || 'INR',
    receipt: options.receipt,
    notes: {
      platform: 'Future Pilot Ecosystem',
      ...options.notes,
    },
  };
}

/**
 * Verifies Razorpay payment signature using HMAC SHA256
 */
export function verifyRazorpayPaymentSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  secret,
}: PaymentVerificationOptions): boolean {
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return expectedSignature === razorpaySignature;
}

/**
 * Verifies Razorpay Webhook signature
 */
export function verifyRazorpayWebhookSignature(
  webhookBody: string,
  webhookSignature: string,
  webhookSecret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(webhookBody)
    .digest('hex');

  return expectedSignature === webhookSignature;
}
