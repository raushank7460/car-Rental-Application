import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide car name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please provide car brand'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: ['Sports', 'Supercar', 'Luxury', 'SUV', 'Sedan', 'Convertible'],
      default: 'Sports',
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Please provide price per day'],
      min: [0, 'Price must be positive'],
    },
    images: {
      type: [String],
      default: [],
    },
    model3D: {
      type: String,
      default: '',
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      default: 'Petrol',
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual', 'Dual-Clutch'],
      default: 'Automatic',
    },
    seats: {
      type: Number,
      default: 4,
    },
    year: {
      type: Number,
      default: 2024,
    },
    mileage: {
      type: String,
      default: '12 kmpl',
    },
    horsepower: {
      type: Number,
      default: 450,
    },
    features: {
      type: [String],
      default: ['GPS', 'Bluetooth', 'Air Conditioning', 'Parking Sensors', 'Cruise Control', 'Sunroof'],
    },
    location: {
      type: String,
      default: 'Mumbai, Downtown Hub',
    },
    rating: {
      type: Number,
      default: 5.0,
      min: [0, 'Rating cannot be below 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);
export default Car;
