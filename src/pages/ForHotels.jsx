import React from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import StepList from "../components/StepList.jsx";
import PricingTable from "../components/PricingTable.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";

const PROBLEM = [
  { title: "Cleaner cancellations = empty rooms", body: "Housekeeper no-show on a sold-out night = manual scramble + missed turnovers + late check-ins." },
  { title: "Manual coordination", body: "Daily room sheets, walkie-talkie chaos, paper checklists. None of it scales when occupancy spikes." },
  { title: "No real-time visibility", body: "Front desk has no idea which rooms are guest-ready until housekeeping radios in. Inefficient at best, fictional at worst." },
  { title: "Hard to scale", body: "Hiring more housekeepers takes weeks. Peak season hits before you're ready." },
];

const SOLUTION = [
  { title: "Room assignment system", body: "Batch-assign all checkout rooms to your team in seconds. Auto-prioritize VIP arrivals and stayovers." },
  { title: "Real-time staff coordination", body: "Live status of every room — assigned, in-progress, ready. Front desk sees what's bookable in real time." },
  { title: "Photo-verified quality control", body: "Every cleaned room gets photo-verified. Random audits trigger if photos are missing or out of standard." },
  { title: "Urgent / VIP requests", body: "Mark rooms as urgent — top of queue, 2-hour target turnaround for VIP arrivals." },
  { title: "SLA guarantees", body: "Define your standard (e.g. 95% of rooms ready by 3pm). We track it daily, report monthly, hit it consistently." },
  { title: "Performance dashboards", body: "On-time rate, avg time per room, audit pass rate, daily room throughput. Drill by housekeeper or shift." },
  { title: "PMS integration", body: "Two-way sync with Opera, Mews, Cloudbeds, RoomKey. Bookings drive room status drives housekeeping." },
  { title: "Bonus structure", body: "Performance bonuses for fast-and-clean turnovers. Top housekeepers earn $200–$400/month on top." },
  { title: "Flexible scheduling", body: "Daily, peak-only, event-based, or full outsource. Mix internal staff with ReadyHost overflow." },
];

const STEPS = [
  { title: "Property assessment & training", body: "Day 1–2: walkthrough, PMS integration setup, room standards, photo checklists configured per room type." },
  { title: "Go live with dashboard", body: "Day 3+: assign rooms, track progress, verify quality. Front desk gets real-time room status." },
  { title: "Daily SLA reporting", body: "End-of-day compliance report: rooms turned, on-time percentage, exceptions. Monthly executive summary." },
];

const SERVICE_PRICING = [
  { label: "Standard turnover", sub: "Checkout → guest-ready", price: "$90–$120 / room" },
  { label: "Urgent / VIP turnover", sub: "2-hour guarantee", price: "+$25 / room" },
  { label: "Deep clean", sub: "Monthly or as-needed", price: "$140 / room" },
  { label: "Linen + restock add-on", sub: "Per turnover", price: "+$15–$25 / room" },
];

const VOLUME = [
  { tier: "Up to 49 rooms", discount: "Standard rate" },
  { tier: "50–99 rooms", discount: "5% discount" },
  { tier: "100–199 rooms", discount: "10% discount" },
  { tier: "200+ rooms", discount: "Custom contract" },
];

const FAQS = [
  { q: "What's your SLA guarantee?", a: "Default 95% of rooms ready by 3pm on standard turnovers, 100% within 2 hours for urgent/VIP. SLAs are configurable per property and tracked daily." },
  { q: "Can you handle peak season?", a: "Yes. Bench capacity is sized for occupancy spikes and event weekends. Add capacity 2 weeks ahead of any known peak; we ramp up cleaners and supplies." },
  { q: "What if a cleaner doesn't show?", a: "Auto-replacement from bench, dispatched within 30 minutes. Front desk dashboard shows the swap and updated ETA. Zero impact on your check-in flow." },
  { q: "How do you verify quality?", a: "Photo verification per room (matched to property-specific checklist), audit pass rate per housekeeper, random in-person audits weekly for any underperformers." },
  { q: "Do you offer contract flexibility?", a: "Three contract types: month-to-month overflow, 6-month standard, 12-month enterprise (with locked pricing and dedicated account management). Mix-and-match available." },
  { q: "What about late checkouts and stayovers?", a: "Stayover refresh is built into the workflow. Late checkouts auto-reschedule the turnover; the dashboard shows new ready time so the front desk can adjust." },
];

