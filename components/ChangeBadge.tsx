import { formatPercent } from "@/lib/bn";
import { trendOf } from "@/lib/products";

/**
 * ▲ ২.১%  (price went up   — red, as in the Figma: higher prices are bad news)
 * ▼ ২.৯%  (price went down — green)
 * — ০.০%  (unchanged       — gray)
 */
export default function ChangeBadge({ change, className = "" }: { change: number; className?: string }) {
  const trend = trendOf(change);
  const style =
    trend === "up"
      ? "bg-red-50 text-red-600"
      : trend === "down"
        ? "bg-green-50 text-green-700"
        : "bg-base-200 text-base-content/60";
  const icon = trend === "up" ? "▲" : trend === "down" ? "▼" : "—";
  const label = trend === "up" ? "দাম বেড়েছে" : trend === "down" ? "দাম কমেছে" : "দাম অপরিবর্তিত";

  return (
    <span
      title={label}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style} ${className}`}
    >
      <span aria-hidden className="text-[10px]">
        {icon}
      </span>
      {formatPercent(change)}
    </span>
  );
}
