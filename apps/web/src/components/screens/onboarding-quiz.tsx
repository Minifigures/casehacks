"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { HorizonAnswer, RiskAnswer, QuizState } from "@/lib/types";

interface OnboardingQuizProps {
  onAdvance: (state: QuizState) => void;
  onBack: () => void;
}

const horizonOptions: ReadonlyArray<{ id: HorizonAnswer; label: string; hint: string }> = [
  { id: "1y", label: "Within 1 year", hint: "Short term goal" },
  { id: "5y", label: "1, 5 years", hint: "Med term, like a down payment" },
  { id: "20y", label: "5+ years", hint: "Long term, like retirement" },
];

const riskOptions: ReadonlyArray<{ id: RiskAnswer; label: string; hint: string }> = [
  { id: "sell", label: "Yes, I'd sell", hint: "Lower risk allocation" },
  { id: "hold", label: "No, I'd hold", hint: "Higher growth allocation" },
];

export function OnboardingQuiz({ onAdvance, onBack }: OnboardingQuizProps) {
  const [horizon, setHorizon] = useState<HorizonAnswer | null>(null);
  const [risk, setRisk] = useState<RiskAnswer | null>(null);

  const step = horizon === null ? 1 : 2;
  const canContinue = horizon !== null && risk !== null;

  return (
    <div className="flex h-full flex-col bg-white px-5 pb-6">
      <header className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="grid h-9 w-9 place-items-center rounded-full bg-surface-elevated text-scotia-navy"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-[12px] font-medium text-scotia-grey">
          {step} of 2
        </p>
        <div className="h-9 w-9" />
      </header>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        <motion.div
          className="h-full bg-scotia-red"
          initial={false}
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      <div className="mt-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-scotia-grey">
          QuickStart
        </p>
        <h1 className="mt-2 text-[24px] font-bold leading-snug tracking-tight text-scotia-navy">
          {horizon === null
            ? "When do you need this money?"
            : "If your $100 dropped to $80, would you sell?"}
        </h1>
        <p className="mt-2 text-[13px] text-scotia-grey">
          Your Scotia KYC covers identity. These two questions cover risk and
          horizon (CIRO Rule 3400).
        </p>
      </div>

      <AnimatePresence mode="wait">
        {horizon === null ? (
          <motion.ul
            key="q1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 space-y-3"
          >
            {horizonOptions.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => setHorizon(opt.id)}
                  className="w-full rounded-2xl border-2 border-black/10 bg-white px-5 py-4 text-left transition hover:border-scotia-red hover:bg-scotia-red/5"
                >
                  <p className="text-[16px] font-semibold text-scotia-navy">
                    {opt.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-scotia-grey">
                    {opt.hint}
                  </p>
                </button>
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.ul
            key="q2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 space-y-3"
          >
            {riskOptions.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => setRisk(opt.id)}
                  className={`w-full rounded-2xl border-2 px-5 py-4 text-left transition ${
                    risk === opt.id
                      ? "border-scotia-red bg-scotia-red/5"
                      : "border-black/10 bg-white hover:border-scotia-red"
                  }`}
                >
                  <p className="text-[16px] font-semibold text-scotia-navy">
                    {opt.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-scotia-grey">
                    {opt.hint}
                  </p>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => {
            if (canContinue && horizon !== null && risk !== null) {
              onAdvance({ horizon, risk });
            }
          }}
          disabled={!canContinue}
          className={`w-full rounded-2xl py-4 text-[15px] font-semibold transition ${
            canContinue
              ? "bg-scotia-red text-white shadow-[0_12px_32px_-12px_rgba(236,17,26,0.6)]"
              : "bg-surface-elevated text-scotia-grey"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
