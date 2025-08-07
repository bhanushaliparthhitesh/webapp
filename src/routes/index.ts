import express from 'express';
import authRoutes from './auth';
import contactRoutes from './contact';
import serviceRoutes from './services';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/services', serviceRoutes);

export default router;