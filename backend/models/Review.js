import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating between 1 and 5'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from reviewing the same car multiple times
reviewSchema.index({ car: 1, user: 1 }, { unique: true });

// Static method to recalculate car average rating
reviewSchema.statics.calculateAverageRating = async function (carId) {
  const stats = await this.aggregate([
    { $match: { car: carId } },
    {
      $group: {
        _id: '$car',
        numReviews: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    if (stats.length > 0) {
      await mongoose.model('Car').findByIdAndUpdate(carId, {
        rating: Math.round(stats[0].avgRating * 10) / 10,
        numReviews: stats[0].numReviews,
      });
    } else {
      await mongoose.model('Car').findByIdAndUpdate(carId, {
        rating: 5.0,
        numReviews: 0,
      });
    }
  } catch (err) {
    console.error('Error updating car rating:', err);
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.car);
});

reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.car);
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
