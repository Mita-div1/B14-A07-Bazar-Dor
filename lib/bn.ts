// Bengali number / date helpers. Written by hand (no Intl/ICU dependency) so the
// server and the browser always render exactly the same text — no hydration drift.

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** "1,850.5" -> "১,৮৫০.৫" (any Latin digits in the string are converted) */
export function toBnDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** "১,৮৫০.৫০" -> 1850.5  (Bengali or Latin digits, commas and "টাকা" ignored) */
export function bnToNumber(input: string | number): number {
  if (typeof input === "number") return input;
  const latin = input
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^0-9.\-]/g, "");
  const n = parseFloat(latin);
  return Number.isNaN(n) ? 0 : n;
}

/** 1850 -> "১,৮৫০"   63.5 -> "৬৩.৫০"   (decimals shown only when needed) */
export function formatBnNumber(value: number): string {
  const hasFraction = Math.abs(value % 1) > 1e-9;
  const latin = value.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return toBnDigits(latin);
}

/** 1850 -> "১,৮৫০ টাকা" */
export function formatTaka(value: number): string {
  return `${formatBnNumber(value)} টাকা`;
}

/** 2.1 -> "২.১%" */
export function formatPercent(value: number): string {
  return `${toBnDigits(Math.abs(value).toFixed(1))}%`;
}

const WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/** "শুক্রবার, ৯ অক্টোবর, ২০২৬" — always in Bangladesh time (UTC+6). */
export function formatBanglaDate(date: Date = new Date()): string {
  const dhaka = new Date(date.getTime() + 6 * 60 * 60 * 1000);
  const weekday = WEEKDAYS[dhaka.getUTCDay()];
  const day = toBnDigits(dhaka.getUTCDate());
  const month = MONTHS[dhaka.getUTCMonth()];
  const year = toBnDigits(dhaka.getUTCFullYear());
  return `${weekday}, ${day} ${month}, ${year}`;
}
