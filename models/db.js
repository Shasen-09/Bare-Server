const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to Database.')
  } catch (err) {
    console.error('MongoDB connection error.', {
      message: err.message,
      name: err.name
    }
    )
    process.exit(1)
  }



}

module.exports = connectDB;