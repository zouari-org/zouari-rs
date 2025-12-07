# 7. Adopt ESM for Web App and Internal Packages

Date: 2025-12-07

## Status

Accepted

## Context

We encountered build failures in the `apps/web` Next.js application when attempting to load the internal `@zouari-rs/validation` package inside `next.config.ts`.

The root cause was a module resolution mismatch:
1. The `@zouari-rs/validation` package is compiled as strict ESM (`"type": "module"`), but previously exposed an invalid `require` export condition pointing to an ESM file.
2. The `apps/web` application was configured as CommonJS (the default for Next.js), causing it to attempt to `require()` the validation package during the config load phase.
3. This resulted in `ERR_PACKAGE_PATH_NOT_EXPORTED` and `MODULE_NOT_FOUND` errors, as Node.js cannot `require()` ES Module files.

## Decision

We have decided to standardize on **ECMAScript Modules (ESM)** for both our internal TypeScript packages and the Next.js web application.

Specific changes include:
1. **Switch Web to ESM:** Explicitly set `"type": "module"` in `apps/web/package.json`. This forces Next.js and its config loader to treat `next.config.ts` and other local files as ESM, allowing native `import` of internal packages.
2. **Standardize Exports:** Update internal packages (like `@zouari-rs/validation`) to use modern `exports` fields:
   - Remove the `require` condition if a CommonJS build is not provided.
   - Add a `default` condition as a fallback for tooling that may not strictly follow the `import` condition in all contexts.

## Consequences

**Positive:**
- Fixes the "Cannot find module" errors in `next.config.ts`.
- Aligns the web application with the internal packages, which were already ESM.
- Future-proofs the stack, as the JavaScript ecosystem is moving towards ESM-only.
- Allows the use of top-level `await` and other ESM features in configuration files.

**Negative:**
- All configuration files in `apps/web` (e.g., `postcss.config.js`, `prettier.config.js`) must be written in ESM syntax (using `export default` instead of `module.exports`), or explicitly renamed to `.cjs` if CommonJS is strictly required.
- Imports within the web application may require more strict adherence to ESM resolution rules (though Next.js handles much of this automatically).
