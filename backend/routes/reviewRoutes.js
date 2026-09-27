import express from 'express';
import { getCarReviews, addReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/car/:carId', getCarReviews);
router.post('/', protect, addReview);

export default router;
