import { frontendSchema } from '@zouari-rs/validation';
import type { NextConfig } from 'next';
import { z } from 'zod';

/**
 * Extend the shared schema with app-specific server-only variables.
 * These are NOT prefixed with NEXT_PUBLIC_ and are only available server-side.
 */
const webServerSchema = frontendSchema.extend({
  // Example for NextAuth.js or other server-side auth
  AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
  // Add other server-only secrets here
});

/**
 * -----------------------------------------------------------------
 * !! AUTOMATIC ENV VALIDATION & ERROR HANDLING !!
 * -----------------------------------------------------------------
 * We parse the environment here to fail fast on build/dev.
 * The try/catch block provides a cleaner error message.
 */
try {
  webServerSchema.parse(process.env);
} catch (err) {
  console.error('❌ Invalid environment configuration for apps/web');
  if (err instanceof z.ZodError) {
    // This prints a readable error tree directly
    console.error(z.treeifyError(err));
  } else {
    // Log any other unexpected errors
    console.error(err);
  }
  process.exit(1); // Fail the process
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  transpilePackages: ['@zouari-rs/api-client', '@zouari-rs/validation'],
  /* your next.js config options here */
};

export default nextConfig;
