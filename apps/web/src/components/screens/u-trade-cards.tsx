"use client";

import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import {
  Flame,
  Users,
  BarChart3,
  X,
  Check,
  Newspaper,
  Compass,
  PieChart,
  ArrowLeftRight,
  History,
  Menu,
} from "lucide-react";
import { cards } from "@/lib/cards";
import type { CardData } from "@/lib/types";
import { MiniChart } from "@/components/mini-chart";
import { TradeConfirmation } from "@/components/trade-confirmation";
import { TabBar } from "@/components/tab-bar";

interface UTradeCardsProps {
  onRestart: () => void;
}

const utradeTabs = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "portfolio", label: "Portfolio", icon: PieChart },
  { id: "trade", label: "Trade", icon: ArrowLeftRight },
  { id: "history", label: "History", icon: History },
  { id: "more", label: "More", icon: Menu },
] as const;

interface SwipeCardProps {
  card: CardData;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  depth: number;
}

function SwipeCard({ card, onSwipe, isTop, depth }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const buyOpacity = useTransform(x, [40, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -40], [1, 0]);
  const cardOpacity = useTransform(x, [-260, -160, 0, 160, 260], [0, 1, 1, 1, 0]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 100 || info.velocity.x > 600) {
      onSwipe("right");
    } else if (info.offset.x < -100 || info.velocity.x < -600) {
      onSwipe("left");
    }
  };

  const trendColor = card.changePct >= 0 ? "text-success" : "text-loss";
  const trendBg = card.changePct >= 0 ? "bg-success/10" : "bg-loss/10";

  return (
    <motion.article
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={isTop ? { x, rotate, opacity: cardOpacity } : undefined}
      initial={false}
      animate={{
        scale: isTop ? 1 : 1 - depth * 0.04,
        y: isTop ? 0 : depth * 10,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`absolute inset-0 select-none touch-none rounded-3xl bg-white p-5 shadow-[0_20px_50px_-12px_rgba(0,15,77,0.18)] ring-1 ring-black/5 ${
        isTop ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <header className="flex items-start justify-between">
        <p className="text-[32px] font-black leading-none tracking-tight text-scotia-navy">
          {card.ticker}
        </p>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-elevated text-[14px] font-black text-scotia-navy ring-1 ring-black/5">
          {card.ticker.charAt(0)}
        </div>
      </header>

      <p className="text-[12px] font-medium text-scotia-grey">{card.name}</p>

      <div className="mt-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums ${trendBg} ${trendColor}`}
        >
          {card.changePct >= 0 ? "↗" : "↘"} {card.changePct >= 0 ? "+" : ""}
          {card.changePct}% Y
        </span>
      </div>

      <div className="mt-1 h-24 w-full">
        <MiniChart trend={card.trend} className="h-full w-full" />
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
            <Newspaper className="h-3 w-3" /> Latest news
          </p>
          <p className="mt-1 text-[14px] font-bold italic text-scotia-navy">
            &ldquo;{card.news}&rdquo;
          </p>
        </div>

        <div className="border-t border-black/5 pt-3">
          <p className="flex items-start gap-1.5 text-[12px] italic leading-snug text-scotia-navy/85">
            <BarChart3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scotia-red" />
            <span>
              <span className="font-bold not-italic text-scotia-navy">
                Scotia analyst:
              </span>{" "}
              {card.analystExcerpt}
            </span>
          </p>
        </div>
      </div>

      {card.friendsOwn ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-scotia-navy/5 px-3 py-1.5 ring-1 ring-scotia-navy/10">
          <div className="flex -space-x-1">
            <div className="h-5 w-5 rounded-full bg-amber-400 ring-2 ring-white" />
            <div className="h-5 w-5 rounded-full bg-violet-500 ring-2 ring-white" />
            <div className="h-5 w-5 rounded-full bg-sky-500 ring-2 ring-white" />
          </div>
          <span className="text-[11px] font-semibold text-scotia-navy">
            <Users className="mr-1 inline h-3 w-3" /> Your friends own this
          </span>
        </div>
      ) : null}

      {isTop ? (
        <>
          <motion.div
            style={{ opacity: buyOpacity }}
            className="pointer-events-none absolute left-5 top-5 rotate-[-14deg] rounded-xl border-4 border-success bg-white px-3 py-1 text-[16px] font-black text-success"
          >
            BUY
          </motion.div>
          <motion.div
            style={{ opacity: passOpacity }}
            className="pointer-events-none absolute right-5 top-5 rotate-[14deg] rounded-xl border-4 border-loss bg-white px-3 py-1 text-[16px] font-black text-loss"
          >
            PASS
          </motion.div>
        </>
      ) : null}
    </motion.article>
  );
}

