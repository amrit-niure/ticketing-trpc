"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketActivityLogs = exports.getTicketAttachments = exports.getTicketComments = exports.getTicketStats = exports.deleteAttachment = exports.addAttachment = exports.addComment = exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = exports.upload = void 0;
const index_1 = require("../index");
const helpers_1 = require("../utils/helpers");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, '../../uploads');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only supported file types are allowed'));
        }
    }
});
/**
 * Get all tickets with filtering options
 */
const getAllTickets = async (req, res) => {
    try {
        const { status, priority, assignedTo, projectId, search } = req.query;
        // Build filter conditions
        const where = {};
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (assignedTo)
            where.assigneeId = assignedTo;
        if (projectId)
            where.projectId = projectId;
        if (search) {
            where.OR = [
                { subject: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const tickets = await index_1.prisma.ticket.findMany({
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
    }
    catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllTickets = getAllTickets;
/**
 * Get ticket by ID
 */
const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await index_1.prisma.ticket.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTicketById = getTicketById;
/**
 * Create new ticket
 */
const createTicket = async (req, res) => {
    try {
        const { subject, description, priority, status, projectId, assignedToId } = req.body;
        if (!subject || !projectId) {
            res.status(400).json({ error: 'Subject and project are required' });
            return;
        }
        const newTicket = await index_1.prisma.ticket.create({
            data: {
                subject,
                description: description || '',
                status: status || 'OPEN',
                priority: priority || 'MEDIUM',
                projectId,
                assigneeId: assignedToId || null,
                requesterId: req.user.id
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
        }); // Create activity logs
        const activityPromises = [];
        // Always log ticket creation
        activityPromises.push((0, helpers_1.createActivityLog)(newTicket.id, req.user.id, 'CREATED', `Ticket created by ${req.user.email}`));
        // If ticket is created with an assignee, log assignment activity
        if (assignedToId && newTicket.assignee) {
            activityPromises.push((0, helpers_1.createActivityLog)(newTicket.id, req.user.id, 'ASSIGNED', `Assigned to ${newTicket.assignee.name}`));
        }
        // Execute all activity logs
        await Promise.all(activityPromises);
        res.status(201).json(newTicket);
    }
    catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createTicket = createTicket;
/**
 * Update ticket
 */
const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, description, status, priority, assignedToId } = req.body;
        // Get the existing ticket
        const existingTicket = await index_1.prisma.ticket.findUnique({
            where: { id },
            include: {
                assignee: true
            }
        });
        if (!existingTicket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        } // Track changes for activity log
        const activityPromises = [];
        // Check for status change
        if (status && status !== existingTicket.status) {
            activityPromises.push((0, helpers_1.createActivityLog)(id, req.user.id, 'STATUS_CHANGED', `Status changed from ${existingTicket.status} to ${status}`));
        }
        // Check for priority change
        if (priority && priority !== existingTicket.priority) {
            activityPromises.push((0, helpers_1.createActivityLog)(id, req.user.id, 'PRIORITY_CHANGED', `Priority changed from ${existingTicket.priority} to ${priority}`));
        }
        // Check for assignment change
        if (assignedToId !== undefined && assignedToId !== existingTicket.assigneeId) {
            if (assignedToId === '' || assignedToId === null) {
                // Unassigning
                const oldAssigneeName = existingTicket.assignee?.name || 'Unknown';
                activityPromises.push((0, helpers_1.createActivityLog)(id, req.user.id, 'UNASSIGNED', `Unassigned from ${oldAssigneeName}`));
            }
            else {
                // Assigning to someone
                const newAssignee = await index_1.prisma.user.findUnique({
                    where: { id: assignedToId },
                    select: { name: true }
                });
                const oldAssigneeName = existingTicket.assignee?.name || 'Unassigned';
                const newAssigneeName = newAssignee?.name || 'Unknown';
                activityPromises.push((0, helpers_1.createActivityLog)(id, req.user.id, 'ASSIGNED', `Assigned from ${oldAssigneeName} to ${newAssigneeName}`));
            }
        }
        // Update ticket
        const updatedTicket = await index_1.prisma.ticket.update({
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
    }
    catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateTicket = updateTicket;
/**
 * Delete ticket
 */
const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ticket exists
        const ticket = await index_1.prisma.ticket.findUnique({
            where: { id }
        });
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        } // Log deletion activity before deleting the ticket
        await (0, helpers_1.createActivityLog)(id, req.user.id, 'DELETED', `Ticket deleted by ${req.user.email}`);
        // Delete related records first (using transaction)
        await index_1.prisma.$transaction([
            index_1.prisma.comment.deleteMany({ where: { ticketId: id } }),
            index_1.prisma.attachment.deleteMany({ where: { ticketId: id } }),
            index_1.prisma.activityLog.deleteMany({ where: { ticketId: id } }),
            index_1.prisma.ticket.delete({ where: { id } })
        ]);
        res.json({ message: 'Ticket deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteTicket = deleteTicket;
/**
 * Add comment to ticket
 */
const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        if (!content || content.trim() === '') {
            res.status(400).json({ error: 'Comment content is required' });
            return;
        }
        // Check if ticket exists
        const ticketExists = await index_1.prisma.ticket.findUnique({
            where: { id }
        });
        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        } // Create the comment
        const comment = await index_1.prisma.comment.create({
            data: {
                content,
                ticketId: id,
                authorId: req.user.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }); // Log comment activity
        await (0, helpers_1.createActivityLog)(id, req.user.id, 'COMMENT_ADDED', `Comment added by ${req.user.email}`);
        res.status(201).json(comment);
    }
    catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addComment = addComment;
/**
 * Add attachment to ticket
 */
const addAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        // Check if ticket exists
        const ticketExists = await index_1.prisma.ticket.findUnique({
            where: { id }
        });
        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        } // Store file information
        const attachment = await index_1.prisma.attachment.create({
            data: {
                filename: file.originalname,
                filepath: file.path,
                mimeType: file.mimetype,
                size: file.size,
                ticketId: id
            }
        });
        // Log attachment activity
        await (0, helpers_1.createActivityLog)(id, req.user.id, 'ATTACHMENT_ADDED', `File ${file.originalname} uploaded by ${req.user.email}`);
        res.status(201).json(attachment);
    }
    catch (error) {
        console.error('Error adding attachment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addAttachment = addAttachment;
/**
 * Delete attachment
 */
const deleteAttachment = async (req, res) => {
    try {
        const { id, attachmentId } = req.params;
        const attachment = await index_1.prisma.attachment.findUnique({
            where: { id: attachmentId, ticketId: id }
        });
        if (!attachment) {
            res.status(404).json({ error: 'Attachment not found' });
            return;
        } // Delete the file from the filesystem
        try {
            fs_1.default.unlinkSync(attachment.filepath);
        }
        catch (err) {
            console.error('Error deleting file:', err);
            // Continue even if file deletion fails
        }
        // Delete from database
        await index_1.prisma.attachment.delete({
            where: { id: attachmentId }
        });
        // Log activity
        await (0, helpers_1.createActivityLog)(id, req.user.id, 'ATTACHMENT_DELETED', `File ${attachment.filename} deleted by ${req.user.email}`);
        res.json({ message: 'Attachment deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting attachment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteAttachment = deleteAttachment;
/**
 * Get ticket statistics
 */
const getTicketStats = async (req, res) => {
    try {
        // Get total tickets
        const totalTickets = await index_1.prisma.ticket.count();
        // Get tickets by status
        const ticketsByStatus = await index_1.prisma.$queryRaw `
            SELECT status, COUNT(*) as count
            FROM Ticket
            GROUP BY status
            ORDER BY count DESC
        `;
        // Get tickets by priority
        const ticketsByPriority = await index_1.prisma.$queryRaw `
            SELECT priority, COUNT(*) as count
            FROM Ticket
            GROUP BY priority
            ORDER BY count DESC
        `;
        // Recent ticket activity
        const recentActivity = await index_1.prisma.activityLog.findMany({
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
    }
    catch (error) {
        console.error('Error fetching ticket stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTicketStats = getTicketStats;
/**
 * Get comments for a ticket
 */
const getTicketComments = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ticket exists
        const ticketExists = await index_1.prisma.ticket.findUnique({
            where: { id }
        });
        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        const comments = await index_1.prisma.comment.findMany({
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
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTicketComments = getTicketComments;
/**
 * Get attachments for a ticket
 */
const getTicketAttachments = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ticket exists
        const ticketExists = await index_1.prisma.ticket.findUnique({
            where: { id }
        });
        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        const attachments = await index_1.prisma.attachment.findMany({
            where: { ticketId: id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(attachments);
    }
    catch (error) {
        console.error('Error fetching attachments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTicketAttachments = getTicketAttachments;
/**
 * Get activity logs for a ticket
 */
const getTicketActivityLogs = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ticket exists
        const ticketExists = await index_1.prisma.ticket.findUnique({
            where: { id }
        });
        if (!ticketExists) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        const activityLogs = await index_1.prisma.activityLog.findMany({
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
    }
    catch (error) {
        console.error('Error fetching activity logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTicketActivityLogs = getTicketActivityLogs;
//# sourceMappingURL=ticketController.js.map