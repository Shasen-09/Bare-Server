const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../controller/userController.js');
const { login, refresh } = require('../controller/authController.js');
const authenticate = require('../middlewares/authMiddleware.js');

router.post('/adduser', authenticate(addUser))
router.get('/getuser', (getUser))
router.post('/login', login)
router.post('/refresh', authenticate(refresh))

module.exports = router;