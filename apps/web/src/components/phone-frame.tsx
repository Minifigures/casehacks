"use client";

import type { ReactNode } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <>
      <div className="md:hidden flex min-h-[100dvh] flex-col bg-white">
        {children}
      </div>

      <div className="hidden md:flex min-h-[100dvh] items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(236,17,26,0.08),transparent_60%),linear-gradient(135deg,#0a0a0a_0%,#1a1a1a_100%)] px-6 py-10">
        <div className="relative mx-auto h-[844px] w-[390px] overflow-hidden rounded-[48px] border-[10px] border-black bg-white shadow-[0_30px_80px_-20px_rgba(236,17,26,0.35)]">
          <div className="absolute left-1/2 top-2 z-30 h-[28px] w-[110px] -translate-x-1/2 rounded-full bg-black" />

          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 pt-3 text-[12px] font-semibold text-black">
            <span className="tabular-nums">9:41</span>
            <span className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <BatteryFull className="h-4 w-4" />
            </span>
          </div>

          <div className="phone-scroll relative z-10 flex h-full flex-col overflow-y-auto pt-10">
            {children}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-1.5 z-30 flex justify-center">
            <div className="h-[5px] w-[134px] rounded-full bg-black/80" />
          </div>
        </div>
      </div>
    </>
  );
}
