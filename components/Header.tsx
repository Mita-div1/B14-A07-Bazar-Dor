import Link from "next/link";
import AuthMenu from "./AuthMenu";
import BanglaDate from "./BanglaDate";
import CategoryNav from "./CategoryNav";
import Ticker from "./Ticker";

export default function Header() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      {/* Row 1 — logo + date, auth on the right */}
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর — হোম">
          {/* Logo icon: public/logo-icon.png (from the assignment files) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
            <img src="/logo-icon.png" alt="" width={20} height={20} className="h-5 w-5 brightness-0 invert" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <BanglaDate className="block text-xs text-base-content/70" />
          </span>
        </Link>
        <AuthMenu />
      </div>

      {/* Row 2 — category links */}
      <CategoryNav />

      {/* Row 3 — price ticker */}
      <Ticker />
    </header>
  );
}
