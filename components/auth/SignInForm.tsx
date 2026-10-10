"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { bnAuthError } from "@/lib/auth-errors";
import { safeRedirect } from "@/lib/redirect";
import Field from "./Field";
import SocialButtons, { OrDivider } from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session } = useSession();
  const redirectTo = safeRedirect(params.get("redirect"));
  const reason = params.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Protected-route redirect: explain why the user landed here.
  useEffect(() => {
    if (reason === "protected") {
      toast.error("এই পৃষ্ঠা দেখতে আগে সাইন ইন করুন", { id: "protected-route" });
    }
  }, [reason]);

  // Already signed in -> go home.
  useEffect(() => {
    if (session && !loading) router.replace("/");
  }, [session, loading, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      toast.error("সঠিক ইমেইল ঠিকানা দিন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email: email.trim(), password });
      if (error) {
        toast.error(bnAuthError(error, "সাইন ইন করা যায়নি, আবার চেষ্টা করুন"));
        setLoading(false);
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="email"
          label="ইমেইল"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          autoComplete="current-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-1 h-11 w-full shadow-md" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>

      <OrDivider />
      <SocialButtons callbackURL={redirectTo} />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
