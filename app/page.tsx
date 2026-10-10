import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <Hero />
      <HomeProducts />
    </div>
  );
}
