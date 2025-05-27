"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
// Get all projects
router.get("/", auth_1.authenticateToken, projectController_1.getAllProjects);
// Get single project
router.get("/:id", auth_1.authenticateToken, projectController_1.getProjectById);
// Create project
router.post("/", auth_1.authenticateToken, (0, auth_1.requireRole)(["ADMIN", "AGENT"]), projectController_1.createProject);
// Update project
router.put("/:id", auth_1.authenticateToken, (0, auth_1.requireRole)(["ADMIN", "AGENT"]), projectController_1.updateProject);
// Delete project
router.delete("/:id", auth_1.authenticateToken, (0, auth_1.requireRole)(["ADMIN"]), projectController_1.deleteProject);
// Get project statistics (for dashboard)
router.get("/stats/summary", auth_1.authenticateToken, projectController_1.getProjectStats);
exports.default = router;
//# sourceMappingURL=projects.js.map