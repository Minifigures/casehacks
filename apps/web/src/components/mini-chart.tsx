interface MiniChartProps {
  trend: "up" | "down";
  className?: string;
}

const upPoints: ReadonlyArray<[number, number]> = [
  [0, 36],
  [12, 32],
  [22, 30],
  [32, 28],
  [44, 22],
  [56, 24],
  [68, 18],
  [80, 14],
  [92, 16],
  [104, 10],
  [116, 6],
];

const downPoints: ReadonlyArray<[number, number]> = [
  [0, 10],
  [12, 14],
  [22, 12],
  [32, 18],
  [44, 22],
  [56, 20],
  [68, 26],
  [80, 28],
  [92, 24],
  [104, 30],
  [116, 34],
];

export function MiniChart({ trend, className }: MiniChartProps) {
  const points = trend === "up" ? upPoints : downPoints;
  const stroke = trend === "up" ? "#10B981" : "#E11D48";
  const fill =
    trend === "up" ? "rgba(16,185,129,0.12)" : "rgba(225,29,72,0.12)";

  const lineString = points.map(([x, y]) => `${x},${y}`).join(" ");

  const area =
    `M ${points[0][0]} 40 ` +
    points.map(([x, y]) => `L ${x} ${y}`).join(" ") +
    ` L ${points[points.length - 1][0]} 40 Z`;

  return (
    <svg
      viewBox="0 0 116 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path d={area} fill={fill} />
      <polyline
        points={lineString}
        fill="none"
        stroke={stroke}
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
