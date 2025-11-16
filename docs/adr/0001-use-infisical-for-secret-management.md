# 0001: Use Infisical for Secret Management

**Date:** 2025-11-16
**Status:** **Amended** (Supersedes 2025-11-15 decision)

## Context

Our project consists of a Rust backend (Loco.rs) and a Next.js frontend, along with various services (Postgres, Redis) in Docker. We need a way to manage environment variables and secrets (e.g., `DATABASE_URL`, `JWT_SECRET`) securely and efficiently.

The initial decision was to use Infisical SDKs (`infisical` crate, Node.js SDK) to fetch secrets at *runtime*. This has been amended in favor of a simpler, more robust CLI-based approach.

## Decision

We will use **Infisical** as our central secret management platform, leveraging the **`infisical run` CLI command** for secret injection.

* **Centralized Vault:** All secrets are organized in a single Infisical project with distinct paths for each process (e.g., `/backend`, `/compose`, `/frontend`).
* **CLI Injection:** Developers and CI/CD pipelines will use `infisical run --command="..."` to inject secrets as standard environment variables at the *start* of a process.
* **Application Code:** The applications (Rust backend, Next.js) are no longer aware of Infisical. They will read secrets from the standard environment (e.g., `std::env::var` in Rust, `process.env` in Node.js) as if they were set normally. The Loco.rs backend will use its `get_env` helper to read these injected variables from its `development.yaml` config.
* **Authentication:** Local development will use Machine Identity Authentication to acquire a temporary `INFISICAL_TOKEN`.

## Consequences

* **Pros:**
    * **Zero Secrets:** No secret values are ever stored in `.env` files or checked into Git.
    * **Centralized:** All environments (dev, staging, prod) pull from a single, managed source.
    * **Simplified App Logic:** The application code is *dramatically* simplified. It no longer has a runtime dependency on Infisical SDKs and simply reads from the environment.
    * **Process-Specific Secrets:** Each process (backend, frontend, docker) only receives the specific secrets it needs, defined by its Infisical path.

* **Cons:**
    * **New Tooling Dependency:** All developers and CI/CD environments *must* have the `infisical` CLI installed and configured.
    * **External Service Dependency:** The Infisical service must be available *before* any application can be launched (for both development and deployment).
