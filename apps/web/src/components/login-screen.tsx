"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { PhoneFrame } from "@/components/phone-frame";
import { ScotiaMark } from "@/components/scotia-mark";

export function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/app");
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-scotia-navy outline-none ring-scotia-red/30 focus:ring-2"
              />
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-scotia-red py-3.5 text-[15px] font-semibold text-white"
            >
              Sign in
            </button>
          </form>

          <p className="mt-auto pt-8 text-center text-[12px] text-scotia-grey">
            Demo mockup for caseHACKS judges. Authentication is not wired up.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
