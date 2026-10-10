"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bnAuthError } from "@/lib/auth-errors";

type Provider = "google" | "github";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);

  async function signInWith(provider: Provider) {
    setLoading(provider);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL });
      if (error) {
        toast.error(bnAuthError(error, "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন"));
        setLoading(null);
      }
      // On success the browser is redirected to the provider, then back to callbackURL.
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
      setLoading(null);
    }
  }

  const btn =
    "flex h-11 items-center justify-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 text-sm font-semibold transition hover:bg-base-200 disabled:opacity-60";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" className={btn} disabled={loading !== null} onClick={() => signInWith("google")}>
        {loading === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" className={btn} disabled={loading !== null} onClick={() => signInWith("github")}>
        {loading === "github" ? <span className="loading loading-spinner loading-xs" /> : <GithubIcon />}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs text-base-content/60">
      <span className="h-px flex-1 bg-base-300" />
      অথবা
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="h-4 w-4">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.100 0 24s.9 7.6 2.6 10.800l7.9-6.100z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.900-2.100 15.900-5.800l-7.500-5.800c-2.100 1.400-4.800 2.300-8.400 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
