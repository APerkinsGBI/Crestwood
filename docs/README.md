# Crestwood — Project Memory

This `docs/` folder is the durable memory for the Crestwood platform. It holds the
context, decisions, and product specs that don't live in the code itself. Read this
before starting work; update it when something here stops being true.

## Naming

- **Crestwood** — internal code name for the consolidated platform (this repo).
- **Insurance AI** — current working/product name shown in the UI.
- Do **not** use "Seacrest" (IP reasons) or "Presswood" (an earlier mishearing).

## What this is

An AI platform that sits **on top of** insurance agencies' existing Agency Management
Systems (Vertafore **AMS360** and Applied **Epic**) and removes the repetitive,
high-volume work their teams do every day — renewals, endorsements, certificates,
schedules of insurance. We do **not** replace the AMS; we overlay it.

One consolidated multi-tenant codebase serves both founding agencies
(Gracey-Backer on AMS360, Plastridge on Epic) through per-AMS connectors — **not**
two separate apps.

## Index

| Doc | What's in it |
| --- | --- |
| [prd/shell-application.md](prd/shell-application.md) | PRD for the platform shell (this sprint's deliverable) |
| [context/project-overview.md](context/project-overview.md) | The engagement, the customers, the mission, the roadmap |
| [context/glossary.md](context/glossary.md) | Insurance domain terms |
| [decisions/0001-platform-shell-stack.md](decisions/0001-platform-shell-stack.md) | Why Next.js + Biome + Vitest + the tooling choices |

## Tracking

Work is tracked in **Pact / beads** under the `insurance` project. The shell is
**BEAD-0019**. Update the relevant bead at the end of every working session — see the
project [CLAUDE.md](../CLAUDE.md).
