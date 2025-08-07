import express from 'express';
import { 
  submitServiceInquiry, 
  getServiceInquiries, 
  updateServiceInquiryStatus,
  getServices 
} from '../controllers/serviceController';
import { validateServiceInquiry } from '../middleware/validation';
import { authenticateToken, requireRole } from '../middleware/auth';
import { createRateLimit } from '../middleware/security';

const router = express.Router();

// Rate limiting for service inquiries
const serviceRateLimit = createRateLimit(60 * 60 * 1000, 5); // 5 inquiries per hour

router.get('/', getServices);
router.post('/inquiry', serviceRateLimit, validateServiceInquiry, submitServiceInquiry);
router.get('/inquiries', authenticateToken, requireRole(['admin', 'manager']), getServiceInquiries);
router.put('/inquiries/:id', authenticateToken, requireRole(['admin', 'manager']), updateServiceInquiryStatus);

export default router;