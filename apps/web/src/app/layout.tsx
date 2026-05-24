import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://utrade-scotia.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "uTrade, by Scotia",
  description:
    "Swipe to discover stocks, funded by your Scotia chequing. Built for caseHACKS 2026.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "uTrade",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "uTrade",
    title: "uTrade, swipe to discover stocks inside Scotia",
    description:
      "Wealthsimple can give you returns. Only Scotia can make you an owner. caseHACKS 2026 MVP.",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "uTrade, swipe to discover stocks inside Scotia",
    description:
      "Wealthsimple can give you returns. Only Scotia can make you an owner.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ec111a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
