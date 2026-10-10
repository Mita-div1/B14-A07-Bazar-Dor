import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      {/* useSearchParams needs a Suspense boundary during static rendering */}
      <Suspense fallback={<div className="skeleton h-72 w-full" />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
