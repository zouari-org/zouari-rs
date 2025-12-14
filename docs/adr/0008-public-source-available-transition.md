# 8. Transition to Public Source-Available Repository and Secure CI/CD

Date: 2025-12-14

## Status

Accepted

## Context

The ZOUARI platform was historically maintained as a private internal repository.
As the platform matures, we are transitioning the repository to **public visibility** to:

- Increase transparency for clients and partners
- Enable external security and architectural review
- Serve as an engineering and hiring signal for an independent, founder-led company

This transition introduces two non-trivial risks that must be addressed explicitly.

### Identified Risks

1. **Commercial Risk**  
   Using a permissive open-source license (e.g., MIT or Apache 2.0) would allow third parties to clone, host, and resell the ZOUARI platform as a competing service, undermining the company’s core IP and client trust.

2. **Infrastructure Security Risk**  
   The platform uses **self-hosted GitHub Actions runners** for deployment and infrastructure operations. In a public repository, improperly scoped workflows could allow malicious pull requests to execute arbitrary code on internal infrastructure.

## Decision

We adopt a **Source-Available licensing model** combined with a **strictly separated CI/CD pipeline** to enable transparency while preserving security and commercial control.

### 1. Licensing Strategy: Business Source License (BSL) 1.1

The platform is licensed under the **Business Source License 1.1 (BSL 1.1)**.

- **Permitted:**  
  Code inspection, learning, local development, and non-production evaluation.

- **Prohibited:**  
  Production use, SaaS hosting, commercial redistribution, or operation of competing platforms without explicit written permission from the licensor.

The license has **no Change Date** and does not automatically convert to an open-source license. This reflects the platform’s role as long-term company infrastructure.

### 2. CI/CD Strategy: “Untrusted CI, Trusted CD”

We explicitly separate verification from deployment to isolate internal infrastructure from untrusted input.

#### Public CI (Verification)

- **Triggers:** `push`, `pull_request`
- **Runners:** GitHub-hosted (`ubuntu-latest`)
- **Scope:**  
  Linting, unit tests, and build validation
- **Security Constraints:**  
  No access to production secrets, credentials, or internal networks

This allows contributors and external reviewers to validate changes safely.

#### Private CD (Deployment)

- **Triggers:** `push` to the `main` branch only, or `workflow_dispatch`
- **Runners:** Self-hosted (internal infrastructure)
- **Scope:**  
  Docker image builds, secret injection via Infisical, and deployment orchestration (Coolify)
- **Security Controls:**  
  Branch protection rules ensure that only reviewed and authorized code can reach `main`, preventing untrusted code execution on internal systems.

## Consequences

- **Transparency:**  
  The codebase is publicly visible, improving client trust and technical due diligence.

- **IP Protection:**  
  The BSL license prevents unauthorized commercial use and SaaS cloning.

- **Safe External Interaction:**  
  External contributors can submit pull requests and observe CI results without exposing internal infrastructure.

- **Deliberate Deployment Controls:**  
  Deployment is intentionally restricted to the `main` branch, eliminating ad-hoc or feature-branch deployments on self-hosted runners.

This decision establishes a clear and enforceable boundary between public visibility and private operational control.
