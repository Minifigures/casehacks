import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "uTrade by Scotia, swipe to discover stocks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at top left, rgba(236,17,26,0.25), transparent 55%), linear-gradient(135deg, #000F4D 0%, #050717 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#EC111A",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 32,
            }}
          >
            S
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            Scotia
          </span>
          <span
            style={{
              marginLeft: 14,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#FCA5A5",
            }}
          >
            caseHACKS 2026
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              letterSpacing: -2.5,
              lineHeight: 1.02,
              maxWidth: 940,
            }}
          >
            Swipe to discover stocks, inside Scotia.
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "#cbd5e1",
              maxWidth: 880,
              lineHeight: 1.3,
            }}
          >
            Wealthsimple can give you returns. Only Scotia can make you an owner.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#10B981",
              }}
            />
            utrade-scotia.vercel.app
          </span>
          <span style={{ color: "#EC111A", fontWeight: 700 }}>uTrade</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
