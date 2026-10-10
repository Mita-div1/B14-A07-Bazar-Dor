import Link from "next/link";

interface Props {
  title?: string;
  message?: string;
}

/** Friendly 404-style message with a way back home. Used by not-found.tsx and empty lists. */
export default function NotFoundView({
  title = "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে ঠিকানাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা ঠিকানাটি ভুল।",
}: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="card-surface mx-auto max-w-lg px-6 py-12 text-center">
        <p className="text-6xl font-bold text-primary">৪০৪</p>
        <p className="mt-2 text-4xl" aria-hidden>
          🛒
        </p>
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-base-content/70">{message}</p>
        <Link href="/" className="btn btn-primary mt-6 shadow-md">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
