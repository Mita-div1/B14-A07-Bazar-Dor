"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { bnAuthError } from "@/lib/auth-errors";
import Field from "./Field";
import SocialButtons, { OrDivider } from "./SocialButtons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session && !loading) router.replace("/");
  }, [session, loading, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("আপনার নাম লিখুন");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      toast.error("সঠিক ইমেইল ঠিকানা দিন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
      if (error) {
        toast.error(bnAuthError(error, "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"));
        setLoading(false);
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
      router.push("/signin");
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন");
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="name"
          label="নাম"
          type="text"
          autoComplete="name"
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          autoComplete="new-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Field
          id="confirm"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          autoComplete="new-password"
          placeholder="আবার লিখুন"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-1 h-11 w-full shadow-md" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <OrDivider />
      <SocialButtons callbackURL="/" />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
