"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const ticketController_1 = require("../controllers/ticketController");
const router = express_1.default.Router();
// Get all tickets with filtering
router.get("/", auth_1.authenticateToken, ticketController_1.getAllTickets);
// Get ticket stats for dashboard
router.get("/stats", auth_1.authenticateToken, ticketController_1.getTicketStats);
// Get single ticket with details
router.get("/:id", auth_1.authenticateToken, ticketController_1.getTicketById);
// Create new ticket
router.post("/", auth_1.authenticateToken, ticketController_1.createTicket);
// Update ticket
router.put("/:id", auth_1.authenticateToken, ticketController_1.updateTicket);
// Delete ticket
router.delete("/:id", auth_1.authenticateToken, ticketController_1.deleteTicket);
// Add comment
router.post("/:id/comments", auth_1.authenticateToken, ticketController_1.addComment);
// Get comments for a ticket
router.get("/:id/comments", auth_1.authenticateToken, ticketController_1.getTicketComments);
// Add attachment
router.post("/:id/attachments", auth_1.authenticateToken, ticketController_1.upload.single("file"), ticketController_1.addAttachment);
// Get attachments for a ticket
router.get("/:id/attachments", auth_1.authenticateToken, ticketController_1.getTicketAttachments);
// Delete attachment
router.delete("/:id/attachments/:attachmentId", auth_1.authenticateToken, ticketController_1.deleteAttachment);
// Get activity logs for a ticket
router.get("/:id/activity", auth_1.authenticateToken, ticketController_1.getTicketActivityLogs);
exports.default = router;
//# sourceMappingURL=tickets.js.map