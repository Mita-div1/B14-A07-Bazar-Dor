import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

// JSON endpoint used by the Home / Category pages. It reads the BazarDor API
// on the server (with a local fallback) and the pages fetch this route, which
// is what lets us show skeleton loaders while it loads.
export const revalidate = 300;

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
  });
}
