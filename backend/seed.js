import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';
import Review from './models/Review.js';
import Payment from './models/Payment.js';
import { carsData } from './utils/seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carrental';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('✔ Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany();
    await Car.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();
    await Payment.deleteMany();
    console.log('✔ Cleared existing database records');

    // Create Admin and Regular Users
    const adminUser = await User.create({
      name: 'Apex Admin',
      email: 'admin@apexwheels.com',
      password: 'Admin@123',
      phone: '+91 98765 43210',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });

    const demoUser = await User.create({
      name: 'Alex Mercer',
      email: 'alex@example.com',
      password: 'User@123',
      phone: '+91 91234 56789',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    });

    const customerUser = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'User@123',
      phone: '+91 98111 22334',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    });

    console.log(`✔ Created 3 users (Admin: admin@apexwheels.com, Users: alex@example.com, priya@example.com)`);

    // Insert Cars
    const createdCars = await Car.insertMany(carsData);
    console.log(`✔ Created ${createdCars.length} luxury vehicles`);

    // Update wishlist for demoUser
    demoUser.wishlist = [createdCars[0]._id, createdCars[3]._id];
    await demoUser.save();

    // Create Sample Bookings for rich analytics
    const today = new Date();
    const pastDate1 = new Date(today);
    pastDate1.setDate(today.getDate() - 25);
    const pastDate1End = new Date(today);
    pastDate1End.setDate(today.getDate() - 22);

    const pastDate2 = new Date(today);
    pastDate2.setDate(today.getDate() - 10);
    const pastDate2End = new Date(today);
    pastDate2End.setDate(today.getDate() - 7);

    const activeDateStart = new Date(today);
    activeDateStart.setDate(today.getDate() - 1);
    const activeDateEnd = new Date(today);
    activeDateEnd.setDate(today.getDate() + 3);

    const futureDateStart = new Date(today);
    futureDateStart.setDate(today.getDate() + 7);
    const futureDateEnd = new Date(today);
    futureDateEnd.setDate(today.getDate() + 11);

    const booking1 = await Booking.create({
      user: demoUser._id,
      car: createdCars[0]._id, // BMW M4
      pickupLocation: 'Mumbai Airport Terminal 2',
      dropoffLocation: 'Mumbai Central',
      pickupDate: pastDate1,
      returnDate: pastDate1End,
      totalDays: 3,
      pricePerDay: createdCars[0].pricePerDay,
      insurance: Math.round(createdCars[0].pricePerDay * 3 * 0.08),
      tax: Math.round(createdCars[0].pricePerDay * 3 * 0.18),
      discount: 0,
      totalAmount: Math.round(createdCars[0].pricePerDay * 3 * 1.26),
      paymentStatus: 'paid',
      bookingStatus: 'completed',
      paymentMethod: 'card',
      transactionId: 'TXN-PAST-001',
      createdAt: pastDate1,
    });

    const booking2 = await Booking.create({
      user: customerUser._id,
      car: createdCars[1]._id, // Mercedes AMG GT
      pickupLocation: 'Bandra West, Mumbai',
      dropoffLocation: 'Bandra West, Mumbai',
      pickupDate: pastDate2,
      returnDate: pastDate2End,
      totalDays: 3,
      pricePerDay: createdCars[1].pricePerDay,
      insurance: Math.round(createdCars[1].pricePerDay * 3 * 0.08),
      tax: Math.round(createdCars[1].pricePerDay * 3 * 0.18),
      discount: 0,
      totalAmount: Math.round(createdCars[1].pricePerDay * 3 * 1.26),
      paymentStatus: 'paid',
      bookingStatus: 'completed',
      paymentMethod: 'upi',
      transactionId: 'TXN-PAST-002',
      createdAt: pastDate2,
    });

    const booking3 = await Booking.create({
      user: demoUser._id,
      car: createdCars[3]._id, // Porsche 911
      pickupLocation: 'Juhu Luxury Lounge',
      dropoffLocation: 'Juhu Luxury Lounge',
      pickupDate: activeDateStart,
      returnDate: activeDateEnd,
      totalDays: 4,
      pricePerDay: createdCars[3].pricePerDay,
      insurance: Math.round(createdCars[3].pricePerDay * 4 * 0.08),
      tax: Math.round(createdCars[3].pricePerDay * 4 * 0.18),
      discount: 0,
      totalAmount: Math.round(createdCars[3].pricePerDay * 4 * 1.26),
      paymentStatus: 'paid',
      bookingStatus: 'active',
      paymentMethod: 'card',
      transactionId: 'TXN-ACTIVE-003',
      createdAt: activeDateStart,
    });

    const booking4 = await Booking.create({
      user: customerUser._id,
      car: createdCars[4]._id, // Range Rover Sport
      pickupLocation: 'BKC Business Center',
      dropoffLocation: 'BKC Business Center',
      pickupDate: futureDateStart,
      returnDate: futureDateEnd,
      totalDays: 4,
      pricePerDay: createdCars[4].pricePerDay,
      insurance: Math.round(createdCars[4].pricePerDay * 4 * 0.08),
      tax: Math.round(createdCars[4].pricePerDay * 4 * 0.18),
      discount: 0,
      totalAmount: Math.round(createdCars[4].pricePerDay * 4 * 1.26),
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      paymentMethod: 'netbanking',
      transactionId: 'TXN-FUTR-004',
      createdAt: new Date(),
    });

    console.log(`✔ Created 4 sample bookings with diverse statuses and revenues`);

    // Create Reviews
    await Review.create({
      user: demoUser._id,
      car: createdCars[0]._id,
      rating: 5,
      comment: 'The BMW M4 Competition was an absolute dream to drive. Immaculate condition, instant acceleration, and seamless pickup experience!',
    });

    await Review.create({
      user: customerUser._id,
      car: createdCars[1]._id,
      rating: 5,
      comment: 'Roar of the AMG GT V8 was mesmerizing. Apex Wheels delivered the car with a full tank and VIP concierge service. Will rent again!',
    });

    console.log(`✔ Created sample customer reviews`);

    console.log('\n========================================');
    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    console.log('Admin Account: admin@apexwheels.com / Admin@123');
    console.log('Demo Account:  alex@example.com / User@123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`✖ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
