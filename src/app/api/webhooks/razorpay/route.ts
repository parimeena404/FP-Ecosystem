/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Razorpay Webhook API Route
   Handles payment.captured, order.paid, and payout.processed events
   ────────────────────────────────────────────────────────────── */

import { NextResponse } from 'next/server';
import { verifyRazorpayWebhookSignature } from '@/lib/payments/razorpay';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'fp_webhook_secret_dev';

    if (signature && !verifyRazorpayWebhookSignature(rawBody, signature, webhookSecret)) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    switch (event) {
      case 'payment.captured':
      case 'order.paid': {
        const paymentEntity = payload.payload.payment.entity;
        console.log(`[Razorpay Webhook] Payment Captured: ${paymentEntity.id} for Order: ${paymentEntity.order_id}`);
        // Handle escrow locking in database
        break;
      }

      case 'payout.processed': {
        const payoutEntity = payload.payload.payout.entity;
        console.log(`[Razorpay Webhook] Payout Processed: ${payoutEntity.id} for Student`);
        break;
      }

      default:
        console.log(`[Razorpay Webhook] Unhandled event: ${event}`);
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error) {
    console.error('[Razorpay Webhook Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
