import Car from '../models/Car.js';
import Booking from '../models/Booking.js';

// Get all cars with search filters and sorting
export const getCars = async (req, res, next) => {
  try {
    const {
      search,
      brand,
      category,
      fuelType,
      transmission,
      seats,
      minPrice,
      maxPrice,
      minRating,
      sort,
      isFeatured,
    } = req.query;

    const query = { isAvailable: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    if (brand && brand !== 'All') {
      query.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (fuelType && fuelType !== 'All') {
      query.fuelType = fuelType;
    }

    if (transmission && transmission !== 'All') {
      query.transmission = transmission;
    }

    if (seats) {
      query.seats = { $gte: Number(seats) };
    }

    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { pricePerDay: 1 };
    else if (sort === 'price-desc') sortOption = { pricePerDay: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };

    const cars = await Car.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (error) {
    next(error);
  }
};

// Get featured cars for the homepage
export const getFeaturedCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ isFeatured: true, isAvailable: true }).limit(6);
    res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (error) {
    next(error);
  }
};

// Get single car details by ID
export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    next(error);
  }
};

// Check vehicle booking availability for specific dates
export const checkCarAvailability = async (req, res, next) => {
  try {
    const { pickupDate, returnDate } = req.body;
    if (!pickupDate || !returnDate) {
      return res.status(400).json({ success: false, message: 'Please provide pickup and return dates' });
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    if (start >= end) {
      return res.status(400).json({ success: false, message: 'Return date must be after pickup date' });
    }

    const overlappingBookings = await Booking.find({
      car: req.params.id,
      bookingStatus: { $in: ['pending', 'confirmed', 'active'] },
      $or: [
        { pickupDate: { $lte: end }, returnDate: { $gte: start } },
      ],
    });

    const isAvailable = overlappingBookings.length === 0;

    res.status(200).json({
      success: true,
      isAvailable,
      conflictsCount: overlappingBookings.length,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new car in fleet (Admin only)
export const createCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({
      success: true,
      car,
    });
  } catch (error) {
    next(error);
  }
};

// Update existing car details (Admin only)
export const updateCar = async (req, res, next) => {
  try {
    let car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    next(error);
  }
};

// Delete car from database (Admin only)
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Car successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};
