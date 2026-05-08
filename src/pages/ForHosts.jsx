import React from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import StepList from "../components/StepList.jsx";
import PricingTable from "../components/PricingTable.jsx";
import FAQ from "../components/FAQ.jsx";
import CTABand from "../components/CTABand.jsx";

const PAINS = [
  { title: "Cleaner cancellations at 11pm", body: "Your cleaner just cancelled and the guest checks in tomorrow at 4. Now what?" },
  { title: "Zero visibility", body: "Did the cleaner show up? Did they actually clean the bathroom? You won't know until the guest complains." },
  { title: "Calendar collisions", body: "Cleaner thinks the property is free. Guest is mid-checkout. Mess." },
  { title: "Inconsistent quality", body: "Different person every week, different standard every time. Your reviews swing accordingly." },
];

const APP_FEATURES = [
  { title: "Real-time status updates", body: "On-the-way → in-progress → completed. You see every milestone the moment it happens." },
  { title: "Photo verification", body: "Before/after photos of every room delivered to the app before the next guest checks in." },
  { title: "Direct messaging", body: "Talk to the assigned cleaner without exchanging phone numbers. Conversation history saved." },
  { title: "Calendar sync", body: "Connect your Airbnb listing — we read your bookings and schedule turnovers automatically." },
  { title: "Same-day booking", body: "Last-minute requests routed to bench capacity. We hold availability so you don't have to scramble." },
  { title: "Cleaner ratings", body: "Rate every clean. Top-rated cleaners get assigned to your properties first, every time." },
];

const STEPS = [
  { title: "Download the app & link your Airbnb listing", body: "iOS & Android. OAuth into your Airbnb account — we read upcoming bookings, you stay in control." },
  { title: "Request a cleaning (or set recurring)", body: "Single turnover or auto-schedule for every checkout. Mid-stay refresh available." },
  { title: "Get real-time updates, photos, completion confirmation", body: "We notify you when the cleaner is on the way, when they're done, and you get the photo report before the guest arrives." },
];

const PRICING = [
  { label: "Studio / 1 BR", sub: "Up to 700 sqft", price: "$145" },
  { label: "2 BR", sub: "Up to 1,200 sqft", price: "$175" },
  { label: "3 BR", sub: "Up to 1,800 sqft", price: "$210" },
  { label: "4 BR+", sub: "1,800+ sqft", price: "$260" },
];

const ADDONS = [
  { label: "Fresh linens", sub: "Bring fresh, take used to laundry", price: "+$15" },
  { label: "Restocking", sub: "Toiletries, coffee, paper goods", price: "+$10" },
  { label: "Deep clean", sub: "Baseboards, vents, behind appliances", price: "+$25" },
];

const FAQS = [
  { q: "How fast can you turn around a property?", a: "Standard turnovers within 4 hours of guest checkout. Same-day urgent requests dispatched within 2 hours, conditions permitting." },
  { q: "What if my cleaner cancels?", a: "If a ReadyHost-assigned cleaner cancels, we automatically dispatch a replacement from bench capacity. You won't even need to ask." },
  { q: "Can I request same-day cleaning?", a: "Yes. Same-day capacity is built into the platform. Request via app and we'll confirm within 30 minutes." },
  { q: "How do I know the room was actually cleaned?", a: "Every completed clean includes a photo report — bedroom, bathroom, kitchen, common areas. Sent to your app before the next guest checks in." },
  { q: "What areas do you service?", a: "South Florida — Broward (Fort Lauderdale, Hollywood, Pompano), Miami-Dade (Miami Beach, Brickell, Aventura, Sunny Isles), and Palm Beach (West Palm, Boca Raton, Delray)." },
  { q: "Do I pay before or after the cleaning?", a: "After. We invoice once the cleaning is verified complete. Stored payment method on file, charged upon completion." },
];

export default function ForHosts() {
  return (
    <>
      <PageHero
        eyebrow="For Airbnb Hosts"
        headline="Manage your Airbnb cleanings"
        highlight="like a pro."
        sub="Real-time updates. Photo verification. Direct communication with your cleaner — through the ReadyHost app."
        bgImage="/fleet-motion.jpg"
        primaryLabel="Get Started"
        primaryTo="/contact?type=host"
        secondaryLabel="See Pricing"
        secondaryTo="/for-hosts#pricing"
      />

      {/* Problem */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Reality"
            title="You're a host, not a cleaning coordinator."
            sub="If any of this sounds familiar, you've outgrown the part-time cleaner setup."
          />
          <FeatureGrid items={PAINS} columns={4} dense />
        </div>
      </section>

      {/* App Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Solution"
            title="The ReadyHost app, built for hosts."
            sub="Everything you need to run cleanings without picking up the phone."
          />
          <FeatureGrid items={APP_FEATURES} columns={3} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="How it works"
                title="Three steps. No phone tag."
                sub="Onboarding takes about 10 minutes. After that, it's hands-off."
              />
              <StepList items={STEPS} />
            </div>
            <div className="lg:col-span-7">
              <img src="/fleet-work1.jpg" alt="ReadyHost crew arriving for a turnover" loading="lazy" decoding="async" className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover rounded-2xl sm:rounded-3xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Benefits"
            title="Stop stressing. Start hosting."
            sub="Hosts on ReadyHost report higher guest ratings, faster turnovers, and more time back."
          />
          <FeatureGrid
            items={[
              { title: "Peace of mind", body: "Know exactly when your cleaner arrives, what got cleaned, and when the property is guest-ready." },
              { title: "Higher guest ratings", body: "Clean rooms drive 5-star reviews. Photo-verified cleanings means no surprises at check-in." },
              { title: "More bookings, faster turns", body: "Faster turnovers + same-day recovery means more nights bookable on your calendar." },
              { title: "Professional image", body: "Branded crew, hotel-grade standards. Your guests see the same caliber as a boutique stay." },
            ]}
            columns={4}
            dense
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Standard turnover rates."
            sub="Pay after completion. No subscriptions, no minimums. Volume discounts for hosts with 5+ properties — ask us."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingTable rows={PRICING} note="Pricing reflects standard turnover (between guests). Same-day urgent requests +$25." />
            <PricingTable rows={ADDONS} note="Add-ons stack with any turnover. Configure per property in the app." />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common questions." align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        eyebrow="For Hosts"
        title="Ready to stop managing cleaners?"
        sub="Tell us about your properties and we'll have you set up within 24 hours."
        primaryLabel="Book Your First Cleaning"
        primaryTo="/contact?type=host"
        secondaryLabel="Talk to us"
      />
    </>
  );
}
