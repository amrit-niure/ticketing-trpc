import type { LoginInput, RegisterInput, AuthOutput, UserOutput, RefreshTokenOutput } from "./auth.schemas";
/**
 * Authenticate user with email and password
 */
export declare const loginUser: (input: LoginInput) => Promise<AuthOutput>;
/**
 * Register a new user
 */
export declare const registerUser: (input: RegisterInput) => Promise<AuthOutput>;
/**
 * Get current user information
 */
export declare const getCurrentUser: (userId: string) => Promise<UserOutput>;
/**
 * Refresh user token
 */
export declare const refreshUserToken: (userId: string) => Promise<RefreshTokenOutput>;
/**
 * Validate user token and get user info
 */
export declare const validateUserToken: (userId: string) => Promise<UserOutput>;
//# sourceMappingURL=auth.services.d.ts.map