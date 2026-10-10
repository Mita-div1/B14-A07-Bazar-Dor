"use client";

import { sortOptions, type SortKey } from "@/lib/product-utils";

interface Props {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

/** "সাজান: ডিফল্ট ▾" — options: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম */
export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="text-base-content/60">সাজান</span>
      <span className="relative inline-block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="h-9 cursor-pointer appearance-none rounded-lg border border-base-300 bg-base-100 py-0 pl-3 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-label="সাজান"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </span>
    </label>
  );
}
