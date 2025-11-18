# Environment Variables

This document is the single source of truth for all environment variables used in the project, managed via Infisical.

## 1. Bootstrap Authentication (Developer)

To run any local command, developers must first authenticate to Infisical using a Machine Identity. This provides a temporary token.

`export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=<identity-client-id> --client-secret=<identity-client-secret> --silent --plain)`

---

## 2. Validation Strategy

We use a "fail-fast" strategy for all environments. If a required variable is missing, the application **will not start**.

* **Backend (Rust):** Validated implicitly by Loco on startup. Missing variables cause a panic.
* **Frontend (Next.js):** Validated explicitly by Zod in `next.config.ts`. Missing variables cause the build/dev process to exit with an error.
* **Shared Schemas:** Public frontend variables are defined in `packages/validation/src/env.ts`.

---

## 3. Application Secrets (Managed by Infisical)

### Path: `/compose`

These variables are injected into the `docker compose up` command to configure the services (Postgres, Redis, etc.).

| Variable Name | Description |
| :--- | :--- |
| `POSTGRES_USER` | The username for the PostgreSQL database. |
| `POSTGRES_PASSWORD` | The password for the PostgreSQL database. |
| `POSTGRES_DB` | The name of the database to create. |
| `REDIS_PASSWORD` | The password for the Redis instance. |

### Path: `/backend`

These variables are injected into the `cargo run watch` command for the backend.

| Variable Name | `development.yaml` Usage | Description |
| :--- | :--- | :--- |
| `REDIS_URL` | `queue.uri` | Connection string for Redis (Sidekiq). |
| `CACHE_URL` | `Cache.uri` | Connection string for Redis (Cache). |
| `DATABASE_URL` | `database.uri` | Connection string for PostgreSQL. |
| `DB_CONNECT_TIMEOUT` | `database.connect_timeout` | Connection timeout in ms. |
| `DB_IDLE_TIMEOUT` | `database.idle_timeout` | Idle timeout in ms. |
| `DB_MIN_CONNECTIONS` | `database.min_connections` | Minimum DB pool size. |
| `DB_MAX_CONNECTIONS` | `database.max_connections` | Maximum DB pool size. |
| `JWT_SECRET` | `auth.jwt.secret` | Secret key for signing JWTs. |

### Path: `/frontend`

These variables are injected into the `pnpm run dev` command for the frontend. They are validated against `frontendSchema` in `@zouari-rs/validation`.

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The public URL for the backend API (e.g., `http://localhost:5150`). |
| `AUTH_SECRET` | **(Server-Only)** Secret key for NextAuth.js/Auth.js. Validated locally in `next.config.ts`. |
