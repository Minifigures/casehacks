"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Bell,
  Building2,
  Wallet,
  Receipt,
  TrendingUp,
  Menu,
} from "lucide-react";
import { TabBar } from "@/components/tab-bar";

interface MoneyCoachProps {
  onAdvance: () => void;
}

const tabs = [
  { id: "accounts", label: "Accounts", icon: Building2 },
  { id: "move", label: "Move Money", icon: Wallet },
  { id: "bills", label: "Bills", icon: Receipt },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "more", label: "More", icon: Menu },
] as const;

export function MoneyCoach({ onAdvance }: MoneyCoachProps) {
  return (
    <div className="flex h-full flex-col bg-surface-elevated">
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <header className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-scotia-navy text-[11px] font-bold text-white">
              MA
            </div>
            <span className="text-[18px] font-bold tracking-tight text-scotia-red">
              Hi, Marco
            </span>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-scotia-navy ring-1 ring-black/5"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
        </header>

        <div className="mt-5 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-scotia-navy to-scotia-red text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-scotia-navy">
            Scotia Money Coach
          </span>
        </div>

        <motion.section
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mt-3 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 via-white to-scotia-red/5 p-5 shadow-[0_8px_24px_-12px_rgba(0,15,77,0.15)] ring-1 ring-black/5"
        >
          <p className="text-[17px] font-bold leading-snug text-scotia-navy">
            Hey Marco, you got paid $1,800 yesterday. Auto-invest $50 toward
            your FHSA home goal?
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onAdvance}
              className="rounded-2xl bg-scotia-red py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(236,17,26,0.6)]"
            >
              Confirm $50
            </button>
            <button
              type="button"
              onClick={onAdvance}
              className="rounded-2xl border-2 border-scotia-red bg-white py-3 text-[14px] font-semibold text-scotia-red"
            >
              Adjust
            </button>
          </div>
        </motion.section>

        <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-scotia-grey">
            Why we know this
          </p>
          <ul className="mt-2 space-y-1.5 text-[12px] text-scotia-navy">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-scotia-red" />
              Your chequing payroll deposit
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-scotia-red" />
              Your Smart Investor portfolio
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-scotia-red" />
              Your Scene+ activity
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-scotia-red" />
              Your iTRADE order history
            </li>
          </ul>
          <p className="mt-3 text-[11px] italic text-scotia-grey">
            Wealthsimple only sees one of these.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdvance}
          className="mt-4 w-full rounded-2xl border border-black/10 bg-white py-3 text-[13px] font-semibold text-scotia-navy"
        >
          Skip for now
        </button>
      </div>

      <TabBar items={tabs} activeId="insights" />
    </div>
  );
}
