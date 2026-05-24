"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  variant?: "icon" | "text";
  className?: string;
}

export function SignOutButton({
  variant = "text",
  className = "",
}: SignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => void signOut()}
        disabled={loading}
        aria-label="Sign out"
        className={`grid h-9 w-9 place-items-center rounded-full bg-white text-scotia-navy ring-1 ring-black/5 disabled:opacity-60 ${className}`}
      >
        <LogOut className="h-4 w-4" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      disabled={loading}
      className={`text-[13px] font-semibold text-scotia-navy/70 underline-offset-2 hover:text-scotia-navy hover:underline disabled:opacity-60 ${className}`}
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
