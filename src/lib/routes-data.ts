export type WatchStatus = "in-budget" | "almost" | "watching";

export type FareWatch = {
  id: string;
  code: string;
  city: string;
  target: number;
  current: number;
  progress: number;
  status: WatchStatus;
};

export const popularRoutes: FareWatch[] = [
  {
    id: "bkk",
    code: "TPE → BKK",
    city: "Bangkok 曼谷",
    target: 6500,
    current: 6420,
    progress: 92,
    status: "in-budget",
  },
  {
    id: "hnd",
    code: "TPE → HND",
    city: "Tokyo 東京",
    target: 8000,
    current: 8340,
    progress: 64,
    status: "watching",
  },
  {
    id: "sin",
    code: "TPE → SIN",
    city: "Singapore 新加坡",
    target: 7200,
    current: 7380,
    progress: 78,
    status: "almost",
  },
];

export const statusLabel: Record<WatchStatus, string> = {
  "in-budget": "In budget",
  almost: "Almost",
  watching: "Watching",
};

export function formatNtd(value: number) {
  return `NT$${value.toLocaleString("en-US")}`;
}
