"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStats = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const index_1 = require("../index");
/**
 * Get all projects with statistics
 */
const getAllProjects = async (req, res) => {
    try {
        const { status } = req.query;
        // Build filter conditions
        const where = {};
        if (status)
            where.status = status;
        const projects = await index_1.prisma.project.findMany({
            where,
            include: {
                tickets: {
                    select: {
                        id: true,
                        status: true,
                        priority: true
                    }
                },
                _count: {
                    select: { tickets: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        const projectsWithStats = projects.map(project => ({
            ...project,
            ticketCount: project._count.tickets,
            openTickets: project.tickets.filter(t => t.status === 'OPEN').length,
            urgentTickets: project.tickets.filter(t => t.priority === 'URGENT').length,
            tickets: undefined, // Remove raw tickets data, we've already calculated stats
            _count: undefined // Remove count data, we've already extracted it
        }));
        res.json(projectsWithStats);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllProjects = getAllProjects;
/**
 * Get project by id with related tickets
 */
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await index_1.prisma.project.findUnique({
            where: { id },
            include: {
                tickets: {
                    include: {
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
                    orderBy: {
                        updatedAt: 'desc'
                    }
                }
            }
        });
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getProjectById = getProjectById;
/**
 * Create new project
 */
const createProject = async (req, res) => {
    try {
        const { name, description, status = 'ACTIVE' } = req.body;
        if (!name || name.trim() === '') {
            res.status(400).json({ error: 'Project name is required' });
            return;
        }
        const project = await index_1.prisma.project.create({
            data: {
                name,
                description: description || '',
                status
            }
        });
        res.status(201).json(project);
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createProject = createProject;
/**
 * Update project
 */
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;
        if (name && name.trim() === '') {
            res.status(400).json({ error: 'Project name cannot be empty' });
            return;
        }
        const project = await index_1.prisma.project.findUnique({
            where: { id }
        });
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        const updatedProject = await index_1.prisma.project.update({
            where: { id },
            data: {
                name: name || undefined,
                description: description !== undefined ? description : undefined,
                status: status || undefined,
                updatedAt: new Date()
            }
        });
        res.json(updatedProject);
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateProject = updateProject;
/**
 * Delete project
 */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await index_1.prisma.project.findUnique({
            where: { id },
            include: {
                tickets: {
                    select: { id: true }
                }
            }
        });
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        // Check if project has tickets
        if (project.tickets && project.tickets.length > 0) {
            res.status(400).json({
                error: 'Cannot delete project with associated tickets. Remove tickets first.'
            });
            return;
        }
        // Delete the project
        await index_1.prisma.project.delete({
            where: { id }
        });
        res.json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteProject = deleteProject;
/**
 * Get project statistics
 */
const getProjectStats = async (req, res) => {
    try {
        // Get total projects
        const totalProjects = await index_1.prisma.project.count();
        // Get active projects
        const activeProjects = await index_1.prisma.project.count({
            where: { status: 'ACTIVE' }
        });
        // Get completed projects
        const completedProjects = await index_1.prisma.project.count({
            where: { status: 'COMPLETED' }
        });
        // Get archived projects
        const archivedProjects = await index_1.prisma.project.count({
            where: { status: 'ARCHIVED' }
        });
        // Get projects with most tickets
        const projectsWithMostTickets = await index_1.prisma.project.findMany({
            include: {
                _count: {
                    select: { tickets: true }
                }
            },
            orderBy: {
                tickets: { _count: 'desc' }
            },
            take: 5
        });
        res.json({
            totalProjects,
            activeProjects,
            completedProjects,
            archivedProjects,
            projectsWithMostTickets: projectsWithMostTickets.map(p => ({
                id: p.id,
                name: p.name,
                status: p.status,
                ticketCount: p._count.tickets
            }))
        });
    }
    catch (error) {
        console.error('Error fetching project stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getProjectStats = getProjectStats;
//# sourceMappingURL=projectController.js.map