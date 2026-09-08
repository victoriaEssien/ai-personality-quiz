export const APP_NAME = "AI Personality Quiz";

/** Trait areas the questions are meant to cover. */
export const DIMENSIONS = [
  "decision-making",
  "planning",
  "risk",
  "social",
  "conflict",
  "motivation",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];
