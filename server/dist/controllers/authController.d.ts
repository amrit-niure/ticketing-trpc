import { Request, Response } from 'express';
/**
 * Login a user
 */
export declare const login: (req: Request, res: Response) => Promise<void>;
/**
 * Register a new user
 */
export declare const register: (req: Request, res: Response) => Promise<void>;
/**
 * Validate user's token and return user information
 */
export declare const validateToken: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map