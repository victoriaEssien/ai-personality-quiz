import { NextResponse } from "next/server";
import { analyzeRequestSchema } from "@/types/quiz";

/**
 * Takes a completed set of answers and returns an AI-written personality profile.
 * Placeholder only: parses the body, returns 501.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = analyzeRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // TODO: build the prompt from parsed.data.answers, call the model,
  // validate the response against personalityProfileSchema, persist it.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
