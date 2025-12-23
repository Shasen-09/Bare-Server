const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../controller/userController.js');
const login = require('../controller/authController.js');

router.post('/adduser', addUser)
router.get('/getuser', getUser)
router.post('/login', login)

module.exports = router;