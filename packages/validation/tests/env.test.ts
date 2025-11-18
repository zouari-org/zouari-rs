import { describe, expect, it } from 'vitest';
import { baseSchema, frontendSchema } from '../src/env';

describe('baseSchema', () => {
  it('should parse valid development environment variables', () => {
    const env = { NODE_ENV: 'development' };
    const result = baseSchema.safeParse(env);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe('development');
    }
  });

  it('should default NODE_ENV to development if not provided', () => {
    const env = {};
    const result = baseSchema.safeParse(env);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe('development');
    }
  });

  it('should fail if NODE_ENV is invalid', () => {
    const env = { NODE_ENV: 'staging' }; // 'staging' is not in the enum
    const result = baseSchema.safeParse(env);
    expect(result.success).toBe(false);
  });
});

describe('frontendSchema', () => {
  it('should parse valid frontend environment variables', () => {
    const env = {
      NODE_ENV: 'development',
      NEXT_PUBLIC_API_URL: 'http://localhost:5150',
    };
    const result = frontendSchema.safeParse(env);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_API_URL).toBe(
        'http://localhost:5150',
      );
    }
  });

  it('should fail if NEXT_PUBLIC_API_URL is missing', () => {
    const env = { NODE_ENV: 'development' };
    const result = frontendSchema.safeParse(env);
    expect(result.success).toBe(false);
  });

  it('should fail if NEXT_PUBLIC_API_URL is not a valid URL', () => {
    const env = {
      NODE_ENV: 'development',
      NEXT_PUBLIC_API_URL: 'not-a-real-url',
    };
    const result = frontendSchema.safeParse(env);
    expect(result.success).toBe(false);
  });

  it('should still default NODE_ENV to development', () => {
    const env = { NEXT_PUBLIC_API_URL: 'http://localhost:5150' };
    const result = frontendSchema.safeParse(env);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe('development');
    }
  });
});
