import React from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";

const SERVICES = [
  {
    title: "Fresh Linens",
    price: "+$15 / unit",
    body: "Cleaner brings fresh hotel-grade linens, removes used ones for off-site laundering at our partner facility (Smart Laundry, Dania Beach). Customizable per property: thread count, sheet style, towel grade.",
  },
  {
    title: "Restocking",
    price: "+$10 / unit",
    body: "Toiletries, towels, coffee, mini-bar replenishment to your custom inventory list. Cleaner scans items in app and marks complete. Low-stock alerts when supplies need reordering.",
  },
  {
    title: "Deep Cleaning",
    price: "+$25 / unit",
    body: "Baseboards, vents, behind appliances, light fixtures, soft furnishings. Monthly, quarterly, or semi-annual cadence. Scheduled separately from standard turnovers.",
  },
  {
    title: "Laundry Service",
    price: "$30 / load",
    body: "Off-site professional laundering — pickup and delivery included, 2–3 day turnaround, tracked end-to-end in app. Works for linens, towels, tablecloths.",
  },
  {
    title: "Pet Odor Treatment",
    price: "+$35 / unit",
    body: "Enzymatic treatment for pet-friendly listings. Eliminates odor at the source rather than masking. Safe for pets and guests; results last 4–6 weeks.",
  },
  {
    title: "Allergen Treatment",
    price: "+$40 / unit",
    body: "HEPA filtering and sanitizing for allergy-sensitive guests. Targets pollen, dust mites, dander. Eco-friendly, guest-safe products. Recommended quarterly.",
  },
];

const PRICING_ROWS = [
  { service: "Fresh Linens", oneTime: "$15", monthly: "$60", quarterly: "$45/mo" },
  { service: "Restocking", oneTime: "$10", monthly: "$40", quarterly: "$30/mo" },
  { service: "Deep Cleaning", oneTime: "$25", monthly: "—", quarterly: "$75 / quarter" },
  { service: "Laundry", oneTime: "$30 / load", monthly: "—", quarterly: "—" },
  { service: "Pet Odor", oneTime: "$35", monthly: "—", quarterly: "$100 / quarter" },
  { service: "Allergen Treatment", oneTime: "$40", monthly: "—", quarterly: "$120 / quarter" },
];

const FAQS = [
  { q: "Can I mix and match services?", a: "Yes. Add any combination to a turnover via the app or contract. No bundles required." },
  { q: "What if I only need add-ons occasionally?", a: "One-time pricing applies — no commitment. The app lets you add any service to any specific turnover." },
  { q: "Are supplies included?", a: "Restocking inventory (toiletries, coffee, paper goods) is billed at cost on top of the service fee. Linens are included in the fresh-linens fee. Cleaning chemicals always included." },
  { q: "What's the turnaround for deep cleaning?", a: "Standalone deep cleans: 4–6 hours per property, scheduled outside guest stays. Combined with a turnover: doubles the standard turnover window." },
  { q: "Can I customize the restocking list?", a: "Yes. Per-property inventory list configured in the app. Brand preferences, quantities, vendors all customizable." },
];

export default function AddOns() {
  return (
    <>
      <PageHero
        eyebrow="Add-on Services"
        headline="Beyond basic cleaning."
        highlight="Premium services for premium properties."
        sub="Laundry. Restocking. Deep cleaning. Allergen and pet odor treatment. Configure once per property, add to any turnover with one tap."
        bgImage="/fleet-work2.jpg"
        primaryLabel="Add to Your Plan"
        primaryTo="/contact"
        secondaryLabel="Custom Quote"
      />

      {/* Why */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why add-ons matter"
            title="Small upgrades, outsized review impact."
            sub="The difference between a 4-star and 5-star review is usually a detail — a stocked coffee station, a fresh-pressed sheet, a smell that screams 'just cleaned'."
          />
          <FeatureGrid
            items={[
              { title: "Higher guest ratings", body: "Stocked amenities and fresh linens consistently push reviews from 4.5 → 5 stars." },
              { title: "Fewer complaints", body: "Most guest complaints are about consumables. Restocking eliminates the category." },
              { title: "Better reviews", body: "Guests notice when the property feels intentionally cared for. Add-ons signal exactly that." },
              { title: "Justifies premium pricing", body: "Hotel-tier amenities support hotel-tier nightly rates on your listing." },
            ]}
            columns={4}
            dense
          />
        </div>
      </section>

      {/* Service detail */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Catalog" title="Six services. All app-managed." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="p-6 lg:p-7 rounded-2xl border border-gray-200 bg-white hover:border-[#1B6C72]/40 hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:transition-all">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                  <span className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] whitespace-nowrap">
                    {s.price}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing matrix */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing Matrix"
            title="One-time, monthly, or quarterly."
            sub="Discounts on monthly and quarterly cadences. All prices per unit, billed after service completion."
          />
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#1B6C72] to-[#258086] text-white">
                  <th className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-semibold">Service</th>
                  <th className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-semibold">One-time</th>
                  <th className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-semibold">Monthly</th>
                  <th className="px-4 sm:px-5 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-semibold">Quarterly</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row, i) => (
                  <tr key={row.service} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 sm:px-5 py-4 text-sm sm:text-base font-semibold text-gray-900">{row.service}</td>
                    <td className="px-4 sm:px-5 py-4 text-sm sm:text-base text-gray-700">{row.oneTime}</td>
                    <td className="px-4 sm:px-5 py-4 text-sm sm:text-base text-gray-700">{row.monthly}</td>
                    <td className="px-4 sm:px-5 py-4 text-sm sm:text-base text-gray-700">{row.quarterly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How to order" title="Three ways to add services." />
          <FeatureGrid
            items={[
              { title: "In the app", body: "Add to any turnover. Per-property defaults, one-tap selection, billed after completion." },
              { title: "Contract", body: "For recurring or bulk add-ons across a portfolio. Locked pricing, monthly invoicing." },
              { title: "Calendar scheduling", body: "Recurring deep cleans, quarterly allergen treatments, monthly linen rotations — set once, runs automatically." },
            ]}
            columns={3}
            dense
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common add-on questions." align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        eyebrow="Add-ons"
        title="Make every clean a five-star one."
        sub="Tell us which services you want and we'll configure them per property in your account."
        primaryLabel="Add to Your Plan"
        primaryTo="/contact"
        secondaryLabel="Custom Quote"
      />
    </>
  );
}
