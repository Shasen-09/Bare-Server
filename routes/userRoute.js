const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../controller/userController.js');
const { login, refresh, logout } = require('../controller/authController.js');
const authenticate = require('../middlewares/authMiddleware.js');

const role = require('../middlewares/roleMiddleware.js');
const { userLimiter } = require('../middlewares/rateLimiter.js');

router.post('/adduser', addUser)
router.get('/getuser', authenticate, role("user", "admin"), userLimiter, getUser)
router.post('/login', login)
router.post('/refresh', authenticate, role("admin"), refresh)
router.post('/logout', authenticate, role("admin"), logout)

module.exports = router;