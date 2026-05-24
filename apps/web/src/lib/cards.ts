import type { CardData } from "@/lib/types";

export const cards: ReadonlyArray<CardData> = [
  {
    ticker: "AMZN",
    name: "Amazon",
    changePct: 10,
    news: "Bought a new warehouse",
    analystExcerpt:
      "warehouse expansion signals 2027 Prime margin recovery",
    trend: "up",
    friendsOwn: true,
    brandColor: "#FF9900",
    price: 182.4,
  },
  {
    ticker: "BNS",
    name: "Scotiabank",
    changePct: 4,
    news: "Q4 dividend raised to $1.10/share",
    analystExcerpt:
      "capital ratios support continued dividend growth",
    trend: "up",
    friendsOwn: false,
    brandColor: "#EC111A",
    price: 74.12,
  },
  {
    ticker: "SHOP",
    name: "Shopify",
    changePct: 18,
    news: "Q3 revenue beat by 12%",
    analystExcerpt: "merchant solutions ARR up 35% YoY",
    trend: "up",
    friendsOwn: true,
    brandColor: "#95BF47",
    price: 108.5,
  },
  {
    ticker: "TD",
    name: "TD Bank",
    changePct: -3,
    news: "Settles US Bank Secrecy Act probe",
    analystExcerpt:
      "balance sheet remains strong despite headline risk",
    trend: "down",
    friendsOwn: false,
    brandColor: "#00B04F",
    price: 79.8,
  },
  {
    ticker: "COST",
    name: "Costco",
    changePct: 8,
    news: "Membership renewals hit 93%",
    analystExcerpt: "pricing power intact through cycle",
    trend: "up",
    friendsOwn: false,
    brandColor: "#005DAA",
    price: 912.0,
  },
];
