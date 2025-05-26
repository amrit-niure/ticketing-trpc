import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
/**
 * Get all users (for assignee dropdown)
 */
export declare const getAllUsers: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get user profile
 */
export declare const getUserProfile: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map