/* ──────────────────────────────────────────────────────────────
   FUTURE PILOT — Landing Page
   Assembles all 22 sections into a cinematic experience
   ────────────────────────────────────────────────────────────── */

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Vision from '@/components/sections/Vision';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import IndustryChallenges from '@/components/sections/IndustryChallenges';
import StudentJourney from '@/components/sections/StudentJourney';
import CompanyJourney from '@/components/sections/CompanyJourney';
import HowItWorks from '@/components/sections/HowItWorks';
import AnimatedWorkflow from '@/components/sections/AnimatedWorkflow';
import MoneyFlow from '@/components/sections/MoneyFlow';
import SelectionProcess from '@/components/sections/SelectionProcess';
import Technology from '@/components/sections/Technology';
import Achievements from '@/components/sections/Achievements';
import PartnerColleges from '@/components/sections/PartnerColleges';
import IndustryPartners from '@/components/sections/IndustryPartners';
import Testimonials from '@/components/sections/Testimonials';
import Roadmap from '@/components/sections/Roadmap';
import { Impact, FutureVision } from '@/components/sections/ImpactAndVision';
import FAQs from '@/components/sections/FAQs';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Act 1: The Hook ────────────────────────────── */}
        <Hero />
        <Mission />
        <Vision />

        {/* ── Act 2: The Problem ─────────────────────────── */}
        <Problem />
        <IndustryChallenges />

        {/* ── Act 3: The Solution ────────────────────────── */}
        <Solution />
        <HowItWorks />
        <StudentJourney />
        <CompanyJourney />

        {/* ── Act 4: The Details ─────────────────────────── */}
        <AnimatedWorkflow />
        <MoneyFlow />
        <SelectionProcess />

        {/* ── Act 5: The Proof ───────────────────────────── */}
        <Technology />
        <Achievements />
        <PartnerColleges />
        <IndustryPartners />
        <Testimonials />

        {/* ── Act 6: The Future ──────────────────────────── */}
        <Roadmap />
        <Impact />
        <FutureVision />

        {/* ── Act 7: The Call ─────────────────────────────── */}
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
