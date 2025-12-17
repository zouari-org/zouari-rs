# @zouari-rs/validation

## 3.7.0

### Minor Changes

- Align deployment strategy with environment slugs.

  Production and staging deployments now use stable Docker tags (`prod` / `staging`)
  instead of version-specific tags when triggering Coolify deployments.

## 3.6.0

### Minor Changes

- chore(deps): update frontend and tooling dependencies and pin @types/node to Node 24

## 3.5.0

### Minor Changes

- corepack use pnpm@10.26.0

## 3.4.0

### Minor Changes

---

## unchanged: patch

Stabilize backend auth and JWT request tests, unblock CI, and document source-available licensing transition.

## 3.3.0

### Minor Changes

- Fix ESM/CJS interop by removing invalid `require` exports and adding a `default` export condition.
