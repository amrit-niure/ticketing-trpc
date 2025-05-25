import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    addComment,
    getTicketComments,
    addAttachment,
    getTicketAttachments,
    deleteAttachment,
    getTicketActivityLogs,
    getTicketStats,
    upload
} from "../controllers/ticketController";

const router = express.Router();

// Get all tickets with filtering
router.get("/", authenticateToken, getAllTickets);

// Get ticket stats for dashboard
router.get("/stats", authenticateToken, getTicketStats);

// Get single ticket with details
router.get("/:id", authenticateToken, getTicketById);

// Create new ticket
router.post("/", authenticateToken, createTicket);

// Update ticket
router.put("/:id", authenticateToken, updateTicket);

// Delete ticket
router.delete("/:id", authenticateToken, deleteTicket);

// Add comment
router.post("/:id/comments", authenticateToken, addComment);

// Get comments for a ticket
router.get("/:id/comments", authenticateToken, getTicketComments);

// Add attachment
router.post("/:id/attachments", authenticateToken, upload.single("file"), addAttachment);

// Get attachments for a ticket
router.get("/:id/attachments", authenticateToken, getTicketAttachments);

// Delete attachment
router.delete("/:id/attachments/:attachmentId", authenticateToken, deleteAttachment);

// Get activity logs for a ticket
router.get("/:id/activity", authenticateToken, getTicketActivityLogs);

export default router;
