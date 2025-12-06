# 0005: Zero-Trust Deployment Strategy

## Context
We need a secure way to deploy ZOUARI to self-hosted Coolify.
1.  **Zero Trust:** Secrets exist only in RAM (injected by Infisical).
2.  **Consistency:** The exact same Docker image runs in Staging and Production.
3.  **Security:** CORS and Headers are enforced at the Edge (Traefik).

## Decision
1.  **Architecture:** We use **Traefik** as the reverse proxy.
    * `zouari.org` -> Frontend
    * `api.zouari.org` -> Backend
2.  **Secret Management:** We use the **Infisical CLI Wrapper** pattern.
3.  **CI/CD:** Trunk-Based Development.
    * Merge to `main` -> Deploys to Staging.
    * Tag `v*` -> Promotes Staging Image to Production.

## Consequences
* Frontend must dynamically detect the API URL at runtime (Smart Client).
* Backend code is simplified (No CORS logic).
