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
  onSelect?: (id: string) => void;
}

const colsByCount: Readonly<Record<number, string>> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function TabBar({ items, activeId, onSelect }: TabBarProps) {
  const colsClass = colsByCount[items.length] ?? "grid-cols-5";
  return (
    <nav className="mt-auto border-t border-black/5 bg-white/95 backdrop-blur">
      <ul className={`grid ${colsClass} px-2 pb-5 pt-2`}>
        {items.map(({ id, label, icon: Icon }) => {
          const active = id === activeId;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect?.(id)}
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
