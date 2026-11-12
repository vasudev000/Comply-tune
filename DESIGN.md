# Complytune Visual Design Contract

Complytune is a dark configuration dashboard for compliance teams. Preserve
this direction as screens and shared components evolve.

- **Audience and use:** compliance officers working in the dashboard daily.
- **Visual direction:** calm, focused dark console with violet accents.
- **Palette:** near-black surfaces and violet brand colors, defined by the
  semantic tokens in `app/design-system/tokens.css`.
- **Typography:** Neue Montreal for interface text and Geist Mono for technical
  labels and numeric details.
- **Composition:** fixed side navigation, a compact top bar, summary cards,
  filters, and data tables for configuration pages.
- **Shape:** rounded controls, restrained card radii, and thin dark strokes.
- **Avoid:** light gray SaaS styling, heavy gradients, and decorative clutter.

The semantic variables in `app/design-system/tokens.css` are the source of
truth for colors, strokes, typography, spacing, and control geometry. Extend
those tokens and shared components instead of creating parallel systems.

## Product boundaries

The current product is UI-only and uses local demo data. The Agent-Native
runtime is framework scaffolding; SQL persistence, real-time sync, AI chat, and
an agent rail are not part of the current Complytune experience. Add those
surfaces only when requested and document the resulting behavior here.
