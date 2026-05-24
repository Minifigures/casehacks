/** Up = green, down = red — always derive from signed % change. */
export function marketTrend(changePct: number): "up" | "down" {
  return changePct >= 0 ? "up" : "down";
}

export function isMarketUp(changePct: number): boolean {
  return changePct >= 0;
}

export const CHART_COLOR_UP = "#10b981";
export const CHART_COLOR_DOWN = "#e11d48";

export function chartColor(changePct: number): string {
  return isMarketUp(changePct) ? CHART_COLOR_UP : CHART_COLOR_DOWN;
}
