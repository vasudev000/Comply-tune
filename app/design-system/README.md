# Complytune UI design system

The screen styling is backed by semantic CSS custom properties in `tokens.css`.
Use token names in components so a visual update can be made once without
re-tuning each page. The existing dashboard uses the dark palette by default.

## Foundations

| Area | Tokens and values |
| --- | --- |
| Surfaces | `--ds-color-bg-app`, `--ds-color-bg-panel`, `--ds-color-bg-header`, `--ds-color-bg-card`, `--ds-color-bg-control`, `--ds-color-bg-hover` |
| Text | `--ds-color-text-primary`, `--ds-color-text-body`, `--ds-color-text-secondary`, `--ds-color-text-muted`, `--ds-color-text-disabled` |
| Strokes | `--ds-stroke-subtle`, `--ds-stroke-default`, `--ds-stroke-strong`, `--ds-stroke-focus`, `--ds-stroke-brand`, `--ds-stroke-width` |
| Brand and status | `--ds-color-brand`, `--ds-color-brand-hover`, `--ds-color-brand-highlight`, plus success and danger foreground, border and background tokens |
| Typography | Neue Montreal is the UI face; Geist Mono is for numeric and technical labels. Weights: `--ds-font-weight-light` (300), `regular` (400), `medium` (500), and `bold` (700). Sizes are caption 12px, tag 14px, body 16px, and title 20px. |
| Geometry | Tag radius 4px, controls 8px, cards 12px. Controls use 20px compact, 32px small, and 36px medium heights; the top bar is 60px. Spacing tokens follow a 4px base. |

## Buttons

Use `AppButton` from `app/components/dashboard/Buttons.tsx`. It provides
`primary`, `secondary`, `outline`, and `danger` variants, plus `sm` and `md`
sizes. The component includes consistent focus-visible and disabled states.
Use `className` only for layout-specific additions such as width or placement;
keep color, border, typography, and interaction styling in the shared component.

```tsx
<AppButton variant="primary" size="md" onClick={handleSave}>
  Save changes
</AppButton>
```

## Usage and changes

- Prefer semantic `--ds-*` tokens over literal color, stroke, radius, or type
  values in shared UI components.
- Add new variants to the shared component and document their purpose here.
- Preserve existing Figma-specific dimensions unless a screen change requests
  new values.
