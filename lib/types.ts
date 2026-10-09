export type CategorySlug =
  | "rice"
  | "dal"
  | "oil"
  | "vegetables"
  | "fish"
  | "meat"
  | "egg-dairy"
  | "spices";

export interface Category {
  slug: CategorySlug;
  label: string;
  emoji: string;
  subtitle: string;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
}

export interface Product {
  slug: string;
  name: string;
  emoji: string;
  category: CategorySlug;
  /** Unit without the "প্রতি" prefix — e.g. "কেজি", "লিটার", "ডজন", "পিস" */
  unit: string;
  /** Today's price in BDT (a real number, never a Bengali string). */
  price: number;
  /** Percent change vs. yesterday. > 0 up, < 0 down, 0 flat. */
  change: number;
  description: string;
  tags: string[];
  markets: MarketPrice[];
}
