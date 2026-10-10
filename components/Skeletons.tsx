import { gridClass } from "./ProductGrid";

export function CardSkeleton() {
  return (
    <div className="card-surface p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton mt-4 h-3 w-16" />
      <div className="mt-2 flex items-end justify-between">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={gridClass} role="status" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mt-10">
      <div className="skeleton mb-4 h-7 w-48" />
      <GridSkeleton count={count} />
    </section>
  );
}
