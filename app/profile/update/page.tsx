import type { Metadata } from "next";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default function UpdateProfilePage() {
  return <UpdateProfileForm />;
}
