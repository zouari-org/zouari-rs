/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrentResponse } from '../models/CurrentResponse';
import type { ForgotParams } from '../models/ForgotParams';
import type { LoginParams } from '../models/LoginParams';
import type { LoginResponse } from '../models/LoginResponse';
import type { MagicLinkParams } from '../models/MagicLinkParams';
import type { RegisterParams } from '../models/RegisterParams';
import type { ResendVerificationParams } from '../models/ResendVerificationParams';
import type { ResetParams } from '../models/ResetParams';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get the currently authenticated user
     * @returns CurrentResponse Current user data
     * @throws ApiError
     */
    public current(): CancelablePromise<CurrentResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/auth/current',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * In case the user forgot his password  this endpoints generate a forgot token
     * and send email to the user. In case the email not found in our DB, we are
     * returning a valid request for for security reasons (not exposing users DB
     * list).
     * @param requestBody
     * @returns any Forgot password email sent (if user exists)
     * @throws ApiError
     */
    public forgot(
        requestBody: ForgotParams,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/forgot',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Creates a user login and returns a token
     * @param requestBody
     * @returns LoginResponse Login successful
     * @throws ApiError
     */
    public login(
        requestBody: LoginParams,
    ): CancelablePromise<LoginResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
            },
        });
    }
    /**
     * Magic link authentication provides a secure and passwordless way to log in to the application.
     * # Flow
     * 1. **Request a Magic Link**:
     * A registered user sends a POST request to `/magic-link` with their email.
     * If the email exists, a short-lived, one-time-use token is generated and sent to the user's email.
     * For security and to avoid exposing whether an email exists, the response always returns 200, even if the email is invalid.
     *
     * 2. **Click the Magic Link**:
     * The user clicks the link (/magic-link/{token}), which validates the token and its expiration.
     * If valid, the server generates a JWT and responds with a [`LoginResponse`].
     * If invalid or expired, an unauthorized response is returned.
     *
     * This flow enhances security by avoiding traditional passwords and providing a seamless login experience.
     * @param requestBody
     * @returns any Magic link sent (if user exists and domain is valid)
     * @throws ApiError
     */
    public magicLink(
        requestBody: MagicLinkParams,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/magic-link',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid email domain`,
            },
        });
    }
    /**
     * Verifies a magic link token and authenticates the user.
     * @param token Magic link token
     * @returns LoginResponse Magic link login successful
     * @throws ApiError
     */
    public magicLinkVerify(
        token: string,
    ): CancelablePromise<LoginResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/auth/magic-link/{token}',
            path: {
                'token': token,
            },
            errors: {
                401: `Invalid or expired magic link`,
            },
        });
    }
    /**
     * Register function creates a new user with the given parameters and sends a
     * welcome email to the user
     * @param requestBody
     * @returns any User registered. Verification email sent.
     * @throws ApiError
     */
    public register(
        requestBody: RegisterParams,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Resend the verification email
     * @param requestBody
     * @returns any Verification email re-sent (if user exists and is not verified)
     * @throws ApiError
     */
    public resendVerificationEmail(
        requestBody: ResendVerificationParams,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/resend-verification-mail',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * reset user password by the given parameters
     * @param requestBody
     * @returns any Password has been reset successfully
     * @throws ApiError
     */
    public reset(
        requestBody: ResetParams,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/reset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid token or request`,
            },
        });
    }
    /**
     * Verify register user. if the user not verified his email, he can't login to
     * the system.
     * @param token Email verification token
     * @returns any Email verified successfully
     * @throws ApiError
     */
    public verify(
        token: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/auth/verify/{token}',
            path: {
                'token': token,
            },
            errors: {
                401: `Invalid or expired token`,
            },
        });
    }
}
