# Project Overview

Distilled from the Engineer Onboarding Brief and the June 22, 2026 kickoff. This is
the "why" behind the code. Source notes live outside the repo (Sprint 1 folder).

## The engagement

- **2-month initial engagement** (~June 15 – Aug 15, 2026), intended to convert to
  ~6 months, with a realistic 6–12 month runway.
- **Two founding agencies, run as one team:**
  - **Gracey-Backer** — runs Vertafore **AMS360** (friendlier, documented REST API).
  - **Plastridge** — runs Applied **Epic** (API needs a contract, held under
    Plastridge; source of truth for how the work really happens).
- **Cadence:** deliverables ~twice a week, demoable progress every sprint. Ship
  something visible — this is a hard expectation.
- **Comms:** Microsoft Teams (primary), email backup. All AMS/CRM and contract
  conversations route through **Matt**.

## Who's who

- **Pact engineering:** Luis Michel (this repo's author, central coordination), Álex Trejo.
- **Pact leadership / commercial:** Matt Pasienski, Julián Limón (project lead, approver
  on the shell bead), Javier Hernandez (information flows; not on the build team).
- **Agency PoCs:** Nina Shepard (Plastridge), Angela (Gracey-Backer).

## The mission (memorize)

The near-term scorecard is **how much workload we take off the teams**, validated on
their real production data — not how product-shaped the thing is.

1. **Relieve work, don't add a tool.** If a CSR must learn a new system to do something
   they already do, we failed.
2. **Do the job, don't draft the job.** Issue the certificate, send the email, write
   back to the AMS, and report it's done — don't generate piles to review.
3. **Architect like a product, ship like an overlay.** Keep the door open to a
   multi-tenant commercial product; don't gold-plate at the expense of relief speed.
4. **Prove it on real data first**, at both founding agencies.
5. **Built to extend for years.** Renewals are the start; the roadmap is large.

The value is **~80% integrations + workflow orchestration, ~20% novel AI.**

## What we are NOT building

A comparative rater, a replacement AMS, consumer tools, or our own models (frontier
LLMs via API only — Claude primary, GPT/Google fallback).

## First wins

1. **Renewal process** — highest-time, highest-volume workflow (4–10 hrs/account).
2. **Endorsement process** — frequent, bounded, tedious mid-term policy changes.
3. Per agency, the concrete first targets:
   - Gracey-Backer: **Schedule of Insurance** tool (BEAD-0005).
   - Plastridge: **renewal-comparison spreadsheet** tool, ~Module 1.5 (BEAD-0009).

Both are built **on top of this shell** (BEAD-0019), which is why the shell blocks them.

## Architecture principles (from the brief)

- **Modular monolith**, one backend / one DB / one frontend. No microservices day one.
- **AMS adapter layer is first-class** — no feature ever talks to AMS360 or Epic
  directly. Design for rough edges and partial write support.
- **One document pipeline** for every doc type, each with a confidence score; low
  confidence routes to a human. Track per-document and per-agency LLM cost.
- **Durable workflow engine** (Temporal preferred; BullMQ/Celery acceptable) — renewals
  run 90 days, must survive deploys and pause on external events.
- **Buy, don't build** the commodity layers: auth (Clerk/WorkOS), doc extraction
  (Reducto + Claude vision), email (Nylas/Unipile), browser automation
  (Browserbase + Stagehand), e-sign (DocuSign), hosting (cloud), SOC 2 (Vanta).
- **Security and audit logging from the first commit.** SOC 2 Type II is the ~18-month
  target; retrofitting is painful.

## Roadmap shape

Phases A–F. A1 = thin producer-visible slice (upcoming-renewals list on real AMS360
data) → A2 = harden into multi-tenant foundation + Module 1.1 → B = Epic adapter →
C+ = parallelize modules 1.2/1.3/1.4 → D (carrier loop, 1.5) → E (analysis/proposal)
→ F (post-bind). 12 stable module IDs (1.1–1.12); build order ≠ numeric order.
