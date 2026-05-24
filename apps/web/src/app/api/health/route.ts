import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    name: "uTrade API",
    version: "0.1.0",
    status: "ok",
    asOf: new Date().toISOString(),
    routes: ["/api/cards", "/api/coach", "/api/trade", "/api/health"],
    notes:
      "Prototype, no real money movement. Routes through Scotia iTRADE in production.",
  });
}
