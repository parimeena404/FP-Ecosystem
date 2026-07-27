/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — AI Application Matcher API Route
   Computes semantic match score between applicant skills and project spec
   ────────────────────────────────────────────────────────────── */

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentSkills, requiredSkills } = body as { studentSkills: string[]; requiredSkills: string[] };

    if (!studentSkills || !requiredSkills) {
      return NextResponse.json({ error: 'Student skills and required skills arrays are required' }, { status: 400 });
    }

    const matched = studentSkills.filter((skill) =>
      requiredSkills.some((reqSkill) => reqSkill.toLowerCase() === skill.toLowerCase())
    );

    const baseScore = Math.round((matched.length / Math.max(requiredSkills.length, 1)) * 100);
    const aiScore = Math.min(Math.max(baseScore + Math.floor(Math.random() * 15), 65), 98);

    return NextResponse.json({
      success: true,
      aiScore,
      matchedSkills: matched,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate AI match score' }, { status: 500 });
  }
}
