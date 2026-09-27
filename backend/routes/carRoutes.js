import express from 'express';
import {
  getCars,
  getFeaturedCars,
  getCarById,
  checkCarAvailability,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/featured', getFeaturedCars);
router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/:id/availability', checkCarAvailability);

// Admin Protected Routes
router.post('/', protect, adminOnly, createCar);
router.put('/:id', protect, adminOnly, updateCar);
router.delete('/:id', protect, adminOnly, deleteCar);

export default router;
