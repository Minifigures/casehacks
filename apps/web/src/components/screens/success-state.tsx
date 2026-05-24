"use client";

import { motion } from "framer-motion";
import { Check, Target, Sparkles } from "lucide-react";

interface SuccessStateProps {
  onAdvance: () => void;
}

export function SuccessState({ onAdvance }: SuccessStateProps) {
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
