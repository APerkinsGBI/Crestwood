# Crestwood — Insurance AI Platform Shell

Multi-tenant Next.js app shell that sits **on top of** insurance agencies' management
systems (AMS360, Applied Epic) and removes their teams' repetitive work. One
consolidated codebase serves both founding agencies via per-AMS connectors — not two
separate apps.

- **Code name:** Crestwood. **Product/working name (in UI):** "Insurance AI".
- Do **not** use "Seacrest" (IP reasons) or "Presswood" (earlier mishearing).

## Project memory lives in `docs/`

Read it before non-trivial work; update it when something there stops being true.

- `docs/README.md` — index
- `docs/prd/shell-application.md` — the shell PRD (current deliverable)
- `docs/context/project-overview.md` — engagement, mission, principles, roadmap
- `docs/context/glossary.md` — insurance domain terms
- `docs/decisions/` — architecture decision records

## Work tracking — update beads every session

Work is tracked in **Pact / beads** under the `insurance` project (via the Pact MCP).
The platform shell is **BEAD-0019**.

**At the end of every working session, update any related bead(s) with what was done.**
- Add a note (`add_note`) summarizing the session's work to the relevant bead.
- Move status (`update_status`) when a bead starts, lands in review, or is done.
- If the work doesn't map to an existing bead, flag it so one can be created.

## Commands

```bash
pnpm dev          # local dev server
pnpm build        # production build
pnpm test         # run tests (Vitest)
pnpm test:watch   # watch mode
pnpm typecheck    # tsc --noEmit
pnpm lint         # Biome check (lint + format, no writes)
pnpm lint:fix     # Biome check --write
pnpm check        # typecheck + lint + test (run before pushing)
```

## Conventions

- **Stack:** Next.js 16 App Router · TypeScript (strict) · Tailwind v4 · Biome ·
  Vitest · pnpm. See `docs/decisions/0001-platform-shell-stack.md`.
- **Quality is enforced:** Husky pre-commit runs Biome on staged files; pre-push runs
  typecheck + tests; GitHub Actions runs the full suite on every PR. Keep them green.
- **Tests** live next to source as `*.test.tsx` / `*.test.ts`.
- **Self-documenting code:** clear names over comments. Comment only genuinely complex
  logic.
- **AMS adapter rule (architectural):** no feature ever talks to AMS360 or Epic
  directly — always through the adapter layer. Don't hard-code single-agency
  assumptions; keep the path to multi-tenant / white-label open.

@AGENTS.md
