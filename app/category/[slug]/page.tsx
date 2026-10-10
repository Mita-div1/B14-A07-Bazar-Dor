import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { categories, getCategory } from "@/lib/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

// Unknown slugs must render the 404 page instead of being pre-built.
export const dynamicParams = true;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category ? `${category.label}র দাম` : "পৃষ্ঠা পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return <CategoryProducts category={category} />;
}
