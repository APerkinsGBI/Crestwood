# PRD — Crestwood Platform Shell

| | |
| --- | --- |
| **Status** | Draft / in progress |
| **Owner** | Luis Michel |
| **Approver** | Julián Limón |
| **Tracking** | Pact `insurance` → **BEAD-0019** |
| **Created** | 2026-06-25 |

## 1. Summary

Crestwood is the **single consolidated, multi-tenant application shell** that every
Insurance AI feature plugs into. Both founding agencies — Gracey-Backer (AMS360) and
Plastridge (Epic) — are served by **one codebase** with per-AMS connectors, not two
separate apps. This PRD covers the **shell only**: the foundation that the first agency
deliverables (Schedule of Insurance, renewal-comparison) are built on top of. It does
**not** cover those features or the AMS connectors' internals.

## 2. Problem & why now

The agencies' teams spend 4–10 hours per account on repetitive renewal and endorsement
work. We're contracted to take that workload off their plates and demo visible progress
every sprint. Before any feature can ship, there must be a place for it to live: an
authenticated, multi-tenant, white-labelable app deployed somewhere a producer can open.

A hard constraint from Javier: build **one** platform, not two tools. Two separate apps
would let each agency stop at "happy with our own tool" and miss the bigger prize — the
AI platform that could eventually replace the AMS. The shell encodes that decision in
the architecture from day one.

## 3. Goals

- **G1.** One Next.js codebase, deployable to Vercel, that both agencies' features build on.
- **G2.** Multi-tenant from the foundation: per-agency data siloing, no single-agency
  assumptions hard-coded.
- **G3.** White-label ready: per-agency branding (logo, colors, subdomain).
- **G4.** Authentication scaffolding (Clerk or WorkOS — pre-decided before feature work).
- **G5.** Audit logging from the first commit (SOC 2 is an 18-month target).
- **G6.** Top-tier code quality from the start: formatting, linting, type checking,
  tests, pre-commit hooks, CI. (Done — see §6 and the
  [stack decision](../decisions/0001-platform-shell-stack.md).)
- **G7.** A placeholder "Building…" landing page so there's a live, shareable URL.

## 4. Non-goals (for this PRD)

- The Schedule of Insurance tool (BEAD-0005) and renewal-comparison tool (BEAD-0009) —
  separate deliverables built on this shell.
- AMS connector implementations (AMS360 read, Epic read/write) — the adapter
  **interface** belongs to the shell; the connector internals do not.
- The document pipeline, the durable workflow engine, and carrier connectivity.
- Production data handling rules — gated on NDA / security review (BEAD-0013).

## 5. Scope — what the shell delivers

### 5.1 In this first slice (landing + quality foundation) — DONE

- Next.js 16 (App Router, TypeScript, `src/`) scaffold.
- A polished **"Building…"** landing page at `/` (no auth, statically rendered).
- Full quality toolchain: Biome (lint + format), Vitest + Testing Library, Husky
  pre-commit / pre-push hooks, lint-staged, GitHub Actions CI.

### 5.2 Next (foundation hardening) — planned

- **Auth:** integrate the pre-decided provider (Clerk vs. WorkOS — decide first).
  Sign-in, protected routes, session.
- **Multi-tenancy:** tenant (agency) resolution from subdomain/host; tenant context
  available app-wide; per-tenant data scoping baked into the data-access layer.
- **White-label:** per-tenant theme (logo, colors) driven by tenant config.
- **AMS adapter interface:** a typed connector contract (`read`/`write` capabilities,
  capability flags for partial-write fallback) that AMS360 and Epic implement. No
  feature talks to an AMS directly.
- **Audit logging:** an append-only audit log written on every meaningful action,
  structured for later SOC 2 evidence.
- **Deploy:** live on Vercel with preview deploys per PR.

## 6. Quality bar (built in, not bolted on)

| Concern | Tool | Enforced by |
| --- | --- | --- |
| Format + lint | Biome | `pnpm lint`, pre-commit (lint-staged), CI |
| Types | TypeScript strict | `pnpm typecheck`, pre-push, CI |
| Tests | Vitest + Testing Library | `pnpm test`, pre-push, CI |
| Pre-commit | Husky + lint-staged | local git hook |
| Pre-push | Husky | local git hook |
| CI | GitHub Actions | every push / PR |

`pnpm check` runs typecheck + lint + test together.

## 7. Success criteria (acceptance for BEAD-0019)

- [x] One Next.js codebase scaffolded with the full quality toolchain green
      (lint, typecheck, test, build).
- [x] "Building…" landing page renders and is covered by a test.
- [ ] Auth integrated (provider decided first).
- [ ] Multi-tenant scaffolding: tenant resolution + per-agency data siloing.
- [ ] White-label theming per tenant.
- [ ] Audit logging on meaningful actions.
- [ ] Deployed to Vercel; both agency deliverables can be built on top.

The bead's stated acceptance: *"shell deployed (Vercel) with auth + multi-tenant
scaffolding, ready for both AMS connectors."*

## 8. Open questions / dependencies

- **Auth vendor:** Clerk vs. WorkOS — pre-decide before feature work (brief §10.3).
- **Workflow engine:** Temporal vs. queue — pre-decide; not needed for the shell itself
  but shapes nearby foundation work.
- **Where dev/staging lives** and **production-data-in-dev rules** — gated on NDA /
  Plastridge security review (BEAD-0013). Confirm before wiring real AMS data.
- **Subdomain strategy** for white-label multi-tenancy on Vercel.
