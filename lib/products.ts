import rawProducts from "@/data/products.json";
import type { Product } from "./types";
import { bnToNumber } from "./bn";

export const allProducts = rawProducts as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export type Trend = "up" | "down" | "flat";

export function trendOf(change: number): Trend {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

export function topRisers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, count);
}

export function topFallers(products: Product[], count = 6): Product[] {
  return products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, count);
}

export type SortKey = "default" | "price-asc" | "price-desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

/**
 * Sorts by numeric value. `bnToNumber` accepts numbers *and* Bengali-digit
 * strings ("১,৮৫০ টাকা"), so "৯৯" correctly sorts before "১৪৮" — a plain string
 * comparison would get this wrong ("১৪৮" < "৯৯").
 */
export function sortProducts(products: Product[], key: SortKey): Product[] {
  if (key === "default") return products;
  const dir = key === "price-asc" ? 1 : -1;
  return [...products].sort((a, b) => dir * (bnToNumber(a.price) - bnToNumber(b.price)));
}

/** Yesterday's price, derived from today's price and the % change. */
export function priceDifference(p: Product): number {
  if (p.change === 0) return 0;
  const yesterday = p.price / (1 + p.change / 100);
  return Math.abs(Math.round(p.price - yesterday));
}

export function marketSummary(p: Product) {
  const mins = p.markets.map((m) => m.min);
  const maxs = p.markets.map((m) => m.max);
  const lowest = p.markets.find((m) => m.min === Math.min(...mins));
  const highest = p.markets.find((m) => m.max === Math.max(...maxs));
  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
    avg: p.price,
    lowestMarket: lowest?.market,
    highestMarket: highest?.market,
  };
}
