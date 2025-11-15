# 0001: Use Infisical for Secret Management

**Date:** 2025-11-15
**Status:** Accepted

## Context

Our project consists of a Rust backend (Loco.rs) and a Next.js frontend, along with various services (Postgres, Redis) in Docker. We need a way to manage environment variables and secrets (e.g., `DATABASE_URL`, `JWT_SECRET`) securely and efficiently, both for local development and in a "zero secret" production environment.

## Decision

We will use **Infisical** as our central secret management platform.
* **Backend (Rust):** The Loco.rs app will use the `infisical` crate to fetch secrets directly from the Infisical service at runtime. This is implemented via a custom `load_config` hook in `backend/src/app.rs`.
* **Frontend (Next.js):**
    * **Runtime Secrets:** The Next.js server will use the Infisical Node.js SDK for server-side secrets.
    * **Build-time Secrets:** Public variables (`NEXT_PUBLIC_`) will be injected at build time using the `infisical run` command (e.g., `infisical run -- pnpm build`).
* **Documentation:** A single `docs/environment.md` file will serve as the source of truth for all variable names and their Infisical paths.

## Consequences

* **Pros:**
    * **Zero Secrets:** No secret values are ever stored in `.env` files or checked into Git.
    * **Centralized:** All environments (dev, staging, prod) pull from a single, managed source.
    * **Automation:** Secrets are fetched dynamically on app boot, simplifying deployment.
* **Cons:**
    * **New Dependency:** The application now has a runtime dependency on the Infisical service being available at boot.
