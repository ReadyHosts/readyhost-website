import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable hero — supports a background image with overlay, eyebrow, headline,
 * sub, and one or two CTAs.
 */
export default function PageHero({
  eyebrow,
  headline,
  highlight, // optional second-line highlighted phrase
  sub,
  bgImage,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  small = false, // smaller variant for non-home pages
}) {
  return (
    <section
      className={`relative overflow-hidden text-white isolate ${
        small ? "" : "min-h-[60vh]"
      }`}
    >
      {bgImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center motion-safe:scale-105"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c4348]/85 via-[#1B6C72]/65 to-[#0c4348]/80"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-2xl"
        style={{ background: "#FF6B35" }}
      />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${small ? "py-14 sm:py-20 lg:py-24" : "py-20 sm:py-28 lg:py-36"}`}>
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block px-3 py-1.5 mb-5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              {eyebrow}
            </span>
          )}
          <h1 className={`font-extrabold tracking-tight leading-[1.1] ${
            small ? "text-3xl sm:text-4xl lg:text-5xl" : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          }`}>
            {headline}
            {highlight && (
              <>
                <br />
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#ffa07a] bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            )}
          </h1>
          {sub && (
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
              {sub}
            </p>
          )}
          {(primaryLabel || secondaryLabel) && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {primaryLabel && (
                <Link
                  to={primaryTo || "/contact"}
                  className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] hover:from-[#e85a26] hover:to-[#ff6b35] motion-safe:transition-all shadow-xl hover:shadow-2xl motion-safe:hover:-translate-y-0.5"
                >
                  {primaryLabel}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
              {secondaryLabel && (
                <Link
                  to={secondaryTo || "/contact"}
                  className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] rounded-full text-base font-semibold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-colors"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
