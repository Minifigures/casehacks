"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  Gift,
  Sparkles,
  Ticket,
  UserPlus,
  Users,
} from "lucide-react";
import {
  REFERRAL_REWARD_PER_FRIEND,
  type ReferralState,
  evaluateRedeem,
} from "@/lib/referral";

interface ReferralScreenProps {
  state: ReferralState;
  onRedeem: (code: string) => void;
}

function formatMoney(value: number) {
  return value.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function ReferralScreen({ state, onRedeem }: ReferralScreenProps) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
    | null
  >(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleRedeem = () => {
    const result = evaluateRedeem(input, state.redeemedCodes);
    if (!result.ok) {
      const message =
        result.reason === "empty"
          ? "Enter a code to redeem."
          : result.reason === "already-redeemed"
            ? "That code has already been redeemed."
            : "That code isn't valid. Try WELCOME25.";
      setFeedback({ kind: "error", message });
      return;
    }
    onRedeem(result.normalizedCode);
    setFeedback({
      kind: "success",
      message: `+$${formatMoney(result.reward)} added to your chequing.`,
    });
    setInput("");
  };

  const friendsJoined = state.activity.filter((a) => a.kind === "invited").length;

  return (
    <div className="mt-2 space-y-4">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-wider text-scotia-red">
          Refer a friend
        </p>
        <h2 className="mt-1 text-[22px] font-bold leading-tight tracking-tight text-scotia-navy">
          Get ${REFERRAL_REWARD_PER_FRIEND} for every friend who joins.
        </h2>
        <p className="mt-1 text-[13px] text-scotia-grey">
          Share your code. They get a welcome bonus, you get $
          {REFERRAL_REWARD_PER_FRIEND} in your chequing.
        </p>
      </header>

      <motion.section
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="rounded-3xl bg-gradient-to-br from-scotia-navy to-[#1b2a6b] p-5 text-white shadow-[0_16px_36px_-16px_rgba(0,15,77,0.5)]"
      >
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/80">
          <Sparkles className="h-3 w-3" /> Your referral code
        </p>
        <p className="mt-2 text-[30px] font-black tracking-[0.05em] tabular-nums">
          {state.code}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white py-2.5 text-[13px] font-semibold text-scotia-navy"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy code
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white/15 py-2.5 text-[13px] font-semibold text-white ring-1 ring-white/25"
          >
            <UserPlus className="h-4 w-4" /> Share
          </button>
        </div>
      </motion.section>

      <section className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
          <Ticket className="h-3 w-3" /> Have a code?
        </p>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (feedback) setFeedback(null);
            }}
            placeholder="Enter referral code"
            className="w-full rounded-xl bg-surface-elevated px-3 py-2.5 text-[14px] font-semibold uppercase tracking-wider text-scotia-navy ring-1 ring-black/5 placeholder:text-scotia-grey/70 placeholder:font-medium placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-scotia-red/40"
          />
          <button
            type="button"
            onClick={handleRedeem}
            className="rounded-xl bg-scotia-red px-4 text-[13px] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(236,17,26,0.6)]"
          >
            Redeem
          </button>
        </div>
        {feedback ? (
          <p
            className={`mt-2 text-[12px] font-semibold ${
              feedback.kind === "success" ? "text-success" : "text-loss"
            }`}
          >
            {feedback.message}
          </p>
        ) : (
          <p className="mt-2 text-[11px] text-scotia-grey">
            Try{" "}
            <span className="font-semibold text-scotia-navy">WELCOME25</span> or
            ask a friend for theirs.
          </p>
        )}
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
            <Users className="h-3 w-3" /> Friends joined
          </p>
          <p className="mt-1 text-[22px] font-black tabular-nums text-scotia-navy">
            {friendsJoined}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
            <Gift className="h-3 w-3" /> Earned
          </p>
          <p className="mt-1 text-[22px] font-black tabular-nums text-scotia-navy">
            ${formatMoney(state.earned)}
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[14px] font-bold text-scotia-navy">
          Referral activity
        </h3>
        {state.activity.length === 0 ? (
          <p className="mt-2 rounded-2xl bg-surface-elevated p-4 text-center text-[12px] text-scotia-grey ring-1 ring-black/5">
            Nothing yet. Share your code to start earning.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-black/5 rounded-2xl bg-white ring-1 ring-black/5">
            {state.activity.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-elevated text-scotia-navy">
                    {event.kind === "invited" ? (
                      <UserPlus className="h-4 w-4" />
                    ) : (
                      <Ticket className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-scotia-navy">
                      {event.name}
                    </p>
                    <p className="text-[11px] text-scotia-grey">{event.date}</p>
                  </div>
                </div>
                <p className="text-[14px] font-bold tabular-nums text-success">
                  +${formatMoney(event.reward)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="pb-2 text-center text-[10px] text-scotia-grey">
        Bonuses settle to Everyday Chequing · Promotional rates apply
      </p>
    </div>
  );
}
