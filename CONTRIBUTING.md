# Contributing to ZOUARI Platform

Thank you for your interest in contributing to the **ZOUARI Platform**.

This repository is public for **transparency, auditability, and engineering signal**. It is **source-available**, not open source. Contributions are welcome under the constraints defined below.

---

## 1. Contribution Scope & License Awareness

**Important:** This repository is licensed under the **Business Source License 1.1 (BSL 1.1)**.

### What This Means for Contributors

You may:

* Inspect and study the codebase
* Propose improvements, fixes, and documentation updates
* Submit pull requests for review

You may **not**:

* Deploy the platform in production
* Offer it as a hosted service or SaaS
* Use it to build a competing commercial platform

By contributing, you acknowledge that:

* The project owner retains full commercial rights
* Contributions may be modified, delayed, or declined at the maintainers’ discretion
* Acceptance of a pull request is not guaranteed

Refer to the [LICENSE](LICENSE) file for full terms.

---

## 2. Engineering Principles

ZOUARI follows **Trunk-Based Development (TBD)** with a strong emphasis on:

* Production safety
* Explicit, documented workflows
* Security by default

### Core Rules

1. **`main` is the single source of truth**
2. **`main` must always remain deployable**
3. All changes are merged into `main`
4. **No long-lived development branches**
5. Releases are **tag-driven and automated**, never manual

---

## 3. Repository Overview

This is a polyglot monorepo managed with **pnpm** and **Turborepo**.

| Path        | Description                                               |
| ----------- | --------------------------------------------------------- |
| `backend/`  | Rust backend services (Axum / loco-rs)                    |
| `apps/web/` | Frontend application (Next.js App Router)                 |
| `packages/` | Internal shared libraries (validation, API clients, etc.) |
| `infra/`    | Docker, CI/CD, and deployment assets                      |
| `docs/`     | Architecture and operational documentation                |

---

## 4. Local Development Model

ZOUARI uses a **Zero-Secret Development Model**.

* Secrets are **never** committed or stored in environment files
* All services are started using **Infisical runtime injection**
* Secrets exist only in process memory at runtime

### Prerequisites

* Node.js (v24+) and pnpm
* Rust toolchain (stable)
* Docker
* Infisical CLI access

Refer to `README.md` for full environment setup instructions.

---

## 5. Branching & Commits

### Branch Creation

All work must be done on **short-lived branches** created from `main`.

```bash
git checkout main
git pull
git checkout -b feat/short-descriptive-name
```

### Branch Naming

Use the following prefixes:

* `feat/` – New features
* `fix/` – Bug fixes
* `chore/` – Maintenance or refactors
* `docs/` – Documentation only
* `ci/` – CI/CD or infrastructure changes

### Commit Style

This repository uses **Conventional Commits**.

Examples:

* `feat(backend): add magic link authentication`
* `fix(web): handle invalid session state`
* `docs: clarify zero-secret development flow`

---

## 6. Local Quality Gates (Required)

Before opening a pull request, you are expected to validate your changes locally.

From the repository root:

```bash
pnpm lint     # Lint all packages (Biome / Clippy)
pnpm test     # Run unit and integration tests
pnpm build    # Verify build artifacts
```

Notes:

* `pnpm test` spins up ephemeral Redis and Postgres containers
* Docker must be running
* CI will re-run all checks; do not rely on CI to catch basic failures

---

## 7. Changesets (Mandatory)

ZOUARI uses **Changesets** for versioning and release automation.

### When a Changeset Is Required

A changeset is required if your pull request affects:

* Runtime behavior
* APIs or schemas
* Any package under `packages/`
* Build, Docker, or deployment outputs

### Creating a Changeset

Run from the repository root:

```bash
pnpm changeset
```

You must:

1. Select the affected packages
2. Choose the appropriate version bump (major / minor / patch)
3. Write a concise, human-readable summary

The generated Markdown file in `.changeset/` **must be committed** with your pull request.

Documentation-only changes generally do **not** require a changeset.

---

## 8. Pull Requests & CI

All pull requests must target **`main`**.

### CI Enforcement

Each pull request triggers the **CI (Public Verification)** workflow, which enforces:

* Rust formatting (`rustfmt`)
* Rust linting (`clippy`)
* Full backend and frontend test execution
* Frontend build verification

Pull requests with failing CI will **not** be reviewed.

---

## 9. Release & Deployment Model

Contributors do **not** perform releases manually.

1. Changesets accumulate on `main` as pull requests are merged
2. A **“Version Packages”** pull request is automatically generated or updated
3. When maintainers merge the release PR:

   * Package versions are bumped
   * Changelogs are updated
   * A Git tag (`vX.Y.Z`) is created
4. The tag automatically triggers the production deployment pipeline

There are **no manual production deployments**.

---

## 10. Final Notes

* Keep changes focused: one logical concern per pull request
* Prefer clarity over cleverness
* Open an issue before introducing new patterns or tools

Contribution does not imply roadmap inclusion or acceptance.
