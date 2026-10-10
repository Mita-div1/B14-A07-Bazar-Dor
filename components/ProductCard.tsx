import Link from "next/link";
import { formatBnNumber } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card-surface group block p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl"
        >
          {product.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{product.name}</h3>
          <p className="text-sm text-base-content/60">প্রতি {product.unit}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-base-content/60">আজকের দাম</p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-xl font-bold">
          {formatBnNumber(product.price)} <span className="text-sm font-medium">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
