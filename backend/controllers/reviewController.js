import Review from '../models/Review.js';
import Car from '../models/Car.js';

// Get all verified user reviews for a specific car
export const getCarReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ car: req.params.carId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Submit a new review and rating for a vehicle
export const addReview = async (req, res, next) => {
  try {
    const { carId, rating, comment } = req.body;

    if (!carId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide car ID, rating, and comment' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Check if user already reviewed this car
    const existingReview = await Review.findOne({ car: carId, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this car' });
    }

    const review = await Review.create({
      car: carId,
      user: req.user._id,
      rating: Number(rating),
      comment,
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      review: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};
