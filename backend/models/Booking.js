import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
      index: true,
    },
    pickupLocation: {
      type: String,
      required: [true, 'Please provide pickup location'],
      trim: true,
    },
    dropoffLocation: {
      type: String,
      required: [true, 'Please provide dropoff location'],
      trim: true,
    },
    pickupDate: {
      type: Date,
      required: [true, 'Please provide pickup date'],
    },
    returnDate: {
      type: Date,
      required: [true, 'Please provide return date'],
    },
    totalDays: {
      type: Number,
      required: true,
      min: [1, 'Booking must be at least 1 day'],
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    insurance: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'cash'],
      default: 'card',
    },
    transactionId: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to help date-conflict checks
bookingSchema.index({ car: 1, pickupDate: 1, returnDate: 1, bookingStatus: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
