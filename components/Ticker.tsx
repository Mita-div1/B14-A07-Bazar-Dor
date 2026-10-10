import { getAllProducts } from "@/lib/products";
import { trendOf } from "@/lib/product-utils";
import { formatBnNumber, formatPercent } from "@/lib/bn";
import type { Product } from "@/lib/types";

function TickerItem({ p, copy = false }: { p: Product; copy?: boolean }) {
  const trend = trendOf(p.change);
  const color = trend === "up" ? "text-red-600" : trend === "down" ? "text-green-700" : "text-base-content/50";
  const icon = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";

  return (
    <li
      aria-hidden={copy || undefined}
      className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-base-300 px-4 py-2 text-sm"
    >
      <span aria-hidden>{p.emoji}</span>
      <span className="font-medium">{p.name}</span>
      <span className="text-base-content/70">
        {formatBnNumber(p.price)} টাকা/{p.unit}
      </span>
      <span className={`font-semibold ${color}`}>
        {icon} {formatPercent(p.change)}
      </span>
    </li>
  );
}

/** Infinite scrolling price strip: the list is rendered twice and slid by -50%. */
export default async function Ticker() {
  const allProducts = await getAllProducts();
  return (
    <div className="ticker overflow-hidden border-t border-base-300 bg-base-100" aria-label="আজকের দামের তালিকা">
      <ul className="ticker-track">
        {allProducts.map((p) => (
          <TickerItem key={p.slug} p={p} />
        ))}
        {allProducts.map((p) => (
          <TickerItem key={`${p.slug}-copy`} p={p} copy />
        ))}
      </ul>
    </div>
  );
}
