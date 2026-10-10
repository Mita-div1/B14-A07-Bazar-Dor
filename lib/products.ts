import { cache } from "react";
import localProducts from "@/data/products.json";
import type { CategorySlug, MarketPrice, Product } from "./types";

// Server-only: this file pulls the local fallback JSON into the bundle.
// Client components should fetch /api/products and use ./product-utils instead.

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

/* ---------- API → app mapping ---------- */

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  hali: "হালি",
  gram: "গ্রাম",
  g: "গ্রাম",
};

function categoryFrom(nameBn: string, icon: string): CategorySlug {
  const n = nameBn || "";
  if (n.includes("চাল")) return "rice";
  if (n.includes("ডাল")) return "dal";
  if (n.includes("তেল")) return "oil";
  if (n.includes("সবজি")) return "vegetables";
  if (n.includes("মাছ")) return "fish";
  if (n.includes("মাংস")) return "meat";
  if (n.includes("ডিম") || n.includes("দুধ") || n.includes("দুগ্ধ")) return "egg-dairy";
  if (n.includes("মসলা")) return "spices";

  const byIcon: Record<string, CategorySlug> = {
    "🍚": "rice",
    "🫘": "dal",
    "🛢️": "oil",
    "🥬": "vegetables",
    "🐟": "fish",
    "🍗": "meat",
    "🥛": "egg-dairy",
    "🌶️": "spices",
  };
  return byIcon[icon] ?? "rice";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function toProduct(raw: any): Product | null {
  if (!raw || typeof raw !== "object" || !raw.slug || typeof raw.today !== "number") return null;

  const category = categoryFrom(raw.categoryNameBn, raw.categoryIcon);

  let change = 0;
  if (raw.change && typeof raw.change.pct === "number") {
    change = raw.change.dir === "down" ? -raw.change.pct : raw.change.dir === "up" ? raw.change.pct : 0;
  } else if (typeof raw.yesterday === "number" && raw.yesterday > 0) {
    change = Math.round(((raw.today - raw.yesterday) / raw.yesterday) * 1000) / 10;
  }

  const markets: MarketPrice[] = Array.isArray(raw.markets)
    ? raw.markets.map((m: any) => ({
        market: String(m.market),
        division: String(m.division),
        min: Number(m.min),
        max: Number(m.max),
        avg: typeof m.avg === "number" ? m.avg : Math.round(((Number(m.min) + Number(m.max)) / 2) * 10) / 10,
      }))
    : [];

  const unitRaw = String(raw.unit ?? "");
  const name = String(raw.nameBn ?? raw.name ?? raw.slug);

  return {
    slug: String(raw.slug),
    name,
    emoji: String(raw.image || raw.categoryIcon || "🛒"),
    category,
    unit: UNIT_BN[unitRaw.toLowerCase()] ?? unitRaw,
    price: raw.today,
    change,
    description: `সারাদেশের ${markets.length}টি বাজারের দামের ভিত্তিতে আজকের ${name}-এর বাজার দর।`,
    tags: [String(raw.categoryNameBn ?? "")].filter(Boolean),
    markets,
  };
}

/** Finds the product array whatever the response wrapper looks like. */
function findList(json: any, depth = 0): any[] | null {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== "object" || depth > 3) return null;
  for (const value of Object.values(json)) {
    if (Array.isArray(value) && value.length && value[0] && typeof value[0] === "object" && "slug" in value[0]) {
      return value;
    }
  }
  for (const value of Object.values(json)) {
    const found = findList(value, depth + 1);
    if (found) return found;
  }
  return null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function fetchFromApi(): Promise<Product[] | null> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const list = findList(await res.json());
    if (!list) return null;
    const products = list.map(toProduct).filter((p): p is Product => p !== null);
    return products.length > 0 ? products : null;
  } catch {
    return null;
  }
}

/**
 * All products. They come from the BazarDor API; if the API is unreachable,
 * the bundled sample data keeps the site working.
 */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  return (await fetchFromApi()) ?? (localProducts as unknown as Product[]);
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}
