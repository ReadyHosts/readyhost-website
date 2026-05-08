import React from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import StepList from "../components/StepList.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";

const CHALLENGES = [
  { title: "Spreadsheet chaos", body: "Coordinating cleaners across 20+ properties with WhatsApp + Google Sheets. Things slip. Constantly." },
  { title: "Inconsistent quality", body: "Different cleaner per week, different standard each time. Owner complaints follow the inconsistency." },
  { title: "Missed turnarounds = lost revenue", body: "Property unbookable for an extra night because no one knew the cleaner cancelled." },
  { title: "No visibility, no accountability", body: "When something goes wrong, you can't tell who, when, or why. No paper trail to fix it." },
];

const PLATFORM_FEATURES = [
  { title: "Multi-property dashboard", body: "All your properties in one view. Status of every active turnover, every pending dispatch, every flag." },
  { title: "Bulk job assignment", body: "Assign 30 turnovers to your team in two clicks. Auto-routing for new properties." },
  { title: "Team management", body: "Hire, schedule, rate cleaners. Track performance over time. Promote your top performers." },
  { title: "Performance analytics", body: "On-time rate, photo audit pass rate, hours-per-property, cost-per-clean. Drill into any metric." },
  { title: "Photo verification", body: "Every room photo-verified before guest check-in. Audit trail per property and per cleaner." },
  { title: "Automated invoicing", body: "Cleaning fees aggregated by property, owner, or portfolio. Export to QuickBooks or your AP system." },
  { title: "SLA reporting", body: "Define service levels per property or owner. Auto-flagged when exceptions happen, monthly compliance reports." },
  { title: "Smart alerts", body: "Cleaner running late? Photos missing? Quality flagged? You get notified before the owner does." },
  { title: "PMS integration", body: "Two-way sync with Hospitable, Hostfully, Guesty, Turno. Bookings drive cleanings drive billing." },
];

const STEPS = [
  { title: "Connect your properties", body: "Bulk import via CSV or PMS integration. We map units, owners, billing, and SLAs in onboarding." },
  { title: "Assign your team — or use ours", body: "Bring your existing cleaners onto the platform, or staff entirely with vetted ReadyHost crews." },
  { title: "Manage from the dashboard", body: "Daily ops view: who's on what, what's late, what's flagged. One screen replaces five spreadsheets." },
  { title: "Get reports & insights", body: "Weekly + monthly performance reports auto-emailed. Owner-ready summaries on demand." },
];

const FAQS = [
  { q: "Do you provide cleaners or do I bring my team?", a: "Either. You can bring your existing cleaning team onto the platform, use ReadyHost-staffed crews, or run a hybrid (your team primary, ReadyHost as overflow). Most PMs end up hybrid." },
  { q: "How do you guarantee turnarounds?", a: "Bench capacity. We hold a buffer of available cleaners every day so when one cancels or no-shows, a replacement is dispatched within 30 minutes. Tracked in your dashboard." },
  { q: "What if a cleaner cancels last-minute?", a: "Auto-replacement from bench. The dashboard shows the swap, the new ETA, and any cost difference. You don't lift a finger." },
  { q: "How is quality controlled?", a: "Photo verification on every clean against a property-specific checklist. Audit pass rate visible per cleaner. Random in-person audits for high-volume properties." },
  { q: "What's the contract term?", a: "Month-to-month if you bring cleaners. Volume agreements (50+ properties) typically 6–12 months for pricing certainty." },
  { q: "Do you integrate with our PMS?", a: "Direct integrations with Hospitable, Hostfully, Guesty, Turno, OwnerRez. Custom integrations available for enterprise contracts." },
];

export default function ForPropertyManagers() {
  return (
    <>
      <PageHero
        eyebrow="For Property Managers"
        headline="Manage multiple properties,"
        highlight="zero headaches."
        sub="Enterprise-grade cleaning coordination powered by the ReadyHost platform. Built for portfolios from 5 to 500+ properties."
        bgImage="/fleet-work1.jpg"
        primaryLabel="Request a Demo"
        primaryTo="/contact?type=pm"
        secondaryLabel="Talk to us"
      />

      {/* Challenge */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Challenge"
            title="Scaling cleaning ops without scaling headcount."
            sub="If you're managing 10+ properties manually, every new property is a new spreadsheet row, a new headache, and a new way to drop the ball."
          />
          <FeatureGrid items={CHALLENGES} columns={4} dense />
        </div>
      </section>

      {/* Platform */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Platform"
            title="Everything you need to run cleaning at scale."
            sub="Originally built for our own ops. Now available to property managers who think the same way we do."
          />
          <FeatureGrid items={PLATFORM_FEATURES} columns={3} />
        </div>
      </section>

      {/* Scale */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Scaling math"
            title="Same coordinator. 10× the properties."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { props: "5 properties", coord: "1 coordinator + spreadsheets", outcome: "Manageable, until someone takes vacation." },
              { props: "50 properties", coord: "Same coordinator + ReadyHost", outcome: "Same hours. Zero spreadsheets. SLA tracked automatically." },
              { props: "500 properties", coord: "Same coordinator + ReadyHost + automation", outcome: "Linear scaling. No proportional headcount required." },
            ].map((row) => (
              <div key={row.props} className="p-6 rounded-2xl border border-gray-200 bg-white">
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-[#1B6C72] to-[#258086] bg-clip-text text-transparent">
                  {row.props}
                </div>
                <div className="mt-3 text-sm text-gray-700"><strong>Setup:</strong> {row.coord}</div>
                <div className="mt-2 text-sm text-gray-600">{row.outcome}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Onboarding" title="From kickoff to live: about a week." />
          <StepList items={STEPS} />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Built around your portfolio."
            sub="Two pricing models — per-property monthly platform fee, or per-cleaning all-in. Volume discounts at 25, 50, and 100+ properties."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#FF6B35]">Platform</div>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">Bring your own cleaners</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">Per-property monthly fee. Includes dashboard, dispatch, photo verification, analytics, integrations.</p>
              <p className="mt-4 text-sm text-gray-700"><strong>Custom pricing.</strong> Quoted per portfolio.</p>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-[#1B6C72] bg-white shadow-lg">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#FF6B35]">Full-Service</div>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">Cleaners + platform</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">Per-cleaning all-in pricing. We staff, dispatch, verify, and bill. No platform fee.</p>
              <p className="mt-4 text-sm text-gray-700"><strong>Volume discounts:</strong> 25+ properties = 5%, 50+ = 10%, 100+ = 15%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">Integrates with</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Your existing stack, plugged in.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            {["Hospitable", "Hostfully", "Guesty", "Turno", "OwnerRez", "Airbnb", "Vrbo", "QuickBooks"].map((tool) => (
              <span key={tool} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold">
                {tool}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-600">Custom integrations available for enterprise.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions from PMs." align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        eyebrow="For Property Managers"
        title="Ready to retire the spreadsheet?"
        sub="Book a 30-minute demo. We'll show you the dashboard with your portfolio and walk through onboarding."
        primaryLabel="Request a Demo"
        primaryTo="/contact?type=pm"
        secondaryLabel="Get a Quote"
      />
    </>
  );
}
