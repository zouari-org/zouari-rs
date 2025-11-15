# Environment Variables

This document is the single source of truth for all environment variables used in the project, managed via Infisical.

## 1. Bootstrap Secrets (Infisical Access)

These variables are required by the application (Rust backend, Next.js) to authenticate with the Infisical service.

**Security Warning:** These are the keys to your secret vault. They must **NEVER** be hardcoded or committed to Git. For local development, they should be exported into your terminal session (e.g., via a `.envrc` file with `direnv`).

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `INFISICAL_CLIENT_ID` | N/A (Bootstrap) | `your_client_id_here` | Client ID for Infisical service principal. |
| `INFISICAL_CLIENT_SECRET` | N/A (Bootstrap) | `your_client_secret_here` | Client Secret for Infisical service principal. |
| `INFISICAL_BASE_URL` | N/A (Bootstrap) | `https://infisical.zouari.org` | The URL of your self-hosted Infisical instance. |
| `INFISICAL_SECRETS_PROJECT_ID` | N/A (Bootstrap) | `your_project_id_here` | The Infisical Project ID for your secrets. |
| `INFISICAL_KMS_PROJECT_ID` | N/A (Bootstrap) | `your_project_id_here` | The Infisical Project ID for KMS (if different). |

---

## 2. Application Secrets (Managed by Infisical)

These are the application-level variables that are fetched *from* Infisical at runtime.

### Development Environment Context

**Note on `localhost` vs. Docker:**
The values in this document are set for running `cargo` commands directly on the **host machine** (e.g., `cargo loco db migrate`).

When services are run via `docker-compose`, these values are overridden in Infisical (or via `docker-compose.yml`) to use the internal Docker service names.
* `APP_DATABASE_URI` becomes `postgres://loco:loco-local-password-super-secret@zouari-rs-db:5432/backend_development`
* `APP_QUEUE_URI` becomes `redis://:loco-local-redis-pass@zouari-rs-redis:6379/0`
* `APP_MAILER_SMTP_HOST` becomes `zouari-rs-mailpit`

---

### /auth
Authentication and JWT settings.

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_AUTH_JWT_SECRET` | `/auth` | `(Your openssl secret)` | Secret key for signing JWTs. Generate with `openssl rand -hex 64`. |
| `APP_AUTH_JWT_EXPISIRATION` | `/auth` | `604800` | JWT expiration in seconds (7 days). |

---

### /cache
**New section** for Redis caching (database 1).

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_CACHE_ENABLE` | `/cache` | `true` | Enable Redis cache. |
| `APP_CACHE_URI` | `/cache` | `redis://:loco-local-redis-pass@localhost:6379/1` | Redis connection for cache (database 1). |
| `APP_CACHE_KIND` | `/cache` | `InMem` | Use in-memory cache (options: InMem, Null). |

---

### /database
PostgreSQL database connection settings.

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_DATABASE_URI` | `/database` | `postgres://loco:loco-local-password-super-secret@localhost:5432/backend_development` | **(Fix)** Connection URI for Postgres (host-facing). |
| `APP_DATABASE_ENABLE_LOGGING` | `/database` | `false` | Disable verbose SQL logging. |
| `APP_DATABASE_CONNECT_TIMEOUT` | `/database` | `500` | Connection timeout in ms. |
| `APP_DATABASE_IDLE_TIMEOUT` | `/database` | `500` | Idle timeout in ms. |
| `APP_DATABASE_MIN_CONNECTIONS` | `/database` | `1` | Minimum number of DB connections. |
| `APP_DATABASE_MAX_CONNECTIONS` | `/database` | `1` | Maximum number of DB connections. |
| `APP_DATABASE_AUTO_MIGRATE` | `/database` | `true` | Run database migrations on startup. |
| `APP_DATABASE_DANGEROUSLY_TRUNCATE` | `/database` | `false` | Disable truncating tables. |
| `APP_DATABASE_DANGEROUSLY_RECREATE` | `/database` | `false` | Disable recreating tables. |

---

### /logger
Configuration for the backend's `tracing` logger.

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_LOGGER_ENABLE` | `/logger` | `true` | Enables the logger. |
| `APP_LOGGER_PRETTY_BACKTRACE` | `/logger` | `true` | Enables pretty-printing for backtraces. |
| `APP_LOGGER_LEVEL` | `/logger` | `debug` | Sets the log verbosity. |
| `APP_LOGGER_FORMAT` | `/logger` | `compact` | Sets the log output format. |

---

### /mailer
SMTP settings, configured for Mailpit in development.

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_MAILER_SMTP_ENABLE` | `/mailer` | `true` | Enable SMTP mailer. |
| `APP_MAILER_SMTP_HOST` | `/mailer` | `zouari-rs-mailpit` | Mailpit service name (Override: For Docker). |
| `APP_MAILER_SMTP_PORT` | `/mailer` | `1025` | Mailpit port. |
| `APP_MAILER_SMTP_SECURE` | `/mailer` | `false` | Disable SMTP secure (for Mailpit). |

---

### /queue
Redis settings for background workers (database 0).

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_QUEUE_KIND` | `/queue` | `Redis` | Use Redis for the queue. |
| `APP_QUEUE_URI` | `/queue` | `redis://:loco-local-redis-pass@localhost:6379/0` | **(Fix)** Connection URI for Redis (DB 0). |
| `APP_QUEUE_DANGEROUSLY_FLUSH` | `/queue` | `false` | Disable flushing queue on start. |

---

### /server
Backend server and middleware settings.

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_SERVER_PORT` | `/server` | `5150` | Port for the backend server. |
| `APP_SERVER_BINDING` | `/server` | `0.0.0.0` | IP to bind (Override: For Docker). |
| `APP_SERVER_HOST` | `/server` | `http://localhost:3000` | Host for mailers (Override: For mailers). |
| `APP_SERVER_MIDDLEWARES_FALLBACK_ENABLE` | `/server` | `false` | **(Fix)** Disables fallback middleware. |
| `APP_SERVER_MIDDLEWARES_STATIC_ENABLE` | `/server` | `false` | **(Fix)** Disables static middleware. The Next.js app will serve static files. |
| `APP_SERVER_MIDDLEWARES_STATIC_MUST_EXIST` | `/server` | `true` | (N/A) Key must exist. |
| `APP_SERVER_MIDDLEWARES_STATIC_PRECOMPRESSED` | `/server` | `false` | (N/A) Key must exist. |
| `APP_SERVER_MIDDLEWARES_STATIC_FOLDER_URI` | `/server` | `/` | (N/A) Key must exist. |
| `APP_SERVER_MIDDLEWARES_STATIC_FOLDER_PATH` | `/server` | `frontend/dist` | (N/A) Key must exist. |
| `APP_SERVER_MIDDLEWARES_STATIC_FALLBACK` | `/server` | `frontend/dist/index.html` | (N/A) Key must exist. |

---

### /workers
Configuration for the background job processing system.

| Variable Name | Infisical Path | Value (Development) | Description |
| --- | --- | --- | --- |
| `APP_WORKERS_MODE` | `/workers` | `BackgroundQueue` | Sets worker mode to process jobs from the queue. |
