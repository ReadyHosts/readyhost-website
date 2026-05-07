import React, { useState } from "react";

/**
 * ReadyHost — single-file marketing site
 * Stack: React + Tailwind CSS (core utilities only)
 * Brand: Teal #1B6C72 / Orange #FF6B35
 * Domain: readyhosts.co  |  Email: hello@readyhosts.co
 *
 * Drop this component into any React + Tailwind project as the page root.
 * No pricing is displayed anywhere by design.
 */

const TEAL = "#1B6C72";
const ORANGE = "#FF6B35";

// Formspree endpoint — ReadyHost Contact Form (notifications to hello@readyhosts.co)
// Manage form: https://formspree.io/forms/xnjwbzke
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjwbzke";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Service Area", href: "#area" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "2,400+", label: "Properties cleaned" },
  { value: "99.2%", label: "On-time turnover rate" },
  { value: "4.9 / 5", label: "Average guest rating" },
  { value: "24 / 7", label: "Same-day availability" },
];

const SERVICES = [
  {
    title: "Airbnb Turnover Cleaning",
    body:
      "Full-property reset between guests. Linens, bathrooms, kitchen, and staging — every surface reset to listing-photo standard.",
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* ============== NAV ============== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-3">
            <Logo />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              ReadyHost
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
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
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e85a26] transition-colors shadow-sm"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:bg-gray-100"
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
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="text-base font-medium text-gray-800 hover:text-[#1B6C72] py-2"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e85a26] transition-colors"
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
        className="relative overflow-hidden bg-gradient-to-br from-[#1B6C72] to-[#0f4a4f] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide uppercase">
              Airbnb Cleaning · Hotel-Grade Standards
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Cleaner canceled?
              <br />
              <span className="text-[#FF6B35]">We&apos;ve got it handled.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
              Same-day Airbnb turnovers run like hotel housekeeping. Vetted
              crews, photo-verified checklists, and one number to call when the
              booking can&apos;t slip — across Fort Lauderdale to Dania Beach.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-white bg-[#FF6B35] hover:bg-[#e85a26] transition-colors shadow-lg"
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
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                See Services
              </a>
            </div>
          </div>
        </div>

        {/* decorative accent */}
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20"
          style={{ background: ORANGE }}
        />
      </section>

      {/* ============== TRUST / STATS ============== */}
      <section className="bg-[#f9fafb] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1B6C72]">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SERVICES ============== */}
      <section id="services" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#FF6B35]">
              Services
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Everything between checkout and check-in.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Built for hosts who treat their listing like a business, not a
              side hustle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-[#1B6C72] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1B6C72]/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#1B6C72]"
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

      {/* ============== WHY CHOOSE ============== */}
      <section id="why" className="py-20 lg:py-24 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#FF6B35]">
                Why ReadyHost
              </h2>
              <p className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
                Your turnover system, finally on rails.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Most cleaning services are built for homes. We&apos;re built for
                short-term rentals — where 11am checkout and 4pm check-in is a
                hard line, not a suggestion. Every process we run is reverse-
                engineered from how full-service hotels operate.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center mt-8 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#1B6C72] hover:bg-[#155357] transition-colors shadow-sm"
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
                  className="p-5 rounded-xl bg-white border border-gray-200"
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
      <section id="area" className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#FF6B35]">
                Service Area
              </h2>
              <p className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
                Fort Lauderdale to Dania Beach.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                We cover the South Florida coastal strip from Fort Lauderdale
                Boulevard down through Hollywood and into Dania Beach. If your
                listing is inside that corridor, we can be at your door — same
                day if needed.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {[
                  "Fort Lauderdale Beach & Las Olas",
                  "Hollywood Beach",
                  "Dania Beach",
                  "Pompano (case by case)",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ background: ORANGE }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div
                className="relative rounded-2xl overflow-hidden border border-gray-200 bg-[#f9fafb]"
                style={{ aspectRatio: "16 / 10" }}
              >
                {/* Stylized service-area illustration */}
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <rect width="800" height="500" fill="#e8f1f2" />
                  <path
                    d="M0,0 L520,0 L500,500 L0,500 Z"
                    fill="#d4e6e8"
                  />
                  <path
                    d="M520,0 L800,0 L800,500 L500,500 Z"
                    fill="#a8d0d4"
                    opacity="0.4"
                  />
                  {/* Coverage zone */}
                  <path
                    d="M380,80 Q420,60 470,90 L490,260 Q495,360 460,430 Q420,460 380,430 Q360,340 365,240 Z"
                    fill={TEAL}
                    opacity="0.25"
                    stroke={TEAL}
                    strokeWidth="3"
                    strokeDasharray="8,6"
                  />
                  {/* Pins */}
                  <Pin x={420} y={120} label="Fort Lauderdale" />
                  <Pin x={430} y={250} label="Hollywood" />
                  <Pin x={425} y={370} label="Dania Beach" />
                  <text
                    x={620}
                    y={50}
                    fill="#1B6C72"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="700"
                    fontSize="18"
                  >
                    Atlantic
                  </text>
                  <text
                    x={620}
                    y={72}
                    fill="#1B6C72"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="700"
                    fontSize="18"
                  >
                    Ocean
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== CONTACT ============== */}
      <section id="contact" className="py-20 lg:py-24 bg-[#1B6C72] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#FF6B35]">
                Contact
              </h2>
              <p className="mt-2 text-3xl sm:text-4xl font-bold">
                Get a quote, or get same-day coverage.
              </p>
              <p className="mt-4 text-lg text-white/85 leading-relaxed">
                Tell us about your properties and we&apos;ll send pricing within
                24 hours. Already in a bind? Mark your message URGENT and
                we&apos;ll dispatch.
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
                  value="Fort Lauderdale → Dania Beach, FL"
                />
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-6 sm:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#1B6C72]/10 mx-auto flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-[#1B6C72]"
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
                  <h3 className="mt-4 text-xl font-bold">
                    Inquiry received.
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We&apos;ll be back to you within 24 hours. For urgent
                    same-day requests, call or text the number on file or
                    email hello@readyhosts.co with URGENT in the subject.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-semibold text-[#1B6C72] hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
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
                      className="block text-sm font-semibold text-gray-700 mb-1"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition"
                    />
                  </div>
                  {submitError && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg text-base font-semibold text-white bg-[#FF6B35] hover:bg-[#e85a26] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    {isSubmitting ? "Sending\u2026" : "Send Inquiry"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    By submitting you agree to be contacted by ReadyHost about
                    your inquiry. Submissions are processed by Formspree.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="bg-[#0f4a4f] text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-3">
              <Logo />
              <div>
                <div className="font-bold text-white">ReadyHost</div>
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

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-white/50">
            <div>
              © {new Date().getFullYear()} ReadyHost. All rights reserved.
            </div>
            <div>Fort Lauderdale → Dania Beach, FL</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============== Subcomponents ============== */

function Logo() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white shadow-sm"
      style={{ background: TEAL }}
      aria-label="ReadyHost logo"
    >
      RH
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1"
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
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B6C72] focus:border-[#1B6C72] outline-none transition"
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
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
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
        <div className="text-xs uppercase tracking-wide text-white/60 font-semibold">
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

function Pin({ x, y, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r="14" fill={ORANGE} opacity="0.25" />
      <circle cx={x} cy={y} r="7" fill={ORANGE} />
      <circle cx={x} cy={y} r="3" fill="#fff" />
      <text
        x={x + 18}
        y={y + 5}
        fill="#111827"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="14"
      >
        {label}
      </text>
    </g>
  );
}
