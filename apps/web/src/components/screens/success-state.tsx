"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Target, Sparkles, Ticket } from "lucide-react";
import { evaluateRedeem, type ReferralState } from "@/lib/referral";

interface SuccessStateProps {
  referralState: ReferralState;
  onRedeem: (normalizedCode: string) => void;
  onAdvance: () => void;
}

export function SuccessState({
  referralState,
  onRedeem,
  onAdvance,
}: SuccessStateProps) {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState<
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
    | null
  >(null);

  const handleRedeem = () => {
    const result = evaluateRedeem(code, referralState.redeemedCodes);
    if (!result.ok) {
      setFeedback({
        kind: "error",
        message:
          result.reason === "empty"
            ? "Enter a code first."
            : result.reason === "already-redeemed"
              ? "Already redeemed."
              : "Invalid code.",
      });
      return;
    }
    onRedeem(result.normalizedCode);
    setFeedback({
      kind: "success",
      message: `+$${result.reward} added to chequing.`,
    });
    setCode("");
  };

  return (
    <div className="relative flex h-full flex-col bg-white px-5 pb-6">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-scotia-navy/10 via-scotia-navy/5 to-transparent" />

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          className="grid h-24 w-24 place-items-center rounded-full bg-scotia-navy/10 text-scotia-navy shadow-[0_16px_40px_-12px_rgba(0,15,77,0.25)]"
        >
          <Check className="h-12 w-12" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="mt-7 text-[26px] font-bold leading-tight tracking-tight text-scotia-navy"
        >
          TFSA opened in 23 seconds.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-scotia-grey"
        >
          $100 invested in Scotia Selected Balanced Portfolio. Auto-deposit set
          to $25 a week.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-7 w-full rounded-2xl border border-scotia-red/15 bg-scotia-red/5 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-scotia-red shadow">
              <Target className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-scotia-red">
                Scotia Owners <Sparkles className="h-3 w-3" />
              </p>
              <p className="mt-1 text-[13px] font-semibold text-scotia-navy">
                You also earned 0.01 BNS shares.
              </p>
              <p className="text-[12px] text-scotia-grey">
                Loyalty pays in equity, not just points.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-4 w-full rounded-2xl bg-white p-4 ring-1 ring-black/5"
        >
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
            <Ticket className="h-3 w-3" /> Got a referral code?
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (feedback) setFeedback(null);
              }}
              placeholder="WELCOME25"
              className="w-full rounded-xl bg-surface-elevated px-3 py-2 text-[13px] font-semibold uppercase tracking-wider text-scotia-navy ring-1 ring-black/5 placeholder:text-scotia-grey/70 focus:outline-none focus:ring-scotia-red/40"
            />
            <button
              type="button"
              onClick={handleRedeem}
              className="rounded-xl bg-scotia-navy px-4 text-[12px] font-semibold text-white"
            >
              Redeem
            </button>
          </div>
          {feedback ? (
            <p
              className={`mt-2 text-left text-[11px] font-semibold ${
                feedback.kind === "success" ? "text-success" : "text-loss"
              }`}
            >
              {feedback.message}
            </p>
          ) : null}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onAdvance}
        className="mt-6 w-full rounded-2xl bg-scotia-red py-4 text-[15px] font-semibold text-white shadow-[0_12px_32px_-12px_rgba(236,17,26,0.6)]"
      >
        Continue
      </button>
    </div>
  );
}
