import express from 'express';
import { processPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/process', protect, processPayment);

export default router;
