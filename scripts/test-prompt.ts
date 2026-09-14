/**
 * Runs every fixture answer set through the prompt and prints the resulting
 * profiles, so the prompt can be judged and iterated on without the API route
 * or a browser. Requires ANTHROPIC_API_KEY in the environment.
 *
 * Usage: pnpm test:prompt
 */
import { generatePersonalityProfile } from "../src/lib/prompts/personality";
import {
  DRAFT_TEST_QUESTIONS,
  SAMPLE_ANSWER_SETS,
} from "../src/lib/prompts/fixtures/sample-answer-sets";

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      "Set ANTHROPIC_API_KEY (e.g. in .env.local, then `source` it) before running this.",
    );
    process.exit(1);
  }

  for (const set of SAMPLE_ANSWER_SETS) {
    console.log(`\n=== ${set.label} (${set.participantName}) ===`);
    const profile = await generatePersonalityProfile(
      set.answers,
      DRAFT_TEST_QUESTIONS,
      set.participantName,
    );

    if (!profile) {
      console.log("Model output failed schema validation.");
      continue;
    }

    console.log(JSON.stringify(profile, null, 2));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
