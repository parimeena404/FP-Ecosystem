/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Certificate Verification API Route
   Public API verifying digital certificate authenticity by code
   ────────────────────────────────────────────────────────────── */

import { NextResponse } from 'next/server';
import { verifyCertificate } from '@/services/certificate.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Certificate code is required' }, { status: 400 });
  }

  try {
    const cert = await verifyCertificate(code);

    if (!cert) {
      return NextResponse.json({
        valid: false,
        message: 'Certificate not found or unverified',
      }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      certificate: cert,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify certificate' }, { status: 500 });
  }
}
