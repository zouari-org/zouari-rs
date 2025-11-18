import { describe, expect, it } from 'vitest';
import * as z from 'zod';
import { zForgotParams } from '../src/api-gen/zod.gen';

describe('Zod 4 Helpers', () => {
  it('z.email helper exists on the root import', () => {
    // This test proves our `import` assumption is correct
    expect(typeof z.email).toBe('function');
  });

  it('generated schema rejects invalid email', () => {
    // This test proves zForgotParams is using the new helper
    const result = zForgotParams.safeParse({ email: 'not-an-email' });
    expect(result.success).toBe(false);
  });
});
