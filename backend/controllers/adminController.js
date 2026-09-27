import Car from '../models/Car.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

// Aggregate and return comprehensive admin dashboard analytics
export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const totalCars = await Car.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBookings = await Booking.countDocuments();
    const activeRentals = await Booking.countDocuments({ bookingStatus: 'active' });

    // Calculate total revenue from paid bookings
    const revenueAggregation = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

    // Monthly revenue breakdown (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$totalAmount' },
          bookingsCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Format monthly data for frontend Recharts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedMonthly = monthlyRevenue.map((item) => ({
      month: `${months[item._id.month - 1]} ${item._id.year}`,
      revenue: item.revenue,
      bookings: item.bookingsCount,
    }));

    // Booking Status Distribution
    const statusCounts = await Booking.aggregate([
      {
        $group: {
          _id: '$bookingStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    // Popular Cars (top 5 most booked)
    const popularCars = await Booking.aggregate([
      {
        $group: {
          _id: '$car',
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
      { $sort: { totalBookings: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'cars',
          localField: '_id',
          foreignField: '_id',
          as: 'carDetails',
        },
      },
      { $unwind: '$carDetails' },
      {
        $project: {
          _id: 1,
          totalBookings: 1,
          totalRevenue: 1,
          name: '$carDetails.name',
          brand: '$carDetails.brand',
          category: '$carDetails.category',
          pricePerDay: '$carDetails.pricePerDay',
          image: { $arrayElemAt: ['$carDetails.images', 0] },
        },
      },
    ]);

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .populate('car', 'name brand images pricePerDay')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalCars,
        totalUsers,
        totalBookings,
        activeRentals,
        totalRevenue,
      },
      monthlyRevenue: formattedMonthly,
      statusCounts: statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      popularCars,
      recentBookings,
    });
  } catch (error) {
    next(error);
  }
};