export function UTradeCards({ onRestart }: UTradeCardsProps) {
  const [index, setIndex] = useState(0);
  const [confirmCard, setConfirmCard] = useState<CardData | null>(null);
  const [purchased, setPurchased] = useState<ReadonlyArray<string>>([]);

  const visible = useMemo(() => cards.slice(index, index + 3), [index]);
  const done = index >= cards.length;

  const handleSwipe = (card: CardData, direction: "left" | "right") => {
    if (direction === "right") {
      setConfirmCard(card);
      setPurchased((prev) => [...prev, card.ticker]);
    }
    setIndex((i) => i + 1);
  };

  const handleAction = (direction: "left" | "right") => {
    if (done) return;
    handleSwipe(cards[index], direction);
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <header className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-scotia-red" />
            <span className="text-[18px] font-bold tracking-tight text-scotia-navy">
              uTrade
            </span>
            <span className="text-[13px] text-scotia-grey">— discover stocks</span>
          </div>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-elevated text-[11px] font-bold text-scotia-navy">
            {Math.min(index + 1, cards.length)}
          </span>
        </header>

        <p className="mt-1 text-[11px] text-scotia-grey">
          Swipe right to buy a fractional share. Funded from Smart Sweep.
        </p>

        <div className="relative mt-4 w-full" style={{ height: "min(520px, 60vh)" }}>
          <AnimatePresence>
            {done ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 grid place-items-center rounded-3xl bg-white ring-1 ring-black/5"
              >
                <div className="px-8 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-scotia-red/10 text-scotia-red">
                    <Flame className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-[18px] font-bold text-scotia-navy">
                    That&apos;s all for now.
                  </p>
                  <p className="mt-1 text-[13px] text-scotia-grey">
                    New cards every morning at 9 AM ET.
                  </p>
                  <p className="mt-4 text-[12px] text-scotia-grey">
                    You bought{" "}
                    <span className="font-semibold text-scotia-navy">
                      {purchased.length}
                    </span>{" "}
                    of {cards.length} today.
                  </p>
                  <button
                    type="button"
                    onClick={onRestart}
                    className="mt-5 rounded-2xl bg-scotia-red px-5 py-2.5 text-[13px] font-semibold text-white"
                  >
                    Restart demo
                  </button>
                </div>
              </motion.div>
            ) : (
              visible
                .map((card, layerIdx) => ({ card, layerIdx }))
                .reverse()
                .map(({ card, layerIdx }) => (
                  <SwipeCard
                    key={card.ticker}
                    card={card}
                    isTop={layerIdx === 0}
                    depth={layerIdx}
                    onSwipe={(dir) => handleSwipe(card, dir)}
                  />
                ))
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {cards.map((c, i) => (
            <span
              key={c.ticker}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-scotia-red"
                  : i < index
                    ? "w-1.5 bg-scotia-navy/30"
                    : "w-1.5 bg-scotia-navy/15"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleAction("left")}
            disabled={done}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-loss/30 bg-white py-3 text-[14px] font-semibold text-loss disabled:opacity-40"
          >
            <X className="h-4 w-4" /> Pass
          </button>
          <button
            type="button"
            onClick={() => handleAction("right")}
            disabled={done}
            className="flex items-center justify-center gap-2 rounded-2xl bg-success py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.6)] disabled:opacity-40"
          >
            <Check className="h-4 w-4" /> Buy
          </button>
        </div>
      </div>

      <TabBar items={utradeTabs} activeId="discover" />

      <TradeConfirmation
        card={confirmCard}
        onClose={() => setConfirmCard(null)}
      />
    </div>
  );
}
