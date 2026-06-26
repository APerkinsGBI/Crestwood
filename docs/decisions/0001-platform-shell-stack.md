# 0001 — Platform shell stack & tooling

- **Status:** Accepted
- **Date:** 2026-06-25
- **Context:** BEAD-0019 (platform shell)

## Decision

Build the Crestwood shell on **Next.js 16 (App Router, TypeScript, `src/`)** deployed to
**Vercel**, with a quality toolchain in place from the first commit.

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 App Router | One frontend + backend in a modular monolith; first-class on Vercel; SSR/RSC for the eventual producer dashboards. |
| Language | TypeScript (strict) | Type safety across the AMS adapter boundary and the canonical data model. |
| Package manager | pnpm | Fast, strict, good monorepo path if we split packages later. |
| Lint + format | **Biome** | Single fast tool replacing ESLint + Prettier; less config drift. |
| Styling | Tailwind CSS v4 | Fast iteration on producer-facing UI; pairs with white-label theming later. |
| Tests | **Vitest** + Testing Library | Fast, ESM-native, Jest-compatible API; jsdom for component tests. |
| Git hooks | **Husky** + lint-staged | Pre-commit: Biome on staged files. Pre-push: typecheck + tests. |
| CI | GitHub Actions | lint → typecheck → test → build on every push/PR. |

## Consequences

- Quality gates are enforced locally (hooks) and remotely (CI), so regressions are
  caught before review — important once the agent emails clients and writes to the AMS.
- Biome replaces ESLint; `create-next-app` was run with `--biome` (no ESLint config).
- The modular-monolith principle from the brief is honored: one app, one codebase.

## Still to decide (not blocking this slice)

- **Auth:** Clerk vs. WorkOS (buy, don't build).
- **Workflow engine:** Temporal vs. BullMQ/Celery.
- **Multi-tenancy strategy:** subdomain-based tenant resolution + per-agency data siloing.
