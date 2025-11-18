import { Client } from '@zouari-rs/api-client';

// 1. Fetch the URL from the environment (injected by Infisical or .env)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 2. Hard validation: Fail loudly if missing.
// This protects you from deploying a broken app that defaults to localhost.
if (!API_BASE_URL) {
  throw new Error(
    '🚨 NEXT_PUBLIC_API_URL is not defined. You must configure this via Infisical or your environment variables.'
  );
}

// 3. Export the singleton client instance
export const api = new Client({
  BASE: API_BASE_URL,
});
