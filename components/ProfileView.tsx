"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";
import Field from "./auth/Field";

export default function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10">
      <div className="mx-auto w-full max-w-[46rem]">
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="mb-6 mt-1 text-sm text-base-content/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        {isPending || !session ? (
          <div role="status" aria-label="লোড হচ্ছে…" className="space-y-4">
            <div className="card-surface flex items-center gap-4 p-6">
              <div className="skeleton h-20 w-20 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-40" />
                <div className="skeleton h-4 w-56" />
              </div>
            </div>
            <div className="skeleton h-56 w-full rounded-2xl" />
          </div>
        ) : (
          <>
            <section className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-4">
                <Avatar name={session.user.name} image={session.user.image} size={80} rounded="rounded-xl" />
                <div className="min-w-0">
                  <p className="text-xl font-semibold">{session.user.name}</p>
                  <p className="truncate text-base-content/60">{session.user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn btn-outline btn-error btn-sm self-start sm:btn-md sm:self-auto"
              >
                ↩ সাইন আউট
              </button>
            </section>

            <section className="card-surface mt-5 p-5 sm:p-6">
              <h2 className="mb-4 text-lg font-bold">তথ্য</h2>
              <Field id="profile-name" label="নাম" value={session.user.name ?? ""} readOnly disabled />
              <Link href="/profile/update" className="btn btn-primary h-11 w-full shadow-md">
                আপডেট
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
