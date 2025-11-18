import { z } from 'zod';

/**
 * Base schema for environment variables.
 * Ensures that all required environment variables are set and valid.
 *
 */
export const baseSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

/**
 * Schema for Next.js / Frontend public environment variables.
 * This validates *public* variables prefixed with `NEXT_PUBLIC_`.
 *
 * These are injected from Infisical's '/frontend' path.
 *
 */
export const frontendSchema = baseSchema.extend({
  NEXT_PUBLIC_API_URL: z.url('NEXT_PUBLIC_API_URL must be a valid URL'),
  // Add other public (NEXT_PUBLIC_...) variables here
});

export type BaseEnv = z.infer<typeof baseSchema>;
export type FrontendEnv = z.infer<typeof frontendSchema>;
