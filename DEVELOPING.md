# Complytune Development Guide

This guide documents the application that exists in this repository. Complytune
is currently a UI-only prototype: its configuration screens start with sample
rows and keep edits in browser memory. Changes are lost on reload. No
Complytune domain database, sign-in flow, or end-user AI chat is connected.

## Stack and commands

- React 19, TypeScript, React Router framework mode, Vite, Tailwind CSS
- Agent-Native Core supplies the server/runtime shell; most framework features
  are not currently used by the Complytune screens.
- Package manager: pnpm 10.14.0; Node.js 22.22.0 or newer

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

Useful scripts from `package.json`:

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm typecheck` | Run Agent-Native TypeScript checks |
| `pnpm test` | Run the Vitest suite |
| `pnpm build` | Build the production app |
| `pnpm start` | Start the production server |

For a local preview that redirects to sign-in, set `AUTH_DISABLED=true` in the
local `.env` file. Do not use that setting to protect a deployed app.

## Where the app code lives

- `app/routes/`: page routes for locations, departments, employees, roles, and
  frameworks. `_index.tsx` is the locations page.
- `app/components/dashboard/`: shared dashboard shell, navigation, top bar,
  tables, buttons, filters, summary cards, icons, and data-entry panels.
- `app/lib/demo-data.ts`: sample rows used by the configuration pages.
- `app/design-system/tokens.css`: color, typography, stroke, spacing, radius,
  and control-size tokens.
- `public/figma-assets/`: imported illustrations and icons.
- `server/`, `actions/`, and `drizzle/`: Agent-Native framework scaffolding.
  The app's Drizzle schema is intentionally empty; configuration data is not
  persisted through this scaffolding.

## Current data behavior

Each configuration page initializes its own React state from
`app/lib/demo-data.ts`. Add/edit actions update that page's state only; they do
not survive a reload or synchronize across users or pages. Keep this behavior
until persistent storage is explicitly requested. If that scope changes, first
define the persistence and access-control requirements, then add a schema and
server-side data operations instead of presenting local state as durable.

## Shared UI conventions

- Reuse components from `app/components/dashboard/` for common navigation,
  tables, controls, status tags, buttons, and panels.
- Prefer semantic `--ds-*` variables from `app/design-system/tokens.css` over
  one-off colors, strokes, or typography values.
- Keep page-specific table columns and filtering beside their route.
- Keep Figma-specific assets under `public/figma-assets/` and reference them by
  stable asset path.

## Tests

Vitest configuration is in `vitest.config.ts`. Add focused tests for shared
components and page-specific behavior that is likely to regress, such as table
selection, filters, data drawers, and upload validation. The test command
should fail when no tests are collected.

The Agent-Native framework has additional capabilities documented in its own
guides. Treat those as framework references, not a description of current
Complytune behavior; add them only when the product requirements call for them.
