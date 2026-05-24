export interface ReferralActivity {
  id: string;
  name: string;
  date: string;
  reward: number;
  kind: "redeemed" | "invited";
}

export interface ReferralState {
  code: string;
  redeemedCodes: ReadonlyArray<string>;
  activity: ReadonlyArray<ReferralActivity>;
  earned: number;
}

export const REFERRAL_REWARD_PER_FRIEND = 25;

export const VALID_REDEEM_CODES: Readonly<Record<string, number>> = {
  WELCOME25: 25,
  SCOTIA50: 50,
  FRIEND10: 10,
};

export type RedeemResult =
  | { ok: true; reward: number; normalizedCode: string }
  | { ok: false; reason: "empty" | "unknown" | "already-redeemed" };

export function normalizeCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function evaluateRedeem(
  input: string,
  redeemedCodes: ReadonlyArray<string>,
): RedeemResult {
  const code = normalizeCode(input);
  if (code === "") return { ok: false, reason: "empty" };
  const reward = VALID_REDEEM_CODES[code];
  if (reward === undefined) return { ok: false, reason: "unknown" };
  if (redeemedCodes.includes(code)) {
    return { ok: false, reason: "already-redeemed" };
  }
  return { ok: true, reward, normalizedCode: code };
}

export function generateReferralCode(seed: string): string {
  const cleanSeed = seed.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5) || "USER";
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${cleanSeed}-${suffix}`;
}

export const SEED_REFERRAL_ACTIVITY: ReadonlyArray<ReferralActivity> = [
  {
    id: "seed-priya",
    name: "Priya R. joined with your code",
    date: "Oct 14",
    reward: REFERRAL_REWARD_PER_FRIEND,
    kind: "invited",
  },
];
