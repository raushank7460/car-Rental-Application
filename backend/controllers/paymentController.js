import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

// Process mock payment verification and confirm booking
export const processPayment = async (req, res, next) => {
  try {
    const { bookingId, method, paymentDetails } = req.body;

    if (!bookingId || !method) {
      return res.status(400).json({ success: false, message: 'Please provide booking ID and payment method' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized for this payment' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, message: 'Booking has already been paid for' });
    }

    // Generate realistic transaction ID
    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
    const transactionId = `TXN-${Date.now()}-${randomHex}`;

    // Create payment record
    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.totalAmount,
      currency: 'INR',
      method,
      status: 'paid',
      transactionId,
      receiptUrl: `/receipts/${transactionId}`,
    });

    // Update booking
    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    booking.paymentMethod = method;
    booking.transactionId = transactionId;
    await booking.save();

    const populatedBooking = await Booking.findById(booking._id).populate('car').populate('user', 'name email phone');

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      payment,
      booking: populatedBooking,
    });
  } catch (error) {
    next(error);
  }
};
