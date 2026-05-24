import { NextResponse } from "next/server";
import { cards } from "@/lib/cards";

export const dynamic = "force-dynamic";

interface TradeRequest {
  ticker: string;
  fractionalShares?: number;
}

function generateOrderId() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 12);
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `UTR-${stamp}-${random}`;
}

export async function POST(request: Request) {
  let body: Partial<TradeRequest>;
  try {
    body = (await request.json()) as Partial<TradeRequest>;
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const ticker = typeof body.ticker === "string" ? body.ticker.toUpperCase() : "";
  if (!ticker) {
    return NextResponse.json(
      { error: "missing_ticker" },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }

  const card = cards.find((c) => c.ticker === ticker);
  if (!card) {
    return NextResponse.json(
      { error: "unknown_ticker", ticker },
      { status: 404, headers: { "cache-control": "no-store" } },
    );
  }

  const shares = Math.max(0.0001, body.fractionalShares ?? 0.5);
  const orderId = generateOrderId();
  const placedAt = new Date().toISOString();
  const settleDate = new Date(Date.now() + 86_400_000 * 1).toISOString();

  return NextResponse.json(
    {
      status: "filled",
      orderId,
      ticker: card.ticker,
      name: card.name,
      shares: Number(shares.toFixed(4)),
      executionPrice: card.price,
      notional: Number((shares * card.price).toFixed(2)),
      currency: "USD",
      placedAt,
      settleDate,
      commission: 0,
      route: "Scotia iTRADE, best execution",
      funding: "Smart Sweep, Scotia HISA",
      accountType: "TFSA",
      compliance: {
        ciroRules: ["3252", "3400"],
        ofsiE23Tier: 1,
        recordRetentionYears: 7,
      },
    },
    {
      status: 201,
      headers: { "cache-control": "no-store" },
    },
  );
}
