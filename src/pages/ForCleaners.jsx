import React from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import StepList from "../components/StepList.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";

const FEATURES = [
  { title: "Real-time job queue", body: "New jobs pinged to your app. Accept or decline — no awkward texts, no chasing." },
  { title: "GPS to the property", body: "One tap from job card to navigation. Address, parking notes, gate codes — all in the app." },
  { title: "Task checklists", body: "Property-specific checklist tells you exactly what to clean, where supplies live, and what to flag." },
  { title: "Photo documentation", body: "Snap before/after photos in-app. They go straight to the host — and back you up if anything's questioned." },
  { title: "Auto clock in/out", body: "Tap arrive, tap complete. Time tracked automatically. No timesheets, no math." },
  { title: "Direct messaging", body: "Reach the host or property manager without sharing your number. Conversation history saved." },
  { title: "Earnings tracking", body: "Every job, every payment, every bonus — visible in your wallet tab. Know your week before payday." },
  { title: "Performance bonuses", body: "Top performers earn $50–$200/month bonus on top of base pay. On-time rate, photo quality, ratings all factor in." },
  { title: "Referral program", body: "Bring on another cleaner — earn $100–$200 per active referral after their first 10 jobs." },
];

const STEPS = [
  { title: "Apply + background check", body: "Quick application, ID verification, background check (we cover the cost). Approval in 2–5 business days." },
  { title: "Onboarding & training", body: "Half-day orientation: app walkthrough, hotel-grade SOPs, photo standards. Paid." },
  { title: "Download app, start accepting jobs", body: "First-day shadow with a senior cleaner, then you're live. Accept the jobs that fit your schedule." },
  { title: "Get paid weekly", body: "Direct deposit every Friday. See exactly which jobs and bonuses are in each payout." },
];

const REQUIREMENTS = [
  { title: "18+ with valid ID", body: "And clear background check (we run it)." },
  { title: "Reliable transportation", body: "You need to get to the properties. Vehicle preferred but not required in dense Miami Beach / Brickell areas." },
  { title: "Attention to detail", body: "Hotel standards, not residential. If you can spot a dust streak on a baseboard, we want you." },
  { title: "Excellent communication", body: "Show up on time. Reply to messages. Flag issues. The basics, executed reliably." },
];

const FAQS = [
  { q: "How often will I get work?", a: "Depends on your availability and rating. Cleaners with 5-day open availability and 4.8★+ ratings typically run 4–6 jobs per day. Part-timers can pick up 2–3 jobs daily on the days they're free." },
  { q: "How much do I earn per job?", a: "Base pay ranges $30–$60 per turnover depending on property size and complexity. Add same-day urgent +$10, and performance bonuses on top. Top cleaners clear $1,200–$1,800/week." },
  { q: "What if I can't complete a job?", a: "Cancel from the app at least 4 hours out — no penalty. Last-minute cancellations affect your reliability score and bonus eligibility." },
  { q: "How do bonuses work?", a: "Monthly bonus pool tied to four metrics: on-time rate (95%+), photo quality (audit pass rate), guest/host rating average, and total job count. Top performers earn $50–$200/month on top of base." },
  { q: "Do I need my own supplies?", a: "Standard supplies (cleaning chemicals, microfibers, vacuum) are property-stocked or provided by us. You bring your work ethic." },
];

export default function ForCleaners() {
  return (
    <>
      <PageHero
        eyebrow="For Cleaners"
        headline="Join ReadyHost and grow"
        highlight="your cleaning business."
        sub="Consistent work. Fair pay. The app and tools to actually do the job well."
        bgImage="/fleet-work2.jpg"
        primaryLabel="Apply to Join"
        primaryTo="/contact?type=cleaner"
        secondaryLabel="Earnings & Benefits"
        secondaryTo="/for-cleaners#earnings"
      />

      {/* Pain */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
            The Reality
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Stop chasing gigs. Let gigs come to you.
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Most cleaning gigs are inconsistent, low-paying, and require you to be your own dispatcher, accountant, and chaser of unpaid invoices. ReadyHost handles all of it. You clean. We send work, send pay, and back you up when something goes sideways.
          </p>
        </div>
      </section>

      {/* App Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What you get"
            title="The ReadyHost cleaner app."
            sub="Built for the people doing the work, not the people watching from a desk."
          />
          <FeatureGrid items={FEATURES} columns={3} />
        </div>
      </section>

      {/* Earnings */}
      <section id="earnings" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Earnings"
                title="Real money for real work."
                sub="No middleman taking 30%. No 1099 surprises. Pay structure is transparent and posted in your app at all times."
              />
              <ul className="space-y-4 text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ background: "#FF6B35" }} />
                  <span><strong className="text-gray-900">Base pay:</strong> $30–$60 per turnover (varies by size & complexity)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ background: "#FF6B35" }} />
                  <span><strong className="text-gray-900">Urgent / same-day uplift:</strong> +$10 per qualifying job</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ background: "#FF6B35" }} />
                  <span><strong className="text-gray-900">Monthly bonus:</strong> $50–$200 for top performers (on-time rate, photo quality, ratings)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ background: "#FF6B35" }} />
                  <span><strong className="text-gray-900">Referral bonus:</strong> $100–$200 per active referral after their first 10 jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ background: "#FF6B35" }} />
                  <span><strong className="text-gray-900">Pay schedule:</strong> Direct deposit every Friday</span>
                </li>
              </ul>
              <p className="mt-6 p-4 rounded-xl bg-[#1B6C72]/5 border border-[#1B6C72]/20 text-sm text-gray-700">
                <strong className="text-[#1B6C72]">Typical day:</strong> 4–5 properties cleaned = <strong>$150–$250</strong> + bonuses on top.
                Full-time cleaners with 5★ ratings clear <strong>$1,200–$1,800/week</strong>.
              </p>
            </div>
            <div>
              <img src="/fleet-work2.jpg" alt="ReadyHost cleaner" loading="lazy" decoding="async" className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover rounded-2xl sm:rounded-3xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Path to your first paycheck" title="Four steps. About a week." />
          <StepList items={STEPS} />
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Requirements" title="What we need from you." />
          <FeatureGrid items={REQUIREMENTS} columns={4} dense />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions from cleaners." align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        eyebrow="For Cleaners"
        title="Ready to clean for ReadyHost?"
        sub="Apply now. Background check is on us. Approval in 2–5 business days."
        primaryLabel="Apply to Join"
        primaryTo="/contact?type=cleaner"
      />
    </>
  );
}
