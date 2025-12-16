# ZOUARI Platform (v3)

[![License: BSL 1.1](https://img.shields.io/badge/License-BSL%201.1-red.svg)](LICENSE)
[![CI](https://github.com/zouari-org/zouari-rs/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/zouari-org/zouari-rs/actions/workflows/ci.yaml)
[![Code Style: Biome](https://img.shields.io/badge/code_style-biome-364132.svg)](https://github.com/biomejs/biome)
![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=flat&logo=rust&logoColor=white)
![Next.js](https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white)
![Turborepo](https://img.shields.io/badge/turborepo-%23EF2D5E.svg?style=flat&logo=turborepo&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)

## Overview

This repository contains the v3 **ZOUARI Platform** — an independent, security-first digital platform designed for production reliability, transparency, and developer velocity.

The codebase is public by design to support:
- Client transparency and technical due diligence
- Security auditing and architecture review
- Hiring and engineering signal

**This repository is source-available. It is not open source.**  
Production use, hosting, and commercial deployment are restricted by license..

---

## Architecture

### Core Characteristics

- **Polyglot Monorepo** optimized for long-term maintainability
- **Security-first** runtime and deployment model
- **Clear separation of concerns** across frontend, backend, and infrastructure
- **Zero-secret philosophy** across development and production

### Core Technologies

- **Monorepo:** Turborepo  
- **Backend:** Rust + `loco-rs`  
- **Frontend:** Next.js (App Router) + Mantine  
- **API:** REST + OpenAPI with generated clients  
- **Secrets:** Infisical CLI with runtime injection only

---

## Repository Structure

```
/
├─ apps/       # Frontend applications
├─ backend/    # Rust backend services
├─ packages/   # Shared internal libraries
├─ infra/      # Docker, CI/CD, and infrastructure
└─ docs/       # Architecture and operational docs

```

---

## Local Development

### Development Model

ZOUARI uses a **Zero Secret Development** model.  
All services are started using `infisical run`, which injects secrets at runtime only.

### 1. Authenticate and Start Infrastructure

Authenticate with Infisical:

```bash
export INFISICAL_TOKEN=$(
  infisical login \
    --method=universal-auth \
    --client-id=<identity-client-id> \
    --client-secret=<identity-client-secret> \
    --silent \
    --plain
)
```

Start infrastructure services (Postgres, Redis, etc.):

```bash
infisical run \
  --projectId=<project-id> \
  --path="/compose" \
  --domain <infisical-base-url> \
  --command="docker compose up -d"
```

### 2. Start Application Services

Start services in separate terminals. Turborepo ensures all internal dependencies are built automatically.

**Backend (hot reload):**
Navigate to the backend directory and start the watcher.

```bash
cd backend

infisical run \
  --projectId=<project-id> \
  --path="/backend" \
  --domain <infisical-base-url> \
  --command="cargo watch -x check -s 'cargo run start'"
```

**Frontend (Next.js dev server):**
Navigate to the web app directory and start the development server.

```bash
cd apps/web

infisical run \
  --projectId=<project-id> \
  --path="/frontend" \
  --domain <infisical-base-url> \
  --command="pnpm run dev"
```

---

## Access Points

* **Web Application:** [http://localhost:3000](http://localhost:3000)
* **Backend API:** [http://localhost:5150](http://localhost:5150)

---

## License

Licensed under the **Business Source License 1.1 (BSL 1.1)**.

* **Type:** Source Available (Not Open Source)

* **Allowed:** Code inspection, learning, internal evaluation, non-production use

* **Prohibited:** Production use, SaaS hosting, or competing platforms without permission

See the [LICENSE](LICENSE) file for full terms.

---

## About ZOUARI

ZOUARI is an independent, founder-led digital engineering company building and operating secure platforms while working directly with clients.

The platform source is public for transparency and trust.
Operational and commercial use remains licensed and controlled.
