import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "For Hosts", to: "/for-hosts" },
  { label: "For Cleaners", to: "/for-cleaners" },
  { label: "For PMCs", to: "/for-pmcs" },
  { label: "For Hotels", to: "/for-hotels" },
  { label: "Add-ons", to: "/add-ons" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-32 md:h-44">
        <Link
          to="/"
          aria-label="ReadyHost home"
          className="flex items-center gap-2 group"
        >
          <img
            src="/logo.png"
            alt="ReadyHost"
            className="h-28 sm:h-32 lg:h-40 w-auto motion-safe:transition-transform motion-safe:group-hover:scale-105"
            loading="eager"
            width="320"
            height="160"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((l) =>
            l.to ? (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#1B6C72] underline decoration-[#FF6B35] decoration-2 underline-offset-4"
                      : "text-gray-700 hover:text-[#1B6C72]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1B6C72] transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 min-h-[44px] rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] motion-safe:transition-all shadow-md hover:shadow-lg motion-safe:hover:-translate-y-0.5"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 flex flex-col">
            {NAV_LINKS.map((l) =>
              l.to ? (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-base font-medium py-3 min-h-[44px] flex items-center ${
                      isActive ? "text-[#1B6C72]" : "text-gray-800 hover:text-[#1B6C72]"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-base font-medium text-gray-800 hover:text-[#1B6C72] py-3 min-h-[44px] flex items-center"
                >
                  {l.label}
                </a>
              )
            )}
            <Link
              to="/contact"
              className="mt-3 mb-2 inline-flex items-center justify-center px-5 py-3 min-h-[48px] rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554]"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
