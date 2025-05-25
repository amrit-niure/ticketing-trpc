import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { login, register, validateToken } from '../controllers/authController';

const router = express.Router();

// Login route
router.post('/login', login);

// Register route
router.post('/register', register);

// Validate token route
router.get('/validate', authenticateToken, validateToken);

export default router;
