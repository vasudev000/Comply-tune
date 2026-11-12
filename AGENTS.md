# Complytune Agent Guide

Read `README.md` and `DEVELOPING.md` before making changes. They describe the
current app, project layout, and local run commands.

## Current product behavior

- This is a UI-only compliance dashboard prototype with no sign-in or end-user
  agent experience, as recorded in `DECISIONS.md`.
- Configuration pages use the fixtures in `app/lib/demo-data.ts` and local
  React state. Additions and edits are temporary and disappear on reload.
- Do not add persistence, authentication, external integrations, or AI chat
  unless the user asks for them.
- Keep user-facing pages under `app/routes/` and reusable dashboard UI under
  `app/components/dashboard/`.
- Use the semantic design tokens in `app/design-system/tokens.css` and preserve
  the established dark violet visual system.

## Data and integrations

The repository includes Agent-Native server, action, and Drizzle scaffolding,
but it is not currently the data path for the configuration screens. When a
future request explicitly requires durable or shared records, clarify the
needed persistence and access rules, then design server-side validation and
storage as part of that scope. Never hardcode credentials, webhook URLs, or
private/customer data.

## Before and after changes

- Preserve existing routes, sample records, imported assets, and shared
  components unless the requested change requires otherwise.
- Add focused tests for new behavior and regression-prone shared UI. Run the
  relevant checks after a batch of related changes when verification is
  requested or needed to establish the result.
- Update `README.md` or `DEVELOPING.md` when setup or app behavior changes.
