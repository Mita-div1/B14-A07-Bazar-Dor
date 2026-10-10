import rawProducts from "@/data/products.json";
import type { Product } from "./types";

// Server-only: importing this file pulls the whole JSON into the bundle.
// Client components should fetch /api/products and use ./product-utils instead.
export const allProducts = rawProducts as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}
