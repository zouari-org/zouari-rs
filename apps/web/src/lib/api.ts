import { Client } from '@zouari-rs/api-client';

/**
 * Determines the API Base URL dynamically.
 * * We cannot simply rely on `process.env.NEXT_PUBLIC_API_URL` because:
 * 1. On the Client, it is "baked in" at build time (and we build only once for Staging/Prod).
 * 2. On the Server, it IS injected at runtime by Infisical (so we should trust it there).
 */
const getBaseUrl = (): string => {
  // --- CASE 1: Server-Side (SSR/SSG) ---
  // We are running inside the Docker container.
  // The Infisical CLI Wrapper has injected the REAL secrets into process.env.
  if (typeof window === 'undefined') {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;

    // Safety: If it's the build-time placeholder, fallback to localhost to prevent crash
    if (envUrl === 'http://api-fallback.localhost' || envUrl === '/api-fallback') {
      return 'http://localhost:5150';
    }

    return envUrl || 'http://localhost:5150';
  }

  // --- CASE 2: Client-Side (Browser) ---
  // We are running in the user's browser. We cannot see Docker env vars.
  // We deduce the API URL from the current domain.
  const hostname = window.location.hostname;

  // Production
  if (hostname === 'zouari.org') {
    return 'https://api.zouari.org';
  }

  // Staging
  if (hostname === 'staging.zouari.org') {
    return 'https://api.staging.zouari.org';
  }

  // Local Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Try the env var first (dev mode), otherwise default
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    // UPDATED: Check for the new placeholder
    const isPlaceholder = envUrl === '/api-fallback' || envUrl === 'http://api-fallback.localhost';
    return envUrl && !isPlaceholder ? envUrl : 'http://localhost:5150';
  }

  // Fallback for Preview Deployments (e.g., Vercel/Coolify generated URLs)
  // If we can't guess, we try to rely on the baked-in var, or default.
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl === 'http://api-fallback.localhost' || envUrl === '/api-fallback') {
    return 'http://localhost:5150';
  }

  return envUrl || 'http://localhost:5150';
};

// --- Execution ---
const baseUrl = getBaseUrl();

// --- Validation (The "Fail-Fast" Logic) ---
// We only log critical errors instead of throwing, because throwing at the
// top level can crash the build process itself if variables aren't ready yet.
if (!baseUrl || baseUrl === 'http://api-fallback.localhost') {
  console.warn(
    '⚠️ API Client Warning: Could not determine a valid API Base URL. Defaulting to localhost.'
  );
}

export const api = new Client({
  BASE: baseUrl,
});
