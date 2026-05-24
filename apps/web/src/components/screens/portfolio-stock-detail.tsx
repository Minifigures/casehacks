"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Minus,
  Newspaper,
  Plus,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import type { CardData, PortfolioHolding } from "@/lib/types";
import { StockDetailChart } from "@/components/stock-detail-chart";
import {
  AdjustHoldingSheet,
  type AdjustMode,
} from "@/components/adjust-holding-sheet";

const timeframes = ["1D", "5D", "1M", "6M", "YTD", "1Y"] as const;

interface PortfolioStockDetailProps {
  holding: PortfolioHolding;
  card: CardData | undefined;
  variant?: "portfolio" | "discover";
  backLabel?: string;
  balance?: number;
  onBack: () => void;
  onBuyMore?: (ticker: string, amount: number) => void;
  onSell?: (ticker: string, amount: number) => void;
}

function formatMoney(value: number) {
  return value.toLocaleString("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function PortfolioStockDetail({
  holding,
  card,
  variant = "portfolio",
  backLabel,
  balance = 0,
  onBack,
  onBuyMore,
  onSell,
}: PortfolioStockDetailProps) {
  const isDiscover = variant === "discover";
  const resolvedBackLabel =
    backLabel ?? (isDiscover ? "Back to discover" : "Back to portfolio");

  const [timeframe, setTimeframe] = useState<(typeof timeframes)[number]>("1M");
  const [adjustMode, setAdjustMode] = useState<AdjustMode | null>(null);

  const isShort = holding.direction === "short";
  const changePct = card?.changePct ?? holding.changePct;
  const price = card?.price ?? holding.executionPrice;
  const dayChange = price * (changePct / 100);
  const marketValue = holding.shares * price;
  const costBasis = holding.shares * holding.executionPrice;
  const gain = isShort ? costBasis - marketValue : marketValue - costBasis;
  const gainPct = costBasis > 0 ? (gain / costBasis) * 100 : 0;

  const handleConfirmAdjust = (amount: number) => {
    if (adjustMode === "buy") onBuyMore?.(holding.ticker, amount);
    else if (adjustMode === "sell") onSell?.(holding.ticker, amount);
    setAdjustMode(null);
  };

  const stats = useMemo(() => {
    const marketStats = [
      { label: "Previous close", value: `$${formatMoney(price - dayChange)}` },
      { label: "Open", value: `$${formatMoney(price - dayChange * 0.4)}` },
      { label: "Volume", value: "12.4M" },
      {
        label: "Day's range",
        value: `$${formatMoney(price * 0.99)} – $${formatMoney(price * 1.01)}`,
      },
      {
        label: "52 week range",
        value: `$${formatMoney(price * 0.72)} – $${formatMoney(price * 1.14)}`,
      },
      { label: "Avg. volume", value: "18.2M" },
    ];

    if (isDiscover) return marketStats;

    return [
      { label: "Your shares", value: holding.shares.toFixed(4) },
      { label: "Invested", value: `$${formatMoney(costBasis)}` },
      { label: "Avg. cost", value: `$${formatMoney(holding.executionPrice)}` },
      { label: "Market value", value: `$${formatMoney(marketValue)}` },
      ...marketStats,
      {
        label: "Unrealized P/L",
        value: `${gain >= 0 ? "+" : ""}$${formatMoney(gain)} (${gainPct >= 0 ? "+" : ""}${gainPct.toFixed(2)}%)`,
      },
    ];
  }, [
    costBasis,
    dayChange,
    gain,
    gainPct,
    holding,
    isDiscover,
    marketValue,
    price,
  ]);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex items-center gap-1.5 text-[14px] font-semibold text-scotia-navy"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {resolvedBackLabel}
      </button>

      <p className="text-[11px] font-medium uppercase tracking-wider text-scotia-grey">
        Toronto · Delayed quote · CAD
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <h2 className="text-[22px] font-bold tracking-tight text-scotia-navy">
          {holding.name}{" "}
          <span className="font-semibold text-scotia-grey">({holding.ticker})</span>
        </h2>
        {!isDiscover && isShort ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-600 ring-1 ring-amber-500/30">
            <TrendingDown className="h-3 w-3" /> Short
          </span>
        ) : null}
        {!isDiscover && holding.funding === "points" ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-scotia-red/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-scotia-red ring-1 ring-scotia-red/20">
            <Sparkles className="h-3 w-3" /> Scene+
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-[32px] font-black tabular-nums tracking-tight text-scotia-navy">
        ${formatMoney(price)}
      </p>
      <p
        className={`text-[14px] font-semibold tabular-nums ${
          changePct >= 0 ? "text-success" : "text-loss"
        }`}
      >
        {dayChange >= 0 ? "+" : ""}
        {formatMoney(dayChange)} ({changePct >= 0 ? "+" : ""}
        {changePct}% Y)
      </p>
      <p className="mt-0.5 text-[11px] text-scotia-grey">At close · Prototype data</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {timeframes.map((tf) => (
          <button
            key={tf}
            type="button"
            onClick={() => setTimeframe(tf)}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
              timeframe === tf
                ? "bg-scotia-navy text-white"
                : "bg-surface-elevated text-scotia-grey ring-1 ring-black/5"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-black/5">
        <StockDetailChart
          price={price}
          changePct={changePct}
          ticker={holding.ticker}
          timeframe={timeframe}
          className="w-full"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-[11px] text-scotia-grey">{label}</p>
            <p className="text-[13px] font-semibold tabular-nums text-scotia-navy">
              {value}
            </p>
          </div>
        ))}
      </div>

      {!isDiscover && isShort ? (
        <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
          <p className="text-[12px] font-bold uppercase tracking-wider text-amber-600">
            Short position open
          </p>
          <p className="mt-1 text-[12px] text-scotia-navy">
            Close via buy-to-cover on the trade desk. Margin held until
            unwound.
          </p>
        </div>
      ) : !isDiscover ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAdjustMode("sell")}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-scotia-red/30 bg-white py-3 text-[14px] font-semibold text-scotia-red"
          >
            <Minus className="h-4 w-4" /> Sell
          </button>
          <button
            type="button"
            onClick={() => setAdjustMode("buy")}
            disabled={balance <= 0}
            className="flex items-center justify-center gap-2 rounded-2xl bg-success py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.6)] disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Buy more
          </button>
        </div>
      ) : null}

      {card ? (
        <div className="mt-4 space-y-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
              <Newspaper className="h-3 w-3" /> Latest news
            </p>
            <p className="mt-1 text-[14px] font-bold italic text-scotia-navy">
              &ldquo;{card.news}&rdquo;
            </p>
          </div>
          <div className="border-t border-black/5 pt-3">
            <p className="flex items-start gap-1.5 text-[12px] italic leading-snug text-scotia-navy/85">
              <BarChart3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scotia-red" />
              <span>
                <span className="font-bold not-italic text-scotia-navy">
                  Scotia analyst:
                </span>{" "}
                {card.analystExcerpt}
              </span>
            </p>
          </div>
        </div>
      ) : null}

      {!isDiscover && !isShort ? (
        <AdjustHoldingSheet
          open={adjustMode !== null}
          mode={adjustMode ?? "buy"}
          holding={holding}
          currentPrice={price}
          balance={balance}
          onConfirm={handleConfirmAdjust}
          onClose={() => setAdjustMode(null)}
        />
      ) : null}
    </div>
  );
}
