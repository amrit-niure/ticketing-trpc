import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
/**
 * Get all projects with statistics
 */
export declare const getAllProjects: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get project by id with related tickets
 */
export declare const getProjectById: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Create new project
 */
export declare const createProject: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Update project
 */
export declare const updateProject: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Delete project
 */
export declare const deleteProject: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get project statistics
 */
export declare const getProjectStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=projectController.d.ts.map