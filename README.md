# ZOUARI-RS Enterprise Stack

This repository contains the "v3" enterprise stack for ZOUARI applications. It is a modern, high-performance, and secure stack built on Rust.

The primary goal is to leverage the performance and reliability of Rust while maintaining high developer velocity, similar to a "batteries-included" framework.

## 🥞 Core Stack

This is a polyglot monorepo managed by `pnpm`, `Turborepo`, and `Cargo`.

| Component | v3 Implementation | Rationale |
| :--- | :--- | :--- |
| **Monorepo** | pnpm + Turborepo + Cargo | Turborepo orchestrates both TS and Rust workspaces. |
| **Frontend** | Next.js + Mantine | Mantine provides a rich, pre-built component library. |
| **Backend** | `loco-rs` (CoC Framework) | Provides Rails-like "magic" and developer velocity. |
| **Web Server**| Axum | `loco-rs` uses Axum, giving us top-tier performance. |
| **ORM** | SeaORM (Active Record) | `loco-rs` is built on SeaORM. |
| **Job Queue** | Sidekiq-rs | First-class integration with `loco-rs`. |
| **Auth** | `loco-rs` Auth | Generators scaffold all auth routes, logic, and models. |
| **API** | REST + OpenAPI | Formal contract for a strong-typed frontend client. |
| **Secrets** | `infisical-sdk-rust` | Implements our "Secret Zero" pattern. |

## 🛠️ Prerequisites

All developers must have the following tools installed:
* Rust & Cargo
* `cargo-loco` CLI
* `sea-orm` CLI
* Node.js & pnpm
* Docker & Docker Compose

## 🏃 Local Development

1.  **Start Services:** Run the local database and Redis:
    ```bash
    cd backend
    docker-compose up -d
    cd .. 
    ```
2.  **Inject Secrets:** Export your "Secret Zero" variables from Infisical for the `dev` environment.
    ```bash
    export INFISICAL_CLIENT_ID=...
    export INFISICAL_CLIENT_SECRET=...
    export INFISICAL_PROJECT_ID=...
    export INFISICAL_ENVIRONMENT=dev
    ```
3.  **Run Migrations:**
    ```bash
    cd backend
    cargo loco db migrate
    cd ..
    ```
4.  **Run Backend (Hot-Reload):**
    ```bash
    cd backend
    cargo loco start
    # Backend running on http://localhost:5150
    cd ..
    ```
5.  **Run Frontend (Hot-Reload):**
    ```bash
    # From monorepo root
    pnpm --filter "web" dev
    # Frontend running on http://localhost:3000
    ```
