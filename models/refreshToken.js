const mongoose = require('mongoose');

const refreshSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true },
  revoked: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('RefreshToken', refreshSchema);

