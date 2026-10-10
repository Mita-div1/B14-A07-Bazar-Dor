"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "./types";

/**
 * Fetches the product list from /api/products so pages can show a skeleton
 * while the data loads. The small delay makes the loading state visible even
 * though the API answers instantly from a static JSON file.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setError(false);

    (async () => {
      try {
        const [res] = await Promise.all([fetch("/api/products"), new Promise((r) => setTimeout(r, 450))]);
        if (!res.ok) throw new Error("bad response");
        const data = (await res.json()) as Product[];
        if (alive) setProducts(data);
      } catch {
        if (alive) setError(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setProducts(null);
    setAttempt((n) => n + 1);
  }, []);

  return { products, error, loading: products === null && !error, retry };
}
