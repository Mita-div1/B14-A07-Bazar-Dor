// Generates data/products.json — run with `npm run data:generate`.
// Sample dataset for BazarDor: 33 products, 12 markets each.
// Prices are illustrative; they are not live market data.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const CATEGORY_TAGS = {
  rice: ["চাল", "খাদ্যশস্য"],
  dal: ["ডাল", "ডাল-শস্য"],
  oil: ["তেল", "রান্নার উপকরণ"],
  vegetables: ["সবজি", "কাঁচা বাজার"],
  fish: ["মাছ", "আমিষ"],
  meat: ["মাংস", "আমিষ"],
  "egg-dairy": ["ডিম-দুধ", "পুষ্টি"],
  spices: ["মসলা", "রান্নার উপকরণ"],
};

// slug, name, emoji, category, unit, price (BDT), change (% vs yesterday, signed)
const raw = [
  ["swarnamachhi-rice", "স্বর্ণমাছি চাল", "🍚", "rice", "কেজি", 148, 2.1],
  ["miniket-rice", "মিনিকেট চাল", "🍚", "rice", "কেজি", 99, -2.9],
  ["nazir-rice", "নাজির চাল", "🍚", "rice", "কেজি", 74, 0],
  ["batam-size-rice", "বাটাম সাইজ চাল", "🍚", "rice", "কেজি", 66, 3.1],

  ["masur-dal", "মসুর ডাল", "🫘", "dal", "কেজি", 142, 2.9],
  ["mug-dal", "মুগ ডাল", "🫘", "dal", "কেজি", 135, 0],
  ["chhola", "ছোলা", "🫘", "dal", "কেজি", 120, -2.4],
  ["aman-dal", "আমন ডাল (খোসাসিলা)", "🫘", "dal", "কেজি", 156, 2.6],

  ["mustard-oil", "সরিষার তেল", "🫙", "oil", "লিটার", 192, 2.1],
  ["palm-oil", "পাম তেল", "🛢️", "oil", "লিটার", 168, -2.3],
  ["ghani-mustard-oil", "ঘানি ভাঙা সরিষার তেল", "🫙", "oil", "লিটার", 215, 2.4],

  ["potato", "আলু", "🥔", "vegetables", "কেজি", 30, -6.2],
  ["onion", "পেঁয়াজ", "🧅", "vegetables", "কেজি", 54, 12.5],
  ["green-chilli", "কাঁচামরিচ", "🌶️", "vegetables", "কেজি", 92, -12.4],
  ["brinjal", "বেগুন", "🍆", "vegetables", "কেজি", 44, 4.8],
  ["okra", "ঢেঁড়স", "🥒", "vegetables", "কেজি", 38, 0],

  ["rui-fish", "রুই মাছ", "🐟", "fish", "কেজি", 46, 4.5],
  ["tilapia", "তেলাপিয়া", "🐟", "fish", "কেজি", 36, 0],
  ["hilsa", "ইলিশ মাছ", "🐟", "fish", "কেজি", 1850, 3.4],
  ["katla-fish", "কাতলা মাছ", "🐠", "fish", "কেজি", 43, -8.8],
  ["prawn", "চিংড়ি মাছ (খোলা)", "🦐", "fish", "কেজি", 730, 3.1],

  ["chicken", "মুরগির মাংস", "🍗", "meat", "কেজি", 225, -1.3],
  ["beef", "গরুর মাংস", "🥩", "meat", "কেজি", 790, -1.2],
  ["mutton", "খাসির মাংস", "🍖", "meat", "কেজি", 1290, -3.0],
  ["duck-meat", "হাঁসের মাংস", "🦆", "meat", "কেজি", 285, -3.8],

  ["egg", "ডিম", "🥚", "egg-dairy", "ডজন", 154, 3.9],
  ["milk", "দুধ", "🥛", "egg-dairy", "লিটার", 102, 2.0],
  ["curd", "দই", "🥣", "egg-dairy", "লিটার", 92, 0],
  ["butter", "মাখন (৫০০ গ্রাম)", "🧈", "egg-dairy", "পিস", 145, 3.6],

  ["ginger", "আদা", "🫚", "spices", "কেজি", 85, 9.0],
  ["garlic", "রসুন", "🧄", "spices", "কেজি", 125, -7.4],
  ["chilli-powder", "মরিচ গুঁড়া", "🌶️", "spices", "কেজি", 245, -2.0],
  ["coriander-powder", "ধনেপাতা গুঁড়া", "🌿", "spices", "কেজি", 265, 0],
];

// name, division, base factor vs. the national average
const markets = [
  ["মাঠ বাজার", "ময়মনসিংহ", 0.94],
  ["সদর বাজার", "রাজশাহী", 0.955],
  ["বাজারহাট", "খুলনা", 0.96],
  ["বাসারহাট বাজার", "রাজশাহী", 0.97],
  ["চৌর বাজার", "ময়মনসিংহ", 0.985],
  ["আমতলী বাজার", "চট্টগ্রাম", 0.99],
  ["ডবলগেট বাজার", "খুলনা", 1.0],
  ["চৌরাস্তা বাজার", "সিলেট", 1.01],
  ["গ্রীন মার্কেট, মিরপুর", "ঢাকা", 1.02],
  ["চৌদ্দগ্রাম বাজার", "চট্টগ্রাম", 1.03],
  ["আমবাজার", "সিলেট", 1.04],
  ["কারওয়ান বাজার", "ঢাকা", 1.05],
];

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const stepFor = (price) => (price < 200 ? 0.5 : price < 1000 ? 1 : 5);
const snap = (v, step, mode) => {
  const q = v / step;
  const n = mode === "floor" ? Math.floor(q) : mode === "ceil" ? Math.ceil(q) : Math.round(q);
  return Math.round(n * step * 100) / 100;
};

const products = raw.map(([slug, name, emoji, category, unit, price, change]) => {
  const h = hash(slug);
  const step = stepFor(price);
  const rows = markets.map(([market, division, factor], i) => {
    const jitter = 1 + (((h >> i) % 7) - 3) / 300;
    const avg = snap(price * factor * jitter, step, "round");
    return {
      market,
      division,
      min: snap(avg * 0.955, step, "floor"),
      max: snap(avg * 1.055, step, "ceil"),
      avg,
    };
  });
  const [categoryLabel, groupTag] = CATEGORY_TAGS[category];
  return {
    slug,
    name,
    emoji,
    category,
    unit,
    price,
    change,
    description: `সারাদেশের ${markets.length}টি বাজারের দামের ভিত্তিতে আজকের ${name}-এর বাজার দর।`,
    tags: [categoryLabel, groupTag],
    markets: rows,
  };
});

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(join(root, "data", "products.json"), JSON.stringify(products, null, 2) + "\n");
console.log(`wrote ${products.length} products to data/products.json`);
