"use client";

import { useId, useMemo } from "react";
import { chartColor, isMarketUp, marketTrend } from "@/lib/market-trend";

interface StockDetailChartProps {
  price: number;
  changePct: number;
  ticker: string;
  timeframe: string;
  className?: string;
}

const WIDTH = 440;
const HEIGHT = 220;
const PAD = { top: 12, right: 52, bottom: 28, left: 8 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const VOLUME_H = 36;

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h) + 1;
}

function generateSeries(
  ticker: string,
  timeframe: string,
  trend: "up" | "down",
  count: number,
): ReadonlyArray<number> {
  let seed = hashSeed(`${ticker}-${timeframe}`);
  const rng = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const drift = trend === "up" ? 0.032 : -0.032;
  const values: number[] = [];
  let level = trend === "up" ? 0.32 + rng() * 0.12 : 0.68 - rng() * 0.12;

  for (let i = 0; i < count; i += 1) {
    const noise = (rng() - 0.5) * 0.11;
    level += noise + drift;
    level = Math.max(0.1, Math.min(0.9, level));
    values.push(level);
  }

  return values;
}

function smoothPath(points: ReadonlyArray<{ x: number; y: number }>): string {
  if (points.length < 2) return "";
  const first = points[0];
  let path = `M ${first.x} ${first.y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

function formatAxisPrice(value: number) {
  if (value >= 1000) return value.toFixed(0);
  if (value >= 100) return value.toFixed(1);
  return value.toFixed(2);
}

const xLabelsByTf: Record<string, ReadonlyArray<string>> = {
  "1D": ["9:30", "11:00", "12:30", "14:00", "16:00"],
  "5D": ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "1M": ["1", "8", "15", "22", "30"],
  "6M": ["Jan", "Mar", "May", "Jul", "Sep"],
  YTD: ["Jan", "Mar", "May", "Jul", "Now"],
  "1Y": ["Q1", "Q2", "Q3", "Q4", "Now"],
};

export function StockDetailChart({
  price,
  changePct,
  ticker,
  timeframe,
  className = "",
}: StockDetailChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const trend = marketTrend(changePct);

  const chart = useMemo(() => {
    const series = generateSeries(ticker, timeframe, trend, 42);
    const minNorm = Math.min(...series);
    const maxNorm = Math.max(...series);
    const span = Math.max(maxNorm - minNorm, 0.08);

    const startNorm = series[0];
    const endNorm = series[series.length - 1];
    const periodChangePct =
      startNorm === 0 ? 0 : ((endNorm - startNorm) / startNorm) * 100;

    const startPrice = price / (1 + periodChangePct / 100);
    const minPrice = Math.min(startPrice, price) * 0.985;
    const maxPrice = Math.max(startPrice, price) * 1.015;

    const toY = (norm: number) => {
      const t = (norm - minNorm) / span;
      return PAD.top + (1 - t) * (PLOT_H - VOLUME_H);
    };

    const toPrice = (norm: number) =>
      minPrice + ((norm - minNorm) / span) * (maxPrice - minPrice);

    const points = series.map((norm, i) => ({
      x: PAD.left + (i / (series.length - 1)) * PLOT_W,
      y: toY(norm),
      norm,
    }));

    const linePath = smoothPath(points);
    const baseY = PAD.top + PLOT_H - VOLUME_H;
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;

    const last = points[points.length - 1];
    const lastPrice = toPrice(last.norm);

    const gridLevels = [0, 0.25, 0.5, 0.75, 1].map((t) => {
      const norm = minNorm + span * t;
      return {
        y: toY(norm),
        label: formatAxisPrice(toPrice(norm)),
      };
    });

    const volumes = series.map((norm, i) => {
      const vol = 0.25 + Math.abs(norm - series[Math.max(0, i - 1)]) * 3.2;
      return {
        x: points[i].x,
        h: Math.min(VOLUME_H - 4, vol * (VOLUME_H - 8)),
      };
    });

    const xLabels = xLabelsByTf[timeframe] ?? xLabelsByTf["1M"];

    return {
      linePath,
      areaPath,
      last,
      lastPrice,
      gridLevels,
      volumes,
      baseY,
      xLabels,
      periodChangePct,
    };
  }, [changePct, price, ticker, timeframe, trend]);

  const periodUp = isMarketUp(chart.periodChangePct);
  const stroke = chartColor(chart.periodChangePct);
  const strokeSoft = periodUp
    ? "rgba(16,185,129,0.35)"
    : "rgba(225,29,72,0.35)";

  const periodLabel = `${chart.periodChangePct >= 0 ? "+" : ""}${chart.periodChangePct.toFixed(1)}%`;

  return (
    <div className={`flex min-h-[220px] flex-col ${className}`}>
      <div className="mb-2 flex shrink-0 items-center justify-between px-1">
        <span className="text-[11px] font-semibold text-scotia-grey">
          {timeframe} · Mountain
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            periodUp ? "bg-success/10 text-success" : "bg-loss/10 text-loss"
          }`}
        >
          {periodLabel}
        </span>
      </div>
      <svg
        className="min-h-[200px] w-full flex-1"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${ticker} price chart, ${timeframe}`}
      >
      <defs>
        <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.28} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0.02} />
        </linearGradient>
        <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.5} />
          <stop offset="50%" stopColor={stroke} stopOpacity={1} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0.85} />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {chart.gridLevels.map(({ y, label }) => (
        <g key={label}>
          <line
            x1={PAD.left}
            y1={y}
            x2={WIDTH - PAD.right}
            y2={y}
            stroke="rgba(0,15,77,0.08)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text
            x={WIDTH - PAD.right + 6}
            y={y + 4}
            fill="rgba(0,15,77,0.45)"
            fontSize={9}
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontWeight={500}
          >
            {label}
          </text>
        </g>
      ))}

      {chart.volumes.map((bar, i) => (
        <rect
          key={`vol-${i}`}
          x={bar.x - 3}
          y={chart.baseY + (VOLUME_H - bar.h)}
          width={6}
          height={bar.h}
          rx={1}
          fill="rgba(0,15,77,0.1)"
        />
      ))}

      <path d={chart.areaPath} fill={`url(#${gradientId}-area)`} />
      <path
        d={chart.linePath}
        fill="none"
        stroke={strokeSoft}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.45}
      />
      <path
        d={chart.linePath}
        fill="none"
        stroke={`url(#${gradientId}-line)`}
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${gradientId}-glow)`}
      />

      <line
        x1={PAD.left}
        y1={chart.last.y}
        x2={WIDTH - PAD.right}
        y2={chart.last.y}
        stroke={stroke}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.45}
      />

      <circle cx={chart.last.x} cy={chart.last.y} r={4.5} fill={stroke} />
      <circle
        cx={chart.last.x}
        cy={chart.last.y}
        r={8}
        fill={stroke}
        opacity={0.15}
      />

      <rect
        x={chart.last.x - 28}
        y={chart.last.y - 22}
        width={56}
        height={16}
        rx={4}
        fill={stroke}
      />
      <text
        x={chart.last.x}
        y={chart.last.y - 11}
        textAnchor="middle"
        fill="#fff"
        fontSize={9}
        fontWeight={700}
        fontFamily="var(--font-inter), system-ui, sans-serif"
      >
        {formatAxisPrice(chart.lastPrice)}
      </text>

      {chart.xLabels.map((label, i) => {
        const x = PAD.left + (i / (chart.xLabels.length - 1)) * PLOT_W;
        return (
          <text
            key={label}
            x={x}
            y={HEIGHT - 8}
            textAnchor="middle"
            fill="rgba(0,15,77,0.4)"
            fontSize={9}
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {label}
          </text>
        );
      })}
    </svg>
    </div>
  );
}
