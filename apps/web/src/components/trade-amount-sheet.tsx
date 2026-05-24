"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { CardData } from "@/lib/types";

interface TradeAmountSheetProps {
  card: CardData | null;
  balance: number;
  onConfirm: (amount: number) => void;
  onClose: () => void;
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const QUICK_AMOUNTS = [25, 50, 100, 250] as const;

export function TradeAmountSheet({
  card,
  balance,
  onConfirm,
  onClose,
}: TradeAmountSheetProps) {
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (card !== null) {
      const suggested = Math.min(50, Math.max(1, Math.floor(balance)));
      setAmount(suggested > 0 ? String(suggested) : "");
    }
  }, [card, balance]);

  const numeric = Number.parseFloat(amount);
  const valid =
    Number.isFinite(numeric) && numeric > 0 && numeric <= balance;
  const overBalance = Number.isFinite(numeric) && numeric > balance;

  const shares = card !== null && valid ? numeric / card.price : 0;

  return (
    <AnimatePresence>
      {card !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 px-4 pb-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-3xl bg-white p-5 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-scotia-red">
                  Buy {card.ticker}
                </p>
                <h2 className="mt-1 text-[18px] font-bold leading-tight text-scotia-navy">
                  How much do you want to invest?
                </h2>
                <p className="mt-0.5 text-[12px] text-scotia-grey">
                  {card.name} · ${card.price.toFixed(2)}/share
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full bg-surface-elevated text-scotia-navy"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-surface-elevated p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-scotia-grey">
                Amount (CAD)
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-[28px] font-black text-scotia-navy">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.01}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-[32px] font-black tabular-nums tracking-tight text-scotia-navy outline-none placeholder:text-scotia-navy/20"
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-scotia-grey">
                  Available: ${formatCurrency(balance)}
                </span>
                <span
                  className={
                    overBalance
                      ? "font-semibold text-loss"
                      : "text-scotia-grey"
                  }
                >
                  {valid
                    ? `≈ ${shares.toFixed(4)} shares`
                    : overBalance
                      ? "Exceeds available balance"
                      : "Enter an amount"}
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((preset) => {
                const disabled = preset > balance;
                return (
                  <button
                    key={preset}
                    type="button"
                    disabled={disabled}
                    onClick={() => setAmount(String(preset))}
                    className="rounded-xl bg-surface-elevated py-2 text-[12px] font-semibold text-scotia-navy ring-1 ring-black/5 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ${preset}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setAmount(balance.toFixed(2))}
              className="mt-2 w-full rounded-xl border border-scotia-navy/10 py-2 text-[12px] font-semibold text-scotia-navy"
            >
              Max (${formatCurrency(balance)})
            </button>

            <button
              type="button"
              disabled={!valid}
              onClick={() => onConfirm(numeric)}
              className="mt-4 w-full rounded-2xl bg-scotia-red py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_32px_-12px_rgba(236,17,26,0.6)] transition-opacity disabled:cursor-not-allowed disabled:bg-scotia-navy/20 disabled:text-scotia-navy/40 disabled:shadow-none"
            >
              {valid
                ? `Confirm $${formatCurrency(numeric)}`
                : overBalance
                  ? "Not enough funds"
                  : "Enter an amount"}
            </button>

            <p className="mt-2 text-center text-[10px] text-scotia-grey">
              Funded from Smart Sweep · Scotia HISA
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
