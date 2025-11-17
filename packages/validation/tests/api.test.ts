import { describe, expect, it } from 'vitest';

import {
  zCurrentData,
  zCurrentResponse,
  zCurrentResponse2,
  zForgotData,
  zForgotParams,
  zLoginData,
  zLoginParams,
  zLoginResponse,
  zLoginResponse2,
  zMagicLinkData,
  zMagicLinkParams,
  zMagicLinkVerifyData,
  zMagicLinkVerifyResponse,
  zRegisterData,
  zRegisterParams,
  zResendVerificationEmailData,
  zResendVerificationParams,
  zResetData,
  zResetParams,
  zVerifyData,
} from '../src/api-gen/zod.gen';

describe('API Generated Schemas', () => {
  //
  // Core response schemas
  //
  describe('zCurrentResponse', () => {
    it('accepts a valid current response', () => {
      const result = zCurrentResponse.safeParse({
        email: 'user@example.com',
        name: 'John Doe',
        pid: 'uuid-string',
      });
      expect(result.success).toBe(true);
    });

    it('rejects when a required field is missing', () => {
      const result = zCurrentResponse.safeParse({
        email: 'user@example.com',
        pid: 'uuid-string',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zLoginResponse', () => {
    it('accepts a valid login response', () => {
      const result = zLoginResponse.safeParse({
        is_verified: true,
        name: 'John Doe',
        pid: 'uuid-string',
        token: 'jwt-token',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid types in login response', () => {
      const result = zLoginResponse.safeParse({
        is_verified: 'yes', // wrong type
        name: 'John Doe',
        pid: 'uuid-string',
        token: 'jwt-token',
      });
      expect(result.success).toBe(false);
    });
  });

  //
  // Params schemas
  //
  describe('zForgotParams', () => {
    it('accepts a valid email', () => {
      const result = zForgotParams.safeParse({ email: 'user@example.com' });
      expect(result.success).toBe(true);
    });

    it('rejects an invalid email', () => {
      const result = zForgotParams.safeParse({ email: 'not-an-email' });
      expect(result.success).toBe(false);
    });
  });

  describe('zLoginParams', () => {
    it('accepts a valid login payload', () => {
      const result = zLoginParams.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects an invalid email', () => {
      const result = zLoginParams.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects missing password', () => {
      const result = zLoginParams.safeParse({
        email: 'user@example.com',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zMagicLinkParams', () => {
    it('accepts a valid magic link payload', () => {
      const result = zMagicLinkParams.safeParse({
        email: 'user@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email for magic link', () => {
      const result = zMagicLinkParams.safeParse({
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zRegisterParams', () => {
    it('accepts a valid register payload', () => {
      const result = zRegisterParams.safeParse({
        email: 'user@example.com',
        name: 'Jo', // min length 2
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = zRegisterParams.safeParse({
        email: 'not-an-email',
        name: 'Jo',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects too-short name', () => {
      const result = zRegisterParams.safeParse({
        email: 'user@example.com',
        name: 'J', // too short
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects missing password', () => {
      const result = zRegisterParams.safeParse({
        email: 'user@example.com',
        name: 'John',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zResendVerificationParams', () => {
    it('accepts a valid email', () => {
      const result = zResendVerificationParams.safeParse({
        email: 'user@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = zResendVerificationParams.safeParse({
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zResetParams', () => {
    it('accepts a valid reset payload', () => {
      const result = zResetParams.safeParse({
        token: 'reset-token',
        password: 'new-password',
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing token', () => {
      const result = zResetParams.safeParse({
        password: 'new-password',
      });
      expect(result.success).toBe(false);
    });

    it('rejects missing password', () => {
      const result = zResetParams.safeParse({
        token: 'reset-token',
      });
      expect(result.success).toBe(false);
    });
  });

  //
  // Data wrapper schemas
  //
  describe('zCurrentData', () => {
    it('accepts an empty object (no body/path/query allowed)', () => {
      const result = zCurrentData.safeParse({});
      expect(result.success).toBe(true);
    });

    it('rejects any body/path/query since they are never', () => {
      const result = zCurrentData.safeParse({
        body: {},
        path: {},
        query: {},
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zForgotData', () => {
    it('accepts a valid forgot body', () => {
      const result = zForgotData.safeParse({
        body: { email: 'user@example.com' },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing body', () => {
      const result = zForgotData.safeParse({});
      expect(result.success).toBe(false);
    });

    it('rejects invalid email in body', () => {
      const result = zForgotData.safeParse({
        body: { email: 'invalid' },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zLoginData', () => {
    it('accepts a valid login body', () => {
      const result = zLoginData.safeParse({
        body: {
          email: 'user@example.com',
          password: 'password123',
        },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing body', () => {
      const result = zLoginData.safeParse({});
      expect(result.success).toBe(false);
    });

    it('rejects invalid login body', () => {
      const result = zLoginData.safeParse({
        body: {
          email: 'not-an-email',
          password: 'password123',
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zMagicLinkData', () => {
    it('accepts a valid magic link body', () => {
      const result = zMagicLinkData.safeParse({
        body: { email: 'user@example.com' },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing body', () => {
      const result = zMagicLinkData.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('zMagicLinkVerifyData', () => {
    it('accepts a valid token in path', () => {
      const result = zMagicLinkVerifyData.safeParse({
        path: { token: 'magic-token' },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing path', () => {
      const result = zMagicLinkVerifyData.safeParse({});
      expect(result.success).toBe(false);
    });

    it('rejects missing token in path', () => {
      const result = zMagicLinkVerifyData.safeParse({
        path: {},
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zRegisterData', () => {
    it('accepts a valid register body', () => {
      const result = zRegisterData.safeParse({
        body: {
          email: 'user@example.com',
          name: 'John',
          password: 'password123',
        },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing body', () => {
      const result = zRegisterData.safeParse({});
      expect(result.success).toBe(false);
    });

    it('rejects invalid name in body', () => {
      const result = zRegisterData.safeParse({
        body: {
          email: 'user@example.com',
          name: 'J', // too short
          password: 'password123',
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('zResendVerificationEmailData', () => {
    it('accepts a valid resend verification body', () => {
      const result = zResendVerificationEmailData.safeParse({
        body: {
          email: 'user@example.com',
        },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing body', () => {
      const result = zResendVerificationEmailData.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('zResetData', () => {
    it('accepts a valid reset body', () => {
      const result = zResetData.safeParse({
        body: {
          token: 'reset-token',
          password: 'new-password',
        },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing body', () => {
      const result = zResetData.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('zVerifyData', () => {
    it('accepts a valid verify token in path', () => {
      const result = zVerifyData.safeParse({
        path: {
          token: 'verify-token',
        },
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing path', () => {
      const result = zVerifyData.safeParse({});
      expect(result.success).toBe(false);
    });

    it('rejects missing token in path', () => {
      const result = zVerifyData.safeParse({
        path: {},
      });
      expect(result.success).toBe(false);
    });
  });

  //
  // Aliases equivalence checks
  //
  describe('Alias schemas', () => {
    it('zCurrentResponse2 behaves like zCurrentResponse', () => {
      const payload = {
        email: 'user@example.com',
        name: 'John Doe',
        pid: 'uuid-string',
      };
      const r1 = zCurrentResponse.safeParse(payload);
      const r2 = zCurrentResponse2.safeParse(payload);
      expect(r1.success).toBe(true);
      expect(r2.success).toBe(true);
    });

    it('zLoginResponse2 behaves like zLoginResponse', () => {
      const payload = {
        is_verified: true,
        name: 'John Doe',
        pid: 'uuid-string',
        token: 'jwt-token',
      };
      const r1 = zLoginResponse.safeParse(payload);
      const r2 = zLoginResponse2.safeParse(payload);
      expect(r1.success).toBe(true);
      expect(r2.success).toBe(true);
    });

    it('zMagicLinkVerifyResponse behaves like zLoginResponse', () => {
      const payload = {
        is_verified: true,
        name: 'John Doe',
        pid: 'uuid-string',
        token: 'jwt-token',
      };
      const r1 = zLoginResponse.safeParse(payload);
      const r2 = zMagicLinkVerifyResponse.safeParse(payload);
      expect(r1.success).toBe(true);
      expect(r2.success).toBe(true);
    });
  });
});
