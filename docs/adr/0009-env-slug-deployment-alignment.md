# ADR 0009: Environment Slug Alignment for Deployments

## Status

**Accepted**

---

## Context

The previous deployment architecture relied on dynamic GitHub reference names (for example, `v3.2.2` or `main`) to trigger deployment webhooks and select Docker image tags. This introduced multiple sources of inconsistency across the delivery pipeline:

1. **Tag Mismatch**
   Docker Compose used `${TAG:-main}` (or `${TAG:-production}`), while deployment webhooks passed versioned tags such as `v3.2.2`.

2. **Implicit Orchestrator Coupling**
   Correct behavior depended on Coolify reliably injecting the `TAG` environment variable. Any deviation caused services to pull incorrect or non-existent images.

3. **Naming Inconsistency Across Systems**
   Infisical environments already used `prod` and `staging`, while CI/CD and Docker tags used `production`, `main`, or version identifiers.

This mismatch reduced determinism, increased operational risk, and complicated rollbacks.

---

## Decision

We adopt a unified **Environment Slug** model (`prod`, `staging`) across CI/CD, Docker image tagging, and Coolify deployment triggers.

### 1. Unified Slug Evaluation

A single deployment slug is evaluated once per GitHub Actions job:

* **`prod`**
  Triggered by annotated version tags (`refs/tags/v*`)
* **`staging`**
  Triggered by pushes to the `main` branch

This slug is treated as the authoritative environment identifier for the entire job.

---

### 2. Docker Registry Strategy

Each build publishes **two complementary tag types** to GHCR:

* **Immutable Tags**

  * Version tags (e.g., `v3.2.2`)
  * Git SHA tags (for auditability and forensic debugging)

* **Environment Tags**

  * `prod` or `staging`
  * These act as stable, moving pointers for environment deployments

Immutable tags preserve traceability; environment tags provide operational stability.

---

### 3. Webhook Alignment

Coolify deployment webhooks are triggered using **environment slugs**, not version numbers:

* **Production:** `...?tag=prod`
* **Staging:** `...?tag=staging`

Coolify services are configured to pull the corresponding environment tag.

---

### 4. Compose Fallback Strategy

Docker Compose files default to the environment slug if `TAG` is not explicitly injected:

```yaml
image: ghcr.io/zouari-org/zouari-rs-backend:${TAG:-prod}
```

This guarantees correct image selection even if runtime environment injection fails.

---

## Consequences

### Positive

* **Deterministic Deployments**
  Environment deployments always resolve to a valid image.

* **Reduced Coupling**
  Correct operation no longer depends on orchestrator-specific variable injection.

* **Operational Simplicity**
  Coolify configuration remains stable across releases.

* **Naming Symmetry**
  Infisical, Docker, CI/CD, and Coolify now share the same environment vocabulary.

---

### Negative

* **Initial Registry Seeding Required**
  A full pipeline execution is required to populate the initial `:prod` and `:staging` tags before the updated Compose configuration is activated.

---

## Alternatives Considered

* **Deploying version tags directly (`vX.Y.Z`)**
  Rejected due to higher coupling with orchestrator behavior and increased deployment fragility.

* **Branch-based tagging only (`main`, `release/*`)**
  Rejected due to poor semantic alignment with secrets and runtime environments.

---

## References

* [ADR 0001](./0001-use-infisical-for-secret-management.md): Use Infisical for Secret Management
* [ADR 0005](./0005-deployment-strategy.md): Deployment Strategy
* `[.github/workflows/deploy.yml](../../.github/workflows/deploy.yml)`
* `[infra/docker/docker-compose.prod.yml](../../infra/docker/docker-compose.prod.yml)`
