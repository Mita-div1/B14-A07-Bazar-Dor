import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { formatBnNumber, formatTaka, toBnDigits } from "@/lib/bn";
import { getCategory } from "@/lib/categories";
import { marketSummary, priceDifference, trendOf } from "@/lib/product-utils";
import { getProductBySlug } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name}র দাম` : "পৃষ্ঠা পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const summary = marketSummary(product);
  const trend = trendOf(product.change);
  const diff = priceDifference(product);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-base-content/70">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span aria-hidden>›</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-primary">
              {category.label}
            </Link>
            <span aria-hidden>›</span>
          </>
        )}
        <span className="text-base-content">{product.name}</span>
      </nav>

      {/* Summary */}
      <section className="card-surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4 sm:items-center sm:gap-5">
          <span
            aria-hidden
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl sm:h-20 sm:w-20 sm:text-5xl"
          >
            {product.emoji}
          </span>
          <div>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{product.name}</h1>
            <p className="mt-1 text-sm text-base-content/60">
              প্রতি {product.unit}
              {category && ` · ${category.label}`}
            </p>
            <p className="mt-1 text-sm">
              {trend === "flat" ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম <strong>{trend === "up" ? "বেড়েছে" : "কমেছে"}</strong> · {formatTaka(diff)}
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-base-content/70">{toBnDigits(product.description)}</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="ক্যাটাগরি ট্যাগ">
              {product.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-primary">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-base-200 px-6 py-4 text-center sm:min-w-44">
          <p className="text-sm text-base-content/60">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatBnNumber(product.price)}</p>
          <p className="text-sm text-base-content/60">টাকা / {product.unit}</p>
          <ChangeBadge change={product.change} className="mt-2 bg-transparent!" />
        </div>
      </section>

      {/* Price summary + market table */}
      <section className="card-surface mt-6 p-5 sm:p-6">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <SummaryTile label="সর্বনিম্ন দাম" value={summary.min} note="সবচেয়ে কম দামের বাজার" tone="text-green-700" />
          <SummaryTile label="সর্বাধিক দাম" value={summary.max} note="সবচেয়ে বেশি দামের বাজার" tone="text-red-600" />
          <SummaryTile label="গড় দাম" value={summary.avg} note={`প্রতি ${product.unit}-এর হিসাবে`} tone="text-green-700" />
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-base-content/60">
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => (
                <tr key={m.market} className={`border-t border-base-300 ${i % 2 === 1 ? "bg-base-200/60" : ""}`}>
                  <td className="px-4 py-3">{m.market}</td>
                  <td className="px-4 py-3">{m.division}</td>
                  <td className="px-4 py-3 text-right">{formatTaka(m.min)}</td>
                  <td className="px-4 py-3 text-right">{formatTaka(m.max)}</td>
                  <td className="px-4 py-3 text-right font-bold">{formatTaka(m.avg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SummaryTile({ label, value, note, tone }: { label: string; value: number; note: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-base-300 p-4">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>
        {formatBnNumber(value)} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-base-content/60">{note}</p>
    </div>
  );
}
