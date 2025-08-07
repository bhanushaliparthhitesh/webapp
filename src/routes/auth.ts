import express from 'express';
import { register, login, logout, refreshToken } from '../controllers/authController';
import { validateUserRegistration, validateLogin } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { createRateLimit } from '../middleware/security';

const router = express.Router();

// Rate limiting for auth routes
const authRateLimit = createRateLimit(15 * 60 * 1000, 5); // 5 attempts per 15 minutes

router.post('/register', authRateLimit, validateUserRegistration, register);
router.post('/login', authRateLimit, validateLogin, login);
router.post('/logout', logout);
router.post('/refresh', authenticateToken, refreshToken);

export default router;