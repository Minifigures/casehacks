"use client";

import { useId } from "react";
import { chartColor, marketTrend } from "@/lib/market-trend";

interface MiniChartProps {
  /** Signed % change — chart is green when ≥ 0, red when &lt; 0. */
  changePct: number;
  className?: string;
}

const upPoints: ReadonlyArray<[number, number]> = [
  [0, 34],
  [8, 33],
  [16, 31],
  [24, 29],
  [32, 27],
  [40, 25],
  [48, 24],
  [56, 21],
  [64, 19],
  [72, 17],
  [80, 15],
  [88, 12],
  [96, 10],
  [104, 8],
  [112, 6],
  [116, 5],
];

const downPoints: ReadonlyArray<[number, number]> = [
  [0, 8],
  [8, 10],
  [16, 9],
  [24, 12],
  [32, 14],
  [40, 13],
  [48, 17],
  [56, 19],
  [64, 18],
  [72, 22],
  [80, 24],
  [88, 26],
  [96, 28],
  [104, 31],
  [112, 33],
  [116, 35],
];

function miniSmoothPath(points: ReadonlyArray<[number, number]>): string {
  if (points.length < 2) return "";
  let path = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const cx = (x1 + x2) / 2;
    path += ` C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
  }
  return path;
}

export function MiniChart({ changePct, className }: MiniChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const trend = marketTrend(changePct);
  const points = trend === "up" ? upPoints : downPoints;
  const stroke = chartColor(changePct);
  const linePath = miniSmoothPath(points);
  const area =
    `${linePath} L ${points[points.length - 1][0]} 40 L ${points[0][0]} 40 Z`;

  return (
    <svg
      viewBox="0 0 116 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.22} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId}-area)`} />
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
