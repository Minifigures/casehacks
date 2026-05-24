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
import {
  SEED_REFERRAL_ACTIVITY,
  VALID_REDEEM_CODES,
  type ReferralActivity,
  type ReferralState,
} from "@/lib/referral";

const REFERRAL_CODE = "uTrade-2026";

const screenOrder: ReadonlyArray<ScreenId> = [
  "chequing",
  "quiz",
  "success",
  "coach",
  "utrade",
];

const STARTING_BALANCE = 1847.32;
const STARTING_SCENE_POINTS = 4250;

export function UTradeApp() {
  const [screen, setScreen] = useState<ScreenId>("chequing");
  const [, setQuiz] = useState<QuizState>({ horizon: null, risk: null });
  const [balance, setBalance] = useState<number>(STARTING_BALANCE);
  const [scenePoints, setScenePoints] = useState<number>(STARTING_SCENE_POINTS);
  const [shortAcknowledged, setShortAcknowledged] = useState<boolean>(false);
  const referralCode = REFERRAL_CODE;
  const [redeemedCodes, setRedeemedCodes] = useState<ReadonlyArray<string>>(
    [],
  );
  const [activity, setActivity] = useState<ReadonlyArray<ReferralActivity>>(
    SEED_REFERRAL_ACTIVITY,
  );

  const goto = useCallback((next: ScreenId) => setScreen(next), []);
  const debit = useCallback((amount: number) => {
    setBalance((b) => Math.max(0, b - amount));
  }, []);
  const credit = useCallback((amount: number) => {
    setBalance((b) => b + amount);
  }, []);
  const debitPoints = useCallback((points: number) => {
    setScenePoints((p) => Math.max(0, p - points));
  }, []);
  const acknowledgeShort = useCallback(() => {
    setShortAcknowledged(true);
  }, []);
  const redeemReferral = useCallback((normalizedCode: string) => {
    const reward = VALID_REDEEM_CODES[normalizedCode];
    if (reward === undefined) return;
    setRedeemedCodes((prev) =>
      prev.includes(normalizedCode) ? prev : [...prev, normalizedCode],
    );
    setBalance((b) => b + reward);
    setActivity((prev) => [
      {
        id: `redeem-${normalizedCode}-${Date.now()}`,
        name: `Redeemed code ${normalizedCode}`,
        date: "Today",
        reward,
        kind: "redeemed",
      },
      ...prev,
    ]);
  }, []);
  const restart = useCallback(() => {
    setQuiz({ horizon: null, risk: null });
    setBalance(STARTING_BALANCE);
    setScenePoints(STARTING_SCENE_POINTS);
    setShortAcknowledged(false);
    setRedeemedCodes([]);
    setActivity(SEED_REFERRAL_ACTIVITY);
    setScreen("chequing");
  }, []);

  const earnedFromActivity = activity.reduce((sum, a) => sum + a.reward, 0);
  const referralState: ReferralState = {
    code: referralCode,
    redeemedCodes,
    activity,
    earned: earnedFromActivity,
  };

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
                <ChequingDashboard
                  balance={balance}
                  referralCode={referralCode}
                  onAdvance={() => goto("quiz")}
                />
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
                <SuccessState
                  referralState={referralState}
                  onRedeem={redeemReferral}
                  onAdvance={() => goto("coach")}
                />
              ) : null}
              {screen === "coach" ? (
                <MoneyCoach onAdvance={() => goto("utrade")} />
              ) : null}
              {screen === "utrade" ? (
                <UTradeCards
                  balance={balance}
                  scenePoints={scenePoints}
                  shortAcknowledged={shortAcknowledged}
                  referralState={referralState}
                  onDebit={debit}
                  onCredit={credit}
                  onDebitPoints={debitPoints}
                  onAcknowledgeShort={acknowledgeShort}
                  onRedeemReferral={redeemReferral}
                  onRestart={restart}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PhoneFrame>
  );
}
