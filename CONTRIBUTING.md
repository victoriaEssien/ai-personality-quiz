# Working on this repo

Small project, two people. Keep it light, but keep `main` working.

## Branches

- `main` stays deployable.
- Branch per piece of work: `feat/quiz-flow`, `fix/answer-state`, `chore/deps`.
- Open a PR, get a quick look from the other person, squash merge.

## Commits

Conventional-ish prefixes so the log is scannable:

```
feat: add question bank for decision-making
fix: keep answers on back navigation
chore: bump next
docs: note the prompt format
```

## Before you push

```bash
pnpm lint
pnpm typecheck
pnpm format
```

## Conventions

- Types and schemas go in `src/types/`. Zod schema first, then infer the type from it.
- Imports use the `@/` alias, not long relative paths.
- Server-only work (model calls, keys) stays in route handlers or server components.
- Never commit `.env.local`. Add any new variable to `.env.example` with an empty value.
- Question copy lives in `src/data/questions.ts`, not inline in components.

## Splitting the work

Rough seams so we don't collide:

- Question bank and copy
- Quiz UI and answer state
- Prompt design and `/api/analyze`
- Result page and sharing

Claim one in the PR or an issue before starting.
