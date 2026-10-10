"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ধরন" className="border-t border-base-300">
      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <ul className="flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/category/${c.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/80 hover:bg-base-200"
                  }`}
                >
                  <span aria-hidden className="text-base">
                    {c.emoji}
                  </span>
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
