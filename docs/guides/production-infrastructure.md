# Production Infrastructure Setup Guide
This guide details how to set up the persistent infrastructure (Postgres & Redis) in Coolify for Staging and Production environments.

## Prerequisite
Ensure you have access to:
  1. Coolify Dashboard (Admin access)
  2. Infisical Dashboard (Project access)

## Part 1: Staging Environment Setup
### 1. Create PostgreSQL Database
  1. In Coolify, navigate to your Project -> **New Resource**.
  2. Select **PostgreSQL**.
  3. **Name:** zouari-db-staging
  4. **Configuration:**
    * Expose Port: No (Keep unexposed for security).
    * Public Port: (Leave empty).
  5. **Start** the database.
  6. **Copy Connection String:**
    * Look for the **Internal Connection String** (e.g., postgresql://postgres:password@uuid:5432/postgres).
    * Note: *Do not use the Public connection string.*

### 2. Create Redis Service
  1. In Coolify, navigate to your Project -> **New Resource.**
  2. Select **Redis**.
  3. **Name:** zouari-redis-staging
  4. **Configuration:**
    * Expose Port: No.
  5. **Start** the service.
  6. **Copy Connection String:**
    * Look for the **Internal Connection String** (e.g., redis://:password@uuid:6379).

### 3. Update Infisical Secrets
  1. Go to Infisical -> **Staging Environment** -> /backend.
  2. Update DATABASE_URL with the Postgres Internal Connection String.
  3. Update REDIS_URL with the Redis Internal Connection String.

## Part 2: Production Environment Setup
Repeat the steps above but use the Production names and environment.
  1. **PostgreSQL Name:** zouari-db-prod
  2. **Redis Name:** zouari-redis-prod
  3. **Infisical Target:** Production Environment -> /backend.

## Part 3: Verify Connectivity
Once the Application Stack is deployed (via CI/CD), you can verify connectivity:
  1. Go to the **Backend Service** logs in Coolify.
  2. Look for "Database connection established" or "Running migrations".
  3. If it fails, double-check that the DATABASE_URL in Infisical matches the Internal string in Coolify.
