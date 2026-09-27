import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carrental');
    console.log(`\x1b[32m✔ MongoDB Connected: ${conn.connection.host}\x1b[0m`);
    return conn;
  } catch (error) {
    console.error(`\x1b[31m✖ MongoDB Connection Error: ${error.message}\x1b[0m`);
    console.log(`\x1b[33mℹ Tip: Ensure MongoDB service is running locally or set MONGODB_URI in backend/.env to MongoDB Atlas.\x1b[0m`);
    // Do not crash server immediately in development so health checks can still respond
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
