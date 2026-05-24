export type ScreenId =
  | "chequing"
  | "quiz"
  | "success"
  | "coach"
  | "utrade";

export type HorizonAnswer = "1y" | "5y" | "20y";
export type RiskAnswer = "sell" | "hold";

export interface QuizState {
  horizon: HorizonAnswer | null;
  risk: RiskAnswer | null;
}

export interface CardData {
  ticker: string;
  name: string;
  changePct: number;
  news: string;
  analystExcerpt: string;
  trend: "up" | "down";
  friendsOwn: boolean;
  brandColor: string;
  price: number;
}
