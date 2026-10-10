import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={gridClass}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
