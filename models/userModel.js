const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('practiceUser', userSchema);