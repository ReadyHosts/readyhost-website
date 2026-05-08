import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function FloatingMobileCTA() {
  const { pathname } = useLocation();
  // Hide on contact page (the form is the focus)
  if (pathname === "/contact") return null;

  return (
    <div className="lg:hidden fixed bottom-4 inset-x-4 z-40 motion-safe:transition-all motion-safe:duration-200">
      <Link
        to="/contact"
        className="flex items-center justify-center w-full min-h-[52px] px-6 py-3 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#FF6B35] to-[#ff8554] shadow-2xl ring-4 ring-white/40"
      >
        Get a Quote
        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
