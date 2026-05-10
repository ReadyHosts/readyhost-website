import React from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import StepList from "../components/StepList.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";

const PAINS = [
  {
    title: "Hiring your own cleaners",
    body: "Turnover, insurance, scheduling, payroll, no-shows. You wanted a property business, not an HR department.",
  },
  {
    title: "Juggling 4–5 vendors",
    body: "Different quality. Different pricing. Different communication apps. Owner complaints stack up while you mediate.",
  },
  {
    title: "Crossing fingers mid-week",
    body: "One callout on a peak weekend and the whole schedule tilts. There's no bench, no plan B, no breathing room.",
  },
  {
    title: "Every gap costs you",
    body: "Empty nights. Late checkins. Refund requests. Dropping reviews. Margins evaporate one missed turnover at a time.",
  },
];

const SOLUTIONS = [
  {
    title: "Daily turnover coordination",
    body:
      "We own the schedule across your entire portfolio. One cleaner per building for route efficiency. 11am–3pm checkout-to-checkin window guaranteed. No vendor juggling on your end.",
  },
  {
    title: "Multi-property dashboard",
    body:
      "Every unit at a glance — clean, in-progress, blocked. Bulk-assign cleanings. Photo verification on every turnover. You see the portfolio status before any owner asks.",
  },
  {
    title: "Predictable pricing",
    body:
      "Fixed daily rate per unit. No hidden fees, no surge pricing, no add-on traps. Volume tiers for 30+ units. Weekly invoicing direct to your accounting.",
  },
  {
    title: "Reliable, trained team",
    body:
      "Background-checked, uniformed crews trained on hotel housekeeping SOPs — not 'apartment clean'. Bench capacity 7 days a week so a callout is our problem, not yours.",
  },
  {
    title: "Real-time coordination",
    body:
      "Owner has a damage concern? We document with photos. Early checkin? We coordinate. Late checkout? We reschedule the next turnover. You're never in the dark.",
  },
  {
    title: "Owner-ready reporting",
    body:
      "Monthly summary per unit — turnovers completed, quality score, photo gallery, damage flags. Forward to owners directly if you want, or keep the dashboard for yourself.",
  },
];

const STEPS = [
  {
    title: "Connect your portfolio",
    body:
      "Tell us how many units, which buildings, the bedroom mix. We assess your daily volume, assign dedicated cleaner(s) per building, set up your dashboard login and bulk-assign workflow.",
  },
  {
    title: "We take it from there",
    body:
      "Daily app-based assignment system queues your cleanings inside the 11am–3pm window. Photo verification after every turnover, real-time status updates, exception alerts when something needs your attention.",
  },
  {
    title: "Monthly reporting & billing",
    body:
      "Dashboard summary across the portfolio, monthly invoice (fixed per-unit cost plus any pre-approved extras), optional owner-ready reports. Quarterly optimization call to right-size assignments as your portfolio shifts.",
  },
];

const PILLARS = [
  {
    title: "Reliability",
    body:
      "95%+ same-day turnaround SLA. Bench capacity 7 days a week. Trained team, not gig workers. App-coordinated dispatch eliminates the miscommunication tax.",
  },
  {
    title: "Simplicity",
    body:
      "One vendor across your entire portfolio. Fixed monthly rate, no surprises. One contact person — us. No more vendor juggling, no more cross-platform threads.",
  },
  {
    title: "Transparency",
    body:
      "Photo verification on every clean. Real-time dashboard status. Monthly performance reports. Damage flags documented with photos and mitigation steps.",
  },
  {
    title: "Professionalism",
    body:
      "Background-checked, uniformed team. Hotel housekeeping SOPs. Insured and bonded. Dedicated account manager for portfolios over 30 units.",
  },
];

const FAQS = [
  {
    q: "How do you handle units spread across multiple buildings?",
    a: "We assign dedicated cleaners per building or building cluster. Same crew on the same building means consistent standards, faster routes, and stronger relationships with on-site staff (concierges, security, maintenance).",
  },
  {
    q: "What if an owner has a special request — rush check-in, deep clean, restocking?",
    a: "You assign the request in the dashboard, we coordinate. Most special requests are handled within 2 hours of submission. Same-day urgent requests routed to bench capacity.",
  },
  {
    q: "Do you report directly to owners?",
    a: "No — you're our client. Reports go to you. If you want to share dashboards or forward monthly summaries to owners, that's your call. We make the reports owner-ready, but the relationship stays with you.",
  },
  {
    q: "What if a cleaner doesn't show up?",
    a: "We hold bench capacity specifically to absorb this. If a primary cleaner can't make a job, the dashboard auto-reassigns to a bench cleaner within 30 minutes — typically before you'd even notice. Documented in the daily summary.",
  },
  {
    q: "Can we use this with our existing cleaners?",
    a: "Generally no for the PMC offering — we manage the team end-to-end so we can guarantee the SLA. If you have an existing crew you want to integrate, that's a different conversation (the broader Property Manager offering covers BYO cleaners).",
  },
  {
    q: "What's the contract term?",
    a: "Month-to-month. No long-term lock-in. Cancel anytime with 30 days notice. Volume-discounted pricing typically anchors a 6-month term, but base service is month-to-month.",
  },
  {
    q: "What areas do you currently service?",
    a: "Broward, Miami-Dade, and Palm Beach counties. We're expanding into the Orlando market in Q3 2026 — reach out early if you have units there and want to be a launch partner.",
  },
];

