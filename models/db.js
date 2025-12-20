const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connect to Mongoose.'))
    .catch((err) => {
      console.error('MongoDB error:', err);
      process.exit(1);
    })
}

module.exports = connectDB;