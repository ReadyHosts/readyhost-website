import React, { useState } from "react";

/**
 * ReadyHost — single-file marketing site
 * Stack: React + Tailwind CSS (core utilities only)
 * Brand: Teal #1B6C72 / Orange #FF6B35
 * Domain: readyhosts.co  |  Email: hello@readyhosts.co
 *
 * No pricing displayed (custom/contract-based).
 * Form posts to Formspree — no mailto fallback.
 */

const TEAL = "#1B6C72";
const ORANGE = "#FF6B35";

// Formspree endpoint — ReadyHost Contact Form (notifications to hello@readyhosts.co)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjwbzke";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how" },
  { label: "Why Us", href: "#why" },
  { label: "Service Area", href: "#area" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "50+", label: "Properties cleaned" },
  { value: "98%", label: "On-time turnover rate" },
  { value: "5\u2605", label: "Average guest rating" },
  { value: "24 hr", label: "Same-day availability" },
];

const SERVICES = [
  {
    title: "Airbnb Turnover Cleaning",
    body:
      "Full-property reset between guests. Linens, bathrooms, kitchen, and staging — every surface back to listing-photo standard.",
  },
  {
    title: "Hotel-Grade Deep Cleans",
    body:
      "Quarterly or on-demand deep cleans built around hotel housekeeping protocols. Documented checklist, photographed completion.",
  },
  {
    title: "Same-Day Recovery",
    body:
      "Cleaner canceled or no-showed? We dispatch a vetted crew within hours so your guest never sees the chaos behind the booking.",
  },
  {
    title: "Linen & Restock Management",
    body:
      "Hospital-grade linen rotation, amenity restocking, and consumable tracking — no more 'we ran out of toilet paper' messages at 11pm.",
  },
  {
    title: "Inspection & Reporting",
    body:
      "Every clean ends with a photo report and damage flag. You see what your guest is about to see, before they walk through the door.",
  },
  {
    title: "Co-Host Friendly",
    body:
      "We integrate with your PMS or co-host workflow. Schedule via Turno, Hospitable, or direct — we plug in, you stay hands-off.",
  },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Tell us when",
    body:
      "Book through your PMS, text us, or use the form. Same-day requests welcome.",
  },
  {
    num: "02",
    title: "Vetted crew dispatched",
    body:
      "Our branded team rolls up on time with linens, supplies, and the checklist for your property.",
  },
  {
    num: "03",
    title: "Photo-verified clean",
    body:
      "Every turnover ends with a photo report and damage flag — sent to you before the next guest arrives.",
  },
];

const WHY = [
  {
    title: "Hotel-Grade Standards",
    body:
      "Our crews are trained on hotel housekeeping SOPs — not just 'tidy and leave'. Every clean follows a documented checklist with photo verification.",
  },
  {
    title: "Same-Day Coverage",
    body:
      "Last-minute cancellations are our specialty. We hold bench capacity 7 days a week so your turnovers never slip.",
  },
  {
    title: "One Point of Contact",
    body:
      "No revolving door of contractors. You get a dedicated account lead who knows your properties, your guests, and your rules.",
  },
  {
    title: "Vetted, Insured Crews",
    body:
      "Every cleaner is background-checked, trained, and insured. We carry full liability coverage so you're not exposed to risk.",
  },
];

