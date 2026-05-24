"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame } from "@/components/phone-frame";
import { ChequingDashboard } from "@/components/screens/chequing-dashboard";
import { OnboardingQuiz } from "@/components/screens/onboarding-quiz";
import { SuccessState } from "@/components/screens/success-state";
import { MoneyCoach } from "@/components/screens/money-coach";
import { UTradeCards } from "@/components/screens/u-trade-cards";
import type { QuizState, ScreenId } from "@/lib/types";

const screenOrder: ReadonlyArray<ScreenId> = [
  "chequing",
  "quiz",
  "success",
  "coach",
  "utrade",
];

export function UTradeApp() {
  const [screen, setScreen] = useState<ScreenId>("chequing");
  const [, setQuiz] = useState<QuizState>({ horizon: null, risk: null });

  const goto = useCallback((next: ScreenId) => setScreen(next), []);
  const restart = useCallback(() => {
    setQuiz({ horizon: null, risk: null });
    setScreen("chequing");
  }, []);

  const currentIndex = screenOrder.indexOf(screen);

  return (
    <PhoneFrame>
      <div className="relative flex min-h-0 flex-1 flex-col bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-2">
          <div className="flex gap-1">
            {screenOrder.map((id, i) => (
              <span
                key={id}
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  i <= currentIndex ? "bg-scotia-red" : "bg-scotia-navy/10"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col pt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex min-h-0 flex-1 flex-col"
            >
              {screen === "chequing" ? (
                <ChequingDashboard onAdvance={() => goto("quiz")} />
              ) : null}
              {screen === "quiz" ? (
                <OnboardingQuiz
                  onAdvance={(s) => {
                    setQuiz(s);
                    goto("success");
                  }}
                  onBack={() => goto("chequing")}
                />
              ) : null}
              {screen === "success" ? (
                <SuccessState onAdvance={() => goto("coach")} />
              ) : null}
              {screen === "coach" ? (
                <MoneyCoach onAdvance={() => goto("utrade")} />
              ) : null}
              {screen === "utrade" ? (
                <UTradeCards onRestart={restart} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PhoneFrame>
  );
}
