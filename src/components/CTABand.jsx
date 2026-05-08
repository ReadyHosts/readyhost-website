import React from "react";
import { Link } from "react-router-dom";

/**
 * Full-width CTA band, used at the bottom of pages.
 */
export default function CTABand({
  eyebrow = "Ready when you are",
  title,
  sub,
  primaryLabel = "Get a Quote",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 text-white relative overflow-hidden isolate">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1B6C72] via-[#155357] to-[#0c4348]"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#FF6B35" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1.5 mb-5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {title}
          </h2>
          {sub && (
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
              {sub}
            </p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] motion-safe:transition-all shadow-xl hover:shadow-2xl motion-safe:hover:-translate-y-0.5"
            >
              {primaryLabel}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            {secondaryLabel && (
              <Link
                to={secondaryTo || "/contact"}
                className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] rounded-full text-base font-semibold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
