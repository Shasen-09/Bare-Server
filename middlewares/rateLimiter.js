const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit')

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
})

const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.user?.id || ipKeyGenerator(req),
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many request for this user try again later' }
})


module.exports = { apiLimiter, userLimiter };