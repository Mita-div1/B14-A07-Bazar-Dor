"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import Field from "./auth/Field";

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [filled, setFilled] = useState(false);

  // Pre-fill the input once, when the session arrives.
  useEffect(() => {
    if (session && !filled) {
      setName(session.user.name ?? "");
      setFilled(true);
    }
  }, [session, filled]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    try {
      // https://better-auth.com/docs/concepts/users-accounts#update-user
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) {
        toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
        setLoading(false);
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <div className="mx-auto w-full max-w-[26rem]">
        <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mb-6 mt-1 text-sm text-base-content/60">আপনার নাম বদলাতে নিচের ঘরটি ব্যবহার করুন।</p>

        <div className="card-surface p-5 sm:p-6">
          {isPending ? (
            <div role="status" aria-label="লোড হচ্ছে…" className="space-y-4">
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-11 w-full" />
              <div className="skeleton h-11 w-full" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <Field
                id="update-name"
                label="নাম"
                type="text"
                autoComplete="name"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="btn btn-primary h-11 w-full shadow-md" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-base-content/60">
          <Link href="/profile" className="hover:text-primary">
            ← প্রোফাইলে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}
