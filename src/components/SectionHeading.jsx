import React from "react";

export default function SectionHeading({ eyebrow, title, sub, align = "left" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl mb-10 sm:mb-14 ${alignment}`}>
      {eyebrow && (
        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#FF6B35]">
          {eyebrow}
        </h2>
      )}
      {title && (
        <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          {title}
        </p>
      )}
      {sub && (
        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}
