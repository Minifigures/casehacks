"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Wallet, TrendingDown } from "lucide-react";
import type { CardData, FundingSource, TradeDirection } from "@/lib/types";

interface TradeAmountSheetProps {
  card: CardData | null;
  direction: TradeDirection;
  balance: number;
  scenePoints: number;
  onConfirm: (amount: number, payment: FundingSource) => void;
  onClose: () => void;
}

const POINTS_PER_DOLLAR = 100;

function formatCurrency(value: number) {
  return value.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPoints(value: number) {
  return Math.round(value).toLocaleString("en-CA");
}

const QUICK_AMOUNTS = [25, 50, 100, 250] as const;

export function TradeAmountSheet({
  card,
  direction,
  balance,
  scenePoints,
  onConfirm,
  onClose,
}: TradeAmountSheetProps) {
  const [amount, setAmount] = useState<string>("");
  const [paymentChoice, setPaymentChoice] = useState<FundingSource>("cash");

  const isShort = direction === "short";
  const pointsAsDollars = scenePoints / POINTS_PER_DOLLAR;
  const pointsAvailable = !isShort && pointsAsDollars >= 1;
  const payment: FundingSource = isShort ? "cash" : paymentChoice;
  const cap = payment === "points" ? pointsAsDollars : balance;

  useEffect(() => {
    if (card !== null) {
      const seed = isShort ? balance : cap;
      const suggested = Math.min(50, Math.max(1, Math.floor(seed)));
      setAmount(suggested > 0 ? String(suggested) : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  const numeric = Number.parseFloat(amount);
  const valid = Number.isFinite(numeric) && numeric > 0 && numeric <= cap;
  const overCap = Number.isFinite(numeric) && numeric > cap;
  const shares = card !== null && valid ? numeric / card.price : 0;
  const pointsCost = numeric * POINTS_PER_DOLLAR;

  const accent = isShort ? "text-amber-600" : "text-scotia-red";
  const confirmBg = isShort
    ? "bg-amber-600 shadow-[0_12px_32px_-12px_rgba(217,119,6,0.6)]"
    : "bg-scotia-red shadow-[0_12px_32px_-12px_rgba(236,17,26,0.6)]";

  let confirmLabel: string;
  if (!valid) {
    confirmLabel = overCap
      ? payment === "points"
        ? "Not enough points"
        : "Not enough funds"
      : "Enter an amount";
  } else if (payment === "points") {
    confirmLabel = `Redeem ${formatPoints(pointsCost)} pts`;
  } else {
    confirmLabel = `${isShort ? "Short" : "Confirm"} $${formatCurrency(numeric)}`;
  }

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
                <p
                  className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${accent}`}
                >
                  {isShort ? (
                    <>
                      <TrendingDown className="h-3 w-3" /> Short {card.ticker}
                    </>
                  ) : (
                    <>Buy {card.ticker}</>
                  )}
                </p>
                <h2 className="mt-1 text-[18px] font-bold leading-tight text-scotia-navy">
                  {isShort
                    ? "How much do you want to short?"
                    : "How much do you want to invest?"}
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

            {!isShort ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentChoice("cash")}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-[12px] font-bold ring-1 transition-colors ${
                    payment === "cash"
                      ? "bg-scotia-navy text-white ring-scotia-navy"
                      : "bg-white text-scotia-navy ring-black/10"
                  }`}
                >
                  <Wallet className="h-3.5 w-3.5" />
                  Cash
                  <span
                    className={`ml-1 text-[10px] font-semibold tabular-nums ${
                      payment === "cash" ? "text-white/70" : "text-scotia-grey"
                    }`}
                  >
                    ${formatCurrency(balance)}
                  </span>
                </button>
                <button
                  type="button"
                  disabled={!pointsAvailable}
                  onClick={() => setPaymentChoice("points")}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-[12px] font-bold ring-1 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    payment === "points"
                      ? "bg-scotia-red text-white ring-scotia-red"
                      : "bg-white text-scotia-navy ring-black/10"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Scene+
                  <span
                    className={`ml-1 text-[10px] font-semibold tabular-nums ${
                      payment === "points" ? "text-white/80" : "text-scotia-grey"
                    }`}
                  >
                    {formatPoints(scenePoints)} pts
                  </span>
                </button>
              </div>
            ) : null}

            <div className="mt-3 rounded-2xl bg-surface-elevated p-4">
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
                  {payment === "points"
                    ? `Available: ${formatPoints(scenePoints)} pts ≈ $${formatCurrency(pointsAsDollars)}`
                    : `Available: $${formatCurrency(balance)}`}
                </span>
                <span
                  className={
                    overCap ? "font-semibold text-loss" : "text-scotia-grey"
                  }
                >
                  {valid
                    ? payment === "points"
                      ? `${formatPoints(pointsCost)} pts → ${shares.toFixed(4)} sh`
                      : `≈ ${shares.toFixed(4)} shares`
                    : overCap
                      ? payment === "points"
                        ? "Exceeds points balance"
                        : "Exceeds available balance"
                      : "Enter an amount"}
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((preset) => {
                const disabled = preset > cap;
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
              disabled={cap <= 0}
              onClick={() => setAmount(cap.toFixed(2))}
              className="mt-2 w-full rounded-xl border border-scotia-navy/10 py-2 text-[12px] font-semibold text-scotia-navy disabled:opacity-40"
            >
              Max (${formatCurrency(cap)})
            </button>

            <button
              type="button"
              disabled={!valid}
              onClick={() => onConfirm(numeric, payment)}
              className={`mt-4 w-full rounded-2xl py-3.5 text-[15px] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:bg-scotia-navy/20 disabled:text-scotia-navy/40 disabled:shadow-none ${
                valid ? confirmBg : "bg-scotia-navy/20"
              }`}
            >
              {confirmLabel}
            </button>

            <p className="mt-2 text-center text-[10px] text-scotia-grey">
              {isShort
                ? "OEO · margin-secured · CIRO 3252/3400"
                : payment === "points"
                  ? "Funded from Scene+ · 100 pts = $1 of equity"
                  : "Funded from Smart Sweep · Scotia HISA"}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
