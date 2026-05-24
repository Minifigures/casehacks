"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  ShoppingCart,
  Music,
  ArrowLeftRight,
  Receipt,
  PlusCircle,
  MoreHorizontal,
  Building2,
  Wallet,
  TrendingUp,
  Menu,
  Bell,
  Gift,
} from "lucide-react";
import { ScotiaMark } from "@/components/scotia-mark";
import { SignOutButton } from "@/components/sign-out-button";
import { TabBar } from "@/components/tab-bar";

interface ChequingDashboardProps {
  balance: number;
  referralCode: string;
  onAdvance: () => void;
}

const transactions = [
  { id: "tim", merchant: "Tim Hortons", date: "Today, 8:42 AM", amount: -4.6, icon: Coffee },
  { id: "lob", merchant: "Loblaws", date: "Yesterday", amount: -87.42, icon: ShoppingCart },
  { id: "spotify", merchant: "Apple Pay, Spotify", date: "Oct 12", amount: -11.29, icon: Music },
];

const quickActions = [
  { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
  { id: "paybill", label: "Pay Bill", icon: Receipt },
  { id: "deposit", label: "Deposit", icon: PlusCircle },
  { id: "more", label: "More", icon: MoreHorizontal },
];

const tabs = [
  { id: "accounts", label: "Accounts", icon: Building2 },
  { id: "move", label: "Move Money", icon: Wallet },
  { id: "bills", label: "Bills", icon: Receipt },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "more", label: "More", icon: Menu },
] as const;

function formatAmount(value: number) {
  const sign = value < 0 ? "-" : "+";
  return `${sign}$${Math.abs(value).toFixed(2)}`;
}

export function ChequingDashboard({
  balance,
  referralCode,
  onAdvance,
}: ChequingDashboardProps) {
  const dollars = Math.floor(balance);
  const cents = Math.round((balance - dollars) * 100)
    .toString()
    .padStart(2, "0");
  const dollarsFormatted = dollars.toLocaleString("en-CA");
  return (
    <div className="flex h-full flex-col bg-surface-elevated">
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <header className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <ScotiaMark />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-scotia-navy ring-1 ring-black/5"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <SignOutButton variant="icon" />
            <div className="grid h-9 w-9 place-items-center rounded-full bg-scotia-navy text-[11px] font-bold text-white">
              MA
            </div>
          </div>
        </header>

        <p className="mt-3 text-[14px] font-medium text-scotia-grey">Hi,</p>
        <h1 className="text-[26px] font-bold tracking-tight text-scotia-navy">
          Marco
        </h1>

        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-4 rounded-3xl bg-white p-5 text-center shadow-[0_8px_24px_-12px_rgba(0,15,77,0.15)] ring-1 ring-black/5"
        >
          <p className="text-[12px] font-semibold uppercase tracking-wider text-scotia-red">
            Everyday Chequing
          </p>
          <p className="mt-2 text-[36px] font-black tabular-nums tracking-tight text-scotia-navy">
            ${dollarsFormatted}.<span className="text-[24px] text-scotia-navy/80">{cents}</span>
          </p>
          <p className="mt-1 text-[12px] text-scotia-grey">Available Balance</p>
        </motion.section>

        <section className="mt-4 grid grid-cols-4 gap-2">
          {quickActions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 ring-1 ring-black/5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-elevated text-scotia-navy">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-semibold leading-tight text-scotia-navy">
                {label}
              </span>
            </button>
          ))}
        </section>

        <section className="mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-scotia-navy">
              Recent Transactions
            </h2>
            <button
              type="button"
              className="text-[12px] font-semibold text-scotia-red"
            >
              View All
            </button>
          </div>

          <ul className="mt-3 divide-y divide-black/5 rounded-2xl bg-white ring-1 ring-black/5">
            {transactions.map(({ id, merchant, date, amount, icon: Icon }) => (
              <li
                key={id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-surface-elevated text-scotia-navy">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-scotia-navy">
                      {merchant}
                    </p>
                    <p className="text-[11px] text-scotia-grey">{date}</p>
                  </div>
                </div>
                <p className="text-[14px] font-semibold tabular-nums text-scotia-navy">
                  {formatAmount(amount)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-scotia-red/10 text-scotia-red">
            <Gift className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-scotia-navy">
              Refer a friend, earn $25
            </p>
            <p className="mt-0.5 truncate text-[11px] text-scotia-grey">
              Your code:{" "}
              <span className="font-bold tracking-wider text-scotia-navy">
                {referralCode}
              </span>
            </p>
          </div>
          <span className="rounded-full bg-surface-elevated px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-scotia-red">
            New
          </span>
        </section>

        <motion.button
          type="button"
          onClick={onAdvance}
          whileTap={{ scale: 0.98 }}
          className="mt-5 flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-scotia-red to-scotia-red-dark p-4 text-left text-white shadow-[0_12px_32px_-12px_rgba(236,17,26,0.6)]"
        >
          <span className="flex-1">
            <span className="block text-[14px] font-bold leading-tight">
              Your ${dollarsFormatted} is earning 0.05%.
            </span>
            <span className="mt-0.5 block text-[13px] font-medium text-white/90">
              Open a TFSA in 30 seconds.
            </span>
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
            <ArrowRight className="h-4 w-4" />
          </span>
        </motion.button>
      </div>

      <TabBar items={tabs} activeId="accounts" />
    </div>
  );
}
