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
  History,
  Gift,
  Search,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { SignOutButton } from "@/components/sign-out-button";
import { cards } from "@/lib/cards";
import type {
  CardData,
  FundingSource,
  PortfolioHolding,
  TradeDirection,
} from "@/lib/types";
import type { ReferralState } from "@/lib/referral";
import { MiniChart } from "@/components/mini-chart";
import { PortfolioStockDetail } from "@/components/screens/portfolio-stock-detail";
import { ReferralScreen } from "@/components/screens/referral-screen";
import { TradeConfirmation } from "@/components/trade-confirmation";
import { TradeAmountSheet } from "@/components/trade-amount-sheet";
import { TabBar } from "@/components/tab-bar";
import { placeTrade, type TradeOrder } from "@/lib/api";

interface UTradeCardsProps {
  balance: number;
  scenePoints: number;
  shortAcknowledged: boolean;
  referralState: ReferralState;
  onDebit: (amount: number) => void;
  onCredit: (amount: number) => void;
  onDebitPoints: (points: number) => void;
  onAcknowledgeShort: () => void;
  onRedeemReferral: (normalizedCode: string) => void;
  onRestart: () => void;
}

const POINTS_PER_DOLLAR = 100;

const utradeTabs = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "portfolio", label: "Portfolio", icon: PieChart },
  { id: "history", label: "History", icon: History },
  { id: "referral", label: "Referral", icon: Gift },
] as const;

type HistoryAction = "passed" | "bought" | "skipped";

interface HistoryEntry {
  id: string;
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  action: HistoryAction;
}

const learningResources = [
  {
    title: "Youth Guide to Finance and Investing",
    source: "CIRO — Canadian Investment Regulatory Organization",
    href: "https://www.ciro.ca/office-investor/guides-investors/youth-guide-finance-and-investing",
  },
  {
    title: "Investing for Canadian Beginners",
    source: "NerdWallet Canada",
    href: "https://www.nerdwallet.com/ca/p/article/investing/investing-for-canadian-beginners",
  },
] as const;

interface SwipeCardProps {
  card: CardData;
  onSwipe: (direction: "left" | "right") => void;
  onViewDetails: () => void;
  isTop: boolean;
  depth: number;
}

