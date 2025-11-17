import { z } from 'zod';

/**
 * Manually-defined schemas for environment variables.
 * Ensures that all required environment variables are set and valid.
 */
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // e.g., DATABASE_URL: z.string().url(),
  // NEXT_PUBLIC_API_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
