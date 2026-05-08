import React from "react";
import ContactForm from "./ContactForm.jsx";

/**
 * Used on the homepage. The standalone /contact page renders ContactForm
 * directly inside its own layout.
 */
export default function ContactSection({ id = "contact" }) {
  return (
    <section
      id={id}
      className="py-16 sm:py-20 lg:py-28 text-white relative overflow-hidden isolate"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1B6C72] via-[#155357] to-[#0c4348]"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#FF6B35" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FFA07A]">
              Contact
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Get a quote, or get same-day coverage.
            </p>
            <p className="mt-4 text-base sm:text-lg text-white/95 leading-relaxed">
              Tell us about your properties and we&apos;ll get back within 24 hours. Already in a bind? Mark your message URGENT and we&apos;ll dispatch.
            </p>

            <div className="mt-8 space-y-5">
              <ContactRow icon="phone" label="Phone" value="(754) 800-5566" href="tel:+17548005566" />
              <ContactRow icon="mail" label="Email" value="hello@readyhosts.co" href="mailto:hello@readyhosts.co" />
              <ContactRow icon="globe" label="Website" value="readyhosts.co" href="https://readyhosts.co" />
              <ContactRow icon="map" label="Service Area" value="South Florida (Broward · Miami-Dade · Palm Beach)" />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }) {
  const Icon = () => {
    if (icon === "mail")
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      );
    if (icon === "globe")
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      );
    if (icon === "phone")
      return (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      );
    return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    );
  };

  const content = (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <Icon />
        </svg>
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-white/85 font-semibold">{label}</div>
        <div className="text-sm sm:text-base font-semibold text-white mt-0.5 break-words">{value}</div>
      </div>
    </div>
  );

  if (href)
    return (
      <a href={href} className="block min-h-[44px] hover:opacity-90 transition-opacity">{content}</a>
    );
  return content;
}
