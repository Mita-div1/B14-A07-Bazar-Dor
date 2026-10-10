"use client";

import { useEffect, useState } from "react";
import { formatBanglaDate } from "@/lib/bn";

/**
 * Today's date in Bangla. Rendered after mount so a statically built page never
 * shows a stale date (and the server / browser markup always match).
 */
export default function BanglaDate({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(formatBanglaDate());
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {text || " "}
    </span>
  );
}
