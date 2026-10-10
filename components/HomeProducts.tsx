"use client";

import { toBnDigits } from "@/lib/bn";
import { topFallers, topRisers } from "@/lib/product-utils";
import { useProducts } from "@/lib/use-products";
import ErrorState from "./ErrorState";
import ProductGrid from "./ProductGrid";
import { GridSkeleton, SectionSkeleton } from "./Skeletons";

export default function HomeProducts() {
  const { products, loading, error, retry } = useProducts();

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  if (loading || !products) {
    return (
      <>
        <SectionSkeleton />
        <SectionSkeleton />
        <section className="mt-10" id="সব-পণ্য">
          <div className="skeleton mb-2 h-7 w-32" />
          <div className="skeleton mb-4 h-4 w-48" />
          <GridSkeleton count={9} />
        </section>
      </>
    );
  }

  const risers = topRisers(products, 6);
  const fallers = topFallers(products, 6);

  return (
    <>
      {/* Section A */}
      <section className="mt-10" aria-labelledby="risers-heading">
        <h2 id="risers-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span aria-hidden className="text-base text-red-600">
            ▲
          </span>
          আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      {/* Section B */}
      <section className="mt-10" aria-labelledby="fallers-heading">
        <h2 id="fallers-heading" className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span aria-hidden className="text-base text-green-700">
            ▼
          </span>
          আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      {/* Section C — target of the hero CTA anchor */}
      <section id="সব-পণ্য" className="anchor-target mt-10" aria-labelledby="all-heading">
        <h2 id="all-heading" className="text-xl font-bold">
          সব পণ্য
        </h2>
        <p className="mb-4 mt-1 text-sm text-base-content/60">মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
