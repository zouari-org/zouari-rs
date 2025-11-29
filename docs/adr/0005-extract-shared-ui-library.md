# 5. Extract Shared UI Library

Date: 2025-11-29

## Status

Accepted

## Context

We are currently building the landing page (`apps/web`) but plan to scale the Zouari platform to include multiple additional applications, such as a User Dashboard, a PaaS Console, and internal admin tools.

Currently, UI components reside within `apps/web/src/app/_components`. While this works for a single application, it poses several issues for our expansion:
1.  **Duplication**: Future apps would need to re-implement the same "atoms" (Buttons, Theme Toggles, Inputs).
2.  **Inconsistency**: Without a shared source of truth, the visual identity (Zouari Design System) might drift between applications.
3.  **Maintenance**: Updating a core brand color or component behavior would require changes in multiple repositories or folders.

## Decision

We will extract a shared UI package to the monorepo workspace at `packages/ui`.

1.  **Scope**: This package will contain "dumb" (presentational) components, theme definitions, and shared React hooks. It will strictly wrap our UI framework (Mantine) and export pre-configured components.
2.  **Boundaries**: 
    * `packages/ui`: Generic components (e.g., `Button`, `ThemeToggle`, `Card`).
    * `apps/*/src/components`: App-specific reusable components (e.g., `LoginForm`, `AppLayout`).
    * `apps/*/src/app/_components`: One-off page sections (e.g., `HeroSection`).
3.  **Dependencies**: The package will be internal (`private: true`) and consumed by apps via the workspace protocol (`workspace:*`).

## Consequences

### Positive
* **Reusability**: The Dashboard and PaaS apps can immediately bootstrap with the correct branding.
* **Consistency**: A single change to `packages/ui/src/theme.ts` propagates to all applications.
* **Separation of Concerns**: Application logic remains in `apps/`, while visual logic is isolated in `packages/`.

### Negative
* **Complexity**: We must ensure the Next.js build pipeline correctly transpiles the external package (added to `transpilePackages` in `next.config.ts`).
* **Overhead**: Making a change to a button requires rebuilding the dependent applications to see the effect.