import express from 'express';
import { 
  submitContactForm, 
  getContactSubmissions, 
  updateContactSubmissionStatus 
} from '../controllers/contactController';
import { validateContactForm } from '../middleware/validation';
import { authenticateToken, requireRole } from '../middleware/auth';
import { createRateLimit } from '../middleware/security';

const router = express.Router();

// Rate limiting for contact form
const contactRateLimit = createRateLimit(60 * 60 * 1000, 3); // 3 submissions per hour

router.post('/submit', contactRateLimit, validateContactForm, submitContactForm);
router.get('/submissions', authenticateToken, requireRole(['admin', 'manager']), getContactSubmissions);
router.put('/submissions/:id', authenticateToken, requireRole(['admin', 'manager']), updateContactSubmissionStatus);

export default router;