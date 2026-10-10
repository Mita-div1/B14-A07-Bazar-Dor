/* eslint-disable @next/next/no-img-element */
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="card-surface relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <BanglaDate className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary" />
          {/* Heading */}
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          {/* Subtitle */}
          <p className="mt-3 text-base text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>
          {/* Primary CTA — same-page anchor, not a route change */}
          <a href="#সব-পণ্য" className="btn btn-primary mt-6 shadow-md">
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Banner image */}
        <img
          src="/hero-basket.svg"
          alt="সবজির ঝুড়ির ছবি"
          width={360}
          height={300}
          className="mx-auto w-48 shrink-0 sm:w-60 md:mx-0 md:mr-6 md:w-72"
        />
      </div>
    </section>
  );
}
