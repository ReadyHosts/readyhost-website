import React from "react";

/**
 * Grid of feature cards with optional check icon.
 * items = [{ title, body }, ...]
 */
export default function FeatureGrid({ items, columns = 3, dense = false }) {
  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-5 sm:gap-6`}>
      {items.map((it) => (
        <div
          key={it.title}
          className={`group rounded-2xl border border-gray-200 bg-white hover:border-[#1B6C72]/40 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-300 ${
            dense ? "p-5" : "p-5 sm:p-6 lg:p-7"
          }`}
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1B6C72]/10 to-[#1B6C72]/20 flex items-center justify-center mb-4 motion-safe:group-hover:from-[#1B6C72] motion-safe:group-hover:to-[#258086] transition-colors">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B6C72] motion-safe:group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{it.title}</h3>
          <p className="mt-2 text-sm sm:text-[15px] text-gray-600 leading-relaxed">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
