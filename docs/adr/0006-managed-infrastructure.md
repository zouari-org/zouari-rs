# 0006: Managed Infrastructure Strategy

## Context
We need to deploy persistent infrastructure services (PostgreSQL and Redis) for our Staging and Production environments. We considered two options:
  1. **Embedded in Stack:** Defining db and redis services directly inside docker-compose.prod.yml.
  2. **Managed Services:** Creating standalone Database resources in Coolify and connecting to them externally.

## Decision
We will use Coolify Managed Services for all persistent data stores.
  * **Decoupling:** The application lifecycle (frequent deployments) is decoupled from the database lifecycle (rare restarts).
  * **Safety:** Prevents accidental data loss during stack redeployments or docker compose down commands.
  * **Maintenance:** Simplifies backups, scaling, and monitoring using Coolify's built-in tools for databases.
  * **Security:** Databases run in their own containers on internal networks, exposed only to the application via internal DNS, not to the public internet.

## Consequences
  * **Manual Setup:** We must manually create the Postgres and Redis resources in Coolify once per environment before deploying the application stack.
  * **Secret Management:** We must manually copy the internal connection strings from Coolify's database dashboard into Infisical (DATABASE_URL, REDIS_URL) after creating the resources.
  * **Simplified Compose:** The docker-compose.prod.yml file remains stateless, containing only the Backend and Frontend services.
