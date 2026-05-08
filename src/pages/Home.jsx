import React from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import StepList from "../components/StepList.jsx";
import ContactSection from "../components/ContactSection.jsx";

const STATS = [
  { value: "3,800+", label: "Properties cleaned" },
  { value: "98%", label: "On-time turnover rate" },
  { value: "4.9\u2605", label: "Airbnb rating" },
  { value: "24 hr", label: "Same-day availability" },
];

const SERVICES = [
  { title: "Airbnb Turnover Cleaning", body: "Full-property reset between guests. Linens, bathrooms, kitchen, and staging — every surface back to listing-photo standard." },
  { title: "Hotel-Grade Deep Cleans", body: "Quarterly or on-demand deep cleans built around hotel housekeeping protocols. Documented checklist, photographed completion." },
  { title: "Same-Day Recovery", body: "Cleaner canceled or no-showed? We dispatch a vetted crew within hours so your guest never sees the chaos behind the booking." },
  { title: "Linen & Restock Management", body: "Hospital-grade linen rotation, amenity restocking, and consumable tracking — no more 'we ran out of toilet paper' messages at 11pm." },
  { title: "Inspection & Reporting", body: "Every clean ends with a photo report and damage flag. You see what your guest is about to see, before they walk through the door." },
  { title: "Co-Host Friendly", body: "We integrate with your PMS or co-host workflow. Schedule via Turno, Hospitable, or direct — we plug in, you stay hands-off." },
];

const HOW_STEPS = [
  { title: "Tell us when", body: "Book through your PMS, text us, or use the form. Same-day requests welcome." },
  { title: "Vetted crew dispatched", body: "Our branded team rolls up on time with linens, supplies, and the checklist for your property." },
  { title: "Photo-verified clean", body: "Every turnover ends with a photo report and damage flag — sent to you before the next guest arrives." },
];

const WHY = [
  { title: "Reliability", body: "App-backed coordination keeps every job on rails. Same-day bench capacity 7 days a week so turnovers don't slip." },
  { title: "Transparency", body: "Real-time status updates and photo verification on every clean. You see what your guest sees, before they arrive." },
  { title: "Professionalism", body: "Background-checked, trained, and insured crews. Hotel housekeeping SOPs on every job — not 'tidy and leave'." },
  { title: "Technology", body: "Proprietary ReadyHost platform tracks every job, every room, every photo. Zero guesswork from request to completion." },
];

const AUDIENCES = [
  { label: "For Airbnb Hosts", to: "/for-hosts", body: "Real-time updates, photo verification, same-day coverage." },
  { label: "For Property Managers", to: "/for-property-managers", body: "Multi-property dashboard, team coordination, performance analytics." },
  { label: "For Hotels", to: "/for-hotels", body: "Hotel-grade SLAs. Same-day turnarounds. Scalable from 1 to 500+ rooms." },
  { label: "For Cleaners", to: "/for-cleaners", body: "Consistent work. Fair pay. Bonus structure for top performers." },
];

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Airbnb Cleaning · Hotel-Grade Standards"
        headline="Cleaner canceled?"
        highlight="We've got it handled."
        sub="Powered by ReadyHost technology. Real-time updates, photo verification, and one number to call when the booking can't slip — across South Florida."
        bgImage="/hero-bg.jpg"
        primaryLabel="Get Started"
        primaryTo="/contact"
        secondaryLabel="See Services"
        secondaryTo="/#services"
      />

      {/* Trust / Stats */}
      <section className="bg-gradient-to-b from-white to-[#f9fafb] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF6B35] mb-6">
            Real-time tracking · Photo verification · Zero guesswork
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-br from-[#1B6C72] to-[#258086] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-gray-600 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Built for who you are"
            title="One platform. Every audience."
            sub="ReadyHost isn't just a cleaning company — we're a cleaning platform. Pick your role to see how we fit your workflow."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUDIENCES.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="group block p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#1B6C72]/40 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-safe:transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900">{a.label}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a.body}</p>
                <span className="inline-flex items-center mt-4 text-sm font-semibold text-[#1B6C72] group-hover:text-[#FF6B35] transition-colors">
                  Learn more
                  <svg className="ml-1 w-4 h-4 motion-safe:transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20 lg:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Everything between checkout and check-in."
            sub="Built for hosts who treat their listing like a business. Everything coordinated through the ReadyHost app for consistency and quality."
          />
          <FeatureGrid items={SERVICES} columns={3} />
        </div>
      </section>

      {/* In Motion band */}
      <section aria-label="ReadyHost crews on the road" className="relative h-[50vh] min-h-[320px] sm:min-h-[380px] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center lg:bg-fixed" style={{ backgroundImage: "url('/fleet-motion.jpg')" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0c4348]/95 via-[#0c4348]/65 to-[#0c4348]/30 sm:to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <span className="inline-block px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">In Motion</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Branded crews on the road across South Florida.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-white/85 max-w-lg leading-relaxed">
              Same uniform. Same checklist. Same outcome — every clean, every property, every guest.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="how" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#f9fafb] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="How We Work"
                title="Same-day response. Professional team. Ready when you need us."
                sub="Branded vans, vetted crews, and a workflow built for the moment a guest is checking in three hours from now."
              />
              <StepList items={HOW_STEPS} />
              <Link
                to="/contact"
                className="inline-flex items-center mt-8 px-6 py-3 min-h-[44px] rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1B6C72] to-[#258086] hover:from-[#155357] hover:to-[#1f6a6f] motion-safe:transition-all shadow-md hover:shadow-lg motion-safe:hover:-translate-y-0.5"
              >
                Book a turnover
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                <img src="/fleet-work1.jpg" alt="ReadyHost vans and crew on location" loading="lazy" decoding="async" className="w-full h-56 sm:h-72 lg:h-[22rem] object-cover object-center rounded-2xl sm:rounded-3xl shadow-xl" />
                <img src="/fleet-work2.jpg" alt="ReadyHost crew loading linens curbside" loading="lazy" decoding="async" className="w-full h-44 sm:h-56 lg:h-64 object-cover object-center rounded-2xl sm:rounded-3xl shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ReadyHost — 4 pillars */}
      <section id="why" className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why ReadyHost"
            title="Your turnover system, finally on rails."
            sub="Most cleaning services are built for homes. We're built for short-term rentals — every process reverse-engineered from how full-service hotels operate."
          />
          <FeatureGrid items={WHY} columns={4} dense />
        </div>
      </section>

      {/* Service Area */}
      <section id="area" className="py-16 sm:py-20 lg:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Service Area" title="South Florida." sub="We cover the tri-county short-term rental market — Broward, Miami-Dade, and Palm Beach." />
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                {[
                  "Broward County (Fort Lauderdale, Hollywood, Pompano)",
                  "Miami-Dade County (Miami Beach, Brickell, Aventura, Sunny Isles)",
                  "Palm Beach County (West Palm, Boca Raton, Delray Beach)",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 mt-1.5 rounded-full flex-shrink-0" style={{ background: "#FF6B35" }} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                <iframe
                  title="ReadyHost service area — South Florida"
                  src="https://maps.google.com/maps?q=South+Florida&t=&z=8&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-72 sm:h-[420px] lg:h-[480px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
