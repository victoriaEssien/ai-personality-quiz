import type { Answer, Question } from "../../../types/quiz";

/**
 * Draft questions for exercising the prompt in isolation. Not the official
 * question bank (VIC-9) — that one needs a joint read-aloud pass before it's
 * real. Covers every dimension so buildAnalysisInput has something to group.
 */
export const DRAFT_TEST_QUESTIONS: Question[] = [
  {
    id: "d1",
    type: "single-choice",
    dimension: "decision-making",
    prompt: "You get a job offer that pays more but you're not sure about the role. You:",
    options: [
      { id: "a", label: "Make a pros/cons list and sleep on it for a few days" },
      { id: "b", label: "Ask three people you trust what they'd do" },
      { id: "c", label: "Go with your gut within the hour" },
    ],
  },
  {
    id: "d2",
    type: "scale",
    dimension: "decision-making",
    prompt:
      "Once you've made a hard decision, how often do you go back and reconsider it?",
  },
  {
    id: "p1",
    type: "single-choice",
    dimension: "planning",
    prompt: "A weekend with nothing scheduled. By Saturday morning you have:",
    options: [
      { id: "a", label: "A rough plan for both days" },
      { id: "b", label: "One thing you want to do, the rest open" },
      { id: "c", label: "No plan, you'll see how you feel" },
    ],
  },
  {
    id: "p2",
    type: "open-text",
    dimension: "planning",
    prompt: "Describe the last time a plan of yours fell apart. What did you do?",
  },
  {
    id: "r1",
    type: "single-choice",
    dimension: "risk",
    prompt:
      "You have savings and a stable job. A friend pitches you on their startup. You:",
    options: [
      { id: "a", label: "Pass, the downside isn't worth it" },
      { id: "b", label: "Put in a small amount you could afford to lose" },
      { id: "c", label: "Go all in if you believe in it" },
    ],
  },
  {
    id: "r2",
    type: "scale",
    dimension: "risk",
    prompt: "How comfortable are you making a big decision with incomplete information?",
  },
  {
    id: "s1",
    type: "single-choice",
    dimension: "social",
    prompt: "At a party where you only know the host, you spend most of the night:",
    options: [
      { id: "a", label: "Talking to one or two people in depth" },
      { id: "b", label: "Circulating and meeting as many people as you can" },
      { id: "c", label: "Near the host, easing in when it feels natural" },
    ],
  },
  {
    id: "c1",
    type: "single-choice",
    dimension: "conflict",
    prompt: "A close friend does something that genuinely annoys you. You:",
    options: [
      { id: "a", label: "Bring it up with them directly, soon" },
      { id: "b", label: "Let it go unless it happens again" },
      { id: "c", label: "Wait for the right moment, which may never come" },
    ],
  },
  {
    id: "c2",
    type: "scale",
    dimension: "conflict",
    prompt:
      "How often do you say what you actually think in a disagreement, in the moment?",
  },
  {
    id: "m1",
    type: "single-choice",
    dimension: "motivation",
    prompt: "You do your best work when:",
    options: [
      { id: "a", label: "There's a deadline bearing down" },
      { id: "b", label: "You're genuinely curious about the problem" },
      { id: "c", label: "Someone is counting on you specifically" },
    ],
  },
  {
    id: "m2",
    type: "open-text",
    dimension: "motivation",
    prompt: "What's something you kept doing long after anyone was checking on it?",
  },
];

interface SampleAnswerSet {
  label: string;
  participantName: string;
  answers: Answer[];
}

export const SAMPLE_ANSWER_SETS: SampleAnswerSet[] = [
  {
    label: "coherent careful planner",
    participantName: "Alex",
    answers: [
      { questionId: "d1", value: "a" },
      { questionId: "d2", value: 4 },
      { questionId: "p1", value: "a" },
      {
        questionId: "p2",
        value:
          "I rebuilt the plan around the one thing that still mattered and let the rest go.",
      },
      { questionId: "r1", value: "a" },
      { questionId: "r2", value: 2 },
      { questionId: "s1", value: "a" },
      { questionId: "c1", value: "c" },
      { questionId: "c2", value: 2 },
      { questionId: "m1", value: "a" },
      {
        questionId: "m2",
        value: "Learning guitar. No recitals, no one asking, just kept at it for years.",
      },
    ],
  },
  {
    label: "coherent spontaneous improviser",
    participantName: "Jordan",
    answers: [
      { questionId: "d1", value: "c" },
      { questionId: "d2", value: 1 },
      { questionId: "p1", value: "c" },
      {
        questionId: "p2",
        value: "Honestly I just made a new plan on the spot and it turned out better.",
      },
      { questionId: "r1", value: "c" },
      { questionId: "r2", value: 5 },
      { questionId: "s1", value: "b" },
      { questionId: "c1", value: "a" },
      { questionId: "c2", value: 5 },
      { questionId: "m1", value: "b" },
      {
        questionId: "m2",
        value: "Cooking. I'll spend three hours on a dish nobody but me will eat.",
      },
    ],
  },
  {
    label: "deliberately contradictory: careful planner who acts on impulse",
    participantName: "Sam",
    answers: [
      { questionId: "d1", value: "a" },
      { questionId: "d2", value: 5 },
      { questionId: "p1", value: "a" },
      {
        questionId: "p2",
        value:
          "I scrapped the whole plan and did something completely different on impulse.",
      },
      { questionId: "r1", value: "a" },
      { questionId: "r2", value: 5 },
      { questionId: "s1", value: "c" },
      { questionId: "c1", value: "b" },
      { questionId: "c2", value: 2 },
      { questionId: "m1", value: "a" },
      {
        questionId: "m2",
        value:
          "I planned a whole trip and then booked a completely different one the night before.",
      },
    ],
  },
  {
    label: "all-middle: picks the neutral option every time",
    participantName: "Taylor",
    answers: [
      { questionId: "d1", value: "b" },
      { questionId: "d2", value: 3 },
      { questionId: "p1", value: "b" },
      { questionId: "p2", value: "I adjusted it a bit and moved on." },
      { questionId: "r1", value: "b" },
      { questionId: "r2", value: 3 },
      { questionId: "s1", value: "c" },
      { questionId: "c1", value: "b" },
      { questionId: "c2", value: 3 },
      { questionId: "m1", value: "c" },
      { questionId: "m2", value: "Nothing really comes to mind." },
    ],
  },
  {
    label: "coherent confrontational risk-seeker",
    participantName: "Riley",
    answers: [
      { questionId: "d1", value: "c" },
      { questionId: "d2", value: 1 },
      { questionId: "p1", value: "c" },
      {
        questionId: "p2",
        value: "Plans falling apart doesn't bother me, I like it better without one.",
      },
      { questionId: "r1", value: "c" },
      { questionId: "r2", value: 5 },
      { questionId: "s1", value: "b" },
      { questionId: "c1", value: "a" },
      { questionId: "c2", value: 5 },
      { questionId: "m1", value: "c" },
      { questionId: "m2", value: "Training for a fight nobody made me take." },
    ],
  },
];
