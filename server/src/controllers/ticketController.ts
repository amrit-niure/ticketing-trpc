import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth';
import { createActivityLog } from '../utils/helpers';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only supported file types are allowed'));
        }
    }
});

/**
 * Get all tickets with filtering options
 */
export const getAllTickets = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { status, priority, assignedTo, projectId, search } = req.query;

        // Build filter conditions
        const where: any = {};

        if (status) where.status = status;
        if (priority) where.priority = priority;
        if (assignedTo) where.assigneeId = assignedTo as string;
        if (projectId) where.projectId = projectId as string;

        if (search) {
            where.OR = [
                { subject: { contains: search as string, mode: 'insensitive' } },
                { description: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        const tickets = await prisma.ticket.findMany({
            where, include: {
                project: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                requester: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get ticket by ID
 */
export const getTicketById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params; const ticket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                project: true,
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                requester: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'asc' }
                },
                attachments: true,
                activityLogs: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        res.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Create new ticket
 */
export const createTicket = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { subject, description, priority, status, projectId, assignedToId } = req.body;

        if (!subject || !projectId) {
            res.status(400).json({ error: 'Subject and project are required' });
            return;
        } const newTicket = await prisma.ticket.create({
            data: {
                subject,
                description: description || '',
                status: status || 'OPEN',
                priority: priority || 'MEDIUM',
                projectId,
                assigneeId: assignedToId || null,
                requesterId: req.user!.id
            },
            include: {
                project: true,
                assignee: true,
                requester: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });        // Create activity logs
        const activityPromises: Promise<any>[] = [];

        // Always log ticket creation
        activityPromises.push(createActivityLog(
            newTicket.id,
            req.user!.id,
            'CREATED',
            `Ticket created by ${req.user!.email}`
        ));

        // If ticket is created with an assignee, log assignment activity
        if (assignedToId && newTicket.assignee) {
            activityPromises.push(createActivityLog(
                newTicket.id,
                req.user!.id,
                'ASSIGNED',
                `Assigned to ${newTicket.assignee.name}`
            ));
        }

        // Execute all activity logs
        await Promise.all(activityPromises);

        res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update ticket
 */
export const updateTicket = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { subject, description, status, priority, assignedToId } = req.body;

        // Get the existing ticket
        const existingTicket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                assignee: true
            }
        });

        if (!existingTicket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }        // Track changes for activity log
        const activityPromises: Promise<any>[] = [];

        // Check for status change
        if (status && status !== existingTicket.status) {
            activityPromises.push(createActivityLog(
                id,
                req.user!.id,
                'STATUS_CHANGED',
                `Status changed from ${existingTicket.status} to ${status}`
            ));
        }

        // Check for priority change
        if (priority && priority !== existingTicket.priority) {
            activityPromises.push(createActivityLog(
                id,
                req.user!.id,
                'PRIORITY_CHANGED',
                `Priority changed from ${existingTicket.priority} to ${priority}`
            ));
        }

        // Check for assignment change
        if (assignedToId !== undefined && assignedToId !== existingTicket.assigneeId) {
            if (assignedToId === '' || assignedToId === null) {
                // Unassigning
                const oldAssigneeName = existingTicket.assignee?.name || 'Unknown';
                activityPromises.push(createActivityLog(
                    id,
                    req.user!.id,
                    'UNASSIGNED',
                    `Unassigned from ${oldAssigneeName}`
                ));
            } else {
                // Assigning to someone
                const newAssignee = await prisma.user.findUnique({
                    where: { id: assignedToId },
                    select: { name: true }
                });
                const oldAssigneeName = existingTicket.assignee?.name || 'Unassigned';
                const newAssigneeName = newAssignee?.name || 'Unknown';

                activityPromises.push(createActivityLog(
                    id,
                    req.user!.id,
                    'ASSIGNED',
                    `Assigned from ${oldAssigneeName} to ${newAssigneeName}`
                ));
            }
        }

        // Update ticket
        const updatedTicket = await prisma.ticket.update({
            where: { id },
            data: {
                subject: subject || undefined,
                description: description !== undefined ? description : undefined,
                status: status || undefined,
                priority: priority || undefined,
                assigneeId: assignedToId === '' ? null : assignedToId || undefined,
                updatedAt: new Date()
            },
            include: {
                project: true,
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                requester: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        // Execute all activity logs
        await Promise.all(activityPromises);

        res.json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete ticket
 */
export const deleteTicket = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if ticket exists
        const ticket = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }        // Log deletion activity before deleting the ticket
        await createActivityLog(
            id,
            req.user!.id,
            'DELETED',
            `Ticket deleted by ${req.user!.email}`
        );

        // Delete related records first (using transaction)
        await prisma.$transaction([
            prisma.comment.deleteMany({ where: { ticketId: id } }),
            prisma.attachment.deleteMany({ where: { ticketId: id } }),
            prisma.activityLog.deleteMany({ where: { ticketId: id } }),
            prisma.ticket.delete({ where: { id } })
        ]);

        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Add comment to ticket
 */
export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content || content.trim() === '') {
            res.status(400).json({ error: 'Comment content is required' });
            return;
        }

        // Check if ticket exists
        const ticketExists = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }        // Create the comment
        const comment = await prisma.comment.create({
            data: {
                content,
                ticketId: id,
                authorId: req.user!.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });        // Log comment activity
        await createActivityLog(
            id,
            req.user!.id,
            'COMMENT_ADDED',
            `Comment added by ${req.user!.email}`
        );

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Add attachment to ticket
 */
export const addAttachment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        // Check if ticket exists
        const ticketExists = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }        // Store file information
        const attachment = await prisma.attachment.create({
            data: {
                filename: file.originalname,
                filepath: file.path,
                mimeType: file.mimetype,
                size: file.size,
                ticketId: id
            }
        });

        // Log attachment activity
        await createActivityLog(
            id,
            req.user!.id,
            'ATTACHMENT_ADDED',
            `File ${file.originalname} uploaded by ${req.user!.email}`
        );

        res.status(201).json(attachment);
    } catch (error) {
        console.error('Error adding attachment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete attachment
 */
export const deleteAttachment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id, attachmentId } = req.params;

        const attachment = await prisma.attachment.findUnique({
            where: { id: attachmentId, ticketId: id }
        });

        if (!attachment) {
            res.status(404).json({ error: 'Attachment not found' });
            return;
        }        // Delete the file from the filesystem
        try {
            fs.unlinkSync(attachment.filepath);
        } catch (err) {
            console.error('Error deleting file:', err);
            // Continue even if file deletion fails
        }

        // Delete from database
        await prisma.attachment.delete({
            where: { id: attachmentId }
        });

        // Log activity
        await createActivityLog(
            id,
            req.user!.id,
            'ATTACHMENT_DELETED',
            `File ${attachment.filename} deleted by ${req.user!.email}`
        );

        res.json({ message: 'Attachment deleted successfully' });
    } catch (error) {
        console.error('Error deleting attachment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get ticket statistics
 */
export const getTicketStats = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Get total tickets
        const totalTickets = await prisma.ticket.count();

        // Get tickets by status
        const ticketsByStatus = await prisma.$queryRaw`
            SELECT status, COUNT(*) as count
            FROM Ticket
            GROUP BY status
            ORDER BY count DESC
        `;

        // Get tickets by priority
        const ticketsByPriority = await prisma.$queryRaw`
            SELECT priority, COUNT(*) as count
            FROM Ticket
            GROUP BY priority
            ORDER BY count DESC
        `;

        // Recent ticket activity
        const recentActivity = await prisma.activityLog.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                ticket: {
                    select: {
                        subject: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        res.json({
            totalTickets,
            ticketsByStatus,
            ticketsByPriority,
            recentActivity
        });
    } catch (error) {
        console.error('Error fetching ticket stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get comments for a ticket
 */
export const getTicketComments = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if ticket exists
        const ticketExists = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        const comments = await prisma.comment.findMany({
            where: { ticketId: id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'asc' }
        });

        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get attachments for a ticket
 */
export const getTicketAttachments = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if ticket exists
        const ticketExists = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        const attachments = await prisma.attachment.findMany({
            where: { ticketId: id },
            orderBy: { createdAt: 'desc' }
        });

        res.json(attachments);
    } catch (error) {
        console.error('Error fetching attachments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get activity logs for a ticket
 */
export const getTicketActivityLogs = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if ticket exists
        const ticketExists = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        const activityLogs = await prisma.activityLog.findMany({
            where: { ticketId: id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(activityLogs);
    } catch (error) {
        console.error('Error fetching activity logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
