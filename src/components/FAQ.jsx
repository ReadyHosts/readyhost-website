import React from "react";

/**
 * FAQ as native <details> elements (no JS, accessible by default).
 * items = [{ q, a }, ...]
 */
export default function FAQ({ items }) {
  return (
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group p-5 sm:p-6">
          <summary className="flex items-start justify-between cursor-pointer list-none gap-4">
            <span className="text-base sm:text-lg font-semibold text-gray-900">
              {item.q}
            </span>
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B6C72]/10 flex items-center justify-center text-[#1B6C72] motion-safe:transition-transform group-open:rotate-45">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
