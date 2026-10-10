import type { Metadata } from "next";
import NotFoundView from "@/components/NotFoundView";

export const metadata: Metadata = { title: "পৃষ্ঠা পাওয়া যায়নি" };

export default function NotFound() {
  return <NotFoundView />;
}
