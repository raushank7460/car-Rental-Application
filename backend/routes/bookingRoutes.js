import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.post('/', createBooking);
router.get('/', getMyBookings);
router.get('/:id', getBookingById);
router.put('/:id', updateBookingStatus);
router.put('/:id/cancel', cancelBooking);

export default router;