export default function ReadyHostMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    properties: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("phone", form.phone);
    payload.append("properties", form.properties);
    payload.append("message", form.message);
    payload.append(
      "_subject",
      `New ReadyHost inquiry \u2014 ${form.name || "Web form"}`
    );
    if (form.email) payload.append("_replyto", form.email);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", properties: "", message: "" });
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitError(
          data?.errors?.[0]?.message ||
            "We couldn't send that. Please try again or email hello@readyhosts.co directly."
        );
      }
    } catch (err) {
      setSubmitError(
        "Network error. Please try again or email hello@readyhosts.co directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const retrySubmit = () => {
    setSubmitError("");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* ============== NAV ============== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          <a href="#top" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="ReadyHost logo"
              className="h-9 lg:h-11 w-auto transition-transform group-hover:scale-105"
              loading="eager"
            />
            <span className="hidden sm:inline font-bold text-lg lg:text-xl tracking-tight">
              <span className="text-[#1B6C72]">Ready</span>
              <span className="text-[#FF6B35]">Hosts</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1B6C72] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="text-base font-medium text-gray-800 hover:text-[#1B6C72] py-2.5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554]"
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ============== HERO ============== */}
      <section
        id="top"
        className="relative overflow-hidden text-white isolate"
      >
        {/* Background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        {/* Dark teal overlay for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c4348]/95 via-[#1B6C72]/85 to-[#0c4348]/95"
        />
        {/* Orange accent blob */}
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-20 blur-2xl"
          style={{ background: ORANGE }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-7 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              Airbnb Cleaning · Hotel-Grade Standards
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Cleaner canceled?
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#ffa07a] bg-clip-text text-transparent">
                We&apos;ve got it handled.
              </span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
              Same-day Airbnb turnovers run like hotel housekeeping. Vetted
              crews, photo-verified checklists, and one number to call when
              the booking can&apos;t slip — across South Florida.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Request a Clean
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                See Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TRUST / STATS ============== */}
      <section className="bg-gradient-to-b from-white to-[#f9fafb] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-[#1B6C72] to-[#258086] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-3 text-sm font-medium text-gray-600">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SERVICES ============== */}
      <section id="services" className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
              Services
            </h2>
            <p className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Everything between checkout and check-in.
            </p>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Built for hosts who treat their listing like a business, not a
              side hustle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group p-7 rounded-2xl border border-gray-200 bg-white hover:border-[#1B6C72]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B6C72]/10 to-[#1B6C72]/20 flex items-center justify-center mb-5 group-hover:from-[#1B6C72] group-hover:to-[#258086] transition-colors">
                  <svg
                    className="w-6 h-6 text-[#1B6C72] group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {svc.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW WE WORK ============== */}
      <section id="how" className="py-24 lg:py-28 bg-gradient-to-b from-[#f9fafb] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
                How We Work
              </h2>
              <p className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Same-day response. Professional team. Ready when you need us.
              </p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Branded vans, vetted crews, and a workflow built for the moment a guest is checking in three hours from now.
              </p>

              <div className="mt-10 space-y-6">
                {HOW_STEPS.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B6C72] to-[#258086] flex items-center justify-center text-white font-bold shadow-md">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center mt-10 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1B6C72] to-[#258086] hover:from-[#155357] hover:to-[#1f6a6f] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Book a turnover
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                <div className="col-span-2">
                  <img
                    src="/fleet1.jpg"
                    alt="ReadyHost branded fleet on location"
                    loading="lazy"
                    className="w-full h-72 lg:h-80 object-cover rounded-3xl shadow-xl"
                  />
                </div>
                <div>
                  <img
                    src="/fleet2.jpg"
                    alt="ReadyHost crew at work"
                    loading="lazy"
                    className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div>
                  <img
                    src="/fleet3.jpg"
                    alt="ReadyHost van"
                    loading="lazy"
                    className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== WHY CHOOSE ============== */}
      <section id="why" className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
                Why ReadyHost
              </h2>
              <p className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Your turnover system, finally on rails.
              </p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Most cleaning services are built for homes. We&apos;re built for short-term rentals — where 11am checkout and 4pm check-in is a hard line, not a suggestion. Every process we run is reverse-engineered from how full-service hotels operate.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center mt-9 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1B6C72] to-[#258086] hover:from-[#155357] hover:to-[#1f6a6f] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Talk to us
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY.map((w) => (
                <div
                  key={w.title}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#1B6C72]/40 hover:shadow-lg transition-all"
                >
                  <h3 className="text-base font-bold text-gray-900">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== SERVICE AREA ============== */}
      <section id="area" className="py-24 lg:py-28 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
                Service Area
              </h2>
              <p className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                South Florida.
              </p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                We cover the tri-county short-term rental market — Broward, Miami-Dade, and Palm Beach. If your listing is in South Florida, we can be at your door, same day if needed.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-gray-700">
                {[
                  "Broward County (Fort Lauderdale, Hollywood, Pompano)",
                  "Miami-Dade County (Miami Beach, Brickell, Aventura, Sunny Isles)",
                  "Palm Beach County (West Palm, Boca Raton, Delray Beach)",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span
                      className="inline-block w-2 h-2 mt-1.5 rounded-full flex-shrink-0"
                      style={{ background: ORANGE }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white">
                <iframe
                  title="ReadyHost service area — South Florida"
                  src="https://maps.google.com/maps?q=South+Florida&t=&z=8&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-[420px] lg:h-[480px]"
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

      {/* ============== CONTACT ============== */}
      <section
        id="contact"
        className="py-24 lg:py-28 text-white relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1B6C72] via-[#155357] to-[#0c4348]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: ORANGE }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
                Contact
              </h2>
              <p className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                Get a quote, or get same-day coverage.
              </p>
              <p className="mt-5 text-lg text-white/85 leading-relaxed">
                Tell us about your properties and we&apos;ll get back within 24 hours. Already in a bind? Mark your message URGENT and we&apos;ll dispatch.
              </p>

              <div className="mt-10 space-y-5">
                <ContactRow
                  icon="mail"
                  label="Email"
                  value="hello@readyhosts.co"
                  href="mailto:hello@readyhosts.co"
                />
                <ContactRow
                  icon="globe"
                  label="Website"
                  value="readyhosts.co"
                  href="https://readyhosts.co"
                />
                <ContactRow
                  icon="map"
                  label="Service Area"
                  value="South Florida (Broward · Miami-Dade · Palm Beach)"
                />
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-7 sm:p-9">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B6C72]/15 to-[#1B6C72]/5 mx-auto flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-[#1B6C72]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">
                    Inquiry received.
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed max-w-sm mx-auto">
                    We&apos;ll be back to you within 24 hours. For urgent same-day requests, email hello@readyhosts.co with URGENT in the subject.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-7 inline-flex items-center text-sm font-semibold text-[#1B6C72] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Tell us about your properties
                  </h3>
                  <Field
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <Field
                    label="How many properties?"
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    placeholder="e.g. 3 listings in Hollywood Beach"
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      What do you need?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Same-day turnover, recurring cleans, deep clean, etc."
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition"
                    />
                  </div>
                  {submitError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start justify-between gap-3">
                      <span>{submitError}</span>
                      <button
                        type="button"
                        onClick={retrySubmit}
                        className="font-semibold text-red-800 hover:underline whitespace-nowrap"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                          />
                        </svg>
                        {"Sending\u2026"}
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting you agree to be contacted by ReadyHost about your inquiry. Submissions are processed by Formspree.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="bg-[#0c4348] text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ReadyHost"
                className="h-10 w-auto"
                loading="lazy"
              />
              <div>
                <div className="font-bold text-white">
                  <span>Ready</span>
                  <span className="text-[#FF6B35]">Hosts</span>
                </div>
                <div className="text-xs text-white/60">
                  Airbnb Cleaning · Hotel-Grade Standards
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="text-sm">
              <a
                href="mailto:hello@readyhosts.co"
                className="hover:text-white transition-colors"
              >
                hello@readyhosts.co
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-white/50">
            <div>
              © {new Date().getFullYear()} ReadyHost. All rights reserved.
            </div>
            <div>South Florida · Broward · Miami-Dade · Palm Beach</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============== Subcomponents ============== */

function Field({ label, name, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1.5"
      >
        {label}
        {required && <span className="text-[#FF6B35]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition"
      />
    </div>
  );
}

function ContactRow({ icon, label, value, href }) {
  const Icon = () => {
    if (icon === "mail")
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      );
    if (icon === "globe")
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 010 18M12 3a14 14 0 000 18"
        />
      );
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    );
  };

  const content = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <Icon />
        </svg>
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/60 font-semibold">
          {label}
        </div>
        <div className="text-base font-medium text-white mt-0.5">{value}</div>
      </div>
    </div>
  );

  if (href)
    return (
      <a href={href} className="block hover:opacity-90 transition-opacity">
        {content}
      </a>
    );
  return content;
}
