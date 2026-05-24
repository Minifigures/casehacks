"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, TrendingDown } from "lucide-react";
import type { TradeOrder } from "@/lib/api";
import type { FundingSource, TradeDirection } from "@/lib/types";

interface PendingTrade {
  ticker: string;
  direction: TradeDirection;
}

interface TradeConfirmationProps {
  order: TradeOrder | null;
  pending: PendingTrade | null;
  direction: TradeDirection;
  funding: FundingSource;
  onClose: () => void;
}

function shortenOrderId(id: string) {
  return id.length > 18 ? `${id.slice(0, 14)}…${id.slice(-4)}` : id;
}

export function TradeConfirmation({
  order,
  pending,
  direction,
  funding,
  onClose,
}: TradeConfirmationProps) {
  const visible = order !== null || pending !== null;
  const isShort = direction === "short";
  const accentBg = isShort ? "bg-amber-600" : "bg-success";
  const accentShadow = isShort
    ? "shadow-[0_12px_28px_-10px_rgba(217,119,6,0.6)]"
    : "shadow-[0_12px_28px_-10px_rgba(16,185,129,0.6)]";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 grid place-items-center bg-black/40 px-4"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="w-full rounded-3xl bg-white p-6 shadow-2xl"
          >
            {order === null ? (
              <div className="grid place-items-center py-8">
                <Loader2 className="h-10 w-10 animate-spin text-scotia-red" />
                <p className="mt-4 text-[14px] font-semibold text-scotia-navy">
                  {pending?.direction === "short"
                    ? `Routing short ${pending.ticker} through iTRADE...`
                    : `Routing ${pending?.ticker ?? ""} through iTRADE...`}
                </p>
                <p className="mt-1 text-[12px] text-scotia-grey">
                  {pending?.direction === "short"
                    ? "Locating borrow via securities-lending desk"
                    : funding === "points"
                      ? "Redeeming Scene+ points to equity"
                      : "Funded from Smart Sweep"}
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.05,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-white ${accentBg} ${accentShadow}`}
                >
                  {isShort ? (
                    <TrendingDown className="h-8 w-8" strokeWidth={3} />
                  ) : (
                    <Check className="h-8 w-8" strokeWidth={3} />
                  )}
                </motion.div>

                <h2 className="mt-5 text-center text-[20px] font-bold leading-tight text-scotia-navy">
                  {isShort
                    ? `Sold short ${order.shares} shares of ${order.ticker} at $${order.executionPrice.toFixed(2)}.`
                    : `Bought ${order.shares} shares of ${order.ticker} at $${order.executionPrice.toFixed(2)}.`}
                </h2>

                <p
                  className={`mt-2 text-center text-[13px] font-semibold ${
                    isShort ? "text-amber-600" : "text-scotia-red"
                  }`}
                >
                  {funding === "points" && !isShort
                    ? "Redeemed from Scene+ points"
                    : `Funded from ${order.funding}`}
                </p>

                <p className="mt-1 text-center text-[12px] text-scotia-grey">
                  Settles{" "}
                  {new Date(order.settleDate).toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                  })}
                  . Tracked in your Scotia {order.accountType}.
                </p>

                <div className="mt-5 rounded-2xl bg-surface-elevated p-3 text-[11px] text-scotia-grey">
                  <div className="flex items-center justify-between">
                    <span>Order ID</span>
                    <span className="font-mono font-semibold text-scotia-navy">
                      {shortenOrderId(order.orderId)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Route</span>
                    <span className="font-semibold text-scotia-navy">
                      {order.route}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>{isShort ? "Side" : "Commission"}</span>
                    <span className="font-semibold text-scotia-navy">
                      {isShort ? "SHORT" : `$${order.commission.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Compliance</span>
                    <span className="font-semibold text-scotia-navy">
                      CIRO {order.compliance.ciroRules.join(" + ")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 w-full rounded-2xl bg-scotia-red py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_32px_-12px_rgba(236,17,26,0.6)]"
                >
                  Done
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
