export interface TradeOrder {
  status: "filled";
  orderId: string;
  ticker: string;
  name: string;
  shares: number;
  executionPrice: number;
  notional: number;
  currency: string;
  placedAt: string;
  settleDate: string;
  commission: number;
  route: string;
  funding: string;
  accountType: string;
  compliance: {
    ciroRules: ReadonlyArray<string>;
    ofsiE23Tier: number;
    recordRetentionYears: number;
  };
}

export async function placeTrade(ticker: string): Promise<TradeOrder> {
  const res = await fetch("/api/trade", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ticker, fractionalShares: 0.5 }),
  });
  if (!res.ok) {
    throw new Error(`trade failed: ${res.status}`);
  }
  return (await res.json()) as TradeOrder;
}
