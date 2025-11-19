# 0004 - Adopt Hybrid Build Strategy for Monorepo Packages

## Context
The Next.js web application failed to start in development mode (`turbo run dev`) because it could not resolve local TypeScript workspace packages (`@zouari-rs/api-client`, `@zouari-rs/validation`). The Next.js module resolver attempts to load the package via the `main: dist/index.js` field, but these build artifacts did not exist until manually compiled.

This created a poor Developer Experience (DX) and an unreliable build process, even though the issue only occurred in development, not CI (which runs a full build first).

## Decision
We will adopt a **Hybrid Build Strategy** that leverages the strengths of both Turborepo and Next.js:

1.  **Turborepo Build Orchestration (Reliability):**
    * The root `turbo.json` `dev` task is updated to depend on `^build` (`"dev": { "dependsOn": ["^build"] }`). This ensures that dependent packages are compiled *before* the web application's dev server starts, preventing initial module resolution errors.
    * The `@zouari-rs/api-client` package must now explicitly list `@zouari-rs/validation` in its `dependencies` for Turborepo to enforce the correct build order.

2.  **Next.js Native Transpilation (Developer Experience):**
    * The `apps/web/next.config.ts` is updated to use the `transpilePackages: [...]` feature. This instructs the Next.js compiler (SWC) to process the TypeScript source files of our internal packages directly. This provides superior hot-reloading (HMR) and avoids the need for a separate `tsc --watch` process for shared packages during development.

## Consequences
* **Positive:**
    * **Reliability:** Eliminates the "Cannot find module" error on initial `turbo run dev` startup.
    * **DX:** Enables Hot Module Replacement for changes made in any shared package, improving development flow.
    * **Clarity:** Explicitly defines the build order via `package.json` and `turbo.json`, which is better for CI and future monorepo scaling.
* **Negative:**
    * Requires a more complex, multi-tool configuration across three files (`api-client/package.json`, `turbo.json`, and `web/next.config.ts`).