function SwipeCard({ card, onSwipe, onViewDetails, isTop, depth }: SwipeCardProps) {
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
      className={`absolute inset-0 select-none touch-none rounded-3xl bg-white p-5 shadow-[0_20px_50px_-12px_rgba(0,15,77,0.18)] ring-1 ring-black/5 ${isTop ? "cursor-grab active:cursor-grabbing" : ""
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

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onViewDetails();
        }}
        className="mt-1 block w-full rounded-xl bg-surface-elevated/80 p-2 ring-1 ring-black/5 transition-colors hover:bg-surface-elevated"
      >
        <div className="h-20 w-full pointer-events-none">
          <MiniChart changePct={card.changePct} className="h-full w-full" />
        </div>
        <p className="mt-1 text-center text-[11px] font-semibold text-scotia-red">
          Tap for full chart & stats
        </p>
      </button>

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

function toHolding(
  card: CardData,
  trade: TradeOrder,
  direction: TradeDirection,
  funding: FundingSource,
): PortfolioHolding {
  return {
    ticker: card.ticker,
    name: card.name,
    shares: trade.shares,
    executionPrice: trade.executionPrice,
    changePct: card.changePct,
    direction,
    funding,
  };
}

const HISTORY_ACTION_STYLES: Readonly<
  Record<HistoryAction, { label: string; className: string }>
> = {
  passed: {
    label: "Passed",
    className: "bg-scotia-navy/10 text-scotia-navy",
  },
  bought: {
    label: "Bought",
    className: "bg-success/10 text-success",
  },
  skipped: {
    label: "Skipped",
    className: "bg-amber-500/10 text-amber-600",
  },
};

interface HistoryListProps {
  entries: ReadonlyArray<HistoryEntry>;
  search: string;
  onSearchChange: (value: string) => void;
}

function HistoryList({ entries, search, onSearchChange }: HistoryListProps) {
  const q = search.trim().toLowerCase();
  const filtered =
    q === ""
      ? entries
      : entries.filter(
          (e) =>
            e.ticker.toLowerCase().includes(q) ||
            e.name.toLowerCase().includes(q),
        );

  return (
    <div className="mt-4">
      <label className="flex items-center gap-2 rounded-2xl bg-surface-elevated px-3 py-2 ring-1 ring-black/5 focus-within:ring-scotia-red/40">
        <Search className="h-4 w-4 text-scotia-grey" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search history"
          className="w-full bg-transparent text-[13px] font-medium text-scotia-navy placeholder:text-scotia-grey focus:outline-none"
        />
        {search ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="grid h-5 w-5 place-items-center rounded-full bg-scotia-navy/10 text-scotia-navy hover:bg-scotia-navy/15"
          >
            <X className="h-3 w-3" />
          </button>
        ) : null}
      </label>

      {entries.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-surface-elevated p-6 text-center text-[14px] text-scotia-grey ring-1 ring-black/5">
          No history yet. Swipe on Discover to start tracking the stocks
          you&apos;ve seen.
        </p>
      ) : filtered.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-surface-elevated p-6 text-center text-[13px] text-scotia-grey ring-1 ring-black/5">
          Nothing in your history matches &ldquo;{search}&rdquo;.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {filtered.map((entry) => {
            const style = HISTORY_ACTION_STYLES[entry.action];
            const trendColor =
              entry.changePct >= 0 ? "text-success" : "text-loss";
            return (
              <li key={entry.id}>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-surface-elevated text-[13px] font-black text-scotia-navy ring-1 ring-black/5">
                      {entry.ticker.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-scotia-navy">
                        {entry.ticker}
                      </p>
                      <p className="truncate text-[11px] text-scotia-grey">
                        {entry.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.className}`}
                    >
                      {style.label}
                    </span>
                    <p className="text-[12px] font-semibold tabular-nums text-scotia-navy">
                      ${entry.price.toFixed(2)}
                    </p>
                    <p className={`text-[10px] font-semibold tabular-nums ${trendColor}`}>
                      {entry.changePct >= 0 ? "+" : ""}
                      {entry.changePct}% Y
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function previewHoldingFromCard(card: CardData): PortfolioHolding {
  return {
    ticker: card.ticker,
    name: card.name,
    shares: 0.5,
    executionPrice: card.price,
    changePct: card.changePct,
    direction: "long",
    funding: "cash",
  };
}

interface PendingTrade {
  ticker: string;
  direction: TradeDirection;
}

export function UTradeCards({
  balance,
  scenePoints,
  shortAcknowledged,
  referralState,
  onDebit,
  onCredit,
  onDebitPoints,
  onAcknowledgeShort,
  onRedeemReferral,
  onRestart,
}: UTradeCardsProps) {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [discoverDetailCard, setDiscoverDetailCard] = useState<CardData | null>(
    null,
  );
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [intentCard, setIntentCard] = useState<CardData | null>(null);
  const [intentDirection, setIntentDirection] =
    useState<TradeDirection>("long");
  const [shortAckCard, setShortAckCard] = useState<CardData | null>(null);
  const [pending, setPending] = useState<PendingTrade | null>(null);
  const [order, setOrder] = useState<TradeOrder | null>(null);
  const [orderDirection, setOrderDirection] = useState<TradeDirection>("long");
  const [orderFunding, setOrderFunding] = useState<FundingSource>("cash");
  const [portfolio, setPortfolio] = useState<ReadonlyArray<PortfolioHolding>>([]);
  const [history, setHistory] = useState<ReadonlyArray<HistoryEntry>>([]);
  const [historySearch, setHistorySearch] = useState("");
  const [showLearning, setShowLearning] = useState(false);

  const filteredCards = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q === "") return cards;
    return cards.filter(
      (c) =>
        c.ticker.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q),
    );
  }, [search]);
  const visible = useMemo(
    () => filteredCards.slice(index, index + 3),
    [filteredCards, index],
  );
  const done = index >= filteredCards.length;
  const selectedHolding = useMemo(
    () => portfolio.find((h) => h.ticker === selectedTicker) ?? null,
    [portfolio, selectedTicker],
  );
  const selectedCard = useMemo(
    () => cards.find((c) => c.ticker === selectedTicker),
    [selectedTicker],
  );

  const pushHistory = (card: CardData, action: HistoryAction) => {
    setHistory((prev) => [
      {
        id: `${card.ticker}-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
        ticker: card.ticker,
        name: card.name,
        price: card.price,
        changePct: card.changePct,
        action,
      },
      ...prev,
    ]);
  };

  const openBuyIntent = (card: CardData) => {
    setIntentDirection("long");
    setIntentCard(card);
  };

  const openShortIntent = (card: CardData) => {
    if (!shortAcknowledged) {
      setShortAckCard(card);
      return;
    }
    setIntentDirection("short");
    setIntentCard(card);
  };

  const handleSwipe = (card: CardData, direction: "left" | "right") => {
    setIndex((i) => i + 1);
    if (direction === "right") {
      openBuyIntent(card);
    } else {
      pushHistory(card, "passed");
    }
  };

  const handleAction = (direction: "left" | "right") => {
    if (done) return;
    handleSwipe(filteredCards[index], direction);
  };

  const handleShortAction = () => {
    if (done) return;
    setIndex((i) => i + 1);
    openShortIntent(filteredCards[index]);
  };

  const handleAcknowledgeShort = () => {
    const card = shortAckCard;
    if (card === null) return;
    onAcknowledgeShort();
    setShortAckCard(null);
    setIntentDirection("short");
    setIntentCard(card);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setIndex(0);
  };

  const fundingLabel = (
    direction: TradeDirection,
    funding: FundingSource,
  ): string => {
    if (direction === "short") return "Margin, securities-lending desk";
    if (funding === "points") return "Scene+ points (100 pts = $1)";
    return "Smart Sweep, Scotia HISA";
  };

  const handleConfirmAmount = async (
    amount: number,
    payment: FundingSource,
  ) => {
    const card = intentCard;
    const direction = intentDirection;
    if (card === null) return;
    setIntentCard(null);
    if (direction === "short") {
      // shorts don't move cash on entry in this prototype
    } else if (payment === "points") {
      onDebitPoints(amount * POINTS_PER_DOLLAR);
    } else {
      onDebit(amount);
    }
    setPending({ ticker: card.ticker, direction });
    setOrderDirection(direction);
    setOrderFunding(payment);
    pushHistory(card, "bought");
    const shares = amount / card.price;
    const fundingText = fundingLabel(direction, payment);
    try {
      const result = await placeTrade(card.ticker, shares);
      const order = { ...result, funding: fundingText };
      setPortfolio((prev) => [...prev, toHolding(card, order, direction, payment)]);
      setOrder(order);
    } catch {
      const fallback: TradeOrder = {
        status: "filled",
        orderId: `UTR-OFFLINE-${Date.now().toString(36).toUpperCase()}`,
        ticker: card.ticker,
        name: card.name,
        shares: Number(shares.toFixed(4)),
        executionPrice: card.price,
        notional: Number(amount.toFixed(2)),
        currency: "USD",
        placedAt: new Date().toISOString(),
        settleDate: new Date(Date.now() + 86_400_000).toISOString(),
        commission: 0,
        route: "Scotia iTRADE, best execution",
        funding: fundingText,
        accountType: direction === "short" ? "Margin" : "TFSA",
        compliance: {
          ciroRules: direction === "short" ? ["3252", "3400", "5.2"] : ["3252", "3400"],
          ofsiE23Tier: 1,
          recordRetentionYears: 7,
        },
      };
      setPortfolio((prev) => [...prev, toHolding(card, fallback, direction, payment)]);
      setOrder(fallback);
    }
  };

  const handleCancelIntent = () => {
    if (intentCard !== null) pushHistory(intentCard, "skipped");
    setIntentCard(null);
  };

  const handleClose = () => {
    setOrder(null);
    setPending(null);
  };

  const handleBuyMore = (ticker: string, amount: number) => {
    const card = cards.find((c) => c.ticker === ticker);
    if (card === undefined || amount <= 0 || amount > balance) return;
    onDebit(amount);
    const addedShares = amount / card.price;
    setPortfolio((prev) =>
      prev.map((h) => {
        if (h.ticker !== ticker) return h;
        const totalShares = h.shares + addedShares;
        const totalCost = h.shares * h.executionPrice + amount;
        return {
          ...h,
          shares: totalShares,
          executionPrice: totalCost / totalShares,
          changePct: card.changePct,
        };
      }),
    );
  };

  const handleSell = (ticker: string, amount: number) => {
    const card = cards.find((c) => c.ticker === ticker);
    const holding = portfolio.find((h) => h.ticker === ticker);
    if (card === undefined || holding === undefined || amount <= 0) return;
    const marketValue = holding.shares * card.price;
    const sellAmount = Math.min(amount, marketValue);
    onCredit(sellAmount);
    const sharesSold = sellAmount / card.price;
    setPortfolio((prev) =>
      prev.flatMap((h) => {
        if (h.ticker !== ticker) return [h];
        const remaining = h.shares - sharesSold;
        if (remaining < 0.0001) {
          setSelectedTicker(null);
          return [];
        }
        return [{ ...h, shares: remaining }];
      }),
    );
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
            <span className="text-[13px] text-scotia-grey">
              {activeTab === "portfolio" && selectedHolding
                ? "— stock detail"
                : activeTab === "portfolio"
                  ? "— your holdings"
                  : activeTab === "referral"
                    ? "— refer a friend"
                    : activeTab === "history"
                      ? "— stocks you've seen"
                      : discoverDetailCard
                        ? "— stock detail"
                        : "— discover stocks"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-elevated text-[11px] font-bold text-scotia-navy">
              {activeTab === "portfolio"
                ? portfolio.length
                : activeTab === "referral"
                  ? referralState.activity.length
                  : activeTab === "history"
                    ? history.length
                    : Math.min(index + 1, filteredCards.length)}
            </span>
            <button
              type="button"
              onClick={() => setShowLearning(true)}
              className="grid h-7 w-7 place-items-center rounded-full bg-scotia-navy text-[10px] font-bold text-white"
              aria-label="Profile — learning resources"
            >
              MA
            </button>
          </div>
        </header>

        {activeTab === "referral" ? (
          <ReferralScreen
            state={referralState}
            onRedeem={onRedeemReferral}
          />
        ) : activeTab === "history" ? (
          <HistoryList
            entries={history}
            search={historySearch}
            onSearchChange={setHistorySearch}
          />
        ) : activeTab === "portfolio" ? (
          <div className="mt-4">
            {selectedHolding ? (
              <PortfolioStockDetail
                holding={selectedHolding}
                card={selectedCard}
                balance={balance}
                onBack={() => setSelectedTicker(null)}
                onBuyMore={handleBuyMore}
                onSell={handleSell}
              />
            ) : portfolio.length === 0 ? (
              <p className="rounded-2xl bg-surface-elevated p-6 text-center text-[14px] text-scotia-grey ring-1 ring-black/5">
                No holdings yet. Swipe right on Discover to buy and add stocks
                here.
              </p>
            ) : (
              <ul className="space-y-3">
                {portfolio.map((holding) => (
                  <li key={holding.ticker}>
                    <button
                      type="button"
                      onClick={() => setSelectedTicker(holding.ticker)}
                      className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left ring-1 ring-black/5 transition-colors hover:bg-surface-elevated active:bg-surface-elevated"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-[15px] font-bold text-scotia-navy">
                            {holding.ticker}
                          </p>
                          {holding.direction === "short" ? (
                            <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-600 ring-1 ring-amber-500/30">
                              Short
                            </span>
                          ) : holding.funding === "points" ? (
                            <span className="rounded-md bg-scotia-red/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-scotia-red ring-1 ring-scotia-red/20">
                              Scene+
                            </span>
                          ) : null}
                        </div>
                        <p className="text-[12px] text-scotia-grey">{holding.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-bold tabular-nums text-scotia-navy">
                          $
                          {(holding.shares * holding.executionPrice).toLocaleString(
                            "en-CA",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </p>
                        <p className="text-[11px] tabular-nums text-scotia-grey">
                          {holding.shares.toFixed(4)} sh · $
                          {holding.executionPrice.toFixed(2)}
                        </p>
                        <p
                          className={`text-[11px] font-semibold ${
                            holding.changePct >= 0 ? "text-success" : "text-loss"
                          }`}
                        >
                          {holding.changePct >= 0 ? "+" : ""}
                          {holding.changePct}% Y
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : discoverDetailCard ? (
          <PortfolioStockDetail
            holding={previewHoldingFromCard(discoverDetailCard)}
            card={discoverDetailCard}
            variant="discover"
            backLabel="Back to discover"
            onBack={() => setDiscoverDetailCard(null)}
          />
        ) : (
          <>
            <label className="mt-3 flex items-center gap-2 rounded-2xl bg-surface-elevated px-3 py-2 ring-1 ring-black/5 focus-within:ring-scotia-red/40">
              <Search className="h-4 w-4 text-scotia-grey" />
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search ticker or company"
                className="w-full bg-transparent text-[13px] font-medium text-scotia-navy placeholder:text-scotia-grey focus:outline-none"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                  className="grid h-5 w-5 place-items-center rounded-full bg-scotia-navy/10 text-scotia-navy hover:bg-scotia-navy/15"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : null}
            </label>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-[11px] text-scotia-grey">
                Swipe right to buy. Tap Short to bet against.
              </p>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-scotia-red/10 px-2 py-1 text-[10px] font-bold tabular-nums text-scotia-red ring-1 ring-scotia-red/20">
                  ✦ {scenePoints.toLocaleString("en-CA")} pts
                </span>
                <span className="rounded-full bg-surface-elevated px-2.5 py-1 text-[11px] font-bold tabular-nums text-scotia-navy ring-1 ring-black/5">
                  $
                  {balance.toLocaleString("en-CA", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div
              className="relative mt-4 w-full"
              style={{ height: "min(520px, 60vh)" }}
            >
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
                        {search ? (
                          <Search className="h-6 w-6" />
                        ) : (
                          <Flame className="h-6 w-6" />
                        )}
                      </div>
                      <p className="mt-4 text-[18px] font-bold text-scotia-navy">
                        {search
                          ? "No matches found."
                          : "That's all for now."}
                      </p>
                      <p className="mt-1 text-[13px] text-scotia-grey">
                        {search
                          ? `Nothing matches "${search}". Try another ticker or company.`
                          : "New cards every morning at 9 AM ET."}
                      </p>
                      {search ? null : (
                        <p className="mt-4 text-[12px] text-scotia-grey">
                          You bought{" "}
                          <span className="font-semibold text-scotia-navy">
                            {portfolio.length}
                          </span>{" "}
                          of {cards.length} today.
                        </p>
                      )}
                      <div className="mt-5 flex flex-col items-center gap-3">
                        {search ? (
                          <button
                            type="button"
                            onClick={() => handleSearchChange("")}
                            className="rounded-2xl bg-scotia-red px-5 py-2.5 text-[13px] font-semibold text-white"
                          >
                            Clear search
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={onRestart}
                              className="rounded-2xl bg-scotia-red px-5 py-2.5 text-[13px] font-semibold text-white"
                            >
                              Restart demo
                            </button>
                            <SignOutButton />
                          </>
                        )}
                      </div>
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
                        onViewDetails={() => setDiscoverDetailCard(card)}
                        onSwipe={(dir) => void handleSwipe(card, dir)}
                      />
                    ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {filteredCards.map((c, i) => (
                <span
                  key={c.ticker}
                  className={`h-1.5 rounded-full transition-all ${i === index
                      ? "w-6 bg-scotia-red"
                      : i < index
                        ? "w-1.5 bg-scotia-navy/30"
                        : "w-1.5 bg-scotia-navy/15"
                    }`}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleAction("left")}
                disabled={done}
                className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-loss/30 bg-white py-3 text-[13px] font-semibold text-loss disabled:opacity-40"
              >
                <X className="h-4 w-4" /> Pass
              </button>
              <button
                type="button"
                onClick={handleShortAction}
                disabled={done}
                className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-amber-600/40 bg-white py-3 text-[13px] font-semibold text-amber-600 disabled:opacity-40"
              >
                <TrendingDown className="h-4 w-4" /> Short
              </button>
              <button
                type="button"
                onClick={() => handleAction("right")}
                disabled={done}
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-success py-3 text-[13px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.6)] disabled:opacity-40"
              >
                <Check className="h-4 w-4" /> Buy
              </button>
            </div>
          </>
        )}
      </div>

      <TabBar
        items={utradeTabs}
        activeId={activeTab}
        onSelect={(id) => {
          setActiveTab(id);
          setSelectedTicker(null);
          setDiscoverDetailCard(null);
          if (id !== "history") setHistorySearch("");
        }}
      />

      <TradeAmountSheet
        card={intentCard}
        direction={intentDirection}
        balance={balance}
        scenePoints={scenePoints}
        onConfirm={(amount, payment) =>
          void handleConfirmAmount(amount, payment)
        }
        onClose={handleCancelIntent}
      />

      <ShortRiskAckModal
        card={shortAckCard}
        onAcknowledge={handleAcknowledgeShort}
        onClose={() => setShortAckCard(null)}
      />

      <TradeConfirmation
        order={order}
        pending={pending}
        direction={orderDirection}
        funding={orderFunding}
        onClose={handleClose}
      />

      <AnimatePresence>
        {showLearning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex flex-col justify-end bg-scotia-navy/40 p-4"
            onClick={() => setShowLearning(false)}
          >
            <motion.div
              initial={{ y: 24 }}
              animate={{ y: 0 }}
              exit={{ y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="rounded-3xl bg-white p-5 shadow-[0_20px_50px_-12px_rgba(0,15,77,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-scotia-red">
                    Learn before you invest
                  </p>
                  <h3 className="mt-1 text-[18px] font-bold leading-snug text-scotia-navy">
                    Trusted guides for Canadian beginners
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLearning(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-elevated text-scotia-navy"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {learningResources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-2xl bg-surface-elevated p-4 ring-1 ring-black/5 transition-colors hover:bg-white hover:ring-scotia-red/20"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-bold leading-snug text-scotia-navy">
                          {resource.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-scotia-grey">
                          {resource.source}
                        </p>
                      </div>
                      <ExternalLink
                        className="mt-0.5 h-4 w-4 shrink-0 text-scotia-red"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-[10px] text-scotia-grey">
                Opens in a new tab · Educational resources only
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface ShortRiskAckModalProps {
  card: CardData | null;
  onAcknowledge: () => void;
  onClose: () => void;
}

function ShortRiskAckModal({
  card,
  onAcknowledge,
  onClose,
}: ShortRiskAckModalProps) {
  return (
    <AnimatePresence>
      {card !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 grid place-items-center bg-black/50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-500/10 text-amber-600">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h2 className="mt-4 text-center text-[20px] font-bold leading-tight text-scotia-navy">
              Short selling is opt-in.
            </h2>
            <p className="mt-2 text-center text-[13px] text-scotia-grey">
              Profits if {card.ticker} falls. Losses can exceed your deposit —
              short positions are theoretically unlimited risk.
            </p>

            <ul className="mt-5 space-y-2.5 text-[12px] text-scotia-navy">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-scotia-red" />
                <span>
                  <span className="font-bold">Position cap:</span> max $500
                  notional per name for new shorters.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-scotia-red" />
                <span>
                  <span className="font-bold">Education first:</span>{" "}
                  you&apos;ve read how shorts work and the max-loss warning.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  <span className="font-bold">Order-Execution-Only:</span> Scotia
                  doesn&apos;t recommend this trade. CIRO-aligned.
                </span>
              </li>
            </ul>

            <button
              type="button"
              onClick={onAcknowledge}
              className="mt-6 w-full rounded-2xl bg-amber-600 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_32px_-12px_rgba(217,119,6,0.6)]"
            >
              I understand — enable short selling
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full rounded-2xl border border-black/10 py-3 text-[13px] font-semibold text-scotia-navy"
            >
              Not now
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
