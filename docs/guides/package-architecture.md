# Package Architecture & Module System

This guide outlines how we structure our internal packages and handle dependencies within the monorepo to ensure compatibility between our Rust backend and TypeScript frontend.

## Module System: ESM First

We use **ECMAScript Modules (ESM)** as the standard for all JavaScript/TypeScript packages in this repository.

### Why ESM?
- **Compatibility:** Our internal packages (like `@zouari-rs/validation`) are built to run in both Node.js and browser environments. ESM provides the best standard for this duality.
- **Tree-shaking:** ESM allows bundlers to more effectively remove unused code, keeping our frontend bundles small.

### Guidelines for New Packages

When creating a new internal package (e.g., in `packages/`), follow these configuration rules:

1. **Set Type to Module:**
   Always include this in your `package.json`:
   ```json
   "type": "module"
````

2.  **Configure Exports:**
    Do not use the `main` field alone. Use the `exports` field to clearly define entry points. **Do not** include a `require` field unless you are actually generating a CommonJS (`.cjs`) build.

    *Recommended `package.json` structure:*

    ```json
    "exports": {
      ".": {
        "import": "./dist/index.js",
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
    ```

    *Note: The `default` condition serves as a fallback for certain build tools that might struggle with ESM-only packages.*

3.  **TypeScript Configuration:**
    Ensure `tsconfig.json` extends the base config and uses `NodeNext` for module resolution:

    ```json
    {
      "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
      }
    }
    ```

## Troubleshooting `apps/web`

The Next.js application (`apps/web`) is also configured as `"type": "module"`.

If you encounter **`ERR_REQUIRE_ESM`** or **`ERR_PACKAGE_PATH_NOT_EXPORTED`**:

1.  Check if you are trying to `require()` an internal package in a config file. Use `import` instead.
2.  Ensure the config file itself is treated as ESM (it should be `.mjs`, `.ts`, or `.js` inside a `"type": "module"` package).
3.  Verify the internal package has a `default` export condition in its `package.json`.
