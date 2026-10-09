import { NextResponse } from "next/server";
import { allProducts } from "@/lib/products";

// Lightweight JSON API so the Home / Category pages really *fetch* their data
// (which is what lets us show skeleton loaders while it loads).
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(allProducts, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
  });
}
