# Environment Variables

This document is the single source of truth for all environment variables used in the project, managed via Infisical.

## 1. Bootstrap Authentication (Developer)

To run any local command, developers must first authenticate to Infisical using a Machine Identity. This provides a temporary token.

```bash
export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=<identity-client-id> --client-secret=<identity-client-secret> --silent --plain)
```

## 2. Validation Strategy

We use a "fail-fast" strategy for all environments. If a required variable is missing, the application **will not start**.

  * **Backend (Rust):** Validated implicitly by Loco on startup. Missing variables cause a panic.
  * **Frontend (Next.js):** Validated explicitly by Zod in `next.config.ts`. Missing variables cause the build/dev process to exit with an error.
  * **Shared Schemas:** Public frontend variables are defined in `packages/validation/src/env.ts`.

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
| `NEXT_PUBLIC_API_URL` | **Fallback** public URL for the backend API. The client primarily auto-detects the API domain (e.g., `api.zouari.org`) from the window hostname. This variable is used for Server-Side Rendering (SSR) or local dev. |
| `AUTH_SECRET` | **(Server-Only)** Secret key for NextAuth.js/Auth.js. Validated locally in `next.config.ts`. |
| `NEXTAUTH_URL` | **(Server-Only)** The canonical URL of the frontend (e.g., `https://zouari.org`). Required for production Auth. |

## 4. Production & Staging (Coolify Zero Trust)

We **do not** use `.env` files on the server. We use the **Infisical CLI Wrapper** pattern with **Machine Identities**.

### Step 1: Create Identities (Infisical Dashboard)

Create two Machine Identities in Infisical:

1.  **`coolify-staging`**: Read access to `Staging` environment.
2.  **`coolify-prod`**: Read access to `Production` environment.

*Save the `Client ID` and `Client Secret` for each. You will need them in Coolify.*

### Step 2: Configure Coolify Services

For **both** Backend and Frontend services in Coolify, add the following Environment Variables. This keeps the configuration portable.

| Variable | Description |
| :--- | :--- |
| `INFISICAL_CLIENT_ID` | The Machine Identity Client ID (from Step 1). |
| `INFISICAL_CLIENT_SECRET` | The Machine Identity Client Secret (from Step 1). |
| `INFISICAL_PROJECT_ID` | The ID of the Infisical Project (found in Project Settings). |
| `INFISICAL_DOMAIN` | The Infisical API URL (e.g., `https://app.infisical.com` or your self-hosted URL). |

### Step 3: Start Commands (Entrypoint Wrapper)

Override the Docker Start Command in Coolify settings. This "one-liner" authenticates dynamically and then starts the process with secrets injected into RAM.

**Backend Service:**

```bash
export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id="$INFISICAL_CLIENT_ID" --client-secret="$INFISICAL_CLIENT_SECRET" --domain="$INFISICAL_DOMAIN" --silent --plain) && \
infisical run --projectId="$INFISICAL_PROJECT_ID" --env=prod --path=/backend --domain="$INFISICAL_DOMAIN" -- ./zouari-backend start
```

**Frontend Service:**

```bash
export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id="$INFISICAL_CLIENT_ID" --client-secret="$INFISICAL_CLIENT_SECRET" --domain="$INFISICAL_DOMAIN" --silent --plain) && \
infisical run --projectId="$INFISICAL_PROJECT_ID" --env=prod --path=/frontend --domain="$INFISICAL_DOMAIN" -- node apps/web/server.js
```
