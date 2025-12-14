# Production Infrastructure Setup Guide

This document describes how to provision and configure the **persistent infrastructure**
(PostgreSQL and Redis) for the ZOUARI platform using **Coolify** and **Infisical** across
Staging and Production environments.

---

> ⚠️ **Security Warning**
>
> This repository is **public**.
>
> **NEVER** enable `pull_request` triggers for workflows running on `self-hosted` runners.
> Deployment workflows must strictly listen to:
>
> ```yaml
> push:
>   branches: ["main"]
> ```
>
> This prevents unauthorized code execution on internal infrastructure.
>  
> See [ADR-0008](../adr/0008-public-source-available-transition.md) for the full security and licensing rationale.

---

## Prerequisites

Before proceeding, ensure you have access to:

1. **Coolify Dashboard**
   - Admin or project-level access
2. **Infisical Dashboard**
   - Access to the relevant project and environments (Staging / Production)

---

## Part 1: Staging Environment Setup

### 1. Create PostgreSQL Database (Staging)

1. In the Coolify dashboard, navigate to your project and select **New Resource**.
2. Choose **PostgreSQL**.
3. Configure the service:
   - **Name:** `zouari-db-staging`
   - **Expose Port:** No
   - **Public Port:** Leave empty
4. Start the database service.
5. Copy the **Internal Connection String**:
   - Example:
     ```
     postgresql://postgres:password@uuid:5432/postgres
     ```
   - Do **not** use the public connection string.

---

### 2. Create Redis Service (Staging)

1. In Coolify, select **New Resource**.
2. Choose **Redis**.
3. Configure the service:
   - **Name:** `zouari-redis-staging`
   - **Expose Port:** No
4. Start the Redis service.
5. Copy the **Internal Connection String**:
   - Example:
     ```
     redis://:password@uuid:6379
     ```

---

### 3. Configure Infisical Secrets (Staging)

1. Open Infisical and navigate to:
   - **Environment:** Staging
   - **Path:** `/backend`
2. Update the following secrets:
   - `DATABASE_URL` → PostgreSQL internal connection string
   - `REDIS_URL` → Redis internal connection string

Secrets are injected at runtime via the Infisical CLI and must never be committed to the repository.

---

## Part 2: Production Environment Setup

Repeat the same steps as for Staging, using Production-specific identifiers.

- **PostgreSQL Name:** `zouari-db-prod`
- **Redis Name:** `zouari-redis-prod`
- **Infisical Target:**  
  - Environment: Production  
  - Path: `/backend`

Ensure that Production secrets are isolated from Staging and correctly scoped.

---

## Part 3: Connectivity Verification

After the application stack is deployed via CI/CD:

1. Open the **Backend Service** logs in Coolify.
2. Confirm successful startup messages such as:
   - “Database connection established”
   - “Running migrations”
3. If the application fails to connect:
   - Verify that `DATABASE_URL` and `REDIS_URL` in Infisical match the **internal** connection strings from Coolify
   - Confirm that the services are running and not exposed publicly

---

## Notes

- All persistent services must remain **internal-only**
- Secrets must be injected at runtime and never stored in images or configuration files
- Deployment is intentionally gated behind the `main` branch for security reasons
