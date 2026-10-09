import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  { slug: "rice", label: "চাল", emoji: "🍚", subtitle: "চালের আজকের দাম ও পরিবর্তন" },
  { slug: "dal", label: "ডাল", emoji: "🫘", subtitle: "ডালের আজকের দাম ও পরিবর্তন" },
  { slug: "oil", label: "তেল", emoji: "🛢️", subtitle: "তেলের আজকের দাম ও পরিবর্তন" },
  { slug: "vegetables", label: "সবজি", emoji: "🥬", subtitle: "সবজির আজকের দাম ও পরিবর্তন" },
  { slug: "fish", label: "মাছ", emoji: "🐟", subtitle: "মাছের আজকের দাম ও পরিবর্তন" },
  { slug: "meat", label: "মাংস", emoji: "🍗", subtitle: "মাংসের আজকের দাম ও পরিবর্তন" },
  { slug: "egg-dairy", label: "ডিম-দুধ", emoji: "🥛", subtitle: "ডিম ও দুগ্ধজাত পণ্যের আজকের দাম ও পরিবর্তন" },
  { slug: "spices", label: "মসলা", emoji: "🌶️", subtitle: "মসলার আজকের দাম ও পরিবর্তন" },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === (slug as CategorySlug));
}
