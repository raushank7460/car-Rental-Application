import express from 'express';
import { getAdminDashboardStats } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getAdminDashboardStats);

export default router;
