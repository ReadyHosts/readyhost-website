import React from "react";

/**
 * Pricing table.
 * rows: [{ label, price, sub }]
 * note: optional footer note string
 */
export default function PricingTable({ rows, note }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-[#1B6C72] to-[#258086] text-white">
            <th className="text-left text-xs sm:text-sm uppercase tracking-wider font-semibold px-5 py-3.5">
              Service
            </th>
            <th className="text-right text-xs sm:text-sm uppercase tracking-wider font-semibold px-5 py-3.5">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-5 py-4 align-top">
                <div className="text-sm sm:text-base font-semibold text-gray-900">
                  {row.label}
                </div>
                {row.sub && (
                  <div className="mt-0.5 text-xs sm:text-sm text-gray-600">{row.sub}</div>
                )}
              </td>
              <td className="px-5 py-4 text-right align-top">
                <div className="text-base sm:text-lg font-bold text-[#1B6C72] whitespace-nowrap">
                  {row.price}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <div className="px-5 py-3 text-xs sm:text-sm text-gray-500 border-t border-gray-200 bg-gray-50">
          {note}
        </div>
      )}
    </div>
  );
}
