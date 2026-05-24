import { NextResponse } from "next/server";
import { cards } from "@/lib/cards";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      asOf: new Date().toISOString(),
      currency: "CAD",
      market: "TSX,NYSE,NASDAQ",
      count: cards.length,
      cards,
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
