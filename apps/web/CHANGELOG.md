# web

## 4.5.0

### Minor Changes

- Align deployment strategy with environment slugs.

  Production and staging deployments now use stable Docker tags (`prod` / `staging`)
  instead of version-specific tags when triggering Coolify deployments.

### Patch Changes

- Updated dependencies
  - @zouari-rs/api-client@3.6.0
  - @zouari-rs/validation@3.7.0

## 4.4.0

### Minor Changes

- chore(deps): update frontend and tooling dependencies and pin @types/node to Node 24

### Patch Changes

- Updated dependencies
  - @zouari-rs/api-client@3.5.0
  - @zouari-rs/validation@3.6.0

## 4.3.0

### Minor Changes

- corepack use pnpm@10.26.0

### Patch Changes

- Updated dependencies
  - @zouari-rs/api-client@3.4.0
  - @zouari-rs/validation@3.5.0

## 4.2.0

### Minor Changes

---

## unchanged: patch

Stabilize backend auth and JWT request tests, unblock CI, and document source-available licensing transition.

### Patch Changes

- Updated dependencies
  - @zouari-rs/api-client@3.3.0
  - @zouari-rs/validation@3.4.0

## 4.1.0

### Minor Changes

- chore(deps): upgrade project stack and dependencies to latest

## 4.0.0

### Major Changes

- Migrate application to native ESM (`"type": "module"`) to fix build-time module resolution errors.

### Patch Changes

- Updated dependencies
  - @zouari-rs/validation@3.3.0
  - @zouari-rs/api-client@3.2.1
