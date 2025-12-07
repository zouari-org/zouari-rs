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
2.  **Configuration Split:**
    * **Structural Config:** (Domains, Tags, CORS origins) are passed via Docker Compose Environment Variables.
    * **Secrets:** (DB Credentials, API Keys) are injected via the **Infisical CLI Wrapper**.
3.  **CI/CD:** Trunk-Based Development.
    * Merge to `main` -> Deploys to Staging.
    * Tag `v*` -> Promotes Staging Image to Production.

## Consequences
* **Frontend SSR:** The Next.js server requires `NEXT_PUBLIC_API_URL` injected by Infisical to perform server-side requests, even if the client detects the domain automatically.
* **NextAuth:** `NEXTAUTH_URL` is automatically derived from the `DOMAIN_FRONTEND` compose variable to ensure it matches the Traefik router.
* **Backend:** Code is simplified (No internal CORS logic; handled by Traefik and verified via env vars).
