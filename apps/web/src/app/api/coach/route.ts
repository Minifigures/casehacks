import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      model: "scotia-money-coach-v0",
      generatedAt: new Date().toISOString(),
      nudge: {
        title: "FHSA, home goal",
        body: "Hey Marco, you got paid $1,800 yesterday. Auto-invest $50 toward your FHSA home goal?",
        suggestedAmount: 50,
        accountType: "FHSA",
        goalProgress: 0.12,
        goalTarget: 8000,
        goalCurrent: 960,
        paceMonthsEarly: 4,
      },
      sources: [
        "chequing.payroll",
        "smart_investor.portfolio",
        "scene_plus.activity",
        "itrade.order_history",
      ],
      compliance: {
        ciroRules: ["3252", "3400", "3800"],
        modelInventoryTier: 1,
        ofsiE23Ready: true,
      },
    },
    {
      headers: { "cache-control": "no-store" },
    },
  );
}
