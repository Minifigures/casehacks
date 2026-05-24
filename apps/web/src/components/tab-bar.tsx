"use client";

import type { LucideIcon } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabBarProps {
  items: ReadonlyArray<TabItem>;
  activeId: string;
}

export function TabBar({ items, activeId }: TabBarProps) {
  return (
    <nav className="mt-auto border-t border-black/5 bg-white/95 backdrop-blur">
      <ul className="grid grid-cols-5 px-2 pb-5 pt-2">
        {items.map(({ id, label, icon: Icon }) => {
          const active = id === activeId;
          return (
            <li key={id}>
              <button
                type="button"
                className={`flex w-full flex-col items-center gap-1 py-1 ${
                  active ? "text-scotia-red" : "text-scotia-grey"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span
                  className={`text-[10px] leading-tight ${
                    active ? "font-bold" : "font-medium"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
