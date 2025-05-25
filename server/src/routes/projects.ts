import express from "express";
import { authenticateToken, requireRole } from "../middleware/auth";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectStats
} from "../controllers/projectController";

const router = express.Router();
// Get all projects
router.get("/", authenticateToken, getAllProjects);
// Get single project
router.get("/:id", authenticateToken, getProjectById);
// Create project
router.post("/", authenticateToken, requireRole(["ADMIN", "AGENT"]), createProject);
// Update project
router.put("/:id", authenticateToken, requireRole(["ADMIN", "AGENT"]), updateProject);
// Delete project
router.delete("/:id", authenticateToken, requireRole(["ADMIN"]), deleteProject);
// Get project statistics (for dashboard)
router.get("/stats/summary", authenticateToken, getProjectStats);
export default router;