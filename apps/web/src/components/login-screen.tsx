"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { PhoneFrame } from "@/components/phone-frame";
import { ScotiaMark } from "@/components/scotia-mark";

export function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Invalid username or password.");
        return;
      }

      const from = searchParams.get("from");
      router.replace(from && from !== "/login" ? from : "/");
      router.refresh();
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col bg-surface-elevated px-5 pb-8">
        <header className="pt-2">
          <ScotiaMark />
        </header>

        <div className="mt-10 flex flex-1 flex-col">
          <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-scotia-red/10 text-scotia-red">
            <LockKeyhole className="h-6 w-6" aria-hidden />
          </div>

          <h1 className="text-[26px] font-bold tracking-tight text-scotia-navy">
            Sign in to uTrade
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-scotia-grey">
            Use your Scotia mobile banking credentials to access the prototype.
          </p>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-scotia-navy">
                Username
              </span>
              <input
                type="text"
                name="username"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-scotia-navy outline-none ring-scotia-red/30 focus:ring-2"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-scotia-navy">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-scotia-navy outline-none ring-scotia-red/30 focus:ring-2"
              />
            </label>

            {error ? (
              <p className="rounded-lg bg-loss/10 px-3 py-2 text-[13px] font-medium text-loss">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-scotia-red py-3.5 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-auto pt-8 text-center text-[12px] text-scotia-grey">
            Demo access for caseHACKS judges. Credentials are configured via environment variables.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
