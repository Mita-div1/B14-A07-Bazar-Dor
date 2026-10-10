import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <div className="mx-auto w-full max-w-[26rem]">
        <h1 className="text-center text-3xl font-bold">{title}</h1>
        <p className="mb-6 mt-2 text-center text-sm text-base-content/60">{subtitle}</p>
        <div className="card-surface p-5 sm:p-6">{children}</div>
        <p className="mt-6 text-center text-sm text-base-content/60">
          <Link href="/" className="hover:text-primary">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}
