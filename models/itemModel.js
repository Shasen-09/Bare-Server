const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    label: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('Items', itemSchema)