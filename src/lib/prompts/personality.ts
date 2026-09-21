import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { personalityProfileSchema } from "../../types/quiz";
import type { Answer, PersonalityProfile, Question } from "../../types/quiz";

/** Bump whenever SYSTEM_PROMPT or buildAnalysisInput's format changes. */
export const PROMPT_VERSION = "v1";

const MODEL_ID = "claude-opus-5";

export const SYSTEM_PROMPT = `You write short, sharp personality profiles from quiz answers. Your voice is
specific and warm, but not soft: you say the true thing about someone even when it's a
little uncomfortable, and you are willing to name a tension in how they operate rather
than smooth it over.

You will be given a person's answers, grouped by the trait dimension each question
probes (decision-making, planning, risk, social, conflict, motivation). Reason about the
pattern across each dimension, not about any single answer in isolation.

Hard rules:
- Never use a generic personality-type label (introvert, extrovert, Type A, etc.)
  anywhere in the output.
- Never write pure flattery. Every strength should come with a cost or a condition
  attached.
- "title" must read as an archetype phrase in the style of "The Strategic Free Spirit":
  two or three words, never a single trait name.
- If the answers contradict each other (for example, someone claims to plan carefully
  but also says they act on impulse), name the contradiction directly instead of
  averaging it away or ignoring it.
- If someone picked the neutral or middle option on nearly everything, do not invent a
  confident-sounding profile to cover for thin signal. Say plainly that the answers read
  as guarded or middle-of-the-road, and describe what that itself suggests about them.
- Write like you are describing one specific, real person to someone who knows them, not
  filling in a template.`;

/**
 * Groups answers by dimension so the model reasons about axes rather than a flat
 * list of raw answers.
 */
export function buildAnalysisInput(answers: Answer[], questions: Question[]): string {
  const questionsById = new Map(questions.map((question) => [question.id, question]));
  const entriesByDimension = new Map<string, string[]>();

  for (const answer of answers) {
    const question = questionsById.get(answer.questionId);
    if (!question) continue;

    const lines = entriesByDimension.get(question.dimension) ?? [];
    lines.push(formatAnswer(question, answer));
    entriesByDimension.set(question.dimension, lines);
  }

  return [...entriesByDimension.entries()]
    .map(([dimension, lines]) => `## ${dimension}\n${lines.join("\n\n")}`)
    .join("\n\n");
}

function formatAnswer(question: Question, answer: Answer): string {
  if (question.type === "single-choice") {
    const option = question.options?.find((o) => o.id === answer.value);
    return `Q: ${question.prompt}\nA: ${option?.label ?? answer.value}`;
  }
  if (question.type === "scale") {
    return `Q: ${question.prompt}\nA: chose ${answer.value} on the scale`;
  }
  return `Q: ${question.prompt}\nA: "${answer.value}"`;
}

/**
 * Calls the model with structured output and returns a validated profile, or null
 * if the response didn't conform to personalityProfileSchema. Callers that need a
 * repair-retry on null are responsible for that (see VIC-15).
 */
export async function generatePersonalityProfile(
  answers: Answer[],
  questions: Question[],
  participantName?: string,
): Promise<PersonalityProfile | null> {
  const client = new Anthropic();
  const input = buildAnalysisInput(answers, questions);

  const response = await client.messages.parse({
    model: MODEL_ID,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: participantName ? `Participant: ${participantName}\n\n${input}` : input,
      },
    ],
    output_config: { format: zodOutputFormat(personalityProfileSchema) },
  });

  return response.parsed_output;
}