export default function ForHotels() {
  return (
    <>
      <PageHero
        eyebrow="For Hotels"
        headline="Hotel-grade housekeeping."
        highlight="Same-day turnarounds. Guaranteed SLAs."
        sub="Flexible contract terms. Scalable from boutique 12-room properties to 500+ room flagships across South Florida."
        bgImage="/hero-bg.jpg"
        primaryLabel="Get a Quote"
        primaryTo="/contact?type=hotel"
        secondaryLabel="Schedule a Meeting"
      />

      {/* Problem */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Reality"
            title="Housekeeping breaks under pressure."
            sub="Every GM knows the housekeeping chokepoint. A bad day at the front desk usually starts in housekeeping."
          />
          <FeatureGrid items={PROBLEM} columns={4} dense />
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Platform"
            title="Built for the housekeeping department that has to deliver."
            sub="Every feature mapped to a problem we've watched a GM solve manually at midnight."
          />
          <FeatureGrid items={SOLUTION} columns={3} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Onboarding"
            title="Standard hotel goes live in 3–5 days."
            sub="Standard property: 1 day assessment, 1 day setup, 1 day shadow, then live."
          />
          <StepList items={STEPS} />
        </div>
      </section>

      {/* Service options */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Service Options"
            title="Pick the configuration that matches your property."
            sub="Standard, urgent, and deep cleaning are available individually or as a configured rotation."
          />
          <FeatureGrid
            items={[
              { title: "Standard turnover", body: "Checkout to guest-ready in 30–45 minutes per room. Photo-verified, checklist-backed." },
              { title: "Urgent / VIP", body: "Two-hour guarantee. Top-of-queue routing for late arrivals, blocked rooms, comp upgrades." },
              { title: "Deep cleaning", body: "Monthly or quarterly. Baseboards, vents, soft furnishings, light fixtures, behind-the-bed." },
              { title: "Add-ons", body: "Fresh linens (laundered off-site), amenity restocking, allergen treatment, pet-room recovery." },
            ]}
            columns={4}
            dense
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Per-room model with volume discounts."
            sub="Custom proposals for properties over 200 rooms or with multi-property portfolios."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingTable rows={SERVICE_PRICING} note="Range reflects room size & complexity. Final pricing locked in proposal." />
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-[#1B6C72] to-[#258086] text-white text-xs sm:text-sm uppercase tracking-wider font-semibold px-5 py-3.5">
                Volume tiers
              </div>
              <ul className="divide-y divide-gray-200">
                {VOLUME.map((row, i) => (
                  <li key={row.tier} className={`flex items-center justify-between px-5 py-4 ${i % 2 ? "bg-gray-50" : "bg-white"}`}>
                    <span className="text-sm sm:text-base font-semibold text-gray-900">{row.tier}</span>
                    <span className="text-sm sm:text-base font-bold text-[#1B6C72]">{row.discount}</span>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 text-xs sm:text-sm text-gray-500 border-t border-gray-200 bg-gray-50">
                Example: 200-room hotel, 70% occupancy ≈ 4,200 turnovers/month.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compliance & Standards"
            title="Insured, bonded, audit-ready."
          />
          <FeatureGrid
            items={[
              { title: "Background-checked staff", body: "Every cleaner cleared via national background check before first shift." },
              { title: "OSHA-compliant procedures", body: "Standard chemical handling, PPE, and bloodborne pathogen training." },
              { title: "Insured & bonded", body: "Full liability coverage; documentation provided per property on request." },
              { title: "Quality audits", body: "Random in-person audits weekly. Photo audit pass rate tracked per housekeeper." },
            ]}
            columns={4}
            dense
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions from hotels." align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        eyebrow="For Hotels"
        title="Ready for housekeeping that scales?"
        sub="Tell us about your property — room count, average occupancy, current setup. Custom proposal back within 48 hours."
        primaryLabel="Get a Quote"
        primaryTo="/contact?type=hotel"
        secondaryLabel="Schedule a Meeting"
      />
    </>
  );
}
