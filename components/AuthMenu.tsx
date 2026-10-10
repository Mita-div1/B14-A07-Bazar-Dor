"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";

function closeMenu() {
  (document.activeElement as HTMLElement | null)?.blur();
}

export default function AuthMenu() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    closeMenu();
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-2" aria-label="লোড হচ্ছে">
        <div className="skeleton h-9 w-9 rounded-full" />
        <div className="skeleton hidden h-4 w-16 sm:block" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm shadow-md sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const firstName = user.name?.split(" ")[0] || "প্রোফাইল";

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 hover:bg-base-200">
        <Avatar name={user.name} image={user.image} size={36} />
        <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
        <span aria-hidden className="text-[10px] text-base-content/50">
          ▾
        </span>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl"
      >
        <p className="font-semibold">{user.name}</p>
        <p className="mb-3 truncate text-sm text-base-content/60">{user.email}</p>
        <Link href="/profile" onClick={closeMenu} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-base-200">
          <span aria-hidden>👤</span> আমার প্রোফাইল
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-error hover:bg-red-50"
        >
          <span aria-hidden>↩</span> সাইন আউট
        </button>
      </div>
    </div>
  );
}
