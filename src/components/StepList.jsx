import React from "react";

/**
 * Numbered step list. items = [{ title, body }, ...]
 */
export default function StepList({ items }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {items.map((step, i) => (
        <div key={step.title} className="flex gap-4 sm:gap-5">
          <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1B6C72] to-[#258086] flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{step.title}</h3>
            <p className="mt-1 text-sm sm:text-[15px] text-gray-600 leading-relaxed">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
