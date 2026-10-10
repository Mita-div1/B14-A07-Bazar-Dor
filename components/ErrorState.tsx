"use client";

export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="card-surface mt-10 px-6 py-12 text-center">
      <p className="text-4xl" aria-hidden>
        ⚠️
      </p>
      <h2 className="mt-3 text-lg font-bold">তথ্য লোড করা যায়নি</h2>
      <p className="mt-1 text-sm text-base-content/60">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
      <button type="button" onClick={onRetry} className="btn btn-primary mt-5">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
