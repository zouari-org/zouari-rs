import { describe, expect, it } from 'vitest';
import { envSchema } from '../src/env';

describe('envSchema', () => {
  it('should parse valid development environment variables', () => {
    const env = { NODE_ENV: 'development' };
    const result = envSchema.safeParse(env);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe('development');
    }
  });

  it('should default NODE_ENV to development if not provided', () => {
    const env = {};
    const result = envSchema.safeParse(env);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe('development');
    }
  });

  it('should fail if NODE_ENV is invalid', () => {
    const env = { NODE_ENV: 'staging' }; // 'staging' is not in the enum
    const result = envSchema.safeParse(env);
    expect(result.success).toBe(false);
  });
});
