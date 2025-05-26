import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import multer from 'multer';
export declare const upload: multer.Multer;
/**
 * Get all tickets with filtering options
 */
export declare const getAllTickets: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get ticket by ID
 */
export declare const getTicketById: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Create new ticket
 */
export declare const createTicket: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Update ticket
 */
export declare const updateTicket: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Delete ticket
 */
export declare const deleteTicket: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Add comment to ticket
 */
export declare const addComment: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Add attachment to ticket
 */
export declare const addAttachment: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Delete attachment
 */
export declare const deleteAttachment: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get ticket statistics
 */
export declare const getTicketStats: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get comments for a ticket
 */
export declare const getTicketComments: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get attachments for a ticket
 */
export declare const getTicketAttachments: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * Get activity logs for a ticket
 */
export declare const getTicketActivityLogs: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=ticketController.d.ts.map