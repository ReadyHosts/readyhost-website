import React from "react";
import { Link } from "react-router-dom";

const COLS = [
  {
    heading: "Services",
    links: [
      { label: "Airbnb Cleaning", to: "/for-hosts" },
      { label: "Hotel Housekeeping", to: "/for-hotels" },
      { label: "Property Mgmt Companies", to: "/for-pmcs" },
      { label: "Add-on Services", to: "/add-ons" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How We Work", to: "/#how" },
      { label: "Why ReadyHost", to: "/#why" },
      { label: "Service Area", to: "/#area" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Join Us",
    links: [
      { label: "Cleaners", to: "/for-cleaners" },
      { label: "Get a Quote", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c4348] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" aria-label="ReadyHost home" className="inline-block">
              <img
                src="/logo.png"
                alt="ReadyHost"
                className="h-20 sm:h-24 w-auto"
                loading="lazy"
                width="320"
                height="160"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Airbnb cleaning with hotel-grade standards. Powered by ReadyHost technology.
            </p>
            <div className="mt-3 space-y-1">
              <a
                href="tel:+17548005566"
                className="block text-sm font-semibold text-white hover:text-[#FFA07A] transition-colors"
              >
                (754) 800-5566
              </a>
              <a
                href="mailto:hello@readyhosts.co"
                className="block text-sm font-semibold text-white hover:text-[#FFA07A] transition-colors"
              >
                hello@readyhosts.co
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-white/85 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-white/50">
          <div>© {new Date().getFullYear()} ReadyHost. All rights reserved.</div>
          <div>South Florida · Broward · Miami-Dade · Palm Beach</div>
        </div>
      </div>
    </footer>
  );
}
