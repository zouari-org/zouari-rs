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
| **Secrets** | **Infisical CLI (`infisical run`)** | Implements our "Zero Secret" pattern via CLI injection. |

## 🛠️ Prerequisites

All developers must have the following tools installed:
* Rust & Cargo
* `cargo-loco` CLI
* `sea-orm` CLI
* Node.js & pnpm
* Docker & Docker Compose
* `infisical` CLI (for secret management)

## 🏃 Local Development

This project uses **Infisical** to manage all environment variables. The `infisical run` command injects secrets directly into the running process.

1.  **Login to Infisical:**
    First, authenticate using Machine Identity Authentication to get a temporary token.
    ```bash
    export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=<identity-client-id> --client-secret=<identity-client-secret> --silent --plain)
    ```

2.  **Start Docker Services:**
    From the root directory, run the Docker Compose services (Postgres, Redis, etc.) with their secrets injected from the `/compose` path.
    ```bash
    infisical run --projectId=<project-id> --path="/compose" --domain [https://infisical.zouari.org](https://infisical.zouari.org) --command="docker compose up -d"
    ```

3.  **Run Backend (Hot-Reload):**
    In a new terminal, run the Rust backend. Infisical will inject the secrets from the `/backend` path.
    ```bash
    infisical run --projectId=<project-id> --path="/backend" --domain [https://infisical.zouari.org](https://infisical.zouari.org) --command="cd backend && cargo run watch"
    ```

4.  **Run Frontend (Hot-Reload):**
    In a third terminal, run the Next.js frontend. Infisical will inject the secrets from the `/frontend` path.
    ```bash
    infisical run --projectId=<project-id> --path="/frontend" --domain [https://infisical.zouari.org](https://infisical.zouari.org) --command="cd apps/web && pnpm run dev"
    ```
