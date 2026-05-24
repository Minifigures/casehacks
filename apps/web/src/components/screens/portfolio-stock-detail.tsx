"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, Newspaper } from "lucide-react";
import type { CardData, PortfolioHolding } from "@/lib/types";
import { StockDetailChart } from "@/components/stock-detail-chart";

const timeframes = ["1D", "5D", "1M", "6M", "YTD", "1Y"] as const;

interface PortfolioStockDetailProps {
  holding: PortfolioHolding;
  card: CardData | undefined;
  onBack: () => void;
  backLabel?: string;
  variant?: "portfolio" | "discover";
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
  onBack,
  backLabel = "Back to portfolio",
  variant = "portfolio",
}: PortfolioStockDetailProps) {
  const [timeframe, setTimeframe] = useState<(typeof timeframes)[number]>("1M");

  const changePct = card?.changePct ?? holding.changePct;
  const price = card?.price ?? holding.executionPrice;
  const dayChange = price * (changePct / 100);
  const marketValue = holding.shares * price;
  const costBasis = holding.shares * holding.executionPrice;
  const gain = marketValue - costBasis;
  const gainPct = costBasis > 0 ? (gain / costBasis) * 100 : 0;
  const isDiscover = variant === "discover";

  const stats = useMemo(() => {
    const marketStats = [
      { label: "Previous close", value: `$${formatMoney(price - dayChange)}` },
      { label: "Open", value: `$${formatMoney(price - dayChange * 0.4)}` },
      { label: "Volume", value: "12.4M" },
      { label: "Day's range", value: `$${formatMoney(price * 0.99)} – $${formatMoney(price * 1.01)}` },
      {
        label: "52 week range",
        value: `$${formatMoney(price * 0.72)} – $${formatMoney(price * 1.14)}`,
      },
      { label: "Avg. volume", value: "18.2M" },
    ];

    if (isDiscover) return marketStats;

    return [
      { label: "Your shares", value: holding.shares.toFixed(4) },
      { label: "Avg. cost", value: `$${formatMoney(holding.executionPrice)}` },
      { label: "Market value", value: `$${formatMoney(marketValue)}` },
      ...marketStats,
      {
        label: "Unrealized P/L",
        value: `${gain >= 0 ? "+" : ""}$${formatMoney(gain)} (${gainPct >= 0 ? "+" : ""}${gainPct.toFixed(2)}%)`,
      },
    ];
  }, [dayChange, gain, gainPct, holding, isDiscover, marketValue, price]);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 flex items-center gap-1.5 text-[14px] font-semibold text-scotia-navy"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {backLabel}
      </button>

      <p className="text-[11px] font-medium uppercase tracking-wider text-scotia-grey">
        Toronto · Delayed quote · CAD
      </p>
      <h2 className="mt-1 text-[22px] font-bold tracking-tight text-scotia-navy">
        {holding.name}{" "}
        <span className="font-semibold text-scotia-grey">({holding.ticker})</span>
      </h2>

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
    </div>
  );
}
