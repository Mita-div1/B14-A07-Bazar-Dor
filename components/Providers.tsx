"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: { fontFamily: "var(--font-bn), sans-serif", fontSize: "15px" },
          success: { iconTheme: { primary: "#07873f", secondary: "#fff" } },
        }}
      />
    </>
  );
}
