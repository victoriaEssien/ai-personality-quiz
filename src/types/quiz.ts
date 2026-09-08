import { z } from "zod";

/** How a question is presented. Extend as we add formats. */
export const questionTypeSchema = z.enum(["single-choice", "scale", "open-text"]);

export const questionSchema = z.object({
  id: z.string(),
  type: questionTypeSchema,
  /** Which trait area the question probes: decisions, social, risk, planning, etc. */
  dimension: z.string(),
  prompt: z.string(),
  /** Present for single-choice questions. */
  options: z.array(z.object({ id: z.string(), label: z.string() })).optional(),
});

export const answerSchema = z.object({
  questionId: z.string(),
  /** Option id, scale number, or free text depending on question type. */
  value: z.union([z.string(), z.number()]),
});

export const personalityProfileSchema = z.object({
  /** e.g. "The Strategic Free Spirit" */
  title: z.string(),
  summary: z.string(),
  strengths: z.array(z.string()),
  tendencies: z.array(z.string()),
  decisionStyle: z.string(),
  socialStyle: z.string(),
});

export const analyzeRequestSchema = z.object({
  participantName: z.string().min(1).optional(),
  answers: z.array(answerSchema).min(1),
});

export type QuestionType = z.infer<typeof questionTypeSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Answer = z.infer<typeof answerSchema>;
export type PersonalityProfile = z.infer<typeof personalityProfileSchema>;
export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;
