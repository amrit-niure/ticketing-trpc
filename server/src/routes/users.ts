import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAllUsers, getUserProfile } from '../controllers/userController';

const router = express.Router();

// Get all users (for assignee dropdown)
router.get('/', authenticateToken, getAllUsers);

// Get user profile
router.get('/profile', authenticateToken, getUserProfile);

export default router;