export default function ForPMCs() {
  return (
    <>
      <PageHero
        eyebrow="For Property Management Companies"
        headline="Manage 50 Airbnb units"
        highlight="like a single hotel property."
        sub="One vendor. One daily rate. Zero scheduling chaos. ReadyHost handles all turnover coordination across your portfolio so you can run the business, not the housekeeping department."
        bgImage="/pm-hero.jpg"
        primaryLabel="Get a Custom Quote"
        primaryTo="/contact?type=pm"
        secondaryLabel="See How It Works"
        secondaryTo="/for-pmcs#how-it-works"
      />

      {/* Problem */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Reality"
            title="Running cleaners manually across 20+ units? Here's what's breaking."
            sub="You manage units across 3–5 buildings. Each needs same-day turnover. The math behind your current setup quietly works against you every week."
          />
          <FeatureGrid items={PAINS} columns={4} dense />
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Solution"
            title="One vendor. All your units. Guaranteed coordination."
            sub="We specialize in multi-unit coordination for property management companies. Think of us as your outsourced housekeeping department — without the headcount."
          />
          <FeatureGrid items={SOLUTIONS} columns={3} />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="How it works"
                title="Simple setup. Hands-off operation."
                sub="Most portfolios go from kickoff call to full coordination inside a week. After that, your involvement is monthly review calls and exception handling."
              />
            </div>
            <div className="lg:col-span-7">
              <StepList items={STEPS} />
            </div>
          </div>
        </div>
      </section>

      {/* Why ReadyHost */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why ReadyHost"
            title="Built for multi-unit coordination. Not Airbnb hosting."
            sub="Cleaning companies built around individual hosts choke when you stack 30 units on top of them. We were built for portfolio scale from day one."
          />
          <FeatureGrid items={PILLARS} columns={4} dense />
        </div>
      </section>

      {/* Integrates with */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Integrates With"
            title="Your existing stack, plugged in."
            sub="We connect to the property management, OTA, and accounting tools you already run. Custom integrations available for enterprise portfolios."
            align="center"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: "Hospitable", category: "PMS" },
              { name: "Hostfully", category: "PMS" },
              { name: "Guesty", category: "PMS" },
              { name: "Turno", category: "PMS" },
              { name: "OwnerRez", category: "PMS" },
              { name: "Airbnb", category: "OTA" },
              { name: "Vrbo", category: "OTA" },
              { name: "QuickBooks", category: "Accounting" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="group flex flex-col items-center justify-center text-center px-4 py-6 sm:py-8 rounded-2xl bg-[#f5f5f5] border border-gray-200/60 motion-safe:transition-all motion-safe:duration-200 hover:bg-white hover:border-[#1B6C72]/40 hover:shadow-lg motion-safe:hover:-translate-y-0.5 lg:hover:scale-[1.03]"
                aria-label={`Integrates with ${tool.name}`}
              >
                <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
                  {tool.name}
                </span>
                <span className="mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#1B6C72]/80 group-hover:text-[#FF6B35] transition-colors">
                  {tool.category}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't see your tool? <a href="/contact?type=pm" className="text-[#1B6C72] font-semibold hover:underline">Ask about a custom integration</a>.
          </p>
        </div>
      </section>

      {/* Service Area / Add-ons summary band */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">Service Area</div>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-gray-900">Broward · Miami-Dade · Palm Beach</p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">Currently serving the South Florida tri-county short-term rental market. Expanding Q3 2026.</p>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">Add-ons available</div>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-gray-900">Linens · Restock · Deep clean · Laundry</p>
              <p className="mt-2 text-sm sm:text-base text-gray-600">Configure per property. Add to any turnover via the dashboard. Billed alongside your monthly invoice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions from PMCs." align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        eyebrow="For Property Management Companies"
        title="Ready to stop managing cleaners?"
        sub="Get a custom quote for your portfolio. We'll analyze your daily volume, propose dedicated cleaner assignments per building, and lock in your monthly rate."
        primaryLabel="Get a Custom Quote"
        primaryTo="/contact?type=pm"
        secondaryLabel="Schedule a 15-min Call"
      />
    </>
  );
}
