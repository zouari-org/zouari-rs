## Project Overview

* **Introduction:** This repository hosts the v3 **ZOUARI Enterprise Stack**, engineered for high performance, security, and developer velocity. It is implemented as a polyglot monorepo leveraging the reliability of Rust for the core backend services.

---

## Architectural Overview

* **The Core Stack:** The stack is a modern polyglot monorepo orchestrated by **Turborepo** and Rust's **Cargo** to manage build dependencies and caching across the entire repository.

* **Key Component Decisions:**
    * **Monorepo Orchestration:** **Turborepo** - Provides unified command execution, caching, and explicit task dependency management.
    * **Frontend Framework:** **Next.js (App Router) + Mantine** - Offers a fast, server-capable web application with a comprehensive UI/form library.
    * **Backend Core:** **loco-rs (Rust CoC Framework)** - Delivers Rails-like developer velocity combined with the performance and security of Rust.
    * **API Contract:** **REST + OpenAPI** - Enforces a formal, type-safe contract, enabling auto-generation of the `@zouari-rs/api-client`.
    * **Secret Management:** **Infisical CLI (infisical run)** - Implements a **Zero Secret** pattern, injecting environment variables directly at runtime for enhanced security.

---

## Prerequisites

* **Required Tools for Local Development:** The following tools must be installed and available in your environment's PATH:
    * Rust & Cargo (Latest stable toolchain)
    * `cargo-loco` CLI
    * `sea-orm` CLI
    * Node.js (v20+) & **pnpm** (as the primary package manager)
    * Docker & Docker Compose (for infrastructure services)
    * `infisical` CLI (for secret management)

---

## Local Development Setup

* **Key Concept: Zero Secret Development**
    The development environment is initiated using the **infisical run** wrapper for secure, context-specific secret injection. Note that separate commands are required for services with different secret scopes.

### 1. Authenticate & Start Infrastructure

* **Step 1.1: Authenticate Session**
    Authenticate your session to retrieve the necessary token for secret injection.
    `export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=<identity-client-id> --client-secret=<identity-client-secret> --silent --plain)`

* **Step 1.2: Start Infrastructure**
    Start the infrastructure services (Postgres, Redis, etc.).
    `infisical run --projectId=<project-id> --path="/compose" --domain https://infisical.zouari.org --command="docker compose up -d"`

### 2. Start Application Services (Hot-Reload)

* In separate terminals, start the backend and frontend services. **Turborepo ensures all required internal packages are automatically built** before the applications launch, guaranteeing a smooth startup.

* **Step 2.1: Start Backend**
    (Injects backend secrets from `/backend` and runs `cargo run watch` for hot-reloading)
    `infisical run --projectId=<project-id> --path="/backend" --domain https://infisical.zouari.org --command="cd backend && cargo run watch"`

* **Step 2.2: Start Frontend**
    (Injects frontend secrets from `/frontend` and runs the Next.js dev server)
    `infisical run --projectId=<project-id> --path="/frontend" --domain https://infisical.zouari.org --command="cd apps/web && pnpm run dev"`

---

## Access Points

* **Web Application:** `http://localhost:3000` - Frontend is running with Fast Refresh/HMR enabled.
* **Backend API:** `http://localhost:5150/api` - Rust server is running with hot-reload.
