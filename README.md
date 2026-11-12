# Complytune

Complytune is a React and Vite compliance dashboard built on the Agent-Native framework. Its configuration screens load sample rows from `app/lib/demo-data.ts`; additions and edits stay in the current page's React state and are lost on reload. There is no connected database for Complytune configuration records. Agent-Native may still use local PGlite for framework-managed state.

## Develop locally

```bash
cp .env.example .env
corepack enable
pnpm install
pnpm dev
```

If local development redirects to sign-in, set `AUTH_DISABLED=true` in `.env` for a local preview only.

## Project layout

- `app/routes/`: one route module per screen
- `app/lib/demo-data.ts`: sample rows used by the configuration screens
- `app/components/dashboard/`: shared navigation, top bar, tables, cards, dialogs, buttons, filters, and icons
- `public/figma-assets/`: screen assets

Framework docs: [agent-native.com/docs](https://agent-native.com/docs?utm_source=github&utm_medium=referral&utm_content=fusion-starter-readme).
