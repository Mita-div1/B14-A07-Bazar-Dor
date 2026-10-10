"use client";

import { useMemo, useState } from "react";
import { toBnDigits } from "@/lib/bn";
import { sortProducts, type SortKey } from "@/lib/product-utils";
import { useProducts } from "@/lib/use-products";
import type { Category } from "@/lib/types";
import ErrorState from "./ErrorState";
import NotFoundView from "./NotFoundView";
import ProductGrid from "./ProductGrid";
import { GridSkeleton } from "./Skeletons";
import SortDropdown from "./SortDropdown";

export default function CategoryProducts({ category }: { category: Category }) {
  const { products, loading, error, retry } = useProducts();
  const [sort, setSort] = useState<SortKey>("default");

  const inCategory = useMemo(
    () => (products ?? []).filter((p) => p.category === category.slug),
    [products, category.slug],
  );
  const sorted = useMemo(() => sortProducts(inCategory, sort), [inCategory, sort]);

  const count = toBnDigits(inCategory.length);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      {/* Title + icon */}
      <section className="card-surface flex items-center gap-4 px-5 py-5 sm:px-6">
        <span aria-hidden className="text-4xl">
          {category.emoji}
        </span>
        <div>
          <h1 className="text-2xl font-bold leading-tight">{category.label}</h1>
          {loading ? (
            <div className="skeleton mt-2 h-4 w-48" />
          ) : (
            <p className="text-sm text-base-content/60">
              {error ? category.subtitle : `${count}টি পণ্যের আজকের দাম ও পরিবর্তন`}
            </p>
          )}
        </div>
      </section>

      {error ? (
        <ErrorState onRetry={retry} />
      ) : loading ? (
        <>
          <div className="card-surface mt-6 flex justify-end px-5 py-4">
            <div className="skeleton h-9 w-52" />
          </div>
          <div className="skeleton mb-4 mt-4 h-4 w-40" />
          <GridSkeleton count={6} />
        </>
      ) : inCategory.length === 0 ? (
        <NotFoundView
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="এই মুহূর্তে এখানে দেখানোর মতো কোনো পণ্য পাওয়া যায়নি। অন্য ক্যাটাগরি দেখুন।"
        />
      ) : (
        <>
          {/* Sort control */}
          <div className="card-surface mt-6 flex justify-end px-5 py-4">
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          <p className="mb-4 mt-4 text-sm text-base-content/60">মোট {count}টি পণ্য দেখানো হচ্ছে</p>
          <ProductGrid products={sorted} />
        </>
      )}
    </div>
  );
}
