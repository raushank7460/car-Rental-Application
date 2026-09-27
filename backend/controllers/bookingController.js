import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

// Create a new booking with double-booking prevention
export const createBooking = async (req, res, next) => {
  try {
    const {
      car: carId,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      returnDate,
      paymentMethod = 'card',
      notes,
    } = req.body;

    if (!carId || !pickupLocation || !dropoffLocation || !pickupDate || !returnDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required booking fields' });
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }

    if (start >= end) {
      return res.status(400).json({ success: false, message: 'Return date must be after pickup date' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    if (!car.isAvailable) {
      return res.status(400).json({ success: false, message: 'Car is currently marked unavailable for rent' });
    }

    // Double-booking check: Overlapping active bookings
    const overlappingBooking = await Booking.findOne({
      car: carId,
      bookingStatus: { $in: ['pending', 'confirmed', 'active'] },
      $or: [
        { pickupDate: { $lte: end }, returnDate: { $gte: start } },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This car is already booked for the selected dates. Please choose different dates.',
      });
    }

    // Calculate duration in days
    const diffTime = Math.abs(end - start);
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Pricing calculation
    const baseRental = car.pricePerDay * totalDays;
    const insurance = Math.round(baseRental * 0.08); // 8% insurance
    const tax = Math.round(baseRental * 0.18); // 18% GST/tax
    const discount = totalDays >= 5 ? Math.round(baseRental * 0.1) : 0; // 10% discount for >= 5 days
    const totalAmount = baseRental + insurance + tax - discount;

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      pickupLocation,
      dropoffLocation,
      pickupDate: start,
      returnDate: end,
      totalDays,
      pricePerDay: car.pricePerDay,
      insurance,
      tax,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      notes: notes || '',
    });

    const populatedBooking = await Booking.findById(booking._id).populate('car').populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      booking: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// Get all bookings made by the currently logged-in user
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve single booking details by booking ID
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('car')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Only owner or admin can view
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// Update booking status or payment status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // If regular user, only allow cancelling pending/confirmed bookings
    if (req.user.role !== 'admin') {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to modify this booking' });
      }

      if (bookingStatus !== 'cancelled') {
        return res.status(403).json({ success: false, message: 'Users can only cancel their bookings' });
      }

      if (booking.bookingStatus === 'active' || booking.bookingStatus === 'completed') {
        return res.status(400).json({ success: false, message: 'Cannot cancel active or completed bookings' });
      }
    }

    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id).populate('car').populate('user', 'name email phone');

    res.status(200).json({
      success: true,
      booking: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel an existing booking and process refund status
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    if (booking.bookingStatus === 'completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel an already completed booking' });
    }

    booking.bookingStatus = 'cancelled';
    if (booking.paymentStatus === 'paid') {
      booking.paymentStatus = 'refunded';
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking successfully cancelled',
      booking,
    });
  } catch (error) {
    next(error);
  }
};
