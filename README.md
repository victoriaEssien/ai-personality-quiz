# AI Personality Quiz

A personality quiz for two (or more) people. Everyone answers the same set of
questions, and the AI writes a personalised profile for each person based on how
they answered.

The point is not a generic label like "you're an introvert". The output should read
like a description of an actual person:

> **Your Personality: The Strategic Free Spirit**
> You like having a plan, but you don't like feeling restricted by it. You think
> things through before big decisions, but when something genuinely excites you,
> you're willing to throw the plan out the window.

The AI-generated analysis is the main feature. Everything else exists to feed it.

## Status

Boilerplate only. No quiz logic, no questions, no model calls yet.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- Zod for shared schemas and API validation
- ESLint + Prettier
- pnpm

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in your key
pnpm dev
```

Open http://localhost:3000

Scripts:

| Command          | What it does                  |
| ---------------- | ----------------------------- |
| `pnpm dev`       | Dev server                    |
| `pnpm build`     | Production build              |
| `pnpm start`     | Serve the production build    |
| `pnpm lint`      | ESLint                        |
| `pnpm typecheck` | `tsc --noEmit`                |
| `pnpm format`    | Prettier write                |

## Folder map

```
src/
  app/
    page.tsx                 landing
    quiz/page.tsx            question flow (placeholder)
    results/[id]/page.tsx    generated profile (placeholder)
    api/analyze/route.ts     answers in, profile out (returns 501 for now)
    layout.tsx, globals.css
  components/                shared UI, ui/ for primitives
  data/questions.ts          the question bank, currently empty
  lib/                       constants and helpers
  types/quiz.ts              zod schemas + inferred types, single source of truth
docs/project-brief.md        the original brief
```

## How the pieces fit

1. `src/data/questions.ts` holds the question bank. Each question names a
   `dimension` (decision-making, planning, risk, social, conflict, motivation).
2. `/quiz` walks a person through the questions and collects `Answer[]`.
3. `POST /api/analyze` takes `{ participantName?, answers }`, builds the prompt,
   calls the model, and returns a `PersonalityProfile`.
4. `/results/[id]` renders that profile.

Shapes live in `src/types/quiz.ts`. Change them there, not in three places.

## Roadmap

- [ ] Write the question bank
- [ ] Quiz flow with progress and answer state
- [ ] Prompt design and the `/api/analyze` implementation
- [ ] Persistence for sessions and results
- [ ] Result page and share link
- [ ] "How well do you know your friend?" mode: predict a friend's answers, then
      compare against their real ones

## Working together

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branches, commits and the split of work.
