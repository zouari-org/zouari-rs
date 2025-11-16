# Environment Variables

This document is the single source of truth for all environment variables used in the project, managed via Infisical.

Secrets are organized by paths in Infisical and injected into their respective processes using the `infisical run` command.

## 1. Bootstrap Authentication (Developer)

To run any local command, developers must first authenticate to Infisical using a Machine Identity. This provides a temporary token.

`export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=<identity-client-id> --client-secret=<identity-client-secret> --silent --plain)`

---

## 2. Application Secrets (Managed by Infisical)

### Path: `/compose`

These variables are injected into the `docker compose up` command to configure the services (Postgres, Redis, etc.).

| Variable Name | Description |
| :--- | :--- |
| `POSTGRES_USER` | The username for the PostgreSQL database. |
| `POSTGRES_PASSWORD` | The password for the PostgreSQL database. |
| `POSTGRES_DB` | The name of the database to create. |
| `REDIS_PASSWORD` | The password for the Redis instance. |
| `...` | (Add any other variables needed by docker-compose.yml) |

### Path: `/backend`

These variables are injected into the `cargo run watch` command for the backend. The names match the `get_env` calls in `backend/config/development.yaml`.

| Variable Name | `development.yaml` Usage | Description |
| :--- | :--- | :--- |
| `REDIS_URL` | `queue.uri` | Connection string for Redis (used for Sidekiq jobs). |
| `CACHE_URL` | `Cache.uri` | Connection string for Redis (used for application cache). |
| `DATABASE_URL` | `database.uri` | Connection string for the PostgreSQL database. |
| `DB_CONNECT_TIMEOUT` | `database.connect_timeout` | Connection timeout in ms (defaults to 500). |
| `DB_IDLE_TIMEOUT` | `database.idle_timeout` | Idle timeout in ms (defaults to 500). |
| `DB_MIN_CONNECTIONS` | `database.min_connections` | Minimum DB pool size (defaults to 1). |
| `DB_MAX_CONNECTIONS` | `database.max_connections` | Maximum DB pool size (defaults to 1). |
| `JWT_SECRET` | `auth.jwt.secret` | Secret key for signing JWTs. |

### Path: `/frontend`

These variables are injected into the `pnpm run dev` command for the frontend.

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The public URL for the backend API (e.g., `http://localhost:5150`). |
| `...` | (Add any other server-side or public variables needed by Next.js) |
